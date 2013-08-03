<?php
error_reporting(0);
header('Content-Type: text/event-stream; charset=utf-8');
header('Cache-Control: no-cache');

@apache_setenv('no-gzip', 1);
@ini_set('zlib.output_compression', 0);
@ini_set('implicit_flush', 1);


$linknx_host = "127.0.0.1";
$linknx_port = 1028;
/*
$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']); 
$linknx_host = $_config['linknx_host'];
$linknx_port = $_config['linknx_port'];
*/

/*
$time = date('r');
echo "data: <deb>Lancement de la notification de Linknx {$time} </deb>\n\n";
ob_flush();
flush();
*/
$max_result_lines = 1000;

/*
 * HTML5 Server-Sent Events
 * cf. http://www.w3schools.com/html/html5_serversentevents.asp
 */
$sock = fsockopen($linknx_host, $linknx_port, $errno, $errstr, 30);
if (!$sock) {
  echo "data: <response status='error'>Unable to connect to linknx</response>\n\n";
  ob_flush();
  flush();
  exit(1);
}

//On initialize le listener "all"
fwrite($sock, "<admin><notification><registerall notifynow='true'/></notification></admin>" . chr(4));
$result = '';
$cnt = 0;
while ($cnt < $max_result_lines && $sock && !feof($sock)) {
  $result .= fgets($sock, 128);
  $c = fgetc($sock);
  if ($c == "\4") break;
  $result .= $c;
  $cnt++;
}

/* cf commentaire http://php.net/manual/fr/function.flush.php peut-être nécessaire ??
  Internet Explorer and Safari have a 1k buffer before incremental rendering kicks in
*/
//echo str_repeat(" ", 1024), "\n";
echo "data: " . $result . "\n\n";

ob_flush();
flush();

//$i = 0;
//while($i < 5) {
while (true) {
  $result = '';
  $cnt = 0;
  while ($cnt < $max_result_lines && $sock && !feof($sock)) {
    $result .= fgets($sock, 128);
    $c = fgetc($sock);
    if ($c == "\4")  break;
    $result .= $c;
    $cnt++;
  }

  echo "data: " . $result . "\n\n";

  ob_flush();
  flush();
  //$i++;
}

fclose($sock);

?>