<?php
if (file_exists("../../plugins.php")) {
  $plugins_exist = true;
  require_once("../../include/plugins.php");
  $plugins = glob('../../plugins/*', GLOB_ONLYDIR);
} else $plugins_exist = false;

 $plugins_exist = false;

$_config = (array)simplexml_load_file('../../include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);
require_once("../../lang/lang.php");

function initLang2()
{
  global $_lang, $_config;

  if (file_exists("../../lang/_" . $_config['lang'] . ".php")) {
    include "../../lang/_" . $_config['lang'] . ".php";
  } else  $_lang = array();
}
initLang2();

?>
<!DOCTYPE html>
<html lang="<?php echo $_config['lang']; ?>">
<head>
  <meta charset="utf-8">
  <title>Rules Linknx with Blockly</title>
  <meta name="google" content="notranslate" />
  <script type="text/javascript" src="blockly_compressed.js"></script>
  <script type="text/javascript" src="javascript_compressed.js"></script>
  <script type="text/javascript" >
    function tr(p) { return p; }
    try {
      jQuery = window.parent.jQuery;
      $ = window.parent.$;
      loading = window.parent.loading;
      window.parent.frameRulev2 = window;
    }
    catch (ex) {
      console.error("externe", ex.message);
    }
    var i18n = <?php echo json_encode($_lang); ?>;
    function tr(msg)
    {
    	var cRet = (typeof(i18n)!='undefined') ? i18n[msg] : msg;
    	if(!cRet) {
    		return msg;
    	}
    	return cRet;
    }
  </script>
  <script type="text/javascript" src="blocks.js"></script>
<?php
if ($plugins_exist) {
  echo '<script type="text/javascript" src="../../js/plugin.js"></script>';
  echo '<script type="text/javascript" src="../../plugins/plugins.js"></script>';
  foreach ($plugins as $path)
  {
    if (file_exists($path."/blocks.js")) {
      echo '<script type="text/javascript" src="'.$path.'/blocks.js"></script>';
    }
  }
}
?>
  <script type="text/javascript" src="rules.js" ></script>
  <script type="text/javascript" src="importxml.js"></script>
  <script type="text/javascript" src="msg/js/<?php echo $_config['lang']; ?>.js"></script>
  <script type="application/javascript"
      src="../../linknx_jsonp.php?jsonp=parseResponse&xml=<read><config/></read>">
  </script>
<style type="text/css" style="display: none">
.goog-menu-vertical {overflow:scroll; max-height:200px; overflow-x:hidden;}
.slidermanuelautorule {
  background: url("../../images/manuAuto.png") no-repeat scroll 0 0 transparent;
  border: 1px solid black;
  border-radius: 6px 6px 6px 6px;
  cursor: pointer;
  height: 32px;
  margin: 0;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  width: 64px;
  position: absolute;
  right: 5px;
}
.sliderauto {
  background-position: 0px 0px;
  padding: 0;
}
.slidermanuel {
  background-position: -32px 0px;
  padding: 0;
}
.hide {
  display: none;
}
</style>
  <script type="text/javascript" >
    xml = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
  </script>
</head>
<body style="background-color: transparent;">
  <div style="background-color: transparent;width: 100%;">
  <div><b> <?php echo l('List of rules'); ?> : <select id="select_list_rules" onchange="loadRule(this.value);">
    <option value=""> -:| <?php echo l('Choose a rule'); ?> |:- </option>
  </select>
  <input type="button" value="<?php echo l('Clear'); ?>" onclick="clearRule()">
  <input type="button" value="<?php echo l('Refresh'); ?>" onclick="location.reload(true);">
  <hr></b>
  <b> <?php echo l('Id rule'); ?> : <input name="id_rule" type="text" size="50" value="ID_rule" onblur="myUpdateFunction();">
  <div class="slidermanuelautorule sliderauto" id="auto_manu" title="<?php echo l('Auto/Manu'); ?>" onclick="activeRule(this);"><input type="checkbox" class="checkbox hide" name="auto_manu" checked="checked" /></div>
  <input type="button" value="<?php echo l('Save rule'); ?>" onclick="reqLinknxValidRule();">
  <input type="button" value="<?php echo l('Delete'); ?>" onclick="reqLinknxDeleteRule();"></b>
  <span id="next-exec-current-rule"></span><br />
  <b> <?php echo l('Description'); ?> : <input name="description" type="text" size="50" value="<?php echo l('Description'); ?>" onblur="myUpdateFunction();">
  <?php echo l('Rule on "Init" value'); ?> :
  <select name="init-rule" onchange="myUpdateFunction();">
    <option value="false" ><?php echo l('False'); ?></option>
    <option value="true" ><?php echo l('True'); ?></option>
    <option value="eval" ><?php echo l('Evaluate'); ?></option>
  </select><br />
  <input type="button" value="<?php echo l('Execute "True" Actions'); ?>" style="margin: 3px;" onclick="executeActionlist(true);">
  <input type="button" value="<?php echo l('Execute "False" Actions'); ?>" style="margin: 3px;" onclick="executeActionlist(false);">
  <input type="button" value="<?php echo l('View Xml'); ?>" onclick="document.getElementById('Xmlview').className = (document.getElementById('Xmlview').className == '' )?'hide':'';"></b>
  </div>
<?php
if ($plugins_exist) {
  foreach ($plugins as $path)
  {
  	$w=getPlugin($path);
  	if ($w!=false) {
      if (isset($w['blocks'])) {
        foreach ($w['blocks'] as $val){
          echo '<block type="'.$val.'"></block>'; 
        }
      }
    }
  }
}
?>
  <div id="blocklyDiv" style="height: 600px; width: 100%;"></div><!-- height: 480px; -->
  <div id="Xmlview" class="hide" style="position: absolute; bottom: 0;width: 98%;background-color: white;border: 1px solid black; border-radius : 5px;">
  <b><?php echo l('Xml'); ?> : <input type="button" value="<?php echo l('Hide'); ?>" style="margin: 3px;" onclick="document.getElementById('Xmlview').className = (document.getElementById('Xmlview').className == '' )?'hide':'';"> <br></b>
  <textarea id="displayxml" rows="20" style="width: 99%;" disabled ></textarea>
  </div>
  </div>

  <xml id="toolbox" style="display: none;">
    <category name="Objects">
      <block type="list_objects"></block>
      <block type="value"></block>
    </category>
    <category name="Conditions">
      <block type="condition_AND_OR"></block>
      <block type="condition_not"></block>
      <block type="condition_object"></block>
      <block type="condition_script"></block>
      <block type="condition_time-counter"></block>
    </category>
    <category name="Timer Conditions">
      <block type="condition_timer"></block>
      <block type="timer_hour"></block>
      <block type="timer_date_object"></block>
      <block type="timer_hour_object"></block>
      <block type="timer_type"></block>
      <block type="timer_weekdays"></block>
    </category>
    <category name="Actions"> 
      <block type="action_set_value"></block>
      <block type="action_set_object"></block>
      <block type="action_toggle-value"></block>
      <block type="action_send-read-request"></block>
      <block type="action_repeat"></block>
      <block type="action_Conditional"></block>
      <block type="action_send-sms"></block>
      <block type="action_send-email"></block>
      <block type="action_shell-cmd"></block>
      <block type="action_dim-up"></block>
      <block type="action_script"></block>
      <block type="action_formula"></block>
      <block type="action_cycle_on_off"></block>
    </category>
    <category name="Actions on rules">
      <!-- <block type="list_rules"></block> -->
      <block type="action_Cancel"></block>
      <block type="action_start-actionlist"></block>
      <block type="action_set-rule-active"></block>
    </category>
    <category name="IO-Ports">
      <block type="condition_ioport-rx"></block>
      <block type="condition_ioport-connect"></block>
      <block type="action_ioport-tx"></block>
    </category>
<?php
if ($plugins_exist) {
echo '<category name="Plugins">';
foreach ($plugins as $path)
{
	$w=getPlugin($path);
	if ($w!=false && isset($w['blocks'])) {
    foreach ($w['blocks'] as $val){
      echo '<block type="'.$val.'"></block>';
    }
  }
}
echo '</category>';
}
?>
  </xml>

  <script>
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blocklyDiv'),
                 { media: './media/', toolbox: toolbox,
                 grid:
                     {spacing: 20,
                      length: 3,
                      colour: '#ccc',
                      snap: true},
                 trashcan: true,
                 });  /* path: 'lib/blockly/',*/
  //Blockly.pathToBlockly =  './';
  // Let the top-level application know that Blockly is ready.
  try {
    if (window.parent.blocklyLoaded) window.parent.blocklyLoaded(Blockly);
  }
  catch (ex) {
    console.error("externe", ex.message);
  }

  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml));

  //Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  function myUpdateFunction() {
    var code = Blockly.JavaScript.workspaceToCode();
    document.getElementById('displayxml').value = code;
  }
  Blockly.addChangeListener(myUpdateFunction);
  document.addEventListener("DOMContentLoaded", function(event) {
    start2();
  });
  </script>
</body>
</html>
