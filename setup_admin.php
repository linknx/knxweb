<?php

require_once("include/common.php");
require_once("include/linknx.php");

header('Content-Type: text/html; charset=UTF-8');

tpl()->addJs('js/setup_admin.js');

tpl()->assignByRef("lang",$lang);

tpl()->assign('progstatus', (isset($_GET['progstatus']))); 
tpl()->assign('configknxweb', (isset($_GET['configknxweb'])));
tpl()->assign('logobjects', (isset($_GET['logobjects'])));
tpl()->assign('loglinknx', (isset($_GET['loglinknx'])));
tpl()->assign('networksetup', false);

$Fnetwork ='/etc/network/interfaces';
$log_Linknx =''; // /tmp/linknx.log ou autre exemple : /var/lib/linknx/linknx.log
$pathLog = ''; // exemple : "/var/lib/linknx/log"
$logType = ''; // '' / 'file' / 'mysql'

if (isset($_GET['logobjects']) || isset($_GET['loglinknx']))
{
  $linknx=new Linknx($_config['linknx_host'], $_config['linknx_port']);
  $info=$linknx->getLogging();
  if ($info!==false) {
  $log_Linknx = $info['logging']['output'];
  }
  $info=$linknx->getServices();
  if ($info!==false) {
  $logType = $info['persistence']['type'];
  if ($logType == 'file') $pathLog = $info['persistence']['logpath'];
  }

  if ($logType == 'file') {
  $objects=$linknx->getObjects();
    //$logfile = glob( dirname(dirname(__FILE__)) .$pathLog.'*.log');
  $logfile = glob($pathLog.'*.log');
  $order = array( $pathLog , '.log' );
  foreach ($logfile as $value) {
    $id = str_replace($order, '', $value); 
    $type = $objects[$id]["type"];
    $listobjectlog[$id] = $value . '_type_' . $type;
  } 
  }
  if ($logType == 'mysql') {
  // requete sur la base mysql $info['persistence'][] host/user/pass/db/table/logtable
  // $listobjectlog[$object] = $object
  $serveur       = $info['persistence']['host'];
  $login          = $info['persistence']['user'];
  $password       = $info['persistence']['pass'];
  $base  = $info['persistence']['db']; //"linknx"; 
  $table = $info['persistence']['logtable']; //"log";
  // structure de la table logtable
  $ts = "ts";
  $object = "object";
  $value = "value";
  // On ouvre la connexion à Mysql
  $db = mysql_connect($serveur, $login, $password) or die('<h1>Connexion au serveur impossible !</h1>'); 
  mysql_select_db($base,$db) or die('<h1>Connexion impossible à la base</h1>');
  $sql = "SELECT DISTINCT ".$object." AS obj FROM ".$table;
  $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
  $nbenreg = mysql_num_rows($req);
  $nbenreg--;
  while ($nbenreg > 0 ){
    // récupérer prochaine occurence de la table
    $data = mysql_fetch_array($req);
    $type = $objects[$data["obj"]]["type"];
    $listobjectlog[$data["obj"]] =  $data["obj"] . '_type_' . $type;
    $nbenreg--;
  }
  mysql_close();
  }
}
tpl()->assignByRef('logFile', $listobjectlog );
tpl()->assignByRef('logType',$logType);

if (isset($_GET['progstatus']))
{
  require("include/admin.php");
  tpl()->assign('networksetup', true);
} else {
  $network=array();
  $linknxLog="";
  $eibd_running="";
  $eibd_running_param="";
  $linknx_running="";
  $linknx_running_param="";
  $widgetscss = "widgets/widgets.css";
  $widgetscssexist = false;
  $widgetscss = "";
}
if (isset($_GET['configknxweb']))
{
  $widgetscss = "widgets/widgets.css";
  $widgetscssexist = false;
  $widgetscssiswritable = false;
  if ( file_exists($widgetscss) ) {
    $widgetscssexist = true;
    $widgetscssiswritable = is_writable( $widgetscss );
    $contentwidgetscss = '';
    //if ( !$error && filesize($widgetscss) > 0 ) {
    if (filesize($widgetscss) > 0 ) {
      $f = fopen($widgetscss, 'r');
      $contentwidgetscss = fread($f, filesize($widgetscss));
    }
  } else {
    $widgetscss = "";
  }
}

if (file_exists('/etc/init.d/eibd')) {
  $eibd_initd = true;
} else $eibd_initd = false;
tpl()->assignByRef('eibd_initd', $eibd_initd);
if (file_exists('/etc/init.d/linknx')) {
  $linknx_initd = true;
} else $linknx_initd = false;
tpl()->assignByRef('linknx_initd', $linknx_initd);


tpl()->assignByRef('_SERVER', $_SERVER);

tpl()->assignByRef('eibd_running', $eibd_running);
tpl()->assignByRef('eibd_running_param', $eibd_running_param);
tpl()->assignByRef('linknx_running', $linknx_running);
tpl()->assignByRef('linknx_running_param', $linknx_running_param);
tpl()->assignByRef('network', $network);
tpl()->assignByRef('linknxLog', $linknxLog);

tpl()->assignByRef('widgetscss', $widgetscss);
tpl()->assignByRef('widgetscssiswritable', $widgetscssiswritable);
tpl()->assignByRef('contentwidgetscss', $contentwidgetscss);

/* gestions des pgm supplémentaire utilisateurs */
if (file_exists("include/pgmrunning.php") && isset($_GET['progstatus'])) {
  $pgmrunning = array();
  $pgmrunning_param = array();
  require_once("include/pgmrunning.php");
} else {
  $pgmrunning = array();
  $pgmrunning_param = array();
}
tpl()->assignByRef("pgmrunning",$pgmrunning);
tpl()->assignByRef("pgmrunning_param",$pgmrunning_param); 

$uitheme = getUiThemes();
tpl()->assignByRef('uitheme', $uitheme);

tpl()->display('setup_admin.tpl');


?>
