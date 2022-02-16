
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using TeamLunchAPI.Authorization;
using TeamLunchAPI.Entities;
using TeamLunchAPI.Helpers;
using TeamLunchAPI.Models.Users;


namespace TeamLunchAPI.Services
{
    public interface IUserService
    {
        string Authenticate(AuthenticateRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
        bool Register(User model, string password);
        void Update(User user, string password);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private IJwtUtils _jwtUtils;

        public UserService(
            DataContext context,
            IJwtUtils jwtUtils)
        {
            _context = context;
            _jwtUtils = jwtUtils;
        }

        public string Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

            // validate
            if (user == null || !BCryptNet.Verify(model.Password, user.PasswordHash))
                return string.Empty;

            // authentication successful
            return _jwtUtils.GenerateToken(user);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return getUser(id);
        }

        public bool Register(User user, string password)
        {
            // validate
            if (_context.Users.Any(x => x.Username == user.Username))
                return false;

            // hash password
            user.PasswordHash = BCryptNet.HashPassword(password);

            // save user
            _context.Users.Add(user);
            _context.SaveChanges();
            return true;
        }

        public void Update(User model, string password = "")
        {
            var user = getUser(model.Id);

            // validate
            if (model.Username != user.Username && _context.Users.Any(x => x.Username == model.Username))
                throw new AppException("Username '" + model.Username + "' is already taken");

            // hash password if it was entered
            if (!string.IsNullOrEmpty(password))
                user.PasswordHash = BCryptNet.HashPassword(password);

            // copy model to user and save
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Username = model.Username;
            user.isEnabled = model.isEnabled;
            user.isAdmin = model.isAdmin;

            //_context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = getUser(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        // helper methods

        private User getUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}

//using AutoMapper;
//using BCryptNet = BCrypt.Net.BCrypt;
//using System.Collections.Generic;
//using System.Linq;
//using TeamLunchAPI.Authorization;
//using TeamLunchAPI.Entities;
//using TeamLunchAPI.Helpers;
//using TeamLunchAPI.Models.Users;


//namespace TeamLunchAPI.Services
//{
//    public interface IUserService
//    {
//        AuthenticateResponse Authenticate(AuthenticateRequest model);
//        IEnumerable<User> GetAll();
//        User GetById(int id);
//        void Register(RegisterRequest model);
//        void Update(int id, UpdateRequest model);
//        void Delete(int id);
//    }

//    public class UserService : IUserService
//    {
//        private DataContext _context;
//        private IJwtUtils _jwtUtils;
//        private readonly IMapper _mapper;

//        public UserService(
//            DataContext context,
//            IJwtUtils jwtUtils,
//            IMapper mapper)
//        {
//            _context = context;
//            _jwtUtils = jwtUtils;
//            _mapper = mapper;
//        }

//        public AuthenticateResponse Authenticate(AuthenticateRequest model)
//        {
//            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

//            // validate
//            if (user == null || !BCryptNet.Verify(model.Password, user.PasswordHash))
//                return new AuthenticateResponse
//                {
//                    IsAuth = false
//                };
//            //throw new AppException("Username or password is incorrect");
//            //return new NotFoundResult();

//            // authentication successful
//            var response = _mapper.Map<AuthenticateResponse>(user);
//            response.JwtToken = _jwtUtils.GenerateToken(user);
//            return response;
//        }

//        public IEnumerable<User> GetAll()
//        {
//            return _context.Users;
//        }

//        public User GetById(int id)
//        {
//            return getUser(id);
//        }

//        public void Register(RegisterRequest model)
//        {
//            // validate
//            if (_context.Users.Any(x => x.Username == model.Username))
//                throw new AppException("Username '" + model.Username + "' is already taken");

//            // map model to new user object
//            var user = _mapper.Map<User>(model);

//            // hash password
//            user.PasswordHash = BCryptNet.HashPassword(model.Password);

//            // save user
//            _context.Users.Add(user);
//            _context.SaveChanges();
//        }

//        public void Update(int id, UpdateRequest model)
//        {
//            var user = getUser(id);

//            // validate
//            if (model.Username != user.Username && _context.Users.Any(x => x.Username == model.Username))
//                throw new AppException("Username '" + model.Username + "' is already taken");

//            // hash password if it was entered
//            if (!string.IsNullOrEmpty(model.Password))
//                user.PasswordHash = BCryptNet.HashPassword(model.Password);

//            // copy model to user and save
//            _mapper.Map(model, user);
//            _context.Users.Update(user);
//            _context.SaveChanges();
//        }

//        public void Delete(int id)
//        {
//            var user = getUser(id);
//            _context.Users.Remove(user);
//            _context.SaveChanges();
//        }

//        // helper methods

//        private User getUser(int id)
//        {
//            var user = _context.Users.Find(id);
//            if (user == null) throw new KeyNotFoundException("User not found");
//            return user;
//        }
//    }
//}
