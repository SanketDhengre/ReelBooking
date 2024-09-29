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
    public class TheaterManagerController : ControllerBase
    {
        private readonly MajorProjectContext _context;

        public TheaterManagerController(MajorProjectContext context)
        {
            _context = context;
        }

        [HttpGet("GetManagerDetails")]
        public async Task<IActionResult> GetManagerDetails()
        {
            //List<TheaterManager> managers = await _context.TheaterManagers.ToListAsync();
            var managers= await _context.TheaterManagers.Where(m=>m.IsDeleted==false).ToListAsync();
            return Ok(managers);
        }

        [HttpGet("GetPendingManagers")]
        public async Task<IActionResult> GetPendingManagers()
        {
            List<TheaterManager> pendingManagers = await _context.TheaterManagers
                .Where(u => u.Status == "Pending")
                .ToListAsync();

            if (pendingManagers.Count == 0)
            {
                return NotFound("No pending status found");
            }

            return Ok(pendingManagers);
        }

        [HttpGet("GetDetailsByEmail/{Email}")]
        public async Task<IActionResult> GetDetailsByEmail(string Email)
        {
            var manager = await _context.TheaterManagers
                .FirstOrDefaultAsync(u => u.Email == Email);

            if (manager == null)
            {
                return NotFound();
            }

            return Ok(manager);
        }


        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] TheaterManager newManager)
        {
            // Check if a theater manager with the same email, or phone already exists
            var existingManager = await _context.TheaterManagers.FirstOrDefaultAsync(m => m.Email == newManager.Email  || m.Phone == newManager.Phone);

            if (existingManager != null)
            {
                // A theater manager with the same email, name, or phone already exists
                return Conflict("A theater manager with the same email, or phone already exists.");
            }

            newManager.Status = "Pending"; // Set status to pending
            _context.TheaterManagers.Add(newManager);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetailsByEmail), new { Email = newManager.Email }, newManager);
        }

        [HttpGet("Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var manager = await _context.TheaterManagers
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password && u.Status == "Approved");

            if (manager != null)
            {
                return Ok(manager);
            }

            return Unauthorized("Invalid email, password, or pending status");
        }

        [HttpPost("ApproveManager/{managerId}")]
        public async Task<IActionResult> ApproveManager(int managerId)
        {
            var manager = await _context.TheaterManagers.FindAsync(managerId);

            if (manager == null)
            {
                return NotFound();
            }

            manager.Status = "Approved";
            await _context.SaveChangesAsync();

            return Ok("Manager status approved successfully");
        }

        [HttpPost("RejectManager/{managerId}")]
        public async Task<IActionResult> RejectManager(int managerId)
        {
            var manager = await _context.TheaterManagers.FindAsync(managerId);

            if (manager == null)
            {
                return NotFound();
            }

            manager.Status = "Rejected";
            await _context.SaveChangesAsync();

            return Ok("Manager status rejected successfully");
        }

        [HttpDelete("DeleteManagerDetails/{managerId:int}")]
        public async Task<IActionResult> DeleteManagerDetails(int managerId, bool hardDelete = false)
        {
            var manager = await _context.TheaterManagers.FindAsync(managerId);
            if (manager == null)
            {
                return NotFound();
            }

            if (hardDelete)
            {
                _context.TheaterManagers.Remove(manager);
            }
            else
            {
                // Soft delete
                manager.IsDeleted = true;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
