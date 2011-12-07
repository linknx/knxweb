// TODO - Delete this file, not used anymore except UIController.widgetList

// UIController
var UIController = {
	objects: new Array(),
	
	objectsArea: new Array(),  // liste de chaque device(control/widget) par Area
	indexArea: 0,              // index de l'area besoin pour charger la liste des objects par area
	tableArea: new Array(),    // tableau de chaque area { name: pagename , id: id , page: pageid}
	tableArealenght: 0,        // nombre de area
	deviceNumber: 0,        // incrément pour les id des composants
	
	objectListListeners: new Array(),
	editMode: false,
	leftOffset: null,
	topOffset: null,
	currentZone: '',
	HouseName: '',
	selectCallback: null,			// callback when a widget is selected in edit mode
	widgetMoveCallback: null,			// callback when a widget is moved
	widgetResizeCallback: null,			// callback when a widget is resized
	widgetList: new Array(),

	// Set XML config of design
	setConfig: function(doc, name) {
		this.config = doc; // flux xml complet du "design" 
		this.designName = name;
	},
	getDesignName: function() {
		return this.designName;
	},
	setObjectsList: function(doc) {
		UIController.objectlist = doc;
		for(var i=0;i<this.objectListListeners.length; i++) {
			this.objectListListeners[i](doc);
		}
	},
	addObjectListListener: function(f) {
		this.objectListListeners.push(f);
		f(UIController.objectlist);
	},
	registerWidget: function(widget) {
		this.widgetList[widget.type]=widget;
	},
	changeZoneBackground: function(zoneid, bg) {
		$('zone[id='+zoneid+']', UIController.config).attr('img', bg);
		this.setZoneBackground(bg);
	},
	setZoneBackground: function(bg) {
		if (bg != null && bg != "")
		{
			bg = 'design/' + this.designName + '/' + bg;
			$('#bgImage').attr('src', bg);
		}
	},
	drawZone: function(zoneid) { // TODO : paragrpahe a revoir pour regrouper "mobile" et non ...
  	if (_visuMobile) {
      if (zoneid) {
      	// Cyrille - A revoir
        var pageCurrent = UIController.tableArea[zoneid];
        var indexArea = zoneid;
        zoneid = pageCurrent.id; 
      } else {
        var pageCurrent = UIController.tableArea[0]; // récupère l'id de la 1ère area si non renseigné
        var indexArea = 0;
        zoneid = pageCurrent.id;
      }
  
  		EIBCommunicator.removeAll();
  		UIController.currentZone = pageCurrent.page; //id de la page et non pas celui de l'area (=zoneid)
  		
      if (pageCurrent.load == 'false' )  {//si page non chargée précédement
        var zone = $(_area+'[id='+zoneid+']', UIController.config);
        
        UIController.indexArea = indexArea; 
    		zone.children(_device).each(function() {
     			UIController.addWidgetMobile(this, UIController.indexArea, UIController.editMode); 
    		});
    		pageCurrent.load = 'true';
  		} else { // si page déjà créée on recharge la liste des objets dans EIBCommunicator
        for (var i=0; i < this.objectsArea[indexArea].length; i++ )
        {
          var obj = UIController.objectsArea[indexArea][i]; 
          EIBCommunicator.add(obj);
        }
      }
  		
  		EIBCommunicator.updateAll();  // lance la maj des devices de la page active
	  } else {
  		UIController.removeAll();
  		EIBCommunicator.removeAll();
  		
  		// If zoneid not defined, get first zone id
  		if (!zoneid) zoneid = $('zone', UIController.config).attr('id');
  		this.currentZone = zoneid;
  		var zone = $('zone[id='+zoneid+']', UIController.config);
  		UIController.setZoneBackground(zone.attr('img'));
  		zone.children('control').each(function() {
  			UIController.addWidget(this, UIController.editMode);
  		});
  		EIBCommunicator.updateAll();
		}
	},	
  drawPage: function() { // Cyrille - A revoir - Only for MobileVisu

		this.HouseName = $(_areas, UIController.config).attr('name');
		
		$(".header:first","#page0").append($('<h1>'+this.HouseName+'</h1>'));
		
		this.listArea = $("<ul data-role='listview' data-inset='true' />");
 
    var areas = $(_areas, UIController.config);
    
    UIController.tableArea.push({
    	name: this.HouseName,
    	id: "main" ,
    	page: "page0" ,
    	load: 'true' // page déjà crée et donc ne pas la rechargée si c'est le cas
    });
    
    areas.children(_area).each(function() {
      // parcours des _area de _areas pour créer la première page
      var pagename = this.getAttribute('name');
      var id = this.getAttribute('id');
      
      var dataRole = this.getAttribute('data-role');
      if (!dataRole) {
        UIController.tableArealenght += 1; // index de la page et a la fin nombre total de area
        var load = 'false'; 
        var pageid = "page"+UIController.tableArealenght+"";                
        
        UIController.tableArea.push({
          name: pagename ,
          id: id ,
          page: pageid ,
          load: load // page déjà crée et donc ne pas la rechargée si c'est le cas
        });

        var area = $("<li><a href='#"+pageid+"' onclick='UIController.drawZone("+UIController.tableArealenght+");' >"+pagename+"</a></li>"); 

        // creation de la page vide du devive
/*
  <div data-role="page" id="newPage" style="display: none;" data-add-back-btn="true">  
    <div data-role="header" id="header" class="header"><a href="#page0" data-icon="gear" class="ui-btn-right" data-iconpos="notext">Home</a></div> 
    <div data-role="content" id="content" class="content"></div>
    <!-- Bar Bas de page avec bouttons --> 
    <div data-role="footer" class="ui-bar" id="footer" class="footer">
      <div data-role="navbar" data-iconpos="top" id="navbar" class="navbar">
        <ul></ul>
      </div>
    </div>
  </div>
*/
        var newPage = $('<div data-role="page" id="'+pageid+'" data-url="'+pageid+'" data-add-back-btn="true"><div data-role="header" id="header" class="header"><h1>'+pagename+'</h1></div><div data-role="content" id="content" class="content"></div></div>');
        $("#header",newPage).append($('<a href="#page0" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a>'));
        newPage.append($('<div data-role="footer" class="ui-bar" id="footer" class="footer"><div data-role="navbar" data-iconpos="top" id="navbar" class="navbar"><ul></ul></div></div>'));
        document.body.appendChild(newPage.get(0));
        $('#'+pageid).live('pagecreate',function(event){
          EIBCommunicator.periodicUpdate();
        });
        
        UIController.objectsArea[UIController.tableArealenght] = new Array(); // creation tableau d'objet pour chaque area

      } else {
        var area = $("<li data-role='list-divider'>"+pagename+"</li>");
      }
      UIController.listArea.append(area);
      
    });
    $(".content:first","#page0").append(this.listArea);

    UIController.indexArea = 0; 
    areas.children(_device).each(function() {
      UIController.objectsArea[0] = new Array();
      UIController.addWidgetMobile(this, UIController.indexArea, UIController.editMode); 
    });
  },
  drawAllPage: function() { // Cyrille - A revoir - Only for MobileVisu
    for (var i=1; i < UIController.tableArea.length; i++ )
    {
      UIController.drawZone(i);
    }
	},
	// Set zone editable
	editZone: function() {
		UIController.editMode=true;
		for(var i=0;i<UIController.objects.length; i++)
		  UIController.objects[i].edit(UIController.selectCallback, UIController.widgetMoveCallback, UIController.widgetResizeCallback);
	},
	// Add widget to DOM
	createWidget: function(conf) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = this.widgetList[type];

		if (cls)
		{
			obj = new cls(conf);
			
			if (obj!=null) {

				// If edit mode, set widget editable
				if (UIController.editMode)	obj.edit(UIController.selectCallback, UIController.widgetMoveCallback, UIController.widgetResizeCallback);

				$('#widgetdiv').append(obj.div);

				UIController.objects.push(obj);
				EIBCommunicator.add(obj);
				return true;
			}
			return false;
		}	else return false;
	},
	
	// Load widget JS and add widget to DOM
	addWidget: function(o) {
		if (!this.createWidget(o)) {

			var type = o.getAttribute('type');
			$.getScript("widgets/" + type + "/widget.js", function() { UIController.createWidget(o); });
		}
	},
	
	createWidgetMobile: function(conf, page) { // Cyrille - A revoir - Only for MobileVisu
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = this.widgetList[type];
		if (cls)
			obj = new cls(conf);
		if (obj!=null) {
			if (UIController.editMode)
				obj.edit(true, true);

      var area = UIController.tableArea[page];
      var pageid = area.page;
			
			if (type=="goto") {
			   $("#navbar > ul","#"+pageid).append(obj.div);
      } else {
			   $(".content:first","#"+pageid).append(obj.div);
			}
			
			UIController.objectsArea[page].push(obj); // stock la liste des objects de l'area 
			UIController.objects.push(obj);
			EIBCommunicator.add(obj);
			return true;
		}
		return false;
	},
	
	addWidgetMobile: function(o) { // Cyrille - A revoir - Only for MobileVisu
		if (!this.createWidgetMobile(o, page)) {
			var type = o.getAttribute('type');
			// TODO pour le moment on ne traite que certains composants si non présent dans la liste on ne fait rien plus tard on appelera le script associé  "c"+type+"_mobile.js"
			//$.getScript("js/c"+type+"_mobile.js", function() { UIController.createWidgetMobile(o, page); });
		}
	},
	
	// Add a new widget to current zone
	add: function(conf) {
		$('zone[id='+this.currentZone+']', UIController.config).each(function() {
			this.appendChild(conf);
		});
		
		UIController.addWidget(conf, UIController.editMode);
	},
	// Remove a widget from zone
	remove: function(o) {
		for(var i=0;i<UIController.objects.length; i++) {
			if (o==UIController.objects[i]) {
				
				// Cyrille - A revoir
				if (_visuMobile) {
  				if (o.conf.getAttribute("type")=="goto") {
    			   $("#navbar > ul","#page0").remove(o.div);
          } else {
    			   $(".content:first","#page0").remove(o.div);
    			}
    		} else {
          o.div.remove();
        }
				UIController.objects.splice(i,1);
				$(o.conf).remove();
				EIBCommunicator.remove(o);
				return;
			}
		}
	},
	// Clear all widgets
	removeAll: function(o) {
		if (!_visuMobile) {
      var zo = UIController.objects.shift();
  		while (zo != null) {
  			zo.div.remove();
  			zo = UIController.objects.shift();
  		}
  	}
	},
	// Add a new zone
	addZone: function(zoneid, zoneName) {
		var newzone = UIController.config.createElement('zone');
		newzone.setAttribute('id', zoneid);
		newzone.setAttribute('name', zoneName);
		$('zones', UIController.config).append(newzone);
	},
	// Remove a zone
	removeZone: function(zoneid) {
		$('zone[id='+zoneid+']', UIController.config).each(function() { this.parentNode.removeChild( this ); });
	},
	serializeToString: function() {
		return serializeXmlToString(UIController.config);
	},
	saveDesign: function(version) {
		var string = this.serializeToString(UIController.config);
		var url = 'design_technique.php?action=savedesign&name='+this.designName+'&ver='+version;
		req = jQuery.ajax({ type: 'post', url: url, data: string, processData: false, dataType: 'xml' ,
			success: function(responseXML, status) {
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') == 'success') {
					UIController.setNotification(tr("Design saved successfully"));
				}
				else {
					UIController.setNotification(tr("Error while saving design: ")+xmlResponse.textContent);
					alert(tr("Error while saving design: ")+xmlResponse.textContent);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				UIController.setNotification(tr("Error while saving design: ")+textStatus);
			}
		});
	},
	setNotification: function(text)	{
		if (_visuMobile) {
		  alert(text);
		}else {
      $('#notificationZone').text(text).show();
  		runAfter.add(UIController.clearNotification, 5, this);
		}
	},
	clearNotification: function()	{
		$('#notificationZone').text('').hide();
	}
}