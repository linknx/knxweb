{foreach from=$cssList item=css}
<link rel="stylesheet" type="text/css" href="{$css}" />
{/foreach}
{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div id="plugindiv" style="/*display: none;*/">
	<div> Affiche les paramètres de chaque plugins ici ...</div>
</div>

<div style="position: relative;padding: 3px;">
  <div class="ui-state-default" style="padding: 5px;text-align: center;">
    <span>{l lang='en'}Add a plugin{/l} : </span> <select id="new-plugin" name="new-plugin">
    {foreach from=$plugins_list key=id item=i}
      <option value="{$id}">{$i['label']} - {$id}</option>
  	{/foreach}
    </select>
    <span>{l lang='en'}Plugins list{/l} : </span> <select id="tab-plugins-list" name="tab-plugins-list"></select> <!-- Liste des plugins  -->
  </div>
</div>

<table id="plugins-container" width="100%;" ></table>


<div>PLUGIN : {$plugins_id}</div>