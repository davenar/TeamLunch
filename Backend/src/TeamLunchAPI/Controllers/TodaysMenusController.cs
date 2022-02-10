using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamLunchAPI.Helpers;
using TeamLunchAPI.Models;

namespace TeamLunchAPI.Controllers
{
    public class TodaysMenusController : BaseController
    {
        public TodaysMenusController(DataContext context) : base(context)
        {
        }

        // GET: api/TodaysMenus/FetchAllTodaysMenus
        [HttpGet("FetchAllTodaysMenus")]
        public async Task<ActionResult<IEnumerable<TodaysMenu>>> GetTodaysMenus()
        {
            return await _context.TodaysMenus.ToListAsync();
        }

        // GET: api/TodaysMenus/GetTodaysMenu/5
        [HttpGet("GetTodaysMenu/{id}")]
        public async Task<ActionResult<TodaysMenu>> GetTodaysMenu(int id)
        {
            var todaysMenu = await _context.TodaysMenus.FindAsync(id);

            if (todaysMenu == null)
            {
                return NotFound();
            }

            return todaysMenu;
        }

        // PUT: api/TodaysMenus/UpdateTodaysMenu/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateTodaysMenu/{id}")]
        public async Task<IActionResult> PutTodaysMenu(int id, TodaysMenu todaysMenu)
        {
            if (id != todaysMenu.Id)
            {
                return BadRequest();
            }

            _context.Entry(todaysMenu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodaysMenuExists(id))
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

        // POST: api/TodaysMenus/CreateTodaysMenu
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateTodaysMenu")]
        public async Task<ActionResult<TodaysMenu>> PostTodaysMenu(TodaysMenu todaysMenu)
        {
            _context.TodaysMenus.Add(todaysMenu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodaysMenu", new { id = todaysMenu.Id }, todaysMenu);
        }

        // DELETE: api/TodaysMenus/DeleteTodaysMenu/5
        [HttpDelete("DeleteTodaysMenu/{id}")]
        public async Task<IActionResult> DeleteTodaysMenu(int id)
        {
            var todaysMenu = await _context.TodaysMenus.FindAsync(id);
            if (todaysMenu == null)
            {
                return NotFound();
            }

            _context.TodaysMenus.Remove(todaysMenu);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodaysMenuExists(int id)
        {
            return _context.TodaysMenus.Any(e => e.Id == id);
        }
    }
}
