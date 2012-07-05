<?php

require_once("include/common.php");
require_once("include/linknx.php");

tpl()->addCss('css/style.css');

tpl()->addJs('js/setup_subpages.js');

$widgets=getWidgetsByCategory();
tpl()->assign_by_ref('widgets',$widgets);

tpl()->display('setup_subpages.tpl');

?>