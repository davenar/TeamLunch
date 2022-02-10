using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamLunchAPI.Models.Users
{
    public class AuthenticateResponse
    {
        public bool IsAuth { get; set; } = true;
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public bool isEnabled { get; set; }
        public bool isAdmin { get; set; }
        public string JwtToken { get; set; }
    }
}
