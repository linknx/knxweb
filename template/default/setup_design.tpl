{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="widgetdiv">
	<div id="notificationZone" class="notification"></div>
	<div id="background" ><img id="bgImage" src="images/1pixel.gif" /></div>
</div>

<div id="tab-design-fluxxml" title="Flux Xml"></div>

<div id="tab-design-list-widgets">
  <div class="ui-state-active ui-corner-top header">
    Widgets List
  </div>

  <table cellpadding="0" cellspacing="0" id="tab-design-widgets-list">
    <thead>
      <tr>
         <th>Widget type</th>
         <th>Description</th>
      </tr>
   </thead>
    <tbody>
    </tbody>
  </table>

</div>

<div id="tab-design-properties">
	<div class="ui-state-active ui-corner-top header">
		Widget information
	</div>
	
	<div id="tab-design-widget-buttons">
		<button id="button-delete-widget">Delete</button>
		<button id="button-clone-widget">Clone</button>
	</div>
	<table cellpadding="0" cellspacing="0" id="tab-design-widget-properties">
		<tbody>
		</tbody>
	</table>
	
	<table cellpadding="0" cellspacing="0" id="tab-design-design-properties">
		<tbody>
			<tr>
				<th>Design</th>
				<td><select id="tab-design-design-list"></select></td>
			</tr>
			<tr>
				<th>Zone</th>
				<td><select id="tab-design-zone-list" onchange="design.draw(this.value);"></select></td>
			</tr>
			<tr>
				<th>Design width</th>
				<td><input type="text" id="tab-design-width"></td>
			</tr>
			<tr>
				<th>Design height</th>
				<td><input type="text" id="tab-design-height"></td>
			</tr>
			<tr>
				<th>Zone background</th>
				<td><input type="text" readonly="1" id="tab-design-zone-background" onclick="design.changeZoneBackground();"></td>
			</tr>
			<tr>
				<th>Enable slider</th>
				<td><input type="checkbox" id="tab-design-slider" value="1"></td>
			</tr>
			<tr>
				<th>XML source</th>
				<td><button onclick="design.displayXML();">View</button></td>
			</tr>
		</tbody>
	</table>
</div>
