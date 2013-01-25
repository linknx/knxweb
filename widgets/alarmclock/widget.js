var _alarmclock;
var _string_day = Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');

function CAlarmClock(conf) {
  $.fx.speeds._default = 1000;
  this.isResizable=false;
  this.init(conf);
  this.idrule='';
  this.nextexec='';
  this.ruleactive=false;
  this.rule='';
  this.reload = false;
  
  $("#alarmclock").dialog({
      autoOpen: false,
      dialogClass: 'noTitleStuff',
      resizable: false,
      width: 'auto'
    });
  $(this.div).click(function() {
    if (!_editMode)
    {
        var pos_x = parseInt((this.owner.div.css('left')).replace('px',''));
        var pos_y = parseInt((this.owner.div.css('top')).replace('px',''));
        _alarmclock = this.owner;
        $('condition[type="timer"]', this.owner.rule).each(function() {
          $(this).children("at").each(function () {
            var wdays = this.getAttribute('wdays');
            $("#day_" + wdays).attr('checked','1');
            $("#day_hour_" + wdays).val(this.getAttribute('hour'));
            $("#day_min_" + wdays).val(this.getAttribute('min'));
          });
        });
        $(".libel", "#alarmclock").text('Alarmclock ' + this.owner.conf.getAttribute("user") + ' :');
        $( "#alarmclock" ).dialog( "option", "position", [pos_x,pos_y] );
        $( "#alarmclock" ).dialog('open');
        return false;
    }
  });
  $("#alarmclockactive").click(function() {
    var active = false; 
    if ($(this).attr('checked')) active = true;
    _alarmclock.ruleactive = active; 
    var responseXML=queryLinknx('<write><config><rules><rule id="'+_alarmclock.idrule+'" active="'+active+'" /></rules></config></write>');
    if (responseXML!=false)
    {
      messageBox(tr("Alarm active successfully"),"Active Alarm Clock","");
      _alarmclock.refreshHTML();
      return true;
    } else {
      _alarmclock.refreshHTML();
      return false;
    }
  });
  $("#dw_ok").click(function() {
    if (!$("actionlist[id=active-action]", _alarmclock.conf).get(0)) alert('error saving alarmclock');
    else {
      var xml = validRuleAlarmClock(_alarmclock.idrule, $("actionlist[id=active-action]", _alarmclock.conf).get(0).childNodes);
      queryLinknx('<write><config><rules>' + xml + '</rules></config></write>');
    }
    $("#alarmclock").dialog( "close" );
    _alarmclock.reload = true;
    _alarmclock.refreshHTML();
  });
  $("#dw_cancel").click(function() {
    $("#alarmclock").dialog( "close" );
  });
  this.refreshHTML();
}

CAlarmClock.type='alarmclock';
UIController.registerWidget(CAlarmClock);
CAlarmClock.prototype = new CWidget();

// Refresh HTML from config
CAlarmClock.prototype.refreshHTML = function() {
  var idrulesv = this.idrule;
  this.idrule=this.conf.getAttribute("idrule");
    
  $(".status", this.div).removeClass('active');
  $(".status", this.div).removeClass('notactive');
  
  if (idrulesv != this.idrule && this.idrule != '' || this.reload) {
    this.reload = false;
    loadRuleStatusAlarmClock(this.idrule, this );
  }
  if (this.nextexec) { //"2012-1-16 8:30:0"
    $(this.div).attr("title","Next execution : "+this.nextexec);
    var elem = this.nextexec.split(' ');
    var adate = elem[0].split('-');
    var ahour = elem[1].split(':');  
    $(".hour", this.div).text(ahour[0]);
    if (ahour[1] < 10) ahour[1] = "0"+ahour[1];
    $(".minute", this.div).text(ahour[1]);
    if (adate[1] < 10) adate[1]="0"+adate[1];
    var ladate=new Date(adate[0],adate[1]-1,adate[2],0,0,0); //new Date(année, mois, jour, heures, minutes, secondes[, millisecondes]) 
    $(".date", this.div).text(_string_day[ladate.getDay()]+" "+ adate[2]+"/"+adate[1]);
  }
    
  $(".reveil", this.div).addClass(this.conf.getAttribute("class"));
  $(".reveil", this.div).attr('style',this.conf.getAttribute("style"));
  if (this.conf.getAttribute("textcolor")!="") $('.reveil', this.div).css('color', this.conf.getAttribute("textcolor")); else $('.reveil', this.div).css('color', '');
  if (this.conf.getAttribute("bgcolor")!="") $('.reveil', this.div).css('background-color', this.conf.getAttribute("bgcolor")); else $('.reveil', this.div).css('background-color', '');
  $(".icoreveil", this.div).css('background-image', 'url(' + getImageUrl(this.conf.getAttribute("icone")+'/arlamclock.png') + ')');
  
}

jQuery(document).ready(function(){
  var selecthour='';
  for(var i=0;i<24;i++) {
    if (i<10) selecthour+='<option value="' + i + '">0' + i + '</option>'; 
    else selecthour+='<option value="' + i + '">' + i + '</option>';
  }
  var selectminute='';
  for(var i=0;i<60;i+=5) {
    if (i<10) selectminute+='<option value="' + i + '">0' + i + '</option>'; 
    else selectminute+='<option value="' + i + '">' + i + '</option>';
  }
  
  for(var i=1;i<7;i++) {
    $("tbody","#alarmclock").append("<tr class='trimpair' ><td><input id='day_"+i+"' type='checkbox'>"+_string_day[i]+"</td><td><select id='day_hour_"+i+"'>"+selecthour+"</select></td><td><select id='day_min_"+i+"'>"+selectminute+"</select></td></tr>");
  }
  var i = 0;
  $("tbody","#alarmclock").append("<tr class='trimpair' ><td style='width:110px;'><input id='day_7' type='checkbox'>"+_string_day[i]+"</td><td><select id='day_hour_7'>"+selecthour+"</select></td><td><select id='day_min_7'>"+selectminute+"</select></td></tr>");

});

// Called by eibcommunicator when a feedback object value has changed
CAlarmClock.prototype.updateObject = function(obj,value) {};

function loadRuleStatusAlarmClock(id, o) {
  var responseXML=queryLinknx('<read><status></status></read>');
  if (responseXML!=false)
  {
    // ex : <task type="timer" trigger="true" next-exec="2012-1-16 8:30:0" owner="alarmclock" />
    if ($('task[owner="' + id + '"]',responseXML)[0])
      o.nextexec = $('task[owner="' + id + '"]',responseXML)[0].getAttribute("next-exec");
    if ($('rule[id="' + id + '"]',responseXML)[0])
      o.ruleactive = $('rule[id="' + id + '"]',responseXML)[0].getAttribute("active");
    
    $("#alarmclockactive").removeAttr('checked');
    if (o.ruleactive != "false") {
      $("#alarmclockactive").attr('checked','1');
      $(".status", o.div).addClass('active');
    } else {
      $(".status", o.div).addClass('notactive');
    }
  } else return false;
  
  var responseXML=queryLinknx('<read><config><rules></rules></config></read>');
  if (responseXML!=false)
  {
    o.rule = $('rule[id="' + id + '"]', responseXML)[0];
  } else return false;
}
function validRuleAlarmClock(id, actions) {
  var xml = '<rule id="'+id+'">';
  
  xml+='<condition type="or" >';
  //<condition trigger="true" type="timer"><at hour="08" min="20" wdays="1"></at></condition>
  for(var i=1;i<=7;i++) if ($('#day_' + i).attr('checked')) xml+= '<condition type="timer" trigger="true"><at hour="'+$('#day_hour_' + i).val()+'" min="'+$('#day_min_' + i).val()+'" wdays="'+i+'" /></condition>';
  xml+='</condition>'; 
  
  if (actions.length>0) {
    xml+='<actionlist>';
    for(i=0; i<actions.length; i++)
    {
      var action=actions[i];
      xml+=serializeXmlToString(actions[i]);
    }
    xml+='</actionlist>';
  }
  
  xml+='</rule>';
  return xml;
}
