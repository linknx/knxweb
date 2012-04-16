<?php
/*
 * TODO : gérer le subpages.xml comme config.xml, le créer vide si existe pas si existe ne rien faire, 
 * dans le cas de réinstall dans le même répertoire on perd les subpages si il en avait de définis !!
 */ 
require_once("include/linknx.php");
require_once("lang/lang.php");

$_config = array();
if (file_exists('include/config.xml') && file_get_contents( 'include/config.xml' ) != '') {
  $_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
  unset($_config['comment']); // enleve les commentaires
  //$_config["imageDir"]
}

session_start();

function _get($key, $default='') {
	if (isset($_GET[$key])) return $_GET[$key]; else return $default;
}

$pwd=getcwd(); // Retourne le dossier de travail courant
$apache_user=exec('whoami');

$eibd_running = `ps ax | grep eibd | grep -v grep`;
if ($eibd_running!="") {
  $eibd_running_param = explode("eibd ",$eibd_running);
  $eibd_running_param = $eibd_running_param[1];
} else {
  $eibd_running_param = $_config["eibd"];
}

$linknx_running = `ps ax | grep linknx | grep -v grep`;
if ($linknx_running!="") {
  $linknx_running_param = explode("linknx ",$linknx_running);
  $linknx_running_param = $linknx_running_param[1];
  $linknx_param_pos_w = (strpos($linknx_running_param, "-w") >= 0);
} else {
  $linknx_running_param = $_config["linknx"];
  $linknx_param_pos_w = false;
}

if (isset($_GET["ajax"])) {
	
	ini_set("display_errors", 0);
	
	// File permissions
	if (isset($_GET["permissions"])) {
		$error=false;
?>
		Checking files permissions : <br />
		<ul>
			<li>
				Is <strong>pictures/</strong> directory writable? 
				<?php 
					if (is_writable('pictures/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/pictures/"; 
						$error=true;
					}
				?>
			</li>
			<li>
				Is <strong>design/</strong> directory writable? 
				<?php
					if (is_writable('design/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/design/"; 
						$error=true;
					}
				?>
			</li>
			<li>
				Does <strong>template/template_c/</strong> exists? 
				<?php 
					if (file_exists('template/template_c/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => mkdir $pwd/template/template_c/";
						$error=true;
					}
				?>
			</li>
			<li>
				Is <strong>template/template_c/</strong> directory writable? 
				<?php 
					if (is_writable('template/template_c/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/template/template_c/";
						$error=true;
					}
				?>
			</li>
			<li>
				Is <strong>include/config.xml</strong> file writable? 
				<?php 
					if (file_exists('include/config.xml') ) {
          if (is_writable('include/config.xml')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/include/config.xml";
						$error=true;
					}
          } else {
          if (is_writable('include/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/include/";
						$error=true;
					}
          }
				?>
			</li>
    </ul>
		Status EIBD/Linknx : <br />
    <ul>
      <li>
				<strong>EIBD</strong> is ACTIVE :
        <?php
        if ($eibd_running!="") echo '<span style="color: #00FF00">ok</span>'; 
				else {
					echo "<span style='color: #FF0000'>no</span> => for start exemple : <i>eibd -d -D -S -T -i ipt:192.168.1.10:3671</i> ";
					//$error=true;
				} ?>
			</li>
      <li>
				<strong>Linknx</strong> is ACTIVE :
        <?php
        if ($linknx_running!="") echo '<span style="color: #00FF00">ok</span>'; 
				else {
					echo "<span style='color: #FF0000'>no</span> => for start exemple : <i>linknx -d --config=/etc/linknx.xml --write=/etc/linknx.xml</i> ";
					//$error=true;
				} ?>
			</li>
		</ul>
		<?php
			if ($error) 
				echo "Please fix errors before continuing to the next step. <br /><br /><button id='recheckPermissionButton' onclick=\"$('#tabs').tabs('load',0);\">Click here to recheck.</button>";
			else {
?>
				All is ok.<br />
				<input style="margin-top: 15px;" type="button" id="step1NextButton" onclick="$('#tabs').tabs('select',1);" value="Next">
				<script>
					$('#tabs').tabs('enable',1);
					$("#step1NextButton").button();
				</script>
<?php
			}
		?>
		<script>$("#recheckPermissionButton").button();</script>
<?php		
	}
	// Check Linknx
	elseif (isset($_GET["config"])) {
    if (!$_config["title"]) 
      $title_knxweb = "KnxWeb - Ma maison en un clic";
    else 
      $title_knxweb = $_config["title"];
?>
<style>
.red {
    background-color: #DF0000;
    color: #FFFFFF;
    font-family: verdana,helvetica;
    font-size: 10px;
    font-weight: bold;
}
.green {
    background-color: #00DF00;
    color: #FFFFFF;
    font-family: verdana,helvetica;
    font-size: 10px;
    font-weight: bold;
}
</style>
		<form id="linknxForm" method=GET >
		<table> <!-- width="400" -->
			<tr>
				<td>Linknx host</td>
				<td><input type="text" name="linknx_host" value="<?=_get('linknx_host','127.0.0.1')?>" size="15"></td>
			</tr>
			<tr>
				<td>Linknx port</td>
				<td><input type="text" name="linknx_port" value="<?=_get('linknx_port',1028)?>" size="4"></td>
			</tr>
      <tr><td colspan="2"><br /> </td></tr>
      <tr>
				<td>Title of HTML page of Knxweb</td>
				<td>
          <input type="text" name="title_knxweb" value="<?=_get('title_knxweb',$title_knxweb)?>" size="50">
        </td>
			</tr>
      <tr>
				<td>Use by default applet Java if available</td><!-- Use java applet to update objects value on display design if Java is installed on client -->
				<td><input type="checkbox" name="useJavaIfAvailable" <?=((_get('useJavaIfAvailable',$useJavaIfAvailable)=="on")?'checked="1"':"")?>" > if supported by the navigator</td>
			</tr> 
      <tr>
				<td>Language</td>
				<td>
          <select name="lang" id="lang" >
            <?php if (!$_config["lang"]) $default_lang = _get('lang','en'); else $default_lang = $_config["lang"];
            foreach ($lang as $key => $value) { ?>
                <option value="<?=$key?>" <?=(($default_lang == $key )?'checked="1"':"")?> ><?=$value?></option>
            <?php } ?>
          </select>
        </td>
			</tr>
      <tr>
				<td>EIBD</td>
				<td>
          <?php if ($eibd_running!="") { ?>
            <span class="green">&nbsp;ACTIVE&nbsp;</span>
            <input type="hidden" name="eibd_param" value="<?=_get('eibd_param',$eibd_running_param)?>">
            <input type="text" value="<?=_get('eibd_param',$eibd_running_param)?>" size="50" disabled="true">
          <?php } else { ?>
            <span class="red">&nbsp;DESACTIVE&nbsp;</span>
            <input type="text" name="eibd_param" value="<?=_get('eibd_param',$eibd_running_param)?>" size="50">
          <?php } ?>
        </td>
			</tr>
      <tr>
				<td>Linknx</td>
        <td>
          <?php if ($linknx_running!="") { ?>
            <span class="green">&nbsp;ACTIVE&nbsp;</span>
            <input type="hidden" name="linknx_param" value="<?=_get('linknx_param',$linknx_running_param)?>">
            <input type="text" value="<?=_get('linknx_param',$linknx_running_param)?>" size="50" disabled="true">
          <?php } else { ?>
            <span class="red">&nbsp;DESACTIVE&nbsp;</span>
            <input type="text" name="linknx_param" value="<?=_get('linknx_param',$linknx_running_param)?>" size="50">
          <?php } ?>
        </td>
			</tr>
			<tr>
				<td colspan="2" style="padding-top: 10px;"><input type="button" id="checkLinknxButton" onclick="checkLinknx();" value="Check"></td>
			</tr>
		</table>
		</form>
		<script>
			function checkLinknx() {
				$('#tabs').tabs('url', 1, "check_install.php?ajax&config&" + $("#linknxForm").serialize());
				$('#tabs').tabs('load',1);
			}
			
			$("#checkLinknxButton").button();
		</script>
<?php
		$error=false;
		
		if ( (isset($_GET['linknx_host'])) && ($_GET['linknx_host']!="") )
		{
			if ($_GET['linknx_port']=="") die("Error : Please specify a port");
			if (!preg_match("~(\d){2,5}~", $_GET['linknx_port'])) die("Error : Invalid port");
			
			echo "<br />";
			try {
				$linknx=new Linknx($_GET['linknx_host'], $_GET['linknx_port']);
        $info=$linknx->getServices();
        if ($info!==false) {
          $_SESSION['loglinknx']=$info['persistence']['type'];
        }
				$info=$linknx->getInfo();
				if ($info!==false) {
					$_SESSION['linknx_host']=$_GET['linknx_host'];
					$_SESSION['linknx_port']=$_GET['linknx_port'];
					$_SESSION['version']=$info["version"];
					$_SESSION['haveSMS']=($info["haveSMS"]==1)?"true":"false";
					$_SESSION['haveEmail']=($info["haveEmail"]==1)?"true":"false";
					$_SESSION['haveLua']=($info["haveLua"]==1)?"true":"false";
					$_SESSION['haveLog4cpp']=($info["haveLog4cpp"]==1)?"true":"false";
					$_SESSION['haveMysql']=($info["haveMysql"]==1)?"true":"false";
          $_SESSION['linknx_param']=$_GET['linknx_param'];
          $_SESSION['eibd_param']=$_GET['eibd_param'];
          $_SESSION['useJavaIfAvailable']=($_GET['useJavaIfAvailable']=="on")?"true":"false";
          $_SESSION['lang']=$_GET['lang'];
          $_SESSION['title_knxweb']=$_GET['title_knxweb'];
					
?>
				Found Linknx version : <?=$info["version"]?><br />
				<br />
				With compiled options: <br />
				<ul>
					<li>SMS : <?=(($info["haveSMS"])?'<span style="color: #00FF00">Yes</span>':'<span style="color: #FF0000">No</span>')?></li>	
					<li>E-Mail : <?=(($info["haveEmail"])?'<span style="color: #00FF00">Yes</span>':'<span style="color: #FF0000">No</span>')?></li>	
					<li>Lua : <?=(($info["haveLua"])?'<span style="color: #00FF00">Yes</span>':'<span style="color: #FF0000">No</span>')?></li>	
					<li>log4cpp : <?=(($info["haveLog4cpp"])?'<span style="color: #00FF00">Yes</span>':'<span style="color: #FF0000">No</span>')?></li>	
					<li>Mysql : <?=(($info["haveMysql"])?'<span style="color: #00FF00">Yes</span>':'<span style="color: #FF0000">No</span>')?></li>
          <li>Linknx have parameter "-w" or "--write=..."	: <?=(($linknx_param_pos_w)?'<span style="color: #00FF00">Yes</span>':'<span style="color: #FF0000">No</span>')?></li>
				</ul>
				<!-- <br />
				Please ensure that linknx is started with the --write parameter, for example:<br />
				<br />
				<i>linknx --config=/etc/linknx.xml --write=/etc/linknx.xml</i><br /><br /> -->
				<input style="margin-top: 15px;" type="button" id="step2NextButton" onclick="$('#tabs').tabs('select',2);" value="Next">
				<script>
					$('#tabs').tabs('enable',2);
					$("#step2NextButton").button();
				</script>
<?php
				} else echo "Cannot determine linknx version, you probably have an old version of linknx. You must upgrade to the version 0.0.1.30 of linknx to use with this version of knxweb.";
			} catch (Exception $e) {
				echo $e->getMessage();
			}
		}
	}
	// Write config
	elseif (isset($_GET["writeconfig"])) {
		$config="<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\"?>
<param>
  <linknx_host>" . $_SESSION['linknx_host'] . "</linknx_host> <!-- ip du serveur linknx -->
  <linknx_port>" . $_SESSION['linknx_port'] . "</linknx_port> <!-- port connexion avec serveur linknx -->
  <template>default</template> <!-- template utiliser images, css, code html tpl -->
  <lang>" . $_SESSION['lang'] . "</lang> <!-- langue -->
  <version>0.9</version> <!-- version de KnxWeb -->
  <title>" . $_SESSION['title_knxweb'] . "</title> <!-- Titre des pages Web : KnxWeb - Ma maison en un clic -->
  <Path_Image_Background>images/</Path_Image_Background> <!-- emplancement des images de fond d'écran -->
  <defaultDesign>default</defaultDesign> <!-- version et design par défaut => design/version.xml par défaut default/design.xml -->
  <defaultVersion>design</defaultVersion> <!-- fichier xml de description -->
  <startMobileView>false</startMobileView> <!-- démarrage par défaut de la vue \"Mobile\" -->
  <defaultMobileDesign>default</defaultMobileDesign> <!-- version et design par défaut de la visu \"Mobile\" -->
  <defaultMobileVersion>mobile</defaultMobileVersion> <!-- fichier xml de description de la visu \"Mobile\" -->
  <eibd>" . $_SESSION['eibd_param'] . "</eibd> <!-- paramètres d'appel de eibd exemple : ft12:/dev/ttyS0 ou -d -D -S -T -i ipt:192.168.1.10:3671 -->
  <linknx>" . $_SESSION['linknx_param'] . "</linknx> <!-- paramètres d'appel de linknx -->
  <loglinknx>" . $_SESSION['loglinknx'] . "</loglinknx> <!-- type de log de linknx file/mysql/null -->
  <imageDir>pictures/</imageDir> <!-- chemin d'accès aux images -->
  <useJavaIfAvailable>" . $_SESSION['useJavaIfAvailable'] . "</useJavaIfAvailable> <!-- Use java applet to update objects value on display design if Java is installed on client -->
  <versionLinknx>" . $_SESSION['version'] . "</versionLinknx> <!-- linknx peux gérer les SMS -->
  <haveSMS>" . $_SESSION['haveSMS'] . "</haveSMS> <!-- linknx peux gérer les SMS -->
  <haveEmail>" . $_SESSION['haveEmail'] . "</haveEmail> <!-- linknx peux gérer les Email -->
  <haveLua>" . $_SESSION['haveLua'] . "</haveLua> <!-- linknx peux gérer les LUA -->
  <haveLog4cpp>" . $_SESSION['haveLog4cpp'] . "</haveLog4cpp> <!-- linknx est compilé avec Log4cpp -->
  <haveMysql>" . $_SESSION['haveMysql'] . "</haveMysql> <!-- linknx est compilé avec Mysql -->
</param>";
		$res=file_put_contents('include/config.xml', $config);
$subpages = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<subpages></subpages>";
    $res2 = true;
    if (!is_file('design/subpages.xml')) $res2=file_put_contents('design/subpages.xml', $subpages); 
		if ($res!==false && $res2!==false)
		{
?>
		Configuration file written.<br />
		<br />
		<!--You must now delete the file check_install.php (rm <?=$pwd?>/check_install.php) to finish knxweb setup.<br />
		<br />
		When done, --><a href="setup.php">click here</a> to configure knxweb.
<?php
		} else echo "Error while writing configuration to file include/config.xml";
	}
	die;
}

?>
<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache, must-revalidate" />

	<style type="text/css">
		body, html {
			font-family: Arial, Tahoma, Helvetica, sans-serif;
			color: #000;
			background: #FFF;
			padding: 20px;
		}
		form {
			padding: 0;
			margin: 0;
		}
		.welcome {
			padding: 5px;
			margin-bottom: 10px;
		}
	</style>
	
	<title>KnxWeb - Setup</title>
	<link rel="stylesheet" type="text/css" href="lib/jquery/css/cupertino/jquery-ui-1.8.10.custom.css" />
	<script type="text/javascript" src="lib/jquery/js/jquery.min.js"></script>
	<script type="text/javascript" src="lib/jquery/js/jquery-ui-1.8.10.custom.min.js"></script>
	
	<script>
		$(function() {
			$( "#tabs" ).tabs({
				disabled: [1, 2]
			});
		});
	</script>
		
</head>
<body>
	<div class="ui-state-default welcome">Knxweb Setup</div>
	
	<div id="tabs">
		<ul>
			<li><a href="check_install.php?ajax&permissions">File permissions</a></li>
			<li><a href="check_install.php?ajax&config">Basic configuration</a></li>
			<li><a href="check_install.php?ajax&writeconfig">Done</a></li>
		</ul>
	</div>	

</body>
</html>
