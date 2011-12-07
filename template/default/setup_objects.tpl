<script type="text/javascript" >
  var tab_objectTypes = {$json_objectTypes};
</script>

{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache, must-revalidate">

<div id="edit-object-dialog" style="display: none;">
<form id="edit-object-form">
<table class="form">
<tr>
<td width="65%">
<table class="form">
	<tr>
		<th>ID</th>
		<td>
			<input id="edit-object-id" name="edit-object-id" class="required" size="25" type="text">
		</td>
	</tr>
	<tr>
		<th>Name</th>
		<td><input id="edit-object-label" name="edit-object-label" size="30" type="text"></td>
	</tr>
	<tr>
		<th>Type</th>
		<td>{html_options name=dummy id="edit-object-type" options=$objectTypes}</td>
	</tr>
	<tr>
		<th>GAD</th>
		<td><input id="edit-object-gad" size="10" type="text"></td>
	</tr>
	<tr>
		<th>Flags</th>
		<td>
			<input id="edit-object-flag-c" type="checkbox"/><span title="Communication">c</span>
			<input id="edit-object-flag-r" type="checkbox"/><span title="Read">r</span>
			<input id="edit-object-flag-w" type="checkbox"/><span title="Write">w</span>
			<input id="edit-object-flag-t" type="checkbox"/><span title="Transmit">t</span>
			<input id="edit-object-flag-u" type="checkbox"/><span title="Update">u</span>
			<input id="edit-object-flag-s" type="checkbox"/><span title="Stateless">s</span>
		</td>
	</tr>
	<tr>
		<th>Initial value</th>
		<td>
			<select id="edit-object-init" > <!--onchange="if ($(this).val()=='') $('#edit-object-init-value').css('visibility','visible'); else $('#edit-object-init-value').css('visibility','hidden'); "-->
				<option value="request">request (read from bus)</option>
				<option value="persist">persist (read from persistant storage)</option>
				<option value="">autre (define a value)</option>
			</select>
			<input type="text" id="edit-object-init-value" size="4">
			<!-- <select id="edit-object-init-val-select"></select> -->
		</td>
	</tr>
	<tr>
		<th>History</th>
		<td><input id="edit-object-flag-log" type="checkbox"/><span title="Log">Record value change</span></td>
	</tr>
</table>

</td>
<td id="edit-object-td-listener" width="35%"></td>
</tr>

</table>
</form>
</div>

<div id="readwrite-object-dialog" style="display: none;">
<form id="readwrite-object-form">
<table class="form">
	<tr>
		<th>Object</th>
		<td>
			<select id="readwrite-object-id"></select>
		</td>
	</tr>
	<tr>
		<th>Value</th>
		<td>
			<select id="readwrite-object-val-select"></select>
			<input id="readwrite-object-val-input" size="10" type="text">
		</td>
	</tr>
	<tr>
		<th>Received value</th>
		<td><input id="readwrite-object-recv" readonly size="10" type="text"></td>
	</tr>
</table>
</form>
</div>

<table id="objects-tab-table">
	<thead>
		<tr>
			<th width="30%">Object</th>
			<th width="30%">Description</th>
			<th width="10%">GAD</th>
			<th width="30%">Type</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>