<div id="tab-rules-script-condition-dialog" style="display: none;">
<form id="tab-rules-script-condition-form">
<table class="form">
  <tbody>
    <tr>
      <th width="150">{l lang='en'}Script{/l}</th>
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
      <th width="150">{l lang='en'}Object{/l}</th>
      <td>
        <select id="tab-rules-object-condition-object"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Condition{/l}</th>
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
      <th>{l lang='en'}Value{/l}</th>
      <td>
        <select id="tab-rules-object-condition-values"></select>
        <input type="text" id="tab-rules-object-condition-value">
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Trigger{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-object-condition-trigger">
      </td>
    </tr>
  </tbody>
</table>
</form>
</div>

<div id="tab-rules-object-src-condition-dialog" style="display: none;">
<form id="tab-rules-objectsrc-condition-form">
<table class="form">
  <tbody>
    <!-- <tr>
      <th width="150">{l lang='en'}Object{/l}</th>
      <td>
        <select id="tab-rules-objectsrc-condition-object"></select>
      </td>
    </tr> -->
    <tr>
      <th>{l lang='en'}Source Adress{/l}</th>
      <td>
        <input type="text" class="required" id="tab-rules-objectsrc-condition-src"> (ex.: 1.1.20)
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Condition{/l}</th>
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
      <th>{l lang='en'}Value{/l}</th>
      <td>
        <!-- <select id="tab-rules-objectsrc-condition-values"></select> -->
        <input type="text" id="tab-rules-objectsrc-condition-value">
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Trigger{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-objectsrc-condition-trigger">
      </td>
    </tr>
  </tbody>
</table>
</form>
</div>

<div id="tab-rules-object-compare-condition-dialog" style="display: none;">
<form id="tab-rules-objectcompare-condition-form">
<table class="form">
  <tbody>
    <tr>
      <th width="150">{l lang='en'}Object{/l}</th>
      <td>
        <select id="tab-rules-objectcompare-condition-object"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Condition{/l}</th>
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
      <th width="150">{l lang='en'}Object{/l} 2</th>
      <td>
        <select id="tab-rules-objectcompare-condition-object2"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Trigger{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-objectcompare-condition-trigger">
      </td>
    </tr>
    <tr>
      <td colspan="2" style="font-weight: bold; color: #F00; line-height: 25px;">
        {l lang='en'}Attention please select two objects of compatible types, for more information on this condition, please see{/l} <a href="http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax#Object-compare_condition:" target="_blank">{l lang='en'}this page{/l}</a>.
      </td>
    </tr>
  </tbody>
</table>
</form>
</div>

<div id="tab-rules-time-counter-condition-dialog" style="display: none;">
<form id="tab-rules-time-counter-condition-form">
<table class="form">
  <tbody>
    <tr>
      <th>{l lang='en'}threshold{/l}</th>
      <td>
        <input type="text" class="required number" name="tab-rules-time-counter-condition-threshold" id="tab-rules-time-counter-condition-threshold" size="4"> {l lang='en'}seconde(s){/l}
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}reset-delay{/l}</th>
      <td>
        <input type="text" class="required number" name="tab-rules-time-counter-condition-reset-delay" id="tab-rules-time-counter-condition-reset-delay" size="4"> {l lang='en'}seconde(s){/l}
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
        <li><a href="#tab-rules-timer-condition-start"><span>{l lang='en'}Start{/l}</span></a></li>
        <li><a href="#tab-rules-timer-condition-end"><span>{l lang='en'}End{/l}</span></a></li>
    </ul>
    <div id="tab-rules-timer-condition-start">
      <table class="form">
        <tbody>
          <tr>
            <td><input type="radio" id="timer-condition-at" name="timer-condition-atevery" checked> {l lang='en'}At{/l}</td>
            <td>
              <table style="background-color: #EEE; border-collapse: collapse;" width="100%">
                <tr>
                  <td>{l lang='en'}Type{/l}</td>
                  <td colspan="2">
                    <input type="radio" id="timer-condition-at-type-other" name="timer-condition-at-type" checked> {l lang='en'}Other{/l}
                    <input type="radio" id="timer-condition-at-type-sunrise" name="timer-condition-at-type"> {l lang='en'}Sunrise{/l}
                    <input type="radio" id="timer-condition-at-type-sunset" name="timer-condition-at-type"> {l lang='en'}Sunset{/l}
                    <input type="radio" id="timer-condition-at-type-noon" name="timer-condition-at-type"> {l lang='en'}Noon{/l}
                  </td>
                </tr>
                <tr style="background-color: #DDD">
                  <td><input type="radio" id="timer-condition-at-constanttime" name="timer-condition-at-constanttime" checked> {l lang='en'}Hour constant{/l}</td>
                  <td>{l lang='en'}Hour/Minute{/l}</td>
                  <td>
                    <input type="text" class="number" name="timer-condition-at-constant-hour" id="timer-condition-at-constanttime-hour" size="2"> :
                    <input type="text" class="number" name="timer-condition-at-constant-minute" id="timer-condition-at-constanttime-minute" size="2">
                  </td>
                </tr>
                <tr style="background-color: #FFF">
                  <td><input type="radio" id="timer-condition-at-variabletime" name="timer-condition-at-constanttime"> {l lang='en'}Time variable{/l}</td>
                  <td>{l lang='en'}Object{/l}</td>
                  <td><select id="timer-condition-at-variabletime-time"></select></td>
                </tr>
                <tr style="background-color: #DDD">
                  <td rowspan="2"><input type="radio" id="timer-condition-at-constantdate" name="timer-condition-at-constantdate" checked> {l lang='en'}Date constant{/l}</td>
                  <td>{l lang='en'}Day/Month/Year{/l}</td>
                  <td>
                    <input type="text" class="number" name="timer-condition-at-constantdate-day" id="timer-condition-at-constantdate-day" size="2"> /
                    <input type="text" class="number" name="timer-condition-at-constantdate-month" id="timer-condition-at-constantdate-month" size="2"> /
                    <input type="text" class="number" name="timer-condition-at-constantdate-year" id="timer-condition-at-constantdate-year" size="2">
                  </td>
                </tr>
                <tr style="background-color: #DDD">
                  <td>{l lang='en'}Weekday{/l}</td>
                  <td>
                    <input type="checkbox" id="timer-condition-at-constantdate-dow1">{l lang='en'}Mo{/l}
                    <input type="checkbox" id="timer-condition-at-constantdate-dow2">{l lang='en'}Tu{/l}
                    <input type="checkbox" id="timer-condition-at-constantdate-dow3">{l lang='en'}We{/l}
                    <input type="checkbox" id="timer-condition-at-constantdate-dow4">{l lang='en'}Th{/l}
                    <input type="checkbox" id="timer-condition-at-constantdate-dow5">{l lang='en'}Fr{/l}
                    <input type="checkbox" id="timer-condition-at-constantdate-dow6">{l lang='en'}Sa{/l}
                    <input type="checkbox" id="timer-condition-at-constantdate-dow7">{l lang='en'}Su{/l}
                  </td>
                </tr>
                <tr style="background-color: #FFF">
                  <td><input type="radio" id="timer-condition-at-variabledate" name="timer-condition-at-constantdate"> {l lang='en'}Date variable{/l}</td>
                  <td>{l lang='en'}Object{/l}</td>
                  <td><select id="timer-condition-at-variabledate-date"></select></td>
                </tr>
                <tr>
                  <td>{l lang='en'}Exception{/l}</td>
                  <td colspan="2">
                    <input type="radio" id="timer-condition-at-exception-dontcare" name="timer-condition-at-exception" checked="checked"> {l lang='en'}Dont Care{/l}
                    <input type="radio" id="timer-condition-at-exception-yes" name="timer-condition-at-exception"> {l lang='en'}Yes{/l}
                    <input type="radio" id="timer-condition-at-exception-no" name="timer-condition-at-exception"> {l lang='en'}No{/l}
                  </td>
                </tr>
                <tr>
                  <td>{l lang='en'}Offset{/l}</td>
                  <td colspan="2"><input type="text" id="timer-condition-at-offset" size="2"> (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td><input type="radio" id="timer-condition-every" name="timer-condition-atevery"> {l lang='en'}Every{/l}</td>
            <td>
              <input type="text" class="required" name="timer-condition-every-text" id="timer-condition-every-text" size="4"> (ex.: 2h, 4d, 3h, 1m, 8s, ...)
            </td>
          </tr>
        </tbody>
      </table>
    </div>  
    <div id="tab-rules-timer-condition-end">
      <table class="form">
        <tbody>
          <tr>
            <td><input type="radio" id="timer-condition-none" name="timer-condition-untilduring" checked> {l lang='en'}None{/l}</td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td><input type="radio" id="timer-condition-until" name="timer-condition-untilduring"> {l lang='en'}Until{/l}</td>
            <td>
              <table style="background-color: #EEE; border-collapse: collapse;" width="100%">
                <tr>
                  <td>{l lang='en'}Type{/l}</td>
                  <td colspan="2">
                    <input type="radio" id="timer-condition-until-type-other" name="timer-condition-until-type" checked> {l lang='en'}Other{/l}
                    <input type="radio" id="timer-condition-until-type-sunrise" name="timer-condition-until-type"> {l lang='en'}Sunrise{/l}
                    <input type="radio" id="timer-condition-until-type-sunset" name="timer-condition-until-type"> {l lang='en'}Sunset{/l}
                    <input type="radio" id="timer-condition-until-type-noon" name="timer-condition-until-type"> {l lang='en'}Noon{/l}
                  </td>
                </tr>
                <tr style="background-color: #DDD">
                  <td><input type="radio" id="timer-condition-until-constanttime" name="timer-condition-until-constanttime" checked> {l lang='en'}Hour constant{/l}</td>
                  <td>{l lang='en'}Hour/Minute{/l}</td>
                  <td>
                    <input type="text" class="number" name="timer-condition-until-constant-hour" id="timer-condition-until-constanttime-hour" size="2"> :
                    <input type="text" class="number" name="timer-condition-until-constant-minute" id="timer-condition-until-constanttime-minute" size="2">
                  </td>
                </tr>
                <tr style="background-color: #FFF">
                  <td><input type="radio" id="timer-condition-until-variabletime" name="timer-condition-until-constanttime"> {l lang='en'}Hour variable{/l}</td>
                  <td>{l lang='en'}Object{/l}</td>
                  <td><select id="timer-condition-until-variabletime-time"></select></td>
                </tr>
                <tr style="background-color: #DDD">
                  <td rowspan="2"><input type="radio" id="timer-condition-until-constantdate" name="timer-condition-until-constantdate" checked> {l lang='en'}Date constant{/l}</td>
                  <td>{l lang='en'}Day/Month/Year{/l}</td>
                  <td>
                    <input type="text" class="number" name="timer-condition-until-constantdate-day" id="timer-condition-until-constantdate-day" size="2"> /
                    <input type="text" class="number" name="timer-condition-until-constantdate-month" id="timer-condition-until-constantdate-month" size="2"> /
                    <input type="text" class="number" name="timer-condition-until-constantdate-year" id="timer-condition-until-constantdate-year" size="2">
                  </td>
                </tr>
                <tr style="background-color: #DDD">
                  <td>{l lang='en'}Weekday{/l}</td>
                  <td>
                    <input type="checkbox" id="timer-condition-until-constantdate-dow1">{l lang='en'}Mo{/l}
                    <input type="checkbox" id="timer-condition-until-constantdate-dow2">{l lang='en'}Tu{/l}
                    <input type="checkbox" id="timer-condition-until-constantdate-dow3">{l lang='en'}We{/l}
                    <input type="checkbox" id="timer-condition-until-constantdate-dow4">{l lang='en'}Th{/l}
                    <input type="checkbox" id="timer-condition-until-constantdate-dow5">{l lang='en'}Fr{/l}
                    <input type="checkbox" id="timer-condition-until-constantdate-dow6">{l lang='en'}Sa{/l}
                    <input type="checkbox" id="timer-condition-until-constantdate-dow7">{l lang='en'}Su{/l}
                  </td>
                </tr>
                <tr style="background-color: #FFF">
                  <td><input type="radio" id="timer-condition-until-variabledate" name="timer-condition-until-constantdate"> {l lang='en'}Date variable{/l}</td>
                  <td>{l lang='en'}Object{/l}</td>
                  <td><select id="timer-condition-until-variabledate-date"></select></td>
                </tr>
                <tr>
                  <td>{l lang='en'}Exception{/l}</td>
                  <td colspan="2">
                    <input type="radio" id="timer-condition-until-exception-dontcare" name="timer-condition-until-exception" checked="checked"> {l lang='en'}Dont Care{/l}
                    <input type="radio" id="timer-condition-until-exception-yes" name="timer-condition-until-exception"> {l lang='en'}Yes{/l}
                    <input type="radio" id="timer-condition-until-exception-no" name="timer-condition-until-exception"> {l lang='en'}No{/l}
                  </td>
                </tr>
                <tr>
                  <td>{l lang='en'}Offset{/l}</td>
                  <td colspan="2"><input type="text" id="timer-condition-until-offset" size="2">  (ex.: 2h, -3d, 3h, -1m, 8s, ...)</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td><input type="radio" id="timer-condition-during" name="timer-condition-untilduring"> {l lang='en'}During{/l}</td>
            <td>
              <input type="text" class="required" name="timer-condition-during-text" id="timer-condition-during-text" size="4"> (ex.: 2h, 4d, 3h, 1m, 8s, ...)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <br />
  <input type="checkbox" id="tab-rules-timer-condition-trigger"> {l lang='en'}Trigger{/l}

</form>
</div>

<div id="tab-rules-ioport-rx-condition-dialog" style="display: none;">
<form id="tab-rules-ioport-rx-condition-form">
<table class="form">
  <tbody>
    <tr>
      <th>{l lang='en'}IO Port{/l}</th>
      <td>
        <!-- <input type="text" class="required" id="tab-rules-ioport-rx-condition-ioport"> -->
        <select id="tab-rules-ioport-rx-condition-ioport"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Expected{/l}</th>
      <td>
        <input type="text" id="tab-rules-ioport-rx-condition-expected">
      </td>
    </tr>
    
    <tr>
      <th>{l lang='en'}Object{/l}0</th>
      <td>
        <select id="tab-rules-ioport-rx-condition-object0"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Object{/l}1</th>
      <td>
        <select id="tab-rules-ioport-rx-condition-object1"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Object{/l}2</th>
      <td>
        <select id="tab-rules-ioport-rx-condition-object2"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Object{/l}3</th>
      <td>
        <select id="tab-rules-ioport-rx-condition-object3"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Regex{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-ioport-rx-condition-regex">
      </td>
    </tr>                                                             
    <tr>
      <th>{l lang='en'}Hex{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-ioport-rx-condition-hex">
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Trigger{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-ioport-rx-condition-trigger">
      </td>
    </tr>
  </tbody>
</table>
</form>
</div>

<div id="tab-rules-ioport-connect-condition-dialog" style="display: none;">
<form id="tab-rules-ioport-connect-condition-form">
<table class="form">
  <tbody>
    <tr>
      <th>{l lang='en'}IO Port{/l}</th>
      <td>
        <select id="tab-rules-ioport-connect-condition-ioport"></select>
      </td>
    </tr>
    <tr>
      <th>{l lang='en'}Trigger{/l}</th>
      <td>
        <input type="checkbox" id="tab-rules-ioport-connect-condition-trigger">
      </td>
    </tr>
  </tbody>
</table>
</form>
</div>
