<?

require_once("include/common.php");

$widgets=getWidgetsByCategory();
tpl()->assign_by_ref('widgets',$widgets);
tpl()->assign_by_ref('json_config', $json_config);

tpl()->addCss('css/style.css');

tpl()->addJs('lib/jquery.scrollTo-1.4.2-min.js');
tpl()->addJs('lib/jquery.serialScroll-1.2.2-min.js');

tpl()->addJs('js/design.js');
tpl()->addJs('js/designedit.js');
tpl()->addJs('js/widget.js');
tpl()->addJs('js/editwidget.js');

addWidgetsJsCssToTpl(true);

tpl()->display('design_header.tpl');

foreach($widgets as $cat => $widgetsArray) 
	foreach($widgetsArray as $w)
		tpl()->display('./widgets/' . $w['name'] . '/widget.html');

tpl()->display('design_edit.tpl');
tpl()->display('design_footer.tpl');

?>