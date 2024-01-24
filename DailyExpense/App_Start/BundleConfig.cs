using System.Web;
using System.Web.Optimization;

namespace DailyExpense
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));




            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                                  "~/Content/bower_components/jquery/dist/jquery.min.js",
                                   "~/Content/bower_components/jquery-ui/jquery-ui.min.js",
                                   "~/Content/bower_components/bootstrap/dist/js/bootstrap.min.js",
                                   "~/Content/bower_components/raphael/raphael.min.js",
                                   "~/Content/bower_components/morris.js/morris.min.js",
                                   "~/Content/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js",
                                   "~/Content/bower_components/select2/dist/js/select2.full.min.js",
                                   "~/Content/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js",
                                   "~/Content/plugins/jvectormap/jquery-jvectormap-world-mill-en.js",
                                   "~/Content/bower_components/jquery-knob/dist/jquery.knob.min.js",
                                   "~/Content/bower_components/moment/min/moment.min.js",
                                   "~/Content/bower_components/bootstrap-daterangepicker/daterangepicker.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/jquery-3.3.1.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/jquery.dataTables.min.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/dataTables.responsive.min.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/dataTables.fixedHeader.min.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/dataTables.bootstrap.min.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/dataTables.checkboxes.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/js/dataTables.checkboxes.min.js",
                                   "~/Content/bower_components/datatables.net-bs/datatable/datatable.js",
                                   "~/Content/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
                                   "~/Content/EasyAutocomplete-1.3.5/jquery.easy-autocomplete.min.js",
                                   "~/Content/plugins/timepicker/bootstrap-timepicker.min.js",
                                   "~/Content/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js",
                                   "~/Content/bower_components/jquery-slimscroll/jquery.slimscroll.min.js",
                                   "~/Content/bower_components/fastclick/lib/fastclick.js",
                                   "~/Content/sweetalert/js/sweetalert-dev.js",
                                   "~/Content/dist/js/adminlte.min.js",
                                   "~/Content/dist/js/pages/dashboard.js",
                                   "~/Content/dist/js/demo.js",
                                   "~/Content/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js",
                                   "~/Content/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"
                                   ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bower_components/bootstrap/dist/css/bootstrap.min.css",
                      "~/Content/bower_components/font-awesome/css/font-awesome.min.css",
                      "~/Content/bower_components/Ionicons/css/ionicons.min.css",
                      "~/Content/bower_components/select2/dist/css/select2.min.css",
                      "~/Content/dist/css/AdminLTE.min.css",
                      "~/Content/dist/css/skins/_all-skins.min.css",
                      "~/Content/bower_components/morris.js/morris.css",
                      "~/Content/bower_components/datatables.net-bs/datatable/css/jquery.dataTables.min.css",
                      "~/Content/bower_components/datatables.net-bs/datatable/css/responsive.dataTables.min.css",
                      "~/Content/bower_components/datatables.net-bs/datatable/css/responsive.bootstrap.css",
                      "~/Content/bower_components/datatables.net-bs/datatable/css/fixedHeader.dataTables.min.css",
                      "~/Content/bower_components/datatables.net-bs/datatable/css/dataTables.checkboxes.css",
                      "~/Content/bower_components/datatables.net-bs/datatable/bootstrap.min.css",
                      "~/Content/bower_components/jvectormap/jquery-jvectormap.css",
                      "~/Content/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
                      "~/Content/EasyAutocomplete-1.3.5/easy-autocomplete.min.css",
                      "~/Content/EasyAutocomplete-1.3.5/easy-autocomplete.themes.min.css",
                      "~/Content/plugins/timepicker/bootstrap-timepicker.min.css",
                      "~/Content/bower_components/bootstrap-daterangepicker/daterangepicker.css",
                      "~/Content/sweetalert/css/sweetalert.css",
                      "~/Content/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css",
                    "~/Content/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                    "~/Content/DataTables/DataTables-1.10.18/css/jquery.dataTables.min.css"
                      ));

        }
    }
}
