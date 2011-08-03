<?

require_once("include/common.php");

if(isset($_GET["mobile"]) || $_config['startMobileView'] ) {

tpl()->addCss("lib/jquery-mobile/jquery.mobile-1.0b1.min.css");
tpl()->addCss('css/style_mobile.css');

tpl()->addJs("lib/jquery/js/jquery-1.6.2.min.js");

tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");

$widgets=getWidgets();
tpl()->assign_by_ref('widgets',$widgets);
tpl()->assign_by_ref('json_config', $json_config);

tpl()->addJs('js/widget.js');

addWidgetsJsCssToTpl(false,true);

tpl()->addJs('js/design_mobile.js');

tpl()->addJs("lib/jquery-mobile/jquery.mobile-1.0b1.min.js");

tpl()->display('design_mobile.tpl');


} else {

tpl()->addCss("lib/jquery/css/cupertino/jquery-ui-1.8.10.custom.css");
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui-1.8.10.custom.min.js");

tpl()->addCss('css/style.css');
tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");

tpl()->addJs("lib/jquery.tablesorter.js");
tpl()->addJs("lib/jquery-validate/jquery.validate.min.js");
tpl()->addJs("lib/jquery-validate/localization/messages_fr.js");
tpl()->addJs("lib/jquery.jsPlumb-1.2.5-all-min.js");

$widgets=getWidgets();
tpl()->assign_by_ref('widgets',$widgets);
tpl()->assign_by_ref('json_config', $json_config);

addWidgetsJsCssToTpl(false);

tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');

tpl()->addJs('js/design.js');
tpl()->addJs('js/widget.js');

tpl()->display('design_header.tpl');

foreach($widgets as $name => $info) tpl()->display('./widgets/' . $name . '/widget.html');

tpl()->display('design_view.tpl');
tpl()->display('design_footer.tpl');

}

?>