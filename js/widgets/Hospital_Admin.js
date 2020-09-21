$(document).ready(function () {

  $("#gridHospital").jqxGrid(
            {
                width: '100%',
                height: 385,
                pageable: true,
                pagerButtonsCount: 5,
                columnsResize: true,
                //filterable: true,
                //showstatusbar: true,
                autoShowLoadElement: false,
                theme: theme,
                columns: [
                  { text: 'Hospital Name', datafield: 'Hos_Name', align: 'center', minwidth: 200},
                  { text: 'Hospital ID', datafield: 'Hos_OrthancID', align: 'center', width: 200},
                  { text: 'Delete', datafield: 'Delete', align: 'center', columntype: 'button', cellsalign: 'center', width: 60,
                    cellsrenderer: function (row) { return "Delete"; }, buttonclick: function (row) {
                       Editrow = row;
                       var offset = $("#gridHospital").offset();

                       var dataRecord = $("#gridHospital").jqxGrid('getrowdata', Editrow);
                       var Hos_ID = dataRecord.Hos_ID;
                       var Hos_Name = dataRecord.Hos_Name;
                       var Hos_OrthancID = dataRecord.Hos_OrthancID;

                       if (confirm("Do you want to Delete Hospital " + Hos_Name + "?")) {
                            UPD_RadHospitalDEL(Hos_ID,Hos_OrthancID);
                       }
                   }
                  }
                ]
  });
  gridHospital();
  $('#SaveHos').click(function() {
  	UPD_RadHospital();
  });

  $('#frmCancelHos').click(function() {
    var win = window.open('index.php','_self');
    win.focus();
  });
});

function gridHospital() {
            var act = 'RadHospital';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                SQL_Action : "SEI"
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'Hos_ID', type: 'string' },
                    { name: 'Hos_OrthancID', type: 'string' },
                    { name: 'Hos_Name', type: 'string' }
                ],
                id: 'id',
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridHospital").jqxGrid({source: dataAdapter});
}

function UPD_RadHospital() {

  var vHos_ID = '';
  var vHos_Name = $('#vHosName').val();
  var vHos_OrthancID = $('#vHosOrtancID').val();
  var vHos_Address = '';
  var vHos_Tel_1 = '';
  var vHos_Contact = '';
  var vHos_Remark = '';

            var act = 'RadHospital';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                HosID : vHos_ID,
                HosName : vHos_Name,
                HosOrthancID : vHos_OrthancID,
                HosAddress : vHos_Address,
                HosTel1 : vHos_Tel_1,
                HosTel2 : '',
                HosContact : vHos_Contact,
                HosRemark : vHos_Remark,
                SQL_Action : 'INS'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              var vResponse = data.Response;
              if(data.Response == 'success'){
                var vResult = data.data[0].Result;
                var vMsg = data.data[0].Msg;

                if(vResult == "Success"){
                    ShowNoti(vMsg,"success");
                    gridHospital();
                }
                else
                {
                    ShowNoti(vResult,"warning");
                }
              }
              else{
                var vResult = data.Result;
                ShowNoti(vResult,"warning");
              }

              ClaerText();
            },
            error: function () {
              ShowNoti('Failed',"warning");
            }
        });
}
function UPD_RadHospitalDEL(Hos_ID,HosOrthancID) {

            var act = 'RadHospital';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                HosID : Hos_ID,
                HosOrthancID : HosOrthancID,
                SQL_Action : 'DEL'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              var vResponse = data.Response;
              if(data.Response == 'success'){
                var vResult = data.data[0].Result;
                var vMsg = data.data[0].Msg;

                if(vResult == "Success"){
                    ShowNoti(vMsg,"success");
                    gridHospital();
                }
                else
                {
                    ShowNoti(vResult,"warning");
                }
              }
              else{
                var vResult = data.Result;
                ShowNoti(vResult,"warning");
              }
            },
            error: function () {
              ShowNoti('Failed',"warning");
            }
        });
}
function ShowNoti(Msg,Type) {
  $("#MessageNoti").html(Msg);
  $("#Notification").jqxNotification({template: Type});
  $("#Notification").jqxNotification("open");
}
function ClaerText(){
  $("#vHosOrtancID").val("");
  $("#vHosName").val("");
}
