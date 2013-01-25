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
		<th>{l lang='en'}Id{/l}</th>
		<td>
			<input id="edit-object-id" name="edit-object-id" class="required" size="25" type="text"><br />
      <span style="color: #F00;">{l lang='en'}for Id use only alphanumeric characters, - , _ , and NO SPACES{/l}</span>
		</td>
	</tr>
	<tr>
		<th>{l lang='en'}Name{/l}</th>
		<td><input id="edit-object-label" name="edit-object-label" size="50" type="text"></td>
	</tr>
	<tr>
		<th>{l lang='en'}Type{/l}</th>
		<td>{html_options name=dummy id="edit-object-type" options=$objectTypes}</td>
	</tr>
	<tr>
		<th>{l lang='en'}GAD{/l}</th>
		<td><input id="edit-object-gad" size="10" type="text"></td>
	</tr>
	<tr>
		<th>{l lang='en'}Flags{/l}</th>
		<td>
			<input id="edit-object-flag-c" type="checkbox"/><span title="{l lang='en'}Communication{/l}">c</span>
			<input id="edit-object-flag-r" type="checkbox"/><span title="{l lang='en'}Read{/l}">r</span>
			<input id="edit-object-flag-w" type="checkbox"/><span title="{l lang='en'}Write{/l}">w</span>
			<input id="edit-object-flag-t" type="checkbox"/><span title="{l lang='en'}Transmit{/l}">t</span>
			<input id="edit-object-flag-u" type="checkbox"/><span title="{l lang='en'}Update{/l}">u</span>
			<!-- <input id="edit-object-flag-s" type="checkbox"/><span title="{l lang='en'}Stateless{/l}">s</span> -->
      <input id="edit-object-flag-f" type="checkbox"/><span title="{l lang='en'}Force Write{/l}">f</span>
      <span style="color: #F00;">{l lang='en'}by default : "cwtu"{/l}</span>
		</td>
	</tr>
	<tr>
		<th>{l lang='en'}Initial value{/l}</th>
		<td>
			<select id="edit-object-init" > <!--onchange="if ($(this).val()=='') $('#edit-object-init-value').css('visibility','visible'); else $('#edit-object-init-value').css('visibility','hidden'); "-->
				<option value="request">{l lang='en'}request (read from bus){/l}</option>
				<option value="persist">{l lang='en'}persist (read from persistant storage){/l}</option>
				<option value="">{l lang='en'}other (define a value){/l}</option>
			</select>
			<input type="text" id="edit-object-init-value" size="4">
			<!-- <select id="edit-object-init-val-select"></select> -->
		</td>
	</tr>
	<tr>
		<th>History</th>
		<td><input id="edit-object-flag-log" type="checkbox"/><span title="Log">{l lang='en'}Record value change{/l}</span></td>
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
		<th>{l lang='en'}Object{/l}</th>
		<td>
			<select id="readwrite-object-id"></select>
		</td>
	</tr>
	<tr>
		<th>{l lang='en'}Value{/l}</th>
		<td>
			<select id="readwrite-object-val-select"></select>
			<input id="readwrite-object-val-input" size="10" type="text">
		</td>
	</tr>
	<tr>
		<th>{l lang='en'}Received value{/l}</th>
		<td><input id="readwrite-object-recv" readonly size="10" type="text"></td>
	</tr>
</table>
</form>
</div>
<div id="objects-tab-table-div">
  <table id="objects-tab-table">
  	<thead>
  		<tr>
  			<th width="25%">{l lang='en'}Object{/l}</th>
  			<th width="10%">{l lang='en'}Value{/l}</th>
  			<th width="30%">{l lang='en'}Name{/l}</th>
  			<th width="10%">{l lang='en'}GAD{/l}</th>
  			<th width="25%">{l lang='en'}Type{/l}</th>
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
</div>

{if ($fileETSexist)}
{include file='setup_objects_ets.tpl'}
{/if}