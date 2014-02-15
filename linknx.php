<?php
header('cache-control: no-cache');

$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']); 

error_reporting(0);
$max_result_lines = 1000;
if ($_config['max_result_lines']) $max_result_lines = parseInt($_config['max_result_lines']);

header('Content-Type: application/xml; charset=utf-8');

$sock = fsockopen($_config['linknx_host'], $_config['linknx_port'], $errno, $errstr, 30);
if (!$sock)
		$result = "<response status='error'>Unable to connect to linknx</response>\n";
else {
	fwrite($sock, file_get_contents("php://input") . chr(4));
	$result = '';
	$cnt = 0;
	while ($cnt < $max_result_lines && $sock && !feof($sock)) {
		$result .= fgets($sock, 128);
		$c = fgetc($sock);
		if ($c == "\4")	break;
		$result .= $c;
		$cnt++;
	}
	fclose($sock);
}
print($result);
?>