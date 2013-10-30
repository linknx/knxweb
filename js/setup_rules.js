
jQuery(document).ready(function(){

  $( "input:button","#tab-rules").button();
  
  _ioport_select = $('<select>/');
  var body = '<read><config><services><ioports /></services></config></read>';
  var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',
    success: function(responseXML, status) {
      var xmlResponse = responseXML.documentElement;
      if (xmlResponse.getAttribute('status') != 'error') {
        $('ioport', responseXML).each(function() {
          var ioport=this.getAttribute('id');
          var option='<option value="' + ioport + '">' + ioport + '</option>';
          $('#tab-rules-ioport-rx-condition-ioport').append(option);
          $('#tab-rules-ioport-connect-condition-ioport').append(option);
          _ioport_select.append(option);
        });
      }
      else
        messageBox(tr("Error: ")+responseXML.textContent, tr('Error'), 'alert');
    }
  });
  
  $('#addcondition').append('<option value="">' + tr("Add a condition") + '</option>');
  
  var conditionsSelect=$('#addcondition').get(0);
  for(key in conditionsList) {
    if ( key != 'script' || tab_config['haveLua'] == "true" )
      conditionsSelect.options[conditionsSelect.options.length] = new Option(conditionsList[key], key);
  }

  $('#addcondition').change(function(){
    var type = this.value;
    rulesCondition.addCondition(type);
    this.value = "";
  });
  
  $('#addaction').append('<option value="">' + tr("Add an action") + '</option>');
  var actionsSelect=$('#addaction').get(0);
  
  for(key in actionsList) {
    if ( ( key != 'send-sms' || tab_config['haveSMS'] == "true" ) &&
    ( key != 'send-email' || tab_config['haveEmail'] == "true" ) &&
    ( key != 'script' || tab_config['haveLua'] == "true" ) )
      actionsSelect.options[actionsSelect.options.length] = new Option(actionsList[key], key);
  }
  
  $('#addaction').change(function(){
    var type = this.value;
    rulesAction.addAction(type);
    this.value = "";
  });

  loadRulesList();
    
  // Move property DOM to left column
  var property = $('#tab-rules-property').clone();
  $('#tab-rules-property').remove();
  $('#propertiesContainer').append(property);

  $("#propertiesContainer div").hide();
  $("#propertiesContainer div:first").show();
  property.show();
  $("#propertiesContainer").show();
  
  jsPlumb.Defaults.Container = 'tab-rules-container';
  jsPlumb.setDefaultScope("connection");

  jsPlumb.bind("jsPlumbConnection",function(data) {
      rules.generateXML();
    });
  jsPlumb.bind("jsPlumbConnectionDetached",function(data) {
      rules.generateXML();
    });
  
  myDropOptions = {  
    tolerance:'touch',
    hoverClass:'dropHover',
    activeClass:'dragActive'
  };

  inputColor = '#00D'; // bleu
  inputEndpoint = {
    endpoint:["Rectangle", {width:10, height:10} ],
    paintStyle:{ fillStyle:inputColor },
    isSource:false,
    isTarget:true,
    scope:'connection',
    connectorStyle : {
        lineWidth:3,
        strokeStyle:'#000'
    },
    dropOptions : myDropOptions
  };
  
                                                                              
  outputColor = '#0A0'; // vert
  outputEndpoint = {
    endpoint:["Rectangle", {width:10, height:10} ],
    paintStyle:{ fillStyle:outputColor },
    isSource:true,
    isTarget:false,
    scope:'connection',
    connectorStyle : {
        lineWidth:3,
        strokeStyle:'#000'
    },
    dropOptions : myDropOptions
  };
  
  pos_top = $('#tab-rules-container').height()/2;
  pos_right = $('#tab-rules-container').width()/2;
  
  outputColorFalse = '#D00'; //couleur rouge
  outputEndpointFalse = {
    endpoint:["Rectangle", {width:10, height:10} ],
    paintStyle:{ fillStyle:outputColorFalse },
    isSource:true,
    isTarget:false,
    scope:'connection',
    connectorStyle : {
        lineWidth:3,
        strokeStyle:'#000'
    },
    dropOptions : myDropOptions
  };
  
  
  actionlist =$('<div>');
  actionlist.addClass('actionlist');
  actionlist.addClass('action');
  actionlist.attr("id", "actionlist");
  actionlist.css("height", "240px").css("width", "70px");
  actionlist.html('Actionlist');
  
  actionlist[0].type="actionlist";
  actionlist[0].condition=true;
  $('#tab-rules-container').append(actionlist);
  
  actionlist.dblclick(function () {
    if ($("span", '#actionlistOnTrue').text() != 'On-True') {
      $("span", '#actionlistOnTrue').text('On-True');
      $("span", '#actionlistOnFalse').text('On-False');
    } else {
      $("span", '#actionlistOnTrue').text('If-True');
      $("span", '#actionlistOnFalse').text('If-False');
    }
    rules.generateXML();
  });
  
  $('#actionlist').css("top",pos_top-$('#actionlist').height()/2);
  $('#actionlist').css("right",pos_right-$('#actionlist').width()/2);
  
  actionlist[0].endpoint = [];
  actionlist[0].endpoint[0] = jsPlumb.addEndpoint("actionlist" , $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
  
  var actionlistontrue =$('<div>');
  actionlistontrue.attr("id", "actionlistOnTrue");
  actionlistontrue.attr("title", tr("DblClick : Toggle On-True / If-True"));
  actionlistontrue.append('<span style="position: absolute; top: 50%; text-align: center; right: 10px;">On-True</span>');
  Playactionlistontrue = $('<div class="play" title="'+tr('Execute')+'" ></div>')
  Playactionlistontrue.click(function() { executeActionRule(true);});
  actionlistontrue.append(Playactionlistontrue);
  
  actionlistontrue[0].type="actionlist";
  actionlistontrue[0].condition=true;
  
  actionlist.append(actionlistontrue);
  actionlistontrue.draggable({ disabled: true });
  
  jsPlumb.draggable("actionlistOnTrue", false);
  
  actionlist[0].ontrue = [];
  actionlist[0].ontrue[0]=null;
  actionlist[0].ontrue[1]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0, 0, 0] , uuid: "ontrue1" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[2]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.1, 0, 0] , uuid: "ontrue2" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[3]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.2, 0, 0] , uuid: "ontrue3" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[4]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.3, 0, 0] , uuid: "ontrue4" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[5]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.4, 0, 0] , uuid: "ontrue5" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[6]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.5, 0, 0] , uuid: "ontrue6" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[7]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.6, 0, 0] , uuid: "ontrue7" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[8]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.7, 0, 0] , uuid: "ontrue8" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[9]  = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.8, 0, 0] , uuid: "ontrue9" , scope:'ontrue'}, outputEndpoint));
  actionlist[0].ontrue[10] = jsPlumb.addEndpoint("actionlistOnTrue" , $.extend({ anchor:[1, 0.9, 0, 0] , uuid: "ontrue10" , scope:'ontrue'},  outputEndpoint));
  
  var actionlistonfalse =$('<div>');
  actionlistonfalse.attr("id", "actionlistOnFalse");
  actionlistontrue.attr("title", tr("DblClick : Toggle On-False / If-False"));
  actionlistonfalse.append('<span style="position: absolute; top: 50%; text-align: center; right: 10px;">On-False</span>');
  Playactionlistonfalse = $('<div class="play" title="'+tr('Execute')+'" ></div>')
  Playactionlistonfalse.click(function() { executeActionRule(false);});
  actionlistonfalse.append(Playactionlistonfalse);
  
  actionlistonfalse[0].type="actionlist";
  actionlistonfalse[0].condition=true;
  
  actionlist.append(actionlistonfalse);
  actionlistonfalse.draggable({ disabled: true });
  actionlist.draggable({ disabled: true });
  
  jsPlumb.draggable("actionlistOnFalse", false);
  
  actionlist[0].onfalse = [];
  actionlist[0].onfalse[0]=null;
  actionlist[0].onfalse[1]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.1, 0, 0] , uuid: "onfalse1" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[2]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.2, 0, 0] , uuid: "onfalse2" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[3]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.3, 0, 0] , uuid: "onfalse3" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[4]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.4, 0, 0] , uuid: "onfalse4" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[5]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.5, 0, 0] , uuid: "onfalse5" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[6]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.6, 0, 0] , uuid: "onfalse6" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[7]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.7, 0, 0] , uuid: "onfalse7" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[8]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.8, 0, 0] , uuid: "onfalse8" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[9]  = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 0.9, 0, 0] , uuid: "onfalse9" , scope:'onfalse'}, outputEndpointFalse));
  actionlist[0].onfalse[10] = jsPlumb.addEndpoint("actionlistOnFalse" , $.extend({ anchor:[1, 1, 0, 0] , uuid: "onfalse10" , scope:'onfalse'}, outputEndpointFalse));
  
  
  jsPlumb.draggable("actionlist", false);

  // Fill object list select
  var responseXML=queryLinknx('<read><config><objects/></config></read>');

  if (responseXML!=false)
  {
    $("#tab-rules-ioport-rx-condition-object0").append('<option value="" >' + tr("None") + '</option>');
    $("#tab-rules-ioport-rx-condition-object1").append('<option value="" >' + tr("None") + '</option>');
    $("#tab-rules-ioport-rx-condition-object2").append('<option value="" >' + tr("None") + '</option>');
    $("#tab-rules-ioport-rx-condition-object3").append('<option value="" >' + tr("None") + '</option>');
    $('object', responseXML).each(function() {
      var option=$('<option>' + this.getAttribute('id') + ' ('+this.getAttribute('type')+') </option>').attr('value',this.getAttribute('id'));
      option[0].type=this.getAttribute('type');
      $("#tab-rules-object-condition-object").append(option);
      listobject.append(option.clone());

      if (this.getAttribute('type')=='1.001') {
        listobject_1_001.append(option.clone());
      }
      
      if (this.getAttribute('type')=='10.001') {
        $("#timer-condition-at-variabletime-time").append(option.clone());
        $("#timer-condition-until-variabletime-time").append(option.clone());
      }
      if (this.getAttribute('type')=='11.001') {
        $("#timer-condition-at-variabledate-date").append(option.clone());
        $("#timer-condition-until-variabledate-date").append(option.clone());
      }

      var option=$('<option>' + this.getAttribute('id') + ' (' +  this.getAttribute('type') + ')' + '</option>').attr('value',this.getAttribute('id'));
      $("#tab-rules-objectcompare-condition-object").append(option);
      $("#tab-rules-objectcompare-condition-object2").append(option.clone());
      
      $("#tab-rules-ioport-rx-condition-object0").append(option.clone());
      $("#tab-rules-ioport-rx-condition-object1").append(option.clone());
      $("#tab-rules-ioport-rx-condition-object2").append(option.clone());
      $("#tab-rules-ioport-rx-condition-object3").append(option.clone());
      
    });
  }

  $(".slidermanuelautorule").click(function(){
    var ruleid = $("#id-current-rule").val();
    if ($('.checkbox',this).attr('checked')) { // désactive la rule
      if (rules.autoManuRule(ruleid,false)) {
        $(this).removeClass('sliderauto');
        $(this).addClass('slidermanuel');
        $('.checkbox',this).attr('checked', false);
      }
    } else { // active la rule
      if (rules.autoManuRule(ruleid,true)) {
        $(this).removeClass('slidermanuel');
        $(this).addClass('sliderauto');
        $('.checkbox',this).attr('checked', true);
      }
    }
  });
  
  loading.hide();

});

