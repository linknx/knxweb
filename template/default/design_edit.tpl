<div class="menuTitle"></div>
<div id="notificationZone" class="notification"></div>
<div id="background" ><img id="bgImage" src="images/1pixel.gif" /></div>
<div id="widgetdiv" ></div>

<div id="changeImage">
	<table align="center" cellpadding="5">
		<tr>
      <td><h4>Background selection</h4><div id="bgImages"></div></td>
    </tr>
		<tr>
      <td align="right"><input type="button" onclick="$('#changeImage').css('display', 'none');" value="Cancel" /></td>
    </tr>
	</table>
</div>

<div id="fluxxml" title="Flux Xml"></div>

<div id="menu">
	<h3><a href="#">Design</a></h3>
	<div>
		<a onclick="modifyCurrentZone(); return false" href="#" name="modifyZoneLayout">Modify layout</a><br />
		<input type="text" size="3" value="16">	<input type="checkbox"><br />
		<a onclick="saveDesign(); return false" href="#" name="saveDesign">Save design</a><br />
		<a onclick="displayDesign(); return false" href="#" name="displayDesign">Display design (XML)</a><br />
		<a href="index.html" name="gotoDesignList">Design list</a><br />
		<a name="addDesign" href="#" onclick="addDesign(); return false">Add new design</a><br />
	</div>
  <h3><a href="#">Zones</a></h3>
	<div>
    <select id="selectedZone" name="selectedZone" onchange="UIController.drawZone(this.value);"></select>
		<a href="javascript:addZone();"><img src="images/add.png"></a>
		<a href="javascript:delZone();"><img src="images/remove.png"></a><br />
		<a name="modifyBackground" href="" onclick="modifyBgImage(); return false">Modify background</a><br />
	</div>
	
	{foreach from=$widgets key=cat item=widgetsArray}

		<h3><a href="#">{$cat}</a></h3>
		<div>
			{foreach from=$widgetsArray item=w}
			<button id="{$w.name}" onclick="editWidget('{$w.name}','{$w.description}')">{$w.label}</button><br />
			{/foreach}
		</div>

	{/foreach}
	
</div>
