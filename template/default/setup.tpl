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
    var i18n = {$_lang|json_encode};
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
            var creditsContent = $("#creditsContent");
            creditsContent.css("top", ($(window).height() - creditsContent.height()) / 2);
            creditsContent.css("left", ($(window).width() - creditsContent.width()) / 2);
            $('#creditsContent').toggle();
            setTimeout( function() { $('#creditsContent').toggleClass('knm'); } , 5000);
          }
        }, true);
      }
    </script>
		
</head>
<body style="cursor:progress;">

<div id="creditsContent">
Credits : <br />
 - Cyrille D. (zikibe) <br />
 - Jean-François M. (jef2000) <br />
 - Anthony P. (energy01) <br />
</div>

<div style="position: absolute; top: 0px; right: 0px;z-index: 1000;{if (!$MAJ_knxweb2) }display:none;{/if}">
  <span class="green"><i>&nbsp;{l lang='en'}New version on cvs{/l}&nbsp;</i></span>
</div>

<div id="loaderModal">
	<div id="loaderContent">
		<img src="images/loading.gif" /><br /><br />
		{l lang="en"}Loading, please wait{/l}
	</div>
</div>

<div id="widgetsTemplate" style="display: none;">

	{foreach from=$widgets key=id item=i}
		{include file="widgets/$id/widget.html"}
	{/foreach}

</div>

<div id="images-manager-dialog" style="display:none;">
	<div class="url">
		{l lang='en'}Use external URL{/l} : <input name="url" id="images-manager-dialog-url" type="text" size="50">
		<input type="button" id="images-manager-dialog-url-set" value="Set" onclick=""> (ex.: http://www.abc.com/123.jpg)
	</div>
	<div class="upload">
		{l lang='en'}Send a new file{/l} : <input name="file" id="images-manager-dialog-file" type="file">
	</div>
	<div class="info"></div>
	<div class="images">
	</div>
</div>

<div id="colorpicker-dialog" style="display:none;">
	<div id="colorpicker-dialog-picker"></div> 
	<div>
		<label for="colorpicker-dialog-input">{l lang='en'}Color{/l} : </label>
		<input type="text" id="colorpicker-dialog-input" name="colorpicker-dialog-input" size="12" />
		<input type="button" id="colorpicker-dialog-none" value="{l lang='en'}None{/l}" />
	</div>
</div>

{include file='action_editor.tpl'}

<div id="wrap">
	<div id="leftContent">
		<div id="appTitle">KnxWeb {$_config.version}</div>
		<div class="title">{l lang='en'}Menu{/l}</div>
		<div id="leftMenu" class="ui-helper-reset">
			<h3 tab_id="setup" tab_label="{l lang='en'}Configuration{/l}"><a href="#"><img src="images/setup.png"> {l lang='en'}Configuration{/l}</a></h3>
			<div>
				<div class="subItem" tab_id="general" tab_label="{l lang='en'}General{/l}" tab_url="setup_general.php"><img src="images/home.png" /> {l lang='en'}General{/l}</div>
				<div class="subItem" tab_id="smsgateway" tab_label="{l lang='en'}Gateway SMS{/l}" tab_url="setup_smsgateway.php"><img src="images/phone.png" /> {l lang='en'}SMS gateway{/l}</div>
				<div class="subItem" tab_id="emailserver" tab_label="{l lang='en'}Serveur SMTP{/l}" tab_url="setup_emailserver.php"><img src="images/mail.png" /> {l lang='en'}SMTP{/l}</div>
				<div class="subItem" tab_id="logging" tab_label="{l lang='en'}Logging{/l}" tab_url="setup_logging.php"><img src="images/logging.png" /> {l lang='en'}Logging{/l}</div>
				<div class="subItem" onclick="saveConfig();"><img src="images/fetch.png" />{l lang='en'}Save Config{/l}</div>
			</div>

			<h3 tab_id="objects" tab_label="{l lang='en'}Objets{/l}" tab_url="setup_objects.php"><a href="#"><img src="images/object.png"> {l lang='en'}Objects{/l}</a></h3>
			<div>
				<div class="subItem" id="button-add-object"><img src="images/add.png" />{l lang='en'}Add an object{/l}</div>
				<div class="subItem" id="button-remove-object"><img src="images/remove.png" />{l lang='en'}Delete object{/l}</div>
				<div class="subItem" id="button-edit-object"><img src="images/edit.png" />{l lang='en'}Edit object{/l}</div>
				<div class="subItem" id="button-read-object"><img src="images/fetch.png" />{l lang='en'}Read/write objet value{/l}</div>
			</div>

			<h3 tab_id="ioports" tab_label="{l lang='en'}IO Ports{/l}" tab_url="setup_ioports.php"><a href="#"><img src="images/ioport.png"> {l lang='en'}IO Ports{/l}</a></h3>
			<div>
				<div class="subItem" id="button-add-ioport"><img src="images/add.png" />{l lang='en'}Add IO Port{/l}</div>
				<div class="subItem" id="button-remove-ioport"><img src="images/remove.png" />{l lang='en'}Delete IO Port{/l}</div>
				<div class="subItem" id="button-edit-ioport"><img src="images/edit.png" />{l lang='en'}Edit IO Port{/l}</div>
			</div>

			<h3 tab_id="rules" tab_label="{l lang='en'}Rules{/l}" tab_url="setup_rules.php"><a href="#"><img src="images/rules.png"> {l lang='en'}Rules{/l}</a></h3>
			<div>
				<div class="subItem" id="button-edit-rule" onclick="validRule()" ><img src="images/fetch.png" />{l lang='en'}Save rule{/l}</div>
				<div class="subItem" id="button-delete-rule" onclick="deleteRule()" ><img src="images/remove.png" />{l lang='en'}Delete rule{/l}</div>
				<div class="subItem" id="button-remove-rule" onclick="rules.deleteAllCurrentRule();reloadloadRulesList();"><img src="images/refresh.gif" />{l lang='en'}Clear/Refresh{/l}</div>
			</div>
			
			<h3 tab_id="events" tab_label="{l lang='en'}Events{/l}" tab_url="setup_events.php"><a href="#"><img src="images/rules.png"> {l lang='en'}Events{/l}</a></h3>
			<div>
				<!-- <div class="subItem" id="button-add-event"><img src="images/add.png" />{l lang='en'}Add new event{/l}</div>
				<div class="subItem" id="button-remove-event"><img src="images/remove.png" />{l lang='en'}Delete event{/l}</div>
				<div class="subItem" id="button-edit-event"><img src="images/edit.png" />{l lang='en'}Edit event{/l}</div> -->
				<div class="subItem" id="button-refresh-event" onclick="events.loadEventsStatusList();"><img src="images/refresh.gif" />{l lang='en'}Reload events{/l}</div>
			</div>
						
			<h3 tab_id="designedit" tab_label="{l lang='en'}Edit design{/l}" tab_url="setup_design.php"><a href="#"><img src="images/setup.png"> {l lang='en'}Edit design{/l}</a></h3>
			<div>
        <div class="subItem" id="button-add-design"><img src="images/add.png" />{l lang='en'}New design{/l}</div>
        <div class="subItem" id="button-remove-design"><img src="images/remove.png" />{l lang='en'}Remove design{/l}</div>
        <div class="subItem" id="button-add-new-zone"><img src="images/add.png" />{l lang='en'}New zone{/l}</div>
        <div class="subItem" id="button-remove-zone"><img src="images/remove.png" />{l lang='en'}Remove zone{/l}</div>

        <div class="subItem"><img src="images/add.png" />
        
        	<select onchange="design.newWidget($(this).val()); $(this).val('')" style="width:145px;height: 16px;">
						<option value="">{l lang='en'}Insert widget{/l}</option>
						{foreach from=$widgetsCategorized key=cat item=widgetsArray}
							<optgroup label="{$cat}">
								{foreach from=$widgetsArray item=w}
								<option value="{$w.name}">{$w.label}</option> <!--  v{$w.version} -->
								{/foreach}
							</optgroup>
						{/foreach}
					</select>
				</div>

        <div class="subItem" id="button-try-design"><img src="images/display.png" />{l lang='en'}Try design{/l}</div>
        <div class="subItem" id="button-save-design"><img src="images/fetch.png" />{l lang='en'}Save{/l}</div>
        <div class="subItem" id="show-list-widgets-design"><input type="checkbox" id="show-list-widgets-design-checkbox" value="1" checked="1" > {l lang='en'}Widgets List{/l}</div>
      </div>

			<h3 tab_id="subpageedit" tab_label="{l lang='en'}Sub-pages{/l}" tab_url="setup_subpages.php"><a href="#"><img src="images/setup.png"> {l lang='en'}Sub-pages{/l}</a></h3>
			<div>
        <div class="subItem" id="button-add-subpage"><img src="images/add.png" />{l lang='en'}New sub-page{/l}</div>
        <!-- <div class="subItem" id="button-clone-subpage"><img src="images/add.png" />{l lang='en'}Clone sub-page{/l}</div> -->
        <div class="subItem" id="button-remove-subpage"><img src="images/remove.png" />{l lang='en'}Remove sub-page{/l}</div>
        <div class="subItem" id="button-subpage-parameters"><img src="images/edit.png" />{l lang='en'}Sub-page parameters{/l}</div>

        <div class="subItem"><img src="images/add.png" />
        
        	<select onchange="subpages.newWidget($(this).val()); $(this).val('')" style="width:145px;height: 16px;">
						<option value="">{l lang='en'}Insert widget{/l}</option>
						{foreach from=$widgetsCategorized key=cat item=widgetsArray}
							<optgroup label="{$cat}">
								{foreach from=$widgetsArray item=w}
								<option value="{$w.name}">{$w.label}</option>
								{/foreach}
							</optgroup>
						{/foreach}
					</select>
				</div>

        <div class="subItem" id="button-save-subpage"><img src="images/fetch.png" />{l lang='en'}Save{/l}</div>
        <div class="subItem" id="show-list-widgets-subpage"><input type="checkbox" id="show-list-widgets-subpage-checkbox" value="1" checked="1" > {l lang='en'}Widgets List{/l}</div>
				<div class="subItem" id="button-refresh-subpages" onclick="subpages.clear();subpages.load();var firstsubpage=$('#tab-subpages-list option:first-child').val();if (firstsubpage) subpages.draw(firstsubpage);"><img src="images/refresh.gif" />{l lang='en'}Refresh Subpages List{/l}</div>
      </div>

			<!-- <h3 tab_id="designeditmobile" tab_label="{l lang='en'}Edit design mobile{/l}" tab_url="setup_design_mobile.php"><a href="#"><img src="images/setup.png"> {l lang='en'}Edit design mobile{/l}</a></h3>
			<div>
        <div class="subItem" id="button-add-design-mobile"><img src="images/add.png" />{l lang='en'}New design{/l}</div>
        <div class="subItem">
  				{l lang='en'}List design{/l}
          <select id="tab-design-mobile-design-list"></select>
  			</div>
        <div class="subItem" id="button-add-new-zone-mobile"><img src="images/add.png" />{l lang='en'}New zone{/l}</div>
        <div class="subItem" id="button-remove-zon-mobilee"><img src="images/remove.png" />{l lang='en'}Remove zone{/l}</div>
        <div class="subItem"><img src="images/add.png" />
        	<select onchange="designmobile.newWidget($(this).val()); $(this).val('')" style="width:145px;height: 16px;">
						<option value="">{l lang='en'}Insert widget{/l}</option>
						{foreach from=$widgetsCategorized key=cat item=widgetsArray}
							<optgroup label="{$cat}">
								{foreach from=$widgetsArray item=w}
								<option value="{$w.name}">{$w.label}</option>
								{/foreach}
							</optgroup>
						{/foreach}
					</select>
				</div>
        <div class="subItem" id="button-try-design-mobile"><img src="images/display.png" />{l lang='en'}Try design{/l}</div>
        <div class="subItem" id="button-save-design-mobile"><img src="images/fetch.png" />{l lang='en'}Save{/l}</div>
        <div class="subItem" ><input type="checkbox" onchange="$('#tab-design-mobile-list-widgets').toggle();" > {l lang='en'}Widgets List{/l}</div>
      </div> -->			
			<h3 tab_id="admin" tab_label="{l lang='en'}Administer{/l}" tab_url="setup_admin.php"><a href="#"><img src="images/construct.png"> {l lang='en'}Admin{/l}</a></h3>
			<div>
			  <!-- <div class="subItem" tab_id="admin-config-knxweb" tab_label="{l lang='en'}Config KnxWeb{/l}" tab_url="setup_admin.php?configknxweb"><img src="images/fetch.png" /> {l lang='en'}Config KnxWeb{/l}</div>
        <div class="subItem" tab_id="admin-config-log-objects" tab_label="{l lang='en'}Log of Objects{/l}" tab_url="setup_admin.php?logobjects"><img src="images/setup.png" /> {l lang='en'}Log of Objects{/l}</div>
			  <div class="subItem" tab_id="admin-config-log-linknx" tab_label="{l lang='en'}Log Linknx{/l}" ><img src="images/setup.png" /> {l lang='en'}Log Linknx{/l}</div> -->
      </div>
			
		</div>
		<div id="propertiesContainer">
			<div class="title">{l lang='en'}Properties{/l}</div>
		</div>
	</div>
	
	<div id="mainContent">

		<div id="tabs">
			<ul>
				<li><a href="#tab-setup">{l lang='en'}Configuration{/l}</a></li>
			</ul>
			<div id="tab-setup">
				<h3 style="color: #F00; font-weight: bold;">{l lang='en'}Please select a section to configure in the left menu.{/l}</h3>
			</div>
      
  	</div>
    
		</div>
    
    <div id="OptionContainer" class="ui-widget-content" style="#height:40px;display:none;">
      <div id="openOptionContainer" class="ui-button ui-state-default ui-button-icon-only ui-corner-top" >
        <span class="ui-icon ui-icon-circle-triangle-s"></span>
      </div>
  	</div>
</div>

</body>
</html>