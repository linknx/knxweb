<?

$_lang = null;
function initLang()
{
  global $_lang;
  include "lang/_" . $_config['lang'] . ".php";
}

function l($keyName, $params = array())
{
	global $_lang;
	
	if($_lang == null) initLang();
	
	if(isset($_lang[$keyName]))
	{
		$keyContent = $_lang[$keyName];
		$keyContent = preg_replace('~\$(\d)~e', '$params[\1]', $keyContent);
		return $keyContent;
	} else return $keyName;
}

?>