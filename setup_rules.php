<?

require_once("include/common.php");

tpl()->addJs('js/setup_rules_init.js');
tpl()->addJs('js/setup_rules_conditions.js');
tpl()->addJs('js/setup_rules_actions.js');
tpl()->addJs('js/setup_rules.js');
                                          
tpl()->display('setup_rules.tpl');

?>