var inputEndpoint;
var outputEndpoint;
var rulestab;
var pos_top;
var pos_right;
var xmlRules;


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
    'script':'Script'
};

var actionsList = {
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
    'cancel' : 'Cancel'
}

var rules = {

	addAnd: function() {
	
	  var div=$('<div>');
	  div.addClass('condition');
	  div.addClass('and');
	  div.attr("id", ((new Date().getTime())));
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
	  
	  div.addEndpoint($.extend({ anchor:[0, 0, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.1, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.2, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.3, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.4, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.6, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.7, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.8, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 0.9, 0, 0] }, inputEndpoint));
	  div.addEndpoint($.extend({ anchor:[0, 1, 0, 0] }, inputEndpoint));
	
	  div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
	  
	  jsPlumb.draggable(div);                                                               
	},

	addOr:function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('or');
    div.attr("id", ((new Date().getTime())));
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
    
    div.addEndpoint($.extend({ anchor:[0, 0, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.1, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.2, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.3, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.4, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.6, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.7, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.8, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 0.9, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[0, 1, 0, 0] }, inputEndpoint));

    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    jsPlumb.draggable(div);
	},

	addNot: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('not');
    div.attr("id", ((new Date().getTime())));
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
    
    div.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));

    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    jsPlumb.draggable(div);
  
	},

	// ******************** Object ************************
	addObject: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('object');
    div.attr("id", ((new Date().getTime())));
    div[0].type="object";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editObjectCondition(this);
    });
    
    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    div[0].object_id='';
    div[0].object_operation='eq';
    div[0].object_value='';
    div[0].object_trigger=false;
    jsPlumb.draggable(div);
		
		this.editObjectCondition(div[0],true);
	},
	
	editObjectCondition: function(div, isNew) {

		if (isNew!='')
			$('#tab-rules-object-condition-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-object-condition-dialog')[0].isNew=false;

		$('#tab-rules-object-condition-dialog')[0].editing=div;

		$('#tab-rules-object-condition-object').val(div.object_id);
		$('#tab-rules-object-condition-operation').val(div.object_operation);
		$('#tab-rules-object-condition-values').val(div.object_value);
    $('#tab-rules-object-condition-value').dialog(div.object_value);

    if (div.object_trigger==true) $('#tab-rules-object-condition-trigger').attr('checked','1'); 
    else $('#tab-rules-object-condition-trigger').removeAttr('checked');

		$('#tab-rules-object-condition-dialog').dialog('open');
	},
	
	saveObjectCondition: function() {
		var div=$('#tab-rules-object-condition-dialog')[0].editing;
		div.object_id=$('#tab-rules-object-condition-object').val();
		div.object_operation=$('#tab-rules-object-condition-operation').val();
		if ($('#tab-rules-object-condition-values').css('display')!='none')
			div.object_value=$('#tab-rules-object-condition-values').val();
		else
			div.object_value=$('#tab-rules-object-condition-value').val();
		if ($('#tab-rules-object-condition-trigger').attr('checked')) div.object_trigger=true; else div.object_trigger=false;
		
		$(div).html('<strong>Objet</strong><br />' + div.object_id+'<br />'+div.object_operation+'<br />'+div.object_value);
		
		return true;
	},
	// ******************** /Object ************************
	
	// ******************** Object Src ************************
	addObjectSrc: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('objectsrc');
    div.attr("id", ((new Date().getTime())));
    div[0].type="objectsrc";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editObjectSrcCondition(this);
    });
    
    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    div[0].objectsrc_id='';
    div[0].objectsrc_operation='eq';
    div[0].objectsrc_value='';
    div[0].objectsrc_trigger=false;
    div[0].objectsrc_src='';
    jsPlumb.draggable(div);
		
		this.editObjectSrcCondition(div[0],true);
	},
	
	editObjectSrcCondition: function(div, isNew) {

		if (isNew!='')
			$('#tab-rules-objectsrc-condition-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-objectsrc-condition-dialog')[0].isNew=false;


		$('#tab-rules-objectsrc-condition-dialog')[0].editing=div;

		//$('#tab-rules-objectsrc-condition-object').val(div.objectsrc_id);
		$('#tab-rules-objectsrc-condition-operation').val(div.objectsrc_operation);
		//$('#tab-rules-objectsrc-condition-values').val(div.objectsrc_value);
    $('#tab-rules-objectsrc-condition-value').dialog(div.objectsrc_value);
		$('#tab-rules-objectsrc-condition-src').val(div.objectsrc_src);

    if (div.objectsrc_trigger==true) $('#tab-rules-objectsrc-condition-trigger').attr('checked','1'); 
    else $('#tab-rules-objectsrc-condition-trigger').removeAttr('checked');

		$("#tab-rules-objectsrc-condition-form")[0].validator.resetForm();
		$('#tab-rules-objectsrc-condition-dialog').dialog('open');
	},
	
	saveObjectSrcCondition: function() {
		if ($("#tab-rules-objectsrc-condition-form").valid())
		{
			var div=$('#tab-rules-objectsrc-condition-dialog')[0].editing;
			//div.objectsrc_id=$('#tab-rules-objectsrc-condition-object').val();
			div.objectsrc_operation=$('#tab-rules-objectsrc-condition-operation').val();
			//if ($('#tab-rules-objectsrc-condition-values').css('display')!='none')
				//div.objectsrc_value=$('#tab-rules-objectsrc-condition-values').val();
			//else
				div.objectsrc_value=$('#tab-rules-objectsrc-condition-value').val();
			if ($('#tab-rules-objectsrc-condition-trigger').attr('checked')) div.objectsrc_trigger=true; else div.objectsrc_trigger=false;
			div.objectsrc_src=$('#tab-rules-objectsrc-condition-src').val();
			
			//$(div).html('<strong>ObjetSrc</strong><br />' + div.objectsrc_id+'<br />'+div.objectsrc_operation+'<br />'+div.objectsrc_value+'<br />Src = '+div.objectsrc_src);
			$(div).html('<strong>ObjetSrc</strong><br />Src = '+div.objectsrc_src+'<br />'+div.objectsrc_operation+'<br />'+div.objectsrc_value);
			
			return true;
		} else return false;
	},
	// ******************** /Object Src ************************

	// ******************** Object compare ************************
	addObjectCompare: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('objectcompare');
    div.attr("id", ((new Date().getTime())));
    div[0].type="objectcompare";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editObjectCompareCondition(this);
    });
    
    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    div[0].object_id='';
    div[0].object_operation='eq';
    div[0].object_id2='';
    jsPlumb.draggable(div);
		
		this.editObjectCompareCondition(div[0],true);
	},
	
	editObjectCompareCondition: function(div, isNew) {

		if (isNew!='')
			$('#tab-rules-objectcompare-condition-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-objectcompare-condition-dialog')[0].isNew=false;

		$('#tab-rules-objectcompare-condition-dialog')[0].editing=div;

		$('#tab-rules-objectcompare-condition-object').val(div.object_id);
		$('#tab-rules-objectcompare-condition-operation').val(div.object_operation);
		$('#tab-rules-objectcompare-condition-object2').val(div.object_id2);

		$('#tab-rules-objectcompare-condition-dialog').dialog('open');
	},
	
	saveObjectCompareCondition: function() {
		var div=$('#tab-rules-objectcompare-condition-dialog')[0].editing;
		div.object_id=$('#tab-rules-objectcompare-condition-object').val();
		div.object_operation=$('#tab-rules-objectcompare-condition-operation').val();
		div.object_id2=$('#tab-rules-objectcompare-condition-object2').val();
		
		$(div).html('<strong>Objet Compare</strong><br />' + div.object_id+'<br />'+div.object_operation+'<br />'+div.object_id2);
		
		return true;
	},
	// ******************** /Object compare ************************

	// ******************** Timecounter ************************
	addTimeCounter: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('timecounter');
    div.attr("id", ((new Date().getTime())));
    div[0].type="time-counter";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editTimeCounterCondition(this);
    });
    
    div.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    div[0].timecounter_threshold='';
    div[0].timecounter_resetdelay='';
    jsPlumb.draggable(div);
		
		this.editTimeCounterCondition(div[0], true);
	},
	
	editTimeCounterCondition: function(div, isNew) {

		if (isNew!='')
			$('#tab-rules-timecounter-condition-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-timecounter-condition-dialog')[0].isNew=false;

		$('#tab-rules-timecounter-condition-dialog')[0].editing=div;

		$('#tab-rules-timecounter-condition-threshold').val(div.timecounter_threshold);
		$('#tab-rules-timecounter-condition-reset-delay').val(div.timecounter_resetdelay);

		$("#tab-rules-timecounter-condition-form")[0].validator.resetForm();
		$('#tab-rules-timecounter-condition-dialog').dialog('open');
	},
	
	saveTimeCounterCondition: function() {
		if ($("#tab-rules-timecounter-condition-form").valid())
		{
			var div=$('#tab-rules-timecounter-condition-dialog')[0].editing;
			div.timecounter_threshold=$('#tab-rules-timecounter-condition-threshold').val();
			div.timecounter_resetdelay=$('#tab-rules-timecounter-condition-reset-delay').val();
			
			$(div).html('<strong>TimeCounter</strong><br />Threshold = ' + div.timecounter_threshold+'s<br />Reset-delay = '+div.timecounter_resetdelay + 's');
			
			return true;
		} else return false;
	},
	// ******************** /Timecounter ************************

	// ******************** Timer ************************
	addTimer: function() {

    var div=$('<div>');
    div.addClass('condition');
    div.addClass('timer');
    div.attr("id", ((new Date().getTime())));
    div[0].type="timer";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editTimerCondition(this);
    });
    
    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
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
    div[0].timer_at_exception=false;
    div[0].timer_at_offset='0';
    div[0].timer_every_hour='0';
    div[0].timer_every_min='0';

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
    div[0].timer_until_exception=false;
    div[0].timer_until_offset='0';
    div[0].timer_during_hour='0';
    div[0].timer_during_min='0';
    
    div[0].timer_trigger=false;
    
	  rulestab.tabs('select', '#tab-rules-timer-condition-start');

    jsPlumb.draggable(div);
		
		this.editTimerCondition(div[0], true);
	},
	
	editTimerCondition: function(div, isNew) {
		
		if (isNew!='')
			$('#tab-rules-timer-condition-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-timer-condition-dialog')[0].isNew=false;
		
		$('#tab-rules-timer-condition-dialog')[0].editing=div;
		
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
			
			if (div.timer_at_exception) $('#timer-condition-at-exception').attr('checked','1'); else $('#timer-condition-at-exception').removeAttr('checked');
				
			$("#timer-condition-at-offset").val(div.timer_at_offset);
			
			$("#timer-condition-at-constanttime").trigger('change');
			$("#timer-condition-at-constantdate").trigger('change');
			$("#timer-condition-at-type-other").trigger('change');
		} else {
			$("#timer-condition-every").attr('checked','1');
			$("#timer-condition-every-hour").val(div.timer_every_hour);
			$("#timer-condition-every-minute").val(div.timer_every_min);
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
			
			if (div.timer_until_exception) $('#timer-condition-until-exception').attr('checked','1'); else $('#timer-condition-until-exception').removeAttr('checked');

			$("#timer-condition-until-offset").val(div.timer_until_offset);
			
			$("#timer-condition-until-constanttime").trigger('change');
			$("#timer-condition-until-constantdate").trigger('change');
			$("#timer-condition-until-type-other").trigger('change');
		} else if (div.timer_untilduring=='during') {
			$("#timer-condition-during").attr('checked','1');
			$("#timer-condition-during-hour").val(div.timer_during_hour);
			$("#timer-condition-during-minute").val(div.timer_during_min);
		} else
		{
			$("#timer-condition-none").attr('checked','1');
		}
		$("#timer-condition-during").trigger('change');

		if (div.timer_trigger) $('#tab-rules-timer-condition-trigger').attr('checked','1'); else $('#tab-rules-timer-condition-trigger').removeAttr('checked');
		
		$('#tab-rules-timer-condition-threshold').val(div.timecounter_threshold);
		$('#tab-rules-timer-condition-reset-delay').val(div.timecounter_resetdelay);

		$("#tab-rules-timer-condition-form")[0].validator.resetForm();
		$('#tab-rules-timer-condition-dialog').dialog('open');
	},
	
	saveTimerCondition: function() {
		if ($("#tab-rules-timer-condition-form").valid())
		{
			var div=$('#tab-rules-timer-condition-dialog')[0].editing;

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

			div.timer_at_exception=($('#timer-condition-at-exception').attr('checked')!='');

			div.timer_at_offset=$('#timer-condition-at-offset').val();

		  div.timer_every_hour=$('#timer-condition-every-hour').val();
		  div.timer_every_min=$('#timer-condition-every-minute').val();


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

			div.timer_until_exception=($('#timer-condition-until-exception').attr('checked')!='');

			div.timer_until_offset=$('#timer-condition-until-offset').val();

		  div.timer_during_hour=$('#timer-condition-during-hour').val();
		  div.timer_during_min=$('#timer-condition-during-minute').val();

			div.timer_trigger=($('#tab-rules-timer-condition-trigger').attr('checked')!='');
	  
			$(div).html('<strong>Timer</strong>');
			
			return true;
		} else return false;
	},
	// ******************** /Timer ************************

  // ******************** Script ************************
	addScript: function() {
    var div=$('<div>');
    div.addClass('condition');
    div.addClass('script');
    div.attr("id", ((new Date().getTime())));
    div[0].type="script";
    div[0].condition=true;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editScriptCondition(this);
    });
    
    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    div[0].script='';
    jsPlumb.draggable(div);
		
		this.editScriptCondition(div[0],true);
	},
	
	editScriptCondition: function(div, isNew) {

		if (isNew!='')
			$('#tab-rules-script-condition-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-script-condition-dialog')[0].isNew=false;

		$('#tab-rules-script-condition-dialog')[0].editing=div;

		$('#tab-rules-script-condition-script').text(div.script);
		
		$('#tab-rules-script-condition-dialog').dialog('open');
	},
	
	saveScriptCondition: function() {
		var div=$('#tab-rules-script-condition-dialog')[0].editing;
		div.script=$('#tab-rules-script-condition-script').val();
		
		$(div).html('<strong>Script</strong>');
		
		return true;
	},
	// ******************** /Script ************************
	
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
    'cancel' : 'Cancel'
*/
  addAction: function(type) {
    var div=$('<div>');
    div.addClass('action');
    div.addClass(type);
    div.attr("id", ((new Date().getTime())));
    div[0].type=type;
    div[0].condition=false;
    $('#tab-rules-container').append(div);
    
    div.dblclick(function () {
    	rules.editAction(this.type, this);
    });
    
    div.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));

    //div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    //div[0].script='';
    // TODO données en fonction du "type" ...
    
    switch (type) {
    	case 'set-value' :
    		break;
    	case 'copy-value' :
    		break;
    	case 'toggle-value' :
    		break;
    	case 'set-string' :
    		break;
    	case 'send-read-request' :
    		break;
    	case 'cycle-on-off' :
    		break;
    	case 'repeat' :
    		break;
    	case 'conditional' :
    		break;
    	case 'send-sms' :
    		break;
    	case 'send-email' :
    		break;
    	case 'dim-up' :
    		break;
    	case 'shell-cmd' :
    	  div.cmd='';
    	  div.css("width","140px");
    		break;
    	case 'ioport-tx' :
    		break;
    	case 'script' :
    	  //html = '<br />'+$('#tab-rules-script-action-script').val();
    	  div.script='';
    		break;
    	case 'cancel' :
    	  //html = '<br />'+$('#tab-rules-cancel-action-value').val();
    	  div.cancel_rule='';
    	  div.css("width","140px");
    		break;
    }; 

		//div.html('<strong>'+type+'</strong>');    
    
    jsPlumb.draggable(div);
		
		this.editAction(type, div[0],true);
	},
	
	editAction: function(type, div, isNew) {
    if (!document.getElementById('tab-rules-'+type+'-action-dialog')) {
	    rules.createDialog('tab-rules-'+type+'-action-dialog', "Editer "+type, "540px" , true, type);
	  }
    if (isNew!='')
			$('#tab-rules-'+type+'-action-dialog')[0].isNew=isNew; 
		else
			$('#tab-rules-'+type+'-action-dialog')[0].isNew=false;

		$('#tab-rules-'+type+'-action-dialog')[0].editing=div;

		//$('#tab-rules-'+type+'-action-script').text(div.script);
		// TODO données en fonction du "type" ...
    switch (type) {
    	case 'set-value' :
    		break;
    	case 'copy-value' :
    		break;
    	case 'toggle-value' :
    		break;
    	case 'set-string' :
    		break;
    	case 'send-read-request' :
    		break;
    	case 'cycle-on-off' :
    		break;
    	case 'repeat' :
    		break;
    	case 'conditional' :
    		break;
    	case 'send-sms' :
    		break;
    	case 'send-email' :
    		break;
    	case 'dim-up' :
    		break;
    	case 'shell-cmd' :
    	  $('#tab-rules-shell-cmd-action-value').val(div.cmd);
    		break;
    	case 'ioport-tx' :
    		break;
    	case 'script' :
    	  $('#tab-rules-script-action-value').val(div.script);
    		break;
    	case 'cancel' :
    	  $('#tab-rules-cancel-action-value').val(div.cancel_rule);
    		break;
    }; 
		
		$('#tab-rules-'+type+'-action-dialog').dialog('open');
 
	},
	
	saveAction: function(type) {
	  var div=$('#tab-rules-'+type+'-action-dialog')[0].editing;
		//div.script=$('#tab-rules-'+type+'-action-script').text();

    var html = '';
    switch (type) {
    	case 'set-value' :
    		break;
    	case 'copy-value' :
    		break;
    	case 'toggle-value' :
    		break;
    	case 'set-string' :
    		break;
    	case 'send-read-request' :
    		break;
    	case 'cycle-on-off' :
    		break;
    	case 'repeat' :
    		break;
    	case 'conditional' :
    		break;
    	case 'send-sms' :
    		break;
    	case 'send-email' :
    		break;
    	case 'dim-up' :
    		break;
    	case 'shell-cmd' :
    	  div.cmd = $('#tab-rules-shell-cmd-action-value').val();
    	  html = '<br />'+div.cmd;
    		break;
    	case 'ioport-tx' :
    		break;
    	case 'script' :
    	  div.script = $('#tab-rules-script-action-value').val();
    	  html = '';
    		break;
    	case 'cancel' :
    	  div.cancel_rule = $('#tab-rules-cancel-action-value').val();
        html = '<br />'+div.cancel_rule;
        //var width = div.cancel_rule.lenght + 2;
        //$(div).css("width",width+"em"); 
    		break;
    };

		$(div).html('<strong>'+type+'</strong>'+html);
		
		return true;
	},
	// ******************** /Action ************************


	
	generateNodeXML: function(condition) {
   if(condition[0].condition) {
    var xml=$('<condition>');
    xml.attr('type',condition[0].type);
    switch (condition[0].type) {
    	case 'object':
    		xml.attr('id',condition[0].object_id);
    		xml.attr('op',condition[0].object_operation);
    		xml.attr('value',condition[0].object_value);
    		if (condition[0].object_trigger) xml.attr('trigger','true');
    		break;
    	case 'objectsrc':
    		//xml.attr('id',condition[0].objectsrc_id);
    		xml.attr('op',condition[0].objectsrc_operation);
    		xml.attr('value',condition[0].objectsrc_value);
    		xml.attr('src',condition[0].objectsrc_src);
    		if (condition[0].objectsrc_trigger) xml.attr('trigger','true');
    		break;
    	case 'objectcompare':
    		xml.attr('id',condition[0].objectcompare_id);
    		xml.attr('op',condition[0].objectcompare_operation);
    		xml.attr('id2',condition[0].objectcompare_id2);
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
						
						if (condition[0].timer_at_time_constantvariable='constant')
						{
							if (condition[0].timer_at_hour!='') at.attr('hour',condition[0].timer_at_hour);
							if (condition[0].timer_at_min!='') at.attr('min',condition[0].timer_at_min);
						} else at.attr('time',condition[0].timer_at_timeobject);

						if (condition[0].timer_at_date_constantvariable='constant')
						{
							if (condition[0].timer_at_day!='') at.attr('day',condition[0].timer_at_day);
							if (condition[0].timer_at_month!='') at.attr('month',condition[0].timer_at_month);
							if (condition[0].timer_at_year!='') at.attr('year',condition[0].timer_at_year);
							if (condition[0].timer_at_dow!='') at.attr('wdays',condition[0].timer_at_dow);
						} else at.attr('date',condition[0].timer_at_dateobject);

						if (condition[0].timer_at_exception) at.attr('exception','yes'); else at.attr('exception','no');
					} else {
						at.attr('type',condition[0].timer_at_type);
						if (condition[0].timer_at_day!='') at.attr('day',condition[0].timer_at_day);
						if (condition[0].timer_at_month!='') at.attr('month',condition[0].timer_at_month);
						if (condition[0].timer_at_year!='') at.attr('year',condition[0].timer_at_year);
						if (condition[0].timer_at_dow!='') at.attr('wdays',condition[0].timer_at_dow);
						if (condition[0].timer_at_offset!='') at.attr('offset',condition[0].timer_at_offset);
					}
				} else {
					var every=$('<every>');
					xml.append(every);
					every.attr('hour',condition[0].timer_every_hour);
					every.attr('min',condition[0].timer_every_min);
				}


    		if (condition[0].timer_untilduring=='until')
    		{
					var until=$('<until>');
					xml.append(until);
					
					if (condition[0].timer_until_type=='other')
					{
						if ((condition[0].timer_until_time_constantvariable=='variable')||(condition[0].timer_until_date_constantvariable=='variable')) until.attr('type','variable');
						
						if (condition[0].timer_until_time_constantvariable='constant')
						{
							if (condition[0].timer_until_hour!='') until.attr('hour',condition[0].timer_until_hour);
							if (condition[0].timer_until_min!='') until.attr('min',condition[0].timer_until_min);
						} else until.attr('time',condition[0].timer_until_timeobject);

						if (condition[0].timer_until_date_constantvariable='constant')
						{
							if (condition[0].timer_until_day!='') until.attr('day',condition[0].timer_until_day);
							if (condition[0].timer_until_month!='') until.attr('month',condition[0].timer_until_month);
							if (condition[0].timer_until_year!='') until.attr('year',condition[0].timer_until_year);
							if (condition[0].timer_until_dow!='') until.attr('wdays',condition[0].timer_until_dow);
						} else until.attr('date',condition[0].timer_until_dateobject);

						if (condition[0].timer_until_exception) until.attr('exception','yes'); else until.attr('exception','no');
					} else {
						until.attr('type',condition[0].timer_until_type);
						if (condition[0].timer_until_day!='') until.attr('day',condition[0].timer_until_day);
						if (condition[0].timer_until_month!='') until.attr('month',condition[0].timer_until_month);
						if (condition[0].timer_until_year!='') until.attr('year',condition[0].timer_until_year);
						if (condition[0].timer_until_dow!='') until.attr('wdays',condition[0].timer_until_dow);
						if (condition[0].timer_until_offset!='') until.attr('offset',condition[0].timer_until_offset);
					}
				} else if (condition[0].timer_untilduring=='during') {
					var during=$('<during>');
					xml.append(during);
					during.attr('hour',condition[0].timer_during_hour);
					during.attr('min',condition[0].timer_during_min);
				}

    		break;
    	case 'ioport-rx':
    		xml.attr('id',condition[0].ioport_id);
    		xml.attr('value',condition[0].ioport_value);
    		//TODO a finir ...
    		break;
    	case 'script':
        xml.text(condition[0].script);
    		break;
    }
    var c = jsPlumb.getConnections({target:condition.attr('id')});
    
    for (var i in c) {
			var l = c[i];
			if (l && l.length > 0) {
		    for (var j = 0; j < l.length; j++) {
					xml.append(this.generateNodeXML($('#'+l[j].sourceId)));
		    }
			}
    }
    
    } else {
      var xml=$('<action>');
      xml.attr('type',condition[0].type);
      switch (condition[0].type) {
      	case 'script':
      		/*
          xml.attr('id',condition[0].object_id);
      		xml.attr('op',condition[0].object_operation);
      		xml.attr('value',condition[0].object_value);
      		if (condition[0].object_trigger) xml.attr('trigger','true');
          */
      		xml.text(condition[0].script);
      		break;
      }
      var c = jsPlumb.getConnections({source:condition.attr('id')});
      for (var i in c) {
  			var l = c[i];
  			if (l && l.length > 0) {
  		    for (var j = 0; j < l.length; j++) {
  					xml.append(this.generateNodeXML($('#'+l[j].targetId)));
  		    }
  			}
      }
    } 

   
    return xml;
	},

	generateXML: function() {

    xml=this.generateNodeXML($('#actionlist')); // récupère les conditions ratachhées à "actionlist"
    
    xmlactionlist = $('<actionlist type="on-true" >');
    //var c = jsPlumb.getConnections({source:'actionlist'});
    //var c = jsPlumb.getConnections({sourceEndpoint:'ontrue1'});
    //var c = jsPlumb.getConnections({sourceEndpoint:["ontrue1", "ontrue2", "ontrue3", "ontrue4", "ontrue5", "ontrue6", "ontrue7", "ontrue8", "ontrue9", "ontrue10"]});
    var c = jsPlumb.getConnections({source:'actionlistOnTrue'});
    //var c = jsPlumb.getConnections({scope:'actionlist'});
    for (var i in c) {
			var l = c[i];
			if (l && l.length > 0) {
		    for (var j = 0; j < l.length; j++) {
		      //alert("1"+l[j].sourceEndpoint.scope+"1"+l[j].targetId+"1"+l[j].sourceEndpoint.scope+"1"+l[j].sourceEndpoint.connector+"1"+l[j].sourceEndpoint.anchor+"1"+l[j].sourceEndpoint.anchor.uuid);
					xmlactionlist.append(this.generateNodeXML($('#'+l[j].targetId)));
		    }
			}
		}
    xml.append(xmlactionlist);
    
    xmlactionlist = $('<actionlist type="on-false" >');
    //var c = jsPlumb.getConnections({sourceEndpoint:["onfalse1", "onfalse2", "onfalse3", "onfalse4", "onfalse5", "onfalse6", "onfalse7", "onfalse8", "onfalse9", "onfalse10"]});
    var c = jsPlumb.getConnections({source:'actionlistOnFalse'});
    for (var i in c) {
			var l = c[i];
			if (l && l.length > 0) {
		    for (var j = 0; j < l.length; j++) {
					//alert("2"+l[j].sourceId+"2"+l[j].targetId);
          xmlactionlist.append(this.generateNodeXML($('#'+l[j].targetId)));
		    }
			}
		}
    xml.append(xmlactionlist);
    
    $("#tab-rules-property").text(xml.html()).html();
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
		//jsPlumb.removeAllEndpoints(dialog.editing);
		//$(dialog.editing).remove();
		
		var type = dialog.editing.type;
		if (dialog.editing.condition) {
  		switch (type) {
        case "object":
        rules.saveObjectCondition();
        break;
        case "objectsrc":
        rules.saveObjectSrcCondition();
        break;
        case "objectcompare":
        rules.saveObjectCompareCondition();
        break;
        case "time-counter":
        rules.saveTimeCounterCondition();
        break;
        case "timer":
        rules.saveTimerCondition();
        break;
        /*case "and":
        break;
        case "or":
        break;
        case "not":
        break;*/
        case "ioport-rx":
        alert("a implémenter ...");
        break;
        case "script":
        rules.saveScriptCondition();
        break;
      };
    } else {
      // TODO implémenter save+id+Action ?
      rules.saveAction(type);
    }
		$(dialog).dialog("close"); 
	},
	
	createDialog: function(id, title, width, action, type) {
	  // rules.createDialog("tab-rules-script-condition-dialog", "Editer un script", "540px" , false)
	  // rules.createDialog("tab-rules-script-action-dialog", "Editer un script", "540px" , true, "script")
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
        		break;
        	case 'copy-value' :
        		break;
        	case 'toggle-value' :
        		break;
        	case 'set-string' :
        		break;
        	case 'send-read-request' :
        		break;
        	case 'cycle-on-off' :
        		break;
        	case 'repeat' :
        		break;
        	case 'conditional' :
        		break;
        	case 'send-sms' :
        		break;
        	case 'send-email' :
        		break;
        	case 'dim-up' :
        		break;
        	case 'shell-cmd' :
        	  tbody.append(
              $('<tr>').append('<th width="150">Command Shell</th>')
              .append($('<td>').append('<input type="text" id="tab-rules-shell-cmd-action-value" size="50">'))
              );
        		break;
        	case 'ioport-tx' :
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
        };
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
}

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
    });
  } else $('#listRules').append('<option value="">' + tr("Aucune règle définie") + '</option>');
}

jQuery(document).ready(function(){
  
  //$("button","#tab-rules").each(function(){$(this).button();});
  $("#button-add-object").button();
  $("#button-add-objectsrc").button();
  $("#button-add-objectcompare").button();
  $("#button-add-timecounter").button();
  $("#button-add-timer").button();
  $("#button-add-and").button();
  $("#button-add-or").button();
  $("#button-add-not").button();

  $('#addcondition').append('<option value="">' + tr("Ajouter une condition") + '</option>');
  
  var conditionsSelect=$('#addcondition').get(0);
	for(key in conditionsList) conditionsSelect.options[conditionsSelect.options.length] = new Option(conditionsList[key], key);

  $('#addcondition').change(function(){
    var type = this.value;
    switch (type) {
      case "object":
      rules.addObject()
      break;
      case "objectsrc":
      rules.addObjectSrc()
      break;
      case "objectcompare":
      rules.addObjectCompare()
      break;
      case "time-counter":
      rules.addTimeCounter()
      break;
      case "timer":
      rules.addTimer()
      break;
      case "and":
      rules.addAnd()
      break;
      case "or":
      rules.addOr()
      break;
      case "not":
      rules.addNot()
      break;
      case "ioport-rx":
      alert("a implémenter ...");
      break;
      case "script":
      rules.addScript();
      break;
    };
    this.value = "";
  });
  
  $('#addaction').append('<option value="todo">Todo ...</option>'); // TODO à supprimer quand les actions seront gérées ...
  $('#addaction').append('<option value="">' + tr("Ajouter une action") + '</option>');
  var actionsSelect=$('#addaction').get(0);
  for(key in actionsList) actionsSelect.options[actionsSelect.options.length] = new Option(actionsList[key], key);
  
  $('#addaction').change(function(){
    var type = this.value;
    rules.addAction(type);
    this.value = "";
  });

  loadRulesList();

	// Move property DOM to left column
	var property = $('#tab-rules-property').clone();
	property.show();
	$('#tab-rules-property').remove();
	$('#propertiesContainer').append(property);

	$("#propertiesContainer div").hide();
	$("#propertiesContainer div:first").show();
	property.show();
	$("#propertiesContainer").show();

  jsPlumb.Defaults.DragOptions = { cursor: 'pointer', zIndex:2000 };
  jsPlumb.Defaults.PaintStyle = { strokeStyle:'#666' };
  jsPlumb.Defaults.EndpointStyle = { width:20, height:16, strokeStyle:'#666' };
  jsPlumb.Defaults.Endpoint = new jsPlumb.Endpoints.Rectangle();
  jsPlumb.Defaults.Anchors = ["TopCenter", "TopCenter"];
  
  jsPlumb.Defaults.Container = 'tab-rules-container';

  jsPlumb.addListener(["jsPlumbConnection","jsPlumbConnectionDetached"], {
    jsPlumbConnection : function(p) {
			rules.generateXML();
    },
    jsPlumbConnectionDetached : function(p) {
			rules.generateXML();
    }
  });
  
  var myDropOptions = {
		tolerance:'touch',
		hoverClass:'dropHover',
		activeClass:'dragActive'
  };

  var inputColor = '#00D'; // bleu
  inputEndpoint = {
		endpoint:new jsPlumb.Endpoints.Rectangle(),
		style:{ width:10, height:10, fillStyle:inputColor },
		isSource:false,
		isTarget:true,
		scope:'connection',
		connectorStyle : {
		    lineWidth:3,
		    strokeStyle:'#000'
		},
		dropOptions : myDropOptions
  };
																																							
  var outputColor = '#0A0'; // vert
  outputEndpoint = {
		endpoint:new jsPlumb.Endpoints.Rectangle(),
		style:{ width:10, height:10, fillStyle:outputColor },
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
  
  var outputEndpointFalse = {
		endpoint:new jsPlumb.Endpoints.Rectangle(),
		style:{ width:10, height:10, fillStyle: '#D00' }, //couleur rouge
		isSource:true,
		isTarget:false,
		scope:'connection',
		connectorStyle : {
		    lineWidth:3,
		    strokeStyle:'#000'
		},
		dropOptions : myDropOptions
  };
  
    var actionlist =$('<div>');
	  actionlist.addClass('actionlist');
	  actionlist.addClass('action');
    actionlist.attr("id", "actionlist");
    actionlist.css("height", "240px").css("width", "70px");
    actionlist.html('Actionlist');
	  
    actionlist[0].type="actionlist";
    actionlist[0].condition=true;
	  $('#tab-rules-container').append(actionlist);

  $('#actionlist').css("top",pos_top-$('#actionlist').height()/2);
  $('#actionlist').css("right",pos_right-$('#actionlist').width()/2);

    actionlist.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
	  /*
	  actionlist.addEndpoint($.extend({ anchor:[1, 0, 0, 0] , uuid: "ontrue1" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.05, 0, 0] , uuid: "ontrue2" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.1, 0, 0] , uuid: "ontrue3" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.15, 0, 0] , uuid: "ontrue4" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.2, 0, 0] , uuid: "ontrue5" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.25, 0, 0] , uuid: "ontrue6" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.3, 0, 0] , uuid: "ontrue7" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.35, 0, 0] , uuid: "ontrue8" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.4, 0, 0] , uuid: "ontrue9" , scope:'ontrue'}, outputEndpoint));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.45, 0, 0] , uuid: "ontrue10" , scope:'ontrue'}, outputEndpoint));
	  */
	  //actionlist.append('<span style="position: absolute; top: 25%; text-align: center; right: 10px;">On-True</span>');
	  var actionlistontrue =$('<div>');
	  //actionlistontrue.addClass('actionlist');
    actionlistontrue.attr("id", "actionlistOnTrue");
    actionlistontrue.css("height", "120px").css("width", "70px").css("top", "0px").css("position", "absolute");
    //actionlistontrue.html('On-true');
    actionlistontrue.append('<span style="position: absolute; top: 50%; text-align: center; right: 10px;">On-True</span>');
	  
    actionlistontrue[0].type="actionlist";
    actionlistontrue[0].condition=true;
	  
    actionlist.append(actionlistontrue);
    actionlistontrue.draggable({ disabled: true });
	  
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0, 0, 0] , uuid: "ontrue1" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.1, 0, 0] , uuid: "ontrue2" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.2, 0, 0] , uuid: "ontrue3" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.3, 0, 0] , uuid: "ontrue4" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.4, 0, 0] , uuid: "ontrue5" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] , uuid: "ontrue6" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.6, 0, 0] , uuid: "ontrue7" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.7, 0, 0] , uuid: "ontrue8" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.8, 0, 0] , uuid: "ontrue9" , scope:'ontrue'}, outputEndpoint));
	  actionlistontrue.addEndpoint($.extend({ anchor:[1, 0.9, 0, 0] , uuid: "ontrue10" , scope:'ontrue'}, outputEndpoint));
	  jsPlumb.draggable("actionlistOnTrue", false);
	  
	  //actionlist.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpointFalse));
	  /*
    actionlist.addEndpoint($.extend({ anchor:[1, 0.55, 0, 0] , uuid: "onfalse1" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.6, 0, 0] , uuid: "onfalse2" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.65, 0, 0] , uuid: "onfalse3" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.7, 0, 0] , uuid: "onfalse4" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.75, 0, 0] , uuid: "onfalse5" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.8, 0, 0] , uuid: "onfalse6" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.85, 0, 0] , uuid: "onfalse7" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.9, 0, 0] , uuid: "onfalse8" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 0.95, 0, 0] , uuid: "onfalse9" , scope:'onfalse'}, outputEndpointFalse));
	  actionlist.addEndpoint($.extend({ anchor:[1, 1, 0, 0] , uuid: "onfalse10" , scope:'onfalse'}, outputEndpointFalse));
    */
    
    //actionlist.append('<span style="position: absolute; top: 75%; text-align: center; right: 10px;">On-False</span>');
  
    var actionlistonfalse =$('<div>');
	  //actionlistontrue.addClass('actionlist');
    actionlistonfalse.attr("id", "actionlistOnFalse");
    actionlistonfalse.css("height", "120px").css("width", "70px").css("top", "120px").css("position", "absolute");
    //actionlistontrue.html('On-true');
    actionlistonfalse.append('<span style="position: absolute; top: 50%; text-align: center; right: 10px;">On-False</span>');
	  
    actionlistonfalse[0].type="actionlist";
    actionlistonfalse[0].condition=true;
	  
    actionlist.append(actionlistonfalse);
    actionlistonfalse.draggable({ disabled: true });
    actionlist.draggable({ disabled: true });
	  
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.1, 0, 0] , uuid: "onfalse1" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.2, 0, 0] , uuid: "onfalse2" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.3, 0, 0] , uuid: "onfalse3" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.4, 0, 0] , uuid: "onfalse4" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] , uuid: "onfalse5" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.6, 0, 0] , uuid: "onfalse6" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.7, 0, 0] , uuid: "onfalse7" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.8, 0, 0] , uuid: "onfalse8" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 0.9, 0, 0] , uuid: "onfalse9" , scope:'onfalse'}, outputEndpointFalse));
	  actionlistonfalse.addEndpoint($.extend({ anchor:[1, 1, 0, 0] , uuid: "onfalse10" , scope:'onfalse'}, outputEndpointFalse));
	  jsPlumb.draggable("actionlistOnFalse", false);
  
  
  
    jsPlumb.draggable("actionlist", false);

	// Fill object list select
	var responseXML=queryLinknx('<read><config><objects/></config></read>');
	if (responseXML!=false)
	{
		$('object', responseXML).each(function() {
			var option=$('<option>' + this.getAttribute('id') + '</option>').attr('value',this.getAttribute('id'));
			option[0].type=this.getAttribute('type');
			$("#tab-rules-object-condition-object").append(option);
			//$("#tab-rules-objectsrc-condition-object").append(option.clone());

			
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
			
		});
	}
	
	// Object condition
	rules.createDialog("tab-rules-object-condition-dialog", "Editer une condition objet", "540px" );
	
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
	$("#tab-rules-object-condition-object").trigger('change');
	
	// Objectsrc condition
	rules.createDialog("tab-rules-objectsrc-condition-dialog", "Editer une condition objet src", "540px" );

	$("#tab-rules-objectsrc-condition-form")[0].validator=$("#tab-rules-objectsrc-condition-form").validate();
  /*
	$("#tab-rules-objectsrc-condition-object").bind('change', function() {
		if (_objectTypesValues[$("#tab-rules-objectsrc-condition-object option:selected")[0].type])
		{
			values=_objectTypesValues[$("#tab-rules-objectsrc-condition-object option:selected")[0].type];
			$("#tab-rules-objectsrc-condition-values").empty();
			$(values).each(function() { $("#tab-rules-objectsrc-condition-values").append('<option value="' + this + '">' + this + '</option>'); });
			$("#tab-rules-objectsrc-condition-values").show();
			$("#tab-rules-objectsrc-condition-value").hide();
		} else
		{
			$("#tab-rules-objectsrc-condition-values").hide();
			$("#tab-rules-objectsrc-condition-value").show();
		}
	});
	$("#tab-rules-objectsrc-condition-object").trigger('change');
	*/
  
	// Object compare condition
	rules.createDialog("tab-rules-objectcompare-condition-dialog", "Editer une condition de comparaison d'objets", "540px" );

	// Timecounter condition
	rules.createDialog("tab-rules-timecounter-condition-dialog", "Editer une condition time-counter", "480px" );

	$("#tab-rules-timecounter-condition-form")[0].validator=$("#tab-rules-timecounter-condition-form").validate();

	// Timer condition
	rules.createDialog("tab-rules-timer-condition-dialog", "Editer une condition timer", "750px" );

	$("#tab-rules-timer-condition-form")[0].validator=$("#tab-rules-timer-condition-form").validate();
	
	rulestab=$("#tab-rules-timer-condition-tabs").tabs();
	
	// Handle at/every radio
	$("input[name='timer-condition-atevery']").change(function() {
		if ($('#timer-condition-at').attr('checked')) 
		{
			$('input[id^="timer-condition-at-"]').removeAttr('disabled');
			$('select[id^="timer-condition-at-"]').removeAttr('disabled');
			$("#timer-condition-at-constanttime").trigger('change');
			$("#timer-condition-at-constantdate").trigger('change');
			$("#timer-condition-at-type-other").trigger('change');
			$('input[id^="timer-condition-every-"]').attr('disabled','1');
		} else
		{
			$('input[id^="timer-condition-at-"]').attr('disabled','1');
			$('select[id^="timer-condition-at-"]').attr('disabled','1');
			$('input[id^="timer-condition-every-"]').removeAttr('disabled');
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
			$('input[id^="timer-condition-during-"]').attr('disabled','1');
		} else if ($('#timer-condition-during').attr('checked')) 
		{
			$('input[id^="timer-condition-until-"]').attr('disabled','1');
			$('select[id^="timer-condition-until-"]').attr('disabled','1');
			$('input[id^="timer-condition-during-"]').removeAttr('disabled');
		} else
		{
			$('input[id^="timer-condition-during-"]').attr('disabled','1');
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
  
  // Script condition
  rules.createDialog("tab-rules-script-condition-dialog", "Editer un script", "540px" );
  
  loading.hide();
});