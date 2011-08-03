// UIController
var UIController = {
	objects: new Array(),      // liste de chaque device(control/widget)
	objectsArea: new Array(),  // liste de chaque device(control/widget) par Area
	indexArea: 0,              // index de l'area besoin pour charger la liste des objects par area
	tableArea: new Array(),    // tableau de chaque area { name: pagename , id: id , page: pageid}
	tableArealenght: 0,        // nombre de area
	deviceNumber: 0,        // incrément pour les id des composants
	objectListListeners: new Array(),
	zoneListListeners: new Array(),
	editMode: false,
  currentZone: '',
	HouseName: '',
	widgetList: new Array(),
	setConfig: function(doc, name) {
		this.config = doc; // flux xml complet du "design" 
		this.designName = name;
		this.zoneListChanged();
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
	addZoneListListener: function(f) {
		this.zoneListListeners.push(f);
		f(UIController.config);
	},
	zoneListChanged: function() {
		for(var i=0;i<this.zoneListListeners.length; i++) {
			this.zoneListListeners[i](UIController.config);
		}
	},
	registerWidget: function(widget) {
		this.widgetList[widget.type]=widget;
	},
  drawZone: function(zoneid) {
    if (zoneid) {
      var pageCurrent = UIController.tableArea[zoneid];
      var indexArea = zoneid;
      zoneid = pageCurrent.id; 
    } else {
      var pageCurrent = UIController.tableArea[0]; // récupère l'id de la 1ère area si non renseigné
      var indexArea = 0;
      zoneid = pageCurrent.id;
    }
	  
		//UIController.removeAll();

		EIBCommunicator.removeAll();
 
		UIController.currentZone = pageCurrent.page; //id de la page et non pas celui de l'area (=zoneid)
		
    if (pageCurrent.load == 'false' )  {//si page non chargée précédement
      var zone = $(_area+'[id='+zoneid+']', UIController.config);
      
      UIController.indexArea = indexArea; 
  		zone.children(_device).each(function() {
   			UIController.addWidget(this, UIController.indexArea, UIController.editMode); 
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
    //EIBCommunicator.periodicUpdate(); 
	},
  drawPage: function() {

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
      UIController.addWidget(this, UIController.indexArea, UIController.editMode); 
    });
  },
  drawAllPage: function() {
    for (var i=1; i < UIController.tableArea.length; i++ )
    {
      UIController.drawZone(i);
    }
	},
	createWidget: function(conf, page, modify) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = this.widgetList[type];
		if (cls)
			obj = new cls(conf);
		if (obj!=null) {
			if (modify)
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
	addWidget: function(o, page, modify) {
		if (!this.createWidget(o, page, modify)) {
			var type = o.getAttribute('type');
			// TODO pour le moment on ne traite que certains composants si non présent dans la liste on ne fait rien plus tard on appelera le script associé  "c"+type+"_mobile.js"
			//$.getScript("js/c"+type+"_mobile.js", function() { UIController.createWidget(o, page, modify); });
		}
	},
	remove: function(o) {
		for(var i=0;i<UIController.objects.length; i++) {
			if (o==UIController.objects[i]) {
				if (o.conf.getAttribute("type")=="goto") {
  			   $("#navbar > ul","#page0").remove(o.div);
        } else {
  			   $(".content:first","#page0").remove(o.div);
  			}
 				UIController.objects.splice(i,1);
				$(o.conf).remove();
				EIBCommunicator.remove(o);
				return;
			}
		}
	},
	serializeToString: function(doc) {
			if (jQuery.browser.msie)
				return doc.xml;
			return (new XMLSerializer()).serializeToString(doc);
	},
	setNotification: function(text)	{
	},
	setAlert: function()	{
		alert(text);
	},
	clearNotification: function()	{
	},
	removeAll: function(o) {
	}
}

function tr(msg)
{
	var cRet = (typeof(i18n)!='undefined') ? i18n[msg] : msg;
	if(!cRet) {
		return msg;
	}
	return cRet;
}
function showWaitDialog(message)
{
	var winH = $(window).height();
	var winW = $(window).width();

	var waitDialog=$('<div>').attr('id','waitDialog')
	$("body").append(waitDialog);
	$(".content:first","#page0").append(waitDialog);
	waitDialog.css('top',  (winH/2-$('#waitDialog').height()/2) + $(window).scrollTop())
						.css('left', winW/2-$('#waitDialog').width()/2);
	waitDialog.append($("<div><img src='./images/Logo_Accueil_160.png' alt='KnxWebMobile' /></div>"));
	waitDialog.append($('<img>').attr('src','images/loading.gif')).append("<br />"); 
	waitDialog.append($('<span>').html(message).css('padding-left',10));

	waitDialog.show();
}

function hideWaitDialog()
{
	//$('#waitDialog').remove();
	$('#waitDialog').hide();
}