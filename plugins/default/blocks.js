/*
 * Blocks use for rule condition or action exmple :
 *  
 * <condition type="script" ><![CDATA[Script lua !!!]]></condition>
 * <condition type="ioport-rx" expected="" object0="" object1="" object2="" object3="" regex="true" hex="true" />
 * 
 * <action type="script" ><![CDATA[Script lua !!!]]></action>
 * <action type="shell-cmd" cmd="./sh #path_plugin#default.sh ${#object1#} ${#object2#} ${#object3#} ${#object4#} ${#object5#}" var="true" />
 * <action type="ioport-tx" hex="false" data="data" var="true" />
 * 
 * here define new block for the plugin 
 */


//Script     <condition type="script">return tonumber(obj("setpoint_room1")) > tonumber(obj("temp_room1"));</condition> => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Lua_Scripting
Blockly.Blocks['condition_plugin_default'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Plugin Default condition type : Script")
        .appendField(new Blockly.FieldTextInput(""), "script")
        .appendField("(trigger")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger")
        .appendField(")");

    this.setInputsInline(true);
    this.setOutput(true, "condition");
    this.setTooltip('');
  }
};
Blockly.JavaScript['condition_plugin_default'] = function(block) {
  var value_script = block.getFieldValue('script') || '';
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';
  /*    */
  var code = '<condition type="script" trigger="' + checkbox_trigger + '" >' + value_script + '</condition>\n';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Script     <condition type="script">return tonumber(obj("setpoint_room1")) > tonumber(obj("temp_room1"));</condition> => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Lua_Scripting
Blockly.Blocks['action_plugin_default'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Plugin Default action type : Script")
        .appendField(new Blockly.FieldTextAreaInput(" -:| Click to choose an Object |:- ", editTextArea_script), "script")
        .appendField("(delay")
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip('SET object or value to an object and delay if you want');
  },
  domToMutation: function(container) {
    this.script_ = container.textContent; //getAttribute('script');
  }
};
Blockly.JavaScript['action_plugin_default'] = function(block) {
  var value_script = block.script_ || '';
  var value_delay = block.getFieldValue('delay');
  /*    */
  var code = '<action type="script" delay="' + value_delay + '" >' + value_script + '</action>\n';
  return code;
};
//Shell Cmd   <action type="shell-cmd" cmd="killall -v eibd" />
Blockly.Blocks['action_plugin_default2'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Plugin Default action type : Shell commande")
        //.appendField(new Blockly.FieldTextAreaInput(" -:| Click to choose a Rule |:- ", 'list_plugins'), "rule_id")
        .appendField(new Blockly.FieldDropdown(list_plugins), "plugin_id")
        .appendField("object1 :")
        .appendField(new Blockly.FieldTextAreaInput(" -:| Click to choose an Object |:- "), "object1")
        .appendField("object2 : ")
        .appendField(new Blockly.FieldTextAreaInput(" -:| Click to choose an Object |:- "), "object2")
        .appendField("(delay")
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip('SET object or value to an object and delay if you want');
  }
};
Blockly.JavaScript['action_plugin_default2'] = function(block) {
  var value_plugin_id = block.getFieldValue('plugin_id');
  //var value_cmd = block.getFieldValue('cmd') || '';
  var object1 = block.getFieldValue('object1');
  var object2 = block.getFieldValue('object2');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="shell-cmd" cmd="./sh #path_plugin#default.sh ${#object1#} ${#object2#} ${#object3#} ${#object4#} ${#object5#}" var="true" />  */
  var code = '<action type="shell-cmd" cmd="./sh ' + _path_knxweb + '/plugins/default/script.sh '+value_plugin_id+' ${' + object1 + '} ${' + object2 + '}" delay="' + value_delay + '" var="true"></action>\n';
  return code;
};

function init_default_Blocks() { // changer le nom de la function gérer comme les widgets ...
  // list_plugins = [['-:|Choose a Plugin|:-', '']];
  // mettre à jour la liste des plugins actif de type default ?
}


function PDefault(conf) {
	this.isResizable=true;
  this.init(conf);
  this.refreshHTML();
}
PDefault.type='default';
plugins.registerPlugin(PDefault);
PDefault.prototype = new PPlugin();
// Refresh HTML from config
PDefault.prototype.refreshHTML = function() {
  var displaypicture = this.conf.getAttribute("display-picture");
};
// Called by eibcommunicator when a feedback object value has changed
PDefault.prototype.updateObject = function(obj,value) {
};