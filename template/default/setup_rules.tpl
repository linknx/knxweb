{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="tab-rules-property" style="display: none;">
  <div class="subItem">{l lang='en'}General{/l}</div>
</div>

{include file='condition_editor.tpl'}

<div id="xmlOutput" style="float: right; width: 400px;"></div>

<div id="buttonBar" style="position: relative;padding: 3px;">
  <div class="ui-state-default" style="padding: 5px;text-align: center;">
    <span>{l lang='en'}Add a condition{/l} : </span> <select id="addcondition" name="addcondition"></select> <!-- Ajouter une condition  -->
    <span>{l lang='en'}Add an action{/l} : </span> <select id="addaction" name="addaction"></select> <!-- Ajouter une action -->
    <span>{l lang='en'}Rules{/l} : </span> <select id="listRules" name="listRules"></select> <!-- Liste des rules -->
  </div>
  <strong><span>{l lang='en'}Id rule{/l} : </span><input type="text" id="id-current-rule" size="50"></strong>
  <input type="button" id="button-save-rule" value="{l lang='en'}Valid{/l}" onclick="validRule()">
  <input type="button" id="button-reload-rule" value="{l lang='en'}Reload XML{/l}" onclick="rules.generateXML()">
  <input type="button" id="button-init-rule" value="{l lang='en'}Clear{/l}" onclick="rules.deleteAllCurrentRule()">
  <span id="next-exec-current-rule"></span>
  <br /><strong><span>{l lang='en'}Description{/l} : </span><input type="text" id="description-current-rule" size="100"></strong>
  <strong>
    <span> {l lang='en'}Rule on "Init" value{/l} : </span>
    <select id="init-current-rule">
      <option value="false" >{l lang='en'}False{/l}</option>
      <option value="true" >{l lang='en'}True{/l}</option>
      <option value="eval" >{l lang='en'}Evaluate{/l}</option>
    </select>
  </strong>
  <div class="slidermanuelautorule sliderauto" title="{l lang='en'}Auto/Manu{/l}"><input type="checkbox" class="checkbox hide" checked="checked"/></div>
</div>

<div id="tab-rules-container"></div>
