<?php

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

if (isset($_GET['restarteib']))
{
	`sudo /usr/local/knxweb/restarteibservices.sh`;
}

$network=getNetworkConfig();

$linknxLog=str_replace("\n","<br />",`tail -n 20 $log_Linknx`);

$eibd_running=`ps ax | grep eibd | grep -v grep`;
$eibd_running_param=explode("eibd ",$eibd_running);
$eibd_running_param=$eibd_running_param[1];

$linknx_running=`ps aux | grep linknx | grep -v grep`;
$linknx_running_param=explode("linknx ",$linknx_running);
$linknx_running_param=$linknx_running_param[1];

?>
