<?php
if (isset($_GET["lang"])) $lang = $_GET["lang"];
else $lang = "fr";
if (file_exists("../../plugins.php")) {
  $plugins_exist = true;
  require_once("../../include/plugins.php");
  $plugins = glob('../../plugins/*', GLOB_ONLYDIR);
} else $plugins_exist = false;
 $plugins_exist = false;
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
</style>
  <script type="text/javascript" >
    xml = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
  </script>
</head>
<body style="background-color: transparent;">
  <div style="background-color: transparent;width: 100%;">
  <b> ID rule : <input name="id_rule" type="text" size="50" value="ID_rule" >
  Description : <input name="description" type="text" size="50" value="Description" >
  Init on Linknx Start : <input type="checkbox" name="init" id="init">
  </b><br />
  <b>Liste des Rules : <select id="select_list_rules" onchange="loadRule(this.value);">
    <option value=""> -:| Choose a rule |:- </option>
  </select>
  <input type="button" value="Clear" onclick="clearRule()">
  <input type="button" value="Valid the Rule" onclick="reqLinknxValidRule();">
  <input type="button" value="Delete the Rule" onclick="reqLinknxDeleteRule();"></b>
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
  <p style="display: none;"> <!-- -->
    <button onclick="Xml()">Générer le XML</button>
    &nbsp;
    <input type="button" value="Export to XML" onclick="toXml()">
    &nbsp;
    <input type="button" value="Import from XML" onclick="fromXml()">
    &nbsp;
    <input type="button" value="To JavaScript" onclick="toCode('JavaScript')">
    <br>
    <textarea id="importExport" rows="10" style="width: 100%;"></textarea>
  </p>

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
    window.parent.blocklyLoaded(Blockly);
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

  </script>
</body>
</html>
