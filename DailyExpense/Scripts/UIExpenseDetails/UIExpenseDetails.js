

$(function () {


    $(document).ready(function () {
        $("#showToday").datepicker({ format: "dd-M-yyyy", autoclose: true });
        $("#showToday").datepicker("setDate", "1");

        $("#myModal form").validate({
            rules: {
                txtName: "required",
                txtItem: "required",
                txtQty: "required",
                txtRate: "required"
            },
            messages: {
                txtName: {
                    required: "Please enter Name"
                },
                txtItem: {
                    required: "Please enter Item Name"
                },
                txtQty: {
                    required: "Please enter Quantity"
                },
                txtRate: {
                    required: "Please enter Rate"
                }
            },
            errorPlacement: function (error, element) {
                error.addClass('errorMsq');

                error.appendTo(element.parent());
            }
        });
    });








    ExpDetailsHelper.initDataTable();


});






$("#btnModal").click(function () {
    $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');


    $("#myModal").modal("show");
});

$("#btnCloseModal").click(function () {
    ExpDetailsHelper.modalCloseSweetAlert();
});

$("#btnModalExp").click(function () {

    $("#myModalExpDetails").modal("show");
    ExpDetailsHelper.GetExpenseDetailsList();
});



$("#btnAddToTable").click(function () {
    if ($("#myModal form").valid()) {
        var name = $("#txtName").val();
        var item = $("#txtItem").val();
        var qty = $("#txtQty").val();
        var rate = $("#txtRate").val();
        if (name === '' || item === '' || qty === '' || rate === '') {
            $("#myModal form").validate();
            ExpDetailsHelper.tblDataNotAddedSweetAlert();
        } else {
            ExpDetailsHelper.tblAddingSweetAlert();
        }
    }
});


//$("#btnAddToTable").click(function () {

//        var name = $("#txtName").val();
//        var item = $("#txtItem").val();
//        var qty = $("#txtQty").val();
//        var rate = $("#txtRate").val();
//        if ((name, item, qty, rate) == '') {
//            ExpDetailsHelper.tblDataNotAddedSweetAlert();
//        } else {
//            ExpDetailsHelper.tblAddingSweetAlert();
//        }
    
//});
$("#btnClrModal").click(function () {
    ExpDetailsHelper.modalClearSweetAlert();
});
$("#btnSave").click(function () {
    ExpDetailsHelper.SaveCollectionData();
});

var ExpDetailsHelper = {

    GetExpenseDetailsList: function () {

        $.getJSON("../UIExpenseDetails/GetAllExpense")
            .done(function (data) {
                data = $.parseJSON(data);
                ExpDetailsHelper.BuildExpenseDetailsTbl(data.Table);
            });
    },

    BuildExpenseDetailsTbl: function (tbldata) {
        $('#tblExpDList').DataTable({
            data: tbldata,
            "responsive": true,
            "bDestroy": true,
            "columns": [
                { "data": "SL" },
                { "data": "ExpenseNo" },
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
                    "targets": [3],
                    "render": function (data, type, row, meta) {
                        return '<label><a style="cursor: pointer;" onclick="ExpDetailsHelper.ViewExpDetails(\'' + row.ExpenseNo + '\')">View</a></label>' + ' '+
                            '<button id="btnRemove" name="btnRemove" type="button" onclick="ExpDetailsHelper.SearchforItemDelete(' + meta.row + ')" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>';
                    }


                }
            ],


            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;

                var total = api
                    .column(2)
                    .data()
                    .reduce(function (a, b) {
                        return floatval(a) + floatval(b);
                    }, 0);

                total = total.toFixed(2);
                // Update footer
                $(api.column(2).footer()).html(
                    +total
                );
            },

        });

    },


    initDataTable: function () {
        return $('#tblExpD').DataTable({
            "responsive": true,
            "bDestroy": true,
            "columns": [
                { "data": "SL" },
                { "data": "Name" },
                { "data": "Item" },
                { "data": "Quantity" },
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
                        return '<button type="button" class="button" onclick="ExpDetailsHelper.clearDataTable(' + meta.row + ')" > Cancel</button> <button type="button" class="button" onclick="ExpDetailsHelper.editDataTable(' + meta.row + ')" > Edit</button>'
                    }
                }
            ],


        });
    },



    ViewExpDetails: function (ExpenseNo) {
        $("#txtExpNo").val(ExpenseNo);
        var srchid = ExpenseNo;
        ExpDetailsHelper.ViewExpDetailByID(srchid, "VIEW");
        $("#myModalExpDetails").modal("hide");

    },



    ViewExpDetailByID: function (srchid, typ) {
        $.ajax({
            url: "../UIExpenseDetails/GetExpDetailByID/?ExpenseNo=" + srchid,
            type: "GET",
            dataType: "json",
            success: function (data) {
                try {
                    data = JSON.parse(data);

                var formattedDate = moment(data.Table[0].SelectedDate).format("DD-MMM-YYYY");

                $("#showToday").val(formattedDate);
                    //$("#showToday").val(data.Table[0].SelectedDate).datepicker({ format: "dd-M-yyyy", autoclose: true });
                    ExpDetailsHelper.addToTable(data.Table);
                } catch (error) {
                    console.error("Error parsing JSON: " + error);
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX request failed: " + status + ", " + error);
            }
        });
    },


    SearchforItemDelete: function (rowId) {
        var table = $("#tblExpDList").DataTable();
        table.row(rowId)
            .remove()
            .draw();
    },




    calculateValue: function () {
        var qty = parseFloat($("#txtQty").val()) || 0;
        var rate = parseFloat($("#txtRate").val()) || 0;
        var value = qty * rate;

        $("#txtValue").val(value.toFixed(2));
    },

    clearDataTable: function (rowIndex) {
        var table = ExpDetailsHelper.initDataTable();
        table.row(rowIndex).remove().draw();
    },


    modalClearSweetAlert: function () {

                swal({
                    title: 'Cleared!',
                    text: 'Modal data has been cleared successfully!',
                    type:"success",
                    icon: 'success',
                    timer: 500,
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
            closeOnCancel: false
        }, function (isConfirmed) {
            if (isConfirmed) {
                $("#myModal").modal("hide");
                swal({
                    title: 'Closed!',
                    text: 'Modal has been closed successfully!',
                    type: "success",
                    icon: 'success',
                    timer: 700,
                    showConfirmButton: false
                });

            } else {
                swal({
                    title: "Cancelled",
                    text: "Modal is not closed",
                    type: "error",
                    icon: "error",
                    timer: 700, 
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
                    timer: 500,
                    showConfirmButton: false
                });
                $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');
            } else {
                swal({
                    title: 'Cancelled',
                    text: 'Data did not Added to the table',
                    type: "error",
                    icon: 'error',
                    timer: 700,
                    showConfirmButton: false
                });
            }
        });
    },

    tblDataNotAddedSweetAlert: function () {

        swal({
            title: 'Not Added!',
            text: 'Please Fill all the fields!',
            type: "error",
            icon: 'error',
            timer: 500,
            showConfirmButton: false
        });
        $("#myModal").modal("show");
    },



    editDataTable: function (rowIndex) {
        var table = $('#tblExpD').DataTable();

        var rowData = table.row(rowIndex).data();

        $('#txtExpNo').val(rowData.ExpenseNo);
        $('#txtName').val(rowData.Name);
        $('#txtItem').val(rowData.Item);
        $('#txtQty').val(rowData.Quantity);
        $('#txtRate').val(rowData.Rate);
        $('#txtValue').val(rowData.Value);

        $('#myModal').modal('show');


    },

    addToTable: function (data) {
        var table = ExpDetailsHelper.initDataTable();
        if (data && data.length > 0) {
            table.clear().rows.add(data).draw();
        } else {
        var name = $("#txtName").val();
        var item = $("#txtItem").val();
        var qty = $("#txtQty").val();
        var rate = $("#txtRate").val();
        var value = parseFloat(qty) * parseFloat(rate);

        var existingRow = table.rows().indexes().filter(function (value, index) {
            var rowData = table.row(value).data();
            return (
                rowData.Name === name &&
                rowData.Item === item &&
                rowData.Quantity === qty &&
                rowData.Rate === rate
            );
        });

            if (existingRow.length > 0) {
                var rowIndex = existingRow[0];
                table.row(rowIndex).data({
                    "SL": table.row(rowIndex).data().SL,
                    "Name": name,
                    "Item": item,
                    "Quantity": qty,
                    "Rate": rate,
                    "Value": value
                }).draw();

            } else {
                if (existingRow.length === 0) {
                    table.row.add({
                        "SL": table.data().count() + 1,
                        "Name": name,
                        "Item": item,
                        "Quantity": qty,
                        "Rate": rate,
                        "Value": value
                    }).draw(false);
                }
            }
        }


    },



//    if(existingRow.length > 0) {
//        var rowIndex = existingRow[0];
//table.row(rowIndex).data({
//    "SL": table.row(rowIndex).data().SL, // Assuming SL is the first column
//    "Name": name,
//    "Item": item,
//    "Quantity": qty,
//    "Rate": rate,
//    "Value": value
//}).draw(); // Redraw the table after updating data
//    } else {
//    table.row.add({
//        "SL": table.data().count() + 1,
//        "Name": name,
//        "Item": item,
//        "Quantity": qty,
//        "Rate": rate,
//        "Value": value
//    }).draw(false);
//}
    SaveCollectionData: function () {

        var obj = new Object();
        obj.SelectedDate = $("#showToday").val();
        obj.expNo = $("#txtExpNo").val();


            var listitem = ExpDetailsHelper.CreateUnitObject();
            if (listitem.length > 0) {
                console.log(listitem);
                var objItem= JSON.stringify(obj);
                var newItemList = JSON.stringify(listitem);
                var jsonParam = "objDetails:" + objItem + ',ItemList:' + newItemList;
                console.log(jsonParam);
                var serviceUrl = "/UIExpenseDetails/SaveAllData";
                jQuery.ajax({
                    url: serviceUrl,
                    async: false,
                    type: "POST",
                    data: "{" + jsonParam + "}",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.status) {
                            //alert(data.data01);
                            //var table = $('#tblExpD').DataTable();
                            //table.clear().draw();
                           
                            $('#lblExpNo').val(data.data01);
                            $('#txtExpNo').val(data.data01);
                            swal({
                                title: "Congratulation!!",
                                text: "Save Successfully",
                                type: "success",
                                closeOnConfirm: false,
                                timer: 1000

                            });
                        } else {
                            swal({
                                title: "Sorry!",
                                text: "Failed to save!",
                                type: "error",
                                closeOnConfirm: false,
                                timer: 1000
                            });
                        }
                    },
                    error: function (data) {
                        swal({
                            title: "Sorry!",
                            text: "Something Went Wrong !!! \n" + data.statusText,
                            type: "error",
                            closeOnConfirm: false
                        });
                    }
                });
            } else {
                swal({
                    title: "Sorry!",
                    text: "Please insert Amount!",
                    type: "error",
                    closeOnConfirm: false
                });
            }


    },

    CreateUnitObject: function () {
        var table = $("#tblExpD").DataTable();
        var detaildata = table.data();
        var datalist = [];

        for (var j = 0; j < detaildata.length; j++) {
            var obj = new Object();           
            obj.Name = table.cell(j, 1).data();
            obj.Item = table.cell(j, 2).data();
            obj.Qty = parseInt(table.cell(j, 3).data());
            obj.Rate = parseFloat(table.cell(j, 4).data());
            obj.Value = parseFloat(table.cell(j, 5).data());

            datalist.push(obj);
        }

        return datalist;
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






