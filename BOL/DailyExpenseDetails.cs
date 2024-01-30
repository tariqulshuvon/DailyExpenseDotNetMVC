using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DailyExpenseDetails
    {
        public string ExpenseNo { get; set; }
        public string SelectedDate { get; set; }
        public string Name { get; set; }
        public string Item { get; set; }
        public string Qty { get; set; }
        public string Rate { get; set; }
        public string Value { get; set; }
    }
}
