{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="widgetsubpagediv"></div>

<div id="tab-subpages-properties" title="Widget information">
	<div class="ui-state-active ui-corner-top header">
		Widget information
	</div>
	<div id="tab-subpages-widget-buttons">
		<button id="tab-subpages-delete-widget">Delete</button>
		<button id="tab-subpages-clone-widget">Clone</button>
	</div>
	<table cellpadding="0" cellspacing="0" id="tab-subpages-widget-properties">
		<tbody>
		</tbody>
	</table>

	<table cellpadding="0" cellspacing="0" id="tab-subpages-subpage-properties">
		<tbody>
			<tr>
				<th>Subpage</th>
				<td><select id="tab-subpages-list" onchange="subpages.draw($(this).val());"></select></td>
			</tr>
			<tr>
				<th>Width</th>
				<td><input type="text" id="tab-subpages-width"></td>
			</tr>
			<tr>
				<th>Height</th>
				<td><input type="text" id="tab-subpages-height"></td>
			</tr>
			<tr>
				<th>Background color</th>
				<td><input type="text" id="tab-subpages-color"></td>
			</tr>
		</tbody>
	</table>
</div>

<div id="tab-subpages-parameters" title="Sub-page parameters">
	<table id="tab-subpages-parameters-list">
		<thead>
			<th>ID</th>
			<th>Label</th>
			<th>Type</th>
			<th></th>
		</thead>
		<tbody>
		</tbody>
	</table>
	<img id="tab-subpages-parameters-add" src="images/add.png">
</div>
