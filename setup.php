<?

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

tpl()->assignByRef('json_config', $json_config); // utiliser les données $_config en javascript

tpl()->addCss("lib/jquery/css/cupertino/jquery-ui-1.8.10.custom.css");
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui-1.8.10.custom.min.js");
tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");
tpl()->addJs('js/widget.js');
tpl()->addJs('js/action-editor.js');

tpl()->addJs("lib/jquery.tablesorter.js");
tpl()->addJs("lib/jquery-validate/jquery.validate.min.js");
tpl()->addJs("lib/jquery-validate/localization/messages_fr.js");
tpl()->addJs("lib/jquery.jsPlumb-1.2.5-all-min.js");
//tpl()->addJs("lib/jsplumb/jquery.jsPlumb-1.3.3-all.js");
tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');

tpl()->addJs('lib/farbtastic/farbtastic.js');
tpl()->addCss('lib/farbtastic/farbtastic.css');

tpl()->addJs("lib/jquery.upload-1.0.2.min.js");

$widgets=getWidgets();
tpl()->assign_by_ref("widgets",$widgets);
$widgetsCategorized=getWidgetsByCategory();
tpl()->assign_by_ref("widgetsCategorized",$widgetsCategorized);

addWidgetsJsCssToTpl(true);

tpl()->addCss('css/setup.css');

tpl()->addJs('js/setup.js');

/*
  TODO : ajouter un css pour mettre la class minversion_0_0_1_29 à display: none si la version de linknx est < à 0.0.1.29
.minversion_0_0_1_29 {
  display: none;
}
tpl()->addCss('css/linknx_0_0_1_29.css');
*/


tpl()->display('setup.tpl');

?>