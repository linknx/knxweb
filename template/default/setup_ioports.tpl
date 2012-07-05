{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="edit-ioport-dialog" style="display: none;">
<form id="edit-ioport-form">
<table class="form">
	<tbody>
		<tr>
			<th width="150">{l lang="en"}ID{/l}</th>
			<td>
				<input id="edit-ioport-id" name="edit-ioport-id" class="required" type="text">
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Type{/l}</th>
			<td>
				<input type="radio" name="edit-ioport-type" id="edit-ioport-type-tcp" checked>{l lang="en"}TCP{/l}
				<input type="radio" name="edit-ioport-type" id="edit-ioport-type-udp">{l lang="en"}UDP{/l}
				<input type="radio" name="edit-ioport-type" id="edit-ioport-type-serial">{l lang="en"}Serial (RS232){/l}
			</td>
		</tr>
	</tbody>

	<tbody id="edit-ioport-udp-tbody">
		<tr>
			<th>{l lang="en"}Host{/l}</th>
			<td><input name="edit-ioport-udp-host" id="edit-ioport-udp-host" class="required" type="text"> (ex.: 192.168.0.2)</td>
		</tr>
		<tr>
			<th>{l lang="en"}Port{/l}</th>
			<td><input name="edit-ioport-udp-port" id="edit-ioport-udp-port" class="number required" size="5" type="text"> (ex.: 20000)</td>
		</tr>
		<tr>
			<th>{l lang="en"}RX Port{/l}</th>
			<td><input name="edit-ioport-udp-rxport" id="edit-ioport-udp-rxport" class="number required" size="5" type="text"> (ex.: 20001)</td>
		</tr>
	</tbody>

	<tbody id="edit-ioport-tcp-tbody">
		<tr>
			<th>{l lang="en"}Host{/l}</th>
			<td><input name="edit-ioport-tcp-host" id="edit-ioport-tcp-host" class="required" type="text"> (ex.: 192.168.0.2)</td>
		</tr>
		<tr>
			<th>{l lang="en"}Port{/l}</th>
			<td><input name="edit-ioport-tcp-port" id="edit-ioport-tcp-port" class="number required" size="5" type="text"> (ex.: 20000)</td>
		</tr>
		<tr>
			<th>{l lang="en"}Persistent connection{/l}</th>
			<td><input name="edit-ioport-tcp-permanent" id="edit-ioport-tcp-permanent" type="checkbox"></td>
		</tr>
	</tbody>

	<tbody id="edit-ioport-serial-tbody">
		<tr>
			<th>{l lang="en"}Port{/l}</th>
			<td><input name="edit-ioport-serial-dev" id="edit-ioport-serial-dev" class="required" type="text"> (ex.: /dev/ttyS0)</td>
		</tr>
		<tr>
			<th>{l lang="en"}Speed{/l}</th>
			<td><input name="edit-ioport-serial-speed" id="edit-ioport-serial-speed" class="number required" size="5" type="text"> (ex.: 9600)</td>
		</tr>
		<tr>
			<th>{l lang="en"}Framing{/l}</th>
			<td><input name="edit-ioport-serial-framing" id="edit-ioport-serial-framing" class="required" size="5" type="text"> (ex.: 8N1)</td>
		</tr>
		<tr>
			<th>{l lang="en"}Flow{/l}</th>
			<td>
				<select id="edit-ioport-serial-flow">
					<option value="none">{l lang="en"}None{/l}</option>
					<option value="xon-xoff">{l lang="en"}xon-xoff{/l}</option>
					<option value="rts-cts">{l lang="en"}rts-cts{/l}</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Mode{/l}</th>
			<td>
				<select id="edit-ioport-serial-mode">
					<option value="text" selected="1" >{l lang="en"}text{/l}</option>
					<option value="raw">{l lang="en"}raw{/l}</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Timeout (in "raw" mode){/l}</th>
			<td><input name="edit-ioport-serial-timeout" id="edit-ioport-serial-timeout" size="5" type="text"> {l lang="en"}(ex.: 0ms to 25.5s in steps of 100ms){/l}</td>
		</tr>
		<tr>
			<th>{l lang="en"}Regular expression{/l}</th>
			<td><input name="edit-ioport-serial-regex" id="edit-ioport-serial-regex" type="checkbox"></td>
		</tr>
	</tbody>
</table>
</form>
</div>

<table id="ioports-tab-table">
	<thead>
		<tr>
			<th width="33%">{l lang="en"}ID{/l}</th>
			<th width="33%">{l lang="en"}Type{/l}</th>
			<th width="33%">{l lang="en"}Serial port/hostname{/l}</th>
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
