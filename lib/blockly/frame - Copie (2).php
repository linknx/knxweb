<?php
if (file_exists("../../plugins.php")) {
  $plugins_exist = true;
  require_once("../../include/plugins.php");
  $plugins = glob('../../plugins/*', GLOB_ONLYDIR);
} else $plugins_exist = false;

 $plugins_exist = false;

$_config = (array)simplexml_load_file('../../include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);
$lang = $_config['lang'];

?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
  <meta charset="utf-8">
  <title>Blockly Test création Rules Linknx</title>
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
  <script type="text/javascript" src="msg/js/<?php echo $lang; ?>.js"></script>
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
  <b> ID rule : <input name="id_rule" type="text" size="50" value="ID_rule" onblur="myUpdateFunction();">
  <div class="slidermanuelautorule sliderauto" id="auto_manu" title="Auto/Manu" onclick="activeRule(this);"><input type="checkbox" class="checkbox hide" name="auto_manu" checked="checked" /></div>
  <input type="button" value="Valid the Rule" onclick="reqLinknxValidRule();">
  <input type="button" value="Delete the Rule" onclick="reqLinknxDeleteRule();"></b>
  <span id="next-exec-current-rule"></span><br />
  <b>Description : <input name="description" type="text" size="50" value="Description" onblur="myUpdateFunction();">
  Init on Linknx Start :
  <select name="init-rule" onchange="myUpdateFunction();">
    <option value="false" >False</option>
    <option value="true" >True</option>
    <option value="eval" >Evaluate</option>
  </select><br />
  <input type="button" value="Execute True Actions" onclick="executeActionlist(true);">
  <input type="button" value="Execute False Actions" onclick="executeActionlist(false);"></b>
  <b><hr>Liste des Rules : <select id="select_list_rules" onchange="loadRule(this.value);">
    <option value=""> -:| Choose a rule |:- </option>
  </select>
  <input type="button" value="Clear" onclick="clearRule()">
  <input type="button" value="Refresh/Reload Page" onclick="location.reload(true);">
  <hr></b>
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
  <div id="blocklyDiv" style="height: 480px; width: 100%;"></div>
  <b>Xml de la rule pour linknx :</b>
  <textarea id="displayxml" rows="20" style="width: 100%;" disabled ></textarea>
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
