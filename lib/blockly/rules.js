var list_objects = [['-:| '+tr('Choose an Object')+' |:-', '']];
var list_objects_1_001 = [['-:| '+tr('Choose an Object')+' |:-', '']];
var list_objects_json = null;

// for timer object type 10.001 or 11.001
var list_object_date = [['-:| '+tr('Choose a date')+' |:-', '']];
var list_object_time = [['-:| '+tr('Choose a time')+' |:-', '']];

var list_rules_json = null;
var list_rules = [['-:| '+tr('Choose a rule')+' |:-', '']];
var list_ioports_json = null;
var list_ioports = [['-:| '+tr('Choose an IO-Port')+' |:-', '']];

var list_timers_json = null;
var list_timers = {};

var list_ruleactive_json = null;
var list_ruleactive = {};

var list_plugins = [['-:| '+tr('Choose a Plugin')+' |:-', '']];
var tab_rules_json = [];
var json_data = {};

// function réponse requete linknx format json
function parseResponse ( data , xml) {
  //console.log("parseResponse", data, xml);
  json_data = data;
  init();
  reqLinknxStatus();
  //start2();
} 

var xml_ = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
var TextAreaBlock_ = null;
var script;
var ip_locale = '../../';


function init() {
  //<read><config/></read>
  list_objects_json = json_data.read.config.objects.object;
  list_objects = [['-:| '+tr('Choose an Object')+' |:-', '']];
  list_objects_1_001 = [['-:| '+tr('Choose an Object')+' |:-', '']];
  list_object_date = [['-:| '+tr('Choose a date')+' |:-', '']];
  list_object_time = [['-:| '+tr('Choose a time')+' |:-', '']];

  
  for (var i=0;i<list_objects_json.length;i++)
  {
    var name_obj = list_objects_json[i].$;
    if (!list_objects_json[i].$) {
      name_obj = list_objects_json[i].id;
    } 
    if (list_objects_json[i].type == "11.001") {list_object_date.push([name_obj, list_objects_json[i].id]);};
    if (list_objects_json[i].type == "10.001") {list_object_time.push([name_obj, list_objects_json[i].id]);};
    if (list_objects_json[i].type == "1.001") {list_objects_1_001.push([name_obj, list_objects_json[i].id]);};
    list_objects.push([name_obj, list_objects_json[i].id]);
  }
  
  list_rules_json = json_data.read.config.rules.rule;
  list_rules = [['-:| '+tr('Choose a rule')+' |:-', '']];
  
  if( Object.prototype.toString.call( list_rules_json ) === '[object Array]' ) {
  
    for (var i=0;i<list_rules_json.length;i++)
    {
      var name_rule = '';
      if (!list_rules_json[i].description) {
        name_rule = list_rules_json[i].id;
      } else {
      console.log(list_rules_json[i].id, " : ", list_rules_json[i].description, " : ", list_rules_json[i].description.trim());
        if (list_rules_json[i].description.trim() == '') {
          name_rule = list_rules_json[i].id;
        } else {
          name_rule = list_rules_json[i].description;
        }
        console.log("=>", name_rule);
      }
      list_rules.push([name_rule, list_rules_json[i].id]);
      tab_rules_json[i] = { "id":list_rules_json[i].id , "json":list_rules_json[i]};
      if (i==0) {
        xml_ = RuleToXML(list_rules_json[i]); 
      }
    }
  } else {
    if (list_rules_json.id) {
      var name_rule = '';
      if (!list_rules_json.description) {
        name_rule = list_rules_json.id;
      } else {
        //name_rule = list_rules_json.description;
        if (list_rules_json.description.trim() == '') {
          name_rule = list_rules_json.id;
        } else {
          name_rule = list_rules_json.description;
        }
      }
      list_rules.push([name_rule, list_rules_json.id]);
      tab_rules_json[0] = { "id":list_rules_json.id , "json":list_rules_json};
      xml_ = RuleToXML(list_rules_json);
    } else {
      //list_rules.push([tr("No Rule"), ""]);
      list_rules = [[tr("No Rule"), ""]];
    }
  
  }
  if (json_data.read.config.services.ioports) {
    list_ioports_json = json_data.read.config.services.ioports.ioport;
    list_ioports = [['-:| '+tr('Choose an IO-Port')+' |:-', '']];
    if( Object.prototype.toString.call( list_ioports_json ) === '[object Array]' ) {

      for (var i=0;i<list_ioports_json.length;i++)
      {
        list_ioports.push([list_ioports_json[i].id, list_ioports_json[i].id]);
      }
    } else {
      if (list_ioports_json.id) {
        list_ioports.push([list_ioports_json.id, list_ioports_json.id]);
      } else {
        list_ioports = [[tr("No IO-Port"), ""]];
      }

    }
  } else list_ioports = [[tr("No IO-Port"), ""]];
}



//Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
function myUpdateFunction() {
  var code = Blockly.JavaScript.workspaceToCode();
  document.getElementById('textarea').value = code;
}
//Blockly.addChangeListener(myUpdateFunction);

function clearRule() {
  // vider la page
  Blockly.mainWorkspace.clear();
  xml_ = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_));
  document.getElementsByName("id_rule")[0].value = '';
  document.getElementsByName("description")[0].value = '';
  document.getElementsByName("init-rule")[0].value = 'false';
  document.getElementsByName("auto_manu")[0].checked = true;
  document.getElementById("auto_manu").className = "slidermanuelautorule sliderauto";
}
function loadRule(rule_id) {
  // vider la page
  Blockly.mainWorkspace.clear();
  document.getElementById('select_list_rules').value = "";
  for (var i=0;i<tab_rules_json.length;i++)
  {
    if (tab_rules_json[i].id == rule_id) {
      xml_ = RuleToXML(tab_rules_json[i].json);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_));
      document.getElementsByName("id_rule")[0].value = tab_rules_json[i].json.id;
      if (tab_rules_json[i].json.description) document.getElementsByName("description")[0].value = tab_rules_json[i].json.description;
      else document.getElementsByName("description")[0].value = '';
      if (tab_rules_json[i].json.init)  document.getElementsByName("init-rule")[0].value = tab_rules_json[i].json.init;
      else document.getElementsByName("init-rule")[0].value = "false";
      if (!tab_rules_json[i].json.active ||  tab_rules_json[i].json.active && tab_rules_json[i].json.active == "yes" ) {
        document.getElementsByName("auto_manu")[0].checked = true;
        document.getElementById("auto_manu").className = "slidermanuelautorule sliderauto";
      } else {
        document.getElementsByName("auto_manu")[0].checked = false;
        document.getElementById("auto_manu").className = "slidermanuelautorule slidermanuel";
      }

      document.getElementById("next-exec-current-rule").innerHTML =  convertDate(list_timers[eval('rule_id')]);
      return true;
    }
  }
}

function reqLinknx(jsonp, xml) {
  if (script) script.remove();
  script = null;
  script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = ip_locale + 'linknx_jsonp.php?jsonp='+jsonp+'&xml='+xml;
  //console.log('reqLinknx', xml);
  document.getElementsByTagName('head')[0].appendChild(script);
}
function reqLinknxStatus () {
  /*if (script) script.remove();
  script = null;
  script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxStatus&xml=<read><status></status></read>';
  document.getElementsByTagName('head')[0].appendChild(script); */
  reqLinknx('retLinknxStatus', '<read><status></status></read>');
}
function convertDate(dateToConvert)
{
  //console.log('convertDate',dateToConvert);
  if (!dateToConvert) return '';
  var elem = dateToConvert.split(' ');
  var jour = elem[0].split('-');
  var heure = elem[1].split(':');
  return tr("Next-execution : the")+" "+jour[2]+"/"+jour[1]+"/"+jour[0]+" "+tr("at")+" "+elem[1];
};


function retLinknxStatus( data , xml) {
  //console.log("retLinknxStatus", data, xml);
  script.remove();
  script = null;
  list_timers_json = data.read.status.timers.task;

  for (var i=0;i<list_timers_json.length;i++)
  {
    list_timers[list_timers_json[i].owner] = list_timers_json[i]["next-exec"];
  }

  list_ruleactive_json = data.read.status.rules.rule;

  for (var i=0;i<list_ruleactive_json.length;i++)
  {
    list_ruleactive[list_ruleactive_json[i].id] = list_ruleactive_json[i].active;
  }
}

function reqLinknxValidRule () {
  var xml = Blockly.JavaScript.workspaceToCode();
  /*if (script) script.remove();
  script = null;
  script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxValidRule&xml=<write><config><rules>'+xml+'</rules></config></write>';
  document.getElementsByTagName('head')[0].appendChild(script);*/
  reqLinknx('retLinknxValidRule', '<write><config><rules>'+xml+'</rules></config></write>');
}

function reqLinknxDeleteRule () {
  var id_rule = document.getElementsByName("id_rule")[0].value;
  //console.log('reqLinknxDeleteRule', id_rule);
  if (id_rule) {
    /*if (script) script.remove();
    script = null;
    script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxValidRule&xml=<write><config><rules><rule id="'+id_rule+'" delete="true"/></rules></config></write>';
    document.getElementsByTagName('head')[0].appendChild(script);*/
    reqLinknx('retLinknxValidRule', '<write><config><rules><rule id="'+id_rule+'" delete="true"/></rules></config></write>');
  }
}

function retLinknxValidRule( data , xml) {
  console.log("retLinknxValidRule", data, xml);
  if (data.write.status != "success") {
    alert(' Il y a eu un problème d\'exécution de la modification');
    return false;
  }
  script.remove();
  script = null;
  return true;
} 

function start2 () {
  //console.log("start2", json_data, tab_rules_json );

  var select_list_rules = document.getElementById('select_list_rules');
  select_list_rules.innerHTML = '<option value=""> -:| '+tr('Choose a rule')+' |:- </option>';
  for (var i=0;i<tab_rules_json.length;i++)
  {
    tab_rules_json[i] = { "id":list_rules_json[i].id , "json":list_rules_json[i]};
    //select_list_rules.innerHTML = select_list_rules.innerHTML + '<option value="'+list_rules_json[i].id+'">'+((list_rules_json[i].description)?list_rules_json[i].description:list_rules_json[i].id)+'</option>';
    var description_rule = ((list_rules_json[i].description)?list_rules_json[i].description:list_rules_json[i].id);
    if (!list_rules_json[i].description) {
      description_rule = list_rules_json[i].id;
    } else {
      //description_rule = list_rules_json[i].description;
      if (list_rules_json[i].description.trim() == '') {
        description_rule = list_rules_json[i].id;
      } else {
        description_rule = list_rules_json[i].description;
      }
    }
    select_list_rules.innerHTML = select_list_rules.innerHTML + '<option value="'+list_rules_json[i].id+'">'+description_rule+'</option>';
  }

  loadRule(tab_rules_json[0].json.id);
};
function executeActionlist(type) {
  // TODO execute action type (true or false) of the current rule using linknx call <execute ...
  // '<execute>'+actionsText+'</execute>'
  if (confirm("Realy execute action type: '"+type+"' ?")) {
    if (type) {
      if (statements_actionslist_true) reqLinknx('', '<execute>'+statements_actionslist_true+'</execute>');
    } else {
      if (statements_actionslist_false) reqLinknx('', '<execute>'+statements_actionslist_false+'</execute>');
    }
  }
};
function activeRule(_this) {
  // '<write><config><rules><rule id="'+ document.getElementsByName("id_rule")[0].value +'" active="'+active+'" /></rules></config></write>'
  var val = document.getElementsByName("auto_manu")[0].checked;
  document.getElementsByName("auto_manu")[0].checked = val != true;
  if (val) { // désactive la rule
    _this.className = "slidermanuelautorule slidermanuel";
  } else { // active la rule
    _this.className = "slidermanuelautorule sliderauto";
  }
  myUpdateFunction();

  return true;
};

if (jQuery) jQuery(document).ready(function(){

  //console.log("ready",json_data);

  loading.hide();

  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blocklyDiv'),
                 { media: 'lib/blockly/media/', toolbox: toolbox,
                 grid:
                     {spacing: 20,
                      length: 3,
                      colour: '#ccc',
                      snap: true},
                 trashcan: true,
                 });
  //Blockly.pathToBlockly =  'lib/blockly/';

  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_));

  Blockly.addChangeListener(myUpdateFunction);
});