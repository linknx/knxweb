<?php

if (!file_exists('include/config.xml') || file_get_contents( 'include/config.xml' ) == '')
	header('Location: check_install.php');
else
	header('Location: design_view.php');

?>