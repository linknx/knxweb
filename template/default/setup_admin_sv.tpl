<style>
/*
* {
    font-size: 12px;
    font-family: Verdana, Tahoma, Arial;
    padding: 0;
    margin: 0;
}


body {
    margin: 5px;
}

table td {
    padding: 2px;
}
*/
.title {
    font-size: 20px;
    font-weight: bold;
    background-color: #000;
    color: #FFF;
    height: 40px;
    line-height: 36px;
    padding-left: 5px;
    margin-bottom: 5px;
}

.title a{
    font-size: 13px;
    color: #AAA;
}

.title2 {
    font-size: 14px;
    background-color: #EEE;
    color: #000;
    height: 25px;
    line-height: 22px;
    padding-left: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.code {
    background-color: #EEE;
    border: 1px solid #999;
    padding: 3px;
}
</style>

{foreach from=$jsList item=js} 
<script type="text/javascript" src="{$js}"></script>
{/foreach} 				     

	
<div class="title">Conf EIB et Linknx</div>
<div class="title2">Service status
	<?php echo $_SERVER['DOCUMENT_ROOT']; ?>
</div>
<table width="100%">
	<tr>
	<td width="100">EIBD</td>
	<td width="32">
		<img src="<?php echo(($eibd_running!="")?'images/ok.png':'images/ko.png')?>" alt="ok"><img src="images/reload.png" alt="reload">
  </td>
	<td>
		<div class="code" <?php echo(($eibd_running=='')?'style="display: none;"':'')?>>
		<?php echo $eibd_running?>
		</div>
  </td>
	<td>
		<div class="code" <?php echo(($eibd_running_param=='')?'style="display: none;"':'')?>>
		<?php echo $eibd_running_param?>
		</div>
  </td>
	</tr>
	<tr>
	<td width="100">linknx</td>
	<td width="32">
		<img src="<?php echo(($linknx_running!="")?'images/ok.png':'images/ko.png')?>" alt="ok"><img src="images/reload.png" alt="reload">
  </td>
	<td>
		<div class="code" <?php echo(($linknx_running=='')?'style="display: none;"':'')?>>
		<?php echo $linknx_running?>
		</div></td>		<td>
		<div class="code" <?php echo(($linknx_running_param=='')?'style="display: none;"':'')?>>
		<?php echo $linknx_running_param?>
		</div></td>
	</tr>
</table>
<input type="button" value="Restart EIBD and linknx" onclick="document.location='index.php?restarteib'">
<div class="title2">Network setup
</div>
<?php if($network['Networksetting']){ ?>
<form method="post">
	<table width="400">
	<tr>
	<td>Type</td>
	<td>
		<input type="radio" name="dhcp" value="1" <?php echo(($network['dhcp'])?'checked':'')?>> DHCP 
		<input type="radio" name="dhcp" value="0" <?php echo((!$network['dhcp'])?'checked':'')?>> Static </td>
	</tr>
	<tr>
	<td>IP address</td>
	<td>
		<input type="text" name="ip" value="<?php echo $network['ip']?>"></td>
	</tr>
	<tr>
	<td>Netmask</td>
	<td>
		<input type="text" name="netmask" value="<?php echo $network['netmask']?>"></td>
	</tr>
	<tr>
	<td>Gateway</td>
	<td>
		<input type="text" name="gateway" value="<?php	echo $network['gateway']?>"></td>
	</tr>
	<tr>
		<td>DNS1 / DNS2</td>
		<td>
			<input type="text" name="dns1" value="<?php	echo $network['dns1']?>"> / 
			<input type="text" name="dns2" value="<?php echo $network['dns2']?>">
		</td>
	</tr>
	<tr>
		<td colspan="2">
		<input type="submit" name="saveNetworkConfig" value="Apply"></td>
	</tr>
	</table>
</form>
<?php }else { ?>
<table width="100%">
	<tr>
	<td width="100">
		<img src="images/ko.png" alt="ko">Probleme de conexion au information Reseau</td>
	</tr>		
</table>	
<?php } ?>
<div class="title2">EIB setup
</div>	
<?php if($eib['Eibsetting']){ ?>
<form method="post">
	<table width="600">
	<tr>
	<td>Interface type</td>
	<td>
		<input type="radio" name="eib_type" value="0" <?php echo (($eib['type']==0)?'checked':'')?>> FT1.2</td>
	<td>
		<select name="eib_com">
<?php
			foreach($serials as $key => $value) echo "<option value=\"$key\">$value</value>\n";
?>
		</select>
	</td>
	</tr>
	<tr>
	<td></td>
	<td>
		<input type="radio" name="eib_type" value="1" <?php echo (($eib['type']==1)?'checked':'')?>> EIBnet/IP gateway</td>
	<td>IP[:port] : 
		<input type="text" name="eib_ip" value="<?php if(isset($eib['ip'])) {echo $eib['ip'];} ?>"></td>
	</tr>	
	<tr>
	<td></td>
	<td>
		<input type="radio" name="eib_type" value="2" <?php echo (($eib['type']==2)?'checked':'')?>> USB</td>
		<td></td>
	</tr>
	<tr>
		<td colspan="3">
		<input type="submit" name="saveEIBConfig" value="Apply"></td>
	</tr>
	</table>
</form>
<?php }else { ?>
<table width="100%">
	<tr>
	<td width="100">
		<img src="images/ko.png" alt="ko">Probleme de conexion au information eib</td>
	</tr>
</table>
<?php } ?>
<!--
<div class="title2">linknx configuration file
</div>
<form method="post">
<textarea name="linknx-config" cols="150" rows="30">{$linknxConfig}</textarea><br />
	<input type="submit" name="savelinknxConfig" value="Save">
</form>
-->
<div class="title2">linknx log files (last 40 lines)
</div>
<div class="code">
	<?php echo $linknxLog?>
</div>                                                                                                              