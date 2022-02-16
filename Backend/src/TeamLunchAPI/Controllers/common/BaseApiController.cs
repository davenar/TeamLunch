using Microsoft.AspNetCore.Mvc;
using TeamLunchAPI.Authorization;
using TeamLunchAPI.Helpers;

namespace TeamLunchAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly DataContext _context;

        public BaseApiController(DataContext context)
        {
            _context = context;
        }

    }
}