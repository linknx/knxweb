<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache, must-revalidate" />
		
		<title>{$_config.title}</title>
		{foreach from=$cssList item=css}
		<link rel="stylesheet" type="text/css" href="{$css}" />
		{/foreach}
		<script type="text/javascript" >
		var tab_config = {$json_config};
		</script>
		{foreach from=$jsList item=js}
		<script type="text/javascript" src="{$js}"></script>
		{/foreach}
</head>
<body>

<div id="loaderModal">
	<div id="loaderContent">
		<img src="images/loading.gif" /><br /><br />
		Chargement en cours, veuillez patienter
	</div>
</div>

<div id="wrap">
	<div id="leftContent">
		<div id="appTitle">KnxWeb {$_config.version}</div>
		<div class="title">Menu</div>
		<div id="leftMenu" class="ui-helper-reset">
			<h3 tab_id="setup" tab_label="Configuration"><a href="#"><img src="images/setup.png"> Configuration</a></h3>
			<div>
			<div class="subItem" tab_id="general" tab_label="Général" tab_url="setup_general.php">Général</div>
			<div class="subItem" tab_id="smsgateway" tab_label="Gateway SMS" tab_url="setup_smsgateway.php">Gateway SMS</div>
			<div class="subItem" tab_id="emailserver" tab_label="Serveur SMTP" tab_url="setup_emailserver.php">Serveur SMTP</div>
			<div class="subItem" tab_id="logging" tab_label="Logging" tab_url="setup_logging.php">Logging</div>
			<div class="subItem" id="button-write-config">Sauver la configuration</div>
			</div>

			<h3 tab_id="objects" tab_label="Objets" tab_url="setup_objects.php"><a href="#"><img src="images/object.png"> Objets</a></h3>
			<div>
				<div class="subItem" id="button-add-object"><img src="images/add.png" />Ajouter un objet</div>
				<div class="subItem" id="button-remove-object"><img src="images/remove.png" />Supprimer un objet</div>
				<div class="subItem" id="button-edit-object"><img src="images/edit.png" />Editer un objet</div>
				<div class="subItem" id="button-read-object"><img src="images/fetch.png" />Lire/Ecrire un objet</div>
			</div>

			<h3 tab_id="ioports" tab_label="IO Ports" tab_url="setup_ioports.php"><a href="#"><img src="images/ioport.png"> IO Ports</a></h3>
			<div>
				<div class="subItem" id="button-add-ioport"><img src="images/add.png" />Ajouter un IO Port</div>
				<div class="subItem" id="button-remove-ioport"><img src="images/remove.png" />Supprimer un IO Port</div>
				<div class="subItem" id="button-edit-ioport"><img src="images/edit.png" />Editer un IO Port</div>
			</div>

			<h3 tab_id="rules" tab_label="Rules" tab_url="setup_rules.php"><a href="#"><img src="images/rules.png"> Rules</a></h3>
			<div>
				<div class="subItem" id="button-add-rule"><img src="images/add.png" />Ajouter une rule</div>
				<div class="subItem" id="button-remove-rule"><img src="images/remove.png" />Supprimer une rule</div>
				<div class="subItem" id="button-edit-rule"><img src="images/edit.png" />Editer une rule</div>
			</div>
						
			<h3 tab_id="designedit" tab_label="Edition Design" tab_url="designedit.php"><a href="#"><img src="images/setup.png"> Edition Design</a></h3>
			<div></div>
			
			<h3 tab_id="admin" tab_label="Administration" tab_url="setup_admin.php"><a href="#"><img src="images/construct.png"> Admin</a></h3>
			<div></div>
			
		</div>
		<div id="propertiesContainer">
			<div class="title">Propriétés</div>
		</div>
	</div>
	
	<div id="mainContent">

		<div id="tabs">
			<ul>
				<li><a href="#tab-setup">Configuration</a></li>
			</ul>
			<div id="tab-setup">
				<h3 style="color: #F00; font-weight: bold;">Si vous voulez sauver vos modifications de façon permanente, veuillez cliquer sur le bouton "Sauver la configuration" après vos différentes modifications (configuration, objets, IO port,...).</h3>
			</div>
		</div>
	</div>
</div>

</body>
</html>