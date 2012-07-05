{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="exceptiondays-dialog" style="display: none;">
<form id="exceptiondays-form">
<table class="form">
	<tr>
		<th>{l lang="en"}Date{/l}</th>
		<td>
			<input id="exceptiondays-dialog-date" name="exceptiondays-dialog-date" class="required" type="text" size="10"> (jj/mm {l lang="en"}or{/l} jj/mm/aaaa)
		</td>
	</tr>
</table>
</form>
</div>


<form id="setupgeneral-form">
<table id="setupgeneral-tab-table">
	<tbody>
		<tr>
			<th>{l lang="en"}KNX connection{/l}</th>
			<td>
				<select id="setupgeneral-knxconnection-type">
					<option value="local">{l lang="en"}local{/l}</option>
					<option value="ip">{l lang="en"}IP{/l}</option>
				</select>
				<input type="text" class="required" name="setupgeneral-knxconnection-value" id="setupgeneral-knxconnection-value">
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}XML server type : por{/l}</th>
			<td>
				<select id="setupgeneral-xmlserver-type">
					<option value="inet">{l lang="en"}inet{/l}</option>
					<option value="unix">{l lang="en"}unix{/l}</option>
				</select>
				: <input type="text" class="required" name="setupgeneral-xmlserver-port" id="setupgeneral-xmlserver-port">
				<span style="color: #F00;">{l lang="en"}(If you change this value, you can not access linknx with knxweb without adapting your configuration in the Admin section){/l}</span>
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Persistance type{/l}</th>
			<td>
				<select id="setupgeneral-persistence-type">
					<option value="">{l lang="en"}disabled{/l}</option>
					<option value="file">{l lang="en"}file{/l}</option>
					<option value="mysql">{l lang="en"}Mysql{/l}</option>
				</select>			
			</td>
		</tr>
		<tr class="setupgeneral-persistence-file">
			<th>{l lang="en"}Persistance directory{/l}</th>
			<td><input type="text" name="setupgeneral-persistence-path" id="setupgeneral-persistence-path" size="40"></td>
		</tr>
		<tr class="setupgeneral-persistence-file">
			<th>{l lang="en"}Persistance log directory{/l}</th>
			<td><input type="text" name="setupgeneral-persistence-logpath" id="setupgeneral-persistence-logpath" size="40"></td>
		</tr>
		<tr class="setupgeneral-persistence-mysql">
			<th>{l lang="en"}Mysql connecion{/l}</th>
			<td>
				{l lang="en"}Server{/l} : <input type="text" class="required" name="setupgeneral-persistence-host" id="setupgeneral-persistence-host">
				{l lang="en"}Username{/l} : <input type="text" class="required" name="setupgeneral-persistence-user" id="setupgeneral-persistence-user">
				{l lang="en"}Password{/l} : <input type="password" class="required" name="setupgeneral-persistence-password" id="setupgeneral-persistence-password">
				{l lang="en"}Password confirmation{/l} : <input type="password" class="required" name="setupgeneral-persistence-password-confirm" id="setupgeneral-persistence-password-confirm">
				<span class="error" style="color: #F00;display: none;"> {l lang='en'}Password doesn't match{/l}</span>
			</td>
		</tr>
		<tr class="setupgeneral-persistence-mysql">
			<th>{l lang="en"}Database{/l}</th>
			<td>
				{l lang="en"}Base{/l} : <input type="text" class="required" name="setupgeneral-persistence-db" id="setupgeneral-persistence-db">
				{l lang="en"}Persistence table{/l} : <input type="text" class="required" name="setupgeneral-persistence-table" id="setupgeneral-persistence-table">
				{l lang="en"}Log table{/l} : <input type="text" class="required" name="setupgeneral-persistence-logtable" id="setupgeneral-persistence-logtable">
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Exception days{/l}</th>
			<td>
				<div style="float: left; width: 190px;">
					<select name="setupgeneral-exceptiondays" id="setupgeneral-exceptiondays" multiple size="15" style="width: 180px;">
					</select>
				</div>
				<div>
					<input type="button" value="{l lang='en'}Add{/l}" id="setupgeneral-exceptiondays-add" >
					<br /><br />
					<input type="button" value="{l lang='en'}Remove{/l}" id="setupgeneral-exceptiondays-remove">
				</div>
			</td>
		</tr>
		<tr>
			<th>{l lang='en'}Geographic coordinate{/l}</th>
			<td>
				{l lang='en'}Latitude{/l} : <input type="text" class="number" name="setupgeneral-location-lat" id="setupgeneral-location-lat" size="10">
				{l lang='en'}Longitude{/l} : <input type="text" class="number" name="setupgeneral-location-lon" id="setupgeneral-location-lon" size="10">
				{l lang='en'}(you can visit{/l} <a href="http://www.gorissen.info/Pierre/maps/googleMapLocationv3.php" target="_blank">{l lang='en'}this page{/l}</a> {l lang='en'}to find your coordinates){/l}
			</td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="{l lang='en'}Save{/l}" id="setupgeneral-button-save">
