<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache, must-revalidate" />
		<link rel="shortcut icon" type="image/png" href="favicon.png" />

		<title>{$_config.title}</title>
		{foreach from=$cssList item=css}
		<link rel="stylesheet" type="text/css" href="{$css}" />
		{/foreach}
		<script type="text/javascript" >
		var tab_config = {$_config|json_encode};
		var _widgets = {$widgets|json_encode};
		var _widgetscssexist = {$widgetscssexist};
		</script>
		{foreach from=$jsList item=js}
		<script type="text/javascript" src="{$js}"></script>
		{/foreach}
    <script type="text/javascript">
      if (window.addEventListener) {
        var kkeys = [], knm = "38,38,40,40,37,39,37,39,66,65";
        window.addEventListener("keydown", function(e) {
          kkeys.push(e.keyCode);
          if (kkeys.toString().indexOf(knm) >= 0) {
            $("html").toggleClass('knm');
            kkeys = [];
          }
        }, true);
      }
    </script>
		
</head>
<body>

<div id="loaderModal">
	<div id="loaderContent">
		<img src="images/loading.gif" /><br /><br />
		Chargement en cours, veuillez patienter
	</div>
</div>

<div id="widgetsTemplate" style="display: none;">

	{foreach from=$widgets key=id item=i}
		{include file="widgets/$id/widget.html"}
	{/foreach}

</div>

<div id="images-manager-dialog">
	<div class="url">
		Use external URL : <input name="url" id="images-manager-dialog-url" type="text" size="50">
		<input type="button" id="images-manager-dialog-url-set" value="Set" onclick=""> (ex.: http://www.abc.com/123.jpg)
	</div>
	<div class="upload">
		Send a new file : <input name="file" id="images-manager-dialog-file" type="file">
	</div>
	<div class="info"></div>
	<div class="images">
	</div>
</div>

<div id="colorpicker-dialog">
	<div id="colorpicker-dialog-picker"></div> 
	<div>
		<label for="colorpicker-dialog-input">Color: </label>
		<input type="text" id="colorpicker-dialog-input" name="colorpicker-dialog-input" size="12" />
		<input type="button" id="colorpicker-dialog-none" value="None" />
	</div>
</div>

{include file='action_editor.tpl'}

<div id="wrap">
	<div id="leftContent">
		<div id="appTitle">KnxWeb {$_config.version}</div>
		<div class="title">Menu</div>
		<div id="leftMenu" class="ui-helper-reset">
			<h3 tab_id="setup" tab_label="Configuration"><a href="#"><img src="images/setup.png"> Configuration</a></h3>
			<div>
				<div class="subItem" tab_id="general" tab_label="Général" tab_url="setup_general.php"><img src="images/home.png" /> General</div>
				<div class="subItem" tab_id="smsgateway" tab_label="Gateway SMS" tab_url="setup_smsgateway.php"><img src="images/phone.png" /> SMS gateway</div>
				<div class="subItem" tab_id="emailserver" tab_label="Serveur SMTP" tab_url="setup_emailserver.php"><img src="images/mail.png" /> SMTP</div>
				<div class="subItem" tab_id="logging" tab_label="Logging" tab_url="setup_logging.php"><img src="images/logging.png" /> Logging</div>
				<div class="subItem" onclick="saveConfig();"><img src="images/fetch.png" />Save Config</div>
			</div>

			<h3 tab_id="objects" tab_label="Objets" tab_url="setup_objects.php"><a href="#"><img src="images/object.png"> Objets</a></h3>
			<div>
				<div class="subItem" id="button-add-object"><img src="images/add.png" />Add objet</div>
				<div class="subItem" id="button-remove-object"><img src="images/remove.png" />Delete objet</div>
				<div class="subItem" id="button-edit-object"><img src="images/edit.png" />Edit objet</div>
				<div class="subItem" id="button-read-object"><img src="images/fetch.png" />Read/write objet value</div>
			</div>

			<h3 tab_id="ioports" tab_label="IO Ports" tab_url="setup_ioports.php"><a href="#"><img src="images/ioport.png"> IO Ports</a></h3>
			<div>
				<div class="subItem" id="button-add-ioport"><img src="images/add.png" />Add IO Port</div>
				<div class="subItem" id="button-remove-ioport"><img src="images/remove.png" />Delete IO Port</div>
				<div class="subItem" id="button-edit-ioport"><img src="images/edit.png" />Edit IO Port</div>
			</div>

			<h3 tab_id="rules" tab_label="Rules" tab_url="setup_rules.php"><a href="#"><img src="images/rules.png"> Rules</a></h3>
			<div>
				<div class="subItem" id="button-edit-rule" onclick="validRule()" ><img src="images/fetch.png" />Save rule</div>
				<div class="subItem" id="button-delete-rule" onclick="deleteRule()" ><img src="images/remove.png" />Delete rule</div>
				<div class="subItem" id="button-remove-rule" onclick="rules.deleteAllCurrentRule()"><img src="images/refresh.gif" />Init</div>
			</div>
			
			<h3 tab_id="events" tab_label="Events" tab_url="setup_events.php"><a href="#"><img src="images/rules.png"> Events</a></h3>
			<div>
				<div class="subItem" id="button-add-event"><img src="images/add.png" />Add new event</div>
				<div class="subItem" id="button-remove-event"><img src="images/remove.png" />Delete event</div>
				<div class="subItem" id="button-edit-event"><img src="images/edit.png" />Edit event</div>
				<div class="subItem" id="button-refresh-event" onclick="events.loadEventsStatusList();"><img src="images/refresh.gif" />Reload events</div>
			</div>
						
			<h3 tab_id="designedit" tab_label="Edit design" tab_url="setup_design.php"><a href="#"><img src="images/setup.png"> Edit design</a></h3>
			<div>
        <div class="subItem" id="button-add-design"><img src="images/add.png" />New design</div>
        <div class="subItem" id="button-add-new-zone"><img src="images/add.png" />New zone</div>
        <div class="subItem" id="button-remove-zone"><img src="images/remove.png" />Remove zone</div>

        <div class="subItem"><img src="images/add.png" />
        
        	<select onchange="design.newWidget($(this).val()); $(this).val('')" style="width:145px;height: 16px;">
						<option value="">Insert widget</option>
						{foreach from=$widgetsCategorized key=cat item=widgetsArray}
							<optgroup label="{$cat}">
								{foreach from=$widgetsArray item=w}
								<option value="{$w.name}">{$w.label}</option>
								{/foreach}
							</optgroup>
						{/foreach}
					</select>
				</div>

        <div class="subItem" id="button-try-design"><img src="images/display.png" />Try design</div>
        <div class="subItem" id="button-save-design"><img src="images/fetch.png" />Save</div>
        <div class="subItem" id="button-widgets-list"><input type="checkbox" onchange="$('#tab-design-list-widgets').toggle();" value="1" checked="1" > Widgets List</div>
      </div>

			<h3 tab_id="subpageedit" tab_label="Sub-pages" tab_url="setup_subpages.php"><a href="#"><img src="images/setup.png"> Sub-pages</a></h3>
			<div>
        <div class="subItem" id="button-add-subpage"><img src="images/add.png" />New sub-page</div>
        <div class="subItem" id="button-remove-subpage"><img src="images/remove.png" />Remove sub-page</div>
        <div class="subItem" id="button-subpage-parameters"><img src="images/edit.png" />Sub-page parameters</div>

        <div class="subItem"><img src="images/add.png" />
        
        	<select onchange="subpages.newWidget($(this).val()); $(this).val('')" style="width:145px;height: 16px;">
						<option value="">Insert widget</option>
						{foreach from=$widgetsCategorized key=cat item=widgetsArray}
							<optgroup label="{$cat}">
								{foreach from=$widgetsArray item=w}
								<option value="{$w.name}">{$w.label}</option>
								{/foreach}
							</optgroup>
						{/foreach}
					</select>
				</div>

        <div class="subItem" id="button-save-subpage"><img src="images/fetch.png" />Save</div>

      </div>
			
			<h3 tab_id="admin" tab_label="Administer" tab_url="setup_admin.php"><a href="#"><img src="images/construct.png"> Admin</a></h3>
			<div>
			  <!-- <div class="subItem" tab_id="admin-config-knxweb" tab_label="Config KnxWeb" tab_url="setup_admin.php?configknxweb"><img src="images/fetch.png" /> Config KnxWeb</div>
        <div class="subItem" tab_id="admin-config-log-objects" tab_label="Log of Objects" tab_url="setup_admin.php?logobjects"><img src="images/setup.png" /> Log of Objects</div>
			  <div class="subItem" tab_id="admin-config-log-linknx" tab_label="Log Linknx" ><img src="images/setup.png" /> Log Linknx</div> -->
      </div>
			
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
				<h3 style="color: #F00; font-weight: bold;">Please select a section to configure in the left menu.</h3>
			</div>
		</div>
	</div>
</div>

</body>
</html>