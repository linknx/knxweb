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

var conditionsList = {
    'and':'And',
    'or':'Or',
    'not':'Not',
    'object' : 'Object',
    'objectsrc' : 'Object Src',
    'objectcompare' : 'Object Compare',
    'timer':'Timer',
    'time-counter':'Time Counter',
    'ioport-rx':'Ioport Rx',
    'script':'Script' // TODO conditionner si linknx est compilé avec lua
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
    'send-sms' : 'Send Sms', // TODO conditionner si linknx est compilé avec curl < type="" id="" value="" var="true/false" />
    'send-email' : 'Send Email', // TODO conditionner si linknx est compilé avec smtp <action type="" to="" subject="" var="true/false" >text<action/>
    'dim-up' : 'Dim Up', // < type="" id="" start="" stop="" duration="" />
    'shell-cmd' : 'Shell Cmd', // < type="" cmd="" var="true/false" />
    'ioport-tx' : 'Ioport Tx', // < type="" hex="true/false" data="" ioport="" var="true/false" />
    'script' : 'Script', // TODO conditionner si linknx est compilé avec lua // < type="" >script <... />
    'cancel' : 'Cancel', // < type="" rule-id="" />
    'formula' : 'Formula', // TODO conditionner only since version 0.0.1.29 : a*x^m+b*y^n+c < type="" id="object" x="" y="" a="1" b="1" c="0" m="1" n="1" />
    'start-actionlist' : 'Start-actionlist' // TODO conditionner only since version 0.0.1.29 < type="" rule-id="" list="true/false" /> 
};

var rules = {

  addAnd: function() {
  
    var div=$('<div>');
    div.addClass('condition');
    div.addClass('and');
    div.attr("id", "and"+((new Date().getTime())));
    div.html('Et');
    div[0].type="and";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      if (confirm("Supprimer cette condition ?"))
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
    div.html('Ou');;
    div[0].type="or";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      if (confirm("Supprimer cette condition ?"))
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
    div.html('Not');
    div[0].type="not";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      if (confirm("Supprimer cette condition ?"))
      {
        jsPlumb.removeAllEndpoints(this);
        $(this).remove();
      }
    });
    
    jsPlumb.draggable(div);
        
    div[0].endpointin = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));

    div[0].endpointout = jsPlumb.addEndpoint(div, $.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));

    return div;
  },
  
  generateNodeXML: function(div) {
    var xml;
    if(div[0].condition) {
      xml = this.generateNodeXMLCondition(div);
    } else {
      xml = this.generateNodeXMLAction(div);
    } 
    return xml;
  },

  generateXML: function() {
    if (!generateXmlFlag) return 0;

    var xmlactionlist, xml;
    var rule=$('<rule>');
    rule.attr("id", $('#id-current-rule').val());
    
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
    
    if (c) {    
      if ($("span", '#actionlistOnFalse').text() == 'On-False') {
        xmlactionlist = $('<actionlist type="on-false" >');
      } else {
        xmlactionlist = $('<actionlist type="if-false" >');
      }
    }

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
    
    $("#tab-rules-property").text('<rule id="'+$('#id-current-rule').val()+'" >'+rule.html()+'</rule>').html();
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
      this.saveCondition(type);
    } else {
      this.saveAction(type);
    }
    $(dialog).dialog("close"); 
  },
  
  deleteAllCurrentRule: function () {
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
    
    $('#id-current-rule').val('');
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
  /*
  $('condition',xml).each(function() { // TODO gérér les stopcondition entre autre ...
    rules.addCondition(this.getAttribute('type'));
  });
  */
  //console.log("condition 0 principale :",$('condition:first', xml).attr('type'));

  var k = 0;
  $(xml).children("condition").each(function () {
    var condition = rules.addConditionRule(this.getAttribute('type'), this, k);
    /* il y a qu'une condition gloable !! rattacher condition à actionlist */
    jsPlumb.connect({source:condition[0].endpoint[0], target:actionlist[0].endpoint[0]});
  });

/*
  $(conf).children("condition").each(function () {
    div.append(createCondition(this).getHTML());
  });
*/

  $('actionlist', xml).each(function() { // TODO gérér les if/on true et false, les stopcondition ...
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
        var action = rules.addActionRule( this.getAttribute('type'), this, i);
        i++;
        jsPlumb.connect({source:actionlist[0].ontrue[i], target: action[0].endpointin});
        if (i>10) { messageBox("Nombre maximum d'action atteint","Action On-True","alert"); return 0; }// TODO gérer si plus de 10 action ... 
      });
    } else if ( typeactionlist == "on-false" || typeactionlist == "if-false") {
      $('action', this).each(function() {
        var action = rules.addActionRule( this.getAttribute('type'), this, i);
        i++;
        jsPlumb.connect({source:actionlist[0].onfalse[i], target: action[0].endpointin});
        if (i>10) { messageBox("Nombre maximum d'action atteint","Action On-False","alert"); return 0; }// TODO gérer si plus de 10 action ... 
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
    $('#listRules').append('<option value="">' + tr("Selectionner une règle") + '</option>');
    $('rule', responseXML).each(function() {
      $('#listRules').append('<option value="' + this.getAttribute("id") + '">' + this.getAttribute("id") + '</option>');
      arrayRules[this.getAttribute('id')]=this; 
    });
  } else $('#listRules').append('<option value="">' + tr("Aucune règle définie") + '</option>');
  
  $('#listRules').change(function(){
    //messageBox(" Selection rule :"+this.value,"Rule","info");
    $('#id-current-rule').val(this.value);
    $("#tab-rules-property").text(serializeToString(arrayRules[this.value]));
    loadRule(arrayRules[this.value]);
    
    this.value = "";
  });
};
function validRule()
{
  var rule = $("#tab-rules-property").text();
  var body = '<write><config><rules>'+rule+'</rules></config></write>';
  // TODO à remplacer par le querylinknx
/*
  var responseXML=queryLinknx(body);
  if (responseXML!=false)
  {
    messageBox(tr("Error while saving rules: ")+textStatus,"Error Saving Rule","alert");
  } else {
    messageBox(tr("Registration rule successfully")+responseXML.textContent,"Save Rule","");
  }
*/

  req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',
    success: function(responseXML, status) {
      var xmlResponse = responseXML.documentElement;
      if (xmlResponse.getAttribute('status') != 'error') {
        messageBox(tr("Registration rule successfully")+xmlResponse.textContent,"Save Rule","");
      }
      else
        messageBox(tr("Error: ")+xmlResponse.textContent,"Error Saving Rule","alert");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      messageBox(tr("Error while saving rules: ")+textStatus,"Error Saving Rule","alert");
    }
  });
};
