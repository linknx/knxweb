<?php

	if (!file_exists('include/config.xml') || file_get_contents( 'include/config.xml' ) == '')
	{
		header('Location: check_install.php');
		die;
	}

  $_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
  unset($_config['comment']); // enleve les commentaires


  $version_knxweb2 = exec('cat ' . dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'version');
  if ($_config["version"] != $version_knxweb2) {
		header('Location: check_install.php');
		die;
  }
  $MAJ_knxweb2 = false;

	require_once('include/tpl.php');
	require_once('lang/lang.php');

  // Convert to a Javascript array
//	$json_config = json_encode($_config)
//	tpl()->assign_by_ref("json_config",$json_config);
	//echo '<script type="text/javascript" >var tab_config = '.$json_config.';</script>';

	$_objectTypes = array(
	    '1.001' => '1.001: switching (on/off) (EIS1)',
	    '3.007' => '3.007: dimming (EIS2)',
	    '3.008' => '3.008: blinds',
	    '5.xxx' => '5.xxx: 8bit unsigned integer (EIS6)',
	    '5.001' => '5.001: scaling (from 0 to 100%)',
	    '5.003' => '5.003: angle (from 0 to 360deg)',
	    '6.xxx' => '6.xxx: 8bit signed integer (EIS14)',
	    '7.xxx' => '7.xxx: 16bit unsigned integer (EIS10)',
	    '8.xxx' => '8.xxx: 16bit signed integer',
	    '9.xxx' => '9.xxx: 16 bit floating point number (EIS5)',
	    '10.001' => '10.001: time (EIS3)',
	    '11.001' => '11.001: date (EIS4)',
	    '12.xxx' => '12.xxx: 32bit unsigned integer (EIS11)',
	    '13.xxx' => '13.xxx: 32bit signed integer',
	    '14.xxx' => '14.xxx: 32 bit IEEE 754 floating point number',
	    '16.000' => '16.000: string (EIS15) to ASCII codes 0 to 127',
	    '16.001' => '16.001: string (EIS15) with range 0 to 255 ',
	    '20.102' => '20.102: heating mode',
	    '28.001' => '28.001: variable length string objects',
	    '29.xxx' => '29.xxx: signed 64bit value'
	);
	
	// Convert to a Javascript array
	$json_objectTypes = json_encode($_objectTypes);
	//echo '<script type="text/javascript" >var tab_objectTypes = '.$json_objectTypes.';</script>';

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

	function getWidgetsByCategory()
	{
		$widgets=getWidgets();
		
		$ret=array();
		foreach($widgets as $id => $w) {
			$cat=$w['category'];
			unset($w['category']);
			if (!isset($ret[$cat])) $ret[$cat]=array();
			$ret[$cat][]=$w;
		}
		return $ret;
	}
	
	function addWidgetsJsCssToTpl($isEdit = false, $isMobile = false)
	{
		$widgets = getWidgets();
		foreach($widgets as $name => $info)
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