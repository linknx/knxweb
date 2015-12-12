var list_objects = [['-:|'+tr('Choose an Object')+'|:-', ''], ['lampe cuisine', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 1', 'lampe_plf_chambre_1_1.001']];
var list_objects_1_001 = [['-:|'+tr('Choose an Object')+'|:-', ''], ['lampe cuisine', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 1', 'lampe_plf_chambre_1_1.001']];
var list_objects_json = null;

// for timer object type 10.001 or 11.001
var list_object_date = [['date1', 'date1'], ['date2', 'date2']];
var list_object_time = [['hour1', 'hour1'], ['hour2', 'hour2']];

var list_rules = [['-:|'+tr('Choose a rule')+'|:-', ''], ['Description rule 1', 'id_rule1'], ['Rule 2 Description', 'id_rule2']];
var list_ioports = [['-:|'+tr('Choose an IO-Port')+'|:-', '']];

var list_plugins = [['-:|'+tr('Choose a Plugin')+'|:-', '']];
var tab_rules_json = [];
var json_data = {};

// function réponse requete linknx format json
function parseResponse ( data , xml) {
  console.log("parseResponse", data, xml);
  json_data = data;
  init();
  start2();
} 

var xml_ = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
var TextAreaBlock_ = null;
var script;
var ip_locale = '../../';


function init() {
  //<read><config/></read>
  list_objects_json = json_data.read.config.objects.object;
  list_objects = [];
  list_object_date = [];
  list_object_time = [];
  
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
  
  var list_rules_json = json_data.read.config.rules.rule;
  list_rules = [];
  
  if( Object.prototype.toString.call( list_rules_json ) === '[object Array]' ) {
  
    for (var i=0;i<list_rules_json.length;i++)
    {
      var name_rule = '';
      if (!list_rules_json[i].desc) {
        name_rule = list_rules_json[i].id;
      } else {
        name_rule = list_rules_json[i].desc;
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
      if (!list_rules_json.desc) {
        name_rule = list_rules_json.id;
      } else {
        name_rule = list_rules_json.desc;
      }
      list_rules.push([name_rule, list_rules_json.id]);
      tab_rules_json[0] = { "id":list_rules_json.id , "json":list_rules_json};
      xml_ = RuleToXML(list_rules_json);
    } else {
      list_rules.push(["No Rule", "No_Rule"]);
    }
  
  }
}



//Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
function myUpdateFunction() {
  var code = Blockly.JavaScript.workspaceToCode();
  document.getElementById('textarea').value = code;
}
//Blockly.addChangeListener(myUpdateFunction);

function Xml() {
  var xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)).slice(5, -6); //Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
  document.getElementById('importExport').value = xml;
}
function toXml() {
  var output = document.getElementById('importExport');
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  output.value = Blockly.Xml.domToPrettyText(xml);
  output.focus();
  output.select();
}
function fromXml() {
  // vider la page
  Blockly.mainWorkspace.clear();
  var input = document.getElementById('importExport');
  var xml = Blockly.Xml.textToDom(input.value);
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
}
function clearRule() {
  // vider la page
  Blockly.mainWorkspace.clear();
  xml_ = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml));
  document.getElementsByName("id_rule")[0].value = '';
  document.getElementsByName("description")[0].value = '';
  document.getElementsByName("init")[0].checked = true;
}
function toCode(lang) {
  /*var output = document.getElementById('importExport');
  output.value = Blockly[lang].workspaceToCode();*/
  $('#importExport').val(Blockly[lang].workspaceToCode());
}
function loadRule(rule_id) {
  // vider la page
  Blockly.mainWorkspace.clear();
  for (var i=0;i<tab_rules_json.length;i++)
  {
    if (tab_rules_json[i].id == rule_id) {
      xml_ = RuleToXML(tab_rules_json[i].json);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_));
      document.getElementsByName("id_rule")[0].value = tab_rules_json[i].json.id;
      if (tab_rules_json[i].json.description) document.getElementsByName("description")[0].value = tab_rules_json[i].json.description;
      else document.getElementsByName("description")[0].value = '';
      if (tab_rules_json[i].json.init)  document.getElementsByName("init")[0].checked = tab_rules_json[i].json.init == "true";
      else document.getElementsByName("init")[0].checked = true; 
      return true;
    }
  }
}

function affiche_script(){
  document.all["modal"].style.visibility="visible";
  document.all["Saisie_Script"].style.visibility="visible";
}
function centreDiv(gt_nom){
  var gt_lfen=document.body.clientWidth
  var gt_hfen=document.body.clientHeight;
  var gt_lcal=document.all[gt_nom].offsetWidth;
  var gt_hcal=document.all[gt_nom].offsetHeight;
  document.all[gt_nom].style.left=(gt_lfen-gt_lcal)/2;
  document.all[gt_nom].style.top=(gt_hfen-gt_hcal)/2;
}
function Valid_TextAreaBlock_script() {
  if (document.all["Saisie_Script"].style.visibility=="hidden") {
    document.all["modal"].style.visibility="visible";
    document.all["Saisie_Script"].style.visibility="visible";
  } else {
    document.all["modal"].style.visibility="hidden";
    document.all["Saisie_Script"].style.visibility="hidden";
    
    var textarea_script = document.getElementById('textarea_script');
    //textarea_script.value = TextAreaBlock_.sourceBlock_.script_;
    if (typeof TextAreaBlock_ !== 'undefined' && TextAreaBlock_ !== null)
    {
      TextAreaBlock_.setText(textarea_script.value);
      TextAreaBlock_.script_ = textarea_script.value;
      TextAreaBlock_.sourceBlock_.script_ = textarea_script.value;
      TextAreaBlock_ = null;
    }
  }
}

function reqLinknxValidRule () {
  var xml = Blockly.JavaScript.workspaceToCode();
  script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxValidRule&xml=<write><config><rules>'+xml+'</rules></config></write>';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function reqLinknxDeleteRule () {
  var id_rule = document.getElementsByName("id_rule")[0].value;
  script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxValidRule&xml=<write><config><rules><rule id="'+id_rule+'" delete="true"/></rules></config></write>';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function retLinknxValidRule( data , xml) {
  console.log("retLinknxValidRule", data, xml);
  if (data.write.status == 'error') {
    alert(' Il y a eu un problème d\'exécution de la modification');
  }
  if (data.write.status == "success") {
    alert(' Action correctement executée');
  }
  script.remove();
  script = null;
} 

function start2 () {
  //Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_));
  console.log("start2", json_data, tab_rules_json );

  //Blockly.addChangeListener(myUpdateFunction);

  //var select_list_rules = document.getElementById('select_list_rules');
  //select_list_rules.innerHTML = '';
  $('#select_list_rules').html('<option value=""> -:| '+tr('Choose a rule')+' |:- </option>');
  for (var i=0;i<tab_rules_json.length;i++)
  {
    //tab_rules_json[i] = { "id":list_rules_json[i].id , "json":list_rules_json[i]};
    //select_list_rules.innerHTML = select_list_rules.innerHTML + '<option value="'+tab_rules_json[i].id+'">'+tab_rules_json[i].id+'</option>';
    var option='<option value="'+tab_rules_json[i].id+'">'+tab_rules_json[i].id+'</option>';
    $('#select_list_rules').append(option);
  }
  //document.getElementsByName("id_rule")[0].value = tab_rules_json[0].json.id;
  $("id_rule").val(tab_rules_json[0].json.id);
  /*if (tab_rules_json[0].json.description) document.getElementsByName("description")[0].value = tab_rules_json[0].json.description;
  else document.getElementsByName("description")[0].value = '';
  */
  $("description").val(tab_rules_json[0].json.description);

  $("init").prop("checked", ((tab_rules_json[0].json.init == "true")? "checked":""));
  /*if (tab_rules_json[0].json.init)  document.getElementsByName("init")[0].checked = tab_rules_json[0].json.init == "true";
  else document.getElementsByName("init")[0].checked = true;
  */

  //centreDiv('Saisie_Script');
};

jQuery(document).ready(function(){
  console.log("ready",json_data);

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
                 });  /* path: 'lib/blockly/',*/
  //Blockly.pathToBlockly =  'lib/blockly/';

  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_));

  Blockly.addChangeListener(myUpdateFunction);
});
