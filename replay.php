<?php
header('cache-control: no-cache');
error_reporting(0);
/*
paramètres :
  objectlog : id de l'object a récupérer la log éventuellement suivi du type "IDOBJECT_type_DATATYPE" ou "IDOBJECT"

et
  duration : Nombre
  periodicity : périodicitée (Hour, Day, (Week), Month, year)
  TODO => gérer duration et periodicity sur le mode : datejour - ( duration * periodicity ) comme date de début de recherche


*/
require_once("include/linknx.php");

$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);

$pathlogfile = ''; // exemple : "/var/lib/linknx/log"

$objectlog = '';
$objectlogtype = '';
$filelog = '';

if (isset($_GET['objectlog'])) {
  // $_GET['objectlog'] = object . '_type_' . type exemple : /var/lib/linknx/log/lampe_cuisine.log_type_1.001
  $objectlog = preg_split('/_type_/', $_GET['objectlog']);
  if ($objectlog[1]) $objectlogtype = $objectlog[1];
  $objectlog = $objectlog[0];
}

$linknx=new Linknx($_config['linknx_host'], $_config['linknx_port']);


if ($objectlog == '') {
  header("Content-type: text/plain; charset=utf-8");
  print("No object to restitute");
  exit(0);
}

$info=$linknx->getServices();
if ($info==false) {
  header("Content-type: text/plain; charset=utf-8");
  print("Error of linknx configuration");
  exit(0);
}
if ($info['persistence']['type']!='mysql') {
  header("Content-type: text/plain; charset=utf-8");
  print("Error linknx not use mysql log");
  exit(0);
}

if (isset($_GET['duration'])) {
  $duration = $_GET['duration'];
} else {
  $duration = 7;
}
if (isset($_GET['periodicity'])) {
  $periodicity = $_GET['periodicity'];
} else {
  $periodicity = "day";
}

// $info['persistence'][] host/user/pass/db/table/logtable
//nom du serveur serveur:
$serveur       = $info['persistence']['host'];
// pseudo de connexion au serveur
$login          = $info['persistence']['user'];
// Mot de pass de connexon au serveur
$password       = $info['persistence']['pass'];
// Nom de la base de donnée
$base  = $info['persistence']['db']; //"linknx";
$table = $info['persistence']['logtable']; //"log";
// structure de la table logtable
$ts = "ts";
$object = "object";
$value = "value";

// TODO a gérer mieux car tout le monde n'a pas cette config ...
setlocale(LC_ALL , "fr_FR" );
date_default_timezone_set("Europe/Paris");

$result = "";

// On ouvre la connexion à Mysql
$db = mysql_connect($serveur, $login, $password) or die('<h1>Connexion au serveur impossible !</h1>');
mysql_select_db($base,$db) or die('<h1>Connexion impossible à la base</h1>');
mysql_query("SET NAMES 'utf8'");

//$sql2 = "SELECT DATE_FORMAT(".$ts.", '%Y-%m-%d %H:%i:%s') AS ts , ".$value." AS value FROM ".$table." WHERE ".$object." = '".$objectlog."' ";
$sql2 = "SELECT ".$ts." AS ts , ".$value." AS value FROM ".$table." WHERE ".$object." = '".$objectlog."' ";
$sql2 = $sql2."AND ".$ts." >= DATE_SUB(NOW(), INTERVAL ".$duration." ".strtoupper($periodicity).") ";
//$sql2 = $sql2." ORDER BY ".$ts." DESC ";
$sql2 = $sql2." ORDER BY ".$ts." ASC ";
$sql2 = $sql2."LIMIT 1";

$req = mysql_query($sql2) or die('Erreur SQL !<br>'.$sql2.'<br>'.mysql_error());

$nbenreg = mysql_num_rows($req);
$nbenreg--;

while ($nbenreg >= 0 ){
  /*
   $data["ts"] : est de la forme 2011-9-18 19:21:32
   $data["value"] : peut être valorisé par un float (teméprature, %, °, ... avec comme spéparateur de décimal une "," ), int (0 à 255), string "on/off/up/down/stop ..."
  */

  // récupérer prochaine occurence de la table
  $data = mysql_fetch_array($req);

  // Conversion des "on/off ..." en "numérique" puis en float
  $float_value = $data["value"];
  if ($float_value == "on") $float_value = 1;
  else if ($float_value == "off") $float_value = 0;
  /*else if ($float_value == "up") $float_value = 1;
  else if ($float_value == "stop") $float_value = 0;
  else if ($float_value == "down") $float_value = -1;*/
  $float_value = floatval(str_replace(",", ".", $float_value));

  // Format de sortie "html"
  /* 2011-9-18 19:21:32 > 20.7<br />2011-9-18 19:23:32 > 20.9<br />2011-9-18 19:37:32 > 21<br />2011-9-18 19:39:32 > 20.9<br />2011-9-18 19:41:32 > 21<br />2011-9-18 19:47:32 > 20.9<br />2011-9-18 19:57:33 ... */
  //$result = $data["ts"] . " > ".$data["value"]."<br />" . $result;
  $result = $data["ts"] . " > ".$float_value."<br />" . $result;


  $nbenreg--;
}

mysql_close();


header("Content-type: text/plain; charset=utf-8");

echo " l'object choisi est : ->".$objectlog;
echo "<br />Prochaine valeur dans correspondant il y a ".$duration." ".$periodicity;
echo "<br /> 'date' > 'valeur' = ".$result;

echo date('H',$data["ts"]).":".date('i',$data["ts"]).":".date('s',$data["ts"]);

echo "<br />Mise à jour rule :";

$string_xml="<rule id=\"replay_$objectlog\" description=\"Rule Replay sur 7 jours pour $objectlog\" init=\"false\">
  <condition type=\"timer\" trigger=\"true\">
    <at hour=\"" . date('H',$data["ts"]) . "\" min=\"" . date('i',$data["ts"]) . "\"
    day=\"" . date('d',strtotime($data["ts"].' + '.$duration.' '.$periodicity.'s')) . "\"
    month=\"" . date('m',strtotime($data["ts"].' + '.$duration.' '.$periodicity.'s')) . "\" ></at>
  </condition>
  <actionlist>
    <action type=\"script\">
      <![CDATA[set(\"$objectlog\", \"$float_value\");
      out = io.popen(\"php /var/www/knxweb2/replay.php?objectlog=$objectlog&duration=$duration&periodicity=$periodicity\");
      out:close();]]>
    </action>
  </actionlist>
</rule>";

echo '<pre>', htmlentities($string_xml), '</pre>';



if (isset($_REQUEST['address'])) {
  $address = $_REQUEST['address'];
}
if (isset($_REQUEST['port'])) {
  $port = $_REQUEST['port'];
}

function knxsend($fp, $cmd)
{
  $in = "$cmd\n\4";
  fwrite($fp, $in);

  $ret = '';
  $cnt = 0;
  while ($cnt < 1000 && $fp && !feof($fp)) {
    $ret .= fgets($fp, 128);
    $c = fgetc($fp);
    if ($c == "\4") {
      return $ret;
    }
    $ret .= $c;
    $cnt++;
  }
  return $ret;
}

$fp = fsockopen($_config['linknx_host'], $_config['linknx_port'], $errno, $errstr, 30);
if (!$fp) {
  echo "$errstr ($errno)<br />\n";
}
$result = "";
$cmd = '<write><config><rules>'.$string_xml.'</rules></config></write>';
// Envoi a linknx la modification de la rule
//$result = knxsend($fp, $cmd);
if ($result != "") echo "<textarea name='result' style='width:100%;' rows='30' wrap='off'>$result</textarea><br />";
fclose($fp);


?>