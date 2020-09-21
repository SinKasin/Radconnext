<?php
//API Class
//Create By :: Kasin Kuljiang
//Create Date :: 19-20-2020
//E-mail :: thesin18598@gmail.com

class API{

	public function ConnectDB(){
		$DB = connect_mssql::DB();

		if(empty($DB)){
			$Jdata['Result'] = "Failed";
			$Jdata['Message'] = "Can't connect database";
		}else{
			$Jdata['Result'] = "Success";
			$Jdata['Message'] = "Connected";
		}
		echo json_encode($Jdata, JSON_UNESCAPED_UNICODE);
	}

	public function is_array_empty($arr){
	   if(is_array($arr)){
	      foreach($arr as $S => $value){
	         if(empty($value)){
	            $res[$S] = $value;
	         }
	      }
	   }
	   return $res;
	}

	public function fix($source) {
    $source = preg_replace_callback(
        '/(^|(?<=&))[^=[&]+/',
        function($key) { return bin2hex(urldecode($key[0])); },
        $source
    );

    parse_str($source, $post);

    $result = array();
    foreach ($post as $key => $val) {
        $result[hex2bin($key)] = $val;
    }
    return $result;
	}

 	public function RadRegister($frm)
  	{
	    $UserID 	  		= $frm['UserID'];
	    $UserName 			= $frm['UserName'];
	    $Password 			= $frm['Password'];
	    $Name 					= $frm['Name'];
	    $LastName 			= $frm['LastName'];
	    $Email 					= $frm['Email'];
	    $Phone 					= $frm['Phone'];
			$LineID					= $frm['LineID'];
			$LineCode				= $frm['LineCode'];
			$Type 					= $frm['Type'];
	    $Auth 					= $frm['Auth'];
			$PathRadiant 		= $frm['PathRadiant'];
	    $Active 				= $frm['Active'];
	    $Action 				= $frm['SQL_Action'];

	    $ChkValues = $this->is_array_empty($frm);

	   // if(!empty($ChkValues)){
	    //	$vResult['Data'] = "Failed";
	    	//echo "{\"response\":\"Failed\",\"data\":[".json_encode($ChkValues)."]}";
	    //}else{
	    	$DB = connect_mssql::DB();
	    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_REG_USER] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
		    $params = array(
		      array($UserID		, SQLSRV_PARAM_IN),
		      array($UserName		, SQLSRV_PARAM_IN),
		      array($Password		, SQLSRV_PARAM_IN),
		      array($Name 	 		, SQLSRV_PARAM_IN),
		      array($LastName		, SQLSRV_PARAM_IN),
		      array($Email   		, SQLSRV_PARAM_IN),
		      array($Phone   		, SQLSRV_PARAM_IN),
		      array($LineID   	, SQLSRV_PARAM_IN),
		      array($LineCode   , SQLSRV_PARAM_IN),
		      array($Type    		, SQLSRV_PARAM_IN),
		      array($Auth    		, SQLSRV_PARAM_IN),
		      array($PathRadiant, SQLSRV_PARAM_IN),
		      array($Active    	, SQLSRV_PARAM_IN),
		      array($Action    	, SQLSRV_PARAM_IN)
		    );
		    $stmt = sqlsrv_query( $DB, $sql, $params);
		    Utility::jsonMSSQL($stmt);
	    //}
  	}
  	public function RadActiveUser($frm)
  	{
	    $UserName 	= $frm['UserName'];
	    $Active 		= $frm['Active'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_ACTIVE_USER] ?, ?";
	    $params = array(
	      array($UserName	, SQLSRV_PARAM_IN),
	      array($Active		, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

		Utility::jsonMSSQL($stmt);
  	}
  	public function RadGetDataUser($frm)
  	{
  		$pActive = $frm['Active'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_DATA_USER] ?";
	    $params = array(
	      array($pActive, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);
		Utility::jsonMSSQL($stmt);
  	}
  	public function RadLogin($frm)
  	{
	    $UserName 	= $frm['UserName'];
	    $Password 	= $frm['Password'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_LOGIN] ?, ?";
	    $params = array(
	      array($UserName, SQLSRV_PARAM_IN),
	      array($Password, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

		Utility::jsonMSSQL($stmt);
  	}
  	public function RadLogout($frm)
  	{
	    $UserName 	= $frm['UserName'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_LOGOUT] ?";
	    $params = array(
	      array($UserName, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

		Utility::jsonMSSQL($stmt);
  	}
  	//Hospital
  	public function RadHospital($frm)
  	{
	    $UserID 			= $frm['UserID'];
	    $HosID 				= $frm['HosID'];
			$HosOrthancID = $frm['HosOrthancID'];
	    $HosName 			= $frm['HosName'];
	    $HosAddress 	= $frm['HosAddress'];
	    $HosTel1 			= $frm['HosTel1'];
	    $HosTel2 			= $frm['HosTel2'];
	    $HosContact 	= $frm['HosContact'];
	    $HosRemark 		= $frm['HosRemark'];
	    $HosAction 		= $frm['SQL_Action'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_INS_HOS] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($UserID		  	, SQLSRV_PARAM_IN),
	      array($HosID		  	, SQLSRV_PARAM_IN),
	      array($HosOrthancID	, SQLSRV_PARAM_IN),
	      array($HosName	  	, SQLSRV_PARAM_IN),
	      array($HosAddress   , SQLSRV_PARAM_IN),
	      array($HosTel1	    , SQLSRV_PARAM_IN),
	      array($HosTel2   	  , SQLSRV_PARAM_IN),
	      array($HosContact   , SQLSRV_PARAM_IN),
	      array($HosRemark    , SQLSRV_PARAM_IN),
	      array($HosAction    , SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);
	    Utility::jsonMSSQL($stmt);
  	}
		//Insert Data Dicom
  	public function SDIC_INS_CASE($frm="")
  	{
	    $Patient 													= $frm['PatientID'];
	    $AccessionNumber 									= $frm['AccessionNumber'];
	    $InstitutionName 									= $frm['InstitutionName'];
	    $PatientName 											= $frm['PatientName'];
	    $PatientSex 											= $frm['PatientSex'];
	    $PatientBirthDate 								= $frm['PatientBirthDate'];
		  $StudyDate 												= $frm['StudyDate'];
	    $RequestedProcedureDescription		= $frm['RequestedProcedureDescription'];
	    $StudyDescription 								= $frm['StudyDescription'];
	    $ParentPatient 										= $frm['ParentPatient'];
	    $OrthancID 												= $frm['OrthancID'];
	    $LastUpdate				 								= $frm['LastUpdate'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC SDIC_INS_CASE ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($Patient		  										, SQLSRV_PARAM_IN),
	      array($AccessionNumber	  							, SQLSRV_PARAM_IN),
	      array($InstitutionName   								, SQLSRV_PARAM_IN),
	      array($PatientName	  									, SQLSRV_PARAM_IN),
	      array($PatientSex   	  								, SQLSRV_PARAM_IN),
	      array($PatientBirthDate   							, SQLSRV_PARAM_IN),
	      array($StudyDate				   							, SQLSRV_PARAM_IN),
	      array($RequestedProcedureDescription    , SQLSRV_PARAM_IN),
	      array($StudyDescription    							, SQLSRV_PARAM_IN),
	      array($ParentPatient    								, SQLSRV_PARAM_IN),
	      array($OrthancID    										, SQLSRV_PARAM_IN),
	      array($LastUpdate				   							, SQLSRV_PARAM_IN)
	    );
			//print_r($params);
	    $stmt = sqlsrv_query( $DB, $sql, $params);
	    Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_GET_CASE($frm)
  	{
	    $User_ID 	= $frm['User_ID'];
	    $Type 	= $frm['Type'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE] ?, ?";
	    $params = array(
	      array($User_ID, SQLSRV_PARAM_IN),
	      array($Type, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_GET_CASE_HIS($frm)
  	{
	    $User_ID 	= $frm['User_ID'];
	    $Type 	= $frm['Type'];
	    $Date 	= $frm['Date'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE_HIS] ?, ?, ?";
	    $params = array(
	      array($User_ID, SQLSRV_PARAM_IN),
	      array($Type, SQLSRV_PARAM_IN),
	      array($Date, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_GET_CASE_ROW($frm)
  	{
	    $User_ID 	= $frm['User_ID'];
	    $Type 	= $frm['Type'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE_ROW] ?, ?";
	    $params = array(
	      array($User_ID, SQLSRV_PARAM_IN),
	      array($Type, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_UPDATE_STATUS_CASE($frm)
  	{
	    $Case_ID 			= $frm['Case_ID'];
	    $Case_Status 	= $frm['Case_Status'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_UPDATE_STATUS_CASE] ?, ?";
	    $params = array(
	      array($Case_ID		, SQLSRV_PARAM_IN),
	      array($Case_Status, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_CASE_STATUS($frm)
  	{
	    $CASE_STATUS_ID 	 	= $frm['CASE_STATUS_ID'];
	    $CASE_STATUS_Num  	= $frm['CASE_STATUS_Num'];
	    $CASE_STATUS_Name 	= $frm['CASE_STATUS_Name'];
	    $ACTION 	= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_CASE_STATUS] ?, ?, ?, ?";
	    $params = array(
	      array($CASE_STATUS_ID		, SQLSRV_PARAM_IN),
	      array($CASE_STATUS_Num	, SQLSRV_PARAM_IN),
	      array($CASE_STATUS_Name	, SQLSRV_PARAM_IN),
	      array($ACTION						, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_URGENT_TYPE($frm)
  	{
	    $UG_Type_ID 		= $frm['UG_Type_ID'];
	    $Hos_OrthancID	= $frm['Hos_OrthancID'];
	    $UG_Type_Name 	= $frm['UG_Type_Name'];
	    $UG_Type_Day 		= $frm['UG_Type_Day'];
	    $UG_Type_Hour		= $frm['UG_Type_Hour'];
	    $UG_Type_Minute	= $frm['UG_Type_Minute'];
	    $ACTION					= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_URGENT_TYPE] ?, ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($UG_Type_ID				, SQLSRV_PARAM_IN),
	      array($Hos_OrthancID		, SQLSRV_PARAM_IN),
	      array($UG_Type_Name			, SQLSRV_PARAM_IN),
	      array($UG_Type_Day			, SQLSRV_PARAM_IN),
	      array($UG_Type_Hour			, SQLSRV_PARAM_IN),
	      array($UG_Type_Minute		, SQLSRV_PARAM_IN),
	      array($ACTION						, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_HOS_LINK($frm)
  	{
	    $HosLink_ID 			= $frm['HosLink_ID'];
	    $User_ID					= $frm['User_ID'];
	    $Hos_OrthancID		= $frm['Hos_OrthancID'];
	    $ACTION						= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_HOS_LINK] ?, ?, ?, ?";
	    $params = array(
	      array($HosLink_ID			, SQLSRV_PARAM_IN),
	      array($User_ID				, SQLSRV_PARAM_IN),
	      array($Hos_OrthancID	, SQLSRV_PARAM_IN),
	      array($ACTION					, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_LIST_DORTOR($frm)
  	{
	    $User_ID					= $frm['User_ID'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_LIST_DORTOR] ?";
	    $params = array(
	      array($User_ID				, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_LIST_DORTOR_DESC($frm)
  	{
	    $User_ID					= $frm['User_ID'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_LIST_DORTOR_DETAIL] ?";
	    $params = array(
	      array($User_ID				, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_UPDATE_CASE($frm)
  	{
	    $CaseID									= $frm['CaseID'];
	    $TechID									= $frm['TechID'];
	    $DoctorID								= $frm['DoctorID'];
	    $PatientName						= $frm['PatientName'];
	    $PatientLastName				= $frm['PatientLastName'];
	    $CaseStatus							= $frm['CaseStatus'];
	    $UrgentType							= $frm['UrgentType'];
	    $TreatmentRights_ID			= $frm['TreatmentRights_ID'];
	    $Patient_Doctor					= $frm['PatientDoctor'];
	    $Patient_CitizenID			= $frm['PatientCitizenID'];
	    $CaseAMT								= $frm['CaseAMT'];
	    $CaseDFAMT							= $frm['CaseDFAMT'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_UPDATE_CASE] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($CaseID								, SQLSRV_PARAM_IN),
	      array($TechID								, SQLSRV_PARAM_IN),
	      array($DoctorID							, SQLSRV_PARAM_IN),
	      array($CaseStatus						, SQLSRV_PARAM_IN),
	      array($UrgentType						, SQLSRV_PARAM_IN),
	      array($TreatmentRights_ID		, SQLSRV_PARAM_IN),
	      array($PatientName					, SQLSRV_PARAM_IN),
	      array($PatientLastName			, SQLSRV_PARAM_IN),
	      array($Patient_Doctor				, SQLSRV_PARAM_IN),
	      array($Patient_CitizenID		, SQLSRV_PARAM_IN),
	      array($CaseAMT							, SQLSRV_PARAM_IN),
	      array($CaseDFAMT						, SQLSRV_PARAM_IN),
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_UPDATE_CASE_DOC($frm)
  	{
	    $CaseID									= $frm['CaseID'];
	    $TechID									= $frm['TechID'];
	    $DoctorID								= $frm['DoctorID'];
	    $CaseStatus							= $frm['CaseStatus'];
	    $Case_DocRespone				= $frm['CaseDocRespone'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_UPDATE_CASE_DOC] ?, ?, ?, ?, ?";
	    $params = array(
	      array($CaseID								, SQLSRV_PARAM_IN),
	      array($TechID								, SQLSRV_PARAM_IN),
	      array($DoctorID							, SQLSRV_PARAM_IN),
	      array($CaseStatus						, SQLSRV_PARAM_IN),
	      array($Case_DocRespone			, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_UPDATE_CASE_FINAL($frm)
  	{
	    $CaseID									= $frm['CaseID'];
	    $CaseStatus							= $frm['CaseStatus'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_UPDATE_CASE_FINAL] ?, ?";
	    $params = array(
	      array($CaseID								, SQLSRV_PARAM_IN),
	      array($CaseStatus						, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_GET_CASE_REPORT($frm)
  	{
	    $CaseID = $frm['CaseID'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE_REPORT] ?";
	    $params = array(
	      array($CaseID , SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_Upload($frm,$get)
  	{
			$CaseID					= $get['Case_ID'];
	    $file_tmp_name	= $frm['tmp_name'];
	    $file_name			= $frm["name"];
	    $file_size			= $frm["size"];
	    $file_type			= $frm["type"];

			/*$DataImage = file_get_contents($file_tmp_name);
			$ArrData = unpack("H*hex", $DataImage);
			$HexData = "0x".$ArrData['hex'];
*/
			$target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Radconnext/image/";

			$destination_path = getcwd().DIRECTORY_SEPARATOR;

			$file_names = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file_name);
			$ext = pathinfo($file_name, PATHINFO_EXTENSION);
			$imagename = $file_names.'_'.time().".".$ext;

			$target_path = $target_dir.basename($imagename);


			if (is_dir($target_dir) && is_writable($target_dir)) {
						@move_uploaded_file($file_tmp_name, $target_path);
			} else {
					echo $target_dir;
			    echo 'Upload directory is not writable, or does not exist.';
			}

			//echo $HexData." ".$CaseID;
    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextImage].[dbo].[SRAD_UPLOAD_FILE] ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($CaseID											, SQLSRV_PARAM_IN),
	      array($imagename									, SQLSRV_PARAM_IN),
	      array($file_type									, SQLSRV_PARAM_IN),
	      array($file_size									, SQLSRV_PARAM_IN),
	      array($DataImage									, SQLSRV_PARAM_IN),
	      array('image/'.$imagename			, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}
		public function SRAD_DEL_FILE($frm)
  	{
			$Result_CASE_ID = $frm['Result_CASE_ID'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextImage].[dbo].[SRAD_DEL_FILE] ?";
	    $params = array(
	      array($Result_CASE_ID	, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_SEC_FILE($frm)
  	{
			$CaseID					= $frm['Case_ID'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextImage].[dbo].[SRAD_SEC_FILE] ?";
	    $params = array(
	      array($CaseID				, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_TREATMENTRIGHTS($frm)
  	{
	    $TreatmentRights_ID			= $frm['TreatmentRights_ID'];
	    $Hos_OrthancID					= $frm['Hos_OrthancID'];
	    $Name				= $frm['Name'];
	    $Values			= '0';
	    $Action			= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_TREATMENTRIGHTS] ?, ?, ?, ?, ?";
	    $params = array(
	      array($TreatmentRights_ID			, SQLSRV_PARAM_IN),
	      array($Hos_OrthancID					, SQLSRV_PARAM_IN),
	      array($Name				, SQLSRV_PARAM_IN),
	      array($Values			, SQLSRV_PARAM_IN),
	      array($Action			, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);
			Utility::jsonMSSQLNoHeader($stmt);
  	}

		public function SRAD_MSG_TREATMENTRIGHTS_T($frm)
  	{
	    $TreatmentRights_ID			= $frm['TreatmentRights_ID'];
	    $Hos_OrthancID					= $frm['Hos_OrthancID'];
	    $Name				= $frm['Name'];
	    $Values			= '0';
	    $Action			= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_TREATMENTRIGHTS] ?, ?, ?, ?, ?";
	    $params = array(
	      array($TreatmentRights_ID			, SQLSRV_PARAM_IN),
	      array($Hos_OrthancID					, SQLSRV_PARAM_IN),
	      array($Name				, SQLSRV_PARAM_IN),
	      array($Values			, SQLSRV_PARAM_IN),
	      array($Action			, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);
			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_ORDER($frm)
  	{
	    $OrderID					= $frm['OrderID'];
	    $Order_ID					= $frm['Order_ID'];
	    $Order_Header			= $frm['Order_Header'];
	    $Order_Detail			= $frm['Order_Detail'];
	    $Order_Unit				= $frm['Order_Unit'];
	    $Order_Price			= $frm['Order_Price'];
	    $ACTION						= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_ORDER] ?, ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($OrderID					, SQLSRV_PARAM_IN),
	      array($Order_ID					, SQLSRV_PARAM_IN),
	      array($Order_Header			, SQLSRV_PARAM_IN),
	      array($Order_Detail			, SQLSRV_PARAM_IN),
	      array($Order_Unit				, SQLSRV_PARAM_IN),
	      array($Order_Price			, SQLSRV_PARAM_IN),
	      array($ACTION						, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_GET_CASE_ACCOUNT($frm)
  	{
	    $UserID					= $frm['User_ID'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE_ACCOUNT] ?";
	    $params = array(
	      array($UserID					, SQLSRV_PARAM_IN)
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_ORDER_LINK($frm)
  	{
	    $OrderLinkID			= $frm['OrderLinkID'];
	    $Order_ID					= $frm['Order_ID'];
	    $Dicom_DESC				= $frm['Dicom_DESC'];
			$ACTION						= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_ORDER_LINK] ?, ?, ?, ?";
	    $params = array(
	      array($OrderLinkID		, SQLSRV_PARAM_IN),
	      array($Order_ID				, SQLSRV_PARAM_IN),
	      array($Dicom_DESC			, SQLSRV_PARAM_IN),
	      array($ACTION					, SQLSRV_PARAM_IN),
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_TEMPLATE($frm)
  	{
	    $Template_ID			= $frm['Template_ID'];
	    $Template_Topic			= $frm['Template_Topic'];
	    $Template_Code		= $frm['Template_Code'];
	    $User_ID					= $frm['User_ID'];
	    $Template_Text	  = $frm['Template_Text'];
			$ACTION						= $frm['SQL_ACTION'];

    	$DB = connect_mssql::DB();
    	$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_TEMPLATE] ?, ?, ?, ?, ?, ?";
	    $params = array(
	      array($Template_ID		, SQLSRV_PARAM_IN),
	      array($Template_Topic		, SQLSRV_PARAM_IN),
	      array($Template_Code	, SQLSRV_PARAM_IN),
	      array($User_ID				, SQLSRV_PARAM_IN),
	      array($Template_Text	, SQLSRV_PARAM_IN),
	      array($ACTION					, SQLSRV_PARAM_IN),
	    );
	    $stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
  	}

		public function SRAD_MSG_HOS_ORDER($frm)
		{
			$OrderID					= $frm['HosOrderID'];
			$Order_ID					= $frm['HosOrder_ID'];
			$Hos_OrthancID		= $frm['Hos_OrthancID'];
			$Order_Header			= $frm['HosOrder_Header'];
			$Order_Detail			= $frm['HosOrder_Detail'];
			$HosOrder_Dicom		= $frm['HosOrder_Dicom'];
			$Order_Unit				= $frm['HosOrder_Unit'];
			$HosOrder_PriceMS	= $frm['HosOrder_PriceMS'];
			$Order_Price			= $frm['HosOrder_Price'];
			$Order_DF					= $frm['HosOrder_DF'];
			$ACTION						= $frm['SQL_ACTION'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_HOS_ORDER] ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?";
			$params = array(
				array($OrderID					, SQLSRV_PARAM_IN),
				array($Order_ID					, SQLSRV_PARAM_IN),
				array($Hos_OrthancID		, SQLSRV_PARAM_IN),
				array($Order_Header			, SQLSRV_PARAM_IN),
				array($Order_Detail			, SQLSRV_PARAM_IN),
				array($HosOrder_Dicom		, SQLSRV_PARAM_IN),
				array($Order_Unit				, SQLSRV_PARAM_IN),
				array($HosOrder_PriceMS	, SQLSRV_PARAM_IN),
				array($Order_Price			, SQLSRV_PARAM_IN),
				array($Order_DF					, SQLSRV_PARAM_IN),
				array($ACTION						, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_MSG_USERORDER($frm)
		{
			$UserName			= $frm['UserName'];
			$OrderID					= $frm['OrderID'];
			$UserOrderActive	= $frm['UserOrderActive'];
			$ACTION						= $frm['SQL_ACTION'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_USERORDER] ?, ?, ?, ?";
			$params = array(
				array($UserName					, SQLSRV_PARAM_IN),
				array($OrderID					, SQLSRV_PARAM_IN),
				array($UserOrderActive	, SQLSRV_PARAM_IN),
				array($ACTION						, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_MSG_USERSTATUS($frm)
		{
			$UserName			= $frm['UserName'];
			$STATUSNAME		= $frm['STATUSNAME'];
			$STATUS				= $frm['STATUS'];
			$ACTION				= $frm['SQL_ACTION'];
			$UID					= $frm['UID'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_MSG_USERSTATUS] ?, ?, ?, ?, ?";
			$params = array(
				array($UserName					, SQLSRV_PARAM_IN),
				array($STATUSNAME				, SQLSRV_PARAM_IN),
				array($STATUS						, SQLSRV_PARAM_IN),
				array($ACTION						, SQLSRV_PARAM_IN),
				array($UID							, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_GET_CASE_PATIENT($frm)
		{
			$Patient_HN			= $frm['Patient_HN'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE_PATIENT] ?";
			$params = array(
				array($Patient_HN					, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_UPDATE_CASE_AMT($frm)
		{
			$CaseID				= $frm['CaseID'];
			$CaseAMT			= $frm['CaseAMT'];
			$CaseDFAMT		= $frm['CaseDFAMT'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_UPDATE_CASE_AMT] ?, ?, ?";
			$params = array(
				array($CaseID					, SQLSRV_PARAM_IN),
				array($CaseAMT				, SQLSRV_PARAM_IN),
				array($CaseDFAMT			, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_CHK_NOIT_STATUS($frm)
		{
			$UID				= $frm['UID'];
			$NotiName			= $frm['NotiName'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_CHK_NOIT_STATUS] ?, ?";
			$params = array(
				array($UID					, SQLSRV_PARAM_IN),
				array($NotiName			, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_GET_CASE_ONE_HOUR($frm)
		{
			$UID				= $frm['UID'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_GET_CASE_ONE_HOUR] ?";
			$params = array(
				array($UID					, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function SRAD_UPDATE_CASE_LINE($frm)
		{
			$CaseID			= $frm['Case_ID'];
			$UID				= $frm['UID'];
			$CaseStatus	= $frm['CaseStatus'];

			$DB = connect_mssql::DB();
			$sql = "EXEC [RADconnextDB].[dbo].[SRAD_UPDATE_CASE_LINE] ?, ?, ?";
			$params = array(
				array($CaseID				, SQLSRV_PARAM_IN),
				array($UID					, SQLSRV_PARAM_IN),
				array($CaseStatus		, SQLSRV_PARAM_IN)
			);
			$stmt = sqlsrv_query( $DB, $sql, $params);

			Utility::jsonMSSQL($stmt);
		}

		public function img2dcm($frm,$get)
		{
			$file_tmp_name	= $frm['tmp_name'];
			$client = new http\Client;
			$request = new http\Client\Request;
			$request->setRequestUrl('http://103.91.189.94:3000/img2dcm/converter');
			$request->setRequestMethod('POST');
			$body = new http\Message\Body;
			//$file_tmp_name,
			$body->addForm(array(
			  'filename' => 'C:\\Users\\the_s\\OneDrive\\Desktop\\20180822_130248.jpg',
			  'StudyID' => 'c32ce2bd-a184fe59-90308459-5e4ce96a-6b52b65c'
			), array(

			));
			$request->setBody($body);
			$request->setOptions(array());
			$request->setHeaders(array(
			  'Authorization' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWRjQHJhZGNvbm5leHQuY29tIiwiaWF0IjoxNTk4ODg1ODI4NDM2LCJob3N0bmFtZSI6IjEwMy45MS4xODkuOTQ6MzAwMCIsInJvb3RuYW1lIjoiaW1nMmRjbSJ9.vCgCL0uNsrRU-m-uZ7mCQsynokaiIjri9cXuSRRlrs8',
			  'Cookie' => 'PHPSESSID=7nu6cf20d2o3v9c5o6nghmekp5'
			));
			$client->enqueue($request)->send();
			$response = $client->getResponse();
			echo $response->getBody();
		}
}
?>
