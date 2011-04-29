<?

require_once("include/common.php");

tpl()->assign_by_ref('objectTypes', $_objectTypes);

tpl()->addJs('js/setup_objects.js');

tpl()->display('setup_objects.tpl');

?>