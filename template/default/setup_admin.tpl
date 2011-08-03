<style>
.titleadmin {
    font-size: 20px;
    font-weight: bold;
    background-color: #000;
    color: #FFF;
    height: 40px;
    line-height: 36px;
    padding-left: 5px;
    margin-bottom: 5px;
}

.titleadmin a{
    font-size: 13px;
    color: #AAA;
}

.titleadmin2 {
    font-size: 14px;
    background-color: #EEE;
    color: #000;
    height: 25px;
    line-height: 22px;
    padding-left: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.codeadmin {
    background-color: #EEE;
    border: 1px solid #999;
    padding: 3px;
}
</style>

{foreach from=$jsList item=js} 
<script type="text/javascript" src="{$js}"></script>
{/foreach} 				     

	
<div class="titleadmin">Configuration EIBD et Linknx</div>
<div class="titleadmin2">Service status {$_SERVER['DOCUMENT_ROOT']}</div>
<table width="100%">
	<tr>
	<td width="100">EIBD</td>
	<td width="32">
		<img src="{if ($eibd_running!='')}images/ok.png{else}images/ko.png{/if}" alt="ok"><img src="images/reload.png" alt="reload">
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
	<td width="32">
		<img src="{if ($linknx_running!="")} images/ok.png {else} images/ko.png {/if}" alt="ok"><img src="images/reload.png" alt="reload">
  </td>
	<td>
		<div class="codeadmin" {if ($linknx_running=='')} style="display: none;" {/if}>
		{$linknx_running}
		</div></td>		<td>
		<div class="codeadmin" {if ($linknx_running_param=='')} style="display: none;" {/if}>
		{$linknx_running_param}
		</div>
  </td>
	</tr>
</table>
<input type="button" value="Restart EIBD and linknx" onclick="document.location='index.php?restarteib'">
<div class="titleadmin2">Network setup</div>
{if ($network['Networksetting'])}
<form method="post">
	<table width="400">
	<tr>
	<td>Type</td>
	<td>
		<input type="radio" name="dhcp" value="1" {if ($network['dhcp'])} checked="true" {/if}> DHCP 
		<input type="radio" name="dhcp" value="0" {if (!$network['dhcp'])}checked="true" {/if}> Static </td>
	</tr>
	<tr>
	<td>IP address</td>
	<td>
		<input type="text" name="ip" value="{$network['ip']}"></td>
	</tr>
	<tr>
	<td>Netmask</td>
	<td>
		<input type="text" name="netmask" value="{$network['netmask']}"></td>
	</tr>
	<tr>
	<td>Gateway</td>
	<td>
		<input type="text" name="gateway" value="{$network['gateway']}"></td>
	</tr>
	<tr>
		<td>DNS1 / DNS2</td>
		<td>
			<input type="text" name="dns1" value="{$network['dns1']}"> / 
			<input type="text" name="dns2" value="{$network['dns2']}">
		</td>
	</tr>
	<tr>
		<td colspan="2">
		<input type="submit" name="saveNetworkConfig" value="Apply"></td>
	</tr>
	</table>
</form>
{else}
<table width="100%">
	<tr>
	<td width="100">
		<img src="images/ko.png" alt="ko">Probleme de conexion aus informations Reseau</td>
	</tr>		
</table>	
{/if}
<!--
<div class="titleadmin2">EIB setup</div>	
{if ($eib['Eibsetting'])}
<form method="post">
	<table width="600">
	<tr>
	<td>Interface type</td>
	<td>
		<input type="radio" name="eib_type" value="0" {if ($eib['type']==0)} checked="true" {/if}> FT1.2</td>
	<td>
		<select name="eib_com">
			{foreach from=$serials key=key item=item} 
				<option value="{$key}">{$item}</option>
			{/foreach}
		</select>
	</td>
	</tr>
	<tr>
	<td></td>
	<td>
		<input type="radio" name="eib_type" value="1" {if ($eib['type']==1)} checked="true" {/if}> EIBnet/IP gateway</td>
	<td>IP[:port] : 
		<input type="text" name="eib_ip" value="{$eib['ip']}"></td>
	</tr>	
	<tr>
	<td></td>
	<td>
		<input type="radio" name="eib_type" value="2" {if ($eib['type']==2)} checked="true" {/if}> USB</td>
		<td></td>
	</tr>
	<tr>
		<td colspan="3">
		<input type="submit" name="saveEIBConfig" value="Apply"></td>
	</tr>
	</table>
</form>
{else}
<table width="100%">
	<tr>
	<td width="100">
		<img src="images/ko.png" alt="ko">Probleme de conexion au information eib</td>
	</tr>
</table>
{/if}
-->
<!--
<div class="titleadmin2">linknx configuration file
</div>
<form method="post">
  <textarea name="linknx-config" cols="150" rows="30">{$linknxConfig}</textarea>
  <br />
  <input type="submit" name="savelinknxConfig" value="Save">
</form>
-->
<div class="titleadmin2">linknx log files (last 40 lines)
</div>
<div class="codeadmin">
	{$linknxLog}
</div>                                                                                                              