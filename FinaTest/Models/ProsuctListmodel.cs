using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinaTest.Models
{
    public class ProsuctListmodel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public string Country { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public int CategoryId { get; set; }
        public string Code { get; set; }
    }
}