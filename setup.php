<?

require_once("include/common.php");

if (isset($_GET['ajax']))
{
	header('Content-Type: text/html; charset=UTF-8');
	
	
}

tpl()->addCss("lib/jquery/css/cupertino/jquery-ui-1.8.10.custom.css");
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui-1.8.10.custom.min.js");
tpl()->addJs("js/common.js");

tpl()->addJs("lib/jquery.tablesorter.js");
tpl()->addJs("lib/jquery-validate/jquery.validate.min.js");
tpl()->addJs("lib/jquery-validate/localization/messages_fr.js");
tpl()->addJs("lib/jquery.jsPlumb-1.2.5-all-min.js");

tpl()->addCss('css/setup.css');

tpl()->addJs('js/setup.js');
tpl()->display('setup.tpl');

?>