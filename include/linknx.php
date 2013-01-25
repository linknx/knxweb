<?php

class Linknx {
	private $_hostname;
	private $_port;
	
	function __construct($hostname, $port)	{
		$this->_hostname=$hostname;
		$this->_port=$port;
	}
	
	function connect()	{
		$this->_socket = fsockopen($this->_hostname, $this->_port, $errno, $errstr, 30);
		if (!$this->_socket) throw new Exception("Cannot connect to linknx: ".$errstr);	
	}

	function disconnect()	{
		if ($this->_socket) fclose($this->_socket);
	}
	
	function isConnected() {
		return $this->_socket!=false;
	}

	function query($xml, &$result) {
		if (!$this->_socket) $this->connect();
		
		fwrite($this->_socket, $xml . chr(4));
		$max_result_lines = 1000;
		$result = '';
		$cnt = 0;
		while ($cnt < $max_result_lines && $this->_socket && !feof($this->_socket)) {
			$result .= fgets($this->_socket, 128);
			$c = fgetc($this->_socket);
			if ($c == "\4")	break;
			$result .= $c;
			$cnt++;
		}
		try {
			$result=simplexml_load_string($result);
		} catch (Exception $e) {
			return false;
		}
		return (((string)$result->attributes()->status)=='success');
	}
	
	function getObjects()	{
		if ($this->query("<read><config><objects/></config></read>",$xml))
		{		
			$objects=array();
			foreach($xml->config->objects->object as $object)
			{
				$o=array();
				foreach($object->attributes() as $k => $v) $o[$k]=(string)$v;
				$o['label']=(string)$object;
				$id=$o['id'];
				unset($o['id']);
				$objects[$id]=$o;
			}
			return $objects;
		} else return false;
	}
	
	function getInfo() {
		$info=array();
		if ($this->query("<read><version/></read>", $xml)) 
		{
			$info['version']=(string)$xml->version->value;
			$info['haveSMS']=isset($xml->version->features->sms);
			$info['haveEmail']=isset($xml->version->features->{'e-mail'});
			$info['haveLua']=isset($xml->version->features->lua);
			$info['haveLog4cpp']=isset($xml->version->features->log4cpp);
			$info['haveMysql']=isset($xml->version->features->mysql);
		} else return false;
		return $info;
	}
	
	function getServices() {
		$info=array();
		if ($this->query("<read><config><services></services></config></read>", $xml)) 
		{
      foreach($xml->config->services->smsgateway->attributes() as $var => $value) { $info['smsgateway'][$var] = (string)$value; }
      //$info['ioports']=$xml->config->services->ioports->attributes(); // TODO a gérer dans une fonction à part ...
      foreach($xml->config->services->knxconnection->attributes() as $var => $value) { $info['knxconnection'][$var] = (string)$value; }
      foreach($xml->config->services->xmlserver->attributes() as $var => $value) { $info['xmlserver'][$var] = (string)$value; }
      foreach($xml->config->services->persistence->attributes() as $var => $value) { $info['persistence'][$var] = (string)$value; }
      foreach($xml->config->services->location->attributes() as $var => $value) { $info['location'][$var] = (string)$value; }
      //$info['exceptiondays']=(string)$xml->config->services->exceptiondays->date; // TODO a gérer dans une fonction à part ...
		} else return false;
		return $info;
	}
	
	function getLogging() {
		$info=array();
		if ($this->query("<read><config><logging /></config></read>", $xml)) 
		{
      $info['logging']=$xml->config->logging->attributes();
		} else return false;
		return $info;
	}
		
}

?>