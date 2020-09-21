function logOut() {
    var act = 'logout';

    var pData = {
      UserName : U
    };

    $.ajax({
        type: "POST",
        url: "main.class.php?action="+act,
        dataType: "json",
        data:pData,
        success: function (data) {
        if (data.response == 'success')
         {
            window.location.href="index.php";
         }
      }
    });
}
