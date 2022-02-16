using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TeamLunchAPI.Authorization;
using TeamLunchAPI.Entities;
using TeamLunchAPI.Helpers;
using TeamLunchAPI.Models.Users;
using TeamLunchAPI.Services;

namespace TeamLunchAPI.Controllers
{
    public class UsersController : BaseApiController
    {
        private IUserService _userService;

        public UsersController(IUserService userService, DataContext context) : base(context)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            return string.IsNullOrEmpty(response) ? NotFound() : Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register(RegisterRequest request)
        {
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Username = request.Username,
                isEnabled = request.isEnabled,
                isAdmin = request.isAdmin
            };
            _userService.Register(user, request.Password);
            return Ok(new { message = "Registration successful" });
        }

        [HttpGet("FetchAllUsers")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("GetUser/{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }

        [HttpPut("UpdateUser/{id}")]
        public IActionResult Update(int id, UpdateRequest request)
        {
            var user = new User
            {
                Id = id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Username = request.Username,
                isEnabled = request.isEnabled,
                isAdmin = request.isAdmin
            };
            _userService.Update(user, request.Password);
            return Ok(new { message = "User updated successfully" });
        }

        [HttpDelete("DeleteUser/{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok(new { message = "User deleted successfully" });
        }
    }
}


//using AutoMapper;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Options;
//using TeamLunchAPI.Authorization;
//using TeamLunchAPI.Helpers;
//using TeamLunchAPI.Models.Users;
//using TeamLunchAPI.Services;

//namespace TeamLunchAPI.Controllers
//{
//    [Authorize]
//    [ApiController]
//    [Route("[controller]")]
//    public class UsersController : ControllerBase
//    {
//        private IUserService _userService;
//        private IMapper _mapper;
//        private readonly AppSettings _appSettings;

//        public UsersController(
//            IUserService userService,
//            IMapper mapper,
//            IOptions<AppSettings> appSettings)
//        {
//            _userService = userService;
//            _mapper = mapper;
//            _appSettings = appSettings.Value;
//        }

//        [AllowAnonymous]
//        [HttpPost("Authenticate")]
//        public IActionResult Authenticate(AuthenticateRequest model)
//        {
//            var response = _userService.Authenticate(model);
//            return response.IsAuth ? Ok(response) : NotFound();
//        }

//        [AllowAnonymous]
//        [HttpPost("Register")]
//        public IActionResult Register(RegisterRequest model)
//        {
//            _userService.Register(model);
//            return Ok(new { message = "Registration successful" });
//        }

//        [HttpGet("FetchAllusers")]
//        public IActionResult GetAll()
//        {
//            var users = _userService.GetAll();
//            return Ok(users);
//        }

//        [HttpGet("GetUser/{id}")]
//        public IActionResult GetById(int id)
//        {
//            var user = _userService.GetById(id);
//            return Ok(user);
//        }

//        [HttpPut("UpdateUser/{id}")]
//        public IActionResult Update(int id, UpdateRequest model)
//        {
//            _userService.Update(id, model);
//            return Ok(new { message = "User updated successfully" });
//        }

//        [HttpDelete("DeleteUser/{id}")]
//        public IActionResult Delete(int id)
//        {
//            _userService.Delete(id);
//            return Ok(new { message = "User deleted successfully" });
//        }
//    }
//}