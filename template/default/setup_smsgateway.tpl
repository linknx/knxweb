{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}
				
<input type="checkbox" id="smsgateway-enable" value="1">{l lang='en'}Enable{/l}<br />
<br />
<form id="smsgateway-form">
<table id="smsgateway-tab-table">
	<tbody>
		<tr>
			<th>{l lang='en'}Type{/l}</th>
			<td>
				<select id="smsgateway-type">
					<option value="clickatell">{l lang='en'}Clickatell{/l}</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>{l lang='en'}Username{/l}</th>
			<td><input type="text" class="required" name="smsgateway-username" id="smsgateway-username"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Password{/l}</th>
			<td><input type="password" class="required" name="smsgateway-password" id="smsgateway-password"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Password confirmation{/l}</th>
			<td><input type="password" class="required" id="smsgateway-password-confirm" id="smsgateway-password-confirm">
        <span class="error" style="color: #F00;display: none;"> {l lang='en'}Password doesn't match{/l}</span></td>
		</tr>
		<tr>
			<th>{l lang='en'}API id{/l}</th>
			<td><input type="text" class="required" name="smsgateway-apiid" id="smsgateway-apiid"></td>
		</tr>		
		<tr>
			<th>{l lang='en'}From number{/l}</th>
			<td><input type="text" name="smsgateway-from" id="smsgateway-from"></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="{l lang='en'}Save{/l}" id="smsgateway-button-save">