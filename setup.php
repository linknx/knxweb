<?

require_once("include/common.php");

if (isset($_GET['ajax']))
{
	header('Content-Type: text/html; charset=UTF-8');

}
tpl()->assignByRef('json_config', $json_config); // utiliser les données $_config en javascript

tpl()->addCss("lib/jquery/css/cupertino/jquery-ui-1.8.10.custom.css");
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui-1.8.10.custom.min.js");
tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");

tpl()->addJs("lib/jquery.tablesorter.js");
tpl()->addJs("lib/jquery-validate/jquery.validate.min.js");
tpl()->addJs("lib/jquery-validate/localization/messages_fr.js");
tpl()->addJs("lib/jquery.jsPlumb-1.2.5-all-min.js");
//tpl()->addJs("lib/jsplumb/jquery.jsPlumb-1.3.3-all.js");

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