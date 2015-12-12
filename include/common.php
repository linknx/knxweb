<?php

	if (!file_exists('include/config.xml') || file_get_contents( 'include/config.xml' ) == '')
	{
		header('Location: check_install.php');
		die;
	}

  $_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
  unset($_config['comment']); // enleve les commentaires


  $version_knxweb2 = file_get_contents(dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'version', FILE_USE_INCLUDE_PATH);
  if ($_config["version"] != $version_knxweb2) {
		header('Location: check_install.php');
		die;
  }
  $MAJ_knxweb2 = false;

	require_once('include/tpl.php');
	require_once('lang/lang.php');

  $_widgets=array();
	require_once('include/objectstypes.php');
	
	// Convert to a Javascript array
	$json_objectTypes = json_encode($_objectTypes);

	$_objectFlags = array(
		'c' => 'Communication',
		'r' => 'Read',
		'w' => 'Write',
		't' => 'Transmit',
		'u' => 'Update',
		//'s' => 'Stateless'
		'f' => 'Force',
		//'i' => 'Init'
	);

	function parseSetting($xml) {
		$setting=array();
		foreach($xml->attributes() as	$key => $value)  $setting[(string)$key]=(string)$value;
		
		if ($setting['type']=='list') {
			$setting['options']=array();
			foreach($xml as $value) $setting['options'][(string)$value->attributes()->key]=(string)$value->attributes()->value;
		}
		return $setting;
	}
	
	function getWidget($type) {
		$path='widgets/' . $type;
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
	
	function getWidgets()
	{
		$plugins = glob('widgets/*', GLOB_ONLYDIR);
		$ret=array();
		foreach ($plugins as $path)
		{
			$w=getWidget(basename($path));
			if ($w!=false) $ret[basename($path)]=$w;
		}
		return $ret;
	}
  $_widgets=getWidgets();

	function getWidgetsByCategory()
	{
		//$widgets=getWidgets();
    global $_widgets;
		
		$ret=array();
		foreach($_widgets as $id => $w) {
			$cat=$w['category'];
			unset($w['category']);
			if (!isset($ret[$cat])) $ret[$cat]=array();
			$ret[$cat][]=$w;
		}
		return $ret;
	}
	
	function addWidgetsJsCssToTpl($isEdit = false, $isMobile = false)
	{
		//$widgets = getWidgets();
    global $_widgets;
		foreach($_widgets as $name => $info)
		{
			if (file_exists($info['path'] . '/widget.css')) tpl()->addCss($info['path'] . '/widget.css');
			tpl()->addJs($info['path'] . '/widget.js');
		}
	}

  function getUiThemes()
  {
    $uitheme = glob('lib/jquery/css/*', GLOB_ONLYDIR);
    $ret=array();
    foreach ($uitheme as $path)
    {
      if (file_exists( $path . '/jquery-ui.css')) $ret[basename($path)]=basename($path);
    }
    return $ret;
  }

?>