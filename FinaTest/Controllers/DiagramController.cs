using FinaTest.Models;
using FinaTest.Models.DB;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FinaTest.Controllers
{
    public class DiagramController : Controller
    {
        // GET: Diagram
        public ActionResult Diagram(int id)
        {
            var result = new List<ProductModelStr>();
            using (FinaEntities db = new FinaEntities())
            {
                result = (from p in db.Products
                          where (p.CategoryId == id)
                          select new ProductModelStr
                          {
                              ID = p.ID,
                              Name = p.Name,
                              Code = p.Code,
                              Country = p.country,
                              CompletionDate = p.CompletionDate.ToString(),
                              Price = p.Price,
                              StartDate = p.startDate.ToString()

                          }).ToList();

              
            }

            return View(result);
        }
    }
}