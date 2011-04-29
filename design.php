<?

require_once("include/common.php");

$widgets=getWidgets();

addWidgetsJsCssToTpl();

tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');

tpl()->addJs('js/design.js');
tpl()->addJs('js/widget.js');

tpl()->display('design_header.tpl');

foreach($widgets as $name => $info) tpl()->display('./widgets/' . $name . '/widget.html');

tpl()->display('design_view.tpl');
tpl()->display('design_footer.tpl');

?>