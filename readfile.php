<?php
error_reporting(0);
/*
paramètres :
soit :
  objectlog : id de l'object a récupérer la log éventuellement suivi du type "IDOBJECT_type_DATATYPE" ou "IDOBJECT"
soit :
  LogLinknx="true" => récupératio de la log de linknx si de type "file" ... 

et
  output : "html" / "json" / ""
  nbenreg : si non renseigné si lecture fichier "20" si mysql "1000"

*/

require_once("include/linknx.php");

$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);

$pathlogfile = ''; // exemple : "/var/lib/linknx/log"
$typelog = ''; // '' / 'file' / 'mysql'

if (!isset($_GET['output']) ) $_GET['output'] = '';

$objectlog = '';
$filelog = '';

if (isset($_GET['objectlog'])) {
  // $_GET['objectlog'] = object . '_type_' . type exemple : /var/lib/linknx/log/lampe_cuisine.log_type_1.001
  $objectlog = preg_split('/_type_/', $_GET['objectlog']);
  $objectlog = $objectlog[0];
}

$linknx=new Linknx($_config['linknx_host'], $_config['linknx_port']);

if (isset($_GET['LogLinknx'])) { // log linknx
  $info=$linknx->getLogging();
  if ($info!==false) {
    $filelog = $info['logging']['output'];
    $pathlogfile = '';
    $typelog = 'file';
  } else {
    header("Content-type: text/plain; charset=utf-8");
    print("");
    exit(0);
  }
} else { // log of an object in linknx
  if ($objectlog == '') {
    header("Content-type: text/plain; charset=utf-8");
    print("No object to restitute");
    exit(0);
  } 

  $info=$linknx->getServices();
  if ($info!==false) {
    $typelog = $info['persistence']['type'];
    if ($typelog == 'file') {
      $pathlogfile = $info['persistence']['logpath'];
      // reconstitution du path complet + extension 
      $filelog = $pathlogfile . $objectlog . ".log";
    }
  } else {
    header("Content-type: text/plain; charset=utf-8");
    print("Error of linknx configuration");
    exit(0);
  }
}

if ($typelog == 'mysql') {
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
}

setlocale(LC_ALL , "fr_FR" );
date_default_timezone_set("Europe/Paris");

if (isset($_GET['nbenreg']))
  $log_nbenreg = $_GET['nbenreg'];
else {
  if ($typelog == "file") {
    $log_nbenreg = 20;
  } else {
    $log_nbenreg = 1000;
  } 
}

$result = "";
$result_tab = array();

if ($typelog == "mysql") {
  
  // On ouvre la connexion à Mysql
  $db = mysql_connect($serveur, $login, $password) or die('<h1>Connexion au serveur impossible !</h1>'); 
  mysql_select_db($base,$db) or die('<h1>Connexion impossible à la base</h1>');
  mysql_query("SET NAMES 'utf8'");
   
  if ($_GET['output'] == "json") {
    $sql = "SELECT DATE_FORMAT(".$ts.", '%Y-%m-%d %H:%i:%s') AS ts , ".$value." AS value FROM ".$table." WHERE ".$object." = '".$objectlog."' LIMIT 0 , ".$log_nbenreg;
  } else {
    $sql = "SELECT DATE_FORMAT(".$ts.", '%Y-%m-%d %H:%i:%s') AS ts , ".$value." AS value FROM ".$table." WHERE ".$object." = '".$objectlog."' ORDER BY ".$ts." DESC LIMIT 0 , ".$log_nbenreg;
  }
  $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

  $nbenreg = mysql_num_rows($req);
  $nbenreg--;
  
  while ($nbenreg > 0 ){
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
    else if ($float_value == "up") $float_value = 1;
    else if ($float_value == "stop") $float_value = 0;
    else if ($float_value == "down") $float_value = -1;
    $float_value = floatval(str_replace(",", ".", $float_value));

    // Format de sortie "html"
    /* 2011-9-18 19:21:32 > 20.7<br />2011-9-18 19:23:32 > 20.9<br />2011-9-18 19:37:32 > 21<br />2011-9-18 19:39:32 > 20.9<br />2011-9-18 19:41:32 > 21<br />2011-9-18 19:47:32 > 20.9<br />2011-9-18 19:57:33 ... */
    //$result = $data["ts"] . " > ".$data["value"]."<br />" . $result;
    $result = $data["ts"] . " > ".$float_value."<br />" . $result;
    
    // Format de sortie "json"
    // convertir les dates en timestamps pour le format json (pour highcharts notament) 
    $ts = strtotime($data["ts"]) * 1000;
    //array_push ( $result_tab , array($data["ts"], $data["value"] ) ); 
    array_push ( $result_tab , array($ts, $float_value ) );

    $nbenreg--;
  }
  
  mysql_close();

} else if ($typelog == "file") {
  
  $result=str_replace("\n","<br />",`tail -n $log_nbenreg $filelog`);

  $result2 = substr($result, 0, -6); // enlève le dernier "<br />" 
  
  // convertit en tableau surement moyen de faire plus propre qu'un "eval" ...
  eval( "\$result_tab = array(array(\"" . str_replace(" > ","\",\"",str_replace("<br />","\"), array(\"",$result2)) . "\"));" );

  // pour le format json on converti les données 
  foreach ($result_tab as $k => $v) {
    // convertir les dates en timestamps
    $result_tab[$k][0] = strtotime($result_tab[$k][0]) * 1000;

    // Conversion de la valeur ("on/off ...") en "numérique" puis en float
    $float_value = $result_tab[$k][1];
    if ($float_value == "on") $float_value = 1;
    else if ($float_value == "off") $float_value = 0;
    else if ($float_value == "up") $float_value = 1;
    else if ($float_value == "stop") $float_value = 0;
    else if ($float_value == "down") $float_value = -1;
    $result_tab[$k][1] = floatval(str_replace(",", ".", $float_value));
  }

}

switch ($_GET['output']) 
{
  case 'json':
    header('Content-Type: application/json');
    print(json_encode($result_tab));
    break;
  case 'html':
    header("Content-type: text/plain; charset=utf-8");
    print($result);
    break;
  default:
    header("Content-type: text/html; charset=utf-8");
    print($result);
}

?>