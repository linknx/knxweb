{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="tab-rules-property" style="display: none;">
  <div class="subItem">Général</div>
</div>

{include file='condition_editor.tpl'}

<div id="xmlOutput" style="float: right; width: 400px;"></div>

<div id="buttonBar">
  <span>Add a condition : </span> <select id="addcondition" name="addcondition"></select> <!-- Ajouter une condition  -->
  <span>Add an action : </span> <select id="addaction" name="addaction"></select> <!-- Ajouter une action -->
  <span>Rules : </span> <select id="listRules" name="listRules"></select> <!-- Liste des rules -->
  <br />
  <strong><span>Id rule : </span><input type="text" id="id-current-rule" size="50"></strong>
  <input type="button" id="button-save-rule" value="Save" onclick="validRule()">
  <input type="button" id="button-reload-rule" value="Reload XML" onclick="rules.generateXML()">
  <input type="button" id="button-init-rule" value="Clear" onclick="rules.deleteAllCurrentRule()">
  <br /><strong><span>Description : </span><input type="text" id="description-current-rule" size="100"></strong>
</div>

<div id="tab-rules-container">
	<!-- <div id="action">Action</div> -->
</div>
