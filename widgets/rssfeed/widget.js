function CRssfeed(conf) {
	this.isResizable=true;
	this.init(conf);
  this.refreshHTML();
}

CRssfeed.type='rssfeed';
UIController.registerWidget(CRssfeed);
CRssfeed.prototype = new CWidget();

// Refresh HTML from config
CRssfeed.prototype.refreshHTML = function() {
  
  /*
  $('#test').rssfeed('http://feeds.reuters.com/reuters/oddlyEnoughNews', {
    limit: 5
  });
  */
  $("div:first-child", this.div).rssfeed(this.conf.getAttribute("adress"), {
    limit: this.conf.getAttribute("nbitem"),
    linktarget: '_blank' 
  });
  if (this.conf.getAttribute("delay")) {
    var delay = parseInt(this.conf.getAttribute("delay")) * 60 * 1000; // convert minute in milliseconde
    setTimeout(this.refreshHTML, delay);
  } 
}

// Called by eibcommunicator when a feedback object value has changed
CRssfeed.prototype.updateObject = function(obj,value) {
};
