{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}
				
<input type="checkbox" id="smsgateway-enable" value="1">Enable<br />
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
			<th>Username</th>
			<td><input type="text" class="required" name="smsgateway-username" id="smsgateway-username"></td>
		</tr>
		<tr>
			<th>Password</th>
			<td><input type="password" class="required" name="smsgateway-password" id="smsgateway-password"></td>
		</tr>
		<tr>
			<th>Password confirmation</th>
			<td><input type="password" class="required" id="smsgateway-password-confirm" id="smsgateway-password-confirm"><span class="error" style="color: #F00;display: none;"> Mot de passe différent</span></td>
		</tr>
		<tr>
			<th>API id</th>
			<td><input type="text" class="required" name="smsgateway-apiid" id="smsgateway-apiid"></td>
		</tr>		
		<tr class="minversion_0_0_1_29" >
			<th>From number</th>
			<td><input type="text" name="smsgateway-from" id="smsgateway-from"></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Save" id="smsgateway-button-save">