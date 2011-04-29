<?

require_once("lib/smarty/Smarty.class.php");
require_once("include/config.inc.php");

class MySmarty extends Smarty
{
	var $_errors;
	var $_messages;
	var $_config;
	var $_cssList;
	var $_jsList;

	public function MySmarty()
	{
		global $_config;
		
		$this->use_sub_dirs = false;

		$this->force_compile = true;

		$this->caching = false;
		$this->cache_lifetime = 0;

		$this->template_dir = "template/" . $_config['template'];
		$this->compile_dir = "template/template_c/";
		$this->plugins_dir = "lib/smarty/plugins/";

		$this->_cssList = array();
		$this->assign_by_ref('cssList', $this->_cssList);
		
		if (file_exists("template/" . $_config['template'] . "/css/style.css")) 
		    $this->_cssList[] = "template/" . $_config['template'] . "/css/style.css";

		$this->_jsList = array();
		$this->assign_by_ref('jsList', $this->_jsList);

		if (file_exists("template/" . $_config['template'] . "/js/default.js")) 
		    $this->_jsList[] = "template/" . $_config['template'] . "/js/default.js";
		
		$this->registerPlugin('block', 'l', array($this,'lBlock')); 
		
		$this->_errors=array();
		$this->assign_by_ref("errors", $this->_errors);
		if ((isset($_GET['error']))&&($_GET['error']!="")) $this->addError($_GET['error']); 
		if ((isset($_SESSION['error']))&&($_SESSION['error']!=""))
		{
			$this->addError($_SESSION['error']); 
			unset($_SESSION['error']);
		}

		$this->_messages=array();
		$this->assign_by_ref("messages", $this->_messages);
		if ((isset($_GET['message']))&&($_GET['message']!="")) $this->addError($_GET['message']); 
		if ((isset($_SESSION['message']))&&($_SESSION['message']!="")) 
		{
			$this->addMessage($_SESSION['message']); 
			unset($_SESSION['message']);
		}
	}
	
	public function lBlock($params, $content, &$smarty, &$repeat)
	{
		if ($content != "")
		{
	    return l($content, $params);
		}
	}
	
	public function addCss($path)
	{
		$this->_cssList[] = $path;
	}

	public function addJs($path)
	{
		$this->_jsList[] = $path;
	}

	public function setTitle($title)
	{
		$this->_tpl_vars['Title'] = $title;
	}
	
	public function addError($error)
	{
	    if (is_array($error))
		$this->_errors=array_merge($this->_errors, $error);
	    else
		$this->_errors[]=$error;
	}
	
	public function haveError()
	{
		return (count($this->_errors)>0);
	}

	public function addSessionError($error)
	{
		if (!isset($_SESSION['error'])) $_SESSION['error']=array();
		
	   if (is_array($error))
			$_SESSION['error']=array_merge($_SESSION['error'], $error);
	   else
			$_SESSION['error'][]=$error;
	}


	public function addMessage($message)
	{
	    if (is_array($message))
		$this->_messages=array_merge($this->_messages, $message);
	    else
		$this->_messages[]=$message;
	}

	public function addSessionMessage($message)
	{
		if (!isset($_SESSION['message'])) $_SESSION['message']=array();
		
	  if (is_array($message))
			$_SESSION['message']=array_merge($_SESSION['message'], $message);
	  else
			$_SESSION['message'][]=$message;
	}

}

$_tpl = null;
function tpl()
{
	global $_tpl, $_config;
	if($_tpl == null) 
	{
		$_tpl = new MySmarty();
		
		$_tpl->assign_by_ref("_config",$_config);
	}
	
	return $_tpl;
}

?>