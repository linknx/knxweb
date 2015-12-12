function PPlugin(conf) {
}

PPlugin.prototype = {
	enabled: true,		// enabled = false => no commands are send to the bus (during setup)
	
	// Return needed feedback object
	getListeningObject: function() {
		var a=[];
		
		var plugin = eval( "_plugins." + this.conf.getAttribute("type"));
		
		var w=this;
		if (plugin.feedbacks!=undefined)
		{
			$.each(plugin.feedbacks, function(index, value) {
				var o=w.conf.getAttribute(value);
				if ((o!="") && (o!=null) && ($.inArray(o, a)==-1)) a.push(o);
			});
		}
		return a;
	},
	// Called utiliser dans le clear dans setup_design et design_view 
	deleteplugin: function() {
	},
	// Initialize a plugin
	init: function(conf) {
		this.conf=conf;

		var x = conf.getAttribute("x");
  	var y = conf.getAttribute("y");
  	conf.setAttribute("x", x);
		
		
		var a=this.div.get(0);
		a.owner=this;
		
	},
	
	// Refresh HTML from config
	refreshHTML: function() {
  },
  
  // Switch to edit mode
  edit: function(selectCallBack, moveCallBack, resizeCallBack) {
		this.editMode=true;
  },
  
  // Set a config value
  setSetting: function(key,value) {
		this.conf.setAttribute(key, value);
		
		if (key=='x') this.div.css('left', value + "px");
		if (key=='y') this.div.css('top', value + "px");
		this.refreshHTML();
	}
}
