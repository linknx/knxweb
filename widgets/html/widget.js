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
  $("div:first-child", this.div).empty();
  if (this.conf.firstChild) var html = this.conf.firstChild.nodeValue;
  else var html = "";
  if (html == "") {
    html = this.conf.getAttribute("html");
    //this.conf.firstChild.nodeValue = html;
    this.conf.textContent = html;
  }
  $("div:first-child", this.div).html(html);
}