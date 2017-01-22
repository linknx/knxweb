{foreach from=$cssList item=css}
<link rel="stylesheet" type="text/css" href="{$css}" />
{/foreach}
<script type="text/javascript" >
var _plugins_list = {$plugins_list|json_encode};
</script>
{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div style="position: relative;padding: 3px;">
  <div class="ui-state-default" style="padding: 5px;text-align: center;">
    <span>{l lang='en'}Add a plugin{/l} : </span>
    <select id="new-plugin" name="new-plugin">
    <option value="">--== {l lang='en'}Select a plugin{/l} ==--</option>
    {foreach from=$plugins_list key=id item=i}
      <option value="{$i['name']}">{$i['name']} - {$i['label']}</option>
  	{/foreach}
    </select>
    <span>{l lang='en'}Plugins list{/l} : </span> <select id="tab-plugins-list" name="tab-plugins-list"></select> <!-- Liste des plugins  -->
  </div>
</div>
<div id="templateplugin" class="plugin ui-state-default" style="display:none;">
  <div class="commandplugin"><img src="./images/copy.png" alt="clone" class="clone" title="{l lang='en'}Duplicate{/l}" ><img src="./images/ko.png" alt="delete" class="delete" title="{l lang='en'}Delete{/l}" ><img src="./images/edit.png" alt="edit" class="edit" title="{l lang='en'}Edit{/l}" ></div>
  <div class="pluginname"></div>
  <div class="idplugin">Id_Plugin</div>
  <div class="config_plugin" style="display:none;">
    <div class="params"></div>
    <div class="barbutton"><button style="margin: 5px;">{l lang='en'}Save{/l}</button></div>
  </div>
</div>
<table id="plugins-container" width="100%;" ></table>