{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<form id="logging-form">
<table id="logging-tab-table">
	<tbody>
		<tr>
			<td colspan="2" style="color: #F00; font-weight: bold;">
				{l lang="en"}Warning: log parameters depends on linknx's compilation options (internal logger or log4cpp){/l}.
				{l lang="en"}More information{/l} <a target="_blank" href="http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Configuration#Logging_section">{l lang="en"}here{/l}</a>.
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Log Level{/l}</th>
			<td>
				<select id="logging-level">
					<option value="DEBUG">{l lang="en"}Debug{/l}</option>
					<option value="INFO">{l lang="en"}Info{/l}</option>
					<option value="NOTICE">{l lang="en"}Notice{/l}</option>
					<option value="WARN">{l lang="en"}Warn{/l}</option>
					<option value="ERROR">{l lang="en"}Error{/l}</option>
				</select>
			</td>
		<tr>
			<th>{l lang="en"}Log File{/l}</th>
			<td>
				<input type="text" class="" id="logging-log4cpp-output" size="40">
				{l lang="en"}(Empty = stdout){/l}
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Format of the logs{/l}</th>
			<td>
				<select id="logging-format">
					<option value="simple">{l lang="en"}Simple{/l}</option>
					<option value="basic">{l lang="en"}Basic{/l}</option>
					<option value="custom">{l lang="en"}Custom{/l}</option>
				</select>
				<input type="text" class="required" id="logging-customformat" size="50">
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Max size (log4cpp){/l}</th>
			<td>
				<input type="text" class="number" id="logging-log4cpp-maxfilesize" size="10"> kb
				{l lang="en"}(Log rotation will happen once this size reached){/l}
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Max log file index (log4cpp){/l}</th>
			<td>
				<input type="text" class="number" id="logging-log4cpp-maxfileindex" size="10">
				{l lang="en"}(Older logs will be deleted once this number reach){/l}
			</td>
		</tr>
		<tr>
			<th>{l lang="en"}Configuration file (log4cpp){/l}</th>
			<td>
				<input type="text" id="logging-log4cpp-config" size="30">
				{l lang="en"}(if specified, other parameters will be ignored){/l}
			</td>
		</tr>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="{l lang='en'}Save{/l}" id="logging-button-save">
