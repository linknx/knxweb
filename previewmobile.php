<?php

require_once("include/common.php");
require_once("include/linknx.php");

tpl()->addCss('lib/jquery-mobile/jquery.mobile-1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.css');

tpl()->addJs('lib/jquery/js/jquery.min.js');
tpl()->addJs('js/design_mobile.js');
tpl()->addJs('lib/jquery-mobile/jquery.mobile-1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.js');

tpl()->display('design_mobile.tpl');

?>