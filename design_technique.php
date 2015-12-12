<?php

require_once "include/common.php";

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
				echo "<savedesign status='error'>Restricted character in design or version name";
			elseif ($fp = fopen("design/".$name."/".$version.".xml", 'w')) {
			    $conf = file_get_contents("php://input");
				fwrite($fp, $conf);
				fclose($fp);
				echo "<savedesign status='success'>";
			}
			elseif (!is_writable("design/".$name."/".$version.".xml"))
				echo "<savedesign status='error'>Design has no write permission on server";
			else
				echo "<savedesign status='error'>Unable to write design to file";
			echo "</savedesign>\n";
	    break;
	    
		case 'designlist':
			if ($dh = opendir("design")) {
				echo "<designlist status='success'>\n";
				while (($file = readdir($dh)) !== false) {
					if ($file != "." && $file != ".." && $file != "CVS" && is_dir("design/".$file)) {
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
				echo "<designlist status='error'>Unable to find design folder on server\n";
			echo "</designlist>\n";
	    break;
	    
		case 'createdesign':
	    if (isset($_GET['name'])) {
        $name = $_GET['name'];
				if (file_exists("design/".$name))
					echo "<createdesign status='error'>Design already exists";
				elseif (ereg("[\\/.$;!?]", $name) > 0)
					echo "<createdesign status='error'>Restricted character in design name";
				elseif (mkdir("design/".$name, 0777) == false)
					echo "<createdesign status='error'>Unable to create design folder";
				else { // TODO gérer design et mobile en paramètres 'ver' comme le save ...
          if (!isset($_GET['mobile'])) {
    				if ($fp = fopen("design/".$name."/design.xml", 'w')) {
    					fwrite($fp, "<?xml version='1.0' encoding='UTF-8'?"."><config width='1280' height='1024' enableSlider='false'><zones/></config>\n");
					fclose($fp);
					echo "<createdesign status='success'>";
				}
				else
					echo "<createdesign status='error'>Unable to save new design";
          } elseif ($fp = fopen("design/".$name."/mobile.xml", 'w')) {
    					fwrite($fp, "<?xml version='1.0' encoding='UTF-8'?"."><config><pages><page name='home' title='KnxWebMobile'><header/></page></pages></config>\n");
    					fclose($fp);
    					echo "<createdesign status='success'>";
    				}
    				else
    					echo "<createdesign status='error'>Unable to save new design";
        }
			}
			else
				echo "<createdesign status='error'>No design name specified";
			echo "</createdesign>\n";
	    break;
      
	  case 'removedesign':
	    if (isset($_GET['name'])) {
        $name = $_GET['name'];
				if (!file_exists("design/".$name))
					echo "<removedesign status='error'>Design not exists";
				else {
          $delfile = unlink("design/".$name."/design.xml");
          $deldir = rmdir("design/".$name);
          if ($delfile == "false")
					  echo "<removedesign status='error'>Unable to remove design file";
          elseif ( $deldir == "false" )
					  echo "<removedesign status='error'>Unable to remove design folder";
          else
					  echo "<removedesign status='success'>";
        }
			}
			else
				echo "<removedesign status='error'>No design name specified";
			echo "</removedesign>\n";
	    break;
      
		case 'savefile':
			echo "<savefile status='error'>File save is not possible, please put the file manually in design folder on server</savefile>\n";
	    break;
	    
		case 'filelist':
			$name = "default";
	    if (isset($_GET['name']))
        $name = $_GET['name'];
			if ($dh = opendir("design/".$name)) {
				echo "<filelist status='success'>\n";
				while (($file = readdir($dh)) !== false) {
					if ($file != "." && $file != ".." && substr($file, -4) != ".xml")
						echo "<file>$file</file>\n";
				}
				closedir($dh);
			}
			else
				echo "<filelist status='error'>Unable to find design '$name' on server\n";
			echo "</filelist>\n";
	    break;
	    
		case 'filelistdir':
			$name = "images";
			if (isset($_GET['name']))	$name = $_GET['name'];
			
			$files=glob($_config['imageDir'] . $name . "*");

			echo "<filelist status='success'>\n";
			foreach($files as $f) {
				if (is_dir($f)) echo "<directory>" . basename($f) . "</directory>\n";
				if (is_file($f)) echo "<file>" . basename($f) . "</file>\n";
			}

				
/*				if ($dh = opendir($name)) {
					echo "<filelist status='success'>\n";
					while (($file = readdir($dh)) !== false) {
						if ($file != "." && $file != ".." && substr($file, -4) != ".xml")
							echo "<file>$file</file>\n";
						}
					closedir($dh); */
			echo "</filelist>\n";
			break;
			
		case 'saveconfig':
			$dir = "include";
	    if (isset($_GET['dir']))
        $dir = $_GET['dir'];
			if (ereg("[\\/.$;!?]", $dir) > 0)
				echo "<saveconfig status='error'>Restricted character in dir";
			elseif ($fp = fopen($dir."/config.xml", 'w')) {
			    $conf = file_get_contents("php://input");
				fwrite($fp, $conf);
				fclose($fp);
				echo "<saveconfig status='success'>";
			}
			elseif (!is_writable($dir."/config.xml"))
				echo "<saveconfig status='error'>Config.xml has no write permission on server";
			else
				echo "<saveconfig status='error'>Unable to create config.xml file";
			echo "</saveconfig>\n";
	    break;
	    
		case 'newWidget':
			$w = getWidget($_GET['type']);
			
			$xml = new SimpleXMLElement("<control></control>");
			$xml->addAttribute("type", $w['name']);
			
			foreach($w['settings'] as $s) {
				if (isset($s['id'])) $xml->addAttribute($s['id'], ((isset($s['default']))?$s['default']:'') );
			}
			
			echo $xml->asXML();
			break;

		case 'savesubpages':
			if (file_put_contents("design/subpages.xml", file_get_contents("php://input")))
				echo "<savesubpages status='success'>";
			elseif (!is_writable("design/subpages.xml"))
				echo "<savesubpages status='error'>design/subpages.xml directory has no write permission on server";
			else
				echo "<savesubpages status='error'>Unable to write subpages to file";
			echo "</savesubpages>\n";
	    break;

		case 'updatewidgetscss':
			if ($fp = fopen("widgets/widgets.css", 'w')) {
				$conf = file_get_contents("php://input");
				fwrite($fp, $conf);
				fclose($fp);
				echo "<updatewidgetscss status='success'>";
			}
			elseif (!is_writable("widgets/widgets.css"))
				echo "<updatewidgetscss status='error'>widgets/widgets.css has no write permission on server";
			else
				echo "<updatewidgetscss status='error'>Unable to create widgets/widgets.css file";
			echo "</updatewidgetscss>\n";
	    break;

    case 'widgetsdl':
      $widget = $_GET['widget'];
      exec('wget -O /tmp/widget.tar http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/widgets_knxweb2/' . $widget . '/?view=tar');
      $path_knxweb2 = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'widgets' . DIRECTORY_SEPARATOR;
      exec('tar -xf /tmp/widget.tar --directory='.$path_knxweb2);
      exec('rm /tmp/widget.tar');
      echo "<widgetsdl status='success' />\n";
      break;
      
    case 'subpagesdl':
      $subpage = $_GET['subpage'];
      /* $widgetcss = $_GET['widgetcss']; */ /* 0: pas de fichier css; 1: présence du fichier widgets.css */
      $opts = array(
        'http'=>array(
          'method'=>"GET",
          'header'=>"Content-Type: application/xml; charset=utf-8", 
          'timeout' => 20
        )
      );
      $context = stream_context_create($opts);
      $subpagexml = simplexml_load_string(file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/subpages_knxweb2/' . $subpage . '/subpage.xml', false, $context));
      echo "<subpagesdl status='success'>";
      if ($subpagexml) {
        $fgc = simplexml_load_file("design/subpages.xml");
        if ($fgc) {
          $domsubpagesxml = dom_import_simplexml($fgc); //$fgc->subpages
          $domfgc  = dom_import_simplexml($subpagexml);
          $domfgc  = $domsubpagesxml->ownerDocument->importNode($domfgc, TRUE);
          $domsubpagesxml->appendChild($domfgc);
          if ($fgc->asXML("design/subpages.xml"))
  				  echo "<updatesubpagesxml status='success'>";
          else
            echo "<updatesubpagesxml status='error'>Unable to update design/subpages.xml file";
  			} else
  				echo "<updatesubpagesxml status='error'>Unable to update design/subpages.xml file";
  			echo "</updatesubpagesxml>\n";
      } 
      $widgetscss = file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/subpages_knxweb2/' . $subpage . '/widgets.css', false, $context);
      if ($widgetscss) {
        $fp = fopen("widgets/widgets.css", 'a+');  // 'a+' => Ouvre en lecture et écriture ; place le pointeur de fichier à la fin du fichier. Si le fichier n'existe pas, on tente de le créer.
        if ($fp) {  
  				fwrite($fp, "\n /* Subpage " . $subpage . " Add from cvs */\n" . $widgetscss);
  				fclose($fp);
  				echo "<updatewidgetscss status='success'>";
  			} else
  				echo "<updatewidgetscss status='error'>Unable to update/create widgets/widgets.css file";
  			echo "</updatewidgetscss>\n";
      }      
      echo "</subpagesdl>\n";
      break;
      
    case 'plugindl':
      $plugin = $_GET['plugin'];
      $opts = array(
        'http'=>array(
          'method'=>"GET",
          'header'=>"Content-Type: application/xml; charset=utf-8", 
          'timeout' => 20
        )
      );
      $context = stream_context_create($opts);
      //$pluginxml = simplexml_load_string(file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/plugins_knxweb2/' . $plugin . '/plugin.xml', false, $context));
      $pluginxml = simplexml_load_string(file_get_contents('http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/plugins_knxweb2/' . $plugin . '/plugin.xml', false, $context));
      // TODO a gérer autrement ...sur github ?
      echo "<plugindl status='success'>";
      // TODO à compléter ...
      echo "</plugindl>\n";
      break;

    case 'updateknxweb':
      exec('wget -O /tmp/knxweb2.tar "http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/knxweb2/?view=tar"');
      $path_knxweb2 = explode(DIRECTORY_SEPARATOR, dirname(__FILE__));
      array_splice($path_knxweb2, count($path_knxweb2)-1);
      $path_knxweb2 = implode( DIRECTORY_SEPARATOR , $path_knxweb2 ) . DIRECTORY_SEPARATOR;
      exec('tar -xf /tmp/knxweb2.tar --overwrite -C '.$path_knxweb2);
      exec('rm /tmp/knxweb2.tar');
      echo "<updateknxweb status='success' />\n";
      break;

    case 'updateknxwebgit':
      exec('wget -O /tmp/knxweb2.tar.gz --no-check-certificate "https://github.com/linknx/knxweb/archive/master.tar.gz"');
      $path_knxweb2 = dirname(__FILE__);  // ex. /var/www/knxweb2
      // tar -xzvf /tmp/knxweb2.tar.gz knxweb-master/ --overwrite -C /var/www/knxweb2.1.0/
      // tar -tf /tmp/knxweb2.tar.gz knxweb2.1.0/ --overwrite -C /var/www/
      exec('tar -xzf /tmp/knxweb2.tar.gz --overwrite -C /tmp/');
      // copier le contenu complet el mettant à ajour: cp -f -R /tmp/knxweb-master/* /var/www/knxweb2.1.0
      exec('cp -f -R /tmp/knxweb-master/* '.$path_knxweb2.'/');
      // Pour supprimer un répertoire non vide, la syntaxe est rm -Rf monrepertoire
      exec('rm -Rf /tmp/knxweb-master/');
      exec('rm /tmp/knxweb2.tar.gz ');
      echo "<updateknxwebgit status='success' >'".$path_knxweb2."/'</updateknxwebgit>\n";
      break;

    case 'saveplugins':
      if (file_put_contents("design/plugins.xml", file_get_contents("php://input")))
        echo "<saveplugins status='success'>";
      elseif (!is_writable("design/plugins.xml"))
        echo "<saveplugins status='error'>design/plugins.xml directory has no write permission on server";
      else
        echo "<saveplugins status='error'>Unable to write plugins to file";
      echo "</saveplugins>\n";
      break;

    case 'restart':
      if (isset($_GET['pgm'])) {
        exec('sudo service '.$_GET['pgm'].' restart'); // restart eibd or linknx with init.d service if exist
        echo "<restart status='success' >Restart ".$_GET['pgm']."</restart>\n";
      } else echo "<restart status='error' />\n";
      break;

		default:
			echo "<response status='error'>Unknown action</response>\n";
	    break;
	}
}
else
	echo "<response status='error'>No action specified</response>\n";
?>