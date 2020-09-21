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
}

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
}

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
