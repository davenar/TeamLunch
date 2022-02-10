using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeamLunchAPI.Models
{
    public class Dish
    {
        public int Id { get; set; }
        public string DishName { get; set; }
        public string DishImg { get; set; }
        public string Ingredients { get; set; }
        //public Dish (int id, string dishName, string dishImg, string ingredients)
        //{
        //    Id = id;
        //    DishName = dishName;
        //    DishImg = dishImg;
        //    Ingredients = ingredients;
        //}
    }
}
