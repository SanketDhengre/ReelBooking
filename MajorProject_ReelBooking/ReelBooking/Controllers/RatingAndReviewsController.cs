//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ReelBooking.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class RatingAndReviewsController : ControllerBase
//    {
//    }
//}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReelBooking.Data;
using ReelBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReelBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingAndReviewsController : ControllerBase
    {
        private readonly MajorProjectContext _context;

        public RatingAndReviewsController(MajorProjectContext context)
        {
            _context = context;
        }

        // GET: api/RatingAndReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingAndReview>>> GetRatingAndReviews()
        {
            return await _context.RatingAndReviews.ToListAsync();
        }

        // GET: api/RatingAndReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RatingAndReview>> GetRatingAndReview(int id)
        {
            var ratingAndReview = await _context.RatingAndReviews.FindAsync(id);

            if (ratingAndReview == null)
            {
                return NotFound();
            }

            return ratingAndReview;
        }

        // POST: api/RatingAndReviews
        [HttpPost]
        public async Task<ActionResult<RatingAndReview>> PostRatingAndReview(RatingAndReview ratingAndReview)
        {
            try
            {
                ratingAndReview.ReviewDate = DateTime.Now;
                _context.RatingAndReviews.Add(ratingAndReview);
                await _context.SaveChangesAsync();

                // Calculate average rating for the movie
                var movie = await _context.Movies.FindAsync(ratingAndReview.MovieId);
                if (movie != null)
                {
                    var reviews = await _context.RatingAndReviews.Where(r => r.MovieId == ratingAndReview.MovieId).ToListAsync();
                    if (reviews.Any())
                    {
                        movie.AverageRating = (decimal?)reviews.Average(r => r.Rating);
                    }
                    else
                    {
                        movie.AverageRating = null; // Reset average rating if there are no reviews
                    }
                    await _context.SaveChangesAsync();
                }

                return CreatedAtAction("GetRatingAndReview", new { id = ratingAndReview.RatingId }, ratingAndReview);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        // PUT: api/RatingAndReviews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRatingAndReview(int id, RatingAndReview ratingAndReview)
        {
            if (id != ratingAndReview.RatingId)
            {
                return BadRequest();
            }

            _context.Entry(ratingAndReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingAndReviewExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/RatingAndReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRatingAndReview(int id)
        {
            var ratingAndReview = await _context.RatingAndReviews.FindAsync(id);
            if (ratingAndReview == null)
            {
                return NotFound();
            }

            //_context.RatingAndReviews.Remove(ratingAndReview);
            ratingAndReview.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RatingAndReviewExists(int id)
        {
            return _context.RatingAndReviews.Any(e => e.RatingId == id);
        }

        // GET: api/RatingAndReviews/GetRatingAndReviewByMovieId/{movieId}
        [HttpGet("GetRatingAndReviewByMovieId/{movieId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetRatingAndReviewByMovieId(int movieId)
        {
            try
            {
                var ratingsAndReviews = await (from rr in _context.RatingAndReviews
                                               join u in _context.Users on rr.UserId equals u.UserId
                                               where rr.MovieId == movieId && !rr.IsDeleted
                                               select new
                                               {
                                                   rr.RatingId,
                                                   rr.MovieId,
                                                   rr.UserId,
                                                   rr.Rating,
                                                   rr.ReviewText,
                                                   rr.ReviewDate,
                                                   rr.IsDeleted,
                                                   UserName = u.Name // Fetching user name from Users table
                                               }).ToListAsync();

                if (ratingsAndReviews.Count == 0)
                {
                    return NotFound($"No reviews available for movie ID: {movieId}");
                }

                return Ok(ratingsAndReviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }
}
