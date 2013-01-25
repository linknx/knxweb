<?php

class IRTrans {
	private $_hostname;
	
	function __construct($hostname)
	{
		$this->_hostname=$hostname;
	}
	
	function connect()
	{
		$this->_socket = fsockopen("tcp://".$this->_hostname, 21000, $errno, $errstr, 30);
		if (!$this->_socket) throw new Exception("Cannot connect to irtrans: ".$errstr);	
		
		fwrite($this->_socket,"ASCI");
		
	}
	
	function isConnected()
	{
		return $this->_socket!=false;
	}

	function sendCommand($command) 
	{
		if (!$this->isConnected()) $this->connect();
		fwrite($this->_socket, $command . "\n");
		$res=trim(fread($this->_socket, 1024));
		if (preg_match('~\*\*[0-9]{5} (.*)~',$res,$r))
		{
			return $r[1];
		} throw new Exception("Unknow reply from irtrans: ".$res);	
	}
	
	function getRemotes()
	{
		$offset=0;
		$remotes=array();
		do 
		{
			$res=$this->sendCommand('Agetremotes ' . $offset);
			preg_match('~REMOTELIST ([0-9]*),([0-9]*),([0-9]*),(.*)~',$res,$r);
			if (count($r)==5) $remotes=array_merge($remotes,explode(',',$r[4]));
			$offset+=3;
		} while (( ($r[1]+$r[3]) < $r[2] ) && (count($r)>0));
		return $remotes;
	}

	function getCommands($remote)
	{
		$offset=0;
		$commands=array();
		do 
		{
			$res=$this->sendCommand('Agetcommands ' . $remote . ',' . $offset);
			preg_match('~COMMANDLIST ([0-9]*),([0-9]*),([0-9]*),(.*)~',$res,$r);
			if (count($r)==5) $commands=array_merge($commands,explode(',',$r[4]));
			$offset+=12;
		} while (( ($r[1]+$r[3]) < $r[2] ) && (count($r)>0));
		asort($commands);
		return $commands;
	}
	
}

?>