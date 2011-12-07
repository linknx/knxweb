<?

if (file_exists("check_install.php"))
	header('Location: check_install.php');
else
	header('Location: design_view.php');

?>