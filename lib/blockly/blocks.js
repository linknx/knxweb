var OPERATORS = [
  ['=', 'eq'],
  ['\u2260', 'neq'],
  ['<', 'lt'],
  ['\u2264', 'lte'],
  ['>', 'gt'],
  ['\u2265', 'gte']
];

var Help_URL = 'https://sourceforge.net/p/linknx/wiki/Main_Page/'; //'http://www.example.com/';
if (typeof(tr) != "function") {
  function tr(p) { return p; }
}

Blockly.Blocks['list_objects'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(20);
    this.appendDummyInput()
        .appendField(tr("object")+" : ")
        .appendField(new Blockly.FieldDropdown(list_objects), "object");
    this.setOutput(true, "object");
    this.setTooltip(tr('List of Objects'));
  }
};
Blockly.JavaScript['list_objects'] = function(block) {
  var dropdown_object = block.getFieldValue('object');
  var code = dropdown_object; //'object_id=' + 
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// list_rules => pas utilisé 
Blockly.Blocks['list_rules'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(20);
    this.appendDummyInput()
        .appendField(tr("rule")+" :")
        .appendField(new Blockly.FieldDropdown(list_rules), "rule");
    this.setOutput(true, "rule");
    this.setTooltip(tr('List of Rules'));
  }
};
Blockly.JavaScript['list_rules'] = function(block) {
  var dropdown_rule = block.getFieldValue('rule');
  var code = dropdown_rule; 
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['value'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(20); //this.setColour(160);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage('media/quote0.png', 12, 12, '"'))
        .appendField(new Blockly.FieldTextInput(''), 'value')
        .appendField(new Blockly.FieldImage('media/quote1.png', 12, 12, '"'));
    this.setOutput(true, "String");
    this.setTooltip(tr('string value (on, off, 0, 1 ...)'));
  }
};

Blockly.JavaScript['value'] = function(block) {
  var text_value = block.getFieldValue('value');
  var code = text_value;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['timer_type'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(65);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[tr("Sunrise"), "sunrise"], [tr("Sunset"), "sunset"], [tr("noon"), "noon"]]), "timer_type")
        .appendField(tr("offset"))
        .appendField(new Blockly.FieldTextInput("0"), "offset")
        .appendField(" "+tr("day")+" :")
        .appendField(new Blockly.FieldTextInput(""), "day")
        .appendField(" "+tr("month")+" :")
        .appendField(new Blockly.FieldTextInput(""), "month")
        .appendField(" "+tr("year")+" :")
        .appendField(new Blockly.FieldTextInput(""), "year");
    this.setOutput(true, "timer_type");
    this.setTooltip('');
  }
};

Blockly.JavaScript['timer_type'] = function(block) {
  var dropdown_timer_type = block.getFieldValue('timer_type');
  var text_offset = block.getFieldValue('offset') || '0';
  var text_day = block.getFieldValue('day') || '';
  var text_month = block.getFieldValue('month') || '';
  var text_year = block.getFieldValue('year') || '';
  var code = ' type="' + dropdown_timer_type + '" offset="' + text_offset + '" day="' + text_day + '" month="' + text_month + '" year="' + text_year + '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
var default_rule;
Blockly.Blocks['default_rule'] = {
  init: function() {
    default_rule = this;
    var if_on = "if";
    var actions_true = new Blockly.FieldDropdown([[tr("if-true"), "if-true"], [tr("on-true"), "on-true"]], function(val) {
      if (val == "on-true" ) actions_false.setValue("on-false");
      else actions_false.setValue("if-false");
      return val;
      });
    var actions_false = new Blockly.FieldDropdown([[tr("if-false"), "if-false"], [tr("on-false"), "on-false"]], function(val) {
      if (val == "on-false" ) actions_true.setValue("on-true");
      else actions_true.setValue("if-true");
      return val;
      });

    this.setHelpUrl(Help_URL);
    this.setColour(290);
    this.appendValueInput("conditions")
        .setCheck("condition")
        .appendField(tr("if"));
    this.appendStatementInput("actionslist_true")
        .setCheck("action")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(actions_true, "true_type");
    this.appendStatementInput("actionslist_false")
        .setCheck("action")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(actions_false, "false_type");
    this.setTooltip(tr('A rule'));
    this.setMovable(false);
    //this.setDeletable(false);
  }
};
var statements_actionslist_true, statements_actionslist_false;
Blockly.JavaScript['default_rule'] = function(block) {

  var value_conditions = Blockly.JavaScript.valueToCode(block, 'conditions', Blockly.JavaScript.ORDER_ATOMIC);
  statements_actionslist_true = Blockly.JavaScript.statementToCode(block, 'actionslist_true');
  var dropdown_true_type = block.getFieldValue('true_type') || 'if-true';
  statements_actionslist_false = Blockly.JavaScript.statementToCode(block, 'actionslist_false');
  var dropdown_false_type = block.getFieldValue('false_type') || 'if-false';

  //var code = '<rule id="ID_rule" description="Description" init="false" >\n';
  var code = '<rule id="' + document.getElementsByName("id_rule")[0].value + '" description="' + document.getElementsByName("description")[0].value + '"';
  code = code + ' init="'+document.getElementsByName("init-rule")[0].value+'" active="'+((document.getElementsByName("auto_manu")[0].checked)?'yes':'no')+'">\n';
  code = code + value_conditions + '\n';
  if (statements_actionslist_true) code = code + '<actionlist type="' + dropdown_true_type + '">\n' + statements_actionslist_true + '\n</actionlist>\n';  
  if (statements_actionslist_false) code = code + '<actionlist type="' + dropdown_false_type + '">\n' + statements_actionslist_false + '\n</actionlist>\n';
  code = code + '</rule>';
  return code;
};


/*
rule simple exemple :

<rule id="ID_rule" description="Description" init="false" >
  <condition type="not">
    <condition type="and">
      <condition trigger="true" value="on" op="lte" id="1test" type="object"></condition>
      <condition id2="1test" op="eq" id="1test" type="object-compare"></condition>
      <condition src="1.1.20" value="0" op="eq" type="object-src"></condition>
    </condition>
  </condition>
  <actionlist type="on-true">
    <action value="on" id="1w_Temp_Ch1" delay="1" type="set-value"></action>
  </actionlist>
</rule>



*/





/* 
  Condition :  http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax
 
Ajout d'une condition   
And   
Or   
Not
Object   
Object Src   
Object Compare   
Timer   
Time Counter   
Ioport Rx   
Ioport Connect   
Script
*/
Blockly.Blocks['condition_AND_OR'] = {
  // Create a list with any number of elements of any type.
  init: function() {
    this.setColour(210);
    this.appendValueInput('ADD0')
        .appendField(new Blockly.FieldDropdown([[tr("AND"), "and"], [tr("OR"), "or"]]), "type")
        .setCheck('condition');
    this.appendValueInput('ADD1')
        .setCheck('condition');
    this.setOutput(true, 'condition');
    this.setMutator(new Blockly.Mutator(['condition_AND_OR_item']));
    this.setTooltip(tr('Condition OR or AND'));
    this.itemCount_ = 2;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(container) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('ADD' + x).setCheck('condition');
      if (x == 0) {
        input.appendField(new Blockly.FieldDropdown([[tr("AND"), "and"], [tr("OR"), "or"]]), "type");
      }
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    }
  },
  decompose: function(workspace) {
    var containerBlock =
        Blockly.Block.obtain(workspace, 'condition_AND_OR_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'condition_AND_OR_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('ADD' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('ADD' + this.itemCount_);
      if (this.itemCount_ == 0) {
        input.appendField(new Blockly.FieldDropdown([[tr("AND"), "and"], [tr("OR"), "or"]]), "type");
      }
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['condition_AND_OR_container'] = {
  // Container.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['condition_AND_OR_item'] = {
  // Add items.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.JavaScript['condition_AND_OR'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  // Create a list with any number of elements of any type.
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
        Blockly.JavaScript.ORDER_ATOMIC) || '';
  }
  code = "<condition type=\""+ dropdown_type  + "\">\n" + code.join('\n') + "\n</condition>";
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['condition_not'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax');
    this.setColour(210);
    /*
    this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,
                        ['BOOL', 'Boolean', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    
    this.appendValueInput("NOT")
        .setCheck("condition")
        .appendField("NOT");
    */
    this.appendValueInput("NOT")
        .setCheck("condition")
        .appendField(tr("NOT"));
    this.setOutput(true, "condition");
    //this.setTooltip('Condition NOT');
    this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
  }
};

Blockly.JavaScript['condition_not'] = function(block) {
  var value_not = Blockly.JavaScript.valueToCode(block, 'NOT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "<condition type=\"not\">\n" + value_not + "\n</condition>"; 
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/*
Object   
Object Compare
Object Src
*/

Blockly.Blocks['condition_object'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax');
    this.setColour(210);
    /*this.appendValueInput("id")
        .setCheck("object");*/
        
    this.appendDummyInput("id")
        //.appendField("object : ")
        .appendField(new Blockly.FieldDropdown(list_objects), "id")
        .appendField(" ");

    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(OPERATORS), "op");
        //.appendField(new Blockly.FieldDropdown([["=", "eq"], ["!=", "neq"], [">", "gt"], ["<", "lt"], [">=", "gte"], ["<=", "lte"]]), "op");
    this.appendValueInput("id2")
        .setCheck(["object", "String"]);
    this.appendDummyInput()
        .appendField("("+tr("trigger"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger")
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "condition");
    //this.setTooltip('Compare Object and value or object and trigger if you want');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
        NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
        LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
        LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
        GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
        GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
      };
      return TOOLTIPS[op];
    });
  }
};
var value_test;
Blockly.JavaScript['condition_object'] = function(block) {
  //var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var value_id = block.getFieldValue('id');
  var value_id2 = Blockly.JavaScript.valueToCode(block, 'id2', Blockly.JavaScript.ORDER_ATOMIC) || '';
  if (value_id2 == "undefined") value_id2 = "";
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';
  var dropdown_op = block.getFieldValue('op');
/* 
<condition type="object" id="1test" op="lte" value="on" trigger="true" ></condition>
<condition type="object-compare" id="1test" op="eq" id2="1test"></condition>
<condition type="object-src" id="1test" op="eq" value="0" src="1.1.20" ></condition>
*/
  value_test = block;
  if ( block.getChildren()[0] && block.getChildren()[0].type == "list_objects" ) {
  // si "value" est de type "object" alors c'est une condition de type : object-compare
    var code = '<condition type="object-compare" id="' + value_id + '" op="' + dropdown_op + '" value="' + value_id2 + '" trigger="' + checkbox_trigger + '" ></condition>';
  } else {
    var code = '<condition type="object" id="' + value_id + '" op="' + dropdown_op + '" value="' + value_id2 + '" trigger="' + checkbox_trigger + '" ></condition>';
  }

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//Script     <condition type="script">return tonumber(obj("setpoint_room1")) > tonumber(obj("temp_room1"));</condition> => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Lua_Scripting
Blockly.Blocks['condition_script'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax');
    this.setColour(210);
    this.appendDummyInput()
        .appendField(tr("Script"))
        .appendField(new Blockly.FieldTextInput(""), "script")
        .appendField("("+tr("trigger"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger")
        .appendField(")");

    this.setInputsInline(true);
    this.setOutput(true, "condition");
    this.setTooltip('');
  }
};
Blockly.JavaScript['condition_script'] = function(block) {
  var value_script = block.getFieldValue('script') || '';
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';
  /*    */
  var code = '<condition type="script" trigger="' + checkbox_trigger + '" >' + value_script + '</condition>\n';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
/*
Time Counter
    <condition type="time-counter" threshold="6" reset-delay="4" >
       <condition type="object" id="Test_Switch1" value="on" trigger="true" />
    </condition>  
*/
Blockly.Blocks['condition_time-counter'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax');
    this.setColour(210);
    this.appendDummyInput()
        .appendField(tr("Time Counter : threshold"))
        .appendField(new Blockly.FieldTextInput(""), "threshold")
        .appendField(tr("reset-delay"))
        .appendField(new Blockly.FieldTextInput(""), "reset_delay")
        .appendField("("+tr("trigger"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger")
        .appendField(")")
    this.appendValueInput("condition")
        .setCheck("condition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(tr("Condition"));
    this.setOutput(true, "condition");
    this.setTooltip('');
  }
};
Blockly.JavaScript['condition_time-counter'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var value_threshold = block.getFieldValue('threshold') || '';
  var value_reset_delay = block.getFieldValue('reset_delay') || '';
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';
  /*  <condition type="time-counter" threshold="6" reset-delay="4" >
       <condition type="object" id="Test_Switch1" value="on" trigger="true" />
    </condition>   */
  var code = '<condition type="time-counter" threshold="' + value_threshold + '" reset-delay="' + value_reset_delay + '" trigger="' + checkbox_trigger + '" >' + value_condition + '</condition>\n';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


/*

timer :

<condition type="timer"><at offset="0" wdays="1234567" type="sunrise"></at><until min="00" hour="10"></until></condition>
<condition type="timer"><at wdays="1234567" min="05" hour="10"></at><until time="Heure" type="variable"></until></condition>
<condition type="timer"><every>2h</every><during>2h</during></condition>


*/
Blockly.Blocks['condition_timer'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Condition%27s_Syntax#Timer_conditions:');
    this.setColour(210);

    AtEvery = new Blockly.FieldDropdown([
        [tr("At"), "at"],
        [tr("Every"), "every"]],
        function(option) {
          var block = this.sourceBlock_;
          var atExists = block.getInput('at');
          var at_wdaysExists = block.getInput('at_wdays');
          var at_exceptionExists = block.getInput('at_exception');
          var everygExists = block.getInput('every');
          block.AtEvery_ = option;
          if (option == 'at') {
            if (!atExists) {
              block.appendValueInput("at")
                   .setCheck("timer_type");
              block.moveInputBefore('at', 'UntilDuring');
            }
            if (!at_wdaysExists) {
              block.appendValueInput("at_wdays")
                   .setCheck("week_days")
                   .appendField(tr("WeekDays"));
              block.moveInputBefore('at_wdays', 'UntilDuring');
            }
            if (!at_exceptionExists) {
              block.appendDummyInput("at_exception")
                   .appendField("Exception days")
                   .appendField(new Blockly.FieldDropdown([[tr("Not Use"), ""], [tr("TRUE"), "TRUE"], [tr("FALSE"), "FALSE"]]), "at_exception");
              block.moveInputBefore('at_exception', 'UntilDuring');
            }
          } else {
            if (atExists) {
              block.removeInput('at');
            }
            if (at_wdaysExists) {
              block.removeInput('at_wdays');
            }
            if (at_exceptionExists) {
              block.removeInput('at_exception');
            }
          }
          if (option == 'every') {
            if (!everygExists) {
              block.appendDummyInput("every")
                  .appendField(tr("Every")+" : (ex. 2h)")
                  .appendField(new Blockly.FieldTextInput(""), "every");
              block.moveInputBefore('every', 'UntilDuring');
            }
          } else if (everygExists) {
            block.removeInput('every');
          }
        });
    this.appendDummyInput('AtEvery')
        .appendField(AtEvery, 'AtEvery');
    this.appendValueInput("at")
        .setCheck("timer_type");
    this.appendValueInput("at_wdays")
        .setCheck("week_days")
        .appendField(tr("WeekDays"));
    this.appendDummyInput('at_exception')
        .appendField(tr("Exception days"))
        .appendField(new Blockly.FieldDropdown([[tr("Not Use"), ""], [tr("TRUE"), "TRUE"], [tr("FALSE"), "FALSE"]]), "at_exception");

    /*
    this.appendDummyInput("every")
        .appendField("Every : (ex. 2h)")
        .appendField(new Blockly.FieldTextInput(""), "every");
        */
   UntilDuring = new Blockly.FieldDropdown([
        [tr("Not Use"), ""],
        [tr("Until"), "until"],
        [tr("During"), "during"]],
        function(option) {
          var block = this.sourceBlock_;
          var untilExists = block.getInput('until');
          var until_wdaysExists = block.getInput('until_wdays');
          var until_exceptionExists = block.getInput('until_exception');
          var duringExists = block.getInput('during');
          block.UntilDuring_ = option;
          if (option == 'until') {
            if (!untilExists) {
              block.appendValueInput("until")
                   .setCheck("timer_type");
              block.moveInputBefore('until', 'Trigger');
            }
            if (!until_wdaysExists) {
              block.appendValueInput("until_wdays")
                   .setCheck("week_days")
                   .appendField(tr("WeekDays"));
              block.moveInputBefore('until_wdays', 'Trigger');
            }
            if (!until_exceptionExists) {
              block.appendDummyInput("until_exception")
                   .appendField(tr("Exception days"))
                   .appendField(new Blockly.FieldDropdown([[tr("Not Use"), ""], [tr("TRUE"), "TRUE"], [tr("FALSE"), "FALSE"]]), "until_exception");
              block.moveInputBefore('until_exception', 'Trigger');
            }
          } else {
            if (untilExists) {
              block.removeInput('until');
            }
            if (until_wdaysExists) {
              block.removeInput('until_wdays');
            }
            if (until_exceptionExists) {
              block.removeInput('until_exception');
            }
          }
          if (option == 'during') {
            if (!duringExists) {
              block.appendDummyInput("during")
                  .appendField(tr("During")+" : (ex. 2h)")
                  .appendField(new Blockly.FieldTextInput(""), "during");
              block.moveInputBefore('during', 'Trigger');
            }
          } else if (duringExists) {
            block.removeInput('during');
          }
        });
    this.appendDummyInput('UntilDuring')
        .appendField(UntilDuring, 'UntilDuring');
/*        
    this.appendValueInput("until")
        .setCheck("timer_type");
    this.appendValueInput("until_wdays")
        .setCheck("week_days")
        .appendField("WeekDays");
    this.appendDummyInput("until_exception")
        .appendField("Exception days")
        .appendField(new Blockly.FieldDropdown([["Not Use", ""], ["TRUE", "TRUE"], ["FALSE", "FALSE"]]), "until_exception");

    this.appendDummyInput("during")
        .appendField("During : (ex. 2h)")
        .appendField(new Blockly.FieldTextInput(""), "during");
*/        
    
    this.appendDummyInput("Trigger")
        .appendField(tr("trigger"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger");
    this.setOutput(true, "condition");
    this.setTooltip('');
    
    this.AtEvery_ = 'at';
    this.UntilDuring_ = '';
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('atevery', this.AtEvery_);
    container.setAttribute('untilduring', this.UntilDuring_);
    return container;
  },
  domToMutation: function(container) {
    var option = container.getAttribute('atevery');
    var block = this;
    this.removeInput('at');
    this.removeInput('at_wdays');
    this.removeInput('at_exception');
    if(this.getInput('every')) this.removeInput('every');
    if (option == 'at') {
      this.appendValueInput("at")
           .setCheck("timer_type");
      this.moveInputBefore('at', 'UntilDuring');
      this.appendValueInput("at_wdays")
           .setCheck("week_days")
           .appendField(tr("WeekDays"));
      this.moveInputBefore('at_wdays', 'UntilDuring');
      this.appendDummyInput("at_exception")
           .appendField(tr("Exception days"))
           .appendField(new Blockly.FieldDropdown([[tr("Not Use"), ""], [tr("TRUE"), "TRUE"], [tr("FALSE"), "FALSE"]]), "at_exception");
      this.moveInputBefore('at_exception', 'UntilDuring');
    }
    if (option == 'every') {
      this.appendDummyInput("every")
          .appendField(tr("Every")+" : (ex. 2h)")
          .appendField(new Blockly.FieldTextInput(""), "every");
      this.moveInputBefore('every', 'UntilDuring');
    }

   
    option = container.getAttribute('untilduring');
    if (option == 'until') {
      this.appendValueInput("until")
           .setCheck("timer_type");
      this.moveInputBefore('until', 'Trigger');
      this.appendValueInput("until_wdays")
           .setCheck("week_days")
           .appendField(tr("WeekDays"));
      this.moveInputBefore('until_wdays', 'Trigger');
      this.appendDummyInput("until_exception")
           .appendField(tr("Exception days"))
           .appendField(new Blockly.FieldDropdown([[tr("Not Use"), ""], [tr("TRUE"), "TRUE"], [tr("FALSE"), "FALSE"]]), "until_exception");
      this.moveInputBefore('until_exception', 'Trigger');
    }
    if (option == 'during') {
      this.appendDummyInput("during")
          .appendField(tr("During")+" : (ex. 2h)")
          .appendField(new Blockly.FieldTextInput(""), "during");
      this.moveInputBefore('during', 'Trigger');
    }    
  },
  compose: function(containerBlock) {
    console.log('compose', containerBlock);
  },
  saveConnections: function(containerBlock) {
    console.log('saveConnections', containerBlock);
  }
};

Blockly.JavaScript['condition_timer'] = function(block) {
  var value_AtEvery = block.getFieldValue('AtEvery');
  var value_at = Blockly.JavaScript.valueToCode(block, 'at', Blockly.JavaScript.ORDER_ATOMIC);
  var value_at_wdays = Blockly.JavaScript.valueToCode(block, 'at_wdays', Blockly.JavaScript.ORDER_ATOMIC);
  var value_at_exception = block.getFieldValue('at_exception');
  switch(value_at_exception){  
    case "TRUE":                               
    value_at_exception = ' exception="yes"'; 
    break; 
    case "FALSE": 
    value_at_exception = ' exception="no"'; 
    break; 
  }
  var value_every = block.getFieldValue('every');
  var value_UntilDuring = block.getFieldValue('UntilDuring');
  var value_until = Blockly.JavaScript.valueToCode(block, 'until', Blockly.JavaScript.ORDER_ATOMIC);
  var value_until_wdays = Blockly.JavaScript.valueToCode(block, 'until_wdays', Blockly.JavaScript.ORDER_ATOMIC);
  var value_until_exception = block.getFieldValue('until_exception') || '';
  switch(value_until_exception){  
    case "TRUE":                               
    value_until_exception = ' exception="yes"'; 
    break; 
    case "FALSE": 
    value_until_exception = ' exception="no"'; 
    break; 
  }
  var value_during = block.getFieldValue('during');
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';

  //<condition type="timer"><at wdays="1234567" type="sunrise" offset="0" ></at><until min="00" hour="10"></until></condition>
  //<condition type="timer"><at wdays="1234567" min="05" hour="10"></at><until time="Heure" type="variable"></until></condition>
  var code = '<condition type="timer" trigger="' + checkbox_trigger + '" >\n';
  
  if (value_AtEvery == "at") {
    code = code + '<at ' + value_at + value_at_wdays + value_at_exception + '></at>\n';
  } else {
    code = code + '<every>' + value_every + '</every>\n';  
  } 
  if (value_UntilDuring == "until") {
    code = code + '<until ' + value_until + value_until_wdays + value_until_exception + '></until>\n';
  } else if (value_UntilDuring == "during") {
    code = code + '<during>' + value_during + '</during>\n';  
  } 
  code = code + '</condition>';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['timer_hour'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(65);
    this.appendDummyInput()
        .appendField(tr("hour"))
        .appendField(new Blockly.FieldTextInput(""), "hour")
        .appendField(" "+tr("minute")+" :")
        .appendField(new Blockly.FieldTextInput(""), "minute")
        .appendField(" "+tr("day")+" :")
        .appendField(new Blockly.FieldTextInput(""), "day")
        .appendField(" "+tr("month")+" :")
        .appendField(new Blockly.FieldTextInput(""), "month")
        .appendField(" "+tr("year")+" :")
        .appendField(new Blockly.FieldTextInput(""), "year");
    this.setOutput(true, "timer_type");
    this.setTooltip(tr('hour : minute'));
  }
};

Blockly.JavaScript['timer_hour'] = function(block) {
  var text_hour = block.getFieldValue('hour');
  var text_minute = block.getFieldValue('minute');
  var text_day = block.getFieldValue('day');
  var text_month = block.getFieldValue('month');
  var text_year = block.getFieldValue('year');
  var code = ' hour="' + text_hour + '" min="' + text_minute + '" day="' + text_day + '" month="' + text_month + '" year="' + text_year + '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['timer_date_object'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(20);
    this.appendValueInput("date")
        .setCheck("timer_type")
        .appendField(tr("date object")+" : ")
        .appendField(new Blockly.FieldDropdown(list_object_date), "object");
    this.setOutput(true, "timer_type");
    this.setTooltip(tr('List of Objects'));
  }
};
Blockly.JavaScript['timer_date_object'] = function(block) {
  var value_date = Blockly.JavaScript.valueToCode(block, 'date', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var dropdown_object = block.getFieldValue('object');
  var code = ' type="variable" time="' + dropdown_object + '"' + value_date;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.Blocks['timer_hour_object'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(20);
    //this.appendDummyInput()
    this.appendValueInput("date")
        .appendField(tr("time object")+" : ")
        .appendField(new Blockly.FieldDropdown(list_object_time), "object");
    this.setOutput(true, "timer_type");
    this.setTooltip(tr('List of Objects'));
  }
};
Blockly.JavaScript['timer_hour_object'] = function(block) {
  var value_date = Blockly.JavaScript.valueToCode(block, 'date', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var dropdown_object = block.getFieldValue('object');
  var code = ' type="variable" time="' + dropdown_object + '"' + value_date;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['timer_weekdays'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(65);
    this.appendDummyInput()
        .appendField(tr("WeekDays"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J1")
        .appendField(tr("Mo"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J2")
        .appendField(tr("Tu"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J3")
        .appendField(tr("We"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J4")
        .appendField(tr("Th"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J5")
        .appendField(tr("Fr"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J6")
        .appendField(tr("Sa"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "J7")
        .appendField(tr("Su"));
    this.setOutput(true, "week_days");
    this.setTooltip(tr('WeekDays'));
  }
};

Blockly.JavaScript['timer_weekdays'] = function(block) {
  //var checkbox_Lu = block.getFieldValue('Lu') == 'TRUE';
  var wdays ='';
  for(var i=1;i<=7;i++) if (block.getFieldValue('J'+i) == 'TRUE') wdays+=i;
  // TODO à terminer
  var code = ' wdays="' + wdays + '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};




/*
  Action : http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax

Set Value           <action type="set-value" id="kitchen_heating" value="comfort" />
Copy Value          <action type="copy-value" from="heating_mode" to="prev_heating_mode"/>
Toggle Value        <action type="toggle-value" id="door_light"/>
Set String          <action type="set-string" id="lcd_text" value="T° ext: ${ext_temp}°C" />
Send Read Request   <action type="send-read-request" id="gas_counter_value" />
Cycle On Off        <action type="cycle-on-off" id="closet_lights" on="5" off="5" count="10" />
Repeat
    <action type="repeat" period="2" count="3">
         <action type="toggle-value" id="door_light"/>
         <action type="toggle-value" id="door_light" delay="500ms"/>
    </action>
    
Conditional
    <action type="conditional">
      <condition type="object" id="alarm_email_enabled" value="on" />
      <action type="send-email"  to="help@example.com" subject="Foreign contaminant">Intrusion in your shrubbery!</action>
    </action>

Send Sms  <action type="send-sms"  id="32494123456" value="Temp value ${ext_temp}" var="true" />
Send Email  <action type="send-email"  to="help@example.com" subject="Foreign contaminant ${ext_temp}" var="true" >Intrusion in your shrubbery! ${ext_temp} </action>
Dim Up      <action type="dim-up" id="dim_value_kitchen" start="0" stop="240" duration="1800" />
Shell Cmd   <action type="shell-cmd" cmd="killall -v eibd" />
Ioport Tx  => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=IO_Ports
Script     <condition type="script">return tonumber(obj("setpoint_room1")) > tonumber(obj("temp_room1"));</condition> => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Lua_Scripting
Cancel   <action type="cancel" rule-id="flashing_lights" />
Formula  <action type="formula" id="object_id_result" n="1.0" m="2.0" c="3.0" b="4.0" a="5.0" y="object_id_y" x="object_id_x" ></action>
Start actionlist   <action type="start-actionlist" list="true/false" rule-id="flashing_lights" />
Set rule active   <action type="set-rule-active" active="no/yes" rule-id="flashing_lights" />
*/
  
Blockly.Blocks['action_set_value'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Set"))
        .appendField(new Blockly.FieldImage('media/quote0.png', 12, 12, '"'))
        .appendField(new Blockly.FieldTextInput(''), 'value')
        .appendField(new Blockly.FieldImage('media/quote1.png', 12, 12, '"'))
        .appendField(tr("To"))
        .appendField(new Blockly.FieldDropdown(list_objects), "id")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_set_value'] = function(block) {
  //var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = block.getFieldValue('value');
  var value_id = block.getFieldValue('id');
  var value_delay = block.getFieldValue('delay');
  //<action value="on" id="1w_Temp_Ch1" delay="1" type="set-value"></action>
  /*
  <action type="set-value" id="kitchen_heating" value="comfort" />
  <action type="copy-value" from="heating_mode" to="prev_heating_mode"/>
  */
  var code = '<action type="set-value" value="' + value_value + '" id="' + value_id + '" delay="' + value_delay + '" ></action>\n'; 
  return code;
};
Blockly.Blocks['action_set_object'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Set"))
        .appendField(new Blockly.FieldDropdown(list_objects), "from")
        .appendField(tr("To"))
        .appendField(new Blockly.FieldDropdown(list_objects), "to")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_set_object'] = function(block) {
  var value_from = block.getFieldValue('from');
  var value_to = block.getFieldValue('to');
  var value_delay = block.getFieldValue('delay');
  /*
  <action type="copy-value" from="heating_mode" to="prev_heating_mode"/>
  */
  var code = '<action type="copy-value" from="' + value_from + '" to="' + value_to + '" delay="' + value_delay + '" ></action>\n'; 
  return code;
};

//Toggle Value        <action type="toggle-value" id="door_light"/>
Blockly.Blocks['action_toggle-value'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Toggle"))
        .appendField(new Blockly.FieldDropdown(list_objects_1_001), "id")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_toggle-value'] = function(block) {
  var value_id = block.getFieldValue('id');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="toggle-value" id="door_light"/>  */
  var code = '<action type="toggle-value" id="' + value_id + '" delay="' + value_delay + '" ></action>\n';
  return code;
};
//Send Read Request   <action type="send-read-request" id="gas_counter_value" />
Blockly.Blocks['action_send-read-request'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Send Read Request to"))
        .appendField(new Blockly.FieldDropdown(list_objects), "id")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_send-read-request'] = function(block) {
  var value_id = block.getFieldValue('id');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="send-read-request" id="gas_counter_value" />  */
  var code = '<action type="send-read-request" id="' + value_id + '" delay="' + value_delay + '" ></action>\n';
  return code;
};
/* Repeat
    <action type="repeat" period="2" count="3">
         <action type="toggle-value" id="door_light"/>
         <action type="toggle-value" id="door_light" delay="500ms"/>
    </action>
*/
Blockly.Blocks['action_repeat'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Reapeat period :"))
        .appendField(new Blockly.FieldTextInput(""), "period")
        .appendField(tr("count")+" :")
        .appendField(new Blockly.FieldTextInput(""), "count")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");
    this.appendStatementInput("actions")
        .setCheck("action")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(tr("actions")+" :");

    //this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_repeat'] = function(block) {
  var value_period = block.getFieldValue('period') || '0';
  var value_count = block.getFieldValue('count') || '0';
  
  //var value_actions = Blockly.JavaScript.valueToCode(block, 'actions', Blockly.JavaScript.ORDER_ATOMIC);
  var value_actions = Blockly.JavaScript.statementToCode(block, 'actions');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="repeat" period="2" count="3">
         <action type="toggle-value" id="door_light"/>
         <action type="toggle-value" id="door_light" delay="500ms"/>
    </action>  */
  var code = '<action type="repeat" period="' + value_period + '" count="' + value_count + '" delay="' + value_delay + '" >\n' + value_actions + '\n</action>\n';
  return code;
};
/* Conditional
    <action type="conditional">
      <condition type="object" id="alarm_email_enabled" value="on" />
      <action type="send-email"  to="help@example.com" subject="Foreign contaminant">Intrusion in your shrubbery!</action>
    </action>
*/
Blockly.Blocks['action_Conditional'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendValueInput("condition")
        .setCheck("condition")
        .appendField(tr("Conditional"))
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");
    this.appendStatementInput("actions")
        .setCheck("action")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(tr("actions")+" :");

    //this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_Conditional'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  
  var value_actions = Blockly.JavaScript.statementToCode(block, 'actions');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="conditional">
      <condition type="object" id="alarm_email_enabled" value="on" />
      <action type="send-email"  to="help@example.com" subject="Foreign contaminant">Intrusion in your shrubbery!</action>
    </action>  */
  var code = '<action type="conditional" delay="' + value_delay + '" >\n' + value_condition + '\n' + value_actions + '\n</action>\n';
  return code;
};
//Send Sms  <action type="send-sms"  id="32494123456" value="Temp value ${ext_temp}" var="true" />
Blockly.Blocks['action_send-sms'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("SMS to"))
        .appendField(new Blockly.FieldTextInput(""), "id")
        .appendField(tr("Message")+" :")
        .appendField(new Blockly.FieldTextInput(""), "value")
        /*.appendField(" object in the message :")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "var")*/
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_send-sms'] = function(block) {
  var value_id = block.getFieldValue('id') || '';
  var value_value = block.getFieldValue('value') || '';
  //var checkbox_var = block.getFieldValue('var') != 'FALSE';
  var checkbox_var = "true";
  var value_delay = block.getFieldValue('delay');
  /*  <action type="send-sms"  id="32494123456" value="Temp value ${ext_temp}" var="true" />  */
  var code = '<action type="send-sms" id="' + value_id + '" value="' + value_value + '" var="' + checkbox_var + '" delay="' + value_delay + '" ></action>\n';
  return code;
};
//Send Email  <action type="send-email"  to="help@example.com" subject="Foreign contaminant ${ext_temp}" var="true" >Intrusion in your shrubbery! ${ext_temp} </action>
Blockly.Blocks['action_send-email'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Email to"))
        .appendField(new Blockly.FieldTextInput(""), "to")
        .appendField(tr("Subject")+" :")
        .appendField(new Blockly.FieldTextInput(""), "subject")
        .appendField(tr("Message")+" :")
        .appendField(new Blockly.FieldTextInput(""), "message")
        /*.appendField(" object in the message :")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "var")*/
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_send-email'] = function(block) {
  var value_to = block.getFieldValue('to') || '';
  var value_subject = block.getFieldValue('subject') || '';
  //var checkbox_var = block.getFieldValue('var') != 'FALSE';
  var checkbox_var = "true";
  var value_delay = block.getFieldValue('delay');
  var value_message = block.getFieldValue('message') || '';
  /*  <action type="send-email"  to="help@example.com" subject="Foreign contaminant ${ext_temp}" var="true" >Intrusion in your shrubbery! ${ext_temp} </action>  */
  var code = '<action type="send-email" to="' + value_to + '" subject="' + value_subject + '" var="' + checkbox_var + '" delay="' + value_delay + '" >' + value_message + '</action>\n';
  return code;
};
//Shell Cmd   <action type="shell-cmd" cmd="killall -v eibd" />
Blockly.Blocks['action_shell-cmd'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Shell command"))
        .appendField(new Blockly.FieldTextInput(""), "cmd")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_shell-cmd'] = function(block) {
  var value_cmd = block.getFieldValue('cmd') || '';
  var value_delay = block.getFieldValue('delay');
  /*  <action type="shell-cmd" cmd="killall -v eibd" />  */
  var code = '<action type="shell-cmd" cmd="' + value_cmd + '" delay="' + value_delay + '" var="true"></action>\n';
  return code;
};
//Dim Up      <action type="dim-up" id="dim_value_kitchen" start="0" stop="240" duration="1800" />
Blockly.Blocks['action_dim-up'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Dim-up"))
        .appendField(new Blockly.FieldDropdown(list_objects), "id")
        .appendField(tr("start"))
        .appendField(new Blockly.FieldTextInput(""), "start")
        .appendField(tr("stop"))
        .appendField(new Blockly.FieldTextInput(""), "stop")
        .appendField(tr("duration"))
        .appendField(new Blockly.FieldTextInput(""), "duration")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_dim-up'] = function(block) {
  var value_start = block.getFieldValue('start') || '0';
  var value_stop = block.getFieldValue('stop') || '240';
  var value_duration = block.getFieldValue('duration') || '1800';
  var value_id = block.getFieldValue('id');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="dim-up" id="dim_value_kitchen" start="0" stop="240" duration="1800" />  */
  var code = '<action type="dim-up" id="' + value_id + '" start="' + value_start + '" stop="' + value_stop + '" duration="' + value_duration + '" delay="' + value_delay + '" ></action>\n';
  return code;
};
//Script     <condition type="script">return tonumber(obj("setpoint_room1")) > tonumber(obj("temp_room1"));</condition> => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Lua_Scripting
Blockly.Blocks['action_script'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Script"))
        .appendField(new Blockly.FieldTextInput(""), "script")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  },
  domToMutation: function(container) {
    //console.log(" action Script domToMutation", container); //, container.getAttribute('script')
    this.script_ = container.textContent; //getAttribute('script');
  }
};
Blockly.JavaScript['action_script'] = function(block) {
  //var value_script = block.getFieldValue('script') || '';
  var value_script = block.script_ || '';
  var value_delay = block.getFieldValue('delay');
  /*    */
  var code = '<action type="script" delay="' + value_delay + '" >' + value_script + '</action>\n';
  return code;
};



//Formula  <action type="formula" id="object_id_result" n="1.0" m="2.0" c="3.0" b="4.0" a="5.0" y="object_id_y" x="object_id_x" ></action>
Blockly.Blocks['action_formula'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Formula")+" (id=a*x^m+b*y^n+c)")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");
    this.appendDummyInput()
        .appendField("id")
        .appendField(new Blockly.FieldDropdown(list_objects), "id");
    this.appendDummyInput()
        .appendField("a")
        .appendField(new Blockly.FieldTextInput("1.0"), "a")
        .appendField("b")
        .appendField(new Blockly.FieldTextInput("1.0"), "b")
        .appendField("c")
        .appendField(new Blockly.FieldTextInput("0"), "c")
        .appendField("n")
        .appendField(new Blockly.FieldTextInput("1.0"), "n")
        .appendField("m")
        .appendField(new Blockly.FieldTextInput("1.0"), "m");
    this.appendDummyInput()
        .appendField("x")
        .appendField(new Blockly.FieldDropdown(list_objects), "x");
    this.appendDummyInput()
        .appendField("y")
        .appendField(new Blockly.FieldDropdown(list_objects), "y");

    //this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_formula'] = function(block) {
  //var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  var value_id = block.getFieldValue('id');
  var value_a = block.getFieldValue('a') || '1.0';
  var value_b = block.getFieldValue('b') || '1.0';
  var value_c = block.getFieldValue('c') || '0';
  var value_n = block.getFieldValue('n') || '1.0';
  var value_m = block.getFieldValue('m') || '1.0';
  var value_x = block.getFieldValue('x');
  //var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = block.getFieldValue('y');
  //var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_delay = block.getFieldValue('delay');
  /*  <action <action type="formula" id="object_id_result" n="1.0" m="2.0" c="3.0" b="4.0" a="5.0" y="object_id_y" x="object_id_x" ></action>  */
  var code = '<action type="formula" id="' + value_id + '" a="' + value_a + '" b="' + value_b + '" c="' + value_c + '" n="' + value_n + '" m="' + value_m + '" x="' + value_x + '" y="' + value_y + '" delay="' + value_delay + '" ></action>\n';
  return code;
};

//Cycle On Off        <action type="cycle-on-off" id="closet_lights" on="5" off="5" count="10" />
Blockly.Blocks['action_cycle_on_off'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Cycle-on-off on/off nb time until count"))
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");
    this.appendDummyInput()
        .appendField("id")
        .appendField(new Blockly.FieldDropdown(list_objects), "id");
    this.appendDummyInput()
        .appendField(tr("On"))
        .appendField(new Blockly.FieldTextInput(""), "on")
        .appendField(tr("Off"))
        .appendField(new Blockly.FieldTextInput(""), "off")
        .appendField(tr("Count"))
        .appendField(new Blockly.FieldTextInput(""), "count");
    this.appendValueInput("condition")
        .setCheck("condition")
        .appendField(tr("Stop condition"));
    //this.setOutput(true, "condition");

    //this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_cycle_on_off'] = function(block) {
  var value_id = block.getFieldValue('id');
  var value_on = block.getFieldValue('on');
  var value_off = block.getFieldValue('off');
  var value_count = block.getFieldValue('count');
  var value_delay = block.getFieldValue('delay');
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  /*  Cycle On Off        <action type="cycle-on-off" id="closet_lights" on="5" off="5" count="10" ><stopcondition /></action> */
  var code = '<action type="cycle-on-off" id="' + value_id + '" on="' + value_on + '" off="' + value_off + '" count="' + value_count + '" delay="' + value_delay + '" >'
  code = code + '<stopcondition' +value_condition.substring(10, value_condition.length -10) + 'stopcondition>';
  code = code +'</action>\n';
  return code;
};

/*

TODO action :
Set String          <action type="set-string" id="lcd_text" value="T° ext: ${ext_temp}°C" />


*/  
//Cancel   <action type="cancel" rule-id="flashing_lights" />
Blockly.Blocks['action_Cancel'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput("rule_id")
        .appendField(tr("Cancel rule"))
        //.appendField(new Blockly.FieldDropdown(list_rules), "rule_id")
        .appendField(new Blockly.FieldDropdown(list_rules), "rule_id")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_Cancel'] = function(block) {
  var value_rule_id = block.getFieldValue('rule_id');
  var value_delay = block.getFieldValue('delay');
  /*  <action type="cancel" rule-id="flashing_lights" />  */
  var code = '<action type="cancel" rule-id="' + value_rule_id + '" delay="' + value_delay + '" ></action>\n';
  return code;
};  
//Start actionlist   <action type="start-actionlist" list="true/false" rule-id="flashing_lights" />
Blockly.Blocks['action_start-actionlist'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Rule")
        //.appendField(new Blockly.FieldDropdown(list_rules), "rule_id")
        .appendField(new Blockly.FieldDropdown(list_rules), "rule_id")
        .appendField(tr("Start actionlist"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "list")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip('SET object or value to an object and delay if you want');
  }
};
Blockly.JavaScript['action_start-actionlist'] = function(block) {
  var value_rule_id = block.getFieldValue('rule_id');
  var checkbox_list = block.getFieldValue('list') == 'TRUE';
  var value_delay = block.getFieldValue('delay');
  /*  <action type="start-actionlist" list="true/false" rule-id="flashing_lights" />  */
  var code = '<action type="start-actionlist" rule-id="' + value_rule_id + '" list="' + checkbox_list + '" delay="' + value_delay + '" ></action>\n';
  return code;
};
//Set rule active   <action type="set-rule-active" active="no/yes" rule-id="flashing_lights" />
Blockly.Blocks['action_set-rule-active'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Rule"))
        //.appendField(new Blockly.FieldDropdown(list_rules), "rule_id")
        .appendField(new Blockly.FieldDropdown(list_rules), "rule_id")
        .appendField(tr("Active"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "active")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_set-rule-active'] = function(block) {
  var value_rule_id = block.getFieldValue('rule_id');
  var checkbox_active = ((block.getFieldValue('list') == 'TRUE')?"yes":"no");
  var value_delay = block.getFieldValue('delay');
  /*  Set rule active   <action type="set-rule-active" active="no/yes" rule-id="flashing_lights" /> */
  var code = '<action type="set-rule-active" rule-id="' + value_rule_id + '" active="' + checkbox_active + '" delay="' + value_delay + '" ></action>\n';
  return code;
};



/*

IO-Port : http://sourceforge.net/apps/mediawiki/linknx/index.php?title=IO_Ports

Condition 
Ioport Rx  <condition type="ioport-rx" expected="samsung,red" ioport="irtrans" trigger="true" />

      <condition type="" expected="" ioport="" regex="(true/)false" hex="(true/)false" trigger="true"/>
      
      div[0].ioport_expected=condition.getAttribute('expected');                                                              
      div[0].ioport_ioport=condition.getAttribute('ioport');
      div[0].ioport_trigger=condition.getAttribute('trigger');
// new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object0="" object1="" objectx="" ... 
      div[0].ioport_object0=condition.getAttribute('object0');
      div[0].ioport_object1=condition.getAttribute('object1');
      div[0].ioport_object2=condition.getAttribute('object2');
      div[0].ioport_object3=condition.getAttribute('object3');
      div[0].ioport_regex=condition.getAttribute('regex');
      div[0].ioport_hex=condition.getAttribute('hex');

*/

Blockly.Blocks['condition_ioport-rx'] = {
  // Create a list with any number of elements of any type.
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=IO_Ports');
    this.setColour(210);
    this.appendDummyInput()
        .appendField(tr("Io-Port")+" :")
        .appendField(new Blockly.FieldDropdown(list_ioports), "ioport")
        //.appendField(new Blockly.FieldTextInput(""), "ioport")
        .appendField(tr("Expected")+" :")
        .appendField(new Blockly.FieldTextInput(""), "expected")
        .appendField(tr("Hexa")+" :")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "hex")
        .appendField(tr("Regex")+" :")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "regex")
        .appendField("("+tr("trigger"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger")
        .appendField(")");
    /*
    this.appendValueInput('object0')
        .appendField('Object0')
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck('object');
    this.appendValueInput('object1')
        .appendField('Object1')
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck('object');
        */
    this.setOutput(true, 'condition');
    this.setMutator(new Blockly.Mutator(['condition_ioport-rx_item']));
    
    this.setTooltip('Condition ioport-rx');
    this.itemCount_ = 0;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(container) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('object' + x);
    }
    this.itemCount_ = parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('object' + x).appendField('Object' + x).setAlign(Blockly.ALIGN_RIGHT).setCheck('object');
    }
  },
  decompose: function(workspace) {
    var containerBlock =
        Blockly.Block.obtain(workspace, 'condition_ioport-rx_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'condition_ioport-rx_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      //this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('object' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('object' + this.itemCount_).appendField('Object' + this.itemCount_).setAlign(Blockly.ALIGN_RIGHT).setCheck('object');
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('object' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['condition_ioport-rx_container'] = {
  // Container.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField(tr("List of Objects"));
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['condition_ioport-rx_item'] = {
  // Add items.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField(tr("Object"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.JavaScript['condition_ioport-rx'] = function(block) {
  var value_ioport= block.getFieldValue('ioport');
  var value_expected = block.getFieldValue('expected');
  var checkbox_regex = block.getFieldValue('regex') == 'TRUE';
  var checkbox_hex = block.getFieldValue('hex') == 'TRUE';
  // Create a list with any number of elements of any type.
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    code[n] = Blockly.JavaScript.valueToCode(block, 'object' + n,
        Blockly.JavaScript.ORDER_ATOMIC) || '';
  }
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';
  code = '<condition type="ioport-rx" ioport="'+value_ioport+'" expected="'+value_expected+'" regex="'+checkbox_regex+'" hex="'+checkbox_hex+'" trigger="'+checkbox_trigger+'" ' + code.join('') + '></condition>';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
 
/*
Ioport Connect
<condition type="ioport-connect" ioport="" trigger="true" />
*/
Blockly.Blocks['condition_ioport-connect'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=IO_Ports');
    this.setColour(210);
    this.appendDummyInput()
        .appendField(tr("Io-Port")+" :")
        .appendField(new Blockly.FieldDropdown(list_ioports), "ioport")
        .appendField("("+tr("trigger"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "trigger")
        .appendField(")");
    this.setOutput(true, "condition");
    this.setTooltip('');
  }
};

Blockly.JavaScript['condition_ioport-connect'] = function(block) {
  var value_ioport= block.getFieldValue('ioport');
  var checkbox_trigger = block.getFieldValue('trigger') == 'TRUE';
/* 
<condition type="ioport-connect" ioport="" trigger="true" />
*/
  var code = '<condition type="ioport-connect" ioport="' + value_ioport + '" trigger="' + checkbox_trigger + '" ></condition>';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



/*

IO-Port : http://sourceforge.net/apps/mediawiki/linknx/index.php?title=IO_Ports

Action
Ioport Tx  <action type="ioport-tx" ioport="irtrans" data="snd dvd,menu" hex="true" delay="5"/>
*/
Blockly.Blocks['action_ioport-tx'] = {
  init: function() {
    this.setHelpUrl(Help_URL);
    this.setColour(160);
    this.appendDummyInput()
        .appendField(tr("Set"))
        .appendField(new Blockly.FieldImage('media/quote0.png', 12, 12, '"'))
        .appendField(new Blockly.FieldTextInput(''), 'data')
        .appendField(new Blockly.FieldImage('media/quote1.png', 12, 12, '"'))
        .appendField(tr("to Io-Port")+" :")
        .appendField(new Blockly.FieldDropdown(list_ioports), "ioport")
        .appendField(tr("Hexa")+" :")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "hex")
        .appendField("("+tr("delay"))
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    //this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip(tr('SET object or value to an object and delay if you want'));
  }
};
Blockly.JavaScript['action_ioport-tx'] = function(block) {
  var value_ioport = block.getFieldValue('ioport');
  var value_data = block.getFieldValue('data');
  var checkbox_hex = block.getFieldValue('hex') == 'TRUE';
  var value_delay = block.getFieldValue('delay');
  /*
  <action type="ioport-tx" ioport="irtrans" data="snd dvd,menu" hex="true" delay="5"/>
  */
  var code = '<action type="ioport-tx" ioport="' + value_ioport + '" data="' + value_data + '" hex="' + checkbox_hex + '" var="true" delay="' + value_delay + '" ></action>\n';
  return code;
};
