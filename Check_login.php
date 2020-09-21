<?php
class login{

		function check_login($frm){
			$UserName 	= $frm['UserName'];
			$Password 	= $frm['Password'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_LOGIN] ?, ?";
			$params = array(
				array($UserName, SQLSRV_PARAM_IN),
				array($Password, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);
			//Utility::jsonMSSQL($stmt);
			$dataArray = array();

			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
			{
					 $objResult = $row;
						array_push($dataArray,$objResult);
			}

			if($objResult[Result] != "Success")
			{
					echo "{\"response\":\"$objResult[Result]\",\"Msg\":\"$objResult[Msg]\"}";
			}
			else
			{
					$_SESSION["logon"]=true;
					$_SESSION["USER_ID"]=$objResult["User_ID"];
					$_SESSION["USER_UserName"]=$objResult["User_UserName"];
					$_SESSION["USER_NAME"]=$objResult["User_Name"];
					$_SESSION["USER_LNAME"]=$objResult["User_LastName"];
					$_SESSION["Type"]=$objResult["UserType_Name"];
					$_SESSION["TypeID"]=$objResult["UserType_ID"];
					$_SESSION["PathRadiant"]=$objResult["User_PathRadiant"];
					$_SESSION["Active"]=$objResult["User_Active"];

					session_write_close();
					if($_SESSION["USER_ID"] != "")
					{
						echo "{\"response\":\"success\",\"data\":".json_encode($dataArray)."}";
					}
			}
		}

	public static function showlogin($userID)
	{
		$l = new login;
		$button = $l->buttonLogout();
		if($userID!= "")
		{
			return $button;//$_SESSION["USER_NAME"]." ".$_SESSION["DEPARTMENT"]
		}
	}

	public static function userLogOut()
	{
		session_destroy();
		//if($_SESSION["USER_ID"] == "")
		//{
			/*$UserName 	= $_SESSION['USER_UserName'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_LOGOUT] ?";
			$params = array(
				array($UserName, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);*/
		//}

		//Utility::jsonMSSQL($stmt);
		echo "{\"response\":\"success\"}";
	}

	public function buttonLogout()
	{
		echo"<div align=\"center\">
			  <table width=\"100%\" border=\"0\">
			    <tr>
			        <td width=\"100%\" align=\"center\">
			          <button class=\"btn text-muted text-center btn-danger\" type=\"submit\" onclick=\"logOut();\"><i class=\"icon-signout icon-1x\"></i></button>
			        </td>
			    </tr>
			  </table>
			  </div>";
	}

	public function checkStatusLogin()
	{
		if(isset($_SESSION["USER_ID"])==""){
			echo '<script language="javascript">';
			//echo 'alert("Cann\'t Enter Please login!!!!!!");';
			echo "window.location='login.php';";
			echo '</script>';
		}
	}

	public static function footer()
  {
		$signature = "Copyright© 2020 Radconnext All rights reserved.";//key::KeySignature(SIGNATURE);
     return $signature;
  }
}
?>
