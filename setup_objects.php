<?

require_once("include/common.php");

tpl()->assignByRef('objectTypes', $_objectTypes);
tpl()->assignByRef('json_objectTypes', $json_objectTypes);

tpl()->addJs('js/setup_objects.js');

tpl()->display('setup_objects.tpl');

?>