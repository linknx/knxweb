function CWidget(conf) {
}

CWidget.prototype = {
	getListeningObject: function() {
		return Array();
	},
	updateObject: function(obj,value) {
	},
	init: function(conf) {
		this.label=conf.getAttribute("label");
		this.type = conf.getAttribute("type");
		this.conf=conf;
		
    if (this.type=="goto"){
      div = $("<li/>");
    } else {		
      div = $("<div/>");
    }

		this.div = div.get(0);
		this.div.owner=this;

    return div; 
	}
}
