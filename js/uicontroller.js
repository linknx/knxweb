// UIController
var UIController = {
	widgetList: new Array(),

	registerWidget: function(widget) {
		this.widgetList[widget.type]=widget;
	},
	setNotification: function(text)	{
		if (_visuMobile) {
		  alert(text);
		}else {
      $('#notificationZone').text(text).show();
  		runAfter.add(UIController.clearNotification, 5, this);
		}
	},
	clearNotification: function()	{
		$('#notificationZone').text('').hide();
	}
}