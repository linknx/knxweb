<?php

require_once("include/common.php");

header('Content-Type: text/html; charset=UTF-8');

tpl()->addJs('js/setup_admin.js');

$_tpl->assignByRef("lang",$lang);

// TODO amélioré ces données qui doivent être récupéré dans le paramétrage  


//$Fconfeibd = 'ClinuxEib/eibd.conf';//$cheminD_ClinuxEib.'admin/
//$Fxmllinknx = 'ClinuxEib/linknx.xml';// admin/config/ClinuxEib/linknx.xml
$Fnetwork ='/etc/network/interfaces';


$log_Linknx ='/tmp/linknx.log'; // ou autre exemple : /var/lib/linknx/linknx.log


$pathLog = "/var/lib/linknx/log"; // TODO : gérer par rapport au type de log de linknx ...  
//$pathLog = "../linknx/log"; 
$logfile = glob($pathLog.'/*.log'); 

tpl()->assignByRef('logFile', $logfile );

require("include/admin.php");

tpl()->assignByRef('_SERVER', $_SERVER);

tpl()->assignByRef('eibd_running', $eibd_running);
tpl()->assignByRef('eibd_running_param', $eibd_running_param);
tpl()->assignByRef('linknx_running', $linknx_running);
tpl()->assignByRef('linknx_running_param', $linknx_running_param);
tpl()->assignByRef('network', $network);
//tpl()->assignByRef('eib', $eib);
//tpl()->assignByRef('serials', $serials);
//tpl()->assignByRef('linknxConfig', $linknxConfig);
tpl()->assignByRef('linknxLog', $linknxLog);


/* gestions des pgm supplémentaire utilisateurs */
require_once("include/pgmrunning.php");
tpl()->assignByRef("pgmrunning",$pgmrunning);
tpl()->assignByRef("pgmrunning_param",$pgmrunning_param);


tpl()->display('setup_admin.tpl');


?>
