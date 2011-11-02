{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="tab-rules-property" style="display: none;">
  <div class="subItem">Général</div>
</div>

<div id="tab-rules-script-condition-dialog" style="display: none;">
<form id="tab-rules-script-condition-form">
<table class="form">
	<tbody>
		<tr>
			<th width="150">Script</th>
			<td>
				<textarea cols="80" rows="4" name="script" class="script" id="tab-rules-script-condition-script"></textarea>
			</td>
		</tr>
	</tbody>
</table>
</form>
</div>

<div id="tab-rules-object-condition-dialog" style="display: none;">
<form id="tab-rules-object-condition-form">
<table class="form">
	<tbody>
		<tr>
			<th width="150">Objet</th>
			<td>
				<select id="tab-rules-object-condition-object"></select>
			</td>
		</tr>
		<tr>
			<th>Condition</th>
			<td>
				<select id="tab-rules-object-condition-operation">
					<option value="eq">==</option>
					<option value="lt">&lt;</option>
					<option value="gt">&gt;</option>
					<option value="ne">!=</option>
					<option value="lte">&lt;=</option>
					<option value="gte">&gt;=</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>Valeur</th>
			<td>
				<select id="tab-rules-object-condition-values"></select>
				<input type="text" id="tab-rules-object-condition-value">
			</td>
		</tr>
		<tr>
			<th>Trigger</th>
			<td>
				<input type="checkbox" id="tab-rules-object-condition-trigger">
			</td>
		</tr>
	</tbody>
</table>
</form>
</div>

<div id="tab-rules-objectsrc-condition-dialog" style="display: none;">
<form id="tab-rules-objectsrc-condition-form">
<table class="form">
	<tbody>
		<!-- <tr>
			<th width="150">Objet</th>
			<td>
				<select id="tab-rules-objectsrc-condition-object"></select>
			</td>
		</tr> -->
		<tr>
			<th>Adresse source (src)</th>
			<td>
				<input type="text" class="required" id="tab-rules-objectsrc-condition-src"> (ex.: 1.1.20)
			</td>
		</tr>
		<tr>
			<th>Condition</th>
			<td>
				<select id="tab-rules-objectsrc-condition-operation">
					<option value="eq">==</option>
					<option value="lt">&lt;</option>
					<option value="gt">&gt;</option>
					<option value="ne">!=</option>
					<option value="lte">&lt;=</option>
					<option value="gte">&gt;=</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>Valeur</th>
			<td>
				<!-- <select id="tab-rules-objectsrc-condition-values"></select> -->
				<input type="text" id="tab-rules-objectsrc-condition-value">
			</td>
		</tr>
		<tr>
			<th>Trigger</th>
			<td>
				<input type="checkbox" id="tab-rules-objectsrc-condition-trigger">
			</td>
		</tr>
	</tbody>
</table>
</form>
</div>

<div id="tab-rules-objectcompare-condition-dialog" style="display: none;">
<form id="tab-rules-objectcompare-condition-form">
<table class="form">
	<tbody>
		<tr>
			<th width="150">Objet</th>
			<td>
				<select id="tab-rules-objectcompare-condition-object"></select>
			</td>
		</tr>
		<tr>
			<th>Condition</th>
			<td>
				<select id="tab-rules-objectcompare-condition-operation">
					<option value="eq">==</option>
					<option value="lt">&lt;</option>
					<option value="gt">&gt;</option>
					<option value="ne">!=</option>
					<option value="lte">&lt;=</option>
					<option value="gte">&gt;=</option>
				</select>
			</td>
		</tr>
		<tr>
			<th width="150">Objet 2</th>
			<td>
				<select id="tab-rules-objectcompare-condition-object2"></select>
			</td>
		</tr>
		<tr>
			<td colspan="2" style="font-weight: bold; color: #F00; line-height: 25px;">
				Attention, veuillez choisir deux objets de types compatibles, pour plus d'informations sur cette condition, veuillez voir sur <a href="http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax#Object-compare_condition:" target="_blank">cette page</a>.
			</td>
		</tr>
	</tbody>
</table>
</form>
</div>

<div id="tab-rules-timecounter-condition-dialog" style="display: none;">
<form id="tab-rules-timecounter-condition-form">
<table class="form">
	<tbody>
		<tr>
			<th>Seuil (threshold)</th>
			<td>
				<input type="text" class="required number" name="tab-rules-timecounter-condition-threshold" id="tab-rules-timecounter-condition-threshold" size="4"> seconde(s)
			</td>
		</tr>
		<tr>
			<th>Délai de reset (reset-delay)</th>
			<td>
				<input type="text" class="required number" name="tab-rules-timecounter-condition-reset-delay" id="tab-rules-timecounter-condition-reset-delay" size="4"> seconde(s)
			</td>
		</tr>
	</tbody>
</table>
</form>
</div>

<div id="tab-rules-timer-condition-dialog" style="display: none;">
<form id="tab-rules-timer-condition-form">
	<div id="tab-rules-timer-condition-tabs">
		<ul>
        <li><a href="#tab-rules-timer-condition-start"><span>Début</span></a></li>
        <li><a href="#tab-rules-timer-condition-end"><span>Fin</span></a></li>
		</ul>
		<div id="tab-rules-timer-condition-start">
			<table class="form">
				<tbody>
					<tr>
						<td><input type="radio" id="timer-condition-at" name="timer-condition-atevery" checked> A</td>
						<td>
							<table style="background-color: #EEE; border-collapse: collapse;" width="100%">
								<tr>
									<td>Type</td>
									<td colspan="2">
										<input type="radio" id="timer-condition-at-type-other" name="timer-condition-at-type" checked> Autre
										<input type="radio" id="timer-condition-at-type-sunrise" name="timer-condition-at-type"> Lever du soleil
										<input type="radio" id="timer-condition-at-type-sunset" name="timer-condition-at-type"> Coucher du soleil
										<input type="radio" id="timer-condition-at-type-noon" name="timer-condition-at-type"> Midi
									</td>
								</tr>
								<tr style="background-color: #DDD">
									<td><input type="radio" id="timer-condition-at-constanttime" name="timer-condition-at-constanttime" checked> Heure constante</td>
									<td>Heure/Minute</td>
									<td>
										<input type="text" class="number" name="timer-condition-at-constant-hour" id="timer-condition-at-constanttime-hour" size="2"> :
										<input type="text" class="number" name="timer-condition-at-constant-minute" id="timer-condition-at-constanttime-minute" size="2">
									</td>
								</tr>
								<tr style="background-color: #FFF">
									<td><input type="radio" id="timer-condition-at-variabletime" name="timer-condition-at-constanttime"> Heure variable</td>
									<td>Objet</td>
									<td><select id="timer-condition-at-variabletime-time"></select></td>
								</tr>
								<tr style="background-color: #DDD">
									<td rowspan="2"><input type="radio" id="timer-condition-at-constantdate" name="timer-condition-at-constantdate" checked> Date constante</td>
									<td>Jour/Mois/Année</td>
									<td>
										<input type="text" class="number" name="timer-condition-at-constant-day" id="timer-condition-at-constantdate-day" size="2"> /
										<input type="text" class="number" name="timer-condition-at-constant-month" id="timer-condition-at-constantdate-month" size="2"> /
										<input type="text" class="number" name="timer-condition-at-constant-year" id="timer-condition-at-constantdate-year" size="2">
									</td>
								</tr>
								<tr style="background-color: #DDD">
									<td>Jour(s) de la semaine</td>
									<td>
										<input type="checkbox" id="timer-condition-at-constantdate-dow1">Lu
										<input type="checkbox" id="timer-condition-at-constantdate-dow2">Ma
										<input type="checkbox" id="timer-condition-at-constantdate-dow3">Me
										<input type="checkbox" id="timer-condition-at-constantdate-dow4">Je
										<input type="checkbox" id="timer-condition-at-constantdate-dow5">Ve
										<input type="checkbox" id="timer-condition-at-constantdate-dow6">Sa
										<input type="checkbox" id="timer-condition-at-constantdate-dow7">Di
									</td>
								</tr>
								<tr style="background-color: #FFF">
									<td><input type="radio" id="timer-condition-at-variabledate" name="timer-condition-at-constantdate"> Date variable</td>
									<td>Objet</td>
									<td><select id="timer-condition-at-variabledate-date"></select></td>
								</tr>
								<tr>
									<td>Exception</td>
									<td colspan="2"><input type="checkbox" id="timer-condition-at-exception"></td>
								</tr>
								<tr>
									<td>Offset</td>
									<td colspan="2"><input type="text" id="timer-condition-at-offset" size="2"> (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
								</tr>
							</table>			
						</td>
					</tr>
					<tr>
						<td><input type="radio" id="timer-condition-every" name="timer-condition-atevery"> Toutes les heure/minute</td>
						<td>
							<input type="text" class="required number" name="timer-condition-every-hour" id="timer-condition-every-hour" size="2"> :
							<input type="text" class="required number" name="timer-condition-every-minute" id="timer-condition-every-minute" size="2">
						</td>
					</tr>
				</tbody>
			</table>
		</div>	
		<div id="tab-rules-timer-condition-end">
			<table class="form">
				<tbody>
					<tr>
						<td><input type="radio" id="timer-condition-none" name="timer-condition-untilduring" checked> Non spécifié</td>
						<td>
							
						</td>
					</tr>
					<tr>
						<td><input type="radio" id="timer-condition-until" name="timer-condition-untilduring"> Jusque</td>
						<td>
							<table style="background-color: #EEE; border-collapse: collapse;" width="100%">
								<tr>
									<td>Type</td>
									<td colspan="2">
										<input type="radio" id="timer-condition-until-type-other" name="timer-condition-until-type" checked> Autre
										<input type="radio" id="timer-condition-until-type-sunrise" name="timer-condition-until-type"> Lever du soleil
										<input type="radio" id="timer-condition-until-type-sunset" name="timer-condition-until-type"> Coucher du soleil
										<input type="radio" id="timer-condition-until-type-noon" name="timer-condition-until-type"> Midi
									</td>
								</tr>
								<tr style="background-color: #DDD">
									<td><input type="radio" id="timer-condition-until-constanttime" name="timer-condition-until-constanttime" checked> Heure constante</td>
									<td>Heure/Minute</td>
									<td>
										<input type="text" class="number" name="timer-condition-until-constant-hour" id="timer-condition-until-constanttime-hour" size="2"> :
										<input type="text" class="number" name="timer-condition-until-constant-minute" id="timer-condition-until-constanttime-minute" size="2">
									</td>
								</tr>
								<tr style="background-color: #FFF">
									<td><input type="radio" id="timer-condition-until-variabletime" name="timer-condition-until-constanttime"> Heure variable</td>
									<td>Objet</td>
									<td><select id="timer-condition-until-variabletime-time"></select></td>
								</tr>
								<tr style="background-color: #DDD">
									<td rowspan="2"><input type="radio" id="timer-condition-until-constantdate" name="timer-condition-until-constantdate" checked> Date constante</td>
									<td>Jour/Mois/Année</td>
									<td>
										<input type="text" class="number" name="timer-condition-until-constant-day" id="timer-condition-until-constantdate-day" size="2"> /
										<input type="text" class="number" name="timer-condition-until-constant-month" id="timer-condition-until-constantdate-month" size="2"> /
										<input type="text" class="number" name="timer-condition-until-constant-year" id="timer-condition-until-constantdate-year" size="2">
									</td>
								</tr>
								<tr style="background-color: #DDD">
									<td>Jour(s) de la semaine</td>
									<td>
										<input type="checkbox" id="timer-condition-until-constantdate-dow1">Lu
										<input type="checkbox" id="timer-condition-until-constantdate-dow2">Ma
										<input type="checkbox" id="timer-condition-until-constantdate-dow3">Me
										<input type="checkbox" id="timer-condition-until-constantdate-dow4">Je
										<input type="checkbox" id="timer-condition-until-constantdate-dow5">Ve
										<input type="checkbox" id="timer-condition-until-constantdate-dow6">Sa
										<input type="checkbox" id="timer-condition-until-constantdate-dow7">Di
									</td>
								</tr>
								<tr style="background-color: #FFF">
									<td><input type="radio" id="timer-condition-until-variabledate" name="timer-condition-until-constantdate"> Date variable</td>
									<td>Objet</td>
									<td><select id="timer-condition-until-variabledate-date"></select></td>
								</tr>
								<tr>
									<td>Exception</td>
									<td colspan="2"><input type="checkbox" id="timer-condition-until-exception"></td>
								</tr>
								<tr>
									<td>Offset</td>
									<td colspan="2"><input type="text" id="timer-condition-until-offset" size="2">  (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
								</tr>
							</table>			
						</td>
					</tr>
					<tr>
						<td><input type="radio" id="timer-condition-during" name="timer-condition-untilduring"> Pendant heure/minute</td>
						<td>
							<input type="text" class="required number" name="timer-condition-during-hour" id="timer-condition-during-hour" size="2"> :
							<input type="text" class="required number" name="timer-condition-during-minute" id="timer-condition-during-minute" size="2">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<br />
	<input type="checkbox" id="tab-rules-timer-condition-trigger"> Trigger

</form>
</div>

<div id="xmlOutput" style="float: right; width: 400px;"></div>

<div id="buttonBar">
  <!-- 
  <input type="button" id="button-add-object" value="OBJECT" onclick="rules.addObject()">
  <input type="button" id="button-add-objectsrc" value="OBJECT SRC" onclick="rules.addObjectSrc()">
  <input type="button" id="button-add-objectcompare" value="OBJECT COMPARE" onclick="rules.addObjectCompare()">
  <input type="button" id="button-add-timecounter" value="TIME COUNTER" onclick="rules.addTimeCounter()">
  <input type="button" id="button-add-timer" value="TIMER" onclick="rules.addTimer()">
  <input type="button" id="button-add-and" value="AND" onclick="rules.addAnd()">
  <input type="button" id="button-add-or" value="OR" onclick="rules.addOr()">
  <input type="button" id="button-add-not" value="NOT" onclick="rules.addNot()">
  <br />
  -->
  <span>Ajouter une condition : </span> <select id="addcondition" name="addcondition"></select>
  <span>Ajouter une action : </span> <select id="addaction" name="addaction"></select>
  <span>Liste des rules : </span> <select id="listRules" name="listRules"></select>
  <br />
  <strong><span>Id rule : </span><input type="text" id="id-current-rule" size="50"></strong>
  <input type="button" id="button-save-rule" value="Valider" onclick="validRule()">
</div>

<div id="tab-rules-container">
	<!-- <div id="action">Action</div> -->
</div>
