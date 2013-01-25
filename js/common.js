var _version=tab_config['version'];
var _visuMobile=false;   // TODO a gérer mieux que ça ...
var _editMode = false;
var _subpages;
var _floating_zone = false;
var _floating_zone_margin = 10;

var _objectTypesValues = {
	'1.001': ['on','off'],
	'3.007': ['up','down','stop'],
	'3.008': ['close','open','stop'],
	'20.102': ['comfort','standby','night','frost']
}

var _tab_effects = new Array("blind","bounce","clip","drop","explode","fold","highlight","puff","pulsate","scale","shake","size","slide");

// runAfter
var runAfter = {
	functions: new Array(),
	
	init: function() {
		runAfter.timer();
	},
	add: function(f,delay, sender) {
		for(var i=0;i<runAfter.functions.length; i++) {
			o=runAfter.functions[i];
			if (o.func==f && o.sender==sender) {
				o.delay=delay;
				return;
			}
		}

		o=new Object();
		o.func=f;
		o.delay=delay;
		o.sender=sender;
		runAfter.functions.push(o);
	},
	timer: function() {
		for(var i=0;i<runAfter.functions.length; i++) {
			o=runAfter.functions[i];
			if (o.delay==0) {
				o.func(o.sender);
				runAfter.functions.splice(i,1);
			}
			else o.delay--;
		}
		setTimeout(runAfter.timer,1000);
	},
	isIn: function(f) {
		for(var i=0;i<runAfter.functions.length; i++) {
			o=runAfter.functions[i];
			if (o.func==f) return true;
		}
		return false;
	}
}

function tr(msg)
{
	var cRet = (typeof(i18n)!='undefined') ? i18n[msg] : msg;
	if(!cRet) {
		//return "§§§" + msg + "§§§";
		return msg;
	}
	return cRet;
}

function saveConfig()
{	
	var ret = queryLinknx('<admin><save/></admin>');
  if (ret != "false" ) messageBox(tr("Configuration saved under linknx file param"), tr("Info"), "check");
}

function isObjectUsed(id)
{
	var used=false;
	var responseXML=queryLinknx('<read><config><rules/></config></read>');

	if (responseXML!=false)
	{
		$('condition', responseXML).each(function() {
			if ((this.getAttribute('type')=='object')&&(this.getAttribute('id')==id))
			{
				used=true;
				return used;
			}
		});
		$('action', responseXML).each(function() {
			if ((this.getAttribute('type')=='set-value')&&(this.getAttribute('id')==id))
			{
				used=true;
				return used;
			}
		});
	}
	return used;
}

function isIOportUsed(id)
{
	var used=false;
	var responseXML=queryLinknx('<read><config><rules/></config></read>');

	if (responseXML!=false)
	{
		$('condition', responseXML).each(function() {
			if ((this.getAttribute('type')=='ioport-rx')&&(this.getAttribute('id')==id))
			{
				used=true;
				return used;
			}
		});
		$('action', responseXML).each(function() {
			if ((this.getAttribute('type')=='ioport-tx')&&(this.getAttribute('id')==id))
			{
				used=true;
				return used;
			}
		});
	}
	return used;
}

function getObjectsList()
{
	var objectsList={};
	
	var responseXML=queryLinknx('<read><config><objects/></config></read>');
	if (responseXML!=false)
	{
		$('object', responseXML).each(function() {
			objectsList[this.getAttribute('id')]=this.textContent;
		});
	}
	return objectsList;
}

jQuery.fn.disableTextSelect = function() {
	return this.each(function(){
		if($.browser.mozilla){//Firefox
			$(this).css('MozUserSelect','none');
		}else if($.browser.msie){//IE
			$(this).bind('selectstart',function(){return false;});
		}else{//Opera, etc.
			$(this).mousedown(function(){return false;});
		}
	});
};

jQuery.fn.tableize = function(option) {
	if (!option) option=[];
  if (!option.id) option.id = "objects-tab-table";
	this[0].tableizeOption=option;
	
	this.addClass("tableize");
	$('thead',this).addClass('ui-state-active');

	if (option.selectable)
	{
		$('tbody tr', this).click( function() {
				var checked=$(this).hasClass('row_selected');
        $('#'+ option.id +' tr').removeClass('row_selected');
				if (!checked) $(this).addClass('row_selected');
		});
	}
	
	if (option.sortable!=false) {
    if (!option.tablesorterOption) {
      this.tablesorter({
    		widgets: ['zebra'],
    		sortList: [[0,0]]
    	});
    } else {
      this.tablesorter(option.tablesorterOption);
    }
    if (option.pager) {
      this.tablesorterPager({
        size: option.pagersize,
        container: $("#" + option.pager), 
        positionFixed: false 
      });
    }
  } else
	{
		$('tbody tr:odd', this).addClass('odd');
	  $('tbody tr:even', this).addClass('even');
	}
	
	this.bind('refresh', function() {
		if ($('tbody td',$(this)).length>0)
		{
			$(this).addClass("tableize");
			$('thead',$(this)).addClass('ui-state-active');
	
			if (this.tableizeOption.selectable)
			{
				$('tbody tr', this).click( function() {
						var checked=$(this).hasClass('row_selected');
            $('#'+ option.id +' tr').removeClass('row_selected');
						if (!checked) $(this).addClass('row_selected');
				});
			}
	
			$(this).trigger("update"); 
			$(this).trigger("applyWidgets"); 
	
			if (this.tableizeOption.disableTextSelect) $(this).disableTextSelect();
		}
	});

	if (option.disableTextSelect) $(this).disableTextSelect();
};

var loading = {
        show: function()
        {
                var loaderContent = $("#loaderContent");
       
                loaderContent.css("top", (parseInt($(window).height()) - parseInt(loaderContent.height())) / 2);
                loaderContent.css("left", (parseInt($(window).width()) - parseInt(loaderContent.width())) / 2);
        
                if (($.browser.msie) && ($.browser.version<7)) $("select").hide();
                $("body").css("cursor", "progress");
								$("#loaderModal").fadeIn();
        },
        hide: function()
        {
								$("#loaderModal").fadeOut();
                if (($.browser.msie) && ($.browser.version<7)) $("select").show();
                $("body").css("cursor", "auto");
        }                                                                 
                
};

function messageBox(message,title,icon) {
	// icon : alert, info, notice, help, mail-open, mail-closed, comment, person, trash, locked, unlocked, home, star, link, cancel, newwin, refresh
  // voir pour ajouter la class ui-state-highlight ou ui-state-error en fonction si "bon ou mauvais" 
	a=$('<div id="dialog-message" title="' + title + '">');
	if (icon != '') {
		a.html('<p><span class="ui-icon ui-icon-' + icon + '" style="float:left; margin:0 7px 50px 0;"></span>' + message + '</p>');
	} else {
    a.html('<p></span>' + message + '</p>');
  }
	a.dialog({
			width: 350,
			autosize: true,
			resizable: false,
			autoopen: true,
			modal: true,
			buttons: [
          { text: tr("Ok"), click: function() { $( this ).dialog( "close" ); } },
          { text: tr("Close"), click: function() { $(this).dialog("destroy");$(this).remove(); } }
        ]
	});

}

function queryLinknx(message) {
	var t = new Date().getTime();
	var data;
	var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd&nocache=' + t, data: message, processData: false, dataType: 'xml',async: false,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') == 'success') {
				data=xmlResponse;
			}
			else 
			{
				messageBox(tr("Error: ")+xmlResponse.textContent, tr('Error'), 'alert');
				data=false;
			}
		}
	});
	return data;
}

function queryKnxweb(action, type, message, callasync) {
	var t = new Date().getTime();
	var data;
	var req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action='+action+'&nocache=' + t, data: message, processData: false, dataType: type,async: callasync,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') == 'success') {
				data=xmlResponse;
			}
			else 
			{
				messageBox(tr("Error: ")+xmlResponse.textContent, tr('Error'), 'alert');
				data=false;
			}
		}
	});
	return data;
}

function loadSubPages() {
	var url = 'design/subpages.xml';

	req = jQuery.ajax({ url: url, dataType: 'xml', async: false, cache: false,
		success: function(responseXML, status) {
			_subpages=responseXML
		}
	});
}

function serializeXmlToString(data) {
	if (jQuery.browser.msie)
		return data.xml;
	return (new XMLSerializer()).serializeToString(data);
}

function lz(i) {
	if (i<10) return '0'+i; else return i;
}

function getImageUrl(image)
{
	if ((image!=null) && (image!=""))
	{
		if (image.match(/^http:\/\//))
			return image;
		else
			return tab_config.imageDir + image;
	} else return "";
}


$.fn.widgetMovable = function(method) {
	
	function select(widget) {
		var options= $(widget).data('widgetMovable');

		if (_editMode) {
			if (design) {
        if (design.grid) {
  			  $(widget).draggable( "option", "grid", [design.gridWidth, design.gridWidth] );
  			}
      }
		}
    
		if (!$(widget).hasClass("selected"))
		{
			$('div').removeClass("selected");
			$(widget).addClass("selected");
			
			$(".resizeSE").hide();
			$(widget).children(".resizeSE").show();
		
			if (options.onSelect!=null) 
			{
				options.onSelect(widget);
			}
		}
	}

  var methods = {
    init : function( options ) { 
    	
    	return this.each(function() {

				options = $.extend({
					resizable: true,
					draggable: true,
					onSelect: null,
					onMove: null,
					onResize: null
				}, options);

				var $this = $(this);
		
				$this.data('widgetMovable', options);
				
				var widgetContainer=$this.parent();
			
				var left=Math.round($this.css('left').replace(/px$/,"")) + widgetContainer.offset().left;
				var top=Math.round($this.css('top').replace(/px$/,"")) + widgetContainer.offset().top;
			
				if (options.resizable) {
					var div=$('<div class="resizeSE"></div>');
					div.hide();
					$this.append(div);
  				var grid = [1,1];
  				if (_editMode) { if (design) {if (design.gridwidgetsize) grid = [design.gridWidth, design.gridWidth]; }}
					div.draggable({
  					grid: grid,
						containment: [left,top,9999,9999],
						drag: function(event, ui) {
							var div=$(this).parent();
							div.width(ui.position.left);
							div.height(ui.position.top);
						},
						stop: function(event, ui) {
							if (options.onResize!=null) options.onResize($(this).parent().get(0));
						}
					});
				}

				if (options.draggable) {
  				var grid = [1,1];
  				if (_editMode) { if (design) {if (design.grid) grid = [design.gridWidth, design.gridWidth]; }}  
  				$this.draggable({
  					containment: 'parent',
  					cursor: 'move',
  					opacity: 0.50,
  					zIndex: 500,
  					delay: 50,
  					grid: grid,
  					stop: function(event, ui) {
  						//var left=Math.round($(this).css('left').replace(/px$/,"")) + widgetContainer.offset().left;
  						//var top=Math.round($(this).css('top').replace(/px$/,"")) + widgetContainer.offset().top;
  						var left=Math.round($(this).css('left').replace(/px$/,""));
  						var top=Math.round($(this).css('top').replace(/px$/,""));
              if (_editMode) {
          			if (design) {
                  if (design.grid) {
            			  left = Math.round( left / design.gridWidth ) * design.gridWidth;
                    top = Math.round( top / design.gridWidth ) * design.gridWidth;
            			  $(this).css('left', left);
            			  $(this).css('top', top);
            			}
                }
          		}
  						var left2=left;
  						var top2=top;                                                        
              left+= widgetContainer.offset().left;
  						top+= widgetContainer.offset().top;
              
  						$('.resizeSE', this).draggable( "option", "containment", [left,top,9999,9999] );
  						//if (options.onMove!=null) options.onMove(this, ui.position.left, ui.position.top);
  						if (options.onMove!=null) options.onMove(this, left2, top2);
  					},
  					start: function(event, ui) {
  						select(this);
  					}
  				});
				}
				
				$this.click(function() {
						select(this);
						return false;
				});
			});
    },
    select : function( ) {
    	select(this.get(0));
    },
    refreshHelperPosition : function( ) {
    	$(".resizeSE",this).css('top','');
    	$(".resizeSE",this).css('left','');
    }    
  };
  
	if ( methods[method] ) {
		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} else {
		//$.error( 'Method ' +  method + ' does not exists.' );
    //$.error( tr('Method') + ' ' +  tr(method) + ' ' +  tr('does not exists.') );
    $.error( tr('Method') + ' ' +  method + ' ' +  tr('does not exists.') );
	}    

};

function isMobile() { // TODO à gérer mieux ?? peut-être à passer via les template php qui peuvent aussi le détecter ... 
 if( navigator.userAgent.match(/Android/i) ||
     navigator.userAgent.match(/webOS/i) ||
     navigator.userAgent.match(/iPad/i) ||
     navigator.userAgent.match(/iPhone/i) ||
     navigator.userAgent.match(/iPod/i)
     ){
    return true;
 }
}

function StringtoXML(text){
  if (window.ActiveXObject){
    var doc=new ActiveXObject('Microsoft.XMLDOM');
    doc.async='false';
    doc.loadXML(text);
  } else {
    var parser=new DOMParser();
    var doc=parser.parseFromString(text,'text/xml');
  }
  return doc;
}
