using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DailyExpense.Controllers
{
    public class UIExpenseDetailsController : Controller
    {
        // GET: ExpenseDetails
        public ActionResult UIExpenseDetails()
        {
            return View();
        }
    }
}