<?php
/*-----CONNECT MICROSOFT_SQL SATO------*/
define('DB_HOST_MSSQL', 'WIN-CRT0RAIPGNG\SQLEXPRESS');
define('DB_USER_MSSQL', 'Radconnext');
define('DB_PASSWORD_MSSQL', 'R@dconnext');
define('DB_NAME_MSSQL', 'DicomDataCenter');
/*-------------------------------------*/

/*----------Config Company----------*/
define('HEADER_NAME', 'Radconnext');
define('HEADER_NAME_MRP', '');
define('HEADER_NAME_II', '');
//define('SIGNATURE', 'UEhBLUptNWljM0E3Sm01aWMzQTdKbTVpYzNBN1EyOXdlWEpwWjJoMEptTnZjSGs3SURJd01UWWdVMGxKV0NCQ1FVNUhTMDlMSUVOUExpeE1WRVF1SUNadVluTndPeUJRYjNkbGNpQkNlU0JKVkNCTFlYTnBiaTVyZFd4QWMybHBlQzVqYnk1MGFDWnVZbk53T3p3dmNENA');
define('KEY', ' VTJsc2VB');
/*---------------------------------------*/

/*---------------PATH----------------*/
define('CLS', 'class/');
define('PHP', '.php');
define('UTILITY','Utility'.PHP);
/*-----------------------------------*/

/*----------Class Connect & Main-------------*/
define('MSSQL', CLS.'connect_mssql'.PHP);
define('LOGIN', CLS.'Check_login'.PHP);
define('MAIL', CLS.'mail-lib'.PHP);
define('CSV', CLS.'csv'.PHP);
define('UTIL', CLS.UTILITY);
/*------------------------------------*/

define('UP','../');

class siix
{
  public static function Chkapplication()
  {
        $log = array(MSSQL,LOGIN,CSV,MAIL,UTIL);
        return $log;
  }
}

?>
