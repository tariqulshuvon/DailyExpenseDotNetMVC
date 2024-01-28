
var ExpDetailsHelper = {
    initDataTable: function () {
        return $('#tblExpD').DataTable({
            "responsive": true,
            "bDestroy": true,
            "columns": [
                { "data": "SL" },
                { "data": "Name" },
                { "data": "Item" },
                { "data": "Qty" },
                { "data": "Rate" },
                { "data": "Value" },
                { "data": null },
            ],
            "columnDefs": [
                {
                    "targets": [0],
                    "width": "2%",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                },
                {
                    "targets": [6],
                    "render": function (data, type, row, meta) {
                        return '<button type="button" class="button" onclick="ExpDetailsHelper.clearDataTable(' + meta.row + ')" > Cancel</button> <button type="button" class="button" onclick="ExpDetailsHelper.saveDataTable(' + meta.row + ')" > Save</button>'
                    }
                }
            ],
        });
    },

    clearDataTable: function (rowIndex) {
        var table = ExpDetailsHelper.initDataTable();
        table.row(rowIndex).remove().draw();
    },

    initDatePicker: function () {
        $("#showToday").datepicker({ format: "dd-M-yyyy", autoclose: true });
        $("#showToday").datepicker("setDate", "1").val('');
    },

    calculateValue: function () {
        var qty = parseFloat($("#txtQty").val()) || 0;
        var rate = parseFloat($("#txtRate").val()) || 0;
        var value = qty * rate;

        $("#txtValue").val(value.toFixed(2));
    },

    initEvents: function () {
        $("#btnCloseModal").click(function () {
            ExpDetailsHelper.modalCloseSweetAlert();
        });
        $("#btnModal").click(function () {
            $("#myModal").modal("show");
        });

        //$("#closeModal").click(function () {
        //    $("#myModal").modal("hide");
        //});

        $("#btnAddToTable").click(function () {

            ExpDetailsHelper.tblAddingSweetAlert();
        });
        $("#btnClrModal").click(function () {
            ExpDetailsHelper.modalClearSweetAlert();
        });

        $("#showToday").css({
            "font-size": "20px"
        });
    },
    modalClearSweetAlert: function () {

                swal({
                    title: 'Cleared!',
                    text: 'Modal data has been cleared successfully!',
                    type:"success",
                    icon: 'success',
                    timer: 750,
                    showConfirmButton: false
                });
                $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');
            
    },
    modalCloseSweetAlert: function () {
        swal({
            title: "Close Modal",
            text: "Are you sure you want to close the modal?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, close it!',
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            timer: 1000

        }, function (isConfirmed) {
            if (isConfirmed) {
                swal({
                    title: 'Closed!',
                    text: 'Modal has been closed successfully!',
                    type: "success",
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                $("#myModal").modal("hide");
            } else {
                swal({
                    title: "Cancelled",
                    text: "Modal is not closed",
                    type: "error",
                    icon: "error",
                    timer: 1500, 
                    showConfirmButton: false 
                });
            }
        });
    },



    tblAddingSweetAlert: function () {
        swal({
            title: "Are you sure?",
            text: "You want to add this data to the table?!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            closeOnCancel: false

        }, function (isConfirmed) {
            if (isConfirmed) {
                ExpDetailsHelper.addToTable();
                swal({
                    title: 'Added!',
                    text: 'Data successfully Added to the table!',
                    type: "success",
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                swal({
                    title: 'Cancelled',
                    text: 'Data did not Added to the table',
                    type: "error",
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    },


//    {
//    var form = this;

//    e.preventDefault(); // <--- prevent form from submitting

//    swal({
//        title: "Are you sure?",
//        text: "You will not be able to recover this imaginary file!",
//        icon: "warning",
//        buttons: [
//            'No, cancel it!',
//            'Yes, I am sure!'
//        ],
//        dangerMode: true,
//    }).then(function (isConfirm) {
//        if (isConfirm) {
//            swal({
//                title: 'Shortlisted!',
//                text: 'Candidates are successfully shortlisted!',
//                icon: 'success'
//            }).then(function () {
//                form.submit(); // <--- submit form programmatically
//            });
//        } else {
//            swal("Cancelled", "Your imaginary file is safe :)", "error");
//        }
//    })
//});


    addToTable: function () {
        var table = ExpDetailsHelper.initDataTable();

        table.row.add({
            "SL": table.data().count() + 1,
            "Name": $("#txtName").val(),
            "Item": $("#txtItem").val(),
            "Qty": $("#txtQty").val(),
            "Rate": $("#txtRate").val(),
            "Value": parseFloat($("#txtQty").val()) * parseFloat($("#txtRate").val()),
        }).draw(false);

        $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');

        $("#myModal").modal("show");
    },

    getSelectionStart: function (o) {
        if (o.createTextRange) {
            var r = document.selection.createRange().duplicate();
            r.moveEnd('character', o.value.length);
            if (r.text === '') return o.value.length;
            return o.value.lastIndexOf(r.text);
        } else return o.selectionStart;
    },

    isDeciaml: function (el, evt, deci_point) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var number = el.value.split('.');
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        //just one dot
        if (number.length > 1 && charCode === 46) {
            return false;
        }
        //get the carat position
        var caratPos = ExpDetailsHelper.getSelectionStart(el);
        var dotPos = el.value.indexOf(".");
        if (caratPos > dotPos && dotPos > -1 && (number[1].length > deci_point - 1)) {
            return false;
        }
        return true;
    },

    AllowNumbersOnly: function (e) {
        var code = (e.which) ? e.which : e.keyCode;
        if (code > 31 && (code < 48 || code > 57)) {
            e.preventDefault();
        }
    }
};

$(function () {

             $("table, tr, td, th").css({
            "border": "1px solid black",
            "border-collapse": "collapse",
            "margin": "2px",
            "padding": "2px",
            "text-align": "center"
        });
        ExpDetailsHelper.initDatePicker();
        var table = ExpDetailsHelper.initDataTable();
        ExpDetailsHelper.initEvents();

});






//$(function () {
//    $(document).ready(function () {
//        $("#showToday").datepicker({ format: "dd-M-yyyy", autoclose: true });

//        $("table, tr, td, th").css({
//            "border": "1px solid black",
//            "border-collapse": "collapse",
//            "margin": "2px",
//            "padding": "2px",
//            "text-align": "center"
//        });

//        // Initialize DataTable with an empty dataset
//        var table = $('#tblExpD').DataTable({
//            "responsive": true,
//            "bDestroy": true,
//            "columns": [
//                { "data": "SL" },
//                { "data": "Name" },
//                { "data": "Item" },
//                { "data": "Qty" },
//                { "data": "Rate" },
//                { "data": "Value" },
//                { "data": null },
//            ],
//            "columnDefs": [
//                {
//                    "targets": [0],
//                    "width": "2%",
//                    render: function (data, type, row, meta) {
//                        return meta.row + meta.settings._iDisplayStart + 1;
//                    },
//                },
//                {
//                    "targets": [6],
//                    "render": function (data, type, row, meta) {
//                        return '<button type="button" class="button" onclick="SaveHelper.ViewCaseStudyDetails(' + meta.row + ')" > View</button>'
//                    }
//                }
//            ],
//        });

//        $("#btnModal").click(function () {
//            $("#myModal").modal("show");
//        });

//        $("#btnAddToTable").click(function () {
//            // Get values from modal inputs
//            var name = $("#txtName").val();
//            var item = $("#txtItem").val();
//            var qty = $("#txtQty").val();
//            var rate = $("#txtRate").val();
//            var value = qty * rate;

//            // Add a new row to the DataTable
//            table.row.add({
//                "SL": table.data().count() + 1,
//                "Name": name,
//                "Item": item,
//                "Qty": qty,
//                "Rate": rate,
//                "Value": value,
//            }).draw(false);

//            // Clear modal inputs
//            $("#txtName, #txtItem, #txtQty, #txtRate").val('');

//            // Close the modal
//            $("#myModal").modal("hide");
//        });

//        // Rest of your code...
//    });
//});



