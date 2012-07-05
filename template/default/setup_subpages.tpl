{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="widgetsubpagediv"></div>

<div id="tab-subpages-list-widgets">
  <div class="ui-state-active ui-corner-top header">
    {l lang='en'}Widgets List{/l}
    <div style="float:right;margin-left: 7px;" class="minus ui-button ui-widget ui-state-default ui-corner-all">
      <span class="ui-icon ui-icon-minus"></span>
    </div>
    <div style="float:right;margin-left: 1px;" class="down ui-button ui-widget ui-state-default ui-corner-all ui-state-highlight">
      <span class="ui-icon ui-icon-arrowthick-1-s"></span>
    </div>
    <div style="float:right;margin-left: 1px;" class="up ui-button ui-widget ui-state-default ui-corner-all ui-state-highlight">
      <span class="ui-icon ui-icon-arrowthick-1-n"></span>
    </div>
  </div>
  <div id="tab-subpages-widgets-list-div" style="height: 280px;overflow: auto;">
    <table cellpadding="0" cellspacing="0" id="tab-subpages-widgets-list">
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

<div id="tab-subpages-properties" title="{l lang='en'}Widget information{/l}">
	<div class="ui-state-active ui-corner-top header">
		{l lang='en'}Widget information{/l}
	</div>
	<div id="tab-subpages-widget-buttons">
		<button id="tab-subpages-delete-widget">{l lang='en'}Delete{/l}</button>
		<button id="tab-subpages-clone-widget">{l lang='en'}Clone{/l}</button>
	</div>
	<table cellpadding="0" cellspacing="0" id="tab-subpages-widget-properties">
		<tbody>
		</tbody>
	</table>

	<table cellpadding="0" cellspacing="0" id="tab-subpages-subpage-properties">
		<tbody>
			<tr>
				<th>{l lang='en'}Subpage{/l}</th>
				<th style="width: 15px;"></th>
				<td><select id="tab-subpages-list" onchange="subpages.draw($(this).val());"></select></td>
			</tr>
			<tr>
				<th>{l lang='en'}Width{/l}</th>
				<th style="width: 15px;"></th>
				<td><input type="text" id="tab-subpages-width"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Height{/l}</th>
				<th style="width: 15px;"></th>
				<td><input type="text" id="tab-subpages-height"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Background color{/l}</th>
				<th style="width: 15px;"></th>
				<td><input type="text" id="tab-subpages-color"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Background image{/l}</th>
				<th style="width: 15px;"><input type="checkbox" id="tab-subpages-background-toggle"></th>
				<td>
					<input type="text" id="tab-subpages-background">
					<select id="tab-subpages-background-list" style="display:none;">
				</td>
			</tr>
		</tbody>
	</table>
</div>

<div id="tab-subpages-parameters" title="{l lang='en'}Sub-page parameters{/l}">
	<table id="tab-subpages-parameters-list">
		<thead>
			<th>{l lang='en'}ID{/l}</th>
			<th>{l lang='en'}Label{/l}</th>
			<th>{l lang='en'}Type{/l}</th>
			<th></th>
		</thead>
		<tbody>
		</tbody>
	</table>
	<img id="tab-subpages-parameters-add" src="images/add.png">
</div>
