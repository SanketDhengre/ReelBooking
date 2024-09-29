using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReelBooking.Data;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LoginRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MajorProjectContext _context;
        private readonly SymmetricSecurityKey _key;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly string _issuer;
        private readonly string _audience;

        public AuthController(MajorProjectContext context, IConfiguration configuration)
        {
            _context = context;
            _tokenHandler = new JwtSecurityTokenHandler();

            // Retrieve JWT configuration from appsettings.json
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            _issuer = configuration["Jwt:Issuer"];
            _audience = configuration["Jwt:Audience"];
        }
        [HttpGet("Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return BadRequest("Email and password are required");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password && !u.IsDeleted);
            var admin = await _context.Admin.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            var theaterManager = await _context.TheaterManagers.FirstOrDefaultAsync(u => u.Email == email && u.Password == password && !u.IsDeleted);

            if (user != null)
            {
                var role = "user";
                return Ok(new { Token = GenerateToken(user.UserId, user.Email), role });

            }
            if (admin != null)
            {
                var role = "admin";
                return Ok(new { Token = GenerateToken(admin.AdminId, admin.Email, admin.AdminId), role });

            }
            if (theaterManager != null )
            {
                var role = "theaterManager";
                if (theaterManager.Status == "Pending")
                    return Unauthorized("Your account is pending approval by the admin.");
                else if (theaterManager.Status == "Rejected")
                    return Unauthorized("Your account has been rejected by the admin.");

                return Ok(new { Token = GenerateToken(theaterManager.ManagerId, theaterManager.Email, null, theaterManager.ManagerId), role });
            }

            return Unauthorized("Invalid email or password");
        }




        private string GenerateToken(int userId, string email, int? adminId = null, int? theaterManagerId = null)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        new Claim(ClaimTypes.Email, email)
    };

            if (adminId.HasValue)
            {
                claims.Add(new Claim("adminId", adminId.Value.ToString()));
            }

            if (theaterManagerId.HasValue)
            {
                claims.Add(new Claim("theaterManagerId", theaterManagerId.Value.ToString()));
            }

            // Add userId claim only if it's not an admin or theater manager
            if (!adminId.HasValue && !theaterManagerId.HasValue)
            {
                claims.Add(new Claim("userId", userId.ToString()));
            }

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(10), // Set expiration to 10 hours from now
                signingCredentials: new SigningCredentials(_key, SecurityAlgorithms.HmacSha256)
            );

            return _tokenHandler.WriteToken(token);
        }



    }
}
