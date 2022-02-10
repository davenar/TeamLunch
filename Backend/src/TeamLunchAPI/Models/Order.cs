using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamLunchAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Person { get; set; }
        public string Dish { get; set; }
        public int Quantity { get; set; }
    }
}
