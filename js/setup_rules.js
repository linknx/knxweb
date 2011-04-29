var inputEndpoint;
var outputEndpoint;
var rulestab;

var rules = {

	addAnd: function() {
	
	  var div=$('<div>');
	  div.addClass('and');
	  div.attr("id", ((new Date().getTime())));
	  div.html('Et');
    div[0].type="and";
	  $('#tab-rules-container').append(div);
	  
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
    div.addClass('or');
    div.attr("id", ((new Date().getTime())));
    div.html('Ou');;
    div[0].type="or";
    $('#tab-rules-container').append(div);
    
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
    div.addClass('not');
    div.attr("id", ((new Date().getTime())));
    div.html('Not');
    div[0].type="not";
    $('#tab-rules-container').append(div);
    
    div.addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));

    div.addEndpoint($.extend({ anchor:[1, 0.5, 0, 0] }, outputEndpoint));
    
    jsPlumb.draggable(div);
  
	},

	// ******************** Object ************************
	addObject: function() {

    var div=$('<div>');
    div.addClass('object');
    div.attr("id", ((new Date().getTime())));
    div[0].type="object";
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

    if (div.object_trigger==true) $('#tab-rules-object-condition-trigger').attr('checked','1'); else $('#tab-rules-object-condition-trigger').removeAttr('checked');

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
    div.addClass('objectsrc');
    div.attr("id", ((new Date().getTime())));
    div[0].type="objectsrc";
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

		$('#tab-rules-objectsrc-condition-object').val(div.objectsrc_id);
		$('#tab-rules-objectsrc-condition-operation').val(div.objectsrc_operation);
		$('#tab-rules-objectsrc-condition-values').val(div.objectsrc_value);
    $('#tab-rules-objectsrc-condition-value').dialog(div.objectsrc_value);
		$('#tab-rules-objectsrc-condition-src').val(div.objectsrc_src);

    if (div.objectsrc_trigger==true) $('#tab-rules-objectsrc-condition-trigger').attr('checked','1'); else $('#tab-rules-objectsrc-condition-trigger').removeAttr('checked');

		$("#tab-rules-objectsrc-condition-form")[0].validator.resetForm();
		$('#tab-rules-objectsrc-condition-dialog').dialog('open');
	},
	
	saveObjectSrcCondition: function() {
		if ($("#tab-rules-objectsrc-condition-form").valid())
		{
			var div=$('#tab-rules-objectsrc-condition-dialog')[0].editing;
			div.objectsrc_id=$('#tab-rules-objectsrc-condition-object').val();
			div.objectsrc_operation=$('#tab-rules-objectsrc-condition-operation').val();
			if ($('#tab-rules-objectsrc-condition-values').css('display')!='none')
				div.objectsrc_value=$('#tab-rules-objectsrc-condition-values').val();
			else
				div.objectsrc_value=$('#tab-rules-objectsrc-condition-value').val();
			if ($('#tab-rules-objectsrc-condition-trigger').attr('checked')) div.objectsrc_trigger=true; else div.objectsrc_trigger=false;
			div.objectsrc_src=$('#tab-rules-objectsrc-condition-src').val();
			
			$(div).html('<strong>ObjetSrc</strong><br />' + div.objectsrc_id+'<br />'+div.objectsrc_operation+'<br />'+div.objectsrc_value+'<br />Src = '+div.objectsrc_src);
			
			return true;
		} else return false;
	},
	// ******************** /Object Src ************************

	// ******************** Object compare ************************
	addObjectCompare: function() {

    var div=$('<div>');
    div.addClass('objectcompare');
    div.attr("id", ((new Date().getTime())));
    div[0].type="object-compare";
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
    div.addClass('timecounter');
    div.attr("id", ((new Date().getTime())));
    div[0].type="time-counter";
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
    div.addClass('timer');
    div.attr("id", ((new Date().getTime())));
    div[0].type="timer";
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

	
	generateNodeXML: function(condition) {
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
    		xml.attr('id',condition[0].objectsrc_id);
    		xml.attr('op',condition[0].objectsrc_operation);
    		xml.attr('value',condition[0].objectsrc_value);
    		xml.attr('src',condition[0].objectsrc_src);
    		if (condition[0].objectsrc_trigger) xml.attr('trigger','true');
    		break;
    	case 'object-compare':
    		xml.attr('id',condition[0].objectcompare_id);
    		xml.attr('op',condition[0].objectcompare_operation);
    		xml.attr('id2',condition[0].objectcompare_id2);
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
   
    return xml;
	},

	generateXML: function() {

    xml=this.generateNodeXML($('#action'));
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
	}

}

jQuery(document).ready(function(){

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

  var inputColor = '#00D';
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
																																							
  var outputColor = '#0A0';
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

  $('#action').addEndpoint($.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
  
	// Fill object list select
	var responseXML=queryLinknx('<read><config><objects/></config></read>');
	if (responseXML!=false)
	{
		$('object', responseXML).each(function() {
			var option=$('<option>' + this.getAttribute('id') + '</option>').attr('value',this.getAttribute('id'));
			option[0].type=this.getAttribute('type');
			$("#tab-rules-object-condition-object").append(option);
			$("#tab-rules-objectsrc-condition-object").append(option.clone());

			
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
	$('#tab-rules-object-condition-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { rules.handleDialogCancel(this); },
				"Supprimer": function() { rules.handleDialogDelete(this); },
				"Sauver": function() { if (rules.saveObjectCondition()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Editer une condition objet",
		width: "540px",
		closeOnEscape: false,
		modal: true
	});
	
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
	$('#tab-rules-objectsrc-condition-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { rules.handleDialogCancel(this); },
				"Supprimer": function() { rules.handleDialogDelete(this); },
				"Sauver": function() { if (rules.saveObjectSrcCondition()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Editer une condition objet src",
		width: "540px",
		closeOnEscape: false,
		modal: true
	});

	$("#tab-rules-objectsrc-condition-form")[0].validator=$("#tab-rules-objectsrc-condition-form").validate();

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
  
	// Object compare condition
	$('#tab-rules-objectcompare-condition-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { rules.handleDialogCancel(this); },
				"Supprimer": function() { rules.handleDialogDelete(this); },
				"Sauver": function() { if (rules.saveObjectCompareCondition()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Editer une condition de comparaison d'objets",
		width: "540px",
		closeOnEscape: false,
		modal: true
	});

	// Timecounter condition
	$('#tab-rules-timecounter-condition-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { rules.handleDialogCancel(this); },
				"Sauver": function() { if (rules.saveTimeCounterCondition()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Editer une condition time-counter",
		width: "480px",
		closeOnEscape: false,
		modal: true
	});

	$("#tab-rules-timecounter-condition-form")[0].validator=$("#tab-rules-timecounter-condition-form").validate();

	// Timer condition
	$('#tab-rules-timer-condition-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { rules.handleDialogCancel(this); },
				"Supprimer": function() { rules.handleDialogDelete(this); },
				"Sauver": function() { if (rules.saveTimerCondition()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Editer une condition timer",
		width: "750px",
		closeOnEscape: false,
		modal: true
	});

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
  
  loading.hide();
});