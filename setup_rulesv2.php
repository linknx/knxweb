<?php

require_once("include/common.php");

$plugins = false;
if (file_exists("plugins.php")) {
  $plugins = true;
}
tpl()->assignByRef("plugins",$plugins); 
                                          
tpl()->display('setup_rulesv2.tpl');

?>