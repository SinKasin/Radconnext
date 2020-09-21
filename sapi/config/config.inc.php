<?php
/*---------------PATH----------------*/
define('CLS', 'class/');
define('PHP', '.php');
define('UTILITY','Utility'.PHP);
/*-----------------------------------*/

/*-----CONNECT MICROSOFT_SQL SATO------*/
define('DB_HOST_MSSQL', 'WIN-CRT0RAIPGNG\SQLEXPRESS');
define('DB_USER_MSSQL', 'Radconnext');
define('DB_PASSWORD_MSSQL', 'R@dconnext');
define('DB_NAME_MSSQL', 'DicomDataCenter');
/*-------------------------------------*/

/*----------Class Connect & Main-------------*/
define('MSSQL', CLS.'connect_mssql'.PHP);
define('API', CLS.'API'.PHP);
define('Util', CLS.'Utility'.PHP);
/*------------------------------------*/

define('UP','../');

class Rad
{
  public static function Chkapplication()
  {
        $log = array(MSSQL,API,Util);
        return $log;
  }
}

?>
