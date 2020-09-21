$(document).ready(function () {
  vTotalCase = $('#sTotalCase').html();
  vNewCase = $('#sNewCase').html();
  vWaitAccept = $('#AWaitAccept').html();
  vAccepted = $('#AAccepted').html();
  LoopLoad(vTotalCase,vNewCase);
  $("#ManageCase").hide();
  $('#vMtypeDetail').hide();
  $('#frmReportCase').hide();
  $('#frmRenewCase').hide();

  var Case_Status;
  var Case_TechID;
  var Case_OrthancID;

  var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                Editrow = row;
                var offset = $("#gridCaseActive").offset();

                var dataRecord = $("#gridCaseActive").jqxGrid('getrowdata', Editrow);
                var STATUS_Name = dataRecord.CASE_STATUS_Name;
                var STATUS_Name_TH = dataRecord.CASE_STATUS_Name_TH;

                if (STATUS_Name == "New Case") {
                    return '<span class="text-danger center">&nbsp;<B>' + STATUS_Name_TH + '</B></span>';
                }
                else if (STATUS_Name == "Wait Accept") {
                    return '<span class="text-warning center">&nbsp;<B>' + STATUS_Name_TH + '</B></span>';
                }
                else if (STATUS_Name == "Accepted") {
                    return '<span class="text-info center">&nbsp;<B>' + STATUS_Name_TH + '</B></span>';
                }
                else if (value == "Doctor Response") {
                    return '<span class="text-success center">&nbsp;<B>' + STATUS_Name_TH + '</B></span>';
                }
            }

  $("#gridCaseActive").jqxGrid(
            {
                width: "100%",
                height: 550,
                sortable: true,
                altrows: true,
                filterable: true,
                showfilterrow: true,
                //showstatusbar: true,
                //statusbarheight: 24,
                //showaggregates: true,
                autorowheight: true,
                columnsresize: true,
                pageable: true,
                pagesize: 10,
                scrollmode: 'logical',
                autoShowLoadElement: false,
                pagesizeoptions: ['10', '20', '50', '100', '500'],
                theme: theme,
                columns: [
                  { text: '#', datafield: 'Row', align: 'center', cellsalign: 'center', width: 35},
                  { text: 'สถานะ', datafield: 'CASE_STATUS_Name', align: 'center', cellsalign: 'center', filtertype: 'checkedlist',cellsrenderer: cellsrenderer, width: 100},
                  { text: 'วันที่', datafield: 'Case_DateInsert', align: 'center', cellsalign: 'center', cellsformat: 'dd MMM yyyy HH:mm:ss', filtertype: 'range', width: 90},
                  { text: '#HN', datafield: 'Patient_HN', align: 'center', width: 100},
                  { text: 'ผู้รับการตรวจ', datafield: 'FullName', align: 'center', width: 250},
                  { text: 'เพศ', datafield: 'Patient_Sex_TH', align: 'center', cellsalign: 'center', filtertype: 'checkedlist', width: 50},
                  { text: 'อายุ', datafield: 'Patient_Age', align: 'center', cellsalign: 'center', width: 50},
                  { text: 'รหัส', datafield: 'Order_ID', align: 'center', cellsalign: 'center', width: 80},
                  { text: 'รายการ', datafield: 'Order_Detail', align: 'center', minwidth: 200},
                  { text: 'ราคา', datafield: 'Order_Price', align: 'center', cellsalign: 'right', width: 70, cellsformat: 'c0'},
                  { text: 'DF แพทย์', datafield: 'Order_DF', align: 'center', cellsalign: 'right', width: 80, cellsformat: 'c0'},
                  { text: 'Description', datafield: 'Case_StudyDESC', align: 'center', width: 120},
                  { text: 'Protocol', datafield: 'ProtocolName', align: 'center', minwidth: 180},
                  { text: 'Modality', datafield: 'Modality', align: 'center', width: 70, filtertype: 'checkedlist'},
                  { text: 'Urgency', datafield: 'UG_Type_Name', align: 'center', cellsalign: 'center', filtertype: 'checkedlist', width: 100},
                  { text: 'รังสีแพทย์', datafield: 'DocFullName', align: 'center', width: 150}
                ]
            });
            gridCaseActive();

            $("#gridCaseActive").on('rowselect', function (event) {

                var Case_ID = event.args.row.Case_ID;
                var FullName = event.args.row.FullName;
                var Hos_OrthancID = event.args.row.Hos_OrthancID;
                var Hos_Name = event.args.row.Hos_Name;
                var Patient_HN = event.args.row.Patient_HN;
                var Patient_Name = event.args.row.Patient_Name;
                var Patient_LastName = event.args.row.Patient_LastName;
                var Case_StudyDESC = event.args.row.Case_StudyDESC;
                var Patient_Sex = event.args.row.Patient_Sex_TH;
                var Patient_Birthday = event.args.row.Patient_Birthday;
                var Patient_CitizenID = event.args.row.Patient_CitizenID;
                var CASE_STATUS_Name = event.args.row.CASE_STATUS_Name;
                var TreatmentRights_ID = event.args.row.TreatmentRights_ID;
                var TreatmentRights_Name = event.args.row.TreatmentRights_Name;
                var Patient_XDoc = event.args.row.DocFullName;
                var UG_Type_Name = event.args.row.UG_Type_Name;
                var Case_UrgentType = event.args.row.Case_UrgentType;
                var Patient_Doctor = event.args.row.Patient_Doctor;
                var ProtocolName = event.args.row.ProtocolName;
                var Modality = event.args.row.Modality;
                var Order_Price = event.args.row.Order_Price;
                var Order_DF = event.args.row.Order_DF;
                var DocUID = event.args.row.DocUID;
                Case_TechID = event.args.row.Case_TechID;
                Case_Status = event.args.row.Case_Status;
                Case_OrthancID = event.args.row.Case_OrthancID;

                $("#ManageCase").show();

                $('#ManageCase').focus();
                $('#PHos').html(Hos_Name);
                //$('#PName').html(FullName);
                $('#HCase').html(Case_StudyDESC);
                $('#HProtocol').html(ProtocolName);
                $('#HModality').html(Modality);
                //$('#vMType').html(vType);
                $('#vDStatus').html(CASE_STATUS_Name);
                $('#sUrgentType').html(UG_Type_Name);

                $('#vCaseID').val(Case_ID);
                $('#vHN').val(Patient_HN);
                $('#vName').val(Patient_Name);
                $('#vLName').val(Patient_LastName);
                $('#vSex').val(Patient_Sex);
                //$('#vBirthday').val(Patient_Birthday);
                $('#vCitizenID').val(Patient_CitizenID);
                $('#RightID').val(TreatmentRights_ID);
                $('#UrgentTypeID').val(Case_UrgentType);
                $('#vPatientDoctor').val(Patient_Doctor);
                $('#vCitizenID').val(Patient_CitizenID);

                $('#vCaseAMT').val(Order_Price);
                $('#vCaseDFAMT').val(Order_DF);

                $('#vDoc_UID').val(DocUID);

                $("#vDPhone").html("");
                $("#vDEmail").html("");
                $("#vDLine").html("");

                if(vTypeID != '3'){
                  $('#TechID').val(Case_TechID);
                }
                else{
                  $('#TechID').val(vUserID);
                }
                if(TreatmentRights_ID != '0'){
                  //$("#vRight").jqxDropDownList('selectItem',String(TreatmentRights_Name));
                  $("#sRights").html(TreatmentRights_Name);
                }

                CheckCaseStatus(Case_Status);
                FromTypecheck(Case_Status);
                GetDoctor(vTypeID);
                SRAD_MSG_TREATMENTRIGHTS(Hos_OrthancID);
                SRAD_MSG_URGENT_TYPE(Hos_OrthancID);
                SRAD_SEC_FILE(Case_ID);
                scrollToTop();

                  $("#GridCase").hide();

            });

            $("#CancelCase").on('click', function () {
                $("#ManageCase").hide();
                scrollToTop();
                $("#DoctorID").val("");
                $("#TechID").val("");
                $("#vCaseID").val("");
                $("#RightID").val("");
                $("#sRights").html("");
                $("#GridCase").show();

                gridCaseActive();

                /*try{
                  //$('#gridCaseActive').jqxGrid('clearfilters');
                  $('#gridCaseActive').jqxGrid('clearselection');
                  $('#gridFileUpdate').jqxGrid('clearselection');
                }
                catch{
                  location.reload();
                }*/

                document.getElementById("vShowImg").src = '';
            });
            $("#SaveCase").on('click', function () {
                var CaseID = $("#vCaseID").val();
                var TechID = $("#TechID").val();
                var DoctorID = $("#DoctorID").val();
                var RightID = $("#RightID").val();
                var UrgentTypeID = $("#UrgentTypeID").val();
                var PatientDoctor = $("#vPatientDoctor").val();
                var CitizenID = $("#vCitizenID").val();
                var pName = $("#vName").val();
                var pLName = $("#vLName").val();


                if(DoctorID == ""){
                  ShowNoti("Please select Doctor.","warning");
                }
                else {
                  SRAD_UPDATE_CASE(CaseID,TechID,DoctorID,'1',RightID,pName,pLName,UrgentTypeID,PatientDoctor,CitizenID);
                }
                /*try{
                  //$('#gridCaseActive').jqxGrid('clearfilters');
                  $('#gridCaseActive').jqxGrid('clearselection');
                  $('#gridFileUpdate').jqxGrid('clearselection');
                }
                catch{
                  location.reload();
                }*/
                //$('#gridCaseActive').jqxGrid('clearselection');
            });
            $("#ReportCase").on('click', function () {
                var CaseID = $("#vCaseID").val();
                var url = "sapi/rad_report.php?CaseID=" + CaseID;
                openInNewTab(url);
            });
            $("#ViewCase").on('click', function () {
              var url='http://Radconnext:R@dconnext@103.91.189.94:8042/osimis-viewer/app/index.html?study=' + Case_OrthancID;
              openInNewTab(url);
            });
            $("#DownLoadCase").on('click', function () {
              var url='http://Radconnext:R@dconnext@103.91.189.94:8042/patients/' + Case_OrthancID + '/archive';
              openInNewTab(url);
            });
            $("#RenewCase").on('click', function () {
              let vCaseID = $('#vCaseID').val();
              let vTechID = $('#TechID').val();

              SRAD_UPDATE_CASE_DOC(vCaseID,vTechID,'0','0','');
            });
            $('#vListDoctor').on('select', function (event)
            {
                var args = event.args;
                if (args) {
                  // index represents the item's index.
                  var index = args.index;
                  var item = args.item;
                  // get item's label and value.
                  var label = item.label;
                  var value = item.value;
                  var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                  $("#DoctorID").val(value);
                  SRAD_LIST_DORTOR_DESC(value);
                }
            });
            $('#vRight').on('select', function (event)
            {
                var args = event.args;
                if (args) {
                  // index represents the item's index.
                  var index = args.index;
                  var item = args.item;
                  // get item's label and value.
                  var label = item.label;
                  var value = item.value;
                  var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                  $("#RightID").val(value);
                  $("#sRights").html(label);
                }
            });
            $('#vUrgentType').on('select', function (event)
            {
                var args = event.args;
                if (args) {
                  // index represents the item's index.
                  var index = args.index;
                  var item = args.item;
                  // get item's label and value.
                  var label = item.label;
                  var value = item.value;
                  var type = args.type; // keyboard, mouse or null depending on how the item was selected.
                  $("#UrgentTypeID").val(value);
                  $("#sUrgentType").html(label);
                }
            });

            $('#vRight').jqxDropDownList({
              placeHolder: "สิทธิ์การรักษา"
              , width: "90%"
              ,selectedIndex: -1
              ,theme: theme
              ,displayMember: "TreatmentRights_Name"
              ,valueMember: "TreatmentRights_ID"
              ,autoDropDownHeight: true
            });

            $('#vListDoctor').jqxDropDownList({
              placeHolder: "เลือกรังสีแพทย์"
              , width: "90%"
              ,selectedIndex: -1
              ,theme: theme
              ,displayMember: "FullName"
              ,valueMember: "User_ID"
              ,autoDropDownHeight: true
            });

            $('#vUrgentType').jqxDropDownList({
              placeHolder: "เลือกความเร่งด่วน"
              , width: "90%"
              ,selectedIndex: 0
              ,theme: theme
              ,displayMember: "UG_Type_Name"
              ,valueMember: "UG_Type_ID"
              ,autoDropDownHeight: true
            });

            $("#gridFileUpdate").jqxGrid({
                width: '100%',
                height: 185,
                //pageable: true,
                //pagerButtonsCount: 10,
                columnsResize: true,
                //autoheight: true,
                //showstatusbar: true,
                theme: theme,
                columns: [
                  { text: 'ไฟล์', datafield: 'Result_CASE_FileName', align: 'center', minwidth: 50},
                  { text: 'วันที่', datafield: 'Result_CASE_DateUpdate', align: 'center', width: 150},
                  { text: 'Delete', datafield: 'Delete', align: 'center', columntype: 'button', cellsalign: 'center', width: 60,
                    cellsrenderer: function (row) { return "Delete"; }, buttonclick: function (row) {
                       Editrow = row;
                       var offset = $("#gridFileUpdate").offset();

                       var dataRecord = $("#gridFileUpdate").jqxGrid('getrowdata', Editrow);
                       var Result_CASE_ID = dataRecord.Result_CASE_ID;
                       var CASE_ID = dataRecord.CASE_ID;
                       var Result_CASE_FileName = dataRecord.Result_CASE_FileName;

                       if (confirm("Do you want to Delete File " + Result_CASE_FileName + "?")) {
                            SRAD_DEL_FILE(Result_CASE_ID,CASE_ID);
                       }
                   }
                  }
                ]
            });

              $("#gridFileUpdate").on('rowselect', function (event) {
                var vImage = event.args.row.Result_Path_IMG;
                var url= vImage;
                document.getElementById("vShowImg").src = url;
              });
});

function LoopLoad(vTotalCase) {
  setInterval(function(){
    GetTotalCase();
    var ChkRe = false;
    var ChkvTotalCase = $('#sTotalCase').html();
    var ChkvNewCase = $('#sNewCase').html();
    var ChkvWaitAccept = $('#AWaitAccept').html();
    var ChkvAccepted = $('#AResponed').html();

    if (vTotalCase != ChkvTotalCase){
      ChkRe = true;
      gridCaseActive();
    }

    if (vNewCase != ChkvNewCase && !ChkRe){
      gridCaseActive();
    }

    if (vWaitAccept != ChkvWaitAccept && !ChkRe){
      gridCaseActive();
    }

    if (vAccepted != ChkvAccepted && !ChkRe){
      gridCaseActive();
    }

    vTotalCase = $('#sTotalCase').html();
    vNewCase = $('#sNewCase').html();
    vWaitAccept = $('#AWaitAccept').html();
    vAccepted = $('#AResponed').html();
  }, 1000 * 3);
}
function CheckCaseStatus(Case_Status) {
      if(Case_Status != "0" && (vTypeID == "3" || vTypeID == "1") ){
          $('#frmSaveCase').hide();
      }
      else {
        $('#frmSaveCase').show();
      }
};
function scrollToTop() {
      //$('#gridCaseActive').jqxGrid('clearselection');
      window.scrollTo(0, 0);
};
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
function gridCaseActive() {
            var act = 'SRAD_GET_CASE';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_ID : vUserID,
                Type : vType
            };

            var source =
            {
                type: 'GET',
                datatype: "json",
                datafields: [
                    { name: 'Row', type: 'number' },
                    { name: 'Case_ID', type: 'string' },
                    { name: 'Hos_ID', type: 'string' },
                    { name: 'Hos_OrthancID', type: 'string' },
                    { name: 'Hos_Name', type: 'string' },
                    { name: 'Case_OrthancID', type: 'string' },
                    { name: 'Case_ParentPatient', type: 'string' },
                    { name: 'Case_StudyDESC', type: 'string' },
                    { name: 'Case_Status', type: 'string' },
                    { name: 'CASE_STATUS_Name', type: 'string' },
                    { name: 'CASE_STATUS_Name_TH', type: 'string' },
                    { name: 'Case_UrgentType', type: 'string' },
                    { name: 'UG_Type_Name', type: 'string' },
                    { name: 'Case_TechID', type: 'string' },
                    { name: 'Case_DoctorID', type: 'string' },
                    { name: 'DocFullName', type: 'string' },
                    { name: 'DocUID', type: 'string' },
                    { name: 'Patient_HN', type: 'string' },
                    { name: 'Patient_Name', type: 'string' },
                    { name: 'Patient_LastName', type: 'string' },
                    { name: 'FullName', type: 'string' },
                    { name: 'Patient_CitizenID', type: 'string' },
                    { name: 'Patient_Birthday', type: 'string' },
                    { name: 'Patient_Age', type: 'string' },
                    { name: 'Patient_Sex', type: 'string' },
                    { name: 'Patient_Sex_TH', type: 'string' },
                    { name: 'TreatmentRights_ID', type: 'string' },
                    { name: 'TreatmentRights_Name', type: 'string' },
                    { name: 'Patient_Doctor', type: 'string' },
                    { name: 'BodyPartExamined', type: 'string' },
                    { name: 'Modality', type: 'string' },
                    { name: 'Manufacturer', type: 'string' },
                    { name: 'ProtocolName', type: 'string' },
                    { name: 'SeriesDescription', type: 'string' },
                    { name: 'PerformedProcedureStepDescription', type: 'string' },
                    { name: 'StationName', type: 'string' },
                    { name: 'Order_ID', type: 'string' },
                    { name: 'Order_Detail', type: 'string' },
                    { name: 'Order_Unit', type: 'string' },
                    { name: 'Order_Price', type: 'number' },
                    { name: 'Order_DF', type: 'number' },
                    { name: 'Case_DocReply', type: 'string' },
                    { name: 'Case_DateUpdate', type: 'string' },
                    { name: 'Case_DateUpdates', type: 'string' },
                    { name: 'Case_DateInsert', type: 'date' }
                ],
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            /*try{
              $('#gridCaseActive').jqxGrid('clearselection');
            }
            catch{
              location.reload();
            }*/
            //$("#gridCaseActive").jqxGrid({source: dataAdapter});
            try{
              $("#gridCaseActive").jqxGrid({source: dataAdapter});
              $('#gridCaseActive').jqxGrid('clearselection');
              /*vTotalCase = $('#sTotalCase').html();
              vNewCase = $('#sNewCase').html();
              vWaitAccept = $('#AWaitAccept').html();
              vAccepted = $('#AResponed').html();

              console.log(vTotalCase +vNewCase+vWaitAccept+vAccepted);*/
            }
            catch{
              //console.log("Failed Clear");
               location.reload();
             }
}
function SRAD_SEC_FILE(CaseID) {
            var act = 'SRAD_SEC_FILE';
            var url = "sapi/api.class.php?action="+ act
            //ar CaseID = $("#vCaseID").val();
            var pData = {
                Case_ID : CaseID,
                SQL_ACTION : 'DEL'
            };

            var source =
            {
                type: 'GET',
                datatype: "json",
                datafields: [
                    { name: 'Result_CASE_ID', type: 'number' },
                    { name: 'CASE_ID', type: 'number' },
                    { name: 'Result_CASE_FileName', type: 'string' },
                    { name: 'Result_CASE_Type', type: 'string' },
                    { name: 'Result_CASE_Size', type: 'string' },
                    { name: 'Result_Path_IMG', type: 'string' },
                    { name: 'Result_CASE_DateUpdate', type: 'string' }
                ],
                url: url,
                data: pData
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
             $("#gridFileUpdate").jqxGrid({source: dataAdapter});
}
function SRAD_DEL_FILE(Result_CASE_ID,CaseID) {
            var act = 'SRAD_DEL_FILE';
            var url = "sapi/api.class.php?action="+ act
            //ar CaseID = $("#vCaseID").val();
            var pData = {
                Result_CASE_ID : Result_CASE_ID,
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
              SRAD_SEC_FILE(CaseID)
            },
            error: function () {
              ShowNoti('Failed',"warning");
              SRAD_SEC_FILE(CaseID)
            }
        });
}
function SRAD_LIST_DORTOR() {
            var act = 'SRAD_LIST_DORTOR';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_ID : vUserID
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'User_ID', type: 'string' },
                    { name: 'FullName', type: 'string' },
                    { name: 'User_Email', type: 'string' },
                    { name: 'User_Phone', type: 'string' },
                    { name: 'User_LineID', type: 'string' }
                ],
                url: url,
                data: pData,
                async: true
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $('#vListDoctor').jqxDropDownList({source: dataAdapter});
}
function SRAD_LIST_DORTOR_DESC(UserID) {
            var act = 'SRAD_LIST_DORTOR_DESC';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                User_ID : UserID
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              if(data.Response == 'success'){
                var vPhone = data.data[0].User_Phone;
                var vEmail = data.data[0].User_Email;
                var vLine = data.data[0].User_LineID;
                var vLineUID = data.data[0].User_LineID_Code;
                var vDocSts = data.data[0].UserStatus_Job;
                var vStsOnlie = data.data[0].UserStatus_Online;
              	$("#vDPhone").html(vPhone);
              	$("#vDEmail").html(vEmail);
              	$("#vDLine").html(vLine);
              	$("#vDoc_UID").val(vLineUID);
              	$("#vDocSts").html(vDocSts);
              }
            }
        });
}
function SRAD_MSG_TREATMENTRIGHTS(Hos_OrthancID) {
            var act = 'SRAD_MSG_TREATMENTRIGHTS';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                Hos_OrthancID : Hos_OrthancID,
                SQL_ACTION : 'SEC'
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'TreatmentRights_ID', type: 'string' },
                    { name: 'Hos_OrthancID', type: 'string' },
                    { name: 'TreatmentRights_Name', type: 'string' }
                ],
                url: url,
                data: pData,
                async: true
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $('#vRight').jqxDropDownList({source: dataAdapter});
}
function SRAD_MSG_URGENT_TYPE(Hos_OrthancID) {
            var act = 'SRAD_MSG_URGENT_TYPE';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                Hos_OrthancID : Hos_OrthancID,
                SQL_ACTION : 'SEC'
            };

            var source =
            {
                type: 'POST',
                datatype: "json",
                datafields: [
                    { name: 'UG_Type_ID', type: 'string' },
                    { name: 'Hos_OrthancID', type: 'string' },
                    { name: 'UG_Type_Name', type: 'string' }
                ],
                url: url,
                data: pData,
                async: true
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $('#vUrgentType').jqxDropDownList({source: dataAdapter});
}
function SRAD_UPDATE_CASE(CaseID,TechID,DoctorID,CaseStatus,TreatmentRights_ID,P_Name,P_LName,UrgentTypeID,P_Doctor,CitizenID) {

            let Order_Price = $('#vCaseAMT').val();
            let Order_DF = $('#vCaseDFAMT').val();
            let Doc_UID = $('#vDoc_UID').val();
            var act = 'SRAD_UPDATE_CASE';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                CaseID : CaseID,
                TechID : TechID,
                DoctorID : DoctorID,
                CaseStatus : CaseStatus,
                TreatmentRights_ID : TreatmentRights_ID,
                UrgentType : UrgentTypeID,
                PatientName : P_Name,
                PatientLastName : P_LName,
                PatientDoctor : P_Doctor,
                PatientCitizenID : CitizenID,
                CaseAMT : Order_Price,
                CaseDFAMT : Order_DF,
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              if(data.Response == 'success'){
                var vResult = data.data[0].Result;
                var vMsg = data.data[0].Msg;

                if(vResult == "Success"){

                    ShowNoti(vMsg,"success");

                    if(CaseStatus == '1'){
                      $('#frmSaveCase').hide();
                    }

                    $("#DoctorID").val("");
                    $("#vDoc_UID").val("");
                    $("#TechID").val("");
                    $("#vCaseID").val("");
                    $("#RightID").val("");
                    $("#sRights").html("");
                    $("#ManageCase").hide();
                    $("#GridCase").show();

                    gridCaseActive();
                    let vModality = $('#HModality').html();
                    let vHCase = $('#HCase').html();
                    let vHProtocol = $('#HProtocol').html();
                    let vHHopital = $('#PHos').html();
                    let vUrgentType = $('#sUrgentType').html();
                    let vPatientName = $('#vName').val() + ' ' + $('#vLName').val();
                    let vCaseID = $('#vCaseID').html();

                    LineNotiToDoc(Doc_UID,'',vHHopital,vUrgentType,vPatientName,vCaseID);
                }
                else {
                    ShowNoti(vResult,"danger");
                }
              }
            }
        });
}
function GetDoctor() {
  if(vTypeID != "2"){
    SRAD_LIST_DORTOR();
    $('#vMtypeDetail').show();
  }
}
function FromTypecheck(Case_Status) {

  if(vTypeID == "2"){
    $('#frmSaveCase').hide();
    //$('#frmCancelCase').hide();
    $('#vName').jqxInput({disabled: true });
    $('#vLName').jqxInput({disabled: true });
    $('#vCitizenID').jqxInput({disabled: true });
    $('#vPatientDoctor').jqxInput({disabled: true });

    $("#PMFileImage").hide();
    $("#DMFileImage").show();

    if(Case_Status == "2"){
      $('#frmAccept').hide();
      $('#frmCancelAccept').hide();
    }
    else {
      $('#frmAccept').show();
      $('#frmCancelAccept').show();
    }
  }
  else{
    $('#frmAccept').hide();
    $('#frmCancelAccept').hide();
    $("#PMFileImage").show();
    $("#DMFileImage").hide();
  }

  if(Case_Status != "0"){
    $('#vMtypeDetail').hide();

    $('#vName').jqxInput({disabled: true });
    $('#vLName').jqxInput({disabled: true });
    $('#vCitizenID').jqxInput({disabled: true });
    $('#vPatientDoctor').jqxInput({disabled: true });

    if(Case_Status == "3"){
      $('#frmReportCase').show();
    }
    else {
      $('#frmReportCase').hide();
    }

    if(Case_Status == "1" || Case_Status == "2"){
      $('#frmRenewCase').show();
    }
  }
  else{
    $('#vName').jqxInput({disabled: false });
    $('#vLName').jqxInput({disabled: false });
    $('#vCitizenID').jqxInput({disabled: false });
    $('#vPatientDoctor').jqxInput({disabled: false });
  }

}
function ShowNoti(Msg,Type) {
  $("#MessageNoti").html(Msg);
  $("#Notification").jqxNotification({template: Type});
  $("#Notification").jqxNotification("open");
}
$('#UploadImage').click(function() {
	//$('#UploadImage').jqxInput({disabled: true });
	var _file = document.getElementById('vFileImage');
  var CaseID = $("#vCaseID").val();
  var data = new FormData();
	data.append('filUpload', _file.files[0]);

  var act = 'SRAD_Upload';
	$.ajax({
	    url: "sapi/api.img.class.php?action="+act+"&Case_ID="+CaseID,
	    data: data,
	    type: 'POST',
	    dataType: "json",
	    contentType: false,
	    processData: false,
	    success: function (data) {
        var vResponse = data.Response;
        var vMsg = data.data[0].Msg;
        if(vResponse == 'success'){
          ShowNoti(vMsg,vResponse);
          $('#vFileImage').val('');
          SRAD_SEC_FILE(CaseID);
        }else{
          ShowNoti(vMsg,"warning");
          $('#vFileImage').val('');
        }
      }
	});
});
function SRAD_UPDATE_CASE_DOC(CaseID,TechID,DoctorID,CaseStatus,Case_DocRespone) {
            var act = 'SRAD_UPDATE_CASE_DOC';
            var url = "sapi/api.class.php?action="+ act
            var pData = {
                CaseID : CaseID,
                TechID : TechID,
                DoctorID : DoctorID,
                CaseStatus : CaseStatus,
                CaseDocRespone : Case_DocRespone
            };

            $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: pData,
            success: function(data) {
              if(data.Response == 'success'){
                var vResult = data.data[0].Result;
                var vMsg = data.data[0].Msg;

                if(vResult == "Success"){

                    ShowNoti(vMsg,"success");

                    if(CaseStatus == '1'){
                      $('#frmSaveCase').hide();
                    }

                    $("#DoctorID").val("");
                    $("#vDoc_UID").val("");
                    $("#TechID").val("");
                    $("#vCaseID").val("");
                    $("#RightID").val("");
                    $("#sRights").html("");
                    $("#ManageCase").hide();
                    $("#GridCase").show();

                    let vModality = $('#HModality').html();
                    let vHCase = $('#HCase').html();
                    let vHProtocol = $('#HProtocol').html();
                    let vHHopital = $('#PHos').html();
                    let vUrgentType = $('#sUrgentType').html();
                    let vPatientName = $('#vName').val() + ' ' + $('#vLName').val();
                    let vCaseID = $('#vCaseID').html();

                    let vDocUID = $('#vDoc_UID').val();
                    let vMsgLine = "เคสถูกยกเลิก" + "<br>" +
                               "Hospital : " + vHHopital + "<br>" +
                               "คนไข้ : " + vPatientName + "<br>" +
                               "Modality : " + vModality + "<br>" +
                               "Description : " + vHCase + "<br>" +
                               "Protocol : " + vHProtocol;

                    LineNotiMsg(vDocUID,vMsgLine);
                    gridCaseActive();
                }
                else {
                    ShowNoti(vResult,"danger");
                }
              }
            }
        });
}
function LineNotiMsg(UID,Msg) {
  var url = "https://dev.radconnext.com/linebot/send_line_msg.php"
  //ar CaseID = $("#vCaseID").val();
  var pData = {
    send_case : "text",
    user_lineid : UID,
    line_msg : Msg
  };

  $.ajax({
  type: "POST",
  url: url,
  dataType: "json",
  data: pData,
  success: function(data) {
    //ShowNoti("Noti Line success",'success');
  },
  error: function () {
    //ShowNoti('Noti Line failed',"warning");
  }
});
}
function LineNotiToDoc(UID,ExpireDT,HosName,UrgenntName,PatientName,CaseID) {
  var url = "https://dev.radconnext.com/linebot/send_line_msg.php"
  //ar CaseID = $("#vCaseID").val();
  var pData = {
    send_case : 'new_push',
    user_lineid : UID,
    user_curr_status : 'accept',
    line_title : 'new_case',
    expire_datetime : ExpireDT,
    line_topic : 'เคสใหม่รอตอบรับ',
    hos_name : HosName,
    urgent_name : UrgenntName,
    patient_name : PatientName,
    line_reply : 'yes',
    inc_id: CaseID
  };

  $.ajax({
  type: "POST",
  url: url,
  dataType: "json",
  data: pData,
  success: function(data) {
    //ShowNoti("Noti Line success",'success');
  },
  error: function () {
    //ShowNoti('Noti Line failed',"warning");
  }
});
}
