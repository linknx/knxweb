{foreach from=$jsList item=js} 
<script type="text/javascript" src="{$js}"></script>
{/foreach} 				     
{if (!$progstatus && !$configknxweb && !$logobjects && !$loglinknx)}
<h3 style="color: #F00; font-weight: bold;">{l lang="en"}Please select a section to administer in the left menu.{/l}</h3>
{/if}
{if ($progstatus)}
<div class="titleadmin2">{l lang="en"}Services status{/l} {$_SERVER['DOCUMENT_ROOT']}</div>
<table width="100%">
	<tr>
  	<td width="100">EIBD</td>
  	<td>
  		{if ($eibd_running!="")}<span class="green">&nbsp;{l lang="en"}ACTIVE{/l}&nbsp;</span>{else}<span class="red">&nbsp;{l lang="en"}DESACTIVE{/l}&nbsp;</span>{/if}
    </td>
  	<td>
  		{if ($eibd_initd)}<span onclick="queryKnxweb('restart&pgm=eibd','xml','','');" style="cursor: pointer;"><img src="images/refresh.gif" />&nbsp;{l lang="en"}Restart{/l} EIBD&nbsp;</span>{/if}
    </td>
  	<td>
  		<div class="codeadmin" {if ($eibd_running=='')} style="display: none;" {/if}>
  		{$eibd_running}
  		</div>
    </td>
  	<td>
  		<div class="codeadmin" {if ($eibd_running_param=='')} style="display: none;" {/if}>
  		{$eibd_running_param}
  		</div>
    </td>
	</tr>
	<tr>
  	<td width="100">linknx</td>
  	<td>
  		{if ($linknx_running!="")}<span class="green">&nbsp;{l lang="en"}ACTIVE{/l}&nbsp;</span>{else}<span class="red">&nbsp;{l lang="en"}DESACTIVE{/l}&nbsp;</span>{/if}
    </td>
  	<td>
  		{if ($linknx_initd)}<span onclick="queryKnxweb('restart&pgm=linknx','xml','','');" style="cursor: pointer;"><img src="images/refresh.gif" />&nbsp;{l lang="en"}Restart{/l} LinKnx&nbsp;</span>{/if}
    </td>
  	<td>
  		<div class="codeadmin" {if ($linknx_running=='')} style="display: none;" {/if}>
  		{$linknx_running}
  		</div>
    </td>
		<td>
  		<div class="codeadmin" {if ($linknx_running_param=='')} style="display: none;" {/if}>
  		{$linknx_running_param}
  		</div>
    </td>
	</tr>
{foreach from=$pgmrunning key=k item=it}
	<tr>
  	<td width="100">{$k}</td>
  	<td>
  		{if ($it!="")}<span class="green">&nbsp;{l lang="en"}ACTIVE{/l}&nbsp;</span>{else}<span class="red">&nbsp;{l lang="en"}DESACTIVE{/l}&nbsp;</span>{/if}
    </td>
  	<td>
  		{if ( file_exists('/etc/init.d/{$k}') )}<span onclick="queryKnxweb('restart&pgm={$k}','xml','','');" style="cursor: pointer;"><img src="images/refresh.gif" />&nbsp;{l lang="en"}Restart{/l} {$k}&nbsp;</span>{/if}
    </td>
  	<td>
  		<div class="codeadmin" {if ($it=='')} style="display: none;" {/if}>
  		{$it}
  		</div></td>
		<td>
  		<div class="codeadmin" {if ($pgmrunning_param[$k]=='')} style="display: none;" {/if}>
  		{$pgmrunning_param[$k]}
  		</div>
    </td>
	</tr>
{/foreach}
</table>
{/if}
{if ($logobjects)}
<div class="titleadmin2">{l lang="en"}Object log (last "lines"){/l}</div>
<select id="selectLogObject">
<option value="">{l lang="en"}Choose an Object{/l}</option>
{foreach from=$logFile key=k item=lf}
  <option value="{$k}">{$k}</option>
{/foreach}
</select>
<select id="selectLogObjectCount">
  <option value="1" >1</option>
  <option value="5" >5</option>
  <option value="10" >10</option>
  <option value="20" selected="true" >20</option>
  <option value="30" >30</option>
  <option value="40" >40</option>
  <option value="50" >50</option>
  <option value="60" >60</option>
  <option value="70" >70</option>
  <option value="80" >80</option>
  <option value="90" >90</option>
  <option value="100" >100</option>
  <option value="200" >200</option>
</select>
<input type="button" value="{l lang="en"}Reload{/l}" onclick="reloadLogObject();" >
<div id="divLogObject" class="codeadmin"><br /><br /><br /></div> 
{/if}
{if ($configknxweb)}
<div class="titleadmin2">{l lang="en"}Config KnxWeb{/l}</div>
<table class="ui-widget-content" style="border:none;" >
{foreach from=$_config key=k item=conf}
	<tr>
		<th>{$k}</th>
		<td>
			{if ($k=="lang")}
			  <select id="config-{$k}-id">
			    {foreach from=$lang key=k2 item=conf2}
			    <option value="{$k2}" {if ($k2==$conf)} selected="true" {/if}>{$conf2}</option>
			    {/foreach}
        </select>
      {else}
  			{if ($k=="loglinknx")}
  			  <select id="config-{$k}-id">
  			    <option value=" " {if ($conf=='')} selected="true" {/if}>{l lang="en"}none{/l}</option>
            <option value="file" {if ($conf=='file')} selected="true" {/if}>{l lang="en"}File{/l}</option>
  			    <option value="mysql" {if ($conf=='mysql')} selected="true" {/if}>{l lang="en"}Mysql{/l}</option>
          </select>
        {else}
          {if ($k=="uitheme")}
            <select id="config-{$k}-id" onchange="changeUiTheme(this);">
              {foreach from=$uitheme key=k2 item=conf2}
              <option value="{$k2}" {if ($conf==$k2)} selected="true" {/if}>{$conf2}</option>
              {/foreach}
            </select>
          {else}
          {if ($conf=='true' || $conf=='false')}
            <input id="config-{$k}-id" class="required" type="checkbox" {if ($conf=='true')} checked="checked" {/if}>
          {else}
            <input id="config-{$k}-id" class="required" value="{$conf}" size="100" type="text">
          {/if}
        {/if}
			{/if}
			{/if}
		</td>
	</tr>
{/foreach}
  <tr>
		<td colspan="2" style="text-align:center;">
		<input type="submit" name="saveKnxWebConfig" value="{l lang="en"}Apply{/l}"></td>
	</tr>
</table>

{if ($widgetscss != "")}
<div class="titleadmin2">{l lang="en"}Edit "widgets/widgets.css" file{/l}</div>
<textarea cols="70" rows="25" style="width:100%;" name="contentwidgetscss" id="contentwidgetscss" >{$contentwidgetscss}</textarea>
<div>
{if ($widgetscssiswritable)}
<input type="button" name="updatewidgetscss" value="{l lang="en"}Update File{/l}" />
{else}
<p><em>{l lang="en"}You need to make the file widgets/widgets.css writable before save your changes.{/l}</em></p>
{/if}
</div>
{/if}
{/if}
{if ($loglinknx)}
<div class="titleadmin2">{l lang="en"}linknx log files (last{/l} 
  <select id="selectLinknxLogFileCount">
    <option value="1" >1</option>
    <option value="5" >5</option>
    <option value="10" >10</option>
    <option value="20" selected="true" >20</option>
    <option value="30" >30</option>
    <option value="40" >40</option>
    <option value="50" >50</option>
    <option value="60" >60</option>
    <option value="70" >70</option>
    <option value="80" >80</option>
    <option value="90" >90</option>
    <option value="100" >100</option>
    <option value="200" >200</option>
  </select> {l lang="en"}lines){/l} 
</div>
<center>  <input type="button" value="{l lang="en"}Reload{/l}" onclick="reloadLogLinknx();" ></center>
<div id="divLinknxLog" class="codeadmin">
	{$linknxLog}
</div>
{/if}
{if ($networksetup)}
<div class="titleadmin2">{l lang="en"}Network setup{/l}</div>
{if ($network['Networksetting'])}
	<table width="400">
	<tr>
	<td>Type</td>
	<td>
		<input type="radio" name="dhcp" value="1" {if ($network['dhcp'])} checked="true" {/if} disabled="1"> {l lang="en"}DHCP{/l} 
		<input type="radio" name="dhcp" value="0" {if (!$network['dhcp'])}checked="true" {/if} disabled="1"> {l lang="en"}Static{/l} </td>
	</tr>
	<tr>
	<td>{l lang="en"}IP address{/l}</td>
	<td>
		<input type="text" name="ip" value="{$network['ip']}" disabled="1"></td>
	</tr>
	<tr>
	<td>{l lang="en"}Netmask{/l}</td>
	<td>
		<input type="text" name="netmask" value="{$network['netmask']}" disabled="1"></td>
	</tr>
	<tr>
	<td>{l lang="en"}Gateway{/l}</td>
	<td>
		<input type="text" name="gateway" value="{$network['gateway']}" disabled="1"></td>
	</tr>
	<tr>
		<td>{l lang="en"}DNS1 / DNS2{/l}</td>
		<td>
			<input type="text" name="dns1" value="{$network['dns1']}" disabled="1"> / 
			<input type="text" name="dns2" value="{$network['dns2']}" disabled="1">
		</td>
	</tr>
	</table>
{else}
<table width="100%">
	<tr>
	<td width="100">
		<img src="images/ko.png" alt="ko">{l lang="en"}Problem connecting to network information{/l}</td>
	</tr>		
</table>	
{/if}
{/if}
                                                                                                       