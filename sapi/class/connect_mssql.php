<?php
/**
* Connect MSsql
*/
class connect_mssql
{

	private $hostName = DB_HOST_MSSQL;
	private $user= DB_USER_MSSQL;
	private $Password = DB_PASSWORD_MSSQL;
	private $dbName = DB_NAME_MSSQL;

	private function connect($hostName="",$user="",$Password="",$db=""){
			//$connnect = mssql_connect($hostName,$user,$Password);
			//$selected = mssql_select_db($db);
			$serverName = $hostName;
			$connectionInfo = array( "Database"=>$db, "UID"=>$user, "PWD"=>$Password,"CharacterSet" => "UTF-8");
			$connnect = sqlsrv_connect( $serverName, $connectionInfo);
			return $connnect;
	}

	public function mssql()
	{
		$hostName = $this->hostName;
		$user = $this->user;
		$Password = $this->Password;
		$db = $this->dbName;
		$connnect = $this->connect($hostName,$user,$Password,$db);
		return $connnect;
	}

	public static function DB()
	{
		$conDB = NEW connect_mssql;
	  	$DB= $conDB->mssql();
	  	if (!$DB) {
	  		return $DB;
		    //echo "Connection could not be established.<br />";
     		//die( print_r( sqlsrv_errors(), true));
		}else{
			return $DB;
		}
	}
}
?>
