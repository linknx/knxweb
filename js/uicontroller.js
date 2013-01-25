// UIController
var UIController = {
	widgetList: new Array(),
  leftOffset: null,
  topOffset: null,

	registerWidget: function(widget) {
		this.widgetList[widget.type]=widget;
	},
	setNotification: function(text)	{
      $('#notificationZone').text(text).show();
  		runAfter.add(UIController.clearNotification, 5, this);
	},
	clearNotification: function()	{
		$('#notificationZone').text('').hide();
	}
}