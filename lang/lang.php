<?php
  $lang['en'] = "English";  // default
  $lang['fr'] = "Francais";
  /*
  $lang['de'] = "Deutsch";
  $lang['nl'] = "Nederlands";
  $lang['pl'] = "Polski";
  $lang['sl'] = "Slovene";
  $lang['it'] = "Italiano";
  $lang['no'] = "Norsk";
  $lang['es'] = "Espa&ntilde;ol";
  $lang['zh'] = "&#20013;&#25991;";
  $lang['pt'] = "Portugu&ecirc;s";
  $lang['pt_br'] = "Portugu&ecirc;s (Brasil)";
  $lang['jp'] = "&#26085;&#26412;&#35486;";
  */

  $_lang = null;
  function initLang()
  {
    global $_lang, $_config;

    if (file_exists("lang/_" . $_config['lang'] . ".php")) {
      include "lang/_" . $_config['lang'] . ".php";
      //if ($_config['translate']=="true") file_put_contents('lang/_' . $_config['lang'] . '_nottranslate', ''); // clear not translate file
    } else  $_lang = array();
  }
  initLang();
  
  function l($keyName, $params = array())
  { /* TODO utiliser param pour forcer la traduction différente suivant la "vue" ? */
  	global $_lang, $_config;
  
  	if($_config['lang'] == "en") return $keyName;	
  
  	if($_lang == null) initLang();
  	
  	if(isset($_lang[$keyName]))
  	{
  		$keyContent = $_lang[$keyName];
  		$keyContent = preg_replace('~\$(\d)~e', '$params[\1]', $keyContent);
  		 if ($keyContent != '') return $keyContent;
       else return "#$keyContent#"; 
  	} else {
      $_lang[$keyName] = $keyName;
      if ($_config['translate']=="true") {
        nottranslate($keyName, $_config['lang'], $params);
      } 
      return "#$keyName#"; 
      //return $keyName;
    }
  }
  function nottranslate($keyName, $lang, $params)
  {
    $file_lang = 'lang/_'.$lang.'_nottranslate';
    $val = str_replace( "'", "\'", $keyName); 
    file_put_contents($file_lang, '$_lang[\''.$val.'\'] = \'\';'."\n", FILE_APPEND);
  }


?>