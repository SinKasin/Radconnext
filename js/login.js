$(document).ready(function() {

  $('#vLogin').click(function () {
    var U = $('#pUser').val();
    var P = $('#pPassword').val();
       login(U,P)
      //console.log(U + ' ' + P);
  });

});

function login(U,P) {
    var act = 'login';
    var pData = {
      UserName : U
     ,Password : P
    };

    $.ajax({
        type: "POST",
        url: "main.class.php?action="+act,
        dataType: "json",
        data: pData,
        success: function (data) {
          if (data.response == 'success')
          {
              window.location='index.php';
          }
          else
          {
            $('#LoginMSG').html(data.Msg);
              //window.location='login.php';
              if(data.Msg == '')
              {
                $('#pUser').val('');
                $('#pPassword').val('');
                $('#LoginMSG').html('User not active!!!');
              }
          }
        },
        error: function() {
          window.location='login.php';
        }
  });
}
