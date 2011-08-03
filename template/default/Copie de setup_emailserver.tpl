{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}
				
<input type="checkbox" id="emailserver-enable" value="1">Activé<br />
<br />
<form id="emailserver-form">
<table id="emailserver-tab-table">
	<tbody>
		<tr>
			<th>Type</th>
			<td>
				<select id="emailserver-type">
					<option value="smtp">smtp</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>Serveur(:port)</th>
			<td><input type="text" class="required" name="emailserver-host" id="emailserver-host"></td>
		</tr>
		<tr>
			<th>Nom d'utilisateur</th>
			<td><input type="text" id="emailserver-user"></td>
		</tr>
		<tr>
			<th>Mot de passe</th>
			<td><input type="text" id="emailserver-pass"></td>
		</tr>
		<tr>
			<th>Expéditeur</th>
			<td><input type="text" class="required" name="emailserver-from" id="emailserver-from"></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Enregistrer" id="emailserver-button-save">