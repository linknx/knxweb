{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="exceptiondays-dialog" style="display: none;">
<form id="exceptiondays-form">
<table class="form">
	<tr>
		<th>Date</th>
		<td>
			<input id="exceptiondays-dialog-date" name="exceptiondays-dialog-date" class="required" type="text" size="10"> (jj/mm ou jj/mm/aaaa)
		</td>
	</tr>
</table>
</form>
</div>


<form id="setupgeneral-form">
<table id="setupgeneral-tab-table">
	<tbody>
		<tr>
			<th>Connexion KNX</th>
			<td>
				<select id="setupgeneral-knxconnection-type">
					<option value="local">local</option>
					<option value="ip">IP</option>
				</select>
				<input type="text" class="required" name="setupgeneral-knxconnection-value" id="setupgeneral-knxconnection-value">
			</td>
		</tr>
		<tr>
			<th>XML server type : port</th>
			<td>
				<select id="setupgeneral-xmlserver-type">
					<option value="inet">inet</option>
					<option value="unix">unix</option>
				</select>
				: <input type="text" class="required" name="setupgeneral-xmlserver-port" id="setupgeneral-xmlserver-port">
				<span style="color: #F00;">(si vous modifiez cette valeur, vous ne pourrez plus accéder à linknx via knxweb sans une adaptation de votre configuration)</span>
			</td>
		</tr>
		<tr>
			<th>Type de persistance</th>
			<td>
				<select id="setupgeneral-persistence-type">
					<option value="disabled">disabled</option>
					<option value="file">file</option>
					<option value="mysql">Mysql</option>
				</select>			
			</td>
		</tr>
		<tr class="setupgeneral-persistence-file">
			<th>Répertoire de persistance</th>
			<td><input type="text" class="required" name="setupgeneral-persistence-path" id="setupgeneral-persistence-path" size="40"></td>
		</tr>
		<tr class="setupgeneral-persistence-file">
			<th>Répertoire de log persistance</th>
			<td><input type="text" class="" name="setupgeneral-persistence-logpath" id="setupgeneral-persistence-logpath" size="40"></td>
		</tr>
		<tr class="setupgeneral-persistence-mysql">
			<th>Connexion à Mysql</th>
			<td>
				Serveur : <input type="text" class="required" name="setupgeneral-persistence-host" id="setupgeneral-persistence-host">
				Nom d'utilisateur : <input type="text" class="required" name="setupgeneral-persistence-user" id="setupgeneral-persistence-user">
				Mot de passe : <input type="password" class="required" name="setupgeneral-persistence-password" id="setupgeneral-persistence-password">
			</td>
		</tr>
		<tr class="setupgeneral-persistence-mysql">
			<th>Base de donnée</th>
			<td>
				Base : <input type="text" class="required" name="setupgeneral-persistence-db" id="setupgeneral-persistence-db">
				Table persistence : <input type="text" class="required" name="setupgeneral-persistence-table" id="setupgeneral-persistence-table">
				Table Log : <input type="text" class="required" name="setupgeneral-persistence-logtable" id="setupgeneral-persistence-logtable">
			</td>
		</tr>
		<tr>
			<th>Dates exceptionnelles</th>
			<td>
				<div style="float: left; width: 190px;">
					<select name="setupgeneral-exceptiondays" id="setupgeneral-exceptiondays" multiple size="15" style="width: 180px;">
					</select>
				</div>
				<div>
					<input type="button" value="Ajouter" id="setupgeneral-exceptiondays-add"><br /><br />
					<!-- <input type="button" value="Supprimer" id="setupgeneral-exceptiondays-remove"> -->
				</div>
			</td>
		</tr>
		<tr>
			<th>Positions géographiques</th>
			<td>
				Latitude : <input type="text" class="number" name="setupgeneral-location-lat" id="setupgeneral-location-lat" size="10">
				Longitude : <input type="text" class="number" name="setupgeneral-location-lon" id="setupgeneral-location-lon" size="10">
				(vous pouvez vous rendre sur <a href="http://www.gorissen.info/Pierre/maps/googleMapLocationv3.php" target="_blank">cette page</a> pour chercher vos coordonnées)
			</td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Enregistrer" id="setupgeneral-button-save">
