//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ReelBooking.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class BookingsController : ControllerBase
//    {
//    }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReelBooking.Data;
using ReelBooking.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ReelBooking.Controllers
{


    // Define a class to store booked seats for each movie
    public static class SeatTracker
    {
        // Dictionary to store booked seats for each movie
        private static readonly Dictionary<int, List<string>> BookedSeatsByMovie = new Dictionary<int, List<string>>();

        // Method to check if a seat is already booked for a movie
        public static bool IsSeatBookedForMovie(int movieId, string seat)
        {
            if (BookedSeatsByMovie.ContainsKey(movieId))
            {
                return BookedSeatsByMovie[movieId].Contains(seat);
            }
            return false;
        }

        // Method to book seats for a movie
        public static void BookSeatsForMovie(int movieId, string[] seats)
        {
            if (!BookedSeatsByMovie.ContainsKey(movieId))
            {
                BookedSeatsByMovie[movieId] = new List<string>();
            }
            BookedSeatsByMovie[movieId].AddRange(seats);
        }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly MajorProjectContext _userContext;

        public BookingsController(MajorProjectContext userContext)
        {
            _userContext = userContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            try
            {
                List<Booking> bookings = await _userContext.Bookings
                    .Include(b => b.User)    // Include related User entity
                    .Include(b => b.Movie)   // Include related Movie entity
                    .ToListAsync();

                // Transform bookings to include username and movie title
                var transformedBookings = bookings.Select(b => new
                {
                    b.BookingId,
                    b.UserId,
                    UserName = b.User.Name,  // Assuming there's a UserName property in the User entity
                    b.MovieId,
                    MovieTitle = b.Movie.Title,  // Assuming there's a Title property in the Movie entity
                    b.SelectedSeats,
                    b.BookingDate,
                    b.TotalPrice,
                    b.MovieTime,
                    b.IsDeleted
                }).ToList();

                return Ok(transformedBookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //get bookings by user id
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBookingByUserId(int userId)
        {
            try
            {
                // Retrieve bookings for the specified user ID where IsDeleted is not 1
                var userBookings = await _userContext.Bookings
                    .Where(b => b.UserId == userId && !b.IsDeleted) // Filter by user ID and not deleted
                    .Join(_userContext.Movies,
                          booking => booking.MovieId,
                          movie => movie.MovieId,
                          (booking, movie) => new
                          {
                              booking.BookingId,
                              booking.UserId,
                              booking.MovieId,
                              booking.SelectedSeats,
                              booking.BookingDate,
                              booking.TotalPrice,
                              booking.MovieTime,
                              booking.IsDeleted,
                              MovieTitle = movie.Title,
                              movie.ImageUrl // Include movie's image URL
                          })
                    .ToListAsync();

                if (userBookings == null || userBookings.Count == 0)
                {
                    return NotFound("No bookings found for the specified user ID.");
                }

                return Ok(userBookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }





        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            try
            {
                var booking = await _userContext.Bookings.FindAsync(id);
                if (booking == null)
                {
                    return NotFound();
                }
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                var movie = await _userContext.Movies.FindAsync(booking.MovieId);
                if (movie == null)
                {
                    return NotFound("Movie not found.");
                }

                if (booking.SelectedSeats != null)
                {
                    // Check if any of the selected seats are already booked for this movie
                    var alreadyBookedSeats = new List<string>();
                    foreach (var selectedSeat in booking.SelectedSeats.Split(','))
                    {
                        if (SeatTracker.IsSeatBookedForMovie((int)booking.MovieId, selectedSeat))
                        {
                            alreadyBookedSeats.Add(selectedSeat);
                        }
                    }

                    if (alreadyBookedSeats.Any())
                    {
                        // If any seats are already booked, return a BadRequest response with relevant information
                        return BadRequest($"The following seats are already booked: {string.Join(", ", alreadyBookedSeats)}");
                    }

                    int numSeats = booking.SelectedSeats.Split(',').Length;
                    if (movie.AvailableSeats < numSeats)
                    {
                        return BadRequest("Not enough seats available.");
                    }

                    // Subtract booked seats from available seats
                    movie.AvailableSeats -= numSeats;

                    // Book selected seats for this movie
                    SeatTracker.BookSeatsForMovie((int)booking.MovieId, booking.SelectedSeats.Split(','));

                    // Update user rewards and calculate discounted price
                    decimal discountedPrice = await UpdateUserRewardsAndGetDiscountedPrice((int)booking.UserId, numSeats, (decimal)booking.TotalPrice);

                    // If discount applied, update total price
                    if (discountedPrice < booking.TotalPrice)
                    {
                        booking.TotalPrice = discountedPrice;
                    }
                }

                // Add booking to the database
                await _userContext.Bookings.AddAsync(booking);
                await _userContext.SaveChangesAsync();

                // Return the created booking
                return CreatedAtAction("GetBookingById", new { id = booking.BookingId }, booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] Booking updatedBooking)
        {
            try
            {
                var booking = await _userContext.Bookings.FindAsync(id);
                if (booking == null)
                {
                    return NotFound();
                }

                booking.UserId = updatedBooking.UserId;
                booking.MovieId = updatedBooking.MovieId;
                booking.SelectedSeats = updatedBooking.SelectedSeats;
                booking.BookingDate = updatedBooking.BookingDate;
                booking.TotalPrice = updatedBooking.TotalPrice;
                booking.MovieTime = updatedBooking.MovieTime;
                booking.IsDeleted = updatedBooking.IsDeleted;

                await _userContext.SaveChangesAsync();
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            try
            {
                var booking = await _userContext.Bookings.FindAsync(id);
                if (booking == null)
                {
                    return NotFound("Booking not found.");
                }

                // Get the movie associated with the booking
                var movie = await _userContext.Movies.FindAsync(booking.MovieId);
                if (movie == null)
                {
                    return NotFound("Movie not found.");
                }

                // Add cancelled seats back to available seats
                movie.AvailableSeats += booking.SelectedSeats.Split(',').Length;

                booking.IsDeleted = true;
                //_userContext.Movies.Remove(movie);
                await _userContext.SaveChangesAsync();

                return Ok("Booking cancelled successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Method to update user rewards and calculate discounted price
        //private async Task<decimal> UpdateUserRewardsAndGetDiscountedPrice(int userId, int numSeats, decimal totalPrice)
        //{
        //    var userRewards = await _userContext.UserRewards.FindAsync(userId);
        //    if (userRewards == null)
        //    {
        //        userRewards = new UserReward { UserId = userId, Points = 0 };
        //        _userContext.UserRewards.Add(userRewards);
        //    }

        //    // Update user reward points by the number of tickets booked
        //    userRewards.Points += numSeats * 2;

        //    // Check if user is eligible for discount
        //    if (userRewards.Points >= 10)
        //    {
        //        // Apply 50% discount if user has earned 10 points
        //        totalPrice *= 0.5M; // 50% discount
        //        userRewards.Points -= 10; // Deduct 10 points
        //    }

        //    await _userContext.SaveChangesAsync();
        //    return totalPrice;
        //}

        // Method to update user rewards and calculate discounted price
        private async Task<decimal> UpdateUserRewardsAndGetDiscountedPrice(int userId, int numSeats, decimal totalPrice)
        {
            var userRewards = await _userContext.UserRewards.FindAsync(userId);
            if (userRewards == null)
            {
                userRewards = new UserReward { UserId = userId, Points = 0 };
                _userContext.UserRewards.Add(userRewards);
            }

            // Update user reward points by the number of tickets booked
            userRewards.Points += numSeats * 2;

            // Check if user is eligible for discount
            if (userRewards.Points >= 10)
            {
                // Apply 50% discount if user has earned 10 or more points
                totalPrice *= 0.5M; // 50% discount
                userRewards.Points -= 10; // Deduct 10 points
            }

            await _userContext.SaveChangesAsync();
            return totalPrice;
        }

    }
}

