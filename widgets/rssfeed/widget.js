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
  
  this.delay = this.conf.getAttribute("delay");
  this.nbitem = this.conf.getAttribute("nbitem");
  this.adress = this.conf.getAttribute("adress");
  
  /*
  $('#test').rssfeed('http://feeds.reuters.com/reuters/oddlyEnoughNews', {
    limit: 5
  });
  */
  /*
  $("div:first-child", this.div).rssfeed(this.adress, {
    limit: this.nbitem,
    linktarget: '_blank' 
  });
  if (this.delay) {
    var delay = parseInt(this.delay) * 60 * 1000; // convert minute in milliseconde
    setTimeout(this.refreshfeed, delay);
  }
  */
  this.refreshfeed(); 
}
CRssfeed.prototype.refreshfeed = function(obj,value) {

  $("div:first-child", this.div).rssfeed(this.adress, {
    limit: this.nbitem,
    linktarget: '_blank' 
  });
  
  if (this.delay) {
    var delay = parseInt(this.delay) * 60 * 1000; // convert minute in milliseconde
    setTimeout(this.refreshfeed, delay);
  }
};

// Called by eibcommunicator when a feedback object value has changed
CRssfeed.prototype.updateObject = function(obj,value) {
};
