
var events = {
	config: null,   // liste des rules
  arrayEvents: [],
  arrayEventsTimer: [],
  xmlEvents: null, // xml status task and rules 
  currentRule: null,
  currentCondition: null,
  currentAction: null,

  eventsconditionsList: {
    //'object' : 'Object',
    'timer':'Timer'
  },

  eventsactionsList: {
    'set-value' : 'Set Value', // < type="" id="" value="" />
    'set-string' : 'Set String', // < type="" id="" value="" />
    'send-sms' : 'Send Sms', // < type="" id="" value="" var="true/false" />
    'send-email' : 'Send Email', //  <action type="" to="" subject="" var="true/false" >text<action/>
    'dim-up' : 'Dim Up', // < type="" id="" start="" stop="" duration="" />
    'shell-cmd' : 'Shell Cmd', // < type="" cmd="" var="true/false" />
    'ioport-tx' : 'Ioport Tx', // < type="" hex="true/false" data="" ioport="" var="true/false" />
    'script' : 'Script' // < type="" >script <... />
  },
  loadEventsList: function() {
  
    var responseXML=queryLinknx('<read><config><rules/></config></read>');
    this.config = '';
    if (responseXML!=false)
    {
      this.config = responseXML;
    };
  },
  loadEventsStatusList: function() {
    $('#list-events-container').empty(); // vide la liste des events

    var responseXML=queryLinknx('<read><status></status></read>');
    this.xmlEvents = '';
    if (responseXML!=false)
    {
      this.xmlEvents = responseXML;
      $('task', responseXML).each(function() {
        events.arrayEventsTimer[this.getAttribute("owner")] = this.getAttribute("next-exec"); 
      })
      
      $('rule', responseXML).each(function() {
        var rule =$('rule[id="' + this.getAttribute("id") + '"]',events.config)[0];
        var div = $("<div/>");
        var condition = $("condition", rule)[0];
        if (condition.getAttribute('type') == "timer" || !condition) {  // si la 1ère condition n'est pas de type timer soit il y a plusieurs conditions ou pas du tout de timer donc pas de type "event"
          var event = $('#templateevent').clone();
          event.attr("id", this.getAttribute("id"));
          if (this.getAttribute("active") == "false") { 
            $('.checkbox', event).removeAttr("checked"); // => mode Manuel
            $('.slidermanuelautoevent', event).removeClass('sliderauto');
      		  $('.slidermanuelautoevent', event).addClass('slidermanuel');
          } else {
            $('.checkbox', event).attr("checked","checked"); // => mode Automatique
            $('.slidermanuelautoevent', event).addClass('sliderauto');
      		  $('.slidermanuelautoevent', event).removeClass('slidermanuel');
          }
          $('.idevent', event).html(this.getAttribute("id"));
          if (events.arrayEventsTimer[this.getAttribute("id")]) {
            $(event).attr("title",convertDate(events.arrayEventsTimer[this.getAttribute("id")]));
          } 
    
          $('#list-events-container').append(event);
          event.show();
          event[0].xml=this;
          events.arrayEvents[this.getAttribute('id')]=event;
        } 
      });

    } else $('#list-events-container').append('<p>' + tr("No Events defined") + '</p>');

    $(".slidermanuelautoevent").click(function(){
      var event = $(this).parent().parent();
      var eventid = $(".idevent",event).html();
      if ($('.checkbox',this).attr('checked')) { // désactive la rule
        if (events.autoManuEvent(eventid,false)) {
          $(this).removeClass('sliderauto');
      		$(this).addClass('slidermanuel');
      		$('.checkbox',this).attr('checked', false);
        }
      } else { // active la rule
    		if (events.autoManuEvent(eventid,true)) {
          $(this).removeClass('slidermanuel');
      		$(this).addClass('sliderauto');
      		$('.checkbox',this).attr('checked', true);
        }
      }
      // mettre à jour xmlEvents qui contient l'état de chaque rules
  
  	});
  	
  	$(".commandevent .edit").click(function(){
      var event = $(this).parent().parent().parent();
      $(".ui-state-active", "#list-events-container").each(function(){
        $(this).removeClass("ui-state-active");
      });
      event.toggleClass("ui-state-active");
      events.editEvent($(".idevent",event).html());
  	});
  
  	$(".commandevent .delete").click(function(){
      var event = $(this).parent().parent().parent();
      events.deleteEvent($(".idevent",event).html());
  	});
  	
    $(".play").click(function(){
      $(this).parent().append('<div id="anim" style="background-color: red; opacity: 0.8; position: absolute; left: 10px; top: 4px; width: 32px; height: 32px;z-index: 0;vertical-align:middle;"></div>');
      $("#anim",$(this).parent()).animate({opacity: 0}, 1000, 'linear', function(){$(this).remove();} );
      events.executeAction($(".idevent",$(this).parent()).html());
    });
    
  },
  validEvent: function(event) {
    var xml = events.generateXML();
    var body = '<write><config><rules>' + serializeXmlToString(xml) + '</rules></config></write>';
    var responseXML=queryLinknx(body);
    if (responseXML!=false)
    {
      messageBox(tr("Registration event successfully "),"Save Rule","");
    }
    events.loadEventsStatusList(); // recharge la liste des events avec leur état
  },
  editEvent: function(eventid) {
    $("#tab-event-widget-properties").show();
    $("#tab-event-widget-buttons").show();
    events.currentRule=$('rule[id="' + eventid + '"]',events.config)[0]; 

    //events.currentCondition = $("condition", events.currentRule)[0];
    events.currentCondition = $('condition[type="timer"]', events.currentRule)[0]; // TODO pour les tests je prend le premier "timer" mais on ne doit avoir q'une condition timer pour les events
    
    if (events.currentCondition.getAttribute('type') == "timer" && events.currentCondition) {
      events.editCondition(events.currentCondition);
    } else {
      messageBox(tr("It's not an event, more then 1 condition or not type timer"),"Not an Event","alert");
      return false;
    }
    
    // charge la liste des actions de la rule
    events.currentAction=$('rule[id="' + eventid + '"] actionlist',events.config)[0];
     
    actionEditor.prefix = 'event-';
  	actionEditor.open(events.currentAction);
    actionEditor.prefix = '';
    events.currentAction = actionEditor.config;
    
    $('#tab-event-id').val(eventid); // Id de la rule/event
    $('#tab-event-next-exec').html(convertDate(events.arrayEventsTimer[eventid])); // Date prochaine exceution de la rule/event
    $('#tab-event-description').val(eventid);

  },
  deleteEvent: function(eventid) {
    if (confirm(tr('Really delete event : '+eventid+' ?'))) {
      var responseXML=queryLinknx('<write><config><rules><rule id="'+eventid+'" delete="true" /></rules></config></write>');
      if (responseXML!=false)
      {
        messageBox(tr("Event deleted successfully"),"Delete Event","");
        events.currentRule = null;
        events.currentCondition = null;
        events.currentAction = null;
      }
      $("#tab-event-widget-properties").hide();
      $("#tab-event-widget-buttons").hide();
		}    
    events.loadEventsStatusList(); // recharge la liste des events avec leur état 
  },
  autoManuEvent: function(eventid, active) {
    if (!active || active == "off" || active == "false" || active == "no") active = false; else active = true; 
    var responseXML=queryLinknx('<write><config><rules><rule id="'+eventid+'" active="'+active+'" /></rules></config></write>');
    if (responseXML!=false)
    {
      messageBox(tr("Event active successfully"),"Active Event","");
      return true;
    }
    return false;
  },
  generateXML: function() {
    var eventid = $('#tab-event-id').val();
    var event = $('rule[id="' + eventid + '"]',events.config)[0];
    if (event){
      events.currentCondition = $('condition',event)[0];
      events.currentAction = $('actionlist',event)[0];
    } else {
      event = events.config.ownerDocument.createElement('rule');
      events.config.appendChild(event);
      event.setAttribute('id',eventid);
      events.currentCondition = event.ownerDocument.createElement('condition');
      event.appendChild(events.currentCondition);
      if (events.currentAction) {
        events.currentAction = events.currentAction.cloneNode(true); // duplique les actions car cela pointe sur la rules édité prcédement
      } else events.currentAction = event.ownerDocument.createElement('actionlist');
      event.appendChild(events.currentAction);
    }
    var eventdescription = $('#tab-event-description').val();
    event.setAttribute('description',eventdescription); 
    
    // mise à jour du flux xml de la condition  
    events.generateXmlCondition(events.currentCondition);
    
	  return event;
	},
  // Display design XML in a window
	displayXML: function() {
	  var xml = events.generateXML();
	  $('#tab-events-fluxxml').html('<textarea rows=30 style="width:100%;">' + serializeXmlToString(xml) + "</textarea>");
	  $('#tab-events-fluxxml').dialog({ 
	  	width: 800,
			modal: true,
			buttons: {
				Close: function() {
					$( this ).dialog( "close" );
				}
			},
	  });
	},
  executeAction: function(eventid) {
    var actions = $('rule[id="' + eventid + '"] actionlist',events.config)[0];
    //actions.getElementsByTagName('action') => renvoi un tableau idem que actions.children actions.childElementCount en donne le nombre
    var actionsText = '';
    $('action', actions).each(function() {
      actionsText = actionsText + serializeXmlToString(this);
		});
    if (confirm(tr('Really execute actions of the event : '+eventid+' ?'))) {
      var responseXML=queryLinknx('<execute>'+actionsText+'</execute>');
      if (responseXML!=false)
      {
        messageBox(tr("Event execute successfully"),"Execute Event","");
      }
		} 
  },
  
  editCondition: function(condition) {// edit condition alimenter formulaire avec le flux xml condition
    // Clear input
    $('#tab-events-event-timer-dialog input').val('');
    $('#tab-events-event-timer-dialog select').val('');
  
    $("#event-timer-at").attr('checked','1');
    $("#event-timer-at-type-other").attr('checked','checked');
    $("#event-timer-at-constanttime").attr('checked','1');
    $("#event-timer-at-constantdate").attr('checked','1');
    $("input[id^='event-timer-at-constantdate-dow']").removeAttr('checked');
    $('#event-timer-at-exception-dontcare').attr('checked','1');
  
  
    if (condition.getAttribute('trigger') == "true" ) $('#tab-events-event-timer-trigger').attr('checked','1'); 
    else $('#tab-events-event-timer-trigger').removeAttr('checked');
    
    $('#tab-events-event-timer-trigger').trigger('change');
    
    $(condition).children("at").each(function () {
      $("#event-timer-at").attr('checked','1');
      if (this.getAttribute('type')) $("#event-timer-at-type-" + this.getAttribute('type')).attr('checked','1');
  
      if (!this.getAttribute('time')) 
        $("#event-timer-at-constanttime").attr('checked','1'); 
      else 
        $("#event-timer-at-variabletime").attr('checked','1'); 
      $("#event-timer-at-constanttime-hour").val(this.getAttribute('hour'));
      $("#event-timer-at-constanttime-minute").val(this.getAttribute('min'));
  
      $("#event-timer-at-constantdate-day").val(this.getAttribute('day'));
      $("#event-timer-at-constantdate-month").val(this.getAttribute('month'));
      $("#event-timer-at-constantdate-year").val(this.getAttribute('year'));
      $("#event-timer-at-variabletime-time").val(this.getAttribute('time'));
   
      if (!this.getAttribute('date')) 
        $("#event-timer-at-constantdate").attr('checked','1');
      else 
        $("#event-timer-at-variabledate").attr('checked','1');
      var timer_at_dow = '1234567';
      if (this.getAttribute('wdays'))
        timer_at_dow=this.getAttribute('wdays');
      for(var i=0;i<timer_at_dow.length;i++) $("#event-timer-at-constantdate-dow" + timer_at_dow[i]).attr('checked','1');
  
      $("#event-timer-at-variabledate-date").val(this.getAttribute('date'));
  
      if (this.getAttribute('exception')) {
        if (this.getAttribute('exception') == 'yes')
          $('#event-timer-at-exception-yes').attr('checked','1');
        else
          $('#event-timer-at-exception-no').attr('checked','1');
      }
      $("#event-timer-at-offset").val(this.getAttribute('offset'));
  
      $("#event-timer-at-constanttime").trigger('change');
      $("#event-timer-at-constantdate").trigger('change');
      $("#event-timer-at-type-other").trigger('change');
  
    });
    $(condition).children("every").each(function () {
      $("#event-timer-every").attr('checked','1');
      $("#event-timer-every-text").val(this.textContent);
    }); 
  
    $("#event-timer-at").trigger('change');
  
    $("#event-timer-none").attr('checked','1');
    $("#event-timer-until-type-other").attr('checked','1');
    $("#event-timer-until-constanttime").attr('checked','1');
    $("#event-timer-until-constantdate").attr('checked','1');
    $("input[id^='event-timer-until-constantdate-dow']").removeAttr('checked');
    $('#event-timer-until-exception-dontcare').attr('checked','1');
  
    $(condition).children("until").each(function () {
      $("#event-timer-until").attr('checked','1');
      if (this.getAttribute('type')) $("#event-timer-until-type-" + this.getAttribute('type')).attr('checked','1');
      if (!this.getAttribute('time')) 
        $("#event-timer-until-constanttime").attr('checked','1');
      else 
        $("#event-timer-until-variabletime").attr('checked','1'); 
      $("#event-timer-until-constantdate-hour").val(this.getAttribute('hour'));
      $("#event-timer-until-constantdate-min").val(this.getAttribute('min'));
      $("#event-timer-until-constantdate-day").val(this.getAttribute('day'));
      $("#event-timer-until-constantdate-month").val(this.getAttribute('month'));
      $("#event-timer-until-constantdate-year").val(this.getAttribute('year'));
      $("#event-timer-until-variabletime-time").val(this.getAttribute('time'));
      if (!this.getAttribute('date')) 
        $("#event-timer-until-constantdate").attr('checked','1');
      else 
        $("#event-timer-until-variabledate").attr('checked','1');
      var timer_until_dow='1234567';
      if (this.getAttribute('wdays'))
        timer_until_dow=this.getAttribute('wdays');
      for(var i=0;i<timer_until_dow.length;i++) $("#event-timer-until-constantdate-dow" + timer_until_dow[i]).attr('checked','1');
        
  
      $("#event-timer-until-variabledate-date").val(this.getAttribute('date'));
   
      if (this.getAttribute('exception') == "yes" ) $('#event-timer-until-exception-yes').attr('checked','1');
      if (this.getAttribute('exception') == "no" ) $('#event-timer-until-exception-no').attr('checked','1');
      $("#event-timer-until-offset").val(this.getAttribute('offset'));
  
      $("#event-timer-until-constanttime").trigger('change');
      $("#event-timer-until-constantdate").trigger('change');
      $("#event-timer-until-type-other").trigger('change');
  
    });
    $(condition).children("during").each(function () {
      $("#event-timer-during").attr('checked','1');
      $("#event-timer-during-text").val(this.textContent);
    });
  
    $("#event-timer-during").trigger('change');
  
    $("#tab-events-event-timer-form")[0].validator.resetForm();
  },
  
  generateXmlCondition: function(xml) {

    if (xml.childElementCount>0) { // on supprime les données xml de la condition pour les recréer
      var m = xml.children;
      for (i=0; i<m.length; i++)
        xml.removeChild(m.item(i)); 
    }
    xml.textcontent = ''; 

    // TODO gérer l'attribut active="no" ... ??

    xml.setAttribute('type', "timer");
    xml.removeAttribute('trigger');
    if ($('#tab-events-event-timer-trigger').attr('checked')!='') xml.setAttribute('trigger','true');
    
    /***************** atevery *******************************/
    
    if ($('#event-timer-at').attr('checked'))
    {
      var at = xml.ownerDocument.createElement('at');
      xml.appendChild(at);
      
      if ($('#event-timer-at-type-other').attr('checked'))
      {
        if (!($('#event-timer-at-constanttime').attr('checked')) || !($('#event-timer-at-constantdate').attr('checked'))) at.setAttribute('type','variable');
        
        if ($('#event-timer-at-constanttime').attr('checked'))
        {
          if ($('#event-timer-at-constanttime-hour').val()!='') at.setAttribute('hour',$('#event-timer-at-constanttime-hour').val());
          if ($('#event-timer-at-constanttime-minute').val()!='') at.setAttribute('min',$('#event-timer-at-constanttime-minute').val());
        } else at.setAttribute('time',$('#event-timer-at-variabletime-time').val());
    
        if ($('#event-timer-at-constantdate').attr('checked'))
        {
          if ($('#event-timer-at-constantdate-day').val()!='') at.setAttribute('day',$('#event-timer-at-constantdate-day').val());
          if ($('#event-timer-at-constantdate-month').val()!='') at.setAttribute('month',$('#event-timer-at-constantdate-month').val());
          if ($('#event-timer-at-constantdate-year').val()!='') at.setAttribute('year',$('#event-timer-at-constantdate-year').val());
          var timer_at_dow='';
          for(var i=1;i<=7;i++) if ($('#event-timer-at-constantdate-dow' + i).attr('checked')) timer_at_dow+=i;
          if (timer_at_dow!='') at.setAttribute('wdays',timer_at_dow);
        } else at.setAttribute('date',$('#event-timer-at-variabledate-date').val());
    
        if ($('#event-timer-at-exception-yes').attr('checked')) at.setAttribute('exception','yes');
         else if ($('#event-timer-at-exception-no').attr('checked'))  at.setAttribute('exception','no');
    
      } else {
        if ($('#event-timer-at-type-sunrise').attr('checked')) at.setAttribute('type','sunrise');
        else if ($('#event-timer-at-type-sunset').attr('checked')) at.setAttribute('type','sunset');
        else at.setAttribute('type','noon');
    
        if ($('#event-timer-at-constantdate-day').val()!='') at.setAttribute('day',$('#event-timer-at-constantdate-day').val());
        if ($('#event-timer-at-constantdate-month').val()!='') at.setAttribute('month',$('#event-timer-at-constantdate-month').val());
        if ($('#event-timer-at-constantdate-year').val()!='') at.setAttribute('year',$('#event-timer-at-constantdate-year').val());
        var timer_at_dow='';
        for(var i=1;i<=7;i++) if ($('#event-timer-at-constantdate-dow' + i).attr('checked')) timer_at_dow+=i;
        if (timer_at_dow!='') at.setAttribute('wdays',timer_at_dow);
        if ($('#event-timer-at-offset').val()!='') at.setAttribute('offset',$('#event-timer-at-offset').val());
      } 
    }  else {
      var every = xml.ownerDocument.createElement('every');
      every.textContent = $('#event-timer-every-text').val();
      xml.appendChild(every); 
    } 
    /***************** /atevery *******************************/
    
    /***************** untilduring *******************************/
    
    if ($('#event-timer-until').attr('checked'))
    {
      var until = xml.ownerDocument.createElement('until');
      xml.appendChild(until);
      
      if ($('#event-timer-until-type-other').attr('checked'))
      {
        if (!($('#event-timer-until-constanttime').attr('checked')) || !($('#event-timer-until-constantdate').attr('checked'))) until.setAttribute('type','variable');
        
        if ($('#event-timer-until-constanttime').attr('checked'))
        {
          if ($('#event-timer-until-constanttime-hour').val()!='') until.setAttribute('hour',$('#event-timer-until-constanttime-hour').val());
          if ($('#event-timer-until-constanttime-minute').val()!='') until.setAttribute('min',$('#event-timer-until-constanttime-minute').val());
        } else until.setAttribute('time',$('#event-timer-until-variabletime-time').val());
    
        if ($('#event-timer-until-constantdate').attr('checked'))
        {
          if ($('#event-timer-until-constantdate-day').val()!='') until.setAttribute('day',$('#event-timer-until-constantdate-day').val());
          if ($('#event-timer-until-constantdate-month').val()!='') until.setAttribute('month',$('#event-timer-until-constantdate-month').val());
          if ($('#event-timer-until-constantdate-year').val()!='') until.setAttribute('year',$('#event-timer-until-constantdate-year').val());
          
          var timer_until_dow='';
          for(var i=1;i<=7;i++) if ($('#event-timer-until-constantdate-dow' + i).attr('checked')) timer_until_dow+=i;
          if (timer_until_dow!='') until.setAttribute('wdays',timer_until_dow);
    
        } else until.setAttribute('date',$('#event-timer-until-variabledate-date').val());
    
        if ($('#event-timer-until-exception-yes').attr('checked') ) until.setAttribute('exception','yes'); 
        else if ($('#event-timer-until-exception-no').attr('checked') ) until.setAttribute('exception','no');
    
      } else {
        if ($('#event-timer-until-type-sunrise').attr('checked')) until.setAttribute('type','sunrise');
        else if ($('#event-timer-until-type-sunset').attr('checked')) until.setAttribute('type','sunset');
        else until.setAttribute('type','noon');
    
        if ($('#event-timer-until-constantdate-day').val()!='') until.setAttribute('day',$('#event-timer-until-constantdate-day').val());
        if ($('#event-timer-until-constantdate-month').val()!='') until.setAttribute('month',$('#event-timer-until-constantdate-month').val());
        if ($('#event-timer-until-constantdate-year').val()!='') until.setAttribute('year',$('#event-timer-until-constantdate-year').val());
        
        var timer_until_dow='';
        for(var i=1;i<=7;i++) if ($('#event-timer-until-constantdate-dow' + i).attr('checked')) timer_until_dow+=i;
        if (timer_until_dow!='') until.setAttribute('wdays',timer_until_dow);
        if ($('#event-timer-until-offset').val()!='') until.setAttribute('offset',$('#event-timer-until-offset').val());
      }
    } else if ($('#event-timer-during').attr('checked')) {
      var during = xml.ownerDocument.createElement('during');
      during.textContent = $('#event-timer-during-text').val();
      xml.appendChild(during);
    }
    
    /***************** /untilduring *******************************/
    return xml;
  }  
  
};


function initConditionTimer()
{
  $("#tab-events-event-timer-form")[0].validator=$("#tab-events-event-timer-form").validate();
  $("#tab-events-event-timer-form")[0].validator.resetForm();
  // Handle at/every radio
  $("input[name='timer-condition-atevery']").change(function() {
    if ($('#event-timer-at').attr('checked')) 
    {
      $('input[id^="event-timer-at-"]').removeAttr('disabled');
      $('select[id^="event-timer-at-"]').removeAttr('disabled');
      $("#event-timer-at-constanttime").trigger('change');
      $("#event-timer-at-constantdate").trigger('change');
      $("#event-timer-at-type-other").trigger('change');
      $('#event-timer-every-text').attr('disabled','1');
    } else
    {
      $('input[id^="event-timer-at-"]').attr('disabled','1');
      $('select[id^="event-timer-at-"]').attr('disabled','1');
      $('#event-timer-every-text').removeAttr('disabled');
    }
  });
  $("input[name='event-timer-atevery']").trigger('change');
  
  // Handle "at" constant/variable time radio
  $("#event-timer-at-constanttime,#event-timer-at-variabletime").change(function() {
    if ($('#event-timer-at-constanttime').attr('checked')) 
    {
      $('select[id^="event-timer-at-variabletime-"]').attr('disabled','1');
      $('input[id^="event-timer-at-constanttime-"]').removeAttr('disabled');
    } else
    {
      $('input[id^="event-timer-at-constanttime-"]').attr('disabled','1');
      $('select[id^="event-timer-at-variabletime-"]').removeAttr('disabled');
    }
  });
  $("#event-timer-at-constanttime").trigger('change');

  // Handle "at" constant/variable date radio
  $("#event-timer-at-constantdate,#event-timer-at-variabledate").change(function() {
    if ($('#event-timer-at-constantdate').attr('checked')) 
    {
      $('select[id^="event-timer-at-variabledate-"]').attr('disabled','1');
      $('input[id^="event-timer-at-constantdate-"]').removeAttr('disabled');
    } else
    {
      $('input[id^="event-timer-at-constantdate-"]').attr('disabled','1');
      $('select[id^="event-timer-at-variabledate-"]').removeAttr('disabled');
    }
  });
  $("#event-timer-at-constantdate").trigger('change');

  // Handle other, sunrise, sunset and noon radio
  $("input[name='event-timer-at-type']").change(function () {
    if ($('#event-timer-at-type-other').attr('checked')) 
    {
      $("input[name='event-timer-at-constanttime']").removeAttr('disabled');
      $("input[name='event-timer-at-constantdate']").removeAttr('disabled');
      $('#event-timer-at-offset').attr('disabled','1');
      $("#event-timer-at-constanttime").trigger('change');
      $("#event-timer-at-constantdate").trigger('change');
    } else
    {
      $("input[name='event-timer-at-constanttime']").attr('disabled','1');
      $("input[name='event-timer-at-constantdate']").attr('disabled','1');
      $("#event-timer-at-constanttime-hour,#event-timer-at-constanttime-minute,#event-timer-at-variabledate-date").attr('disabled','1');
      $("#event-timer-at-variabletime-time,#event-timer-at-variabletime-date").attr('disabled','1');
      $("#event-timer-at-constantdate-day,#event-timer-at-constantdate-month,#event-timer-at-constantdate-year").removeAttr('disabled');
      $("input[id^='event-timer-at-constantdate-dow']").removeAttr('disabled');
      $('#event-timer-at-offset').removeAttr('disabled');
    }
  });
  $("#event-timer-at-type-other").trigger('change');
  
  // Handle until/during radio
  $("input[name='event-timer-untilduring']").change(function() {
    if ($('#event-timer-until').attr('checked')) 
    {
      $('input[id^="event-timer-until-"]').removeAttr('disabled');
      $('select[id^="event-timer-until-"]').removeAttr('disabled');
      $("#event-timer-until-constanttime").trigger('change');
      $("#event-timer-until-constantdate").trigger('change');
      $("#event-timer-until-type-other").trigger('change');
      $("#event-timer-during-text").attr('disabled','1');
    } else if ($('#event-timer-during').attr('checked')) 
    {
      $('input[id^="event-timer-until-"]').attr('disabled','1');
      $('select[id^="event-timer-until-"]').attr('disabled','1');
      $("#event-timer-during-text").removeAttr('disabled');
    } else
    {
      $("#event-timer-during-text").attr('disabled','1');
      $('input[id^="event-timer-until-"]').attr('disabled','1');
      $('select[id^="event-timer-until-"]').attr('disabled','1');
    }
  });
  $("input[name='event-timer-untilduring']").trigger('change');

  // Handle "until" constant/variable time radio
  $("#event-timer-until-constanttime,#event-timer-until-variabletime").change(function() {
    if ($('#event-timer-until-constanttime').attr('checked')) 
    {
      $('select[id^="event-timer-until-variabletime-"]').attr('disabled','1');
      $('input[id^="event-timer-until-constanttime-"]').removeAttr('disabled');
    } else
    {
      $('input[id^="event-timer-until-constanttime-"]').attr('disabled','1');
      $('select[id^="event-timer-until-variabletime-"]').removeAttr('disabled');
    }
  });
  $("#event-timer-until-constanttime").trigger('change');

  // Handle "until" constant/variable date radio
  $("#event-timer-until-constantdate,#event-timer-until-variabledate").change(function() {
    if ($('#event-timer-until-constantdate').attr('checked')) 
    {
      $('select[id^="event-timer-until-variabledate-"]').attr('disabled','1');
      $('input[id^="event-timer-until-constantdate-"]').removeAttr('disabled');
    } else
    {
      $('input[id^="event-timer-until-constantdate-"]').attr('disabled','1');
      $('select[id^="event-timer-until-variabledate-"]').removeAttr('disabled');
    }
  });
  $("#event-timer-until-constantdate").trigger('change');

  // Handle other, sunrise, sunset and noon radio
  $("input[name='event-timer-until-type']").change(function () {
    if ($('#event-timer-until-type-other').attr('checked')) 
    {
      $("input[name='event-timer-until-constanttime']").removeAttr('disabled');
      $("input[name='event-timer-until-constantdate']").removeAttr('disabled');
      $('#event-timer-until-offset').attr('disabled','1');
      $("#event-timer-until-constanttime").trigger('change');
      $("#event-timer-until-constantdate").trigger('change');
    } else
    {
      $("input[name='event-timer-until-constanttime']").attr('disabled','1');
      $("input[name='event-timer-until-constantdate']").attr('disabled','1');
      $("#event-timer-until-constanttime-hour,#event-timer-until-constanttime-minute,#event-timer-until-variabledate-date").attr('disabled','1');
      $("#event-timer-until-variabletime-time,#event-timer-until-variabletime-date").attr('disabled','1');
      $("#event-timer-until-constantdate-day,#event-timer-until-constantdate-month,#event-timer-until-constantdate-year").removeAttr('disabled');
      $("input[id^='event-timer-until-constantdate-dow']").removeAttr('disabled');
      $('#event-timer-until-offset').removeAttr('disabled');
    }
  });
  $("#event-timer-until-type-other").trigger('change');

}


function convertDate(dateToConvert) 
{
  if (!dateToConvert) return '';
  var elem = dateToConvert.split(' ');
  var jour = elem[0].split('-');
  var heure = elem[1].split(':');
  return tr("Next-execution : the ")+jour[2]+"/"+jour[1]+"/"+jour[0]+tr(" at ")+elem[1];
}


jQuery(document).ready(function(){
  actionEditor.config = $('<actionlist><action/></actionlist>')[0]; 
  var actionsSelect=$('#event-action-dialog-select').get(0);
  actionsSelect.options[actionsSelect.options.length] = new Option(tr("Add an action"), "");
  for(key in events.eventsactionsList) actionsSelect.options[actionsSelect.options.length] = new Option(events.eventsactionsList[key], key);
  
  $('#event-action-dialog-select').change(function(e){
  	if (this.value!="")
  	{
      if (!events.currentAction) {
				events.currentAction = events.config.createElement("actionlist");
      }
	    var type = this.value;
	    actionEditor.config = events.currentAction;
      actionEditor.prefix = 'event-';
	    actionEditor.edit(actionEditor.new(type).get(0), true);
      actionEditor.prefix = '';
      events.currentAction = actionEditor.config;
	    this.value = "";
		}
  });
  
  var eventstab=$("#tab-events-event-timer-tabs").tabs();
  eventstab.tabs('select', '#tab-events-event-timer-start');
  initConditionTimer();
    
  $( "input:button","#tab-events").button();
    
  $("#tab-event-widget-buttons button").button();
  $("#tab-events-event-timer-dialog").show();
    
  events.loadEventsList();
  events.loadEventsStatusList();


  // Fill object list select
  var responseXML=queryLinknx('<read><config><objects/></config></read>');

  if (responseXML!=false)
  {
    
    $('object', responseXML).each(function() {
      //var option=$('<option>' + this.getAttribute('id') + ' ('+this.getAttribute('type')+') </option>').attr('value',this.getAttribute('id'));
      var option=$('<option>' + this.getAttribute('id') + '</option>').attr('value',this.getAttribute('id'));
      option[0].type=this.getAttribute('type');
      //$("#tab-events-object-condition-object").append(option);
            
      if (this.getAttribute('type')=='10.001') {
        $("#event-timer-at-variabletime-time").append(option.clone());
        $("#event-timer-until-variabletime-time").append(option.clone());
      }
      if (this.getAttribute('type')=='11.001') {
        $("#event-timer-at-variabledate-date").append(option.clone());
        $("#event-timer-until-variabledate-date").append(option.clone());
      }

    });
  }
  
  loading.hide();
});
