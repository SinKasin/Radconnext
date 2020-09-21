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
					 //$data = iconv("tis-620","utf-8",$row);
		        array_push($dataArray,$data);
		 	}
			echo "{\"Response\":\"success\",\"data\":".json_encode($dataArray, JSON_UNESCAPED_UNICODE)."}";
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
			echo "{\"data\":".json_encode($dataArray, JSON_UNESCAPED_UNICODE)."}";
			sqlsrv_free_stmt( $stmt);
		}
	}
}
?>
