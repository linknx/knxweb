<?php
//error_reporting(0);
require_once("include/common.php");

if (isset($_GET['plugin']))
{
	//header('Content-Type: text/xml; charset=UTF-8');
	//echo "<response status='success' />\n";
	//die;
  //require_once("../include/common.php");
  
  $path = "plugins/".  $_GET['plugin'];
  if (file_exists($path . '/plugin.js')) tpl()->addJs($path."/plugin.js");
  if (file_exists($path . '/plugin.css')) tpl()->addCss($path."/plugin.css");
  
  tpl()->assignByRef("plugins_id",$_GET['plugin']);  
  if (file_exists($path . '/plugin.tpl')) tpl()->display('../../'.$path . '/plugin.tpl');
  else tpl()->display('plugins.tpl');
  
  
  exit;
}

tpl()->addJs("plugins/plugins.js");
//tpl()->addCss('plugins/plugins.css');


function getPlugin($type) {
	$path='plugins/' . $type;
	if (file_exists($path . '/manifest.xml'))
	{
		$xml = (array)simplexml_load_file($path . '/manifest.xml');
		
		$ret=array(
			"name"	=>	$type,
			"path"	=>	$path,
			"label"	=>	$xml['label'],
			"description"	=>	$xml['description'],
			"version" => $xml['version'],
			"category" => $xml['category'],
			"settings" => array()
		);

		if (isset($xml['settings'])) {
		$settings=(array)$xml['settings'];
		if ($settings) {
			if (is_array($settings['setting'])) {
				// Multiple settings
				foreach((array)$settings['setting'] as $v) {
					$setting=parseSetting($v);
					$ret['settings'][]=$setting;
				}
			} else
			{
				// single setting
				$setting=parseSetting($settings['setting']);
				$ret['settings'][]=$setting;
			}
		}
		}
		if (isset($xml['feedbacks'])) {
		$feedbacks=(array)$xml['feedbacks'];
		if ($feedbacks) {
				if (isset($feedbacks['feedback']) && is_array($feedbacks['feedback'])) {
				// Multiple feedbacks
				foreach((array)$feedbacks['feedback'] as $v) {
					$ret['feedbacks'][]=(string)$v->attributes()->id;
				}
			} else
			{
				// single feedback
				if (isset($feedbacks['feedback'])) $ret['feedbacks'][]=(string)$feedbacks['feedback']->attributes()->id;
			}
		}
		}

		return $ret;
	} else return false;
}

$plugins = glob('plugins/*', GLOB_ONLYDIR);
$plugins_list=array();
foreach ($plugins as $path)
{
	$w=getPlugin(basename($path));
	if ($w!=false) $plugins_list[basename($path)]=$w;
}
tpl()->assignByRef("plugins_list",$plugins_list);

if (isset($_GET['tab'])) tpl()->display('plugins.tpl');

?>