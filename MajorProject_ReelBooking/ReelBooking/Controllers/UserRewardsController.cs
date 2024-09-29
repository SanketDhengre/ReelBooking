//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ReelBooking.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserRewardsController : ControllerBase
//    {
//    }
//}

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
    public class UserRewardsController : ControllerBase
    {
        private readonly MajorProjectContext _context;

        public UserRewardsController(MajorProjectContext context)
        {
            _context = context;
        }

        // GET: api/UserRewards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReward>>> GetUserRewards()
        {
            return await _context.UserRewards.ToListAsync();
        }

        // GET: api/UserRewards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReward>> GetUserReward(int id)
        {
            var userReward = await _context.UserRewards.FindAsync(id);

            if (userReward == null)
            {
                return NotFound();
            }

            return userReward;
        }

        // PUT: api/UserRewards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserReward(int id, UserReward userReward)
        {
            if (id != userReward.RewardId)
            {
                return BadRequest();
            }

            _context.Entry(userReward).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRewardExists(id))
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

        // POST: api/UserRewards
        [HttpPost]
        public async Task<ActionResult<UserReward>> PostUserReward(UserReward userReward)
        {
            _context.UserRewards.Add(userReward);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserReward", new { id = userReward.RewardId }, userReward);
        }

        // DELETE: api/UserRewards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserReward(int id)
        {
            var userReward = await _context.UserRewards.FindAsync(id);
            if (userReward == null)
            {
                return NotFound();
            }

            _context.UserRewards.Remove(userReward);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserRewardExists(int id)
        {
            return _context.UserRewards.Any(e => e.RewardId == id);
        }
    }
}
