
<div id="tab-objects-propertybottom" style="margin: 4px;position:relative;#height:100%; #overflow-y: scroll; /* test force scroll bar */">
  <table id="objects-tab-table-ets" style="width:100%;position:relative;" >
  	<thead>
    	<tr>
      {foreach from=$xmletstabhead item=it}
        <th>{$it}</th>
      {/foreach}
    	</tr>
  	</thead>
  	<tbody>
    {foreach from=$xmletstablines item=it}
    	<tr>
      {foreach from=$it item=val}
      	<td>{$val}</td>
      {/foreach}
    	</tr>
    {/foreach}
  	</tbody>
  </table>
  <div id="objects-ets-pager" style="margin-bottom: -7px;" >
    <form>
      <input type="button" value="&lt;&lt;" class="first" /> 
      <input type="button" value="&lt;" class="prev" /> 
      <input type="text" class="pagedisplay"/> 
      <input type="button" value="&gt;" class="next" /> 
      <input type="button" value="&gt;&gt;" class="last" /> 
      <select class="pagesize">
        <option value="10" selected="selected">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="{$nbligne}">All</option>
      </select>
    </form>
  </div>
</div>