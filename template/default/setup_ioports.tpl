{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="edit-ioport-dialog" style="display: none;">
<form id="edit-ioport-form">
<table class="form">
	<tbody>
		<tr>
			<th width="150">ID</th>
			<td>
				<input id="edit-ioport-id" name="edit-ioport-id" class="required" type="text">
			</td>
		</tr>
		<tr>
			<th>Type</th>
			<td>
				<input type="radio" name="edit-ioport-type" id="edit-ioport-type-tcp" checked>TCP
				<input type="radio" name="edit-ioport-type" id="edit-ioport-type-udp">UDP
				<input type="radio" name="edit-ioport-type" id="edit-ioport-type-serial">Serial (RS232)
			</td>
		</tr>
	</tbody>

	<tbody id="edit-ioport-udp-tbody">
		<tr>
			<th>Host</th>
			<td><input name="edit-ioport-udp-host" id="edit-ioport-udp-host" class="required" type="text"> (ex.: 192.168.0.2)</td>
		</tr>
		<tr>
			<th>Port</th>
			<td><input name="edit-ioport-udp-port" id="edit-ioport-udp-port" class="number required" size="5" type="text"> (ex.: 20000)</td>
		</tr>
		<tr>
			<th>RX Port</th>
			<td><input name="edit-ioport-udp-rxport" id="edit-ioport-udp-rxport" class="number required" size="5" type="text"> (ex.: 20001)</td>
		</tr>
	</tbody>

	<tbody id="edit-ioport-tcp-tbody">
		<tr>
			<th>Host</th>
			<td><input name="edit-ioport-tcp-host" id="edit-ioport-tcp-host" class="required" type="text"> (ex.: 192.168.0.2)</td>
		</tr>
		<tr>
			<th>Port</th>
			<td><input name="edit-ioport-tcp-port" id="edit-ioport-tcp-port" class="number required" size="5" type="text"> (ex.: 20000)</td>
		</tr>
		<tr>
			<th>Persistent connection</th>
			<td><input name="edit-ioport-tcp-permanent" id="edit-ioport-tcp-permanent" type="checkbox"></td>
		</tr>
	</tbody>

	<tbody id="edit-ioport-serial-tbody">
		<tr>
			<th>Port</th>
			<td><input name="edit-ioport-serial-dev" id="edit-ioport-serial-dev" class="required" type="text"> (ex.: /dev/ttyS0)</td>
		</tr>
		<tr>
			<th>Speed</th>
			<td><input name="edit-ioport-serial-speed" id="edit-ioport-serial-speed" class="number required" size="5" type="text"> (ex.: 9600)</td>
		</tr>
		<tr>
			<th>Framing</th>
			<td><input name="edit-ioport-serial-framing" id="edit-ioport-serial-framing" class="required" size="5" type="text"> (ex.: 8N1)</td>
		</tr>
		<tr>
			<th>Flow</th>
			<td>
				<select id="edit-ioport-serial-flow">
					<option value="none">None</option>
					<option value="xon-xoff">xon-xoff</option>
					<option value="rts-cts">rts-cts</option>
				</select>
			</td>
		</tr>
	</tbody>
</table>
</form>
</div>

<table id="ioports-tab-table">
	<thead>
		<tr>
			<th width="33%">ID</th>
			<th width="33%">Type</th>
			<th width="33%">Serial port/hostname</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>
