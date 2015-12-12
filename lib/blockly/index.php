<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Blockly Test création Rules Linknx</title>
  <meta name="google" content="notranslate" />
  <script type="text/javascript" src="blockly_compressed.js"></script>
  <script type="text/javascript" src="javascript_compressed.js"></script>
  <script type="text/javascript" >
    var list_objects = [['-:|Choose an Object|:-', ''], ['lampe cuisine0', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 0', 'lampe_plf_chambre_1_1.001']];
    var list_objects_1_001 = [['-:|Choose an Object|:-', ''], ['lampe cuisine', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 1', 'lampe_plf_chambre_1_1.001']];
    var list_objects_json = null;

    // for timer object type 10.001 or 11.001
    var list_object_date = [['date1', 'date1'], ['date2', 'date2']];
    var list_object_time = [['hour1', 'hour1'], ['hour2', 'hour2']];

    var list_rules = [['-:|Choose a rule|:-', ''], ['Description rule 1', 'id_rule1'], ['Rule 2 Description', 'id_rule2']];
    var list_ioports = [['-:|Choose an IO-Port|:-', '']];

    var tab_rules_json = [];
    var json_data = {};
    function parseResponse ( data , xml) {
      console.log("parseResponse",data , xml);
      json_data = data;
      init();
    }

    var xml = '';
    var TextAreaBlock_ = null;
  </script>
  <script type="text/javascript" src="blocks.js"></script>
  <script type="text/javascript" src="importxml.js"></script>
  <script type="text/javascript" src="msg/js/fr.js"></script>
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
                 });
  //Blockly.pathToBlockly =  './';

  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml));

  function myUpdateFunction() {
    var code = Blockly.JavaScript.workspaceToCode();
    document.getElementById('displayxml').value = code;
  }
  Blockly.addChangeListener(myUpdateFunction);

  </script>
</body>
</html>
