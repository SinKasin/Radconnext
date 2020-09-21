$(document).ready(function () {

  $("#gridUser").jqxGrid(
            {
                width: '100%',
                height: 385,
                pageable: true,
                pagerButtonsCount: 10,
                columnsResize: true,
                filterable: true,
                showfilterrow: true,
                //showstatusbar: true,
                theme: theme,
                columns: [
                  { text: 'User Name', datafield: 'User_UserName', align: 'center', minwidth: 100},
                  { text: 'Name', datafield: 'User_Name', align: 'center', width: 120},
                  { text: 'LastName', datafield: 'User_LastName', align: 'center', width: 120},
                  { text: 'Phone', datafield: 'User_Phone', align: 'center', cellsalign: 'center', width: 100},
                  { text: 'Line ID', datafield: 'User_LineID', align: 'center', cellsalign: 'center', width: 100},
                  { text: 'Type', datafield: 'UserType_Name', align: 'center', cellsalign: 'center', filtertype: 'checkedlist', width: 120},
                  { text: 'Active', datafield: 'Active_Name', align: 'center', cellsalign: 'center', filtertype: 'checkedlist', width: 80},
                  { text: 'Delete', datafield: 'Delete', align: 'center', columntype: 'button', cellsalign: 'center', width: 60,
                    cellsrenderer: function (row) { return "Delete"; }, buttonclick: function (row) {
                       Editrow = row;
                       var offset = $("#gridUser").offset();

                       var dataRecord = $("#gridUser").jqxGrid('getrowdata', Editrow);
                       var User_ID = dataRecord.User_ID;
                       var User_UserName = dataRecord.User_UserName;

                       if (confirm("Do you want to delete user " + User_UserName + "?")) {
                            RadRegisterDel(User_ID);
                       }
                   }
                  }
                ]
            });
            gridUser();

  $("#gridUser").on('rowselect', function(event) {

            var args = event.args;
            var row = args.row;
            let User_ID = row.User_ID;
            let User_UserName = row.User_UserName;
            let User_Password = row.User_Password;
            let User_Name = row.User_Name;
            let User_LastName = row.User_LastName;
            let User_Email = row.User_Email;
            let User_Phone = row.User_Phone;
            let User_LineID = row.User_LineID;
            let User_LineID_Code = row.User_LineID_Code;
            let UserType_ID = row.UserType_ID;
            let User_Active = row.User_Active;

            $("#User_ID").val(User_ID);
            $("#vUserName").val(User_UserName);
            $("#Password").val(User_Password);
            $("#FirstName").val(User_Name);
            $("#vLastName").val(User_LastName);
            $("#Email").val(User_Email);
            $("#Phone").val(User_Phone);
            $("#LineID").val(User_LineID);
            $("#LineCode").val(User_LineID_Code);
            $("#Type").val(UserType_ID);
            $("#Active").val(User_Active);
            //console.log("The row you selected is: " + JSON.stringify(row));
            gridHospital(User_ID);

      });

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
                    /*{ text: 'Hospital ID', datafield: 'Hos_OrthancID', align: 'center', width: 200}*/
                    { text: 'Delete', datafield: 'Delete', align: 'center', columntype: 'button', cellsalign: 'center', width: 60,
                      cellsrenderer: function (row) { return "Delete"; }, buttonclick: function (row) {
                         Editrow = row;
                         var offset = $("#gridHospital").offset();

                         var dataRecord = $("#gridHospital").jqxGrid('getrowdata', Editrow);
                         var HosLink_ID = dataRecord.HosLink_ID;
                         var Hos_Name = dataRecord.Hos_Name;

                         if (confirm("Do you want to unlink Hospital " + Hos_Name + "?")) {
                              SRAD_MSG_HOS_LINK_DEL(HosLink_ID);
                         }
                     }
                    }
                  ]
              });

      $("#SaveUser").click(function functionName() {
        RadRegister();
      });
      $("#CancelUser").click(function functionName() {
        ClaerText();
      });
      $("#SaveHos").click(function functionName() {
        SRAD_MSG_HOS_LINK();
      });
});

function gridUser() {
            var act = 'RadRegister';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_UserName : ""
                ,SQL_Action : "SEC"
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'User_ID', type: 'string' },
                    { name: 'User_UserName', type: 'string' },
                    { name: 'User_Password', type: 'string' },
                    { name: 'User_Name', type: 'string' },
                    { name: 'User_LastName', type: 'string' },
                    { name: 'User_Email', type: 'string' },
                    { name: 'User_Phone', type: 'string' },
                    { name: 'User_LineID', type: 'string' },
                    { name: 'User_LineID_Code', type: 'string' },
                    { name: 'UserType_ID', type: 'string' },
                    { name: 'UserType_Name', type: 'string' },
                    { name: 'User_Skill_ID', type: 'string' },
                    { name: 'HosLink_ID', type: 'string' },
                    { name: 'User_Auth', type: 'string' },
                    { name: 'User_Active', type: 'string' },
                    { name: 'Active_Name', type: 'string' },
                    { name: 'User_DateUpdate', type: 'string' }
                ],
                id: 'id',
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridUser").jqxGrid({source: dataAdapter});
}

function gridHospital(UserID) {
            var act = 'SRAD_MSG_HOS_LINK';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_ID : UserID
                ,SQL_ACTION : "SEC"
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'HosLink_ID', type: 'string' },
                    { name: 'User_ID', type: 'string' },
                    { name: 'User_UserName', type: 'string' },
                    { name: 'Hos_ID', type: 'string' },
                    { name: 'Hos_OrthancID', type: 'string' },
                    { name: 'Hos_Name', type: 'string' },
                    { name: 'HosLink_DateUpdate', type: 'string' }
                ],
                id: 'id',
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridHospital").jqxGrid({source: dataAdapter});
}

function RadRegister() {

            let User_ID = $("#User_ID").val();
            let User_UserName = $("#vUserName").val();
            let User_Password = $("#Password").val();
            let User_Name = $("#FirstName").val();
            let User_LastName = $("#vLastName").val();
            let User_Email = $("#Email").val();
            let User_Phone = $("#Phone").val();
            let User_LineID = $("#LineID").val();
            let User_LineID_Code = $("#LineCode").val();
            let UserType_ID = $("#Type").val();
            let Active_Name = $("#Active").val();

            var act = 'RadRegister';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserID : User_ID
                ,UserName : User_UserName
                ,Password : User_Password
                ,Name : User_Name
                ,LastName : User_LastName
                ,Email : User_Email
                ,Phone : User_Phone
                ,LineID : User_LineID
                ,LineCode : User_LineID_Code
                ,Type : UserType_ID
                ,Auth : ''
                ,PathRadiant : ''
                ,Active : Active_Name
                ,SQL_Action : 'INS'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              var vResponse = data.Response;
              var vResult = data.data[0].Result;
              var vMsg = data.data[0].Msg;
              if(vResponse == 'success'){
                if(vResult != 'Success')
                {
                  ShowNoti(vMsg,'warning');
                }
                else
                {
                  ShowNoti(vMsg,'success');
                }

                gridUser();
                ClaerText();
              }else{
                ShowNoti(vMsg,"warning");
              }
            }
        });
}
function RadRegisterDel(User_ID) {

            var act = 'RadRegister';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserID : User_ID
                ,SQL_Action : 'DEL'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              var vResponse = data.Response;
              var vResult = data.data[0].Result;
              var vMsg = data.data[0].Msg;
              if(vResponse == 'success'){
                if(vResult != 'Success')
                {
                  ShowNoti(vMsg,'warning');
                }
                else
                {
                  ShowNoti(vMsg,'success');
                }

                gridUser();
                ClaerText();
              }else{
                ShowNoti(vMsg,"warning");
              }
            }
        });
}
function SRAD_MSG_HOS_LINK() {

            let User_ID = $("#User_ID").val();
            let Hos_OrthancID = $("#Hospital").val();

            var act = 'SRAD_MSG_HOS_LINK';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                HosLink_ID : ''
                ,User_ID : User_ID
                ,Hos_OrthancID : Hos_OrthancID
                ,SQL_ACTION : 'INS'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              var vResponse = data.Response;
              var vResult = data.data[0].Result;
              var vMsg = data.data[0].Msg;
              if(vResponse == 'success'){
                if(vResult != 'Success')
                {
                  ShowNoti(vMsg,'warning');
                }
                else
                {
                  ShowNoti(vMsg,'success');
                }

                gridHospital(User_ID);
                ClaerText();
              }else{
                ShowNoti(vMsg,"warning");
              }
            }
        });
}
function SRAD_MSG_HOS_LINK_DEL(HosLink_ID) {

            let User_ID = $("#User_ID").val();
            let Hos_OrthancID = $("#Hospital").val();

            var act = 'SRAD_MSG_HOS_LINK';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                HosLink_ID : HosLink_ID
                ,User_ID : ''
                ,Hos_OrthancID : ''
                ,SQL_ACTION : 'DEL'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              var vResponse = data.Response;
              var vResult = data.data[0].Result;
              var vMsg = data.data[0].Msg;
              if(vResponse == 'success'){
                if(vResult != 'Success')
                {
                  ShowNoti(vMsg,'warning');
                }
                else
                {
                  ShowNoti(vMsg,'success');
                }

                gridHospital(User_ID);
                ClaerText();
              }else{
                ShowNoti(vMsg,"warning");
              }
            }
        });
}
function ShowNoti(Msg,Type) {
  $("#MessageNoti").html(Msg);
  $("#Notification").jqxNotification({template: Type});
  $("#Notification").jqxNotification("open");
}
function ClaerText(){
  $("#vUserName").val("");
  $("#Password").val("");
  $("#FirstName").val("");
  $("#vLastName").val("");
  $("#Email").val("");
  $("#Phone").val("");
  $("#LineID").val("");
  $("#LineCode").val("");
  $("#Type").val("3");
  $("#Active").val("0");
}
