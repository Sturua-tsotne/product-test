using FinaTest.Models;
using FinaTest.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace FinaTest.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var result = new List<HomeViewModel>();
            using (FinaEntities db = new FinaEntities())
            {
                var c = db.categories.Select(x => x);
                result = (from g in db.Grups
                          select new HomeViewModel
                          {
                              GrupId = g.ID,
                              GrupName = g.Name,
                              Category = c.Where(x => x.GrupID == g.ID).Select(x => new CategoryModel { CategoryId = x.ID, CategoryName = x.categoryName }).ToList()
                          }).ToList();
                return View(result);

            }

        }
        public JsonResult AddGrup(string name)
        {
            if (name == null)
            {
                string error = "ველი ცარიელია";
                return Json(new { success = false, result = "nosaved", error });
            }
            else
            {


                using (FinaEntities db = new FinaEntities())
                {
                    db.Grups.Add(new Grup()
                    {
                        Name = name,
                    });
                    db.SaveChanges();
                }
                return Json(new { success = true, result = "saved", name });
            }
        }
        [HttpGet]
        public JsonResult Delete(string id)
        {
            int a = Convert.ToInt32(id);

            using (FinaEntities db = new FinaEntities())
            {


                db.categories.RemoveRange(db.categories.Where(x => x.GrupID == a));

                db.Grups.Remove(db.Grups.FirstOrDefault(x => x.ID == a));
                db.SaveChanges();
                return Json(new { success = true, result = "saved", }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult AddCategory(string id, string name)
        {
            var intid = Convert.ToInt32(id);

            using (FinaEntities db = new FinaEntities())
            {
                db.categories.Add(new category()
                {
                    categoryName = name,
                    GrupID = intid,
                });
                db.SaveChanges();
            }
            return Json(new { success = true, result = "saved", name }, JsonRequestBehavior.AllowGet);


        }
        [HttpPost]
        public ActionResult Addproduct(ProductModel product)
        {
            var intid = Convert.ToInt32(product.CategoryId);

            using (FinaEntities db = new FinaEntities())
            {
                _ = db.Products.Add(new Product()
                {
                    Name = product.Name,
                    CategoryId = intid,
                    Code = product.Code,
                    country = product.Country,
                    Price = product.Price,
                    startDate = product.StartDate,
                    CompletionDate = product.CompletionDate
                });
                db.SaveChanges();
            }
            return RedirectToAction("index");
        }
        [HttpGet]
        public JsonResult Openproduct(int id)
        {

            var result = new List<ProductModelString>();
            using (FinaEntities db = new FinaEntities())
            {
                result = (from p in db.Products
                          where (p.CategoryId == id)
                          select new ProductModelString
                          {
                              ID = p.ID,
                              Name = p.Name,
                              Code = p.Code,
                              Country = p.country,
                              CompletionDate = p.CompletionDate.ToString(),
                              Price = p.Price,
                              StartDate = p.startDate.ToString()

                          }).ToList();


                return Json(new { success = true, result }, JsonRequestBehavior.AllowGet);
            }




        }
        [HttpGet]
        public ActionResult _Editproducticon(int? id)
        {

            using (FinaEntities db = new FinaEntities())
            {


                var p = db.Products.FirstOrDefault(x => x.ID == id);


                var result = (new ProductModelStr()
                {
                    ID = p.ID,
                    Name = p.Name,
                    Code = p.Code,
                    Country = p.country,
                    CompletionDate = p.CompletionDate.ToString("yyyy/dd/mm"),
                    Price = p.Price,
                    StartDate = p.startDate.ToString("yyyy/dd/mm")
                });
                return View(result);

            }



        }
        [HttpPost]
        public ActionResult Editproducticon(ProsuctListmodel pr)
        {
            using (FinaEntities db = new FinaEntities())
            {
                var dp = db.Products.FirstOrDefault(x => x.ID == pr.ID);
                dp.Name = pr.Name;
                dp.Price = pr.Price;
                dp.startDate = pr.StartDate;
                dp.country = pr.Country;
                dp.CompletionDate = pr.CompletionDate;
                dp.Code = pr.Code;

                db.SaveChanges();
            }

            return RedirectToAction("index");
        }

        [HttpGet]
        public JsonResult DeletCategory(int id)
        {


            using (FinaEntities db = new FinaEntities())
            {
                db.Products.RemoveRange(db.Products.Where(x => x.CategoryId == id));

                db.categories.Remove(db.categories.FirstOrDefault(x => x.ID == id));
                db.SaveChanges();
                return Json(new { success = true, result = "saved", }, JsonRequestBehavior.AllowGet);
            }


        }
        [HttpGet]
        public ActionResult deleproduction(int id)
        {
            using (FinaEntities db = new FinaEntities())
            {
                var dp = db.Products.FirstOrDefault(x => x.ID == id);
                ViewBag.ID = dp.ID;
            }
            return View();
        }
        public ActionResult Deleprod(int id)
        {
            using (FinaEntities db = new FinaEntities())
            {
                db.Products.Remove(db.Products.FirstOrDefault(x => x.ID == id));
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}