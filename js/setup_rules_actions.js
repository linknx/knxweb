function cdataTextcontent(data) {
  var pos = data.indexOf('<![CDATA['); //'<![CDATA[' + action[0].objvalue + ']]>'
  //'&lt;![CDATA[' ']]&gt;'
  if (pos != "-1") {
    var pos2 = data.lastIndexOf(']]>');
    data = data.substring(pos + 9 ,pos2);
  } 
  return data;
}

$.extend(rules, {

  // ******************** Action ************************
/*
    'set-value' : 'Set Value',
    'copy-value' : 'Copy Value',
    'toggle-value' : 'Toggle Value',
    'set-string' : 'Set String',
    'send-read-request' : 'Send Read Request',
    'cycle-on-off' : 'Cycle On Off',
    'repeat' : 'Repeat',
    'conditional' : 'Conditional',
    'send-sms' : 'Send Sms',
    'send-email' : 'Send Email',
    'dim-up' : 'Dim Up',
    'shell-cmd' : 'Shell Cmd',
    'ioport-tx' : 'Ioport Tx',
    'script' : 'Script',
    'cancel' : 'Cancel',
    'formula' : 'Formula', // only since version 0.0.1.29
    'start-actionlist' : 'Start-actionlist' // only since version 0.0.1.29
*/
  addActionRule: function(type, action, numaction) {
    nbrAction++;
    var div=$('<div>');
    div.addClass('action');
    div.addClass(type);
    div.attr("id", type+((new Date().getTime())));
    div[0].type=type;
    div[0].condition=false;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      rules.editAction(this.type, this, false, true);
    });

    // TODO gérer le "Delay" pour chaque action
    div[0].delay=action.getAttribute('delay');
    
    switch (type) {
      case 'set-value' :
        div[0].objid=action.getAttribute('id');
        div[0].objvalue=action.getAttribute('value');
        div.css("width","140px");
        break;
      case 'copy-value' :
        div[0].objfrom=action.getAttribute('from');
        div[0].objto=action.getAttribute('to');
        div.css("width","140px");
        break;
      case 'toggle-value' :
        div[0].objid=action.getAttribute('id');
        div.css("width","140px");
        break;
      case 'set-string' :
        div[0].objid=action.getAttribute('id');
        div[0].objvalue=action.getAttribute('value');
        div.css("width","140px");
        break;
      case 'send-read-request' :
        div[0].objid=action.getAttribute('id');
        div.css("width","140px");
        break;
      case 'cycle-on-off' :
        div[0].objid=action.getAttribute('id');
        div[0].on=action.getAttribute('on');
        div[0].off=action.getAttribute('off');
        div[0].count=action.getAttribute('count');
        div.css("width","140px");
        break;
      case 'repeat' :
        div[0].period=action.getAttribute('period');
        div[0].count=action.getAttribute('count');
        div.css("width","140px");
        break;
      case 'conditional' : // TODO à compléter
        break;
      case 'send-sms' :
        div[0].objid=action.getAttribute('id');
        div[0].objvalue=action.getAttribute('value');
        div[0].smsvar=action.getAttribute('var');
        div.css("width","140px");
        break;
      case 'send-email' :
        div[0].objto=action.getAttribute('to');
        div[0].subject=action.getAttribute('subject');
        div[0].emailvar=action.getAttribute('var');
        div[0].objtext=action.textContent;
        div.css("width","140px");
        break;
      case 'dim-up' :
        div[0].objid=action.getAttribute('id');
        div[0].objstart=action.getAttribute('start');
        div[0].objstop=action.getAttribute('stop');
        div[0].duration=action.getAttribute('duration');
        div.css("width","140px");
        break;
      case 'shell-cmd' :
        div[0].cmd=action.getAttribute('cmd');
        div[0].cmdvar=action.getAttribute('var'); // TODO à gérer partout cmdvar ...
        div.css("width","140px");
        break;
      case 'ioport-tx' :
        div[0].hex=action.getAttribute('hex');
        div[0].data=action.getAttribute('data');
        div[0].ioport=action.getAttribute('ioport');
        div[0].ioportvar=action.getAttribute('var');
        div.css("width","140px");
        break;
      case 'script' :
        div[0].script=action.textContent;
        break;
      case 'cancel' :
        div[0].cancel_rule=action.getAttribute('rule-id');
        div.css("width","140px");
        break;
      case 'formula' :  // only since version 0.0.1.29
        div[0].formula_x=action.getAttribute('x');
        div[0].formula_y=action.getAttribute('y');
        div[0].formula_a=action.getAttribute('a');
        div[0].formula_b=action.getAttribute('b');
        div[0].formula_c=action.getAttribute('c');
        div[0].formula_m=action.getAttribute('m');
        div[0].formula_n=action.getAttribute('n');
        div.css("width","140px");
        break;
      case 'start-actionlist' : // only since version 0.0.1.29
        div[0].rule_id=action.getAttribute('rule-id');
        div[0].list=action.getAttribute('list');
        div.css("width","160px");
        break;
    }; 

    //div.css("top",pos_top+numaction*50);
    //div.css("right",pos_right + 70);
    
    div.css("top",20+numaction*50);
    //div.css("top",20+nbrAction*50);
    
    div.css("right",pos_right-div.width()-90);
   
    jsPlumb.draggable(div);

    div[0].endpointin = jsPlumb.addEndpoint(div.attr("id"),$.extend({ anchor:[0, 0.5, 0, 0], uuid: "endpoint"+div.attr("id") }, inputEndpoint));  

    this.editAction(type, div[0], false, false);
    this.saveAction(type);
    
    rules.addactionCurrent(div);
    return div;
  },
  addAction: function(type) {
    var div=$('<div>');
    div.addClass('action');
    div.addClass(type);
    div.attr("id", ((new Date().getTime())));
    div[0].type=type;
    div[0].condition=false;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
      rules.editAction(this.type, this, false, true);
    });
    
    div[0].endpointin = jsPlumb.addEndpoint(div.attr("id"),$.extend({ anchor:[0, 0.5, 0, 0], uuid: "endpoint"+div.attr("id") }, inputEndpoint));

    //div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint)); // pour les conditions
    
    // TODO gérer le "Delay" pour chaque action
    div[0].delay='';
    
    switch (type) {
      case 'set-value' :
        div[0].objid='';
        div[0].objvalue='';
        div.css("width","140px");
        break;
      case 'copy-value' :
        div[0].objfrom='';
        div[0].objto='';
        div.css("width","140px");
        break;
      case 'toggle-value' :
        div[0].objid='';
        div.css("width","140px");
        break;
      case 'set-string' :
        div[0].objid='';
        div[0].objvalue='';
        div.css("width","140px");
        break;
      case 'send-read-request' :
        div[0].objid='';
        div.css("width","140px");
        break;
      case 'cycle-on-off' :
        div[0].objid='';
        div[0].on='';
        div[0].off='';
        div[0].count='';
        div.css("width","140px");
        break;
      case 'repeat' :
        div[0].period='';
        div[0].count='';
        div.css("width","140px");
        break;
      case 'conditional' : // TODO à compléter
        break;
      case 'send-sms' :
        div[0].objid='';
        div[0].objvalue='';
        div[0].smsvar='';
        div.css("width","140px");
        break;
      case 'send-email' :
        div[0].objto='';
        div[0].subject='';
        div[0].emailvar='';
        div[0].objtext='';
        div.css("width","140px");
        break;
      case 'dim-up' :
        div[0].objid='';
        div[0].objstart='';
        div[0].objstop='';
        div[0].duration='';
        div.css("width","140px");
        break;
      case 'shell-cmd' :
        div[0].cmd='';
        div[0].cmdvar='';
        div.css("width","140px");
        break;
      case 'ioport-tx' :
        div[0].hex='';
        div[0].data='';
        div[0].ioport='';
        div[0].ioportvar='';
        div.css("width","140px");
        break;
      case 'script' :
        //html = '<br />'+$('#tab-rules-script-action-script').val();
        div[0].script='';
        break;
      case 'cancel' :
        //html = '<br />'+$('#tab-rules-cancel-action-value').val();
        div[0].cancel_rule='';
        div.css("width","140px");
        break;
      case 'formula' :  // only since version 0.0.1.29
        div[0].formula_x='';
        div[0].formula_y='';
        div[0].formula_a='1.0';
        div[0].formula_b='1.0';
        div[0].formula_c='0.0';
        div[0].formula_m='1.0';
        div[0].formula_n='1.0';
        div.css("width","140px");
        break;
      case 'start-actionlist' : // only since version 0.0.1.29
        div[0].rule_id='';
        div[0].list=true;
        div.css("width","160px");
        break;
    }; 

    jsPlumb.draggable(div);
    
    this.editAction(type, div[0], true, true);
    rules.addactionCurrent(div);
  },
  
  editAction: function(type, div, isNew, openDialog) {
    if (!document.getElementById('tab-rules-'+type+'-action-dialog')) {
      rules.createDialogAction('tab-rules-'+type+'-action-dialog', "Editer "+type, "540px" , true, type);
    }
    if (isNew!='')
      $('#tab-rules-'+type+'-action-dialog')[0].isNew=isNew; 
    else
      $('#tab-rules-'+type+'-action-dialog')[0].isNew=false;

    $('#tab-rules-'+type+'-action-dialog')[0].editing=div;

    //$('#tab-rules-'+type+'-action-'+attr).text(div[0].script);
    
    $('#tab-rules-action-delay').val(div.delay);
    
    // TODO données en fonction du "type" ...
    switch (type) {
      case 'set-value' :
        $('#tab-rules-set-value-action-object').val(div.objid);
        $('#tab-rules-set-value-action-value').val(div.objvalue);
        break;
      case 'copy-value' :
        $('#tab-rules-copy-value-action-object-from').val(div.objfrom);
        $('#tab-rules-copy-value-action-object-to').val(div.objto);
        break;
      case 'toggle-value' :
        $('#tab-rules-toggle-value-action-object').val(div.objid);
        break;
      case 'set-string' :
        $('#tab-rules-set-string-action-object').val(div.objid);
        $('#tab-rules-set-string-action-string').val(div.objvalue);
        break;
      case 'send-read-request' :
        $('#tab-rules-send-read-request-action-object').val(div.objid);
        break;
      case 'cycle-on-off' :
        $('#tab-rules-cycle-on-off-action-object').val(div.objid);
        $('#tab-rules-cycle-on-off-action-on').val(div.on);
        $('#tab-rules-cycle-on-off-action-off').val(div.off);
        $('#tab-rules-cycle-on-off-action-count').val(div.count);
  // TODO gérer stopcondition
        break;
      case 'repeat' :
        $('#tab-rules-repeat-action-period').val(div.period);
        $('#tab-rules-repeat-action-count').val(div.count);
  // TODO gérer Action 
        break;
      case 'conditional' : // TODO à compléter
        break;
      case 'send-sms' :
        $('#tab-rules-send-sms-action-id').val(div.objid);
        $('#tab-rules-send-sms-action-value').val(div.objvalue);
        $('#tab-rules-send-sms-action-var').val(div.smsvar);
        break;
      case 'send-email' :
        $('#tab-rules-send-email-action-to').val(div.objto);
        $('#tab-rules-send-email-action-subject').val(div.subject);
        $('#tab-rules-send-email-action-var').val(div.emailvar);
        $('#tab-rules-send-email-action-text').val(div.objtext);
        break;
      case 'dim-up' :
        $('#tab-rules-dim-up-action-object').val(div.objid);
        $('#tab-rules-dim-up-action-start').val(div.objstart);
        $('#tab-rules-dim-up-action-stop').val(div.objstop);
        $('#tab-rules-dim-up-action-duration').val(div.duration);
        break;
      case 'shell-cmd' :
        $('#tab-rules-shell-cmd-action-value').val(div.cmd);
        $('#tab-rules-shell-cmd-action-var').val(div.cmdvar);
        break;
      case 'ioport-tx' :
        $('#tab-rules-send-ioport-tx-hex').val(div.hex);
        $('#tab-rules-send-ioport-tx-data').val(div.data);
        $('#tab-rules-ioport-tx-action-ioport').val(div.ioport);
        $('#tab-rules-ioport-tx-action-var').val(div.ioportvar);
        break;
      case 'script' :
        $('#tab-rules-script-action-script').val(div.script);
        break;
      case 'cancel' :
        $('#tab-rules-cancel-action-value').val(div.cancel_rule);
        break;
      case 'formula' :  // only since version 0.0.1.29
        $('#tab-rules-formula-x-action-value').val(div.formula_x);
        $('#tab-rules-formula-y-action-value').val(div.formula_y);
        $('#tab-rules-formula-a-action-value').val(div.formula_a);
        $('#tab-rules-formula-b-action-value').val(div.formula_b);
        $('#tab-rules-formula-c-action-value').val(div.formula_c);
        $('#tab-rules-formula-m-action-value').val(div.formula_m);
        $('#tab-rules-formula-n-action-value').val(div.formula_n);
        break;
      case 'start-actionlist' : // only since version 0.0.1.29
        $('#tab-rules-start-actionlist-action-rule-id').val(div.rule_id);
        $('#tab-rules-start-actionlist-action-list').attr('checked',div.list);
        break;
    };

    if (openDialog)
      $('#tab-rules-'+type+'-action-dialog').dialog('open');
 
  },
  
  saveAction: function(type) {
    var div=$('#tab-rules-'+type+'-action-dialog')[0].editing;
    //div.script=$('#tab-rules-'+type+'-action-script').text();
    
    div.delay=$('#tab-rules-action-delay').val();
    
    var html = '';
    switch (type) {
      case 'set-value' :
        div.objid=$('#tab-rules-set-value-action-object').val();
        div.objvalue=$('#tab-rules-set-value-action-value').val();
        html = '<br />'+div.objid+'<br />'+div.objvalue;
        break;
      case 'copy-value' :
        div.objfrom=$('#tab-rules-copy-value-action-object-from').val();
        div.objto=$('#tab-rules-copy-value-action-object-to').val();
        html = '<br />'+div.objfrom+'<br />'+div.objto;
        break;
      case 'toggle-value' :
        div.objid=$('#tab-rules-toggle-value-action-object').val();
        html = '<br />'+div.objid;
        break;
      case 'set-string' :
        div.objid=$('#tab-rules-set-string-action-object').val();
        div.objvalue=$('#tab-rules-set-string-action-string').val();
        html = '<br />'+div.objid+'<br />'+div.objvalue;
        break;
      case 'send-read-request' :
        div.objid=$('#tab-rules-send-read-request-action-object').val();
        html = '<br />'+div.objid;
        break;
      case 'cycle-on-off' :
        div.objid=$('#tab-rules-cycle-on-off-action-object').val();
        div.on=$('#tab-rules-cycle-on-off-action-on').val();
        div.off=$('#tab-rules-cycle-on-off-action-off').val();
        div.count=$('#tab-rules-cycle-on-off-action-count').val();
        html = '<br />'+div.objid+'<br />'+div.on+' '+div.off+'<br />'+div.count;
        break;
      case 'repeat' :
        div.period=$('#tab-rules-repeat-action-period').val();
        div.count=$('#tab-rules-repeat-action-count').val();
        html = '<br />'+div.period+'<br />'+div.count;
        break;
      case 'conditional' : // TODO à compléter
        break;
      case 'send-sms' :
        div.objid=$('#tab-rules-send-sms-action-id').val();
        div.objvalue=$('#tab-rules-send-sms-action-value').val();
        div.smsvar=$('#tab-rules-send-sms-action-var').val();
        html = '<br />'+div.objid+'<br />'+div.objvalue;
        break;
      case 'send-email' :
        div.objto=$('#tab-rules-send-email-action-to').val();
        div.subject=$('#tab-rules-send-email-action-subject').val();
        div.emailvar=$('#tab-rules-send-email-action-var').val();
        div.objtext=$('#tab-rules-send-email-action-text').val();
        html = '<br />'+div.objto+'<br />'+div.subject;
        break;
      case 'dim-up' :
        div.objid=$('#tab-rules-dim-up-action-object').val();
        div.objstart=$('#tab-rules-dim-up-action-start').val();
        div.objstop=$('#tab-rules-dim-up-action-stop').val();
        div.duration=$('#tab-rules-dim-up-action-duration').val();
        html = '<br />'+div.objid;
        break;
      case 'shell-cmd' :
        div.cmd = $('#tab-rules-shell-cmd-action-value').val();
        div.cmdvar = $('#tab-rules-shell-cmd-action-var').val();
        html = '<br />'+div.cmd;
        break;
      case 'ioport-tx' :
        div.hex=$('#tab-rules-send-ioport-tx-hex').val();
        div.data=$('#tab-rules-send-ioport-tx-data').val();
        div.ioport=$('#tab-rules-send-ioport-tx-ioport').val();
        div.ioportvar=$('#tab-rules-ioport-tx-action-var').val();
        html = '<br />'+div.ioport;
        break;
      case 'script' :
        div.script = $('#tab-rules-script-action-script').val();
        html = '';
        break;
      case 'cancel' :
        div.cancel_rule = $('#tab-rules-cancel-action-value').val();
        html = '<br />'+div.cancel_rule;
        //var width = div.cancel_rule.lenght + 2;
        //$(div).css("width",width+"em"); 
        break;
      case 'formula' :  // only since version 0.0.1.29
        div.formula_x = $('#tab-rules-formula-x-action-value').val();
        div.formula_y = $('#tab-rules-formula-y-action-value').val();
        div.formula_a = $('#tab-rules-formula-a-action-value').val();
        div.formula_b = $('#tab-rules-formula-b-action-value').val();
        div.formula_c = $('#tab-rules-formula-c-action-value').val();
        div.formula_m = $('#tab-rules-formula-m-action-value').val();
        div.formula_n = $('#tab-rules-formula-n-action-value').val();
        html = '<br />'+div.formula_a+'*'+div.formula_x+'^'+div.formula_m+'+'+div.formula_b+'*'+div.formula_y+'^'+div.formula_n+'+'+div.formula_c; //a*x^m+b*y^n+c
        break;
      case 'start-actionlist' : // only since version 0.0.1.29
        div.rule_id = $('#tab-rules-start-actionlist-action-rule-id').val();
        //div.list = $('#tab-rules-start-actionlist-action-list').val();
        div.list = $('#tab-rules-start-actionlist-action-list').attr('checked');
        html = '<br />rule : '+div.rule_id+'<br />actionlist : '+div.list;
        break;
    };

    $(div).html('<strong>'+actionsList[type]+'</strong>'+html);
    
    return true;
  },
  // ******************** /Action ************************


  
  generateNodeXMLAction: function(action) {
    var xml=$('<action/>');
    xml.attr('type',action[0].type);
    
    if (action[0].delay) xml.attr('delay',action[0].delay);
          
    switch (action[0].type) {  // TODO complete xml action
      case 'set-value' : // < type="" id="" value="" />
        xml.attr('id',action[0].objid);
        xml.attr('value',action[0].objvalue);
        break;
      case 'copy-value' : // < type="" from="" to="" />
        xml.attr('from',action[0].objfrom);
        xml.attr('to',action[0].objto);
        break;
      case 'toggle-value' : // < type="" id="" />
        xml.attr('id',action[0].objid);
        break;
      case 'set-string' : // < type="" id="" value="" />
        xml.attr('id',action[0].objid);
        xml.attr('value',action[0].objvalue);
        break;
      case 'send-read-request' : // < type="" id="" />
        xml.attr('id',action[0].objid);
        break;
      case 'cycle-on-off' : // < type="" id="" on="" off="" count="" ><stopcondition ... />
        xml.attr('id',action[0].objid);
        xml.attr('on',action[0].on);
        xml.attr('off',action[0].off);
        xml.attr('count',action[0].count);
        //xml.attr('count',action[0].stopcondition);
        break;
      case 'repeat' : // < type="" period="" count="" ><action ... />
        xml.attr('period',action[0].period);
        xml.attr('count',action[0].count);
  // TODO à faire ...
        break;
      case 'conditional' : // < type="" ><condition ...
  // TODO à faire ...
        break;
      case 'send-sms' : // < type="" id="" value="" var="true/false" />
        xml.attr('id',action[0].objid);
        //xml.attr('value','<![CDATA[' + action[0].objvalue + ']]>');
        //xml.attr('value',cdataTextcontent(action[0].objvalue));
        xml.attr('value',action[0].objvalue);
        xml.attr('var',action[0].smsvar);
        break;
      case 'send-email' : // <action type="" to="" subject="" var="true/false" >text<action/>
        xml.attr('to',action[0].objto);
        xml.attr('subject',action[0].subject);
        xml.attr('var',action[0].emailvar);
        //xml.text('<![CDATA[' + action[0].objtext + ']]>');
        xml.text(cdataTextcontent(action[0].objtext));
        break;
      case 'dim-up' : // < type="" id="" start="" stop="" duration="" />
        xml.attr('id',action[0].objid);
        xml.attr('start',action[0].objstart);
        xml.attr('stop',action[0].objstop);
        xml.attr('duration',action[0].duration);
        break;
      case 'shell-cmd' : // < type="" cmd="" var="true/false" />
        //xml.attr('cmd','<![CDATA[' + action[0].cmd + ']]>');
        //xml.attr('cmd',cdataTextcontent(action[0].cmd));
        xml.attr('cmd',action[0].cmd);
        xml.attr('var',action[0].cmdvar);
        break;
      case 'ioport-tx' : // < type="" hex="true/false" data="" ioport="" var="true/false" />
        xml.attr('hex',action[0].hex);
        //xml.attr('data','<![CDATA[' + action[0].data + ']]>');
        //xml.attr('data',cdataTextcontent(action[0].data));
        xml.attr('data',action[0].data);
        xml.attr('ioport',action[0].ioport);
        xml.attr('var',action[0].ioportvar);
        break;
      case 'script': // conditionner si linknx est compiler avec lua // < type="" >script <... />
        /*
        xml.attr('id',action[0].object_id);
        xml.attr('op',action[0].object_operation);
        xml.attr('value',action[0].object_value);
        if (action[0].object_trigger) xml.attr('trigger','true');
        */
        //xml.text('<![CDATA[' + action[0].script + ']]>');
        xml.text(cdataTextcontent(action[0].script));
        break;
      case 'cancel' : // < type="" rule-id="" />
        xml.attr('rule-id',action[0].rule_id);
        break;
      case 'formula' :  // only since version 0.0.1.29 : a*x^m+b*y^n+c < type="" id="object" x="" y="" a="1" b="1" c="0" m="1" n="1" />
        xml.attr('x',action[0].formula_x);
        xml.attr('y',action[0].formula_y);
        xml.attr('a',action[0].formula_a);
        xml.attr('b',action[0].formula_b);
        xml.attr('c',action[0].formula_c);
        xml.attr('m',action[0].formula_m);
        xml.attr('n',action[0].formula_n);
        break;
      case 'start-actionlist' : // only since version 0.0.1.29 < type="" rule-id="" list="true/false" /> 
        xml.attr('rule-id',action[0].rule_id);
        xml.attr('list',action[0].list);
        break;
    }

    var c = jsPlumb.getConnections({source:action.attr('id')});
    //var c = jsPlumb.getConnections({source:action[0].endpointin}); 
    for (var i in c) {
      var l = c[i];
      if (l && l.length > 0) {
        for (var j = 0; j < l.length; j++) {
          xml.append(this.generateNodeXML($('#'+l[j].targetId)));
        }
      }
    }
   
    return xml;
  },

  createDialogAction: function(id, title, width, action, type) {
    // rules.createDialogAction("tab-rules-script-action-dialog", "Editer un script", "540px" , false)
    // rules.createDialogAction("tab-rules-script-action-dialog", "Editer un script", "540px" , true, "script")
    if (width=='')
      width = "540px";
    if (action=='')
      action = false;
    if (!document.getElementById(id)) {
      $('body').append($('<div id="'+id+'">'));
      if (action == true) { // Action
        var tbody = $('<tbody>');
        switch (type) {
          case 'set-value' :
            var listobjectsetvalue = listobject.clone();
            listobjectsetvalue.attr("id","tab-rules-set-value-action-object");
            tbody.append(
              $('<tr>').append('<th width="150">Object</th>')
              .append($('<td>').append(listobjectsetvalue))
              ).append(
              $('<tr>').append('<th width="150">Value</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-set-value-action-value" size="50">'))
              );
            break;
          case 'copy-value' :
            var listobjectcopyvaluefrom = listobject.clone();
            listobjectcopyvaluefrom.attr("id","tab-rules-copy-value-action-object-from");
            var listobjectcopyvalueto = listobject.clone();
            listobjectcopyvalueto.attr("id","tab-rules-copy-value-action-object-to");
            tbody.append(
              $('<tr>').append('<th width="150">From</th>')
              .append($('<td>').append(listobjectcopyvaluefrom))
              ).append(
              $('<tr>').append('<th width="150">to</th>')
              .append($('<td>').append(listobjectcopyvalueto))
              );
            break;
          case 'toggle-value' :
            var listobjecttogglevalue = listobject_1_001.clone();
            listobjecttogglevalue.attr("id","tab-rules-toggle-value-action-object");
            tbody.append(
              $('<tr>').append('<th width="150">Object</th>')
              .append($('<td>').append(listobjecttogglevalue))
              );
            break;
          case 'set-string' :
            var listobjectsetstring = listobject.clone();
            listobjectsetstring.attr("id","tab-rules-set-string-action-object");
            tbody.append(
              $('<tr>').append('<th width="150">Object</th>')
              .append($('<td>').append(listobjectsetstring))
              ).append(
              $('<tr>').append('<th width="150">String</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-set-string-action-string" size="50">'))
              );
            break;
          case 'send-read-request' :
            var listobjectsendread = listobject.clone();
            listobjectsendread.attr("id","tab-rules-send-read-request-action-object");
            tbody.append(
              $('<tr>').append('<th width="150">Object</th>')
              .append($('<td>').append(listobjectsendread))
              );
            break;
          case 'cycle-on-off' :
            var listobjectcycleonoff = listobject.clone();
            listobjectcycleonoff.attr("id","tab-rules-cycle-on-off-action-object");
            tbody.append(
              $('<tr>').append('<th width="150">Object</th>')
              .append($('<td>').append(listobjectcycleonoff))
              ).append(
              $('<tr>').append('<th width="150">on</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-cycle-on-off-action-on" size="10">'))
              ).append(
              $('<tr>').append('<th width="150">off</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-cycle-on-off-action-off" size="10">'))
              ).append(
              $('<tr>').append('<th width="150">count</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-cycle-on-off-action-count" size="10">'))
              ).append( // TODO Stopcondition à gérer
              $('<tr>').append('<th width="150">Stop condition</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-cycle-on-off-action-stopcondition" size="10">'))
              );
            break;
          case 'repeat' :
            tbody.append(
              $('<tr>').append('<th width="150">Period</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-repeat-action-period" size="10">'))
              ).append(
              $('<tr>').append('<th width="150">Count</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-repeat-action-count" size="10">'))
              ).append( // TODO action à gérer
              $('<tr>').append('<th width="150">action</th>')
              .append($('<td>').append(' '))
              );
            break;
          case 'conditional' : // TODO à gérer
            break;
          case 'send-sms' :
            tbody.append(
              $('<tr>').append('<th width="150">Numéro de Téléphone</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-send-sms-action-id" size="15">'))
              ).append(
              $('<tr>').append('<th width="150">Value</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-send-sms-action-value" size="80">'))
              ).append(
              $('<tr>').append('<th width="150">Var</th>')
              .append($('<td>').append('<input type="checkbox" id="tab-rules-send-sms-action-var" >'))
              );
            break;
          case 'send-email' :
            tbody.append(
              $('<tr>').append('<th width="150">To</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-send-email-action-to" size="50">'))
              ).append(
              $('<tr>').append('<th width="150">Subject</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-send-email-action-subject" size="80">'))
              ).append(
              $('<tr>').append('<th>Var</th>')
              .append($('<td>').append('<input type="checkbox" id="tab-rules-send-email-action-var" >'))
              ).append(
              $('<tr>').append('<th width="150">Text</th>')
              .append($('<td>').append('<textarea cols="80" rows="4" id="tab-rules-send-email-action-text">'))
              );
            break;
          case 'dim-up' :
            var listobjectdimup = listobject.clone();
            listobjectdimup.attr("id","tab-rules-dim-up-action-object");
            tbody.append(
              $('<tr>').append('<th width="150">Object</th>')
              .append($('<td>').append(listobjectdimup))
              ).append(
              $('<tr>').append('<th width="150">Start</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-dim-up-action-start" size="10">'))
              ).append(
              $('<tr>').append('<th width="150">Stop</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-dim-up-action-stop" size="10">'))
              ).append(
              $('<tr>').append('<th width="150">Duration</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-dim-up-action-duration" size="10">'))
              );
            break;
          case 'shell-cmd' :
            tbody.append(
              $('<tr>').append('<th width="150">Command Shell</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-shell-cmd-action-value" size="50">'))
              ).append(
              $('<tr>').append('<th >Var</th>')
              .append($('<td>').append('<input type="checkbox" id="tab-rules-shell-cmd-action-var" >'))
              );
            break;
          case 'ioport-tx' :
            tbody.append(
              $('<tr>').append('<th width="150">Io-Port</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-ioport-tx-action-ioport" size="10">'))
              ).append(
              $('<tr>').append('<th width="150">Data</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-send-ioport-tx-data" size="150">'))
              ).append(
              $('<tr>').append('<th width="150">Hex</th>')
              .append($('<td>').append('<input type="checkbox" id="tab-rules-ioport-tx-action-hex" >'))
              ).append(
              $('<tr>').append('<th width="150">Var</th>')
              .append($('<td>').append('<input type="checkbox" id="tab-rules-ioport-tx-action-var" >'))
              );
            break;
          case 'script' :
            tbody.append(
              $('<tr>').append('<th width="150">Script</th>')
              .append($('<td>').append('<textarea cols="80" rows="4" name="script" class="script" id="tab-rules-script-action-script">'))
              );
            break;
          case 'cancel' :
            var listrules = $('#listRules').clone();
            listrules.attr("id","tab-rules-cancel-action-value");
            tbody.append(
              $('<tr>').append('<th width="150">Cancel Rule</th>')
              .append($('<td>').append(listrules))
              );
            break;
          case 'formula' :  // only since version 0.0.1.29
            tbody.append($('<tr>').append('<td width="300" colspan="2" style="font-weight: bold; color: #F00; line-height: 25px;">Formula : a*x^m+b*y^n+c </td>'));
            tbody.append($('<tr>').append('<th width="50">x</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-x-action-value" size="2">')));
            tbody.append($('<tr>').append('<th width="50">y</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-y-action-value" size="2">')));
            tbody.append($('<tr>').append('<th width="50">a</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-a-action-value" size="2">')));
            tbody.append($('<tr>').append('<th width="50">b</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-b-action-value" size="2">')));
            tbody.append($('<tr>').append('<th width="50">c</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-c-action-value" size="2">')));
            tbody.append($('<tr>').append('<th width="50">m</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-m-action-value" size="2">')));
            tbody.append($('<tr>').append('<th width="50">n</th>').append($('<td>').append('<input type="text" id="tab-rules-formula-n-action-value" size="2">')));
            break;
          case 'start-actionlist' : // only since version 0.0.1.29
            var listrules = $('#listRules').clone();
            listrules.attr("id","tab-rules-start-actionlist-action-rule-id");
            tbody.append(
              $('<tr>').append('<th width="150">Rule</th>')
              .append($('<td>').append(listrules))
              );
            tbody.append(
              $('<tr>').append('<th width="150">Start actionlist</th>')
              .append($('<td>').append('<input type="checkbox" id="tab-rules-start-actionlist-action-list" >'))
              );
            break;
        };
        tbody.append(
          $('<tr>').append('<th>Delay</th>')
          .append($('<td>').append('<input type="text" id="tab-rules-action-delay" size="10">'))
        );
        $('#'+id).append($('<form id="tab-rules-'+type+'-action-form" />').append($('<table class="form" />').append(tbody)));
      }
    }
    
    $('#'+id).dialog({
      autoOpen: false,
      buttons: { 
          "Annuler": function() { rules.handleDialogCancel(this); },
          "Supprimer": function() { rules.handleDialogDelete(this); },
          "Sauver": function() { if (rules.handleDialogSave(this)) $(this).dialog("close"); }
      },
      resizable: false,
      title: title,
      width: width,
      closeOnEscape: false,
      modal: true
    });
  }
});