using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReelBooking.Data;
using ReelBooking.Models;

namespace ReelBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MajorProjectContext _moviecontext;
        

        public MovieController(MajorProjectContext moviecontext)
        {
            _moviecontext = moviecontext;
        }

        //to get all movies
        [HttpGet ]
        public async Task<IActionResult> Get()
        {
            var movies=await _moviecontext.Movies.ToListAsync();
            return Ok(movies);
        }

        // Get movies by ManagerId here
        [HttpGet("GetMoviesByManagerId/{managerId}")]
        public async Task<IActionResult> GetMoviesByManagerId(int managerId)
        {
            var movies = await _moviecontext.Movies
                .Where(m => m.ManagerId == managerId && (m.IsDeleted == false || m.IsDeleted == null))
                .ToListAsync();

            if (movies == null || movies.Count == 0)
            {
                return NotFound("No movies found for the specified ManagerId.");
            }

            return Ok(movies);
        }


        //search movies

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies(string searchParameter = null)
        {
            IQueryable<Movies> query = _moviecontext.Movies;

            if (!string.IsNullOrWhiteSpace(searchParameter))
            {
                query = query.Where(m =>
                    m.Title.Contains(searchParameter) ||
                    m.Genre.Contains(searchParameter) ||
                    m.Director.Contains(searchParameter) ||
                    m.Language.Contains(searchParameter) ||
                    m.ReleaseDate.ToString().Contains(searchParameter) // Convert release date to string for search
                );
            }

            var movies = await query.ToListAsync();
            return Ok(movies);
        }


        //to insert movies
        // POST: api/Movie
        [HttpPost ]
        public async Task<IActionResult> InsertMovie([FromBody] Movies movie)
        {
            if (movie == null)
            {
                return BadRequest();
            }

            _moviecontext.Movies.Add(movie);
            await _moviecontext.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = movie.MovieId }, movie);
        }

        //update movie

        [HttpPut("UpdateMovieDetails/{id}")]
        public async Task<IActionResult> UpdateMovieAttribute(int id, [FromBody] KeyValuePair<string, string> updatedAttribute)
        {
            if (string.IsNullOrEmpty(updatedAttribute.Key) || string.IsNullOrEmpty(updatedAttribute.Value))
            {
                return BadRequest("Attribute name and value cannot be null or empty.");
            }

            var existingMovie = await _moviecontext.Movies.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }

            var property = typeof(Movies).GetProperty(updatedAttribute.Key);
            if (property == null)
            {
                return BadRequest($"Attribute '{updatedAttribute.Key}' does not exist in the Movie model.");
            }

            // Handle nullable int properties
            if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                // Nullable property, handle conversion accordingly
                if (string.IsNullOrWhiteSpace(updatedAttribute.Value))
                {
                    property.SetValue(existingMovie, null);
                }
                else
                {
                    var underlyingType = Nullable.GetUnderlyingType(property.PropertyType);
                    var convertedValue = Convert.ChangeType(updatedAttribute.Value, underlyingType);
                    property.SetValue(existingMovie, convertedValue);
                }
            }
            else
            {
                // Non-nullable property, handle conversion as before
                var targetType = property.PropertyType;
                object convertedValue;

                try
                {
                    if (targetType == typeof(int))
                    {
                        convertedValue = int.Parse(updatedAttribute.Value);
                    }
                    else if (targetType == typeof(string))
                    {
                        convertedValue = updatedAttribute.Value;
                    }
                    else
                    {
                        throw new InvalidOperationException($"Unsupported data type: {targetType}");
                    }
                }
                catch (FormatException)
                {
                    return BadRequest($"Invalid value format for attribute '{updatedAttribute.Key}'.");
                }

                property.SetValue(existingMovie, convertedValue);
            }

            _moviecontext.Entry(existingMovie).State = EntityState.Modified;

            try
            {
                await _moviecontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
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



        private bool MovieExists(int id)
        {
            return _moviecontext.Movies.Any(e => e.MovieId == id);
        }

        // Delete a movie by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _moviecontext.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }
            movie.IsDeleted = true;
            //_moviecontext.Movies.Remove(movie);
            await _moviecontext.SaveChangesAsync();

            return NoContent();
        }
        //get movie by id
        [HttpGet("GetMovieById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _moviecontext.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }




        //----------------------------------------------------------------------------

        ////to get all movies
        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    var movies = await _moviecontext.Movies.ToListAsync();
        //    return Ok(movies);
        //}

        // GET: api/Movie/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _moviecontext.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }




    }
}
