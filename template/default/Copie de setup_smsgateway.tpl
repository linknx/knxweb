{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}
				
<input type="checkbox" id="smsgateway-enable" value="1">Activé<br />
<br />
<form id="smsgateway-form">
<table id="smsgateway-tab-table">
	<tbody>
		<tr>
			<th>Type</th>
			<td>
				<select id="smsgateway-type">
					<option value="clickatell">Clickatell</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>Nom d'utilisateur</th>
			<td><input type="text" class="required" name="smsgateway-username" id="smsgateway-username"></td>
		</tr>
		<tr>
			<th>Mot de passe</th>
			<td><input type="password" class="required" name="smsgateway-password" id="smsgateway-password"></td>
		</tr>
		<tr>
			<th>API id</th>
			<td><input type="text" class="required" name="smsgateway-apiid" id="smsgateway-apiid"></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Enregistrer" id="smsgateway-button-save">