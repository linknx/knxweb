/*
 * cf. http://jquerymobile.com/themeroller/
 */
var framemobile;
var iframemobile_window;

var designmobile = {
	config: null,
	currentDesign: null,
	currentZone: null,

	// Load design
	load: function(designName)	{
		if ((designName!="")&&(designName!=null)) {
			var url = 'design/' + designName + '/mobile.xml';
		
			design.currentDesign=designName;
			design.currentZone=null;
			
			$('#tab-design-design-list').val(designName);
		
			req = jQuery.ajax({ url: url, dataType: 'xml', async:false, cache: false,
				success: function(responseXML, status) {
					designmobile.config=responseXML;
					designmobile.clear();
					designmobile.refreshZoneList();
				}
			});
		}
	},

  // Load design list
	loadDesignList: function() {
		req = jQuery.ajax({ url: 'design_technique.php?action=designlist', async: false, dataType: 'xml',
			success: function(responseXML, status) {
				$('#tab-design-mobile-design-list').empty();
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'error') {
					$('design', responseXML).each(function() {
						var option = "<option value='" + this.getAttribute('name') +"'>" + this.getAttribute('name') + "</option>";
						$('#tab-design-mobile-design-list').append(option);
					});
					$('#tab-design-mobile-design-list').val(UIController.getDesignName());
				}
				else
					$('#tab-design-mobile-design-list').text('Unable to load design list: '+xmlResponse.textContent);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				messageBox(tr('Unable to load design list: ')+textStatus, "Error", "alert");
			}
		});
	},

	// Refresh zone select	
	refreshZoneList: function() {
		$('#tab-design-mobile-zone-list').empty();
		$('zone', designmobile.config).each(function() {
			var option = "<option value='" + this.getAttribute('id')+"'>" + this.getAttribute('name') + "</option>";
			$('#tab-design-mobile-zone-list').append(option);
		});
	},

	// Create a new widget
	newWidget: function(type) {
		// Fetch default config and add widget
    if (design.currentZone==null) return false;
		
		req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=newWidget&type='+type, dataType: 'xml',
			success: function(conf) {
				var conf = conf.documentElement;
				$('zone[id='+design.currentZone+']', designmobile.config).each(function() {
					this.appendChild(conf);
				});
				var obj=design.addWidget(conf);
				obj.div.widgetMovable("select");
			}
		});
	},

	// Remove all widgets
	clear: function() {
		/*
    $("#widgetdivmobile .widget").each(function() {
			$(this).remove();
		});
    */
    designmobile.refreshWidgetsList();
		designmobile.currentZone=null;
	},
  // Refresh Widgets List	
	refreshWidgetsList: function() {
		$("#tab-design-mobile-widgets-list tbody").empty();
	},
  // remove widget from the WidgetsList
  removeWidgetsList: function(o) {
    $("tr", "#tab-design-mobile-widgets-list").each(function() {
      if (this.obj == o) $(this).remove();
    });
  },
  // selected a widget from the function onWidgetSelect()
  selectWidgetsList: function(o) {
    $(".active", "#tab-design-mobile-widgets-list").removeClass("active");
    $("tr", "#tab-design-mobile-widgets-list").each(function() {
      if (this.obj == o) $(this).addClass("active");
    });
  },

}

var widgetmobile = {
	config: null,
  incItem: 0,

	widgetList: {
	  'slider' : 'Slider',
	  'toggleswicth' : 'Toggle swicth', 
	},
	// Load design
	New: function(type)	{
    this.incItem ++;
		switch (type) {
      case 'slider':
      	return widgetmobile.slider();
      case 'toggleswicth':
      	return widgetmobile.toggleswicth();
    }
	},

	// Clone Slider
	slider: function()	{
    var modelslider = $("#framemobile").contents().find("#slider-0");
    var slider = modelslider.parent().clone();
    $("input", slider).attr("id", "slider_"+this.incItem);
    $("input", slider).attr("data-highlight", "true");
    $("input", slider).attr("data-mini", "true");
    $("label", slider).attr("for", "slider_"+this.incItem);
    //$("input", slider).slider();
    return slider;
	},

	// Clone Toggle swicth
	toggleswicth: function()	{
		return $("<div>Toggle swicth</div>");
	}
}


jQuery(function($) {

  designmobile.loadDesignList();

framemobile = $( "#framemobile" ).contents();
iframemobile_window = $( "#framemobile" )[0].contentWindow;
//This is a bug in JQM. Header initialization is using a live pagecreate handler on the page
//ideally we should be able to write iframe_window.$(".swatch:last").trigger("create");
//iframemobile_window.$( ".ui-page" ).trigger( "pagecreate" ); 

//$( "#framemobile" ).contents().find( ".ui-bar-a" )
//$( "#frame" ).contents().find( ".ui-link, .ui-btn-active" ).each(function() { ... });
//$( temp_swatch_template ).insertAfter( $("#frame").contents().find(".swatch:last") );
//$( "#frame").contents().find( ".ui-bar-" + swatch + ", " + ".ui-body-" + swatch + ", .ui-bar-" + swatch + " [data-form], .ui-body-" + swatch + " [data-form]" ).mouseup(function(e) {

/*

execute fonction js dans iframe : document.getElementById('iframeid').contentWindow.myFunc();




targetFrame = window.parent.frames[0].frames[0].document;
$('*',targetFrame).size();




Assuming you have

  <iframe id="iframeID" ...></iframe>

Iframe contains div with id=”someID”:

  <div id="someID">Hello world!</div>

Need get div’s text?

  $('#iframeID').contents().find('#someID').html();

cf. http://simple.procoding.net/2008/03/21/how-to-access-iframe-in-jquery/

jQuery( function() {
  $(’#frame1′).load( function(){
    $(this.contentDocument).find(’body’).html(’This frame was modified with jQuery! Yay!!!’)
  });
  $(’#frame2′).load( function(){
    $(this.contentDocument).find(’body’).html(’This frame was modified with jQuery! Yay!!!’)
  });
});


$.mobile.showPageLoadingMsg
$.mobile.hidePageLoadingMsg

*/ 	


  
  $("#button-refresh-widget-mobile").button();
  $("#button-refresh-widget-mobile").click(function() {
    //framemobile.find("#newPage .content").prepend("toto");
    //test = $("<div>toto</div>");
    /*
    test = $('<div data-role="fieldcontain" ><label for="slider-10">Input slider:</label><input type="range" name="slider" id="slider-10" value="25" min="0" max="100" data-mini="true" /></div>');
    
    //test.insertAfter( $("#frame").contents().find("#newPage .content") );
    test.prependTo( $("#framemobile").contents().find("#newPage .content") );
    test.slider();
    test.slider('refresh');
    */

    // cela fonction : ajouter dans l'iframe du code 
    //var newslider = widgetmobile.New("slider");
    //newslider.prependTo( $("#framemobile").contents().find("#newPage .content") );

    /*
    window.frames["framemobile"].affiche();
    $("#framemobile").contents().testcall("hello World !!");
    $("#framemobile").contents().widgetmobile.testcall("hello World !!");
    */
    
    //$("#framemobile")[0].contentWindow.testcall('Hello world!!');
    var w = [];
    w['type'] = 'slider';
    w['prepend'] = true;
    $("#framemobile")[0].contentWindow.widgetmobile.New(w);

    //newslider.slider();
    //newslider.slider('refresh');
    

    //test.appendTo( $("#framemobile").contents().find("#tototest") );
  });
  tototest = framemobile.find("#tototest");
  tototest.click(function() {
    alert("tototest");
  });
  
  $("#button-add-widget-mobile").button();
  $("#button-add-widget-mobile").click(function() {
    var w = [];
    w['type'] = $("#list-widget-mobile").val();
    w['prepend'] = $("#prepend-add-widget-mobile").attr("checked");

    w['text']=prompt(tr('Enter text'),'');

		/*switch (w['type']) {
      case 'slider':
      	div = 'TODO ...' + w['type'];
        break;
      case 'toggleswicth':
      	div = 'TODO ...' + w['type'];
        break; 
      case 'listview':
      	div = 'TODO ...' + w['type'];
        break;
      case 'list-divider':
      	div = 'TODO ...' + w['type'];
        break;
      case 'button':
      	div = 'TODO ...' + w['type'];
        break;
      case 'radioswicth':
      	div = 'TODO ...' + w['type'];
        break;
      case 'select':
      	div = 'TODO ...' + w['type'];
        break;
      case 'text':
      	div = 'TODO ...' + w['type'];
        break;
      case 'html':
      	div = 'TODO ...' + w['type'];
        break;
    }*/

    $("#framemobile")[0].contentWindow.widgetmobile.New(w);
  });

  $("#tab-design-mobile-properties").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });

	$("#tab-design-mobile-list-widgets").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });
  
  $("#button-delete-widget-mobile").button({
		icons: {
			primary: "ui-icon-closethick"
		}
	});
	/*$("#button-delete-widget-mobile").click(function() {
		if ($("#widgetdivmobile .selected").length>0)	
		{
			designmobile.deleteWidget($("#widgetdivmobile .selected").get(0).owner); 
			// Show design properties
			$("#widgetdivmobile").trigger("click");
		}
	});*/

	$("#button-clone-widget-mobile").button({
		icons: {
			primary: "ui-icon-copy"
		}
	});
	/*$("#button-clone-widget-mobile").click(function() {
		if ($("#widgetdivmobile .selected").length>0)	
		{
			var conf=$("#widgetdivmobile .selected").get(0).owner.conf;
			var newConf=conf.cloneNode(true);
			newConf.setAttribute('x',20);
			newConf.setAttribute('y',20);
			$('zone[id='+design.currentZone+']', design.config)[0].appendChild(newConf);
			var obj=design.addWidget(newConf);
			obj.div.widgetMovable("select");
		}
	});*/

	loading.hide();
});
