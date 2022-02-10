using System.Text.Json.Serialization;

namespace TeamLunchAPI.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public bool isEnabled { get; set; }
        public bool isAdmin { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }
    }
}
