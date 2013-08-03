
var rulesCondition = {
  // ******************** Condition Rule ************************
  /*
    'and':'And',
    'or':'Or',
    'not':'Not',
    'object' : 'Object',
    'object-src' : 'Object Src',
    'object-compare' : 'Object Compare',
    'timer':'Timer',
    'time-counter':'Time Counter',
    'ioport-rx':'Ioport Rx',
    'ioport-connect':'Ioport Connect',
    'script':'Script' // si linknx gère lua
  */
  
  addConditionRule: function(type, condition, numcondition) {
    numcondition++;
    nbrCondition++; // unique par condition
    
    if (type != "and" && type != "or" && type != "not" ) {
      var div=$('<div>');
      div.addClass('condition');
      div.addClass(type);
      div.attr("id", type+((new Date().getTime())));
      div[0].type=type;
      div[0].condition=true;
      $('#tab-rules-container').append(div);
      
      div.dblclick(function () {
        rulesCondition.editCondition(this.type, this, false, true);
      });
    }
    
    switch (type) {
      case "object":
        div[0].object_id=condition.getAttribute('id');
        div[0].object_operation=condition.getAttribute('op');
        if(!div[0].object_operation) div[0].object_operation='eq';
        div[0].object_value=condition.getAttribute('value');
        div[0].object_trigger=condition.getAttribute('trigger');
        break;
      case "object-src":
        div[0].objectsrc_operation=condition.getAttribute('op');
        if(!div[0].objectsrc_operation) div[0].objectsrc_operation='eq';
        div[0].objectsrc_value=condition.getAttribute('value');
        div[0].objectsrc_trigger=condition.getAttribute('trigger');
        div[0].objectsrc_src=condition.getAttribute('src');
        break;
      case "object-compare":
        div[0].object_id=condition.getAttribute('id');
        div[0].object_operation=condition.getAttribute('op');
        if(!div[0].object_operation) div[0].object_operation='eq';
        div[0].object_id2=condition.getAttribute('id2');
        div[0].object_trigger=condition.getAttribute('trigger');
        break;
      case "time-counter":
        div[0].endpoint = [];
        div[0].endpoint[1] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
        div[0].timecounter_threshold=condition.getAttribute('threshold');
        div[0].timecounter_resetdelay=condition.getAttribute('reset-delay');
        rulesCondition.positionCondition(type, condition, numcondition, div);
        var k = 1;
        collonne_condition++;
        pos_top_condition[collonne_condition] = 0;
        $(condition).children("condition").each(function () {
          var condition2 = rulesCondition.addConditionRule(this.getAttribute('type'), this, numcondition);
          if (condition2[0].type == "and" || condition2[0].type == "or") {
            jsPlumb.connect({source:condition2[0].endpoint[0], target:div[0].endpoint[k]});
          } else {
          jsPlumb.connect({source:condition2[0].endpointout, target:div[0].endpoint[k]});
          }
          if (k > 1) messageBox(tr("Maximum number of condition for reaching this time-counter"),tr("Condition time-counter"),"alert");
          k++;
        });
        if (collonne_condition>1) collonne_condition--;
        break;
        break;
      case "timer":
      //<condition type="timer" trigger="true"> <at hour="9" min="0" wdays="12345"/> <until hour="18" min="0"/> </condition>
        $(condition).children("at").each(function () {
          div[0].timer_atevery='at'; // 'at' ou 'every'
          div[0].timer_at_type='other'; // 'other' 'sunrise' 'sunset' 'noon'
          if (this.getAttribute('type')) div[0].timer_at_type=this.getAttribute('type');
          if (!this.getAttribute('time')) 
            div[0].timer_at_time_constantvariable='constant'; 
          else 
            div[0].timer_at_time_constantvariable='variable'; 
          div[0].timer_at_hour=this.getAttribute('hour');
          div[0].timer_at_min=this.getAttribute('min');
          div[0].timer_at_day=this.getAttribute('day');
          div[0].timer_at_month=this.getAttribute('month');
          div[0].timer_at_year=this.getAttribute('year');
          div[0].timer_at_timeobject=this.getAttribute('time'); 
          if (!this.getAttribute('date')) 
            div[0].timer_at_date_constantvariable='constant'; 
          else 
            div[0].timer_at_date_constantvariable='variable';
          if (this.getAttribute('wdays'))
            div[0].timer_at_dow=this.getAttribute('wdays'); //'1234567'
          else
            div[0].timer_at_dow='1234567'; //'1234567'
          div[0].timer_at_dateobject=this.getAttribute('date');
          div[0].timer_at_exception='';
          if (this.getAttribute('exception')) 
            div[0].timer_at_exception=(this.getAttribute('exception') == 'yes')?"yes":"no";
          div[0].timer_at_offset=this.getAttribute('offset');
          div[0].timer_every='';
        });
        $(condition).children("every").each(function () {
          div[0].timer_atevery='every'; // 'at' ou 'every'
          div[0].timer_at_type='other'; // 'other' 'sunrise' 'sunset' 'noon'
          div[0].timer_at_time_constantvariable='constant'; // 'constant' 'variable' 
          div[0].timer_at_hour='';
          div[0].timer_at_min='';
          div[0].timer_at_day='';
          div[0].timer_at_month='';
          div[0].timer_at_year='';
          div[0].timer_at_timeobject='';
          div[0].timer_at_date_constantvariable='constant'; // 'constant' 'variable'
          div[0].timer_at_dow='1234567'; // '1234567'
          div[0].timer_at_dateobject='';
          div[0].timer_at_exception='';
          div[0].timer_at_offset='0';
          div[0].timer_every=this.textContent;
        }); 
    
        div[0].timer_untilduring='none'; // 'none' 'until' 'during'
        div[0].timer_until_type='other'; // 'other' 'sunrise' 'sunset' 'noon'
        div[0].timer_until_time_constantvariable='constant'; // 'constant' 'variable'
        div[0].timer_until_hour='';
        div[0].timer_until_min='';
        div[0].timer_until_day='';
        div[0].timer_until_month='';
        div[0].timer_until_year='';
        div[0].timer_until_timeobject='';
        div[0].timer_until_date_constantvariable='constant'; // 'constant' 'variable'
        div[0].timer_until_dow='123567'; // '1234567'
        div[0].timer_until_dateobject='';
        div[0].timer_until_exception='';
        div[0].timer_until_offset='0';
        div[0].timer_during='';
        $(condition).children("until").each(function () {
          div[0].timer_untilduring='until';
          div[0].timer_until_type='other';
          if (this.getAttribute('type')) div[0].timer_until_type=this.getAttribute('type');
          if (!this.getAttribute('time')) 
            div[0].timer_until_time_constantvariable='constant'; 
          else 
            div[0].timer_until_time_constantvariable='variable'; 
          div[0].timer_until_hour=this.getAttribute('hour');
          div[0].timer_until_min=this.getAttribute('min');
          div[0].timer_until_day=this.getAttribute('day');
          div[0].timer_until_month=this.getAttribute('month');
          div[0].timer_until_year=this.getAttribute('year');
          div[0].timer_until_timeobject=this.getAttribute('time');
          if (!this.getAttribute('date')) 
            div[0].timer_until_date_constantvariable='constant'; 
          else 
            div[0].timer_until_date_constantvariable= 'variable';
          if (this.getAttribute('wdays'))
            div[0].timer_until_dow=this.getAttribute('wdays'); //'1234567'
          else
            div[0].timer_until_dow='1234567'; //'1234567'
          div[0].timer_until_dateobject=this.getAttribute('date');
          div[0].timer_until_exception='';
          if (this.getAttribute('exception')) 
            div[0].timer_until_exception=(this.getAttribute('exception') == 'yes')?"yes":"no";
          div[0].timer_until_offset=this.getAttribute('offset');
          div[0].timer_during='';
        });
        $(condition).children("during").each(function () {
          div[0].timer_untilduring='during';
          div[0].timer_during=this.textContent;
        });
        
        div[0].timer_trigger=condition.getAttribute('trigger');
        
        rulestab=$("#tab-rules-timer-condition-tabs").tabs();
        rulestab.tabs('select', '#tab-rules-timer-condition-start');
        break;
      case "ioport-rx": // <condition type="" expected="" ioport="" trigger="true"/>
        div[0].ioport_expected=condition.getAttribute('expected');
        div[0].ioport_ioport=condition.getAttribute('ioport');
        div[0].ioport_trigger=condition.getAttribute('trigger');
/* new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object0="" object1="" objectx="" ... */
        div[0].ioport_object0=condition.getAttribute('object0');
        div[0].ioport_object1=condition.getAttribute('object1');
        div[0].ioport_object2=condition.getAttribute('object2');
        div[0].ioport_object3=condition.getAttribute('object3');
        div[0].ioport_regex=condition.getAttribute('regex');
        div[0].ioport_hex=condition.getAttribute('hex');
        break;
      case "ioport-connect": // <condition type="" ioport="" trigger="true" />  /* new in Linknx 0.0.1.31 */ 
        div[0].ioport_ioport=condition.getAttribute('ioport');
        div[0].ioport_trigger=condition.getAttribute('trigger');
        break;
      case "script":
        div[0].script=condition.textContent;
        break;
      case "and":
        var div = rules.addAnd();
        rulesCondition.positionCondition(type, condition, numcondition, div);
        var k = 1;
        collonne_condition++;
        pos_top_condition[collonne_condition] = 0;
        $(condition).children("condition").each(function () {
          var temp_conditionand = rulesCondition.addConditionRule(this.getAttribute('type'), this, numcondition);
          if (temp_conditionand[0].type == "and" || temp_conditionand[0].type == "or") {
            jsPlumb.connect({source:temp_conditionand[0].endpoint[0], target:div[0].endpoint[k]});
          } else {
            jsPlumb.connect({source:temp_conditionand[0].endpointout, target:div[0].endpoint[k]});
          }
          if (k > 11) messageBox(tr("Maximum number of condition for reaching this AND"),tr("Condition And"),"alert");
          k++;
        });
        if (collonne_condition>1) collonne_condition--;
        break;
      case "or":
        var div = rules.addOr();
        rulesCondition.positionCondition(type, condition, numcondition, div);
        var k = 1;
        collonne_condition++;
        pos_top_condition[collonne_condition] = 0;
        $(condition).children("condition").each(function () {
          var temp_conditionor = rulesCondition.addConditionRule(this.getAttribute('type'), this, numcondition);
          if (temp_conditionor[0].type == "and" || temp_conditionor[0].type == "or") {
            jsPlumb.connect({source:temp_conditionor[0].endpoint[0], target:div[0].endpoint[k]});
          } else {
            jsPlumb.connect({source:temp_conditionor[0].endpointout, target:div[0].endpoint[k]});
          }
          if (k > 11) messageBox(tr("Maximum number of condition for reaching this OR"),tr("Condition Or"),"alert");
          k++;
        });
        if (collonne_condition>1) collonne_condition--;
        break;
      case "not":
        var div = rules.addNot();
        rulesCondition.positionCondition(type, condition, numcondition, div);
        var k = 1;
        collonne_condition++;
        pos_top_condition[collonne_condition] = 0;
        $(condition).children("condition").each(function () {
          var condition2 = rulesCondition.addConditionRule(this.getAttribute('type'), this, numcondition);
          if (condition2[0].type == "and" || condition2[0].type == "or") {
            jsPlumb.connect({source:condition2[0].endpoint[0], target:div[0].endpoint[k]});
          } else {
          jsPlumb.connect({source:condition2[0].endpointout, target:div[0].endpoint[k]});
          }
          if (k > 1) messageBox(tr("Maximum number of condition for reaching this NOT"),tr("Condition Not"),"alert");
          k++;
        });
        if (collonne_condition>1) collonne_condition--;
        break;
    };

     
    if (type != "and" && type != "or" && type != "not" ) {
      rulesCondition.positionCondition(type, condition, numcondition, div);
      jsPlumb.draggable(div);
  
      div[0].endpointout = jsPlumb.addEndpoint(div.attr("id"),$.extend({ anchor:[1, 0.5, 0, 0], uuid: "endpoint"+div.attr("id") }, outputEndpoint));
          
      this.editCondition(type, div[0], false, false);
      this.saveCondition(type);
    }
    
    rules.addconditionCurrent(div);
    return div;
  },

  positionCondition: function(type, condition, numcondition, div) {

    if (!pos_right_condition[collonne_condition]) 
      pos_right_condition[collonne_condition] = pos_right_condition[collonne_condition-1]; 

    
    if (numcondition == 1) { // première condition centrée
      div.css("top",pos_top-div.height()/2);
      div.css("right",pos_right+70);
      pos_right_condition[collonne_condition+1] = pos_right + 70 + div.height();
    } else {
      div.css("top",pos_top_condition[collonne_condition] + 20);
      pos_top_condition[collonne_condition] += 20 + div.height();
      div.css("right",pos_right_condition[collonne_condition] + 20);
      var pos_right_div = pos_right_condition[collonne_condition] + 20 + div.width();
      if (!pos_right_condition[collonne_condition+1] || pos_right_condition[collonne_condition+1] < pos_right_div)
        pos_right_condition[collonne_condition+1] = pos_right_div;
    }
  },
  // ******************** / Condition Rule ************************
  
  // ******************** addCondition ************************
  addCondition: function(type) {
  
    if (type != "and" && type != "or" && type != "not" ) { 
      var div=$('<div>');
      div.addClass('condition');
      div.addClass(type);
      div.attr("id", ((new Date().getTime())));
      div[0].type=type;
      div[0].condition=true;
      $('#tab-rules-container').append(div);
      
      div.dblclick(function () {
        rulesCondition.editCondition(this.type, this, false, true);
      });
      
      div[0].endpointout = jsPlumb.addEndpoint(div, $.extend({ anchor:[1, 0.5, 0, 0], uuid: "endpoint"+div.attr("id") }, outputEndpoint));
    }
    switch (type) {
      case "object":
        div[0].object_id='';
        div[0].object_operation='eq';
        div[0].object_value='';
        div[0].object_trigger=false;
        break;
      case "object-src":
        div[0].objectsrc_operation='eq';
        div[0].objectsrc_value='';
        div[0].objectsrc_trigger=false;
        div[0].objectsrc_src='';
        break;
      case "object-compare":
        div[0].object_id='';
        div[0].object_operation='eq';
        div[0].object_id2='';
        div[0].object_trigger=false;
        break;
      case "time-counter":
        div[0].endpoint = [];
        div[0].endpoint[1] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
        div[0].timecounter_threshold='';
        div[0].timecounter_resetdelay='';
        break;
      case "timer":
        div[0].timer_atevery='at';
        div[0].timer_at_type='other';
        div[0].timer_at_time_constantvariable='constant';
        div[0].timer_at_hour='';
        div[0].timer_at_min='';
        div[0].timer_at_day='';
        div[0].timer_at_month='';
        div[0].timer_at_year='';
        div[0].timer_at_timeobject='';
        div[0].timer_at_date_constantvariable='constant';
        div[0].timer_at_dow='1234567';
        div[0].timer_at_dateobject='';
        div[0].timer_at_exception='';
        div[0].timer_at_offset='0';
        div[0].timer_every='';
    
        div[0].timer_untilduring='none';
        div[0].timer_until_type='other';
        div[0].timer_until_time_constantvariable='constant';
        div[0].timer_until_hour='';
        div[0].timer_until_min='';
        div[0].timer_until_day='';
        div[0].timer_until_month='';
        div[0].timer_until_year='';
        div[0].timer_until_timeobject='';
        div[0].timer_until_date_constantvariable='constant';
        div[0].timer_until_dow='123567';
        div[0].timer_until_dateobject='';
        div[0].timer_until_exception='';
        div[0].timer_until_offset='0';
        div[0].timer_during='';
        
        div[0].timer_trigger=false;
        
        rulestab=$("#tab-rules-timer-condition-tabs").tabs();
        rulestab.tabs('select', '#tab-rules-timer-condition-start');
        break;
      case "and":
        var div = rules.addAnd();
        break;
      case "or":
        var div = rules.addOr();
        break;
      case "not":
        var div = rules.addNot();
        break;
      case "ioport-rx":
        div[0].ioport_expected='';
        div[0].ioport_ioport='';
        div[0].ioport_trigger=false;
/* new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object="" */
        div[0].ioport_object0='';
        div[0].ioport_object1='';
        div[0].ioport_object2='';
        div[0].ioport_object3='';
        div[0].ioport_regex=false;
        div[0].ioport_hex=false;
        break;
      case "ioport-connect": // <condition type="" ioport="" trigger="true" />  /* new in Linknx 0.0.1.31 */ 
        div[0].ioport_ioport='';
        div[0].ioport_trigger=false;
        break;
      case "script":
        div[0].script='';
        break;
    };

    if (type != "and" && type != "or" && type != "not" ) {
      jsPlumb.draggable(div);
      this.editCondition(type, div[0], true, true);
    }
    rules.addconditionCurrent(div);
  },
  // ******************** /addCondition ************************
  // ******************** editCondition ************************
  editCondition: function(type, div, isNew, openDialog) {
    var widthdialog = "540px";
    if (type == "time-counter") { widthdialog = "480px"; }
    if (type == "timer") { widthdialog = "750px"; }
    rulesCondition.createDialogCondition('tab-rules-'+type+'-condition-dialog', tr("Edit") + " " +type, widthdialog , false, type);
    if (isNew!='')
      $('#tab-rules-'+type+'-condition-dialog')[0].isNew=isNew; 
    else
      $('#tab-rules-'+type+'-condition-dialog')[0].isNew=false;

    $('#tab-rules-'+type+'-condition-dialog')[0].editing=div;

    switch (type) {
      case "object":
        $('#tab-rules-object-condition-object').val(div.object_id);
        $('#tab-rules-object-condition-operation').val(div.object_operation);
        //$('#tab-rules-object-condition-values').val(div.object_value).trigger('change');
        $('#tab-rules-object-condition-values').val(div.object_value);
        $('#tab-rules-object-condition-value').val(div.object_value);
        $("#tab-rules-object-condition-object").trigger('change');
        $('#tab-rules-object-condition-values').trigger('change');
        if (div.object_trigger) $('#tab-rules-object-condition-trigger').attr('checked','1').trigger('change'); 
        else $('#tab-rules-object-condition-trigger').removeAttr('checked').trigger('change');
        break;
      case "object-src":
        $('#tab-rules-objectsrc-condition-operation').val(div.objectsrc_operation);
        $('#tab-rules-objectsrc-condition-value').val(div.objectsrc_value);
        $('#tab-rules-objectsrc-condition-src').val(div.objectsrc_src);
        if (div.objectsrc_trigger) $('#tab-rules-objectsrc-condition-trigger').attr('checked','1').trigger('change'); 
        else $('#tab-rules-objectsrc-condition-trigger').removeAttr('checked').trigger('change');
        break;
      case "object-compare":
        $('#tab-rules-objectcompare-condition-object').val(div.object_id);
        $('#tab-rules-objectcompare-condition-operation').val(div.object_operation);
        $('#tab-rules-objectcompare-condition-object2').val(div.object_id2);
        if (div.object_trigger) $('#tab-rules-objectcompare-condition-trigger').attr('checked','1').trigger('change'); 
        else $('#tab-rules-objectcompare-condition-trigger').removeAttr('checked').trigger('change');
        break;
      case "time-counter":
        $('#tab-rules-time-counter-condition-threshold').val(div.timecounter_threshold);
        $('#tab-rules-time-counter-condition-reset-delay').val(div.timecounter_resetdelay);    
        break;
      case "timer":
        // Clear input
        $('#tab-rules-timer-condition-dialog input').val('');
        $('#tab-rules-timer-condition-dialog select').val('');
    
        if (div.timer_atevery=='at')
        {
          $("#timer-condition-at").attr('checked','1');
          $("#timer-condition-at-type-" + div.timer_at_type).attr('checked','1');
          
          if (div.timer_until_time_constantvariable=='constant') 
            $("timer-condition-at-constanttime").attr('checked','1');
          else
            $("timer-condition-at-variabletime").attr('checked','1');
            
          $("#timer-condition-at-constanttime-hour").val(div.timer_at_hour);
          $("#timer-condition-at-constanttime-minute").val(div.timer_at_min);
    
          $("#timer-condition-at-variabletime-time").val(div.timer_at_timeobject);
          
          $("#timer-condition-at-constantdate-day").val(div.timer_at_day);
          $("#timer-condition-at-constantdate-month").val(div.timer_at_month);
          $("#timer-condition-at-constantdate-year").val(div.timer_at_year);
    
          $("input[id^='timer-condition-at-constantdate-dow']").removeAttr('checked');
          for(var i=0;i<div.timer_at_dow.length;i++) $("#timer-condition-at-constantdate-dow" + div.timer_at_dow[i]).attr('checked','1');
          
          $("#timer-condition-at-variabledate-date").val(div.timer_at_dateobject);
          
          $('#timer-condition-at-exception-dontcare').attr('checked','1'); 
          if (div.timer_at_exception == "yes" ) $('#timer-condition-at-exception-yes').attr('checked','1');
          if (div.timer_at_exception == "no" ) $('#timer-condition-at-exception-no').attr('checked','1');
            
          $("#timer-condition-at-offset").val(div.timer_at_offset);
          
          $("#timer-condition-at-constanttime").trigger('change');
          $("#timer-condition-at-constantdate").trigger('change');
          $("#timer-condition-at-type-other").trigger('change');
        } else {
          $("#timer-condition-every").attr('checked','1');
          $("#timer-condition-every-text").val(div.timer_every);
        }
        $("#timer-condition-at").trigger('change');
        
    
        if (div.timer_untilduring=='until')
        {
          $("#timer-condition-until").attr('checked','1');
          $("#timer-condition-until-type-" + div.timer_until_type).attr('checked','1');
          
          if (div.timer_until_time_constantvariable=='constant') 
            $("timer-condition-until-constanttime").attr('checked','1');
          else
            $("timer-condition-until-variabletime").attr('checked','1');
            
          $("#timer-condition-until-constanttime-hour").val(div.timer_until_hour);
          $("#timer-condition-until-constanttime-minute").val(div.timer_until_min);
    
          $("#timer-condition-until-variabletime-time").val(div.timer_until_timeobject);
    
          $("#timer-condition-until-constantdate-day").val(div.timer_until_day);
          $("#timer-condition-until-constantdate-month").val(div.timer_until_month);
          $("#timer-condition-until-constantdate-year").val(div.timer_until_year);
          
          $("input[id^='timer-condition-until-constantdate-dow']").removeAttr('checked');
          for(var i=0;i<div.timer_until_dow.length;i++) $("#timer-condition-until-constantdate-dow" + div.timer_until_dow[i]).attr('checked','1');
          
          $("#timer-condition-until-variabledate-date").val(div.timer_until_dateobject);
          
          $('#timer-condition-until-exception-dontcare').attr('checked','1'); 
          if (div.timer_until_exception == "yes" ) $('#timer-condition-until-exception-yes').attr('checked','1');
          if (div.timer_until_exception == "no" ) $('#timer-condition-until-exception-no').attr('checked','1');
    
          $("#timer-condition-until-offset").val(div.timer_until_offset);
          
          $("#timer-condition-until-constanttime").trigger('change');
          $("#timer-condition-until-constantdate").trigger('change');
          $("#timer-condition-until-type-other").trigger('change');
        } else if (div.timer_untilduring=='during') {
          $("#timer-condition-during").attr('checked','1');
          $("#timer-condition-during-text").val(div.timer_during);
        } else
        {
          $("#timer-condition-none").attr('checked','1');
        }
        $("#timer-condition-during").trigger('change');
    
        if (div.timer_trigger) $('#tab-rules-timer-condition-trigger').attr('checked','1').trigger('change'); else $('#tab-rules-timer-condition-trigger').removeAttr('checked').trigger('change');
        
        $('#tab-rules-timer-condition-threshold').val(div.timecounter_threshold);
        $('#tab-rules-timer-condition-reset-delay').val(div.timecounter_resetdelay);
        break;
      case "ioport-rx":
        $('#tab-rules-ioport-rx-condition-expected').val(div.ioport_expected);
        $('#tab-rules-ioport-rx-condition-ioport').val(div.ioport_ioport);
        if (div.ioport_trigger) $('#tab-rules-ioport-rx-condition-trigger').attr('checked','1').trigger('change'); 
        else $('#tab-rules-ioport-rx-condition-trigger').removeAttr('checked').trigger('change');
/* new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object="" */
        $('#tab-rules-ioport-rx-condition-object0').val(div.ioport_object0);
        $('#tab-rules-ioport-rx-condition-object1').val(div.ioport_object1);
        $('#tab-rules-ioport-rx-condition-object2').val(div.ioport_object2);
        $('#tab-rules-ioport-rx-condition-object3').val(div.ioport_object3);
        if (div.ioport_regex) $('#tab-rules-ioport-rx-condition-regex').attr('checked','1').trigger('change'); 
        else $('#tab-rules-ioport-rx-condition-regex').removeAttr('checked').trigger('change');
        if (div.ioport_hex) $('#tab-rules-ioport-rx-condition-hex').attr('checked','1').trigger('change'); 
        else $('#tab-rules-ioport-rx-condition-hex').removeAttr('checked').trigger('change');
        break;
      case "ioport-connect": /* new in Linknx 0.0.1.31 */
        $('#tab-rules-ioport-connect-condition-ioport').val(div.ioport_ioport);
        if (div.ioport_trigger) $('#tab-rules-ioport-connect-condition-trigger').attr('checked','1').trigger('change'); 
        else $('#tab-rules-ioport-connect-condition-trigger').removeAttr('checked').trigger('change');
        break;
      case "script":
        $('#tab-rules-script-condition-script').text(div.script);
        break;
    };

    if (openDialog)
      $('#tab-rules-'+type+'-condition-dialog').dialog('open');
 
  },
  // ******************** /editCondition ************************
  // ******************** saveCondition ************************
  saveCondition: function(type) {
    var div=$('#tab-rules-'+type+'-condition-dialog')[0].editing;
    
    var html = '';
    switch (type) {
      case "object":
        div.object_id=$('#tab-rules-object-condition-object').val();
        div.object_operation=$('#tab-rules-object-condition-operation').val();
        if ($('#tab-rules-object-condition-values').css('display')!='none')
          div.object_value=$('#tab-rules-object-condition-values').val();
        else
          div.object_value=$('#tab-rules-object-condition-value').val();
        div.object_trigger=$('#tab-rules-object-condition-trigger').is(':checked');
        html = '<br />' + div.object_id+'<br />'+div.object_operation+'<br />'+div.object_value;
        break;
      case "object-src": // TODO gérer : if ($("#tab-rules-objectsrc-condition-form").valid())
        div.objectsrc_operation=$('#tab-rules-objectsrc-condition-operation').val();
        div.objectsrc_value=$('#tab-rules-objectsrc-condition-value').val();
        div.objectsrc_trigger=$('#tab-rules-objectsrc-condition-trigger').is(':checked');
        div.objectsrc_src=$('#tab-rules-objectsrc-condition-src').val();
        html = '<br />Src = '+div.objectsrc_src+'<br />'+div.objectsrc_operation+'<br />'+div.objectsrc_value;
        break;
      case "object-compare":
        div.object_id=$('#tab-rules-objectcompare-condition-object').val();
        div.object_operation=$('#tab-rules-objectcompare-condition-operation').val();
        div.object_id2=$('#tab-rules-objectcompare-condition-object2').val();
        div.object_trigger=$('#tab-rules-objectcompare-condition-trigger').is(':checked');
        html = '<br />' + div.object_id+'<br />'+div.object_operation+'<br />'+div.object_id2;
        break;
      case "time-counter":   //TODO gérer : if ($("#tab-rules-time-counter-condition-form").valid())
        var div=$('#tab-rules-time-counter-condition-dialog')[0].editing;
        div.timecounter_threshold=$('#tab-rules-time-counter-condition-threshold').val();
        div.timecounter_resetdelay=$('#tab-rules-time-counter-condition-reset-delay').val();
        html = '<br />Threshold = ' + div.timecounter_threshold+'s<br />Reset-delay = '+div.timecounter_resetdelay + 's';
        break;
      case "timer": // TODO gérer : if ($("#tab-rules-timer-condition-form").valid())
        if ($('#timer-condition-at').attr('checked')) div.timer_atevery='at'; else div.timer_atevery='every';
        if ($('#timer-condition-at-type-other').attr('checked')) div.timer_at_type='other';
        else if ($('#timer-condition-at-type-sunrise').attr('checked')) div.timer_at_type='sunrise';
        else if ($('#timer-condition-at-type-sunset').attr('checked')) div.timer_at_type='sunset';
        else div.timer_at_type='noon';
          
        if ($('#timer-condition-at-constanttime').attr('checked')) 
          div.timer_at_time_constantvariable='constant'; 
        else 
          div.timer_at_time_constantvariable='variable';
  
        div.timer_at_hour=$('#timer-condition-at-constanttime-hour').val();
        div.timer_at_min=$('#timer-condition-at-constanttime-minute').val();
        div.timer_at_timeobject=$('#timer-condition-at-variabletime-time').val();
  
        if ($('#timer-condition-at-constantdate').attr('checked')) 
          div.timer_at_date_constantvariable='constant'; 
        else 
          div.timer_at_date_constantvariable='variable';
  
        div.timer_at_day=$('#timer-condition-at-constantdate-day').val();
        div.timer_at_month=$('#timer-condition-at-constantdate-month').val();
        div.timer_at_year=$('#timer-condition-at-constantdate-year').val();
  
        div.timer_at_dow='';
        for(var i=1;i<=7;i++) if ($('#timer-condition-at-constantdate-dow' + i).attr('checked')) div.timer_at_dow+=i;
  
        div.timer_at_dateobject=$('#timer-condition-at-variabledate-date').val();
  
        if ($('#timer-condition-at-exception-yes').attr('checked')) div.timer_at_exception='yes';
        else if ($('#timer-condition-at-exception-no').attr('checked')) div.timer_at_exception='no';
        else div.timer_at_exception='';
  
        div.timer_at_offset=$('#timer-condition-at-offset').val();
  
        div.timer_every=$('#timer-condition-every-text').val();
  
  
        if ($('#timer-condition-until').attr('checked')) div.timer_untilduring='until';
        else if ($('#timer-condition-during').attr('checked')) div.timer_untilduring='during';
        else div.timer_untilduring='none';
  
        if ($('#timer-condition-until-type-other').attr('checked')) div.timer_until_type='other';
        else if ($('#timer-condition-until-type-sunrise').attr('checked')) div.timer_until_type='sunrise';
        else if ($('#timer-condition-until-type-sunset').attr('checked')) div.timer_until_type='sunset';
        else div.timer_until_type='noon';
  
        if ($('#timer-condition-until-constanttime').attr('checked')) 
          div.timer_until_time_constantvariable='constant'; 
        else 
          div.timer_until_time_constantvariable='variable';
  
        div.timer_until_hour=$('#timer-condition-until-constanttime-hour').val();
        div.timer_until_min=$('#timer-condition-until-constanttime-minute').val();
        div.timer_until_timeobject=$('#timer-condition-until-variabletime-time').val();
  
        if ($('#timer-condition-until-constantdate').attr('checked')) 
          div.timer_until_date_constantvariable='constant'; 
        else 
          div.timer_until_date_constantvariable='variable';
  
        div.timer_until_day=$('#timer-condition-until-constantdate-day').val();
        div.timer_until_month=$('#timer-condition-until-constantdate-month').val();
        div.timer_until_year=$('#timer-condition-until-constantdate-year').val();
  
        div.timer_until_dow='';
        for(var i=1;i<=7;i++) if ($('#timer-condition-until-constantdate-dow' + i).attr('checked')) div.timer_until_dow+=i;
  
        div.timer_until_dateobject=$('#timer-condition-until-variabledate-date').val();
  
        if ($('#timer-condition-until-exception-yes').attr('checked')) div.timer_until_exception='yes';
        else if ($('#timer-condition-until-exception-no').attr('checked')) div.timer_until_exception='no';
        else div.timer_until_exception='';
  
        div.timer_until_offset=$('#timer-condition-until-offset').val();
  
        div.timer_during=$('#timer-condition-during-text').val();
  
        div.timer_trigger=$('#tab-rules-timer-condition-trigger').is(':checked');
        html = '';
        break;
      case "ioport-rx":
        div.ioport_expected=$('#tab-rules-ioport-rx-condition-expected').val();
        div.ioport_ioport=$('#tab-rules-ioport-rx-condition-ioport').val();
        div.ioport_trigger=$('#tab-rules-ioport-rx-condition-trigger').is(':checked');
        html = '<br />' + div.ioport_ioport +'<br />'+ div.ioport_expected;
/* new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object="" */
        div.ioport_object0=$('#tab-rules-ioport-rx-condition-object0').val();
        div.ioport_object1=$('#tab-rules-ioport-rx-condition-object1').val();
        div.ioport_object2=$('#tab-rules-ioport-rx-condition-object2').val();
        div.ioport_object3=$('#tab-rules-ioport-rx-condition-object3').val();
        div.ioport_regex=$('#tab-rules-ioport-rx-condition-regex').is(':checked');
        div.ioport_hex=$('#tab-rules-ioport-rx-condition-hex').is(':checked');
        break;
      case "ioport-connect": /* new in Linknx 0.0.1.31 */ 
        div.ioport_ioport=$('#tab-rules-ioport-connect-condition-ioport').val();
        div.ioport_trigger=$('#tab-rules-ioport-connect-condition-trigger').is(':checked');
        html = '<br />' + div.ioport_ioport;
        break;
      case "script":
        div.script=$('#tab-rules-script-condition-script').val();
        html = '';
        break;
    };

    $(div).html('<strong>'+conditionsList[type]+'</strong>'+html);
    
    return true;
  },
  
  // ******************** /saveCondition ************************
  generateNodeXMLCondition: function(condition) {
    if (condition[0].stopcondition) {
      var xml=$('<stopcondition/>');
    } else {
    var xml=$('<condition/>');
    }
    xml.attr('type',condition[0].type);
    switch (condition[0].type) {
      case 'object':
        xml.attr('id',condition[0].object_id);
        xml.attr('op',condition[0].object_operation);
        xml.attr('value',condition[0].object_value);
        if (condition[0].object_trigger) xml.attr('trigger','true');
        break;
      case 'object-src':
        xml.attr('op',condition[0].objectsrc_operation);
        xml.attr('value',condition[0].objectsrc_value);
        xml.attr('src',condition[0].objectsrc_src);
        if (condition[0].objectsrc_trigger) xml.attr('trigger','true');
        break;
      case 'object-compare':
        xml.attr('id',condition[0].object_id);
        xml.attr('op',condition[0].object_operation);
        xml.attr('id2',condition[0].object_id2);
        if (condition[0].object_trigger) xml.attr('trigger','true');
        break;
      case 'time-counter':
        xml.attr('threshold',condition[0].timecounter_threshold);
        xml.attr('reset-delay',condition[0].timecounter_resetdelay);
        break;
      case 'timer':
        if (condition[0].timer_trigger) xml.attr('trigger','true');
        
        if (condition[0].timer_atevery=='at')
        {
          var at=$('<at>');
          xml.append(at);
          
          if (condition[0].timer_at_type=='other')
          {
            if ((condition[0].timer_at_time_constantvariable=='variable')||(condition[0].timer_at_date_constantvariable=='variable')) at.attr('type','variable');
            
            if (condition[0].timer_at_time_constantvariable=='constant')
            {
              if (condition[0].timer_at_hour!='') at.attr('hour',condition[0].timer_at_hour);
              if (condition[0].timer_at_min!='') at.attr('min',condition[0].timer_at_min);
            } else at.attr('time',condition[0].timer_at_timeobject);

            if (condition[0].timer_at_date_constantvariable=='constant')
            {
              if (condition[0].timer_at_day!='') at.attr('day',condition[0].timer_at_day);
              if (condition[0].timer_at_month!='') at.attr('month',condition[0].timer_at_month);
              if (condition[0].timer_at_year!='') at.attr('year',condition[0].timer_at_year);
              if (condition[0].timer_at_dow!='') at.attr('wdays',condition[0].timer_at_dow);
            } else at.attr('date',condition[0].timer_at_dateobject);

            if (condition[0].timer_at_exception == "yes") at.attr('exception','yes');
             else if (condition[0].timer_at_exception == "no")  at.attr('exception','no');
          } else {
            at.attr('type',condition[0].timer_at_type);
            if (condition[0].timer_at_day!='') at.attr('day',condition[0].timer_at_day);
            if (condition[0].timer_at_month!='') at.attr('month',condition[0].timer_at_month);
            if (condition[0].timer_at_year!='') at.attr('year',condition[0].timer_at_year);
            if (condition[0].timer_at_dow!='') at.attr('wdays',condition[0].timer_at_dow);
            if (condition[0].timer_at_offset!='') at.attr('offset',condition[0].timer_at_offset);
          }
        } else {
          var every=$('<every>' + condition[0].timer_every + '</every>');
          xml.append(every);
        }


        if (condition[0].timer_untilduring=='until')
        {
          var until=$('<until>');
          xml.append(until);
          
          if (condition[0].timer_until_type=='other')
          {
            if ((condition[0].timer_until_time_constantvariable=='variable')||(condition[0].timer_until_date_constantvariable=='variable')) until.attr('type','variable');
            
            if (condition[0].timer_until_time_constantvariable=='constant')
            {
              if (condition[0].timer_until_hour!='') until.attr('hour',condition[0].timer_until_hour);
              if (condition[0].timer_until_min!='') until.attr('min',condition[0].timer_until_min);
            } else until.attr('time',condition[0].timer_until_timeobject);

            if (condition[0].timer_until_date_constantvariable=='constant')
            {
              if (condition[0].timer_until_day!='') until.attr('day',condition[0].timer_until_day);
              if (condition[0].timer_until_month!='') until.attr('month',condition[0].timer_until_month);
              if (condition[0].timer_until_year!='') until.attr('year',condition[0].timer_until_year);
              if (condition[0].timer_until_dow!='') until.attr('wdays',condition[0].timer_until_dow);
            } else until.attr('date',condition[0].timer_until_dateobject);

            if (condition[0].timer_until_exception == "yes" ) until.attr('exception','yes'); 
            else if (condition[0].timer_until_exception == "no" ) until.attr('exception','no');
          } else {
            until.attr('type',condition[0].timer_until_type);
            if (condition[0].timer_until_day!='') until.attr('day',condition[0].timer_until_day);
            if (condition[0].timer_until_month!='') until.attr('month',condition[0].timer_until_month);
            if (condition[0].timer_until_year!='') until.attr('year',condition[0].timer_until_year);
            if (condition[0].timer_until_dow!='') until.attr('wdays',condition[0].timer_until_dow);
            if (condition[0].timer_until_offset!='') until.attr('offset',condition[0].timer_until_offset);
          }
        } else if (condition[0].timer_untilduring=='during') {
          var during=$('<during>' + condition[0].timer_during + '</during>');
          xml.append(during);
        }

        break;
      case 'ioport-rx':
        xml.attr('ioport',condition[0].ioport_ioport);
        xml.attr('expected',condition[0].ioport_expected);
        if (condition[0].ioport_trigger) xml.attr('trigger','true');
/* new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object="" */
        xml.attr('object0',condition[0].ioport_object0);
        xml.attr('object1',condition[0].ioport_object1);
        xml.attr('object2',condition[0].ioport_object2);
        xml.attr('object3',condition[0].ioport_object3);
        if (condition[0].ioport_regex) xml.attr('regex','true');
        if (condition[0].ioport_hex) xml.attr('hex','true');
        break;
      case "ioport-connect": // <condition type="" ioport="" trigger="true" />  /* new in Linknx 0.0.1.31 */ 
        xml.attr('ioport',condition[0].ioport_ioport);
        if (condition[0].ioport_trigger) xml.attr('trigger','true');
        break;
      case 'script':
        xml.text(condition[0].script);
        break;
    }

    if (condition[0].endpoint) {
      var c = jsPlumb.getConnections({target:condition[0].endpoint[1]});
      
      for (var i in c) {
        var l = c[i];
        if (l && l.length > 0) {
          for (var j = 0; j < l.length; j++) {
            xml.append(rules.generateNodeXML($('#'+l[j].sourceId)));
          }
        } else if (l) {
          var condition2 = $('#'+l.sourceId);
          if (condition2[0].condition && l.targetId == condition.attr("id")) {
            xml.append(rules.generateNodeXML($('#'+l.sourceId)));
          }
        }
      }
    }
    return xml;
  },
  createDialogCondition: function(id, title, width, action, type) {
    if (width=='')
      width = "540px";
    if (action=='')
      action = false;
      if (action == false) {
        switch (type) {
          case "object":
            $("#tab-rules-object-condition-object").bind('change', function() {
              if (_objectTypesValues[$("#tab-rules-object-condition-object option:selected")[0].type])
              {
                values=_objectTypesValues[$("#tab-rules-object-condition-object option:selected")[0].type];
                $("#tab-rules-object-condition-values").empty();
                $(values).each(function() { $("#tab-rules-object-condition-values").append('<option value="' + this + '">' + this + '</option>'); });
                $("#tab-rules-object-condition-values").show();
                $("#tab-rules-object-condition-value").hide();
              } else
              {
                $("#tab-rules-object-condition-values").hide();
                $("#tab-rules-object-condition-value").show();
              }
            });
            break;
          case "object-src":
            $("#tab-rules-objectsrc-condition-form")[0].validator=$("#tab-rules-objectsrc-condition-form").validate();
            $("#tab-rules-objectsrc-condition-form")[0].validator.resetForm();
            break;
          case "object-compare":
            $("#tab-rules-objectcompare-condition-form")[0].validator=$("#tab-rules-objectcompare-condition-form").validate();
            $("#tab-rules-objectcompare-condition-form")[0].validator.resetForm();
            break;
          case "time-counter":
            $("#tab-rules-time-counter-condition-form")[0].validator=$("#tab-rules-time-counter-condition-form").validate();
            $("#tab-rules-time-counter-condition-form")[0].validator.resetForm();
            break;
          case "timer":
            $("#tab-rules-timer-condition-form")[0].validator=$("#tab-rules-timer-condition-form").validate();
            $("#tab-rules-timer-condition-form")[0].validator.resetForm();
            // Handle at/every radio
            $("input[name='timer-condition-atevery']").change(function() {
              if ($('#timer-condition-at').attr('checked')) 
              {
                $('input[id^="timer-condition-at-"]').removeAttr('disabled');
                $('select[id^="timer-condition-at-"]').removeAttr('disabled');
                $("#timer-condition-at-constanttime").trigger('change');
                $("#timer-condition-at-constantdate").trigger('change');
                $("#timer-condition-at-type-other").trigger('change');
                $("#timer-condition-every-text").attr('disabled','1');
              } else
              {
                $('input[id^="timer-condition-at-"]').attr('disabled','1');
                $('select[id^="timer-condition-at-"]').attr('disabled','1');
                $("#timer-condition-every-text").removeAttr('disabled');
              }
            });
            $("input[name='timer-condition-atevery']").trigger('change');
            
            // Handle "at" constant/variable time radio
            $("#timer-condition-at-constanttime,#timer-condition-at-variabletime").change(function() {
              if ($('#timer-condition-at-constanttime').attr('checked')) 
              {
                $('select[id^="timer-condition-at-variabletime-"]').attr('disabled','1');
                $('input[id^="timer-condition-at-constanttime-"]').removeAttr('disabled');
              } else
              {
                $('input[id^="timer-condition-at-constanttime-"]').attr('disabled','1');
                $('select[id^="timer-condition-at-variabletime-"]').removeAttr('disabled');
              }
            });
            $("#timer-condition-at-constanttime").trigger('change');
          
            // Handle "at" constant/variable date radio
            $("#timer-condition-at-constantdate,#timer-condition-at-variabledate").change(function() {
              if ($('#timer-condition-at-constantdate').attr('checked')) 
              {
                $('select[id^="timer-condition-at-variabledate-"]').attr('disabled','1');
                $('input[id^="timer-condition-at-constantdate-"]').removeAttr('disabled');
              } else
              {
                $('input[id^="timer-condition-at-constantdate-"]').attr('disabled','1');
                $('select[id^="timer-condition-at-variabledate-"]').removeAttr('disabled');
              }
            });
            $("#timer-condition-at-constantdate").trigger('change');
          
            // Handle other, sunrise, sunset and noon radio
            $("input[name='timer-condition-at-type']").change(function () {
              if ($('#timer-condition-at-type-other').attr('checked')) 
              {
                $("input[name='timer-condition-at-constanttime']").removeAttr('disabled');
                $("input[name='timer-condition-at-constantdate']").removeAttr('disabled');
                $('#timer-condition-at-offset').attr('disabled','1');
                $("#timer-condition-at-constanttime").trigger('change');
                $("#timer-condition-at-constantdate").trigger('change');
              } else
              {
                $("input[name='timer-condition-at-constanttime']").attr('disabled','1');
                $("input[name='timer-condition-at-constantdate']").attr('disabled','1');
                $("#timer-condition-at-constanttime-hour,#timer-condition-at-constanttime-minute,#timer-condition-at-variabledate-date").attr('disabled','1');
                $("#timer-condition-at-variabletime-time,#timer-condition-at-variabletime-date").attr('disabled','1');
                $("#timer-condition-at-constantdate-day,#timer-condition-at-constantdate-month,#timer-condition-at-constantdate-year").removeAttr('disabled');
                $("input[id^='timer-condition-at-constantdate-dow']").removeAttr('disabled');
                $('#timer-condition-at-offset').removeAttr('disabled');
              }
            });
            $("#timer-condition-at-type-other").trigger('change');
            
            // Handle until/during radio
            $("input[name='timer-condition-untilduring']").change(function() {
              if ($('#timer-condition-until').attr('checked')) 
              {
                $('input[id^="timer-condition-until-"]').removeAttr('disabled');
                $('select[id^="timer-condition-until-"]').removeAttr('disabled');
                $("#timer-condition-until-constanttime").trigger('change');
                $("#timer-condition-until-constantdate").trigger('change');
                $("#timer-condition-until-type-other").trigger('change');
                $("#timer-condition-during-text").attr('disabled','1');
              } else if ($('#timer-condition-during').attr('checked')) 
              {
                $('input[id^="timer-condition-until-"]').attr('disabled','1');
                $('select[id^="timer-condition-until-"]').attr('disabled','1');
                $("#timer-condition-during-text").removeAttr('disabled');
              } else
              {
                $("#timer-condition-during-text").attr('disabled','1');
                $('input[id^="timer-condition-until-"]').attr('disabled','1');
                $('select[id^="timer-condition-until-"]').attr('disabled','1');
              }
            });
            $("input[name='timer-condition-untilduring']").trigger('change');
          
            // Handle "until" constant/variable time radio
            $("#timer-condition-until-constanttime,#timer-condition-until-variabletime").change(function() {
              if ($('#timer-condition-until-constanttime').attr('checked')) 
              {
                $('select[id^="timer-condition-until-variabletime-"]').attr('disabled','1');
                $('input[id^="timer-condition-until-constanttime-"]').removeAttr('disabled');
              } else
              {
                $('input[id^="timer-condition-until-constanttime-"]').attr('disabled','1');
                $('select[id^="timer-condition-until-variabletime-"]').removeAttr('disabled');
              }
            });
            $("#timer-condition-until-constanttime").trigger('change');
          
            // Handle "until" constant/variable date radio
            $("#timer-condition-until-constantdate,#timer-condition-until-variabledate").change(function() {
              if ($('#timer-condition-until-constantdate').attr('checked')) 
              {
                $('select[id^="timer-condition-until-variabledate-"]').attr('disabled','1');
                $('input[id^="timer-condition-until-constantdate-"]').removeAttr('disabled');
              } else
              {
                $('input[id^="timer-condition-until-constantdate-"]').attr('disabled','1');
                $('select[id^="timer-condition-until-variabledate-"]').removeAttr('disabled');
              }
            });
            $("#timer-condition-until-constantdate").trigger('change');
          
            // Handle other, sunrise, sunset and noon radio
            $("input[name='timer-condition-until-type']").change(function () {
              if ($('#timer-condition-until-type-other').attr('checked')) 
              {
                $("input[name='timer-condition-until-constanttime']").removeAttr('disabled');
                $("input[name='timer-condition-until-constantdate']").removeAttr('disabled');
                $('#timer-condition-until-offset').attr('disabled','1');
                $("#timer-condition-until-constanttime").trigger('change');
                $("#timer-condition-until-constantdate").trigger('change');
              } else
              {
                $("input[name='timer-condition-until-constanttime']").attr('disabled','1');
                $("input[name='timer-condition-until-constantdate']").attr('disabled','1');
                $("#timer-condition-until-constanttime-hour,#timer-condition-until-constanttime-minute,#timer-condition-until-variabledate-date").attr('disabled','1');
                $("#timer-condition-until-variabletime-time,#timer-condition-until-variabletime-date").attr('disabled','1');
                $("#timer-condition-until-constantdate-day,#timer-condition-until-constantdate-month,#timer-condition-until-constantdate-year").removeAttr('disabled');
                $("input[id^='timer-condition-until-constantdate-dow']").removeAttr('disabled');
                $('#timer-condition-until-offset').removeAttr('disabled');
              }
            });
            $("#timer-condition-until-type-other").trigger('change');
            break;
          case "ioport-rx":
            $("#tab-rules-ioport-rx-condition-form")[0].validator=$("#tab-rules-ioport-rx-condition-form").validate();
            $("#tab-rules-ioport-rx-condition-form")[0].validator.resetForm();
            break;
          case "ioport-connect":                                              
            $("#tab-rules-ioport-connect-condition-form")[0].validator=$("#tab-rules-ioport-rx-condition-form").validate();
            $("#tab-rules-ioport-connect-condition-form")[0].validator.resetForm();
            break;
          case "script":
            break;
        };
    }    
    $('#'+id).dialog({
      autoOpen: false,
      buttons: [ 
          { text: tr("Cancel"), click: function() { rules.handleDialogCancel(this); } },
          { text: tr("Remove"), click: function() { rules.handleDialogDelete(this); } },
          { text: tr("Save"), click: function() { if (rules.handleDialogSave(this)) $(this).dialog("close"); } }
      ],
      resizable: false,
      title: title,
      width: width,
      closeOnEscape: false,
      modal: true
    });
  }
};
