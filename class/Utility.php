<?php
class Utility{
	public static function jsonMSSQL($stmt)
	{
		$dataArray = array();

		if( $stmt === false ) {
				//echo "{\"Response\":\"Failed\",\"data\":[{\"SQL\":\"Failed\"}]}";
				echo "{\"Result\":\"Failed\",\"data\":".json_encode(sqlsrv_errors())."}";
		}
		else{
			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
			{
					 $data = $row;
						array_push($dataArray,$data);
			}
			echo "{\"Response\":\"success\",\"data\":".json_encode($dataArray,JSON_UNESCAPED_UNICODE)."}";
			sqlsrv_free_stmt( $stmt);
		}
	}

	public static function jsonMSSQLNoHeader($stmt)
	{
		$dataArray = array();

		if( $stmt === false ) {
				//echo "{\"Response\":\"Failed\",\"data\":[{\"SQL\":\"Failed\"}]}";
				echo "{\"Result\":\"Failed\",\"data\":".json_encode(sqlsrv_errors())."}";
		}
		else{
			while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
			{
					 $data = $row;
						array_push($dataArray,$data);
			}
			echo "{\"data\":".json_encode($dataArray,JSON_UNESCAPED_UNICODE)."}";
			sqlsrv_free_stmt( $stmt);
		}
	}
	public static function selectYear(){
    	$YearAll = date('Y');
    	$next_year = date('Y')+1;
    	for($i=2020;$i<=$YearAll;$i++){
			echo "<option value=\"".$i."\">".$i."</option>";
		}
		echo "<option value=\"".$next_year."\">".$next_year."</option>";
  }

	public static function selectMonth(){
	    	for($i=01;$i<=12;$i++){
	    		if($i <10){
	    			echo "<option value=\"0".$i."\">".Utility::namemonth($i)."</option>";
	    		}else{
	    			echo "<option value=\"".$i."\">".Utility::namemonth($i)."</option>";
	    		}

			}
	}

	public static function selectHospital(){
				$pActive = 'SEI';

				$DB = connect_mssql::DB();
				$sql = "EXEC [RADconnextDB].[dbo].[SRAD_INS_HOS_LIST] ?";
				$params = array(
					array($pActive, SQLSRV_PARAM_IN)
				);
				$stmt = sqlsrv_query( $DB, $sql, $params);

				while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC))
				{
						 echo "<option value=\"".$row['Hos_OrthancID']."\">".$row['Hos_Name']."</option>";
				}
	}

	public static function namemonth($value='')
  {
  	switch ($value) {
  		case '01':return "มกราคม";break;
  		case '02':return "กุมภาพันธ์";break;
  		case '03':return "มีนาคม";break;
  		case '04':return "เมษายน";break;
  		case '05':return "พฤษภาคม";break;
  		case '06':return "มิถุนายน";break;
  		case '07':return "กรกฎาคม";break;
  		case '08':return "สิงหาคม";break;
  		case '09':return "กันยายน";break;
  		case '10':return "ตุลาคม";break;
  		case '11':return "พฤศจิกายน";break;
  		case '12':return "ธันวาคม";break;
  	}
  }
}
?>
