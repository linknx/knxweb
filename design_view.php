<?php

require_once("include/common.php");

if (!isset($_config["uitheme"]) || $_config["uitheme"] == "") $_config["uitheme"] = "cupertino";
tpl()->addCss("lib/jquery/css/" . $_config["uitheme"] . "/jquery-ui.css");
tpl()->addCss('css/style.css');
tpl()->addJs("lib/jquery/js/jquery.min.js");
tpl()->addJs("lib/jquery/js/jquery-ui.min.js");
tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');

tpl()->addJs("js/eibcommunicator.js");
tpl()->addJs("js/uicontroller.js");
tpl()->addJs("js/common.js");
tpl()->addJs('js/widget.js');
tpl()->addJs('js/design_view.js');
tpl()->addJs('lib/jquery.ui.touch-punch.min.js');
tpl()->addJs("lib/jquery.maphilight.min.js");

//$widgets=getWidgets();
tpl()->assignByRef("widgets",$_widgets);
tpl()->assignByRef('json_config', $json_config);

addWidgetsJsCssToTpl(false);

//foreach($widgets as $name => $info) tpl()->display('./widgets/' . $name . '/widget.html');

if (file_exists('widgets/widgets.css')) tpl()->addCss('widgets/widgets.css');

tpl()->display('design_view.tpl');

?>