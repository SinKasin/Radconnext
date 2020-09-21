<?php
/**
* sent-E-mail
*/
class mail
{
	
		public static function authMail($from, $namefrom, $to, $nameto, $subject, $message)
		{
			/*?your configuration here?*/
			$smtpServer = SMTP_SERVER;
			$port = SMTP_PORT;
			$timeout = TIMEOUT;
			$username = MAIL_USER; 
			$password = MAIL_PASS; 
			$localhost = MAIL_HOST; 
			$newLine = "\r\n"; 
			$secure = 1;

			/*?you shouldn't need to mod anything else */
			//connect to the host and port
			$smtpConnect = fsockopen($smtpServer, $port, $errno, $errstr, $timeout);
			$smtpResponse = fgets($smtpConnect, 4096);
			if(empty($smtpConnect))
			{
				$output = "Failed to connect: $smtpResponse";
				return $output;
			}
			else
			{
				$logArray['connection'] = "Connected to: $smtpResponse";
			}

			//say HELO to our little friend
			fputs($smtpConnect, "HELO $localhost". $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['heloresponse'] = "$smtpResponse";

			//start a tls session if needed 
			if($secure)
			{
				fputs($smtpConnect, "STARTTLS". $newLine);
				$smtpResponse = fgets($smtpConnect, 4096);
				$logArray['tlsresponse'] = "$smtpResponse";
				
				//you have to say HELO again after TLS is started
				fputs($smtpConnect, "HELO $localhost". $newLine);
				$smtpResponse = fgets($smtpConnect, 4096);
				$logArray['heloresponse2'] = "$smtpResponse";
			}

			//request for auth login
			fputs($smtpConnect,"AUTH LOGIN" . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['authrequest'] = "$smtpResponse";

			//send the username
			fputs($smtpConnect, base64_encode($username) . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['authusername'] = "$smtpResponse";

			//send the password
			fputs($smtpConnect, base64_encode($password) . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['authpassword'] = "$smtpResponse";

			//email from
			fputs($smtpConnect, "MAIL FROM: $from" . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['mailfromresponse'] = "$smtpResponse";

			//email to
			fputs($smtpConnect, "RCPT TO: $to" . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['mailtoresponse'] = "$smtpResponse";

			//the email
			fputs($smtpConnect, "DATA" . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['data1response'] = "$smtpResponse";

			//construct headers
			$headers = "MIME-Version: 1.0" . $newLine;
			//$headers .= "Content-type: text/html; charset=iso-8859-1" . $newLine;
			$headers .= "To: $nameto <$to>" . $newLine;
			$headers .= "From: $namefrom <$from>" . $newLine;

			//observe the . after the newline, it signals the end of message
			fputs($smtpConnect, "To: $to\r\nFrom: $from\r\nSubject: $subject\r\n$headers\r\n\r\n$message\r\n.\r\n");
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['data2response'] = "$smtpResponse";

			// say goodbye
			fputs($smtpConnect,"QUIT" . $newLine);
			$smtpResponse = fgets($smtpConnect, 4096);
			$logArray['quitresponse'] = "$smtpResponse";
			$logArray['quitcode'] = substr($smtpResponse,0,3);
			fclose($smtpConnect);
			//a return value of 221 in $retVal["quitcode"] is a success 
			return($logArray);
		}

		public static function mailAlert()
		{
			$date_now = date('d-F-Y');
			$newLine = "\r\n"; 
			$result =dailyincomeing::resultSeibanshort();	
			$from = $_SESSION["EMAIL"];
			$namefrom = $_SESSION['USER_ID'];
			$to = MAIL_GROUP; 
			$nameto = "All";
			$subject = MAIL_SUBJECT;

			$message = "Seiban Shortage to ".$date_now.$newLine;
			$message .="+-----------------------------------------------------------------------+".$newLine;
			oci_execute($result);
			while($row = oci_fetch_array($result, OCI_ASSOC+OCI_RETURN_NULLS)){
	             	 $message .=  $row['ITEMCODE']." | ";
	             	 $message .=  $row['CUSTPARTS']." | ";
	             	 $message .=  $row['SB_CODE']." | ";
	             	 $message .=  $row['WORK_ORDER']." | ";
	             	 $message .=  $row['SB_QTY']." | ";
	             	 $message .=  $row['SR_DETAIL']." | ";
	             	 $message .=  $row['SR_QTY']." | ";
	             	 $message .=  $row['SB_STATUS']." | ";
	             	 $message .=  $row['SB_DATE'].$newLine;
	         	}
	        $message .="+-----------------------------------------------------------------------+".$newLine;
	        $message .="Best Regards,".$newLine;
	        $message .="Program SCM (IT TEAM)";
	        
			oci_free_statement($result);

			mail::authMail($from, $namefrom, $to, $nameto, $subject, $message);

			echo "{\"response\":\"success\"}"; 
		}

		public static function checkSupplier()
		{
			$date_now = date('d-F-Y');
			$newLine = "\r\n"; 
			$result =dailyincomeing::dataIncomingDetailS0038();	
			$from = MAIL_USER;
			$namefrom = 'System SCM';
			$to = 'kasin.kul@siix.co.th'; 
			$nameto = "Kasin";
			$subject = 'Item KOA DENKO SINGAPORE PTE LTD. incomming';

			$message = "Item KOA DENKO SINGAPORE PTE LTD. incomming. Date :".$date_now;
			$message .="+-----------------------------------------------------------------------+".$newLine;
			oci_execute($result);
			while($row = oci_fetch_array($result, OCI_ASSOC+OCI_RETURN_NULLS)){
	             	 $message .=  $row['SUP_CD']." | ";
	             	 $message .=  $row['I_DL_DESC']." | ";
	             	 $message .=  $row['OWNERCD']." | ";
	             	 $message .=  $row['HINBAN']." | ";
	             	 $message .=  $row['HINMEIJ']." | ";
	             	 $message .=  $row['ACP_SURYO']." | ";
	             	 $message .=  $row['DO_NO']." | ";
	             	 $message .=  $row['LOT_NO'].$newLine;
	         	}
	        $message .="+-----------------------------------------------------------------------+".$newLine;
	        $message .="Best Regards,".$newLine;
	        $message .="Application SCM (IT TEAM)";
	        
			oci_free_statement($result);

			mail::authMail($from, $namefrom, $to, $nameto, $subject, $message);

			echo "{\"response\":\"success\"}"; 
		}

		public static function checkSupplierSak()
		{
			$date_now = date('d-F-Y');
			$newLine = "\r\n"; 
			$result =dailyincomeing::dataIncomingDetailS0038();	
			$from = MAIL_USER;
			$namefrom = 'System SCM';
			$to = 'sitthisak@siix.co.th'; 
			$nameto = "Sitthisak";
			$subject = 'Item KOA DENKO SINGAPORE PTE LTD. incomming';

			$message = "Item KOA DENKO SINGAPORE PTE LTD. incomming. Date :".$date_now;
			$message .="+-----------------------------------------------------------------------+".$newLine;
			oci_execute($result);
			while($row = oci_fetch_array($result, OCI_ASSOC+OCI_RETURN_NULLS)){
	             	 $message .=  $row['SUP_CD']." | ";
	             	 $message .=  $row['I_DL_DESC']." | ";
	             	 $message .=  $row['OWNERCD']." | ";
	             	 $message .=  $row['HINBAN']." | ";
	             	 $message .=  $row['HINMEIJ']." | ";
	             	 $message .=  $row['ACP_SURYO']." | ";
	             	 $message .=  $row['DO_NO']." | ";
	             	 $message .=  $row['LOT_NO'].$newLine;
	         	}
	        $message .="+-----------------------------------------------------------------------+".$newLine;
	        $message .="Best Regards,".$newLine;
	        $message .="Application SCM (IT TEAM)";
	        
			oci_free_statement($result);

			mail::authMail($from, $namefrom, $to, $nameto, $subject, $message);

			echo "{\"response\":\"success\"}"; 
		}

		public static function new_mail($from, $namefrom, $to, $nameto, $subject, $message)
		{

			mail::authMail($from, $namefrom, $to, $nameto, $subject, $message);

			echo "{\"response\":\"success\"}"; 
		}
}
?>