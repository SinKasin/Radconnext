<?php require_once('common.php');
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

$API = new API;

	switch ($_GET['action']) {
		case 'SRAD_Upload':
			$API->SRAD_Upload($_FILES['filUpload'],$_GET);
			break;
		case 'img2dcm':
			$API->img2dcm($_FILES['filUpload'],$_GET);
			break;
	}
?>
