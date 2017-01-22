var _setclock;

function CSetClock(conf) {
	$.fx.speeds._default = 1000;
	this.isResizable=false;
	this.init(conf);
	this.enable = false;
	this.reload = false;

	var g = this;

	$(".status, .icoreveil", this.div).click(function(e) {
		var enableobject = g.conf.getAttribute("enable-object");
		if (enableobject)
		{
			g.enable = !g.enable;
			EIBCommunicator.eibWrite(enableobject, (g.enable) ? "enable" : "disable");
		}
	});

	$(".hour, .minute", this.div).focus(function(e) {
		$(e.target).parent().attr("data-editMode", "true");
	});
	$(".hour, .minute", this.div).blur(function(e) {
		$(e.target).parent().attr("data-editMode", "false");
		var timestring = $(e.target).parent().children().text()+":00"
		var timeobject = g.conf.getAttribute("time-object");
		console.log("BLUR: "+timeobject+" = "+timestring);
		EIBCommunicator.eibWrite(timeobject, timestring);
	});

	this.refreshHTML();
}

CSetClock.type='setclock';
UIController.registerWidget(CSetClock);
CSetClock.prototype = new CWidget();

// Refresh HTML from config
CSetClock.prototype.refreshHTML = function() {
	$(".status", this.div).removeClass('enable');
	$(".status", this.div).removeClass('disable');
	$(".reveil", this.div).addClass(this.conf.getAttribute("class"));
	$(".reveil", this.div).attr('style',this.conf.getAttribute("style"));
	if (this.conf.getAttribute("textcolor")!="") $('.reveil', this.div).css('color', this.conf.getAttribute("textcolor")); else $('.reveil', this.div).css('color', '');
	if (this.conf.getAttribute("bgcolor")!="") $('.reveil', this.div).css('background-color', this.conf.getAttribute("bgcolor")); else $('.reveil', this.div).css('background-color', '');
	$(".icoreveil", this.div).css('background-image', 'url(' + getImageUrl(this.conf.getAttribute("icone")+'/arlamclock.png') + ')');
	$(".label", this.div).text(this.conf.getAttribute("label"));
	if (this.conf.getAttribute("enable-object")) {
		if (this.enable == true)
			$(".status", this.div).addClass('enable');
		if (this.enable == false)
			$(".status", this.div).addClass('disable');
	}
}

jQuery(document).ready(function(){
	//   $("tbody","#setclock").append("<tr class='trimpair' ><td style='width:110px;'><input id='day_7' type='checkbox'>"+_string_day[i]+"</td><td><select id='day_hour_7'>"+selecthour+"</select></td><td><select id='day_min_7'>"+selectminute+"</select></td></tr>");
});


// Called by eibcommunicator when a feedback object value has changed
CSetClock.prototype.updateObject = function(obj,value) {
	if ($(".time", this.div).attr("data-editMode") == "true")
	{
		return;
	}
	if (obj==this.conf.getAttribute("time-object"))
	{
		var atime = value.split(':');
		if ($(".hour", this.div).text() != atime[0])
			$(".hour", this.div).text(atime[0]);
		if ($(".minute", this.div).text() != atime[1])
			$(".minute", this.div).text(atime[1]);
	}
	if (obj==this.conf.getAttribute("enable-object"))
	{
		if (value == "enable") {
			this.enable = true;
		} else {
			this.enable = false;
		}
		this.refreshHTML();
	}
};
