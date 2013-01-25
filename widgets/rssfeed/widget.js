var _Rssfeed = [];

function CRssfeed(conf) {
	this.isResizable=true;
	this.init(conf);
  if (!this.inRssfeedTab) _Rssfeed.push(this);
  this.inRssfeedTab = true;
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
  
  $("div:first-child", this.div).rssfeed(this.adress, {
    limit: this.nbitem,
    linktarget: '_blank' 
  });
  
}
  
CRssfeed.prototype.deleteWidget = function() {
  for(var i=0;i<_Rssfeed.length;i++)
  {
    if (_Rssfeed[i] == this) _Rssfeed.splice(i); 
  }
};

// Called by eibcommunicator when a feedback object value has changed
CRssfeed.prototype.updateObject = function(obj,value) {
};

/* fonction appelée en boucle pour mise à jour des widgets Rssfeed */
Rssfeed_refreshfeed();

function Rssfeed_refreshfeed()
{
  for(var i=0;i<_Rssfeed.length;i++)
  {
    if (_Rssfeed[i] != '') {
      $("div:first-child", _Rssfeed[i].div).rssfeed(_Rssfeed[i].adress, {
        limit: _Rssfeed[i].nbitem,
        linktarget: '_blank' 
      });
    }
  }
  var delay = 15 * 60 * 1000;  // default 15 minute 
  if (_Rssfeed[0]) delay = parseInt(_Rssfeed[0].delay) * 60 * 1000;  // convert minute in milliseconde
  var t=setTimeout("Rssfeed_refreshfeed()",delay);
}
