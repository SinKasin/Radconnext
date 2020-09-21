<?php
/**
* CSV Excel class
*/
class csv
{

	/**
	*Convet csv to array By PHP
	*/
	public static function csv_to_array($filename='', $delimiter=',')
	{
	    if(!file_exists($filename) || !is_readable($filename))
	        return FALSE;

	    $header = NULL;
	    $data = array();
	    if (($handle = fopen($filename, 'r')) !== FALSE)
	    {
	        while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE)
	        {
	            if(!$header)
	                $header = $row;
	            else
	                $data[] = array_combine($header, $row);
	        }
	        fclose($handle);
	    }
	    return $data;
	}
}


class key
{

	public static function KeySignature($data) {
				$b64_I = base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
				$b64_II = base64_decode(str_pad(strtr($b64_I, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
				echo $b64_II;
		}

}

?>
