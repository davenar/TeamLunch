using Microsoft.AspNetCore.Mvc;
using TeamLunchAPI.Authorization;
using TeamLunchAPI.Helpers;

namespace TeamLunchAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController: ControllerBase
    {
        protected readonly DataContext _context;

        public BaseController(DataContext context)
        {
            _context = context;
        }

    }
}