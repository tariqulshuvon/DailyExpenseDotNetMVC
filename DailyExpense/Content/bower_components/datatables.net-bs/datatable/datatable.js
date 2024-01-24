$(document).ready(function() {
miDataTable();
} );




function example() {
    $('#example').DataTable({

      "language": {
      "emptyTable":			"<i>No data found in the  tabla.</i>",
      "info":		   		"Showing _START_ to _END_ of _TOTAL_ ",
      "infoEmpty":			"Show 0 Entries Out of 0.",
      "infoFiltered":			"(filtered from _MAX_ records)",
      "infoPostFix":			"(Entries)",
      "lengthMenu":			"Show _MENU_ records",
      "loadingRecords":		        "Loading.....",
      "processing":			"Processing.....",
      "search":			        "<span style='font-size:15px; padding:25px;'>Search</span>",
      "searchPlaceholder":		"Insert Keyword...",
      "zeroRecords":			"No Record Found!!",
       "paginate": {
        "first":			"First",
        "last":				"Last",
        "next":				"Next",
        "previous":			"Previous"
      },
      "aria": {
        "sortAscending":	"Upward sorting",
        "sortDescending":	"Descending order"
      }
    },

    "lengthMenu":		[[10, 20, 25, 50, -1], [3,5,7, 10, 20, 25, 50, "All"]],
    "iDisplayLength":	10,





    });
}
