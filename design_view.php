<?

require_once("include/common.php");

tpl()->addCss("lib/jquery/css/cupertino/jquery-ui-1.8.10.custom.css");
tpl()->addCss('css/style.css');
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui-1.8.10.custom.min.js");
tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');
tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");
tpl()->addJs('js/widget.js');
tpl()->addJs('js/design_view.js');

$widgets=getWidgets();
tpl()->assign_by_ref("widgets",$widgets);
tpl()->assignByRef('json_config', $json_config);

addWidgetsJsCssToTpl(false);

//foreach($widgets as $name => $info) tpl()->display('./widgets/' . $name . '/widget.html');

tpl()->display('design_view.tpl');

?>