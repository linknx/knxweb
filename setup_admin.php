<?php

require_once("include/common.php");
require_once("include/linknx.php");

header('Content-Type: text/html; charset=UTF-8');

tpl()->addJs('js/setup_admin.js');

tpl()->assignByRef("lang",$lang);

$Fnetwork ='/etc/network/interfaces';
$log_Linknx =''; // /tmp/linknx.log ou autre exemple : /var/lib/linknx/linknx.log
$pathLog = ''; // exemple : "/var/lib/linknx/log"
$logType = ''; // '' / 'file' / 'mysql'

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
  $logfile = glob($pathLog.'*.log');
  $order = array( $pathLog , '.log' );
  foreach ($logfile as $value) {
    $id = str_replace($order, '', $value); 
    $type = $objects[$id]["type"];
    $listobjectlog[$id] = $value . '_type_' . $type;
  } 
}
if ($logType == 'mysql') {
  // TODO ...
  // requete sur la base mysql $info['persistence'][] host/user/pass/db/table/logtable
  // $listobjectlog[$object] = $object 
}
tpl()->assignByRef('logFile', $listobjectlog );
tpl()->assignByRef('logType',$logType);

require("include/admin.php");

tpl()->assignByRef('_SERVER', $_SERVER);

tpl()->assignByRef('eibd_running', $eibd_running);
tpl()->assignByRef('eibd_running_param', $eibd_running_param);
tpl()->assignByRef('linknx_running', $linknx_running);
tpl()->assignByRef('linknx_running_param', $linknx_running_param);
tpl()->assignByRef('network', $network);
tpl()->assignByRef('linknxLog', $linknxLog);


/* gestions des pgm supplémentaire utilisateurs */
require_once("include/pgmrunning.php");
tpl()->assignByRef("pgmrunning",$pgmrunning);
tpl()->assignByRef("pgmrunning_param",$pgmrunning_param);


tpl()->display('setup_admin.tpl');


?>
