<?

require_once("include/linknx.php");

session_start();

function _get($key, $default='') {
	if (isset($_GET[$key])) return $_GET[$key]; else return $default;
}

$pwd=getcwd();
$apache_user=exec('whoami');

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
				<? 
					if (is_writable('pictures/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/pictures/"; 
						$error=true;
					}
				?>
			</li>
			<li>
				Is <strong>design/</strong> directory writable? 
				<?
					if (is_writable('design/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/design/"; 
						$error=true;
					}
				?>
			</li>
			<li>
				Does <strong>template/template_c/</strong> exists? 
				<? 
					if (file_exists('template/template_c/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => mkdir $pwd/template/template_c/";
						$error=true;
					}
				?>
			</li>
			<li>
				Is <strong>template/template_c/</strong> directory writable? 
				<? 
					if (is_writable('template/template_c/')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/template/template_c/";
						$error=true;
					}
				?>
			</li>
			<li>
				Is <strong>include/config.xml</strong> file writable? 
				<? 
					if (is_writable('include/config.xml')) echo '<span style="color: #00FF00">ok</span>'; 
					else {
						echo "<span style='color: #FF0000'>no</span> => chown -R $apache_user $pwd/include/config.xml";
						$error=true;
					}
				?>
			</li>
		</ul>
		<?
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
<?
			}
		?>
		<script>$("#recheckPermissionButton").button();</script>
<?		
	}
	// Check Linknx
	elseif (isset($_GET["config"])) {
?>
		<form id="linknxForm">
		<table width="400">
			<tr>
				<td>Linknx host</td>
				<td><input type="text" name="linknx_host" value="<?=_get('linknx_host','127.0.0.1')?>" size="15"></td>
			</tr>
			<tr>
				<td>Linknx port</td>
				<td><input type="text" name="linknx_port" value="<?=_get('linknx_port',1028)?>" size="4"></td>
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
<?
		$error=false;
		
		if ( (isset($_GET['linknx_host'])) && ($_GET['linknx_host']!="") )
		{
			if ($_GET['linknx_port']=="") die("Error : Please specify a port");
			if (!preg_match("~(\d){2,5}~", $_GET['linknx_port'])) die("Error : Invalid port");
			
			echo "<br />";
			try {
				$linknx=new Linknx($_GET['linknx_host'], $_GET['linknx_port']);
				$info=$linknx->getInfo();
				if ($info!==false) {
					$_SESSION['linknx_host']=$_GET['linknx_host'];
					$_SESSION['linknx_port']=$_GET['linknx_port'];
?>
				Found Linknx version : <?=$info["version"]?><br />
				<br />
				With compiled options: <br />
				<ul>
					<li>SMS : <?=(($info["haveSMS"])?'<span style="color: #00FF00">Yes</span>':'No')?></li>	
					<li>E-Mail : <?=(($info["haveEmail"])?'<span style="color: #00FF00">Yes</span>':'No')?></li>	
					<li>Lua : <?=(($info["haveLua"])?'<span style="color: #00FF00">Yes</span>':'No')?></li>	
					<li>log4cpp : <?=(($info["haveLog4cpp"])?'<span style="color: #00FF00">Yes</span>':'No')?></li>	
					<li>Mysql : <?=(($info["haveMysql"])?'<span style="color: #00FF00">Yes</span>':'No')?></li>	
				</ul>
				<br />
				Please ensure that linknx is started with the --write parameter, for example:<br />
				<br />
				<i>linknx --config=/etc/linknx.xml --write=/etc/linknx.xml</i><br /><br />
				<input style="margin-top: 15px;" type="button" id="step2NextButton" onclick="$('#tabs').tabs('select',2);" value="Next">
				<script>
					$('#tabs').tabs('enable',2);
					$("#step2NextButton").button();
				</script>
<?
				} else echo "Cannot determine linknx version, you probably have an old version of linknx. You must upgrade to the last CVS version of linknx to use with this version of knxweb.";
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
  <lang>fr</lang> <!-- langue -->
  <version>0.9</version> <!-- version de KnxWeb -->
  <title>KnxWeb - Ma maison en un clic</title> <!-- Titre des pages Web -->
  <Path_Image_Background>design/default/</Path_Image_Background> <!-- emplancement des images de fond d'écran -->
  <defaultDesign>default</defaultDesign> <!-- version et design par défaut => design/version.xml par dÃ©faut default/design.xml -->
  <defaultVersion>design</defaultVersion> <!-- fichier xml de description -->
  <startMobileView>false</startMobileView> <!-- démarrage par défaut de la vue \"Mobile\" -->
  <defaultMobileDesign>default</defaultMobileDesign> <!-- version et design par défaut de la visu \"Mobile\" -->
  <defaultMobileVersion>mobile</defaultMobileVersion> <!-- fichier xml de description de la visu \"Mobile\" -->
  <eibd>-d -D -S -T -i ipt:192.168.1.10:3671</eibd> <!-- paramètres d'appel de eibd exemple : ft12:/dev/ttyS0 -->
  <linknx>-d --config=/var/lib/linknx/linknx.xml</linknx> <!-- paramètres d'appel de linknx -->
  <loglinknx>file</loglinknx> <!-- type de log de linknx file/mysql/null -->
  <imageDir>pictures/</imageDir> <!-- chemin d'accès aux images -->
</param>";
		$res=file_put_contents('include/config.xml', $config);
		if ($res!==false)
		{
?>
		Configuration file written.<br />
		<br />
		You must now delete the file check_install.php (rm <?=$pwd?>/check_install.php) to finish knxweb setup.<br />
		<br />
		When done, <a href="setup.php">click here</a> to configure knxweb.
<?
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
