using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TeamLunchAPI.Entities;
using TeamLunchAPI.Models;

namespace TeamLunchAPI.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }
        public DbSet<TodaysMenu> TodaysMenus { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
