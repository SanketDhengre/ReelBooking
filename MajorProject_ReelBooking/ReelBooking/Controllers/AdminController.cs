using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReelBooking.Data;
using ReelBooking.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReelBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MajorProjectContext _context;

        public AdminController(MajorProjectContext context)
        {
            _context = context;
        }

        [HttpGet("GetAdminDetail")]
        public async Task<IActionResult> GetUserDetails()
        {
            List<Admin> admins = await _context.Admin.ToListAsync();
            return Ok(admins);
        }
    }
}
