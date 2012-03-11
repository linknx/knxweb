{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<style>
    .event {
      margin: 10px;
      /* width: 550px; */
      height: 40px;
      text-align: left;
      border-radius: 1em;
      position: relative;
    }
    .event:hover {
      border: 1px solid #0070A3;
    }
    .play {
      cursor: pointer;
      position: absolute;
      top: 4px;
      left: 10px;
      width: 32px;
      height: 32px;
      text-align: right;
      background: url('images/play.png') no-repeat scroll 0pt 0pt transparent;
      background-position: 0px 0px ;
      padding: 0;
      margin: 0;
      text-align:center;
      vertical-align:middle;
    }
    .play:hover {
      -moz-box-sizing: border-box;
      -moz-outline-radius: 6px;
      -moz-user-select: none;
      cursor: pointer;
      outline: 2px solid #0070A3;
    }
    .play:active {
      outline: 2px solid red;
    }  
    .idevent {
      cursor: default;
      position: absolute;
      top: 20px;
      margin-top: -0.7em;
      left: 45px;
      /*width: 380px;*/
      height: 1em;
      text-align: left;
    }
    .commandevent {
      position: absolute;
      top: 10px;
      right: 84px;
      width: 60px;
      height: 20px;
      text-align: right;
    }
    .commandevent img {
      width: 20px;
      height: 20px;
      margin-left: 2px;
    }
    .slidermanuelautoevent {
      cursor: pointer;
      border: 1px solid black;
      border-radius: 6px;
      position: absolute;
      top: 4px;
      right: 10px;
      width: 64px;
      height: 32px;
      text-align: right;
      background: url('images/manuAuto.png') no-repeat scroll 0pt 0pt transparent;
      background-position: 0px 0px ;
      padding: 0;
      margin: 0;
      text-align:center;
      vertical-align:middle;
    }
    .slidermanuel {
      background-position: -32px 0px;
      padding: 0; 
    }
    .sliderauto {
      background-position: 0px 0px ;
      padding: 0; 
    }
    
    .hide{ display: none; }
    
    .commandevent img:hover {
      -moz-box-sizing: border-box;
      -moz-outline-radius: 6px;
      -moz-user-select: none;
      cursor: pointer;
      outline: 2px solid #0070A3;
    }

    #tab-event-properties div {
      padding: 3px;
    }
    #tab-events-container {
      border: 1px dotted red;
      min-height: 650px;
      position: relative;
      width: 100%;
    }
    #event-action-dialog {
      min-height: 300px;
      position: relative;
      width: 100%;
    }

    #event-action-dialog-list tr:hover {
      -moz-box-sizing: border-box;
      -moz-outline-radius: 6px;
      -moz-user-select: none;
      cursor: pointer;
      outline: 1px solid #0070A3;
    }
    #event-action-dialog-select {
      margin: 5px;
    }
    #tab-event-properties:hover {
      min-width: 750px;
    }

  </style>

<div id="tab-events-fluxxml" title="Flux Xml"></div>

<div id="templateevent" class="event ui-state-default" style="display:none;">
  <div class="play" title="Execute" ></div>
  <div class="idevent">Id_Event</div>
  <div class="actionevent">
    <div class="commandevent"><img src="./images/ko.png" alt="delete" class="delete" title="Delete" ><img src="./images/edit.png" alt="edit" class="edit" title="Edit" ></div>
    <div class="slidermanuelautoevent sliderauto" title="Auto/Manu"><input type="checkbox" class="checkbox hide" name="field1" checked="checked"/></div>
  </div>
</div>


<div id="tab-events-container" >
  <table class="form">
				<tbody>
					<tr>
						<td id="list-events-container" style="width:50%;vertical-align: top;"></td>  
						<td style="vertical-align:top;">
              <div id="tab-event-properties">
              	<div id="tab-event-properties-title" class="ui-state-active ui-corner-top header">Event properties</div>
              	
              	<div id="tab-event-widget-buttons" class="ui-state-default" >
              		<!--<button id="button-new-widget">New</button>-->
              		<button id="button-valid-event" onclick="events.validEvent();" >Valid</button>
              		<button id="button-delete-event" onclick="events.deleteEvent($('#tab-event-id').val());" >Delete</button>
              		<!--<button id="button-clone-widget">Clone</button>-->
              		<br />
                  <strong><span> Id : </span><input type="text" id="tab-event-id" size="40"></strong>
                  <button onclick="events.displayXML();">View Xml</button>
                  <span id="tab-event-next-exec"></span>
                  <br />
                  <strong><span>Description : </span><input type="text" id="tab-event-description" size="100"></strong>
              	</div>
              	<table cellpadding="0" cellspacing="0" id="tab-event-widget-properties"  class="ui-state-default" style="width:100%;" >
              		<tbody>
              		  <tr><td>
                      <div class="ui-state-active ui-corner-top header">Timer</div>
                      <div id="tab-events-event-timer-dialog">
                      <form id="tab-events-event-timer-form">
                      	<div id="tab-events-event-timer-tabs">
                      		<ul>
                              <li><a href="#tab-events-event-timer-start"><span>Start</span></a></li>
                              <li><a href="#tab-events-event-timer-end"><span>End</span></a></li>
                      		</ul>
                      		<div id="tab-events-event-timer-start">
                      			<table class="form">
                      				<tbody>
                      					<tr>
                      						<td><input type="radio" id="event-timer-at" name="event-timer-atevery" checked> At</td>
                      						<td>
                      							<table style="background-color: #EEE; border-collapse: collapse;" width="100%">
                      								<tr>
                      									<td>Type</td>
                      									<td colspan="2">
                      										<input type="radio" id="event-timer-at-type-other" name="event-timer-at-type" checked> Other
                      										<input type="radio" id="event-timer-at-type-sunrise" name="event-timer-at-type"> Sunrise (Lever du soleil)
                      										<input type="radio" id="event-timer-at-type-sunset" name="event-timer-at-type"> Sunset (Coucher du soleil)
                      										<input type="radio" id="event-timer-at-type-noon" name="event-timer-at-type"> Noon (Midi)
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td><input type="radio" id="event-timer-at-constanttime" name="event-timer-at-constanttime" checked> Hour constant</td>
                      									<td>Hour/Minute</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-at-constant-hour" id="event-timer-at-constanttime-hour" size="2"> :
                      										<input type="text" class="number" name="event-timer-at-constant-minute" id="event-timer-at-constanttime-minute" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-at-variabletime" name="event-timer-at-constanttime"> Time variable</td>
                      									<td>Object</td>
                      									<td><select id="event-timer-at-variabletime-time"></select></td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td rowspan="2"><input type="radio" id="event-timer-at-constantdate" name="event-timer-at-constantdate" checked> Date constant</td>
                      									<td>Day/Month/Year</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-at-constantdate-day" id="event-timer-at-constantdate-day" size="2"> /
                      										<input type="text" class="number" name="event-timer-at-constantdate-month" id="event-timer-at-constantdate-month" size="2"> /
                      										<input type="text" class="number" name="event-timer-at-constantdate-year" id="event-timer-at-constantdate-year" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td>Weekday</td>
                      									<td>
                      										<input type="checkbox" id="event-timer-at-constantdate-dow1">Mo
                      										<input type="checkbox" id="event-timer-at-constantdate-dow2">Tu
                      										<input type="checkbox" id="event-timer-at-constantdate-dow3">We
                      										<input type="checkbox" id="event-timer-at-constantdate-dow4">Th
                      										<input type="checkbox" id="event-timer-at-constantdate-dow5">Fr
                      										<input type="checkbox" id="event-timer-at-constantdate-dow6">Sa
                      										<input type="checkbox" id="event-timer-at-constantdate-dow7">Su
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-at-variabledate" name="event-timer-at-constantdate"> Date variable</td>
                      									<td>Object</td>
                      									<td><select id="event-timer-at-variabledate-date"></select></td>
                      								</tr>
                      								<tr>
                      									<td>Exception</td>
                      									<td colspan="2">
                      									  <input type="radio" id="event-timer-at-exception-dontcare" name="event-timer-at-exception" checked="checked"> Dont Care
                      										<input type="radio" id="event-timer-at-exception-yes" name="event-timer-at-exception"> Yes
                      										<input type="radio" id="event-timer-at-exception-no" name="event-timer-at-exception"> No
                                        </td>
                      								</tr>
                      								<tr>
                      									<td>Offset</td>
                      									<td colspan="2"><input type="text" id="event-timer-at-offset" size="4"> (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
                      								</tr>
                      							</table>			
                      						</td>
                      					</tr>
                      					<tr>
                      						<td><input type="radio" id="event-timer-every" name="event-timer-atevery"> Every</td>
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
                      						<td><input type="radio" id="event-timer-none" name="event-timer-untilduring" checked> None</td>
                      						<td></td>
                      					</tr>
                      					<tr>
                      						<td><input type="radio" id="event-timer-until" name="event-timer-untilduring"> Until</td>
                      						<td>
                      							<table style="background-color: #EEE; border-collapse: collapse;" width="100%">
                      								<tr>
                      									<td>Type</td>
                      									<td colspan="2">
                      										<input type="radio" id="event-timer-until-type-other" name="event-timer-until-type" checked> Other
                      										<input type="radio" id="event-timer-until-type-sunrise" name="event-timer-until-type"> Sunrise
                      										<input type="radio" id="event-timer-until-type-sunset" name="event-timer-until-type"> Sunset
                      										<input type="radio" id="event-timer-until-type-noon" name="event-timer-until-type"> Noon
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td><input type="radio" id="event-timer-until-constanttime" name="event-timer-until-constanttime" checked> Time constant</td>
                      									<td>Hour/Minute</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-until-constant-hour" id="event-timer-until-constanttime-hour" size="2"> :
                      										<input type="text" class="number" name="event-timer-until-constant-minute" id="event-timer-until-constanttime-minute" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-until-variabletime" name="event-timer-until-constanttime"> Time variable</td>
                      									<td>Object</td>
                      									<td><select id="event-timer-until-variabletime-time"></select></td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td rowspan="2"><input type="radio" id="event-timer-until-constantdate" name="event-timer-until-constantdate" checked> Date constant</td>
                      									<td>Day/Month/Year</td>
                      									<td>
                      										<input type="text" class="number" name="event-timer-until-constantdate-day" id="event-timer-until-constantdate-day" size="2"> /
                      										<input type="text" class="number" name="event-timer-until-constantdate-month" id="event-timer-until-constantdate-month" size="2"> /
                      										<input type="text" class="number" name="event-timer-until-constantdate-year" id="event-timer-until-constantdate-year" size="2">
                      									</td>
                      								</tr>
                      								<tr style="background-color: #DDD">
                      									<td>Weekday</td>
                      									<td>
                      										<input type="checkbox" id="event-timer-until-constantdate-dow1">Mo
                      										<input type="checkbox" id="event-timer-until-constantdate-dow2">Tu
                      										<input type="checkbox" id="event-timer-until-constantdate-dow3">We
                      										<input type="checkbox" id="event-timer-until-constantdate-dow4">Th
                      										<input type="checkbox" id="event-timer-until-constantdate-dow5">Fr
                      										<input type="checkbox" id="event-timer-until-constantdate-dow6">Sa
                      										<input type="checkbox" id="event-timer-until-constantdate-dow7">Su
                      									</td>
                      								</tr>
                      								<tr style="background-color: #FFF">
                      									<td><input type="radio" id="event-timer-until-variabledate" name="event-timer-until-constantdate"> Date variable</td>
                      									<td>Object</td>
                      									<td><select id="event-timer-until-variabledate-date"></select></td>
                      								</tr>
                      								<tr>
                      									<td>Exception</td>
                      									<td colspan="2">
                      									  <input type="radio" id="event-timer-until-exception-dontcare" name="event-timer-until-exception" checked="checked"> Dont Care
                      										<input type="radio" id="event-timer-until-exception-yes" name="event-timer-until-exception"> Yes
                      										<input type="radio" id="event-timer-until-exception-no" name="event-timer-until-exception"> No
                                        </td>
                      								</tr>
                      								<tr>
                      									<td>Offset</td>
                      									<td colspan="2"><input type="text" id="event-timer-until-offset" size="4">  (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
                      								</tr>
                      							</table>			
                      						</td>
                      					</tr>
                      					<tr>
                      						<td><input type="radio" id="event-timer-during" name="event-timer-untilduring"> During</td>
                      						<td>
                      							<input type="text" class="required" name="event-timer-during-text" id="event-timer-during-text" size="4"> (ex.: 2h, 4d, 3h, 1m, 8s, ...)
                      						</td>
                      					</tr>
                      				</tbody>
                      			</table>
                      		</div>
                      	</div>
                      	
                      	<br />
                      	<input type="checkbox" id="tab-events-event-timer-trigger"> Trigger
                      
                      </form>
                      </div>
                    </td></tr>
                    <tr>
                    <td>
                      <div id="event-action-dialog">
                      <div class="ui-state-active ui-corner-top header">Actions</div>
                      	<select id="event-action-dialog-select"></select>
                      	<table id="event-action-dialog-list" style="width:100%;">
                      		<thead>
                      			<th>Type</th>
                      			<th>Description</th>
                      			<th>Delay</th>
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

