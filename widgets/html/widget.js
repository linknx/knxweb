function CHTML(conf) {
	this.isResizable=true;
  this.init(conf);
  this.refreshHTML();
}

CHTML.type='html';
UIController.registerWidget(CHTML);
CHTML.prototype = new CWidget();

// Refresh HTML from config
CHTML.prototype.refreshHTML = function() {
	$("div:first-child", this.div).html(this.conf.getAttribute("html"));
}