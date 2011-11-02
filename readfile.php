<?php
error_reporting(0);
//header('Content-Type: application/xml; charset=utf-8');
/*
 * TODO : gérer un paramétrage dans un fichier xml example cgraph2.xml avec type log "file" / "mysql"
 * si "mysql" il faut "user" "pwd" "db"=linknx "table"=log "ts"= nom zone timestamp "object"=nom de la zone id object "value"=valeur object  
 * toutes les données étant à envoyer et/ou utiliser par "readfile.php" qui mettra en forme
 * exemple requête (à tester ...) SELECT * FROM `log` WHERE `object` = 'toto' ORDER BY `ts` DESC LIMIT 0 , 1000
 *
 * highcharts prend bien le format json " data: [[5, 2], [6, 3], [8, 2]] "
 *
 **/
 
$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);

if (isset($_GET['typelog']))
  $_config['loglinknx'] = $_GET['typelog'];


if ($_config['loglinknx'] == "mysql") {
  //nom du serveur serveur:
  $serveur       = "localhost";
  // pseudo de connexion au serveur
  $login          = "root";
  // Mot de pass de connexon au serveur
  $password       = "";
  // Nom de la base de donnée
  $base  = "linknx"; 
  $table = "log";
  
  $ts = "ts";
  $object = "object";
  $value = "value";
  
  $nbval = 1000;
  if (isset($_GET['nbenreg']))
    $nbval = $_GET['nbenreg'];
  $Id= $_GET['pathlogfile'];
  //$Id="Temperature_in1"; 
  
  // On ouvre la connexion à Mysql
  $db = mysql_connect($serveur, $login, $password) or die('<h1>Connexion au serveur impossible !</h1>'); 
  mysql_select_db($base,$db) or die('<h1>Connexion impossible à la base</h1>');
   
  //$sql = "SELECT UNIX_TIMESTAMP(".$ts.") AS ts , ".$value." AS value FROM ".$table." WHERE ".$object." = '".$Id."' ORDER BY ".$ts." DESC LIMIT 0 , ".$nbval;
  $sql = "SELECT DATE_FORMAT(".$ts.", '%Y-%m-%d %H:%i:%s') AS ts , ".$value." AS value FROM ".$table." WHERE ".$object." = '".$Id."' ORDER BY ".$ts." DESC LIMIT 0 , ".$nbval;
  $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
  $val = array();
  $valts = array();
  
  if (mysql_fetch_array($req)=="") {
    $val[]="0";
  }
  $nbenreg = mysql_num_rows($req);
  $nbenreg--;
  $nbdata=0;
  header("Content-type: text/plain; charset=utf-8");
  //print("req : $sql");
  $result = "";
  while ($nbenreg > 0 ){
    /* TODO ... */
    // récupérer prochaine occurence de la table
    $data = mysql_fetch_array($req);

    /* 2011-9-18 19:21:32 > 20.7<br />2011-9-18 19:23:32 > 20.9<br />2011-9-18 19:37:32 > 21<br />2011-9-18 19:39:32 > 20.9<br />2011-9-18 19:41:32 > 21<br />2011-9-18 19:47:32 > 20.9<br />2011-9-18 19:57:33 ... */
    $val[$nbdata] = floatval(str_replace(",", ".", $data["value"]));
    $valts[$nbdata] = $data["ts"];
    $result = $data["ts"] . " > ".$data["value"]."<br />" . $result; 

    $nbenreg--;
    $nbdata++;
  }
      
  $data = mysql_fetch_array($req);
  
  mysql_close();

  print($result);
  
} else if ($_config['loglinknx'] == "file") {
  $log_Linknx = $_GET['pathlogfile'];
  if (isset($_GET['nbenreg']))
    $log_nbenreg = $_GET['nbenreg'];
  else
    $log_nbenreg = 20;
  
  $result=str_replace("\n","<br />",`tail -n $log_nbenreg $log_Linknx`);
  
  if (isset($_GET['action'])) {
    switch ($_GET['action']) 
    {
      case 'readfile':
        //print(str_replace("<br />","\n", $result));
        //header("Content-type: text/javascript");
        header("Content-type: text/plain; charset=utf-8");
        //print("<!DOCTYPE html>");
        print($result);
        break;
      case 'readfilehtml':
        header("Content-type: text/html; charset=utf-8");
        //print("<!DOCTYPE html>");
        print($result);
        break;
      default:
        print("*---- Unknown action ----*\n");
        print($result);
        break;
    }
  }
} else {
  header("Content-type: text/plain; charset=utf-8");
  print("aucun paramétrage de log n'est définit");
}

?>