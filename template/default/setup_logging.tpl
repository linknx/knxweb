{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<form id="logging-form">
<table id="logging-tab-table">
	<tbody>
		<tr>
			<td colspan="2" style="color: #F00; font-weight: bold;">
				Warning: log parameters depends on linknx's compilation options (internal logger or log4cpp).
				More information <a target="_blank" href="http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Configuration#Logging_section">here</a>.
			</td>
		</tr>
		<tr>
			<th>Niveau du log</th>
			<td>
				<select id="logging-level">
					<option value="DEBUG">Debug</option>
					<option value="INFO">Info</option>
					<option value="NOTICE">Notice</option>
					<option value="WARN">Warn</option>
					<option value="ERROR">Error</option>
				</select>
			</td>
		<tr>
			<th>Fichier log</th>
			<td>
				<input type="text" class="" id="logging-log4cpp-output" size="40">
				(Vide = stdout)
			</td>
		</tr>
		<tr>
			<th>Format des logs</th>
			<td>
				<select id="logging-format">
					<option value="simple">Simple</option>
					<option value="basic">Basic</option>
					<option value="custom">Custom</option>
				</select>
				<input type="text" class="required" id="logging-customformat" size="50">
			</td>
		</tr>
		<tr>
			<th>Max size (log4cpp)</th>
			<td>
				<input type="text" class="number" id="logging-log4cpp-maxfilesize" size="10">kb
				(Log rotation will happen once this size reached)
			</td>
		</tr>
		<tr>
			<th>Max log file index (log4cpp)</th>
			<td>
				<input type="text" class="number" id="logging-log4cpp-maxfileindex" size="10">
				(Older logs will be deleted once this number reach)
			</td>
		</tr>
		<tr>
			<th>Configuration file (log4cpp)</th>
			<td>
				<input type="text" id="logging-log4cpp-config" size="30">
				(if specified, other parameters will be ignored)
			</td>
		</tr>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Save" id="logging-button-save">
