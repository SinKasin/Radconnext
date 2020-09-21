$(document).ready(function () {
      getUser(vUserID);
      $("#gridHospital").jqxDataTable(
              {
                  width: '100%',
                  height: 265,
                  pageable: true,
                  pagerButtonsCount: 5,
                  columnsResize: true,
                  //filterable: true,
                  //showstatusbar: true,
                  autoShowLoadElement: false,
                  theme: theme,
                  columns: [
                    { text: 'โรงพยาบาล', datafield: 'Hos_Name', align: 'center', minwidth: 100}
                    /*{ text: 'Hospital ID', datafield: 'Hos_OrthancID', align: 'center', width: 200}*/
                  ]
              });

      gridHospital(vUserID);

      $("#SaveUser").click(function functionName() {
         var UserID = $('#vUser_ID').val();
         UpdateUser(UserID);
      });

      $("#CancelUser").click(function functionName() {
        window.open('index.php','_self');
      });

      $("#SaveTemplate").click(function functionName() {
        var UserID = $('#vUser_ID').val();
        SRAD_MSG_TEMPLATE_INS(UserID);
      });

      $("#gridTemplate").jqxGrid(
                {
                    width: '100%',
                    height: 265,
                    pageable: true,
                    pagerButtonsCount: 5,
                    columnsResize: true,
                    //filterable: true,
                    //showstatusbar: true,
                    autoShowLoadElement: false,
                    theme: theme,
                    columns: [
                      { text: 'Template', datafield: 'Template_Code', align: 'center', minwidth: 100},
                      { text: 'Delete', datafield: 'Delete', align: 'center', columntype: 'button', cellsalign: 'center', width: 60,
                        cellsrenderer: function (row) { return "Delete"; }, buttonclick: function (row) {
                           Editrow = row;
                           var offset = $("#gridTemplate").offset();

                           var dataRecord = $("#gridTemplate").jqxGrid('getrowdata', Editrow);
                           var Template_ID = dataRecord.Template_ID;
                           var User_ID = dataRecord.User_ID;
                           var Template_Code = dataRecord.Template_Code;

                           if (confirm("Do you want to Delete Template " + Template_Code + "?")) {
                                SRAD_MSG_TEMPLATE_DEL(Template_ID,User_ID);
                           }
                       }
                      }
                    ]
                });
      gridTemplate(vUserID);

     $("#gridTemplate").on('rowselect', function (event) {
       let pRow = event.args.row;
       var Template_ID = pRow.Template_ID;
       var Template_Code = pRow.Template_Code;
       var Template_Text = pRow.Template_Text;

       $("#vTemplate_ID").val(Template_ID);
       $("#vTemplateCode").val(Template_Code);
       $("#vTemplateText").val(Template_Text);
     });

     $("#gridUserOder").jqxGrid(
               {
                   width: '100%',
                   height: 400,
                   pageable: true,
                   pagerButtonsCount: 5,
                   columnsResize: true,
                   filterable: true,
                   showfilterrow: true,
                   autoShowLoadElement: false,
                   theme: theme,
                   columns: [
                     { text: 'รหัส', datafield: 'Order_ID', align: 'center', width: 80},
                     { text: 'หัวข้อ', datafield: 'HosOrder_Header', align: 'center', filtertype: 'checkedlist', width: 120},
                     { text: 'รายการ', datafield: 'HosOrder_Detail', align: 'center', minwidth: 120},
                     { text: 'Active', datafield: 'UserOrder_Active', align: 'center', columntype: 'button', cellsalign: 'center', width: 80,
                       cellsrenderer: function (row) {
                         Editrow = row;
                         var dataRecord = $("#gridUserOder").jqxGrid('getrowdata', Editrow);
                         var Active = dataRecord.UserOrder_Active;

                         if(Active == '1'){
                           return "รับงาน";
                         }
                         else{
                           return "ไม่รับงาน";
                         }
                       }, buttonclick: function (row) {
                          Editrow = row;
                          var offset = $("#gridUserOder").offset();

                          var dataRecord = $("#gridUserOder").jqxGrid('getrowdata', Editrow);
                          var Order_ID = dataRecord.Order_ID;
                          var User_UserName = dataRecord.User_UserName;
                          var User_ID = dataRecord.User_ID;
                          var UserOrder_Active = dataRecord.UserOrder_Active;
                          var Active = (UserOrder_Active == '1' ? '0' : '1');
                          var ActiveName = (UserOrder_Active == '1' ? 'Unactive' : 'Active');
                          //console.log(Active);
                          if (confirm("Do you want to "+ ActiveName +" Order " + Order_ID + "?")) {
                               SRAD_MSG_USERORDER_UPD(User_ID,Order_ID,Active);
                          }
                      }
                     }
                   ]
               });
      SRAD_MSG_USERORDER(vUserID);

      $("#gridUserStatus").jqxGrid(
                {
                    width: '100%',
                    height: 80,
                    //pageable: true,
                    //pagerButtonsCount: 5,
                    columnsResize: true,
                    //filterable: true,
                    //showfilterrow: true,
                    autoShowLoadElement: false,
                    theme: theme,
                    columns: [
                      { text: 'สถานะรับงาน', datafield: 'UserStatus_Job', align: 'center', columntype: 'button', cellsalign: 'center', width: 80,
                        cellsrenderer: function (row) {
                          Editrow = row;
                          var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                          var Status_Job = dataRecord.UserStatus_Job_Name;
                          return Status_Job;
                        }, buttonclick: function (row) {
                           Editrow = row;
                           var offset = $("#gridUserStatus").offset();

                           var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                           let User_ID = dataRecord.User_ID;
                           let Status_Job = dataRecord.UserStatus_Job;
                           let StatusName = 'UserStatus_Job';
                           let Status = (Status_Job == '1' ? '0' : '1');
                           //console.log(Active);
                           //if (confirm("Do you want to "+ ActiveName +" Order " + Order_ID + "?")) {
                                SRAD_MSG_USERSTATUS_UPD(User_ID,StatusName,Status);
                           //}
                       }
                      },
                      { text: 'แจ้งเตือน Email', datafield: 'UserStatus_NotiEmail', align: 'center', columntype: 'button', cellsalign: 'center', width: 120,
                       cellsrenderer: function (row) {
                         Editrow = row;
                         var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                         var Status_Job = dataRecord.UserStatus_NotiEmail_Name;
                         return Status_Job;
                       }, buttonclick: function (row) {
                          Editrow = row;
                          var offset = $("#gridUserStatus").offset();

                          var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                          let User_ID = dataRecord.User_ID;
                          let Status_Job = dataRecord.UserStatus_NotiEmail;
                          let StatusName = 'UserStatus_NotiEmail';
                          let Status = (Status_Job == '1' ? '0' : '1');
                          //console.log(Active);
                          //if (confirm("Do you want to "+ ActiveName +" Order " + Order_ID + "?")) {
                               SRAD_MSG_USERSTATUS_UPD(User_ID,StatusName,Status);
                          //}
                       }
                      },
                      { text: 'แจ้งเตือนโทร', datafield: 'UserStatus_NotiTel', align: 'center', columntype: 'button', cellsalign: 'center', width: 120,
                        cellsrenderer: function (row) {
                          Editrow = row;
                          var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                          var Status_Job = dataRecord.UserStatus_NotiTel_Name;
                          return Status_Job;
                        }, buttonclick: function (row) {
                           Editrow = row;
                           var offset = $("#gridUserStatus").offset();

                           var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                           let User_ID = dataRecord.User_ID;
                           let Status_Job = dataRecord.UserStatus_NotiTel;
                           let StatusName = 'UserStatus_NotiTel';
                           let Status = (Status_Job == '1' ? '0' : '1');
                           //console.log(Active);
                           //if (confirm("Do you want to "+ ActiveName +" Order " + Order_ID + "?")) {
                                SRAD_MSG_USERSTATUS_UPD(User_ID,StatusName,Status);
                           //}
                       }
                     },
                      { text: 'แจ้งเตือน Line', datafield: 'UserStatus_NotiLine', align: 'center', columntype: 'button', cellsalign: 'center', width: 120,
                       cellsrenderer: function (row) {
                         Editrow = row;
                         var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                         var Status_Job = dataRecord.UserStatus_NotiLine_Name;
                         return Status_Job;
                       }, buttonclick: function (row) {
                          Editrow = row;
                          var offset = $("#gridUserStatus").offset();

                          var dataRecord = $("#gridUserStatus").jqxGrid('getrowdata', Editrow);
                          let User_ID = dataRecord.User_ID;
                          let Status_Job = dataRecord.UserStatus_NotiLine;
                          let StatusName = 'UserStatus_NotiLine';
                          let Status = (Status_Job == '1' ? '0' : '1');
                          //console.log(Active);
                          //if (confirm("Do you want to "+ ActiveName +" Order " + Order_ID + "?")) {
                               SRAD_MSG_USERSTATUS_UPD(User_ID,StatusName,Status);
                          //}
                      }
                    }//,
                     //{ text: 'เคสใน Work List', datafield: 'UserStatus_InProcess', align: 'center', width: 120},
                     //{ text: 'เคสล่าช้าใน Work List', datafield: 'UserStatus_LateProcess', align: 'center', width: 180}
                    ]
                });
      SRAD_MSG_USERSTATUS(vUserID);
});

function gridHospital(UserID) {
            var act = 'SRAD_MSG_HOS_LINK';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_ID : UserID,
                SQL_ACTION : "SEC"
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
             $("#gridHospital").jqxDataTable({source: dataAdapter});
};
function gridTemplate(UserID) {
            var act = 'SRAD_MSG_TEMPLATE';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_ID : UserID,
                SQL_ACTION : "SEC"
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'Template_ID', type: 'string' },
                    { name: 'Template_Code', type: 'string' },
                    { name: 'User_ID', type: 'string' },
                    { name: 'Template_Text', type: 'string' }
                ],
                id: 'id',
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridTemplate").jqxGrid({source: dataAdapter});
};
function getUser(UserID) {
            var act = 'RadRegister';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserID : UserID,
                SQL_Action : 'SEI'
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              if(data.Response == 'success'){
                var vUser_ID = data.data[0].User_ID;
                var vUser_UserName = data.data[0].User_UserName;
                var vUser_Password = data.data[0].User_Password;
                var vUser_Name = data.data[0].User_Name;
                var vUser_LastName = data.data[0].User_LastName;
                var vUser_Email = data.data[0].User_Email;
                var vUser_Phone = data.data[0].User_Phone;
                var vUser_LineID = data.data[0].User_LineID;
                var vUser_LineID_Code = data.data[0].User_LineID_Code;
                var vUserType_ID = data.data[0].UserType_ID;
                var vUser_Auth = data.data[0].User_Auth;
                var vUser_PathRadiant = data.data[0].User_PathRadiant;
                var vUser_Active = data.data[0].User_Active;

                $('#vUser_ID').val(vUser_ID);
                $('#vUser_UserName').val(vUser_UserName);
                $('#vUser_Password').val(vUser_Password);
                $('#vUser_Name').val(vUser_Name);
                $('#vUser_LastName').val(vUser_LastName);
                $('#vUser_Email').val(vUser_Email);
                $('#vUser_Phone').val(vUser_Phone);
                $('#vUser_LineID').val(vUser_LineID);
                $('#vUser_LineID_Code').val(vUser_LineID_Code);
                $('#vUser_PathRadiant').val(vUser_PathRadiant);
                $('#vUserType_ID').val(vUserType_ID);
                $('#vUser_Auth').val(vUser_Auth);
                $('#vUser_Active').val(vUser_Active);
                }
                else {
                  var vResult = data.Response;
                    ShowNoti(vResult,"danger");
                }
              }
        });
};
function UpdateUser(UserID) {
            var vUser_ID = $('#vUser_ID').val();;
            var vUser_UserName = $('#vUser_UserName').val();;
            var vUser_Password = $('#vUser_Password').val();
            var vUser_Name = $('#vUser_Name').val();
            var vUser_LastName = $('#vUser_LastName').val();
            var vUser_Email = $('#vUser_Email').val();
            var vUser_Phone = $('#vUser_Phone').val();
            var vUser_LineID = $('#vUser_LineID').val();
            var vUser_LineID_Code = $('#vUser_LineID_Code').val();
            var vUserType_ID = $('#vUserType_ID').val();
            var vUser_Auth = $('#vUser_Auth').val();
            var vUser_PathRadiant = $('#vUser_PathRadiant').val();
            var vUser_Active = $('#vUser_Active').val();

            var act = 'RadRegister';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserID : vUser_ID,
                UserName : vUser_UserName,
                Password : vUser_Password,
                Name : vUser_Name,
                LastName : vUser_LastName,
                Email : vUser_Email,
                Phone : vUser_Phone,
                LineID : vUser_LineID,
                LineCode : vUser_LineID_Code,
                Type : vUserType_ID,
                Auth : vUser_Auth,
                PathRadiant : vUser_PathRadiant,
                Active : vUser_Active,
                SQL_Action : 'UPD'
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
                    ShowNoti("Save","success");
                    //RadHospital(vUserID);
                }
                else
                {
                    ShowNoti(vMsg,"warning");
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
};
function SRAD_MSG_TEMPLATE_INS(UserID) {
            var TemplateID = $('#vTemplate_ID').val();
            var TemplateCode = $('#vTemplateCode').val();
            var TemplateText = $('#vTemplateText').val();

            var act = 'SRAD_MSG_TEMPLATE';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                Template_ID : TemplateID,
                Template_Code : TemplateCode,
                User_ID : UserID,
                Template_Text : TemplateText,
                SQL_ACTION : 'INS'
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
                    ShowNoti(vResult,"success");
                    //RadHospital(vUserID);
                }
                else
                {
                    ShowNoti(vMsg,"warning");
                }
              }
              else{
                var vResult = data.Result;
                ShowNoti(vResult,"warning");
              }
              gridTemplate(UserID);
              $('#vTemplate_ID').val('');
              $('#vTemplateCode').val('');
              $('#vTemplateText').val('');
              $('#gridTemplate').jqxGrid('clearselection');
            },
            error: function () {
              ShowNoti('Failed',"warning");
            }
        });
};
function SRAD_MSG_TEMPLATE_DEL(Template_ID,UserID) {

            var act = 'SRAD_MSG_TEMPLATE';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                Template_ID : Template_ID,
                SQL_ACTION : 'DEL'
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
                    ShowNoti(vResult,"success");
                    //RadHospital(vUserID);
                }
                else
                {
                    ShowNoti(vMsg,"warning");
                }
              }
              else{
                var vResult = data.Result;
                ShowNoti(vResult,"warning");
              }
              gridTemplate(UserID);
              $('#vTemplate_ID').val('');
              $('#vTemplateCode').val('');
              $('#vTemplateText').val('');
              $('#gridTemplate').jqxGrid('clearselection');
            },
            error: function () {
              ShowNoti('Failed',"warning");
            }
        });
};
function SRAD_MSG_USERORDER(UserName) {
            var act = 'SRAD_MSG_USERORDER';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserName : UserName,
                SQL_ACTION : 'SEC'
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'UserOrder_ID', type: 'string' },
                    { name: 'User_ID', type: 'string' },
                    { name: 'User_UserName', type: 'string' },
                    { name: 'Order_ID', type: 'string' },
                    { name: 'HosOrder_Header', type: 'string' },
                    { name: 'HosOrder_Detail', type: 'string' },
                    { name: 'UserOrder_Active', type: 'string' }
                ],
                id: 'id',
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridUserOder").jqxGrid({source: dataAdapter});
};
function SRAD_MSG_USERORDER_UPD(UserName,OrderID,Active) {

            var act = 'SRAD_MSG_USERORDER';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserName : UserName,
                OrderID : OrderID,
                UserOrderActive : Active,
                SQL_ACTION : 'UPD'
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
                    ShowNoti(vResult,"success");
                    //RadHospital(vUserID);
                }
                else
                {
                    ShowNoti(vMsg,"warning");
                }
              }
              else{
                var vResult = data.Result;
                ShowNoti(vResult,"warning");
              }
              SRAD_MSG_USERORDER(UserName);
            },
            error: function () {
              ShowNoti('Failed',"warning");
            }
        });
};
function SRAD_MSG_USERSTATUS(UserName) {
            var act = 'SRAD_MSG_USERSTATUS';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserName : UserName,
                SQL_ACTION : 'SEC'
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'UserStatus_ID', type: 'string' },
                    { name: 'User_ID', type: 'string' },
                    { name: 'UserStatus_Job', type: 'string' },
                    { name: 'UserStatus_NotiEmail', type: 'string' },
                    { name: 'UserStatus_NotiTel', type: 'string' },
                    { name: 'UserStatus_NotiLine', type: 'string' },
                    { name: 'UserStatus_InProcess', type: 'number' },
                    { name: 'UserStatus_LateProcess', type: 'number' },
                    { name: 'UserStatus_Online', type: 'string' },
                    { name: 'UserStatus_Job_Name', type: 'string' },
                    { name: 'UserStatus_NotiEmail_Name', type: 'string' },
                    { name: 'UserStatus_NotiTel_Name', type: 'string' },
                    { name: 'UserStatus_NotiLine_Name', type: 'string' },
                    { name: 'UserStatus_Online_Name', type: 'string' }
                ],
                id: 'id',
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridUserStatus").jqxGrid({source: dataAdapter});
};
function SRAD_MSG_USERSTATUS_UPD(UserName,StatusName,Status) {

            var act = 'SRAD_MSG_USERSTATUS';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                UserName : UserName,
                STATUSNAME : StatusName,
                STATUS : Status,
                SQL_ACTION : 'UPD'
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
                    ShowNoti(vResult,"success");
                    //RadHospital(vUserID);
                }
                else
                {
                    ShowNoti(vMsg,"warning");
                }
              }
              else{
                var vResult = data.Result;
                ShowNoti(vResult,"warning");
              }
              SRAD_MSG_USERSTATUS(UserName);
            },
            error: function () {
              ShowNoti('Failed',"warning");
            }
        });
};
function ShowNoti(Msg,Type) {
  $("#MessageNoti").html(Msg);
  $("#Notification").jqxNotification({template: Type});
  $("#Notification").jqxNotification("open");
};
