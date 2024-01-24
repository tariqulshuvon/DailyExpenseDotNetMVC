$(function () {

    $(document).ready(function () {

        $("table, tr, td, th").css({
            "border": "1px solid black",
            "border-collapse": "collapse",
            "margin": "2px",
            "padding": "2px",
            "text-align": "center"
        });
        var tbldata = [
            { "SL": 1, "Name": "John", "Item": "Widget", "Qty": 5, "Rate": 10, "Value": 50 },
            { "SL": 2, "Name": "Jane", "Item": "Gadget", "Qty": 3, "Rate": 15, "Value": 45 },
        ];

        $('#tblExpD').DataTable({
            data: tbldata,
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
                        return '<button type="button" class="button" onclick="SaveHelper.ViewCaseStudyDetails(' + meta.row + ')" > View</button>'
                    }
                }
            ],
        });



        $("#btnModal").click(function () {
            $("#myModal").modal("show");

        });
        $("#PbtnSrc").click(function () {
            SaveHelper.GetGPList();
        });

        $("#closeModal").click(function () {
            $("#myModal").modal("hide");

        });

        var today = new Date();

        var formattedDate = today.getDate() + '/' + (today.getMonth() + 1)  + '/' + today.getFullYear();

        $("#showToday").text("Date: " + formattedDate);
        $("#showToday").css({
            "font-size":"20px"
        });


    });
});


var ExpDetailsHelper = {
    GetGPList: function () {
        var frmdate = $("#PtxtfrmDate").val();
        var todate = $("#PtxttoDate").val();
        $.getJSON("../Master/GetCaseStudy/?frmdate=" + frmdate + "&todate=" + todate)
            .done(function (data) {
                if (data.status == "Logout") {
                    location.reload();
                    return;
                }
                data = $.parseJSON(data);
                SaveHelper.BuildCaseStudyList(data.Table);
                //$("#phide").show();
            });
    },
    BuildCaseStudyList: function (tbldata) {
        $('#tblGpList').DataTable({
            data: tbldata,
            "responsive": true,
            "bDestroy": true,
            "columns": [
                { "data": "ID" },
                { "data": "CaseStudyNo" },
                { "data": "AptQuantity" },
                { "data": null },
            ],
            "columnDefs": [
                {
                    "targets": [3],
                    "render": function (data, type, row, meta) {
                        return '<button type="button" class="button" onclick="SaveHelper.ViewCaseStudyDetails(' + meta.row + ')" > View</button>'
                    }
                }
            ],
        });
    },

    ViewCaseStudyDetails: function (CaseStudyNo) {
        $("#btnPrint").show();
        var table = $("#tblGpList").DataTable();
        var srchid = table.cell(CaseStudyNo, 0).data();
        SaveHelper.ViewCSDetailByID(srchid, "VIEW");
    },

    ViewCSDetailByID: function (srchid, typ) {
        $("#btnPrint").show();

        $.ajax({
            url: "../Master/GetCaseStudyById/?CaseStudyNo=" + srchid,
            type: "GET",
            dataType: "json",
            success: function (data) {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    console.error("Error parsing JSON: " + error);
                    return;
                }

                $("#txtCurrentDate").val(data.Table[0].CurrentDate);
                $("#aptArea").val(data.Table[0].AptArea);
                $("#aptPricePerSft").val(data.Table[0].AptPricePerSft);
                $("#aptQuantity").val(data.Table[0].AptQuantity);
                $("#aptAmount").val(data.Table[0].AptAmount);
                $("#aptReceivableAmt").val(data.Table[0].AptReceivableAmt);
                $("#carParkingQty").val(data.Table[0].CarParkingQty);
                $("#carParkingAmount").val(data.Table[0].CarParkingAmount);
                $("#carParkingRcvlAmt").val(data.Table[0].CarParkingRcvlAmt);
                $("#aCarPakingRcvlAmt").val(data.Table[0].ACarPakingRcvlAmt);
                $("#totalAmount").val(data.Table[0].TotalAmount);
                $("#totalAWorkingAmt").val(data.Table[0].TotalAWorkingAmt);
                $("#costAWorkAmt").val(data.Table[0].CostAWorkAmt);
                $("#costAWorkRcvlAmt").val(data.Table[0].CostAWorkRcvlAmt);
                $("#cOmissionWorkAmt").val(data.Table[0].COmissionWorkAmt);
                $("#cOmissionWorkRcvlAmt").val(data.Table[0].COmissionWorkRcvlAmt);
                $("#totalValueAfterAdj").val(data.Table[0].TotalValueAfterAdj);
                $("#reffAcLedgerAmt").val(data.Table[0].ReffAcLedgerAmt);
                $("#mdfCrgAmt").val(data.Table[0].MdfCrgAmt);
                $("#adCarParkingAmt").val(data.Table[0].AdCarParkingAmt);
                $("#totalReceivedAmtA").val(data.Table[0].TotalReceivedAmtA);
                $("#totalAdjAmtB").val(data.Table[0].TotalAdjAmtB);
                $("#totalRcvAmtAfterAdjAmtC").val(data.Table[0].TotalRcvAmtAfterAdjAmtC);
                $("#totalRcvAmtAfterAdjRcvlAmtC").val(data.Table[0].TotalRcvAmtAfterAdjRcvlAmtC);
                $("#deductionAmtPerCompPolicyPercent").val(data.Table[0].DeductionAmtPerCompPolicyPercent);
                $("#deductionAmtPerCompPolicyAmt").val(data.Table[0].DeductionAmtPerCompPolicyAmt);
                $("#deductionAmtPerCompPolicyAdjAmt").val(data.Table[0].DeductionAmtPerCompPolicyAdjAmt);
                $("#totalRefundableAmtE").val(data.Table[0].TotalRefundableAmtE);



                $("#myModal").modal("hide");
            },
            error: function (xhr, status, error) {
                console.error("AJAX request failed: " + status + ", " + error);
            }
        });
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
        var caratPos = SaveHelper.getSelectionStart(el);
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
    },

    SaveCollectionData: function () {
        var obj = new Object();
        obj.CurrentDate = $("#txtCurrentDate").val();
        obj.AptArea = $("#aptArea").val();
        obj.AptPricePerSft = $("#aptPricePerSft").val();
        obj.AptQuantity = $("#aptQuantity").val();
        obj.AptAmount = $("#aptAmount").val();
        obj.AptReceivableAmt = $("#aptReceivableAmt").val();
        obj.CarParkingQty = $("#carParkingQty").val();
        obj.CarParkingAmount = $("#carParkingAmount").val();
        obj.CarParkingRcvlAmt = $("#carParkingRcvlAmt").val();
        obj.ACarPakingRcvlAmt = $("#aCarPakingRcvlAmt").val();
        obj.TotalAmount = $("#totalAmount").val();
        obj.TotalAWorkingAmt = $("#totalAWorkingAmt").val();
        obj.CostAWorkAmt = $("#costAWorkAmt").val();
        obj.CostAWorkRcvlAmt = $("#costAWorkRcvlAmt").val();
        obj.COmissionWorkAmt = $("#cOmissionWorkAmt").val();
        obj.COmissionWorkRcvlAmt = $("#cOmissionWorkRcvlAmt").val();
        obj.TotalValueAfterAdj = $("#totalValueAfterAdj").val();
        obj.ReffAcLedgerAmt = $("#reffAcLedgerAmt").val();
        obj.MdfCrgAmt = $("#mdfCrgAmt").val();
        obj.AdCarParkingAmt = $("#adCarParkingAmt").val();
        obj.TotalReceivedAmtA = $("#totalReceivedAmtA").val();
        obj.TotalAdjAmtB = $("#totalAdjAmtB").val();
        obj.TotalRcvAmtAfterAdjAmtC = $("#totalRcvAmtAfterAdjAmtC").val();
        obj.TotalRcvAmtAfterAdjRcvlAmtC = $("#totalRcvAmtAfterAdjRcvlAmtC").val();
        obj.DeductionAmtPerCompPolicyPercent = $("#deductionAmtPerCompPolicyPercent").val();
        obj.DeductionAmtPerCompPolicyAmt = $("#deductionAmtPerCompPolicyAmt").val();
        obj.DeductionAmtPerCompPolicyAdjAmt = $("#deductionAmtPerCompPolicyAdjAmt").val();
        obj.TotalRefundableAmtE = $("#totalRefundableAmtE").val();


        if (obj.AptPricePerSft.length > 0) {

            var objDetails = JSON.stringify(obj);
            var jsonParam = "objDetails:" + objDetails;
            console.log(jsonParam);
            var serviceUrl = "/Master/SaveAllData";
            jQuery.ajax({
                url: serviceUrl,
                async: false,
                type: "POST",
                data: "{" + jsonParam + "}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data.data01);
                    if (data.status == "Logout") {
                        location.reload();
                        return;
                    }
                    if (data.data02 == "Y") {
                        swal({
                            icon: 'warning',
                            title: 'Warning!',
                            text: 'This Page Already used!',
                            type: "warning",
                            closeOnConfirm: false,
                            closeOnCancel: false,
                            //timer: 2000
                        })
                        return;
                    }
                    $("#txtReceipt").val(data.data01);
                    SaveHelper.DisibledOnly();
                    if (data.status) {
                        swal({
                            title: "Congratulation!!",
                            text: "Save Successfully",
                            type: "success",
                            closeOnConfirm: false,
                            timer: 2000
                        });
                        $("#hdnMRNo").val(data.data01);
                        SaveHelper.BuildtblOthersCollectionDetails("");
                        document.getElementById('btnMoneyRecept').style.visibility = 'visible';
                        document.getElementById('btnMoneyRecept2').style.visibility = 'visible';

                    } else {
                        swal({
                            title: "Sorry!",
                            text: "Failed to save!",
                            type: "error",
                            closeOnConfirm: false
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

        }
    }


};


