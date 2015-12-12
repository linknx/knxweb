function CWidget(conf) {
}

CWidget.prototype = {
	isResizable: false,	// TODO : put this variable in plugin's manifest.xml
  isDraggable: true, // TODO : put this variable in plugin's manifest.xml
	editMode: false, // TODO remplacé par _editMode variable globale
	enabled: true,		// enabled = false => no commands are send to the bus (during setup)
	
	// Return needed feedback object
	getListeningObject: function() {
		var a=[];
		
		var widget = eval( "_widgets." + this.conf.getAttribute("type"));
		
		var w=this;
		if (widget.feedbacks!=undefined)
		{
			$.each(widget.feedbacks, function(index, value) {
				var o=w.conf.getAttribute(value);
				if ((o!="") && (o!=null) && ($.inArray(o, a)==-1)) a.push(o);
			});
		}
		return a;
	},
	
	// Called by eibcommunicator when a feedback object value has changed
	updateObject: function(obj,value) {
	},
  
	// Called utiliser dans le clear dans setup_design et design_view 
	deleteWidget: function() {
	},
	
	// Initialize a widget
	init: function(conf) {
		this.conf=conf;

		var x = conf.getAttribute("x");
  	var y = conf.getAttribute("y");
    var defaultGridWidth = 20;
    var defaultWidgetGridWidth = 32;
		if (_editMode) { // TODO en mode "subpage" design n'est pas définit et pas tenir compte de la grid ...
      if (_designeditview) {
			if (design.grid) {
			  defaultGridWidth = design.gridWidth;
        if (defaultGridWidth < 20) defaultGridWidth = Math.round(Math.round( 20 / design.gridWidth) *  design.gridWidth); 
			}
			if (design.gridwidgetsize) {
        defaultWidgetGridWidth = design.gridWidth; 
        if (defaultWidgetGridWidth < 32) defaultWidgetGridWidth = Math.round(Math.round( 20 / design.gridWidth) *  design.gridWidth); 
			}
      }
		}
  	if (!x) 
  	{
  		//x = 20;
  		x = defaultGridWidth;
  		conf.setAttribute("x", x);
  	}
  	if (!y)
  	{
  		//y = 20;
  		y = defaultGridWidth;
  		conf.setAttribute("y", y);
  	}
		
		if (UIController.leftOffset)
		    x = parseInt(x) + UIController.leftOffset;
		if (UIController.topOffset)
		    y = parseInt(y) + UIController.topOffset;

		this.div=$("#widgetsTemplate ." + this.conf.getAttribute("type")).clone()
		
		var a=this.div.get(0);
		a.owner=this;
		
    //console.log('widget', this.div, this.div.parent(), (this.div.parent())[0].conf.getAttribute("type"));
	//if (!design.floating) {	// TODO en mode "subpage" et "view" design n'est pas définit
  if (!_floating_zone) {	
		this.div.css('left', x+"px");
		this.div.css('top', y+"px");
  } else { // _floating_zone_margin
		this.div.css('float', "left");
    this.div.css('position', "relative");  
    if (_floating_zone_margin) this.div.css('padding', _floating_zone_margin + "px");
  }
		
		var width = conf.getAttribute("width");
		var height = conf.getAttribute("height");

		if ((!width) && (this.isResizable))
		{
  		conf.setAttribute("width", defaultWidgetGridWidth);
			this.div.css('width', defaultWidgetGridWidth);
		} else if (this.isResizable) this.div.css('width', width);

		if ((!height) && (this.isResizable))
		{
  		conf.setAttribute("height", defaultWidgetGridWidth);
			this.div.css('height', defaultWidgetGridWidth);
		} else if (this.isResizable) this.div.css('height', height);
		
		this.div.css('display', 'block');
	},
	
	// Refresh HTML from config
	refreshHTML: function() {
  },
  onSelect: function() {
  },
  onDeSelect: function() {
  },
  onMoveStart: function(left, top) {
  },
  onMove: function(left, top) {
  },
  onMoveStop: function(left, top) {
  },
  onResizeStart: function(width, height) {
  },
  onResize: function(width, height) {
  },
  onResizeStop: function(width, height) {
  },
  
  // Switch to edit mode
  edit: function(selectCallBack, moveCallBack, resizeCallBack) {

		this.editMode=true;
	
		$(this.div).widgetMovable({
			resizable: this.isResizable,
			draggable: this.isDraggable,
			onMoveStart: function (widget, left, top) {
				widget.owner.onMoveStart(Math.round(left), Math.round(top));
			},
			onMove: function (widget, left, top) {
				widget.owner.onMove(Math.round(left), Math.round(top));
			},
			onMoveStop: function(widget, left, top) {
				widget.owner.conf.setAttribute('x', Math.round(left) );
				widget.owner.conf.setAttribute('y', Math.round(top) );
				moveCallBack(widget.owner);
        widget.owner.onMoveStop(Math.round(left), Math.round(top));
			},
			onSelect: function(widget) {
				selectCallBack(widget);
				widget.owner.onSelect();
			},
			onDeSelect: function(widget) {
				widget.owner.onDeSelect();
			},
			onResizeStart: function(widget) {
				widget.owner.onResizeStart($(widget).width(), $(widget).height());
			},
			onResize: function(widget) {
				widget.owner.onResize($(widget).width(), $(widget).height());
			},
			onResizeStop: function(widget) {
				widget.owner.conf.setAttribute('width', $(widget).width() );
				widget.owner.conf.setAttribute('height', $(widget).height() );
				resizeCallBack(widget.owner);
        widget.owner.onResizeStop($(widget).width(), $(widget).height());
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
		if (!_editMode) EIBCommunicator.refreshListeningObject(this);
	}
}
