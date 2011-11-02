<?php
error_reporting(0);
header('Content-Type: application/xml; charset=utf-8');
if (isset($_GET['action'])) {
	switch ($_GET['action']) 
	{
		case 'savedesign':
			$name = "default";
	    if (isset($_GET['name']))
        $name = $_GET['name'];
			$version = "design";
	    if (isset($_GET['ver']))
        $version = $_GET['ver'];
			if (ereg("[\\/.$;!?]", $name.$version) > 0)
				print("<savedesign status='error'>Restricted character in design or version name");
			elseif ($fp = fopen("design/".$name."/".$version.".xml", 'w')) {
			    $conf = file_get_contents("php://input");
				fwrite($fp, $conf);
				fclose($fp);
				print("<savedesign status='success'>");
			}
			elseif (!is_writable("design/".$name."/".$version.".xml"))
				print("<savedesign status='error'>Design has no write permission on server");
			else
				print("<savedesign status='error'>Unable to write design to file");
			print("</savedesign>\n");
	    break;
		case 'designlist':
			if ($dh = opendir("design")) {
				print("<designlist status='success'>\n");
				while (($file = readdir($dh)) !== false) {
					if ($file != "." && $file != ".." && is_dir("design/".$file)) {
						echo "<design name='$file'>\n";
						if ($fh = opendir("design/".$file)) {
							while (($ver = readdir($fh)) !== false) {
								if (substr($ver, -4) == ".xml")
									echo "<version>".substr($ver, 0, -4)."</version>\n";
							}
							closedir($fh);
						}
						echo "</design>\n";
					}
				}
				closedir($dh);
			}
			else
				print("<designlist status='error'>Unable to find design folder on server\n");
			print("</designlist>\n");
	    break;
		case 'createdesign':
	    if (isset($_GET['name'])) {
        $name = $_GET['name'];
				if (file_exists("design/".$name))
					print("<createdesign status='error'>Design already exists");
				elseif (ereg("[\\/.$;!?]", $name) > 0)
					print("<createdesign status='error'>Restricted character in design name");
				elseif (mkdir("design/".$name, 0777) == false)
					print("<createdesign status='error'>Unable to create design folder");
				elseif ($fp = fopen("design/".$name."/design.xml", 'w')) {
					fwrite($fp, "<?xml version='1.0'?><config><zones/></config>\n");
					fclose($fp);
					print("<createdesign status='success'>");
				}
				else
					print("<createdesign status='error'>Unable to save new design");
			}
			else
				print("<createdesign status='error'>No design name specified");
			print("</createdesign>\n");
	    break;
		case 'savefile':
			print("<savefile status='error'>File save is not possible, please put the file manually in design folder on server</savefile>\n");
	    break;
		case 'filelist':
			$name = "default";
	    if (isset($_GET['name']))
        $name = $_GET['name'];
			if ($dh = opendir("design/".$name)) {
				print("<filelist status='success'>\n");
				while (($file = readdir($dh)) !== false) {
					if ($file != "." && $file != ".." && substr($file, -4) != ".xml")
						echo "<file>$file</file>\n";
				}
				closedir($dh);
			}
			else
				print("<filelist status='error'>Unable to find design '$name' on server\n");
			print("</filelist>\n");
	    break;
		case 'filelistdir':
			$name = "images";
			if (isset($_GET['name']))	$name = $_GET['name'];
				if ($dh = opendir($name)) {
					print("<filelist status='success'>\n");
					while (($file = readdir($dh)) !== false) {
						if ($file != "." && $file != ".." && substr($file, -4) != ".xml")
							echo "<file>$file</file>\n";
						}
					closedir($dh);
				}
			else
				print("<filelist status='error'>Unable to find design '$name' on server\n");
			print("</filelist>\n");
			break;
		case 'saveconfig':
			$dir = "include";
	    if (isset($_GET['dir']))
        $dir = $_GET['dir'];
			if (ereg("[\\/.$;!?]", $dir) > 0)
				print("<saveconfig status='error'>Restricted character in dir");
			elseif ($fp = fopen($dir."/config.xml", 'w')) {
			    $conf = file_get_contents("php://input");
				fwrite($fp, $conf);
				fclose($fp);
				print("<saveconfig status='success'>");
			}
			elseif (!is_writable($dir."/config.xml"))
				print("<saveconfig status='error'>Config.xml has no write permission on server");
			else
				print("<saveconfig status='error'>Unable to create config.xml file");
			print("</saveconfig>\n");
	    break;
		default:
			print("<response status='error'/>Unknown action</response>\n");
	    break;
	}
}
else
	print("<response status='error'/>No action specified</response>\n");
?>