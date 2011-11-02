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
			<th>Confirmation mot de passe</th>
			<td><input type="password" class="required" id="smsgateway-password-confirm" id="smsgateway-password-confirm"><span class="error" style="color: #F00;display: none;"> Mot de passe différent</span></td>
		</tr>
		<tr>
			<th>API id</th>
			<td><input type="text" class="required" name="smsgateway-apiid" id="smsgateway-apiid"></td>
		</tr>		
		<tr class="minversion_0_0_1_29" >
			<th>From</th>
			<td><input type="text" name="smsgateway-from" id="smsgateway-from"><span style="color: #F00;"> Depuis la version 0.0.1.29 de linknx</span></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Enregistrer" id="smsgateway-button-save">