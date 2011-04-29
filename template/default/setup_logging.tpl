{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<form id="logging-form">
<table id="logging-tab-table">
	<tbody>
		<tr>
			<td colspan="2" style="color: #F00; font-weight: bold;">
				Attention, les paramètres de log varient en fonction de vos options de compilation de linknx (loggeur interne ou log4cpp).
				Plus d'information <a target="_blank" href="http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Configuration#Logging_section">ici</a>.
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
					<option value="custom">Personnalisé</option>
				</select>
				<input type="text" class="required" id="logging-customformat" size="40">
			</td>
		</tr>
		<tr>
			<th>Taille maximum</th>
			<td>
				<input type="text" class="number" id="logging-log4cpp-maxfilesize" size="10">kb
				(Une fois cette taille atteinte, une rotation des logs à lieu)
			</td>
		</tr>
		<tr>
			<th>Index maximum des logs</th>
			<td>
				<input type="text" class="number" id="logging-log4cpp-maxfileindex" size="10">
				(Une fois ce nombre de logs atteind, les logs plus anciens sont supprimés)
			</td>
		</tr>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="Enregistrer" id="logging-button-save">
