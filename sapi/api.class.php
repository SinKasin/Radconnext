<?php require_once('common.php');
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

$API = new API;

	switch ($_GET['action']) {
		case 'ConnectDB':
			$API->ConnectDB();
			break;
		case 'RadRegister':
			$API->RadRegister($_POST);
			break;
		case 'RadRegisterUID':
			$API->RadRegister($_GET);
			break;
		case 'RadActiveUser':
			$API->RadActiveUser($_POST);
			break;
		case 'RadGetDataUser':
			$API->RadGetDataUser($_GET);
			break;
		case 'RadLogin':
			$API->RadLogin($_POST);
			break;
		case 'RadLogout':
			$API->RadLogout($_POST);
			break;
		case 'RadHospital':
			$API->RadHospital($_POST);
			break;
		case 'SDIC_INS_CASE':
			$API->SDIC_INS_CASE($_GET);
			break;
		case 'SRAD_GET_CASE_ROW':
			$API->SRAD_GET_CASE_ROW($_GET);
			break;
		case 'SRAD_GET_CASE':
			$API->SRAD_GET_CASE($_GET);
			break;
		case 'SRAD_GET_CASE_HIS':
			$API->SRAD_GET_CASE_HIS($_GET);
			break;
		case 'SRAD_UPDATE_STATUS_CASE':
			$API->SRAD_UPDATE_STATUS_CASE($_POST);
			break;
		case 'SRAD_UPDATE_STATUS_CASE':
			$API->SRAD_MSG_CASE_STATUS($_POST);
			break;
		case 'SRAD_UPDATE_STATUS_CASE':
			$API->SRAD_MSG_URGENT_TYPE($_POST);
			break;
		case 'SRAD_MSG_HOS_LINK':
			$API->SRAD_MSG_HOS_LINK($_POST);
			break;
		case 'SRAD_MSG_URGENT_TYPE':
			$API->SRAD_MSG_URGENT_TYPE($_POST);
			break;
		case 'SRAD_LIST_DORTOR':
			$API->SRAD_LIST_DORTOR($_POST);
			break;
		case 'SRAD_LIST_DORTOR_DESC':
			$API->SRAD_LIST_DORTOR_DESC($_POST);
			break;
		case 'SRAD_UPDATE_CASE':
			$API->SRAD_UPDATE_CASE($_POST);
			break;
		case 'SRAD_UPDATE_CASE_DOC':
			$API->SRAD_UPDATE_CASE_DOC($_POST);
			break;
		case 'SRAD_UPDATE_CASE_FINAL':
			$API->SRAD_UPDATE_CASE_FINAL($_POST);
			break;
		case 'SRAD_Upload':
			$API->SRAD_Upload($_FILES['filUpload'],$_GET);
			break;
		case 'SRAD_SEC_FILE':
			$API->SRAD_SEC_FILE($_GET);
			break;
		case 'SRAD_MSG_TREATMENTRIGHTS':
			$API->SRAD_MSG_TREATMENTRIGHTS($_POST);
			break;
		case 'SRAD_MSG_TREATMENTRIGHTS_T':
			$API->SRAD_MSG_TREATMENTRIGHTS_T($_POST);
			break;
		case 'SRAD_GET_CASE_REPORT':
			$API->SRAD_GET_CASE_REPORT($_GET);
			break;
		case 'SRAD_MSG_ORDER':
			$API->SRAD_MSG_ORDER($_POST);
			break;
		case 'SRAD_DEL_FILE':
			$API->SRAD_DEL_FILE($_POST);
			break;
		case 'SRAD_GET_CASE_ACCOUNT':
			$API->SRAD_GET_CASE_ACCOUNT($_POST);
			break;
		case 'SRAD_MSG_ORDER_LINK':
			$API->SRAD_MSG_ORDER_LINK($_POST);
			break;
		case 'SRAD_MSG_TEMPLATE':
			$API->SRAD_MSG_TEMPLATE($_POST);
			break;
		case 'SRAD_MSG_HOS_ORDER':
			$API->SRAD_MSG_HOS_ORDER($_POST);
			break;
		case 'SRAD_MSG_USERORDER':
			$API->SRAD_MSG_USERORDER($_POST);
			break;
		case 'SRAD_MSG_USERSTATUS':
			$API->SRAD_MSG_USERSTATUS($_POST);
			break;
		case 'SRAD_MSG_USERSTATUS_I':
			$API->SRAD_MSG_USERSTATUS($_GET);
			break;
		case 'SRAD_GET_CASE_PATIENT':
			$API->SRAD_GET_CASE_PATIENT($_GET);
			break;
		case 'SRAD_UPDATE_CASE_AMT':
			$API->SRAD_UPDATE_CASE_AMT($_POST);
			break;
		case 'SRAD_CHK_NOIT_STATUS':
			$API->SRAD_CHK_NOIT_STATUS($_GET);
			break;
		case 'SRAD_GET_CASE_ONE_HOUR':
			$API->SRAD_GET_CASE_ONE_HOUR($_GET);
			break;
		case 'SRAD_UPDATE_CASE_LINE':
			$API->SRAD_UPDATE_CASE_LINE($_GET);
			break;
	}
?>
