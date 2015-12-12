<?php
//error_reporting(0);
require_once("include/common.php");
require_once("include/plugins.php");

tpl()->addJs("plugins/plugins.js");
//tpl()->addCss('plugins/plugins.css');

$plugins = glob('plugins/*', GLOB_ONLYDIR);
$plugins_list=array();
foreach ($plugins as $path)
{
	//$w=getPlugin(basename($path));
  $w=getPlugin($path);
	if ($w!=false) $plugins_list[basename($path)]=$w;
}
tpl()->assignByRef("plugins_list",$plugins_list);
tpl()->display('setup_plugins.tpl');

?>