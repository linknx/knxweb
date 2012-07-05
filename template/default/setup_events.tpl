{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="tab-events-fluxxml" title="Flux Xml"></div>

<div id="templateevent" class="event ui-state-default" style="display:none;">
  <div class="play" title="{l lang='en'}Execute{/l}" ></div>
  <div class="idevent">{l lang='en'}Id_Event{/l}</div>
  <div class="actionevent">
    <div class="commandevent"><img src="./images/ko.png" alt="delete" class="delete" title="{l lang='en'}Delete{/l}" ><img src="./images/edit.png" alt="edit" class="edit" title="{l lang='en'}Edit{/l}" ></div>
    <div class="slidermanuelautoevent sliderauto" title="{l lang='en'}Auto/Manu{/l}"><input type="checkbox" class="checkbox hide" name="field1" checked="checked"/></div>
  </div>
</div>

<div id="tab-events-container" >
  <table class="form">
				<tbody>
					<tr>
						<td id="list-events-container" style="width:50%;vertical-align: top;"></td>  
						<td style="vertical-align:top;">
              <div id="tab-event-properties">
              	<div id="tab-event-properties-title" class="ui-state-active ui-corner-top header">
                  <span id="tab-event-properties-fixed" onclick="$(this).toggleClass('ui-icon-pin-s').toggleClass('ui-icon-pin-w');if($(this).hasClass('ui-icon-pin-s')) $('#tab-event-properties').css('min-width','750px'); else $('#tab-event-properties').css('min-width','');" class="ui-icon ui-state-inactive ui-icon-pin-w" style="cursor: pointer;float: left;list-style: none outside none;padding: 2px;" ></span>
                  {l lang='en'}Event properties{/l}
                </div>
              	
              	<div id="tab-event-widget-buttons" class="ui-state-default" style="display:none;">
              		<!--<button id="button-new-widget">{l lang='en'}New{/l}</button>-->
              		<button id="button-valid-event" onclick="events.validEvent();" >{l lang='en'}Valid{/l}</button>
              		<button id="button-delete-event" onclick="events.deleteEvent($('#tab-event-id').val());" >{l lang='en'}Delete{/l}</button>
              		<!--<button id="button-clone-widget">{l lang='en'}Clone{/l}</button>-->
              		<br />
                  <strong><span> {l lang='en'}Id{/l} : </span><input type="text" id="tab-event-id" size="40"></strong>
                  <button onclick="events.displayXML();">{l lang='en'}View Xml{/l}</button>
                  <span id="tab-event-next-exec"></span>
                  <br />
                  <strong><span>{l lang='en'}Description{/l} : </span><input type="text" id="tab-event-description" size="100"></strong>
              	</div>
              	<table cellpadding="0" cellspacing="0" id="tab-event-widget-properties"  class="ui-state-default" style="width:100%;display:none;" >
              		<tbody>
              		  <tr><td>
                      <div class="ui-state-active ui-corner-top header">{l lang='en'}Timer{/l}</div>
                      <div id="tab-events-event-timer-dialog">
                      <form id="tab-events-event-timer-form">
                      	<div id="tab-events-event-timer-tabs">
                      		<ul>
                              <li><a href="#tab-events-event-timer-start"><span>{l lang='en'}Start{/l}</span></a></li>
                              <li><a href="#tab-events-event-timer-end"><span>{l lang='en'}End{/l}</span></a></li>
                      		</ul>
                      		<div id="tab-events-event-timer-start">
                      			<table class="form">
                      				<tbody>
                      					<tr>
                      						<td><input type="radio" id="event-timer-at" name="event-timer-atevery" checked> {l lang='en'}At{/l}</td>
                      						<td>
                      							<table style="background-color: #EEE; border-collapse: collapse;" width="100%">
                      								<tr>
                      									<td>{l lang='en'}Type{/l}</td>
                      									<td colspan="2">
                      										<input type="radio" id="event-timer-at-type-other" name="event-timer-at-type" checked> {l lang='en'}Other{/l}
                      										<input type="radio" id="event-timer-at-type-sunrise" name="event-timer-at-type"> {l lang='en'}Sunrise{/l} <!--(Lever du soleil)-->
                      										<input type="radio" id="event-timer-at-type-sunset" name="event-timer-at-type"> {l lang='en'}Sunset{/l} <!--(Coucher du soleil)-->
                      										<input type="radio" id="event-timer-at-type-noon" name="event-timer-at-type"> {l lang='en'}Noon{/l} <!--(Midi)-->
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td><input type="radio" id="event-timer-at-constanttime" name="event-timer-at-constanttime" checked> {l lang='en'}Hour constant{/l}</td>
                      									<td>{l lang='en'}Hour/Minute{/l}</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-at-constant-hour" id="event-timer-at-constanttime-hour" size="2"> :
                      										<input type="text" class="number" name="event-timer-at-constant-minute" id="event-timer-at-constanttime-minute" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-at-variabletime" name="event-timer-at-constanttime"> {l lang='en'}Time variable{/l}</td>
                      									<td>{l lang='en'}Object{/l}</td>
                      									<td><select id="event-timer-at-variabletime-time"></select></td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td rowspan="2"><input type="radio" id="event-timer-at-constantdate" name="event-timer-at-constantdate" checked> {l lang='en'}Date constant{/l}</td>
                      									<td>{l lang='en'}Day/Month/Year{/l}</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-at-constantdate-day" id="event-timer-at-constantdate-day" size="2"> /
                      										<input type="text" class="number" name="event-timer-at-constantdate-month" id="event-timer-at-constantdate-month" size="2"> /
                      										<input type="text" class="number" name="event-timer-at-constantdate-year" id="event-timer-at-constantdate-year" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td>{l lang='en'}Weekday{/l}</td>
                      									<td>
                      										<input type="checkbox" id="event-timer-at-constantdate-dow1">{l lang='en'}Mo{/l}
                      										<input type="checkbox" id="event-timer-at-constantdate-dow2">{l lang='en'}Tu{/l}
                      										<input type="checkbox" id="event-timer-at-constantdate-dow3">{l lang='en'}We{/l}
                      										<input type="checkbox" id="event-timer-at-constantdate-dow4">{l lang='en'}Th{/l}
                      										<input type="checkbox" id="event-timer-at-constantdate-dow5">{l lang='en'}Fr{/l}
                      										<input type="checkbox" id="event-timer-at-constantdate-dow6">{l lang='en'}Sa{/l}
                      										<input type="checkbox" id="event-timer-at-constantdate-dow7">{l lang='en'}Su{/l}
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-at-variabledate" name="event-timer-at-constantdate"> {l lang='en'}Date variable{/l}</td>
                      									<td>{l lang='en'}Object{/l}</td>
                      									<td><select id="event-timer-at-variabledate-date"></select></td>
                      								</tr>
                      								<tr>
                      									<td>{l lang='en'}Exception{/l}</td>
                      									<td colspan="2">
                      									  <input type="radio" id="event-timer-at-exception-dontcare" name="event-timer-at-exception" checked="checked"> {l lang='en'}Dont Care{/l}
                      										<input type="radio" id="event-timer-at-exception-yes" name="event-timer-at-exception"> {l lang='en'}Yes{/l}
                      										<input type="radio" id="event-timer-at-exception-no" name="event-timer-at-exception"> {l lang='en'}No{/l}
                                        </td>
                      								</tr>
                      								<tr>
                      									<td>{l lang='en'}Offset{/l}</td>
                      									<td colspan="2"><input type="text" id="event-timer-at-offset" size="4"> (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
                      								</tr>
                      							</table>			
                      						</td>
                      					</tr>
                      					<tr>
                      						<td><input type="radio" id="event-timer-every" name="event-timer-atevery"> {l lang='en'}Every{/l}</td>
                      						<td>
                      							<input type="text" class="required" name="event-timer-every-text" id="event-timer-every-text" size="4"> (ex.: 2h, 4d, 3h, 1m, 8s, ...)
                      						</td>
                      					</tr>
                      				</tbody>
                      			</table>
                      		</div>	
                      		<div id="tab-events-event-timer-end">
                      			<table class="form">
                      				<tbody>
                      					<tr>
                      						<td><input type="radio" id="event-timer-none" name="event-timer-untilduring" checked> {l lang='en'}None{/l}</td>
                      						<td></td>
                      					</tr>
                      					<tr>
                      						<td><input type="radio" id="event-timer-until" name="event-timer-untilduring"> {l lang='en'}Until{/l}</td>
                      						<td>
                      							<table style="background-color: #EEE; border-collapse: collapse;" width="100%">
                      								<tr>
                      									<td>{l lang='en'}Type{/l}</td>
                      									<td colspan="2">
                      										<input type="radio" id="event-timer-until-type-other" name="event-timer-until-type" checked> {l lang='en'}Other{/l}
                      										<input type="radio" id="event-timer-until-type-sunrise" name="event-timer-until-type"> {l lang='en'}Sunrise{/l}
                      										<input type="radio" id="event-timer-until-type-sunset" name="event-timer-until-type"> {l lang='en'}Sunset{/l}
                      										<input type="radio" id="event-timer-until-type-noon" name="event-timer-until-type"> {l lang='en'}Noon{/l}
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td><input type="radio" id="event-timer-until-constanttime" name="event-timer-until-constanttime" checked> {l lang='en'}Time constant{/l}</td>
                      									<td>{l lang='en'}Hour/Minute{/l}</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-until-constant-hour" id="event-timer-until-constanttime-hour" size="2"> :
                      										<input type="text" class="number" name="event-timer-until-constant-minute" id="event-timer-until-constanttime-minute" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-until-variabletime" name="event-timer-until-constanttime"> {l lang='en'}Time variable{/l}</td>
                      									<td>{l lang='en'}Object{/l}</td>
                      									<td><select id="event-timer-until-variabletime-time"></select></td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td rowspan="2"><input type="radio" id="event-timer-until-constantdate" name="event-timer-until-constantdate" checked> {l lang='en'}Date constant{/l}</td>
                      									<td>{l lang='en'}Day/Month/Year{/l}</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-until-constantdate-day" id="event-timer-until-constantdate-day" size="2"> /
                      										<input type="text" class="number" name="event-timer-until-constantdate-month" id="event-timer-until-constantdate-month" size="2"> /
                      										<input type="text" class="number" name="event-timer-until-constantdate-year" id="event-timer-until-constantdate-year" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td>{l lang='en'}Weekday{/l}</td>
                      									<td>
                      										<input type="checkbox" id="event-timer-until-constantdate-dow1">{l lang='en'}Mo{/l}
                      										<input type="checkbox" id="event-timer-until-constantdate-dow2">{l lang='en'}Tu{/l}
                      										<input type="checkbox" id="event-timer-until-constantdate-dow3">{l lang='en'}We{/l}
                      										<input type="checkbox" id="event-timer-until-constantdate-dow4">{l lang='en'}Th{/l}
                      										<input type="checkbox" id="event-timer-until-constantdate-dow5">{l lang='en'}Fr{/l}
                      										<input type="checkbox" id="event-timer-until-constantdate-dow6">{l lang='en'}Sa{/l}
                      										<input type="checkbox" id="event-timer-until-constantdate-dow7">{l lang='en'}Su{/l}
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-until-variabledate" name="event-timer-until-constantdate"> {l lang='en'}Date variable{/l}</td>
                      									<td>{l lang='en'}Object{/l}</td>
                      									<td><select id="event-timer-until-variabledate-date"></select></td>
                      								</tr>
                      								<tr>
                      									<td>{l lang='en'}Exception{/l}</td>
                      									<td colspan="2">
                      									  <input type="radio" id="event-timer-until-exception-dontcare" name="event-timer-until-exception" checked="checked"> {l lang='en'}Dont Care{/l}
                      										<input type="radio" id="event-timer-until-exception-yes" name="event-timer-until-exception"> {l lang='en'}Yes{/l}
                      										<input type="radio" id="event-timer-until-exception-no" name="event-timer-until-exception"> {l lang='en'}No{/l}
                                        </td>
                      								</tr>
                      								<tr>
                      									<td>{l lang='en'}Offset{/l}</td>
                      									<td colspan="2"><input type="text" id="event-timer-until-offset" size="4">  (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
                      								</tr>
                      							</table>			
                      						</td>
                      					</tr>
                      					<tr>
                      						<td><input type="radio" id="event-timer-during" name="event-timer-untilduring"> {l lang='en'}During{/l}</td>
                      						<td>
                      							<input type="text" class="required" name="event-timer-during-text" id="event-timer-during-text" size="4"> (ex.: 2h, 4d, 3h, 1m, 8s, ...)
                      						</td>
                      					</tr>
                      				</tbody>
                      			</table>
                      		</div>
                      	</div>
                      	
                      	<br />
                      	<input type="checkbox" id="tab-events-event-timer-trigger"> {l lang='en'}Trigger{/l}
                      
                      </form>
                      </div>
                    </td></tr>
                    <tr>
                    <td>
                      <div id="event-action-dialog">
                      <div class="ui-state-active ui-corner-top header">{l lang='en'}Actions{/l}</div>
                      	<select id="event-action-dialog-select"></select>
                      	<table id="event-action-dialog-list" style="width:100%;">
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
                    </td>
                    </tr>
              		</tbody>
              	</table>
              </div>
						</td>
					</tr>
				</tbody>
			</table>
</div>

