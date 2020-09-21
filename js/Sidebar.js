$(document).ready(function() {

$("#MHadmin").hide();
$("#Hadmin").hide();
$("#MainMenu").hide();
$("#Maccount").hide();
$("#MHAccount").hide();

$("#Mdoctor").hide();
$("#Mtech").hide();

  if (vTypeID == '1'){
    $("#MHadmin").show();
    $("#Hadmin").show();
    $("#MainMenu").show();
    $("#MHAccount").show();
    $("#Maccount").show();

    //$("#Mdoctor").show();
    //$("#Mtech").show();
  }

  if (vTypeID == '3'){
    $("#Mtech").show();
    $("#MainMenu").show();
  }

  if (vTypeID == '2'){
    $("#Mdoctor").show();
    $("#MainMenu").show();
  }

  if (vTypeID == '5'){
    $("#Maccount").show();
    $("#MHAccount").show();
  }
});
