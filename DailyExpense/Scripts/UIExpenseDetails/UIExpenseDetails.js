
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
                { "data": "Name" },
                { "data": "Item" },
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
                    "targets": [5],
                    "render": function (data, type, row, meta) {
                        return '<button type="button" class="button" id="btnModalExpD" onclick="ExpDetailsHelper.ViewExpDetails(' + meta.row + ')" > View</button>'
                            + '  ' + '<button id="btnRemove" name="btnRemove" type="button" onclick="ExpDetailsHelper.SearchforItemDelete(' + meta.row + ')" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>'
                    }
                }
            ],
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
        var table = $("#tblExpDList").DataTable();
        var srchid = table.cell(ExpenseNo, 1).data();
        ExpDetailsHelper.ViewExpDetailByID(srchid, "VIEW");
    },

//    ViewExpDetailByID: function (srchid, typ) {
//        //$("#btnPrint").show();

//        $.ajax({
//            url: "../UIExpenseDetails/GetExpDetailByID/?ExpenseNo=" + srchid,
//            type: "GET",
//            dataType: "json",
//            success: function (data) {
//                try {
//                    data = JSON.parse(data);
//                    ExpDetailsHelper.addToTable();
//                } catch (error) {
//                    console.error("Error parsing JSON: " + error);
//                    return;
//                }

///*                $("#myModal").modal("show");*/
//                //$("#txtName").val(data.Table[0].Name);
//                //$("#txtItem").val(data.Table[0].Item);
//                //$("#txtQty").val((data.Table[0].Quantity));
//                //$("#txtRate").val(data.Table[0].Rate);
//                //$("#txtValue").val(data.Table[0].Value);
//                //$("#myModalExpDetails").modal("hide");

//                //$("#btnAddToTable").hide();
//                //$("#btnClrModal").hide();
//                //$("#btnCloseModal").hide();
//                //$("#btnSaveToDb").show();

          


//            },
//            error: function (xhr, status, error) {
//                console.error("AJAX request failed: " + status + ", " + error);
//            }
//        });
//    },

    ViewExpDetailByID: function (srchid, typ) {
        $.ajax({
            url: "../UIExpenseDetails/GetExpDetailByID/?ExpenseNo=" + srchid,
            type: "GET",
            dataType: "json",
            success: function (data) {
                try {
                    data = JSON.parse(data);

                                    var formattedDate = moment(data.Table[0].SelectedDate).format("DD-MMM-YYYY");
                // Set the formatted date to the input field
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
        GPHelper.BuildItemTbl("");
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

    clearDataTable: function (rowIndex) {
        var table = ExpDetailsHelper.initDataTable();
        table.row(rowIndex).remove().draw();
    },


    initEvents: function () {
        $("#btnCloseModal").click(function () {
            ExpDetailsHelper.modalCloseSweetAlert();
        });
        $("#btnModal").click(function () {
            $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');
            $("#btnSaveToDb").hide();

            $("#myModal").modal("show");
        });

        $("#btnModalExp").click(function () {

            $("#myModalExpDetails").modal("show");
            ExpDetailsHelper.GetExpenseDetailsList();
        });

        $("#btnSaveToDb").click(function () {

        });

        //$("#closeModal").click(function () {
        //    $("#myModal").modal("hide");
        //});

        $("#btnAddToTable").click(function () {
            var name = $("#txtName").val();
            var item = $("#txtItem").val();
            var qty = $("#txtQty").val();
            var rate = $("#txtRate").val();
            if ((name, item, qty, rate) == '') {
                ExpDetailsHelper.tblDataNotAddedSweetAlert();
            } else {
                ExpDetailsHelper.tblAddingSweetAlert();
            }
        });
        $("#btnClrModal").click(function () {
            ExpDetailsHelper.modalClearSweetAlert();
        });
        $("#btnSave").click(function () {
            ExpDetailsHelper.SaveCollectionData();
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
            closeOnCancel: false
        }, function (isConfirmed) {
            if (isConfirmed) {
                $("#myModal").modal("hide");
                swal({
                    title: 'Closed!',
                    text: 'Modal has been closed successfully!',
                    type: "success",
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

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
                    timer: 1000,
                    showConfirmButton: false
                });
                $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');
            } else {
                swal({
                    title: 'Cancelled',
                    text: 'Data did not Added to the table',
                    type: "error",
                    icon: 'error',
                    timer: 1000,
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
            timer: 1000,
            showConfirmButton: false
        });
        $("#myModal").modal("show");
    },



    editDataTable: function (rowIndex) {
        var table = $('#tblExpD').DataTable();

        var rowData = table.row(rowIndex).data();

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

        if ((name, item, qty, rate) != '') {
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

    //addToTable: function () {
    //    var table = ExpDetailsHelper.initDataTable();
    //    var name = $("#txtName").val();
    //    var item = $("#txtItem").val();
    //    var qty = $("#txtQty").val();
    //    var rate = $("#txtRate").val();
    //    var value = parseFloat(qty) * parseFloat(rate);

    //    var existingRow = table.rows().indexes().filter(function (value, index) {
    //        var rowData = table.row(value).data();
    //        return (
    //            rowData.Name === name &&
    //            rowData.Item === item &&
    //            rowData.Qty === qty &&
    //            rowData.Rate === rate
    //        );
    //    });

    //    if ((name, item, qty, rate) != '') {
    //        if (existingRow.length === 0) {
    //            table.row.add({
    //                "SL": table.data().count() + 1,
    //                "Name": name,
    //                "Item": item,
    //                "Qty": qty,
    //                "Rate": rate,
    //                "Value": value
    //            }).draw(false);
    //        }
    //    }
    //},

    SaveCollectionData: function () {

        var obj = new Object();
        obj.SelectedDate = $("#showToday").val();


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
                            var table = $('#tblExpD').DataTable();
                            table.clear().draw();
                            swal({
                                title: "Congratulation!!",
                                text: "Save Successfully",
                                type: "success",
                                closeOnConfirm: false,
                                timer: 2000

                            });
                        } else {
                            swal({
                                title: "Sorry!",
                                text: "Failed to save!",
                                type: "error",
                                closeOnConfirm: false,
                                timer: 2000
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




    //addToTable: function () {
    //    var table = ExpDetailsHelper.initDataTable();

    //    table.row.add({
    //        "SL": table.data().count() + 1,
    //        "Name": $("#txtName").val(),
    //        "Item": $("#txtItem").val(),
    //        "Qty": $("#txtQty").val(),
    //        "Rate": $("#txtRate").val(),
    //        "Value": parseFloat($("#txtQty").val()) * parseFloat($("#txtRate").val()),
    //    }).draw(false);

    //    $("#txtName, #txtItem, #txtQty, #txtRate, #txtValue").val('');

    //    $("#myModal").modal("show");
    //},

    //SaveCollectionData: function () {
    //    var tableData = [];
    //    var table = $('#tblExpD').DataTable();
    //    var SelectedDate = $("#showToday").val();

    //    table.rows().every(function () {
    //        var rowData = {

    //            Name: this.data()[1],
    //            Item: this.data()[2],
    //            Qty: this.data()[3],
    //            Rate: this.data()[4],
    //            Value: this.data()[5]
    //        };
    //        tableData.push(rowData);
    //    });

    //    var objDetails = {
    //        SelectedDate : SelectedDate,
    //        tableData: tableData
    //    };

    //    jQuery.ajax({
    //        url: '/UIExpenseDetails/SaveAllData',
    //        async: false,
    //        type: 'POST',
    //        dataType: "json",
    //        contentType: 'application/json; charset=utf-8',
    //        data: JSON.stringify(objDetails),
    //        success: function (response) {
    //            console.log(response);
    //        },
    //        error: function (xhr, status, error) {
    //            console.error(error);
    //        }
    //    });
    //},


    //SaveCollectionData: function () {
    //    var obj = new Object();
    //    obj.CurrentDate = $("#txtCurrentDate").val();
    //    obj.AptArea = $("#aptArea").val();
    //    obj.AptPricePerSft = $("#aptPricePerSft").val();
    //    obj.AptQuantity = $("#aptQuantity").val();
    //    obj.AptAmount = $("#aptAmount").val();
    //    obj.AptReceivableAmt = $("#aptReceivableAmt").val();
    //    obj.CarParkingQty = $("#carParkingQty").val();
    //    obj.CarParkingAmount = $("#carParkingAmount").val();
    //    obj.CarParkingRcvlAmt = $("#carParkingRcvlAmt").val();
    //    obj.ACarPakingRcvlAmt = $("#aCarPakingRcvlAmt").val();
    //    obj.TotalAmount = $("#totalAmount").val();
    //    obj.TotalAWorkingAmt = $("#totalAWorkingAmt").val();
    //    obj.CostAWorkAmt = $("#costAWorkAmt").val();
    //    obj.CostAWorkRcvlAmt = $("#costAWorkRcvlAmt").val();
    //    obj.COmissionWorkAmt = $("#cOmissionWorkAmt").val();
    //    obj.COmissionWorkRcvlAmt = $("#cOmissionWorkRcvlAmt").val();
    //    obj.TotalValueAfterAdj = $("#totalValueAfterAdj").val();
    //    obj.ReffAcLedgerAmt = $("#reffAcLedgerAmt").val();
    //    obj.MdfCrgAmt = $("#mdfCrgAmt").val();
    //    obj.AdCarParkingAmt = $("#adCarParkingAmt").val();
    //    obj.TotalReceivedAmtA = $("#totalReceivedAmtA").val();
    //    obj.TotalAdjAmtB = $("#totalAdjAmtB").val();
    //    obj.TotalRcvAmtAfterAdjAmtC = $("#totalRcvAmtAfterAdjAmtC").val();
    //    obj.TotalRcvAmtAfterAdjRcvlAmtC = $("#totalRcvAmtAfterAdjRcvlAmtC").val();
    //    obj.DeductionAmtPerCompPolicyPercent = $("#deductionAmtPerCompPolicyPercent").val();
    //    obj.DeductionAmtPerCompPolicyAmt = $("#deductionAmtPerCompPolicyAmt").val();
    //    obj.DeductionAmtPerCompPolicyAdjAmt = $("#deductionAmtPerCompPolicyAdjAmt").val();
    //    obj.TotalRefundableAmtE = $("#totalRefundableAmtE").val();


    //    if (obj.AptPricePerSft.length > 0) {

    //        var objDetails = JSON.stringify(obj);
    //        var jsonParam = "objDetails:" + objDetails;
    //        console.log(jsonParam);
    //        var serviceUrl = "/Master/SaveAllData";
    //        jQuery.ajax({
    //            url: serviceUrl,
    //            async: false,
    //            type: "POST",
    //            data: "{" + jsonParam + "}",
    //            dataType: "json",
    //            contentType: "application/json; charset=utf-8",
    //            success: function (data) {
    //                console.log(data.data01);
    //                if (data.status == "Logout") {
    //                    location.reload();
    //                    return;
    //                }
    //                if (data.data02 == "Y") {
    //                    swal({
    //                        icon: 'warning',
    //                        title: 'Warning!',
    //                        text: 'This Page Already used!',
    //                        type: "warning",
    //                        closeOnConfirm: false,
    //                        closeOnCancel: false,
    //                        //timer: 2000
    //                    })
    //                    return;
    //                }
    //                $("#txtReceipt").val(data.data01);
    //                SaveHelper.DisibledOnly();
    //                if (data.status) {
    //                    swal({
    //                        title: "Congratulation!!",
    //                        text: "Save Successfully",
    //                        type: "success",
    //                        closeOnConfirm: false,
    //                        timer: 2000
    //                    });
    //                    $("#hdnMRNo").val(data.data01);
    //                    SaveHelper.BuildtblOthersCollectionDetails("");
    //                    document.getElementById('btnMoneyRecept').style.visibility = 'visible';
    //                    document.getElementById('btnMoneyRecept2').style.visibility = 'visible';

    //                } else {
    //                    swal({
    //                        title: "Sorry!",
    //                        text: "Failed to save!",
    //                        type: "error",
    //                        closeOnConfirm: false
    //                    });
    //                }
    //            },
    //            error: function (data) {
    //                swal({
    //                    title: "Sorry!",
    //                    text: "Something Went Wrong !!! \n" + data.statusText,
    //                    type: "error",
    //                    closeOnConfirm: false
    //                });
    //            }
    //        });

    //    } else {

    //    }
    //},

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



