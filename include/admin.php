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
			
			$s= exec('/sbin/ifconfig eth0 | grep "inet addr"');
			preg_match('~.*inet addr:(.*) Bcast:.* Mask:(.*)~',$s,$r);
			$config['ip']=trim($r[1]);
			$config['netmask']=trim($r[2]);

			$s= exec('/sbin/ip route| grep "default via"');
			preg_match('~default via (.*) dev ~',$s,$r);
			$config['gateway']=$r[1];

			$s= exec('/bin/cat /etc/resolv.conf | grep "nameserver "');
			preg_match_all('~nameserver (.*)~',$s,$r,PREG_SET_ORDER);
			if (count($r)>0) $config['dns1']=$r[0][1];
			if (count($r)>1) $config['dns2']=$r[1][1];
	}
	else{$config['Networksetting']= false;	
		
	}
	return $config;
}

$network=getNetworkConfig();

$tail_log_linknx = exec('tail -n 20 '.$log_Linknx);
$linknxLog=str_replace("\n","<br />",$tail_log_linknx);

//$eibd_running=`ps ax | grep eibd | grep -v grep`;
//$eibd_running_param=explode("eibd ",$eibd_running);
//$eibd_running_param=$eibd_running_param[1];
//$eibd_running = `ps ax | grep eibd | grep -v grep`;
/*
 * ps ax | grep eibd | grep -v grep => marche pas sur syno
 * ps | grep eibd | grep -v grep => marche pas sur pc 
 * pstree -a | grep eibd | grep -v grep => a priroi marche sur syno et PC
 *
 */  

$eibd_running = exec('ps | grep eibd | grep -v grep');
$eibd_running_param="";
if ($eibd_running!="") {
  $eibd_running_param = explode("eibd ",$eibd_running);
  $eibd_running_param = $eibd_running_param[1];
} else {
  $eibd_running = exec('ps ax | grep eibd | grep -v grep');
  if ($eibd_running!="") {
    $eibd_running_param = explode("eibd ",$eibd_running);
    $eibd_running_param = $eibd_running_param[1];
  } else {
    $eibd_running_param = $_config["eibd"];
  }
}

/*$linknx_running=`ps aux | grep linknx | grep -v grep`;
$linknx_running_param=explode("linknx ",$linknx_running);
$linknx_running_param=$linknx_running_param[1];
*/
$linknx_running = exec('ps | grep linknx | grep -v grep');
$linknx_running_param = "";
if ($linknx_running!="") {
  $linknx_running_param = explode("linknx ",$linknx_running);
  $linknx_running_param = $linknx_running_param[1];
} else {
  $linknx_running = exec('ps ax | grep linknx | grep -v grep');
  if ($linknx_running!="") {
    $linknx_running_param = explode("linknx ",$linknx_running);
    $linknx_running_param = $linknx_running_param[1];
  } else {
    $linknx_running_param = $_config["linknx"];
    $linknx_param_pos_w = false;
  }
}


$widgetscss = "widgets/widgets.css";
$widgetscssexist = false;
$widgetscssiswritable = false;
if ( file_exists($widgetscss) ) {
  $widgetscssexist = true;
  $widgetscssiswritable = is_writable( $widgetscss );
  $contentwidgetscss = '';
  if ( !$error && filesize($widgetscss) > 0 ) {
    $f = fopen($widgetscss, 'r');
    $contentwidgetscss = fread($f, filesize($widgetscss));
  }
} else {
  $widgetscss = "";
}

?>
