<?php

require_once("include/common.php");

header('Content-Type: text/html; charset=UTF-8');

tpl()->addJs('js/setup_repository.js');

/*
exec('wget -O /tmp/widgetslist_cvs http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/widgets_knxweb2/widgetslist');
$result_tab = explode("\n",file_get_contents("/tmp/widgetslist_cvs" ));
exec('rm /tmp/widgetslist_cvs');
*/

$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Content-Type: text/html; charset=utf-8", 
    'timeout' => 60
  )
);
$context = stream_context_create($opts);

/* Repository Widgets */
$file = @file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/widgets_knxweb2/widgetslist', false, $context);

if ($file) {
  /*
  $order   = array("\r\n", "\n", "\r");
  $replace = '<br />';
  echo str_replace($order, $replace, $file);
  */
  
  $result_tab = explode("\n",$file);
  
  $first_ligne = false;
  foreach ($result_tab as $k => $v) {
    $tab = explode("|",$v);
    if (!isset($tab[3])) $tab[3] = '';
    if ($first_ligne) $tab_widgetsdllist[] = $tab;
    $first_ligne = true; 
  }
}
tpl()->assignByRef('tab_widgetsdllist', $tab_widgetsdllist);

//$widgets=getWidgets();
tpl()->assignByRef("widgets", $_widgets);

/* Repository Subpages */
$file = @file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/subpages_knxweb2/subpageslist', false, $context);
if ($file) {
  $result_tab = explode("\n",$file);
  
  $first_ligne = false;
  foreach ($result_tab as $k => $v) {
    if ($first_ligne) $tab_subpageslist[] = explode("|",$v);
    $first_ligne = true; 
  }
}
tpl()->assignByRef('tab_subpagesdllist', $tab_subpageslist);

tpl()->display('setup_repository.tpl');


?>
