using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReelBooking.Data;
using ReelBooking.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MajorProjectContext _context;

        public UsersController(MajorProjectContext context)
        {
            _context = context;
        }

        [HttpGet("GetUserDetails")]
        public async Task<IActionResult> GetUserDetails()
        {
            var users = await _context.Users.Where(m => m.IsDeleted == false).ToListAsync();
            return Ok(users);
        }

        [HttpGet("GetDetailsByEmail/{Email}")]
        public async Task<IActionResult> GetDetailsByEmail(string Email)
        {
            var userByEmail = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == Email);

            if (userByEmail == null)
            {
                return NotFound();
            }

            return Ok(userByEmail);
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] User newUser)
        {
            // Check if a user with the same email, or phone already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == newUser.Email  || u.Phone == newUser.Phone);

            if (existingUser != null)
            {
                // Return a conflict response indicating that the user already exists
                return Conflict("User with the same email or phone already exists.");
            }

            // If the user does not already exist, add them to the database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // Return the created user details
            return CreatedAtAction(nameof(GetDetailsByEmail), new { Email = newUser.Email }, newUser);
        }



        [HttpPut("UpdateUserDetails/{id}")]
        public async Task<IActionResult> UpdateUserAttribute(int id, [FromBody] KeyValuePair<string, string> updateduserAttribute)
        {
            if (string.IsNullOrEmpty(updateduserAttribute.Key) || string.IsNullOrEmpty(updateduserAttribute.Value))
            {
                return BadRequest("Attribute name and value cannot be null or empty.");
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            var property = typeof(User).GetProperty(updateduserAttribute.Key);
            if (property == null)
            {
                return BadRequest($"Attribute '{updateduserAttribute.Key}' does not exist in the User model.");
            }

            // Handle nullable int properties
            if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                // Nullable property, handle conversion accordingly
                if (string.IsNullOrWhiteSpace(updateduserAttribute.Value))
                {
                    property.SetValue(existingUser, null);
                }
                else
                {
                    var underlyingType = Nullable.GetUnderlyingType(property.PropertyType);
                    var convertedValue = Convert.ChangeType(updateduserAttribute.Value, underlyingType);
                    property.SetValue(existingUser, convertedValue);
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
                        convertedValue = int.Parse(updateduserAttribute.Value);
                    }
                    else if (targetType == typeof(string))
                    {
                        convertedValue = updateduserAttribute.Value;
                    }
                    else
                    {
                        throw new InvalidOperationException($"Unsupported data type: {targetType}");
                    }
                }
                catch (FormatException)
                {
                    return BadRequest($"Invalid value format for attribute '{updateduserAttribute.Key}'.");
                }

                property.SetValue(existingUser, convertedValue);
            }

            _context.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }


        [HttpGet("Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            // Check if email and password are provided
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Email and password are required");
            }

            // Perform the login logic using the provided email and password
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            // Check if user exists
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Return the user details if login is successful
            return Ok(user);
        }

        [HttpDelete("DeleteUsersDetails/{userId:int}")]
        public async Task<IActionResult> DeleteUsersDetails(int userId, bool hardDelete = false)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            if (hardDelete)
            {
                _context.Users.Remove(user);
            }
            else
            {
                // Soft delete
                user.IsDeleted = true;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
