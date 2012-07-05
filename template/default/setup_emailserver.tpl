{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}
				
<input type="checkbox" id="emailserver-enable" value="1">{l lang='en'}Enable{/l}<br />
<br />
<form id="emailserver-form">
<table id="emailserver-tab-table">
	<tbody>
		<tr>
			<th>{l lang='en'}Type{/l}</th>
			<td>
				<select id="emailserver-type">
					<option value="smtp">{l lang='en'}smtp{/l}</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>{l lang='en'}Serveur(:port){/l}</th>
			<td><input type="text" class="required" name="emailserver-host" id="emailserver-host"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Username{/l}</th>
			<td><input type="text" id="emailserver-login" size="40"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Password{/l}</th>
			<td><input type="password" id="emailserver-pass"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Password confirmation{/l}</th>
			<td><input type="password" id="emailserver-pass-confirm"><span class="error" style="color: #F00;display: none;"> {l lang='en'}Password doesn't match{/l}</span></td>
		</tr>
		<tr>
			<th>{l lang='en'}From{/l}</th>
			<td><input type="text" class="required" name="emailserver-from" id="emailserver-from" size="40"></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="{l lang='en'}Save{/l}" id="emailserver-button-save">