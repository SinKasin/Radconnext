<?php
/**
* Log File .TXT
*/
class logSCM 
{
	
	public static function bkLogSCM()
	{
		$file = fopen(LOGFILE,"w");
		echo fwrite($file,"Hello World. Testing!");
		fclose($file);
	}
}
?>