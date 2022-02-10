using System.ComponentModel.DataAnnotations;

namespace TeamLunchAPI.Models.Users
{
    public class RegisterRequest
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public bool isEnabled { get; set; }

        [Required]
        public bool isAdmin { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
