using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinaTest.Models
{
    public class HomeViewModel
    {
        public List<CategoryModel> Category{ get; set; }
        public int GrupId { get; set; }
        public string GrupName { get; set; }
    }
}