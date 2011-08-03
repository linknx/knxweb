function CWidget(conf) {
}

CWidget.prototype = {
	getListeningObject: function() {
		return Array();
	},
	updateObject: function(obj,value) {
	},
	init: function(conf, width, height) {
		this.label=conf.getAttribute("label");
		this.conf=conf;

    if (_visuMobile) {
      if (this.type=="goto"){
        div = $("<li/>");
      } else {		
        div = $("<div/>");
      }
  
  		this.div = div.get(0);
  		this.div.owner=this;
  
      return div; 
    
    } else {
  
  		var x = conf.getAttribute("x");
  		var y = conf.getAttribute("y");
  		if (!x) x = 20;
  		if (!y) y = 20;
  		
  //	    conf.setAttribute("x", parseInt(x) - UIController.leftOffset);
  		if (UIController.leftOffset)
  		    x = parseInt(x) + UIController.leftOffset;
  		if (UIController.topOffset)
  		    y = parseInt(y) + UIController.topOffset;
  
  		this.div = $("div." + conf.getAttribute("type") + ":first").clone();
  		
      //console.debug($("div." + conf.getAttribute("type") + ":first"));
  		//console.debug(this.div);
  		
  		var a=this.div.get(0);
  		a.owner=this;
  		
  		if (this.label != "")	this.div.mouseover(function () { UIController.setNotification(this.owner.label); });
  	
  		this.div.css('left', x+"px");
  		this.div.css('top', y+"px");
  		if (height) this.div.css('height', height);
  		if (width) this.div.css('width', width);
  		
  //		$('body').append(this.div);
      
  		this.div.css('display', 'block');
		
		}
	}
}
