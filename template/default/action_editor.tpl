<div id="action-dialog" style="display:none;" >
	<select id="action-dialog-select"></select>
	<table id="action-dialog-list">
		<thead>
			<th>{l lang='en'}Type{/l}</th>
			<th>{l lang='en'}Description{/l}</th>
			<th>{l lang='en'}Delay{/l}</th>
			<th width="16"></th>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

<div id="action-dialog-set-value-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Value{/l}</th>
			<td><input type="text" name="value" size="40"><select name="values"></select></td>
		</tr>
	</table>
</div>

<div id="action-dialog-copy-value-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}From object{/l}</th>
			<td><select name="from" class="object-select" /></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}To object{/l}</th>
			<td><select name="to" class="object-select" /></td>
		</tr>
	</table>
</div>

<div id="action-dialog-toggle-value-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select" /></td>
		</tr>
	</table>
</div>

<div id="action-dialog-set-string-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Value{/l}</th>
			<td><input type="text" name="value" size="40"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-send-read-request-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select" /></td>
		</tr>
	</table>
</div>

<div id="action-dialog-cycle-on-off-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select" /></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}On value{/l}</th>
			<td><input type="text" name="on" size="5"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Off value{/l}</th>
			<td><input type="text" name="off" size="5"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Count{/l}</th>
			<td><input type="text" name="count" size="4"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-send-sms-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Number{/l}</th>
			<td><input type="text" name="id" size="20"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Var{/l}</th>
			<td><input type="checkbox" name="var" value="1"> ex. $ { id_objet } </td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Message{/l}</th>
			<td><input type="text" name="value" size="50"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-send-email-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}To{/l}</th>
			<td><input type="text" name="to" size="20"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Subject{/l}</th>
			<td><input type="text" name="subject" size="50"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Var{/l}</th>
			<td><input type="checkbox" name="var" value="1"> ex. $ { id_objet } </td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Message{/l}</th>
			<td><input type="text" name="message" size="50"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-dim-up-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select" /></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Start{/l}</th>
			<td><input type="text" name="start" size="4"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Stop{/l}</th>
			<td><input type="text" name="stop" size="4"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Duration{/l}</th>
			<td><input type="text" name="duration" size="4"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-shell-cmd-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Var{/l}</th>
			<td><input type="checkbox" name="var" value="1"> ex. $ { id_objet } </td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Command{/l}</th>
			<td><input type="text" name="cmd" size="50"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-ioport-tx-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}IO Port{/l}</th>
			<td><select name="ioport" class="ioport-select" /></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Hexadecimal{/l}</th>
			<td><input type="checkbox" name="hex" value="1"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Var{/l}</th>
			<td><input type="checkbox" name="var" value="1"> ex. $ { id_objet } </td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Data{/l}</th>
			<td><input type="text" name="data" size="40"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-script-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Script{/l}</th>
			<td><textarea name="script" cols="40" rows="10"></textarea></td>
		</tr>
	</table>
</div>

<div id="action-dialog-formula-dialog" style="display:none;" >
	<br />{l lang='en'}Formula : object{/l} = a*x^m+b*y^n+c<br /><br />
	<table>
		<tr>
			<th width="150">{l lang='en'}Object{/l}</th>
			<td><select name="id" class="object-select" /></td>
		</tr>
		<tr>
			<th width="150">x</th>
			<td><select name="x" class="object-select" /></td>
		</tr>
		<tr>
			<th width="150">y</th>
			<td><select name="y" class="object-select" /></td>
		</tr>
		<tr>
			<th width="150">a</th>
			<td><input type="text" name="a" size="10"></td>
		</tr>
		<tr>
			<th width="150">b</th>
			<td><input type="text" name="b" size="10"></td>
		</tr>
		<tr>
			<th width="150">c</th>
			<td><input type="text" name="c" size="10"></td>
		</tr>
		<tr>
			<th width="150">m</th>
			<td><input type="text" name="m" size="10"></td>
		</tr>
		<tr>
			<th width="150">n</th>
			<td><input type="text" name="n" size="10"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-start-actionlist-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Rule{/l}</th>
			<td><input type="text" name="rule-id" size="10"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}List{/l}</th>
			<td><input type="checkbox" name="list" value="1"></td>
		</tr>
	</table>
</div>

<div id="action-dialog-set-rule-active-dialog" style="display:none;" >
	<table>
		<tr>
			<th width="150">{l lang='en'}Rule{/l}</th>
			<td><input type="text" name="rule-id" size="10"></td>
		</tr>
		<tr>
			<th width="150">{l lang='en'}Active{/l}</th>
			<td><input type="checkbox" name="active" value="1"></td>
		</tr>
	</table>
</div>
