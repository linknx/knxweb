<?php

require_once("include/common.php");

if (isset($_GET['ajax']))
{
	ini_set("display_errors", 0);
	error_reporting(0);
	
	header('Content-Type: text/xml; charset=UTF-8');

	if (isset($_GET['uploadImage'])) {
	
		if (!preg_match("/\.jpeg$|\.jpg$|\.gif$|\.png$/i", $_FILES["file"]["name"]))
    {
			echo "<response status='error'>Only .jpg .jpeg .gif and .png files are supported</response>\n";
			die;
    }

    if (file_exists($_config["imageDir"] . $_GET['path'] . $_FILES["file"]["name"]))
    {
			echo "<response status='error'>A file with the same name already exists</response>\n";
			die;
    }

		if (!move_uploaded_file($_FILES["file"]["tmp_name"], $_config["imageDir"] . $_GET['path'] . $_FILES["file"]["name"] )) {
			echo "<response status='error'>Cannot move file to " . $_config["imageDir"] . "</response>\n";
			die;
		}
		echo "<response status='success' />\n";
	}

	if (isset($_GET['deleteImage'])) {
		if (!unlink($_config["imageDir"] . $_GET['filename']))
			echo "<response status='error' />\n";
		else
			echo "<response status='success' />\n";
	}

	if (isset($_GET['deleteImageFolder'])) {
		if (strpos('..', $_GET['folder'])!=false) die; // Check for malicious call
		if (!rmdir($_config["imageDir"] . $_GET['folder']))
			echo "<response status='error' />\n";
		else
			echo "<response status='success' />\n";
	}

	if (isset($_GET['createImageFolder'])) {
		if (strpos('..', $_GET['folder'])!=false) die; // Check for malicious call
		if (!mkdir($_config["imageDir"] . $_GET['folder']))
			echo "<response status='error' />\n";
		else
			echo "<response status='success' />\n";
	}
	die;
}

/* get version of knxwbe2 in cvs sourceforge */

  $opts = array(
    'http'=>array(
      'method'=>"GET",
      'header'=>"Content-Type: text/html; charset=utf-8"
    )
  );
  
  $context = stream_context_create($opts);
  $version_knxweb2_cvs = file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/knxweb2/version', false, $context);
  
  $tab_version = explode(".", $version_knxweb2);
  $version = $tab_version[0] * 100 + $tab_version[1] * 10 + $tab_version[2];   
  $tab_version_cvs = explode(".", $version_knxweb2_cvs);
  $version_cvs = $tab_version_cvs[0] * 100 + $tab_version_cvs[1] * 10 + $tab_version_cvs[2];
  $MAJ_knxweb2 = ( $version_cvs > $version ); 

/* /version on cvs sourceforge */

tpl()->assignByRef('json_config', $json_config); // utiliser les données $_config en javascript
tpl()->assignByRef('json_objectTypes', $json_objectTypes);

//tpl()->addCss("lib/jquery/css/cupertino/jquery-ui-1.8.23.custom.css");
if (!isset($_config["uitheme"]) || $_config["uitheme"] == "") $_config["uitheme"] = "cupertino";
tpl()->addCss("lib/jquery/css/" . $_config["uitheme"] . "/jquery-ui.css");
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui.min.js");
tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");
tpl()->addJs('js/widget.js');
tpl()->addJs('lib/jquery.ui.touch-punch.min.js');
tpl()->addJs('js/action-editor.js');

tpl()->addJs("lib/tablesorter/jquery.tablesorter.js");
tpl()->addJs("lib/tablesorter/pager/jquery.tablesorter.pager.js");

tpl()->addJs("lib/jquery-validate/jquery.validate.min.js");
tpl()->addJs("lib/jquery-validate/localization/messages_fr.js");
tpl()->addJs("lib/jsplumb/jquery.jsPlumb-1.3.3-all.js");
tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');
//tpl()->addJs('lib/jquery.knob-1.1.0.js');

tpl()->addJs('lib/farbtastic/farbtastic.js');
tpl()->addCss('lib/farbtastic/farbtastic.css');

tpl()->addJs("lib/jquery.upload-1.0.2.min.js");

$widgets=getWidgets();
tpl()->assignByRef("widgets",$widgets);
$widgetsCategorized=getWidgetsByCategory();
tpl()->assignByRef("widgetsCategorized",$widgetsCategorized);

addWidgetsJsCssToTpl(true);

$widgetscssexist = "false";
if (file_exists('widgets/widgets.css')) { 
  tpl()->addCss('widgets/widgets.css');
  $widgetscssexist = "true";
}
tpl()->assignByRef("widgetscssexist",$widgetscssexist);
tpl()->assignByRef("MAJ_knxweb2",$MAJ_knxweb2);

tpl()->addCss('css/setup.css');

tpl()->addJs('js/setup.js');

tpl()->display('setup.tpl');

?>