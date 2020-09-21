<?php
session_start();
set_time_limit(1500);
ini_set("memory_limit","2500M");
error_reporting(E_ALL & ~E_NOTICE);
date_default_timezone_set("Asia/Bangkok");
/*------------------------------------------*/
define('CONFIG', 'config/');
define('INC', 'config.inc.php');
require_once(CONFIG.INC);
/*------------------------------------------*/
$Rad = Rad::Chkapplication();
/*------------------------------------------*/
if(!$Rad)
	{
		echo "<h1>Signature Not Match!!!</h1>";
	}
	else
	{
		foreach ($Rad as $link)
	   {
	     require_once($link);
	   }
	}
/*----------------------------------------*/

?>
