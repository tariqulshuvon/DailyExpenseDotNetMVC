using BOL;
using DAL;
using FastMember;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DailyExpense.Controllers
{
    public class UIExpenseDetailsController : Controller
    {
        DataSet ds;
        Common common = new Common();
        public ActionResult UIExpenseDetails()
        {
            return View();
        }

        public JsonResult SaveAllData(ExpDate objDetails, List<DailyExpenseDetails> ItemList)
        {

            bool status = false;
            DataTable itemListdt = new DataTable();

            try
            {
                using (var reader = ObjectReader.Create(ItemList))
                {
                    itemListdt.Load(reader);
                }
            }
            catch (Exception ex)
            {
                //
            }

            itemListdt.TableName = "tbl1";

            DataSet dstrnd = new DataSet("dsExpList");
            dstrnd.Tables.Add(itemListdt);

            ds = common.select_data_20X("", "SP_ENTRY_DailyExpDetails", "Save_ExpDetails", dstrnd, null, objDetails.SelectedDate, objDetails.expNo);

            if (ds.Tables[0].Rows.Count > 0)
            {
                status = true;
            }
            else
            {
                status = false;
            }


            return new JsonResult { Data = new { status = status } };

        }

        public ActionResult GetAllExpense()
        {

                ds = new DataSet();
                ds = common.select_data_20("", "SP_ENTRY_DailyExpDetails", "GET_ExpDetails");
                return Json(JsonConvert.SerializeObject(ds), JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetExpDetailByID(string ExpenseNo)
        {
            ds = common.select_data_20("", "SP_ENTRY_DailyExpDetails", "GET_ExpDetails_BYID", ExpenseNo);
            return Json(JsonConvert.SerializeObject(ds), JsonRequestBehavior.AllowGet);
        }

        //public JsonResult SaveAllData(DailyExpenseDetails objDetails)
        //{

        //    bool status = false;
        //    DataSet ds;
        //    Common common = new Common();

        //    ds = common.select_data_20X("", "SP_ENTRY_DailyExpDetails", "Save_ExpDetails", null, null, objDetails.ExpenseNo,
        //            objDetails.SelectedDate, objDetails.Name,
        //            objDetails.Item, objDetails.Qty, objDetails.Rate, objDetails.Value);

        //    if (ds.Tables[0].Rows.Count > 0)
        //    {
        //        status = true;

        //    }

        //    return new JsonResult { Data = new { status = status } };

        //}
    }
}