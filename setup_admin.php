<?php

require_once("include/common.php");

header('Content-Type: text/html; charset=UTF-8');

tpl()->addJs('js/setup_admin.js');


// TODO amélioré ces données qui doivent être récupéré dans le paramétrage  


$Fconfeibd = 'ClinuxEib/eibd.conf';//$cheminD_ClinuxEib.'admin/
$Fxmllinknx = 'ClinuxEib/linknx.xml';// admin/config/ClinuxEib/linknx.xml
$Fnetwork ='/etc/network/interfaces';


$log_Linknx ='/tmp/linknx.log'; // ou autre exemple : /var/lib/linknx/linknx.log

//*****************************************************************************************************
//										 Fonction Reseau Configuration								*
//*****************************************************************************************************
function getNetworkConfig()
{	
	$config=array();
	 global $Fnetwork;
	 
	if (file_exists($Fnetwork)){
			$config['Networksetting']= true;
			
			$s=file_get_contents($Fnetwork);
			
			if (strpos($s,'iface eth0 inet dhcp')==false) $config['dhcp']=false; 
			else $config['dhcp']=true;
			
			$s=`/sbin/ifconfig eth0 | grep "inet addr"`;
			preg_match('~.*inet addr:(.*) Bcast:.* Mask:(.*)~',$s,$r);
			$config['ip']=trim($r[1]);
			$config['netmask']=trim($r[2]);

			$s=`/sbin/ip route| grep "default via"`;
			preg_match('~default via (.*) dev ~',$s,$r);
			$config['gateway']=$r[1];

			$s=`/bin/cat /etc/resolv.conf | grep "nameserver "`;
			preg_match_all('~nameserver (.*)~',$s,$r,PREG_SET_ORDER);
			if (count($r)>0) $config['dns1']=$r[0][1];
			if (count($r)>1) $config['dns2']=$r[1][1];
	}
	else{$config['Networksetting']= false;	
		
	}
	return $config;
}

function setNetworkConfig($config)
{
	$cmd=sprintf('/usr/local/knxweb/setnetconfig.sh %s %s %s %s %s %s',(($config['dhcp'])?'dhcp':'static'),$config['ip'],$config['netmask'],$config['gateway'],$config['dns1'],$config['dns2']);
	`sudo $cmd`;
}

if (isset($_POST['saveNetworkConfig'])){
	$config=array();
	$config['dhcp']=($_POST['dhcp']==1);
	if (!$config['dhcp'])
	{
		$config['ip']=$_POST['ip'];
		$config['netmask']=$_POST['netmask'];
		$config['gateway']=$_POST['gateway'];
		$config['dns1']=$_POST['dns1'];
		$config['dns2']=$_POST['dns2'];
	}
	setNetworkConfig($config);
}


//*****************************************************************************************************
//										 Fonction EIB Configuration									 *
//*****************************************************************************************************
function getEibConfig()
{
	global $Fconfeibd;
	$config=array();
	if (file_exists($Fconfeibd)){
		$config['Eibsetting']= true;
		$s=file_get_contents($Fconfeibd);
		if (!preg_match("~.*INTERFACE=['](.*?):(.*)[']~",$s,$r)) preg_match("~.*INTERFACE=['](usb)[']~",$s,$r);
		if ($r[1]=='ft12'){
			$config['type']=0;
			$config['eib_com']=$r[2];
		}
		elseif ($r[1]=='ipt'){
			$config['type']=1;
			$config['ip']=$r[2];
		}
		elseif ($r[1]=='usb'){
			$config['type']=2;
		}
	}
	else{
		$config['Eibsetting']= false;
	}
	return $config;
}


function setEibConfig($config)
{
	global $Fconfeibd;
	if ($config['type']==0) $s="INTERFACE='ft12:".$config['com']."'\n";
	elseif ($config['type']==1) $s="INTERFACE='ipt:".$config['ip']."'\n";
	elseif ($config['type']==2) $s="INTERFACE='usb'\n";
	file_put_contents($Fconfeibd,$s);
	`sudo /usr/local/knxweb/restarteibservices.sh`;
}

if (isset($_POST['saveEIBConfig']))
{
	$config=array();
	$config['type']=$_POST['eib_type'];
	$config['com']=$_POST['eib_com'];
	$config['ip']=$_POST['eib_ip'];
	setEibConfig($config);
}


/* géré par le menu configuration
if (isset($_POST['savelinknxConfig']))
{
	file_put_contents($Fxmllinknx,stripslashes($_POST['linknx-config']));
	`sudo /usr/local/knxweb/restarteibservices.sh`;
}
*/

if (isset($_GET['restarteib']))
{
	`sudo /usr/local/knxweb/restarteibservices.sh`;
}

$network=getNetworkConfig();
$eib=getEibConfig();

if (file_exists($Fxmllinknx)){ $linknxConfig=file_get_contents($Fxmllinknx); } else {$linknxConfig='pas de fichier : '.$Fxmllinknx;}

$serials=array();
for($i=0;$i<8;$i++) $serials["/dev/ttyS$i"]="/dev/ttyS$i (COM".($i+1).")";

//ant $linknxLog=str_replace("\n","<br />",`tail -n 40 /var/lib/linknx/linknx.log`);
$linknxLog=str_replace("\n","<br />",`tail -n 40 $log_Linknx`);

//ant $eibd_running=`ps ax | grep /usr/sbin/eibd | grep -v grep`;
$eibd_running=`ps ax | grep eibd | grep -v grep`;
$eibd_running_param=explode("eibd ",$eibd_running);
$eibd_running_param=$eibd_running_param[1];

$config=array();
$config['Eibsetting']= true;
//$s=file_get_contents($Fconfeibd);
$s=$eibd_running_param;
if (!preg_match("~.*INTERFACE=['](.*?):(.*)[']~",$s,$r)) preg_match("~.*INTERFACE=['](usb)[']~",$s,$r);
if ($r[1]=='ft12'){
	$config['type']=0;
	$config['eib_com']=$r[2];
}elseif ($r[1]=='ipt'){
	$config['type']=1;
	$config['ip']=$r[2];
}elseif ($r[1]=='usb'){
	$config['type']=2;
}
$eib=$config;

$linknx_running=`ps aux | grep linknx | grep -v grep`;
$linknx_running_param=explode("linknx ",$linknx_running);
$linknx_running_param=$linknx_running_param[1];


tpl()->assign_by_ref('_SERVER', $_SERVER);

tpl()->assign_by_ref('eibd_running', $eibd_running);
tpl()->assign_by_ref('eibd_running_param', $eibd_running_param);
tpl()->assign_by_ref('linknx_running', $linknx_running);
tpl()->assign_by_ref('linknx_running_param', $linknx_running_param);
tpl()->assign_by_ref('network', $network);
tpl()->assign_by_ref('eib', $eib);
tpl()->assign_by_ref('serials', $serials);
tpl()->assign_by_ref('linknxConfig', $linknxConfig);
tpl()->assign_by_ref('linknxLog', $linknxLog);


tpl()->display('setup_admin.tpl');


?>
