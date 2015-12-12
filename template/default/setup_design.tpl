{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="widgetdiv">
	<div id="notificationZone" class="notification"></div>
</div>

<div id="tab-design-fluxxml" title="Flux Xml" style="display: none;"></div>

<div id="tab-design-list-widgets">
  <div class="ui-state-active ui-corner-top header">
    {l lang='en'}Widgets List{/l}
    <div style="float:right;margin-left: 7px;" class="minus ui-button ui-widget ui-state-default ui-corner-all">
      <span class="ui-icon ui-icon-minus"></span>
    </div>
    <div style="float:right;" class="down ui-button ui-widget ui-state-default ui-corner-all ui-state-highlight">
      <span class="ui-icon ui-icon-arrowthick-1-s"></span>
    </div>
    <div style="float:right;" class="up ui-button ui-widget ui-state-default ui-corner-all ui-state-highlight">
      <span class="ui-icon ui-icon-arrowthick-1-n"></span>
    </div>
  </div>
  <div style="height: 280px;overflow: auto;overflow-x: hidden;padding: 1px;">
    <table cellpadding="0" cellspacing="0" id="tab-design-widgets-list">
      <thead>
        <tr>
           <th>{l lang='en'}Widget type{/l}</th>
           <th>{l lang='en'}Description{/l}</th>
        </tr>
     </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</div>

<div id="tab-design-properties">
	<div class="ui-state-active ui-corner-top header">
		{l lang='en'}Widget information{/l}
	</div>
	
	<div id="tab-design-widget-buttons" style="display:none;" >
		<button id="button-delete-widget">{l lang='en'}Delete{/l}</button>
		<button id="button-clone-widget">{l lang='en'}Clone{/l}</button>
    <button id="button-locked-widget">{l lang='en'}Locked{/l}</button>
    <button id="button-attach-widget">{l lang='en'}Attach to Design{/l}</button>
	</div>
  <div style="max-height: 600px;overflow: auto;overflow-x: hidden;padding: 1px;">
	<table cellpadding="0" cellspacing="0" id="tab-design-widget-properties">
		<tbody>
		</tbody>
	</table>
	
	<table cellpadding="0" cellspacing="0" id="tab-design-design-properties">
		<tbody>
			<tr>
				<th>{l lang='en'}Design{/l}</th>
				<td><select id="tab-design-design-list"></select></td>
			</tr>
			<tr>
				<th>{l lang='en'}Design width{/l}</th>
				<td><input type="text" id="tab-design-width"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Design height{/l}</th>
				<td><input type="text" id="tab-design-height"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Enable slider{/l}</th>
				<td><input type="checkbox" id="tab-design-slider" value="1"></td>
			</tr>
      <tr>
        <th class="separator" colspan="2"></th>
      </tr>
			<tr>
				<th>{l lang='en'}Grid{/l}</th>
				<td><input type="checkbox" id="tab-design-grid" value="1" style="width:auto;"><input type="text" value="1"  size="4" style="width:auto;" id="tab-design-grid-width" ></td>
			</tr>
			<tr>
				<th>{l lang='en'}Widget size attach to the Grid{/l}</th>
				<td><input type="checkbox" id="tab-design-grid-widgetsize" value="1" style="width:auto;"></td>
			</tr>
      <tr>
        <th class="separator" colspan="2"></th>
      </tr>
			<tr>
				<th>{l lang='en'}Floating Widgets{/l}</th>
				<td><input type="checkbox" id="tab-design-floating" value="1" style="width:auto;"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Margin Widgets{/l}</th>
				<td><input type="text" id="tab-design-margin" value="10" ></td>
			</tr>
      <tr>
        <th class="separator" colspan="2"></th>
      </tr>
			<tr>
				<th>{l lang='en'}Effects{/l}</th>
				<td><select id="tab-design-effect"></select></td>
			</tr>
			<tr>
				<th>{l lang='en'}XML source{/l}</th>
				<td><button onclick="design.displayXML();">{l lang='en'}View{/l}</button></td>
			</tr>
      <tr>
        <th class="separator" colspan="2"></th>
      </tr>
			<tr>
				<th><button onclick="design.addZone();">{l lang='en'}New Zone{/l}</button></th>
				<td><button onclick="design.removeCurrentZone();">{l lang='en'}Remove Current Zone{/l}</button></td>
			</tr>
      <tr>
        <th class="separator" colspan="2"></th>
      </tr>
			<tr>
				<th>{l lang='en'}Current Zone{/l}</th>
				<td><select id="tab-design-zone-list" onchange="design.draw(this.value);"></select></td>
			</tr>
			<tr>
				<th>{l lang='en'}Zone background{/l}</th>
				<td><input type="text" readonly="1" id="tab-design-zone-background" onclick="design.changeZoneBackground();"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Display "global" Widgets{/l}</th>
				<td><input type="checkbox" id="tab-design-zone-globalcontrol" checked="checked" ></td>
			</tr>
			<tr>
				<th>{l lang='en'}Current Zone{/l}</th>
				<td><button onclick="design.cloneCurrentZone();">{l lang='en'}Clone{/l}</button></td>
			</tr>
		</tbody>
	</table>
  </div>
</div>

<div id="design-zones-list">
  <div class="ui-state-active ui-corner-top header">
    {l lang='en'}Zones List{/l}
    <div style="float:right;margin-left: 7px;" class="minus ui-button ui-widget ui-state-default ui-corner-all">
      <span class="ui-icon ui-icon-minus"></span>
    </div>
    <div style="float:right;" class="down ui-button ui-widget ui-state-default ui-corner-all ui-state-highlight">
      <span class="ui-icon ui-icon-arrowthick-1-s"></span>
    </div>
    <div style="float:right;" class="up ui-button ui-widget ui-state-default ui-corner-all ui-state-highlight">
      <span class="ui-icon ui-icon-arrowthick-1-n"></span>
    </div>
  </div>
  <div style="height: 280px;overflow: auto;overflow-x: hidden;padding: 1px;">
    <table cellpadding="0" cellspacing="0" id="tab-design-zones-list">
      <thead>
        <tr>
           <th>{l lang='en'}Id{/l}</th>
           <th>{l lang='en'}Name{/l}</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</div>
