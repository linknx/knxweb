var inputEndpoint = null;
var outputEndpoint = null;
var outputEndpointFalse = null;
var rulestab = null;
var pos_top = null;
var pos_right = null;
var xmlRules = null;
var listobject = $('<select/>');
var listobject_1_001 = $('<select/>');
var arrayRules = new Array();
var arrayRulesTimer = new Array();
var arrayStatusRules = new Array();
var myDropOptions = null, inputColor = null, outputColor = null, outputColorFalse = null;
var actionlist = null;
var nbrAction = 0;
var nbrCondition = 0;
var generateXmlFlag = true;
var pos_right_condition = [];
var pos_top_condition = [];
var collonne_condition = 1;
pos_top_condition[0] = 0;
pos_top_condition[1] = 0;
pos_right_condition[0] = 0;
pos_right_condition[1] = 0;
var conditionsCurrent = new Array(), actionsCurrent = new Array();
var _ioport_select; 

var conditionsList = {
    'and':'And',
    'or':'Or',
    'not':'Not',
    'object' : 'Object',
    'object-src' : 'Object Src',
    'object-compare' : 'Object Compare',
    'timer':'Timer',
    'time-counter':'Time Counter',
    'ioport-rx':'Ioport Rx',
    'ioport-connect':'Ioport Connect', /* new in Linknx 0.0.1.31 */
    'script':'Script'
};

var actionsList = {
    'set-value' : 'Set Value', // < type="" id="" value="" />
    'copy-value' : 'Copy Value', // < type="" from="" to="" />
    'toggle-value' : 'Toggle Value', // < type="" id="" />
    'set-string' : 'Set String', // < type="" id="" value="" />
    'send-read-request' : 'Send Read Request', // < type="" id="" />
    'cycle-on-off' : 'Cycle On Off', // < type="" id="" on="" off="" count="" ><stopcondition ... />
    'repeat' : 'Repeat', // < type="" period="" count="" ><action ... />
    'conditional' : 'Conditional', // < type="" ><condition ...
    'send-sms' : 'Send Sms', // < type="" id="" value="" var="true/false" />
    'send-email' : 'Send Email', // <action type="" to="" subject="" var="true/false" >text<action/>
    'dim-up' : 'Dim Up', // < type="" id="" start="" stop="" duration="" />
    'shell-cmd' : 'Shell Cmd', // < type="" cmd="" var="true/false" />
    'ioport-tx' : 'Ioport Tx', // < type="" hex="true/false" data="" ioport="" var="true/false" />
    'script' : 'Script', // < type="" >script <... />
    'cancel' : 'Cancel', // < type="" rule-id="" />
    'formula' : 'Formula', // a*x^m+b*y^n+c < type="" id="object" x="" y="" a="1" b="1" c="0" m="1" n="1" />
    'start-actionlist' : 'Start actionlist', // < type="" rule-id="" list="true/false" />
    'set-rule-active' : 'Set rule active' // < type="" rule-id="" active="yes/no" /> 
};

var rules = {

  addAnd: function() {
  
    var div=$('<div>');
    div.addClass('condition');
    div.addClass('and');
    div.attr("id", "and"+((new Date().getTime())));
    div.html(tr('And'));
    div[0].type="and";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      if (confirm(tr("Delete this condition ?")))
      {
        jsPlumb.removeAllEndpoints(this);
        $(this).remove();
      }
    });
    
    jsPlumb.draggable(div); 
    
    div[0].endpoint = [];
    
    div[0].endpoint[1] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0, 0, 0] }, inputEndpoint));
    div[0].endpoint[2] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.1, 0, 0] }, inputEndpoint));
    div[0].endpoint[3] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.2, 0, 0] }, inputEndpoint));
    div[0].endpoint[4] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.3, 0, 0] }, inputEndpoint));
    div[0].endpoint[5] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.4, 0, 0] }, inputEndpoint));
    div[0].endpoint[6] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
    div[0].endpoint[7] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.6, 0, 0] }, inputEndpoint));
    div[0].endpoint[8] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.7, 0, 0] }, inputEndpoint));
    div[0].endpoint[9] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.8, 0, 0] }, inputEndpoint));
    div[0].endpoint[10] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.9, 0, 0] }, inputEndpoint));
    div[0].endpoint[11] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 1, 0, 0] }, inputEndpoint));  

    div[0].endpoint[0] = jsPlumb.addEndpoint(div, $.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    return div;   
                                                              
  },

  addOr:function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('or');
    div.attr("id", "or"+((new Date().getTime())));
    div.html(tr('Or'));
    div[0].type="or";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      if (confirm(tr("Delete this condition ?")))
      {
        jsPlumb.removeAllEndpoints(this);
        $(this).remove();
      }
    });
    
    jsPlumb.draggable(div);
    
    div[0].endpoint = [];
        
    div[0].endpoint[1] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0, 0, 0] }, inputEndpoint));
    div[0].endpoint[2] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.1, 0, 0] }, inputEndpoint));
    div[0].endpoint[3] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.2, 0, 0] }, inputEndpoint));
    div[0].endpoint[4] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.3, 0, 0] }, inputEndpoint));
    div[0].endpoint[5] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.4, 0, 0] }, inputEndpoint));
    div[0].endpoint[6] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
    div[0].endpoint[7] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.6, 0, 0] }, inputEndpoint));
    div[0].endpoint[8] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.7, 0, 0] }, inputEndpoint));
    div[0].endpoint[9] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.8, 0, 0] }, inputEndpoint));
    div[0].endpoint[10] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.9, 0, 0] }, inputEndpoint));
    div[0].endpoint[11] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 1, 0, 0] }, inputEndpoint));  
                     
    div[0].endpoint[0]= jsPlumb.addEndpoint(div, $.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));

    return div;
  },

  addNot: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('not');
    div.attr("id", "not"+((new Date().getTime())));
    div.html(tr('Not'));
    div[0].type="not";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      if (confirm(tr("Delete this condition ?")))
      {
        jsPlumb.removeAllEndpoints(this);
        $(this).remove();
      }
    });
    
    jsPlumb.draggable(div);
        
    div[0].endpoint = [];
    div[0].endpoint[1] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));

    div[0].endpointout = jsPlumb.addEndpoint(div, $.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));

    return div;
  },
  
  generateNodeXML: function(div) {
    var xml;
    if(div[0].condition) {
      xml = rulesCondition.generateNodeXMLCondition(div);
    } else {
      xml = rulesAction.generateNodeXMLAction(div);
    } 
    return xml;
  },

  generateXML: function() {
    if (!generateXmlFlag) return 0;

    var xmlactionlist, xml, xmlactionlist2;
    var rule=$('<rule>');
    rule.attr("id", $('#id-current-rule').val());
    rule.attr("description", $('#description-current-rule').val());
    rule.attr("init", $('#init-current-rule').val());
    
    $('#actionlist')[0].condition = true;

    if (jsPlumb.getConnections({target:"actionlist"})[0] ) {
      xml=this.generateNodeXML($('#'+jsPlumb.getConnections({target:"actionlist"})[0].sourceId));
    }
    rule.append(xml);

    if ($("span", '#actionlistOnTrue').text() == 'On-True') {
      xmlactionlist = $('<actionlist type="on-true" >');
    } else {
      xmlactionlist = $('<actionlist type="if-true" >');
    } 
    var c = jsPlumb.getConnections({source:'actionlistOnTrue'});

    for (var i in c) {
      var l = c[i];
      if (l && l.length > 0) {
        for (var j = 0; j < l.length; j++) {
          xmlactionlist.append(this.generateNodeXML($('#'+l[j].targetId)));
        }
      } else if (l) {
        var action = $('#'+l.targetId);
        if (!action[0].condition) {
          xmlactionlist.append(this.generateNodeXML($('#'+l.targetId)));
        }
      }
    }
    
    rule.append(xmlactionlist);

    var c = jsPlumb.getConnections({source:'actionlistOnFalse'});
    
    if (c.length > 0) {    
      if ($("span", '#actionlistOnFalse').text() == 'On-False') {
        xmlactionlist2 = $('<actionlist type="on-false" >');
      } else {
        xmlactionlist2 = $('<actionlist type="if-false" >');
      }
    }

    for (var i in c) {
      var l = c[i];
      if (l && l.length > 0) {
        for (var j = 0; j < l.length; j++) {
          xmlactionlist2.append(this.generateNodeXML($('#'+l[j].targetId)));
        }
      } else if (l) {
        var action = $('#'+l.targetId);
        if (!action[0].condition) {
          xmlactionlist2.append(this.generateNodeXML($('#'+l.targetId)));
        }
      }
    }
    rule.append(xmlactionlist2);
    
    $("#tab-rules-property").text('<rule id="'+$('#id-current-rule').val()+'" description="' + $('#description-current-rule').val() + '" init="' + $('#init-current-rule').val() + '" >'+rule.html()+'</rule>').html();
  },
  
  handleDialogCancel: function(dialog) {
    if (dialog.isNew)
    {
      jsPlumb.removeAllEndpoints(dialog.editing);
      $(dialog.editing).remove();
    }
    $(dialog).dialog("close"); 
  },

  handleDialogDelete: function(dialog) {
    jsPlumb.removeAllEndpoints(dialog.editing);
    $(dialog.editing).remove();
    $(dialog).dialog("close"); 
  },
  
  handleDialogSave: function(dialog) {    
    var type = dialog.editing.type;
    if (dialog.editing.condition) {
      rulesCondition.saveCondition(type);
    } else {
      rulesAction.saveAction(type);
    }
    $(dialog).dialog("close"); 
  },
  
  deleteAllCurrentRule: function () {
    $('#id-current-rule').val('');
    $('#description-current-rule').val('');
    $('#init-current-rule').val('false');
    //conditionsCurrent[]
    for (var i in conditionsCurrent) {
      var l = conditionsCurrent[i];
      if (l) {
        jsPlumb.removeAllEndpoints(l);
        $(l).remove();
      }
    };
    //actionsCurrent[]
    for (var i in actionsCurrent) {
      var l = actionsCurrent[i];
      if (l) {
        jsPlumb.removeAllEndpoints(l);
        $(l).remove();
      }
    };
  },
  
  autoManuRule: function(ruleid, active) {
    if (!active || active == "off" || active == "false" || active == "no") active = false; else active = true; 
    var responseXML=queryLinknx('<write><config><rules><rule id="'+ruleid+'" active="'+active+'" /></rules></config></write>');
    if (responseXML!=false)
    {
      if ( active == true ) messageBox(tr("Rule active successfully"),tr("Active Rule"),"");
      else messageBox(tr("Rule inactive successfully"),tr("Active Rule"),"");
      return true;
    }
    return false;
  },
  
  addconditionCurrent: function (div) {
    conditionsCurrent.push(div);
  },
  
  addactionCurrent: function (div) {
    actionsCurrent.push(div);
  }

};

// **************** / rules ****************


function serializeToString(doc)
{
  if (jQuery.browser.msie)
    return doc.xml;
  return (new XMLSerializer()).serializeToString(doc);
};
function loadRule(xml)
{
  generateXmlFlag = false; // déactive la génération du xml lors des connections car cela ralentie énormément le chargement de la rule
  rules.deleteAllCurrentRule();
  nbrAction = 0;
  nbrCondition = 0;
  $('#description-current-rule').val($(xml).attr('description'));
  if ($(xml).attr('init')) $('#init-current-rule').val($(xml).attr('init')); else $('#init-current-rule').val('false');
  
  if (arrayStatusRules[$(xml).attr('id')] == "false") { 
    $('.checkbox', '.slidermanuelautorule').removeAttr("checked"); // => mode Manuel
    $('.slidermanuelautorule').removeClass('sliderauto');
    $('.slidermanuelautorule').addClass('slidermanuel');
  } else {
    $('.checkbox', '.slidermanuelautorule').attr("checked","checked"); // => mode Automatique
    $('.slidermanuelautorule').addClass('sliderauto');
    $('.slidermanuelautorule').removeClass('slidermanuel');
  }

  var k = 0;
  $(xml).children("condition").each(function () {
    var type = this.getAttribute('type');
    var condition = rulesCondition.addConditionRule(type, this, k);
    /* il y a qu'une condition globale !! rattacher condition à actionlist */
    if (type == "and" || type == "or" || type == "not" ) {
      jsPlumb.connect({source:condition[0].endpoint[0], target:actionlist[0].endpoint[0]});
    } else jsPlumb.connect({source:condition[0].endpointout, target:actionlist[0].endpoint[0]}); 
  });

  $('actionlist', xml).each(function() { // TODO gérér les stopcondition ...
    var i = 0;
    var typeactionlist = this.getAttribute('type');
    if (!typeactionlist || typeactionlist == "on-true" || typeactionlist == "on-false") {
      $("span", '#actionlistOnTrue').text('On-True');
      $("span", '#actionlistOnFalse').text('On-False');
    } else {
      $("span", '#actionlistOnTrue').text('If-True');
      $("span", '#actionlistOnFalse').text('If-False');
    }
    if (!typeactionlist || typeactionlist == "on-true" || typeactionlist == "if-true") {
      $('action', this).each(function() {
        var action = rulesAction.addActionRule( this.getAttribute('type'), this, i, true);
        i++;
        jsPlumb.connect({source:actionlist[0].ontrue[i], target: action[0].endpointin});
        if (i>10) { messageBox(tr("Maximum number of share reached"),tr("Action True"),"alert"); return 0; }// TODO gérer si plus de 10 actions ... 
      });
    } else if ( typeactionlist == "on-false" || typeactionlist == "if-false") {
      $('action', this).each(function() {
        var action = rulesAction.addActionRule( this.getAttribute('type'), this, i, false);
        i++;
        jsPlumb.connect({source:actionlist[0].onfalse[i], target: action[0].endpointin});
        if (i>10) { messageBox(tr("Maximum number of share reached"),tr("Action False"),"alert"); return 0; }// TODO gérer si plus de 10 actions ... 
      });
    }

  }); 
  
  generateXmlFlag = true; // ré-active la génération du xml    
};
function loadRulesList()
{
  var responseXML=queryLinknx('<read><config><rules/></config></read>');
  xmlRules = '';
  if (responseXML!=false)
  {
    xmlRules = responseXML;
    $('#listRules').append('<option value="">' + tr("Select a rule") + '</option>');
    $('rule', responseXML).each(function() {
      $('#listRules').append('<option value="' + this.getAttribute("id") + '">' + this.getAttribute("id") + '</option>');
      arrayRules[this.getAttribute('id')]=this; 
    });
  } else $('#listRules').append('<option value="">' + tr("No definite rule") + '</option>');
  
  $('#listRules').change(function(){
    $("#tab-rules-property").text(serializeToString(arrayRules[this.value]));
    loadRule(arrayRules[this.value]);
    $('#id-current-rule').val(this.value);
    
    this.value = "";
  });
  loadStatusRulesList();
};
function loadStatusRulesList()
{
  var responseXML=queryLinknx('<read><status></status></read>');
  if (responseXML!=false)
  {
    $('task', responseXML).each(function() {
      arrayRulesTimer[this.getAttribute("owner")] = this.getAttribute("next-exec"); 
    })
    
    $('rule', responseXML).each(function() {
      arrayStatusRules[this.getAttribute('id')] = this.getAttribute("active"); 
    });
  }
};

function reloadloadRulesList()
{
  $('#listRules').empty();
  arrayRules = new Array();
  arrayRulesTimer = new Array();
  arrayStatusRules = new Array();
  loadRulesList();
};
function validRule()
{
  rules.generateXML();
  var rule = $("#tab-rules-property").text();
  var body = '<write><config><rules>'+rule+'</rules></config></write>';
  var responseXML=queryLinknx(body);
  if (responseXML!=false)
  {
    messageBox(tr("Registration rule successfully"),"Save Rule","");
  }
  reloadloadRulesList();
};


function deleteRule()
{
  var body = '<write><config><rules><rule id="'+$('#id-current-rule').val()+'" delete="true" /></rules></config></write>';
  
  var responseXML=queryLinknx(body);
  if (responseXML!=false)
  {
    messageBox(tr("Delete successfully the rule"),"Delete Rule","");
  }
  rules.deleteAllCurrentRule();
  reloadloadRulesList();  
};

function executeActionRule(type)  // type = true => actionlist de type "true" sinon "false"
{
  rules.generateXML();
  var rule = $("#tab-rules-property").text();
  if (type) {
    var actions = $('actionlist[type=on-true]', rule)[0];
    if (!actions) actions = $('actionlist[type=if-true]', rule)[0];
  } else {
    var actions = $('actionlist[type=on-false]', rule)[0];
    if (!actions) actions = $('actionlist[type=if-false]', rule)[0];
  }  
  //var actions = $('rule[id="' + eventid + '"] actionlist',events.config)[0];
  var actionsText = '';
  $('action', actions).each(function() {
    actionsText = actionsText + serializeXmlToString(this);
	});
  console.log("Test executeActionRule", type, actions, " actionsText:*", actionsText, "**");
  if (actionsText !='') {
    if (confirm(tr('Really execute actions of the rule ?'))) {
      var responseXML=queryLinknx('<execute>'+actionsText+'</execute>');
      if (responseXML!=false)
      {
        messageBox(tr("Action of the rule execute successfully"),tr("Execute Actionlist"),"");
      }
  	}
  } 
}
