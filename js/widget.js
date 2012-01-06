function CWidget(conf) {
}

CWidget.prototype = {
	isResizable: false,	// TODO : put this variable in plugin's manifest.xml
	editMode: false,
	enabled: true,		// enabled = false = no commands are send to the bus (during setup)
	
	// Return needed feedback object
	getListeningObject: function() {
		var a=[];
		
		var widget = eval( "_widgets." + this.conf.getAttribute("type"));
		
		var w=this;
		if (widget.feedbacks!=undefined)
		{
			$.each(widget.feedbacks, function(index, value) {
				var o=w.conf.getAttribute(value);
				if ((o!="") && (o!=null)) a.push(o);
			});
		}
		return a;
	},
	
	// Called by eibcommunicator when a feedback object value has changed
	updateObject: function(obj,value) {
	},
	
	// Initialize a widget
	init: function(conf) {
		this.conf=conf;

    if (_visuMobile) {
    	// Cyrille - A refaire car plus bon
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
	  	if (!x) 
	  	{
	  		x = 20;
	  		conf.setAttribute("x", x);
	  	}
	  	if (!y)
	  	{
	  		y = 20;
	  		conf.setAttribute("y", y);
	  	}
  		
  		if (UIController.leftOffset)
  		    x = parseInt(x) + UIController.leftOffset;
  		if (UIController.topOffset)
  		    y = parseInt(y) + UIController.topOffset;
  
			this.div=$("#widgetsTemplate ." + this.conf.getAttribute("type")).clone()
  		
  		var a=this.div.get(0);
  		a.owner=this;
  		
  		this.div.css('left', x+"px");
  		this.div.css('top', y+"px");
  		
  		var width = conf.getAttribute("width");
  		var height = conf.getAttribute("height");

  		if ((!width) && (this.isResizable))
  		{
	  		conf.setAttribute("width", 32);
 				this.div.css('width', 32);
  		} else if (this.isResizable) this.div.css('width', width);

  		if ((!height) && (this.isResizable))
  		{
	  		conf.setAttribute("height", 32);
  			this.div.css('height', 32);
  		} else if (this.isResizable) this.div.css('height', height);
  		
  		this.div.css('display', 'block');
		}
	},
	
	// Refresh HTML from config
	refreshHTML: function() {
  },
  
  // Switch to edit mode
  edit: function(selectCallBack, moveCallBack, resizeCallBack) {

		this.editMode=true;
	
		$(this.div).widgetMovable({
			resizable: this.isResizable,
			onMove: function(widget, left, top) {
				widget.owner.conf.setAttribute('x', Math.round(left) );
				widget.owner.conf.setAttribute('y', Math.round(top) );
				moveCallBack(widget.owner);
			},
			onSelect: function(widget) {
				selectCallBack(widget);
			},
			onResize: function(widget) {
				widget.owner.conf.setAttribute('width', $(widget).width() );
				widget.owner.conf.setAttribute('height', $(widget).height() );
				resizeCallBack(widget.owner);
			}
		});
  },
  
  // Set a config value
  setSetting: function(key,value) {
		this.conf.setAttribute(key, value);
		
		if (key=='x') this.div.css('left', value + "px");
		if (key=='y') this.div.css('top', value + "px");
		if (key=='width') {
			this.div.css('width', value);
			this.div.widgetMovable("refreshHelperPosition");
		}
		if (key=='height') {
			this.div.css('height', value);
			this.div.widgetMovable("refreshHelperPosition");
		}
		
		this.refreshHTML();
		if (!this.editMode) EIBCommunicator.refreshListeningObject(this);
	}
}
