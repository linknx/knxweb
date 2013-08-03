{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<script type="text/javascript" >
  var _repository_widgetsdllist = {$tab_widgetsdllist|json_encode};
  var _repository_subpagesdllist = {$tab_subpagesdllist|json_encode};
</script>

<style>
#repository_widgetsdl_list th, #repository_widgetsdl_list td, #repository_widgetsdl_list tr {
  padding: 5px;
}
#repository_subpagesdl_list th, #repository_subpagesdl_list td, #repository_subpagesdl_list tr {
  padding: 5px;
}
</style>

<div id="repository_subpagesdl" >
  <div class="ui-state-active ui-corner-top header">{l lang='en'}Repository of Subpages{/l} : {l lang='en'}Sub-pages List{/l}</div>
  <div id="repository_subpagesdl_list">
    <table cellpadding="0" cellspacing="0">
      <thead class="ui-state-default">
        <tr>
          <th>{l lang='en'}Subpage name{/l}</th>
          <th>{l lang='en'}Description{/l}</th>
          <th>{l lang='en'}Version{/l}</th>
          <th></th><th></th>
        </tr>
      </thead>
      <tbody>
        {foreach from=$tab_subpagesdllist item=w}
          <tr id="subpage_{$w[0]}" data-version="{$w[2]}" >
            <td> {$w[0]} </td>
            <td> {$w[1]} </td>
            <td> {$w[2]} </td>
            <td title="{l lang='en'}Download{/l}" >
              <button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary subpagesdl" role="button" onclick="subpagesdl('{$w[0]}','{$w[3]}');" >
                <span class="ui-button-icon-primary ui-icon ui-icon-arrowthickstop-1-s"></span>
                <span class="ui-button-text">{l lang='en'}Download{/l}</span>
              </button>
            </td>
            <td onclick="displayImg(true, '{$w[0]}', '{$w[4]}');" class="ui-state-default ui-corner-all ui-state-hover" {if (!$w[4])}style="display:none;"{/if} >
              <span class="ui-icon ui-icon-image"></span>
            </td>
          </tr>
        {/foreach}
      </tbody>
    </table>
  </div>
</div>
<div id="dialog_repository" title="" ></div>
<br />
<div id="repository_widgetsdl">
  <div class="ui-state-active ui-corner-top header">{l lang='en'}Repository of Widgets{/l} : {l lang='en'}Widgets List{/l}</div>
  <div id="repository_widgetsdl_list">
    <table cellpadding="0" cellspacing="0"x>
      <thead class="ui-state-default">
        <tr>
          <th>{l lang='en'}Widget type{/l}</th>
          <th>{l lang='en'}Description{/l}</th>
          <th>{l lang='en'}Version{/l}</th>
          <th></th><th></th>
        </tr>
      </thead>
      <tbody>
        {foreach from=$tab_widgetsdllist item=w}
          <tr id="widget_{$w[0]}" data-version="{$w[2]}" >
            <td> {$w[0]} </td>
            <td> {$w[1]} </td>
            <td> {$w[2]} </td>
            <td onclick="widgetsdl('{$w[0]}');" title="{l lang='en'}Download{/l}" class="ui-state-default ui-corner-all ui-state-hover widgetsdl" >
              <span class="ui-icon ui-icon-arrowthickstop-1-s">{l lang='en'}Download{/l}</span><!-- ui-icon-arrowreturnthick-1-s  ui-icon-plusthick -->
            </td>
            <td {if (!$w[3])}style="display:none;"{/if} onclick="displayImg(false, '{$w[0]}', '{$w[3]}');" class="ui-state-default ui-corner-all ui-state-hover" ><span class="ui-icon ui-icon-image"></span></td>
          </tr>
        {/foreach}
      </tbody>
    </table>
  </div>
</div>