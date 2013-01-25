<?php

require_once("include/common.php");
require_once("include/linknx.php");

tpl()->addCss('lib/jquery-mobile/jquery.mobile-1.2.1/jquery.mobile-1.2.1.min.css');

tpl()->addJs('lib/jquery/js/jquery.min.js');
tpl()->addJs('js/design_mobile.js');
tpl()->addJs('lib/jquery-mobile/jquery.mobile-1.2.0/jquery.mobile-1.2.1.min.js');

tpl()->display('design_mobile.tpl');

?>