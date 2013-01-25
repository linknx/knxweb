/*
 * cf. http://jquerymobile.com/themeroller/
 */
var framemobile;
var iframemobile_window;
var w_current;

var designmobile = {
	config: null,
	currentDesign: null,
	currentVersion: null,
	currentPage: "home",
  pageList: [],

	// Load design
	load: function(designName, version)	{
		if ((designName!="")&&(designName!=null)) {
			var url = 'design/' + designName + '/' + version + '.xml';
		
			designmobile.currentDesign=designName;
			designmobile.currentVersion=version;
			designmobile.currentPage="home"; // null
			
			$('#tab-design-mobile-design-list').val(designName);
		
			req = jQuery.ajax({ url: url, dataType: 'xml', async:false, cache: false,
				success: function(responseXML, status) {
					designmobile.config=responseXML;
					designmobile.clear();
          $("#tab-design-mobile-widgets-list tbody").empty();
					designmobile.refreshPageList();
				}
			});
		}
	},
	// Remove all widgets
	clear: function() {
		/*$("#widgetdiv .widget").each(function() {
			this.owner.deleteWidget();
			$(this).remove();
			$('#bgImage').hide();
		});*/
    $("#tab-design-mobile-widgets-list tbody").empty();
		//designmobile.currentPage=null;
	},
	// Refresh page select	
	refreshPageList: function() {
		$('#tab-design-mobile-page-list').empty();
    $('#tab-design-mobile-page-list tbody').empty();
    designmobile.pageList = [];
		$('page', designmobile.config).each(function() {
			var option = "<option value='" + this.getAttribute('id')+"'>" + this.getAttribute('title') + ((this.getAttribute('id') == "home")?" ("+tr("Home")+")":"" ) + "</option>";
			$('#tab-design-mobile-page-list').append(option);
      designmobile.pageList[this.getAttribute('id')] = [];
      designmobile.pageList[this.getAttribute('id')]["title"] = this.getAttribute('title');
      designmobile.pageList[this.getAttribute('id')]["load"] = false;
      if (this.getAttribute('id') == "home") designmobile.pageList[this.getAttribute('id')]["load"] = true;
		});
	},
	// Draw a page
	draw: function(page) {
		designmobile.clear();

		if (page!=null) {
			this.currentPage = page;
      designmobile.pageList[page]["load"] = true;
			var page = $('page[id=' + page + ']', designmobile.config);

      // on récupère width et height en paramètre si existe mais ne sert que pour le mode edit car sinon géré automatiquement par jqm 
			var width=$("config",designmobile.config)[0].getAttribute('width');
			var height=$("config",designmobile.config)[0].getAttribute('height');

      $("#tab-design-mobile-screen-resolution").val(((width!=null)?width:320) + "_" + ((height!=null)?height:480)).change();

	 		page.children('control').each(function() {
				designmobile.addWidget(this);
			});

      /*if (page[0].getAttribute('globalcontrol')!='false') {
        $('pages', designmobile.config).children('control').each(function() {
          designmobile.addWidget(this, true);
					});
      }*/
				}
			},
	// Add widget from conf
	addWidget: function(conf, globalcontrol) { /* globalcontrol=true => widget on design not in a page */
		var obj = null;
/*
    var conf = designmobile.config.createElement('control');
  	conf.setAttribute('name', type);
    for (var i in w)
    {
      conf.setAttribute(i, w[i]);
			}
  	$('page[id='+designmobile.currentPage+']', designmobile.config).each(function() {
  		this.appendChild(conf);
		});
    widget.get(0).conf=conf;
*/

    var parentId = null;
    obj = $("#framemobile")[0].contentWindow.widgetmobile.New(conf, parentId); // appel d'une fonction dans une iframe

		if (obj!=null) {
      designmobile.addWidgetsList(obj, globalcontrol);
      obj.globalcontrol = globalcontrol;

      // If the widget had Children 
    	$('control', conf).each(function() {
  			designmobile.addWidgetChildren(this, obj.content, globalcontrol);
		});
    	return obj;
		}
  	return false;
	},

	// Add widget from conf and to a parent
	addWidgetChildren: function(conf, parent, globalcontrol) {
		var obj = null;
    var parentId = null;
    obj = $("#framemobile")[0].contentWindow.widgetmobile.New(conf, parentId); // appel d'une fonction dans une iframe

		if (obj!=null) {
      designmobile.addWidgetsList(obj, globalcontrol, true);
      obj.globalcontrol = globalcontrol;
    	return obj;
			}
  	return false;
	},

  // add widget to the WidgetsList
  addWidgetsList: function(o, globalcontrol, child) {

    var type=o.conf.getAttribute('type');
    //var desc=o.conf.getAttribute('desc');

    //w_current = o;
    
    var tr=$('<tr/>');
    tr.get(0).obj = o;
    if (globalcontrol) tr.css("color", "#FF0000"); // si globalcontrol == "true" c'est que le control/widget est lié au design et pas a la page elle même
    if (child) tr.css("color", "#0000FF"); // si child == "true" c'est que le control/widget est lié a un widget "content"
  
    var th=$('<th>' + type + '</th>');
    tr.append(th);
    tr.click(function() {
      //editWidgetMobile(this.obj.w, this.obj);
      editWidgetMobile(this.obj);
		});
  
    var td=$('<td><span>' + o.conf.getAttribute('text') + '</span></td>');
    tr.append(td);
  
    var bpviewxml =$('<td><button>Xml</button></td>');

    //if (_superuser) tr.append(bpviewxml);
    tr.append(bpviewxml);
  
    bpviewxml.click(function() {
      console.log("XML", this.parentNode.obj.conf);
      $('#tab-design-mobile-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(this.parentNode.obj.conf) + "</textarea>");
      $('#tab-design-mobile-fluxxml').dialog({ 
        width: 812,
        modal: true,
        buttons: [
          { text: tr("Close"), click: function() { $( this ).dialog("close"); } }
        ]
    });
    });


    $("#tab-design-mobile-widgets-list tbody").append(tr);

	},

  // Add a new design
	addDesign: function()
	{
		var name=prompt(tr('Enter name for new design'),'default');
    var version = 'mobile'; // TODO tab_config[defaultVersionMobile'] = 'mobile' ?? TODO a gérer aussi dans setup_design.js et design_technique.php ... 
		if (name!=null) {
			req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=createdesign&name=' + name + '&ver=' + version + '&mobile=true', dataType: 'xml',
				success: function(responseXML, status) {
					var xmlResponse = responseXML.documentElement;
					if (xmlResponse.getAttribute('status') != 'error') {
						designmobile.loadDesignList();
						designmobile.load(name, 'mobile');
					}
					else {
						messageBox(tr("Unable to create design: ")+xmlResponse.textContent, "Error", "alert");
    }
	},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					messageBox(tr("Unable to create design: ")+textStatus, "Error", "alert");
				}
			});
		}
	},
	// Add a new page
	addPage: function()	{
		var pageID=prompt(tr('Enter ID for new page'),'');
		if (pageID!=null) {
			var pageTitle=prompt(tr('Enter title for new page'),'');
			if (pageTitle!=null)	{

				var newpage = designmobile.config.createElement('page');
				newpage.setAttribute('id', pageID);
				newpage.setAttribute('title', pageTitle);
				$('pages', designmobile.config).append(newpage);

				designmobile.refreshPageList();
        var page = $("#framemobile")[0].contentWindow.widgetmobile.addPage(pageID, pageTitle); // appel d'une fonction dans une iframe

        designmobile.pageList[pageID]["title"] = pageTitle;
        designmobile.pageList[pageID]["load"] = false;

				designmobile.draw(pageID);

				setTimeout('$("#tab-design-mobile-page-list").val("' + pageID + '")', 100); // workaround for IE bug
			}
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
				}
				else
					$('#tab-design-mobile-design-list').text('Unable to load design list: '+xmlResponse.textContent);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				messageBox(tr('Unable to load design list: ')+textStatus, "Error", "alert");
			}
		});
	},
	// Display design XML in a window
	displayXML: function() {
	  $('#tab-design-mobile-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(designmobile.config) + "</textarea>");
	  $('#tab-design-mobile-fluxxml').dialog({ 
	  	width: 812,
			modal: true,
			buttons: [
        { text: tr("Close"), click: function() { $( this ).dialog("close"); } }
      ]
	  });
	},
}

function newWidgetMobile(type) {
  var conf = designmobile.config.createElement('control');
	conf.setAttribute('name', type);
	//conf.setAttribute('title', pageTitle);

  console.log("newWidgetMobile0 ", type,  designmobile.config, designmobile.currentPage, $('page[id='+designmobile.currentPage+']', designmobile.config));
	$('page[id='+designmobile.currentPage+']', designmobile.config).each(function() {
		this.appendChild(conf);
	});

  conf.setAttribute('type', type);
  conf.setAttribute('text', type);

  conf.setAttribute('prepend', $("#prepend-add-widget-mobile").is(':checked'));

  updateWidgetMobile(conf);

  var parentId = null;
  if (w_current && w_current.get(0).conf.getAttribute('type') == 'fieldcontain') {
    parentId = w_current.get(0).conf.getAttribute('id');//"control_" + w_current.get(0).conf.getAttribute('num_id');
  }
  var widget = $("#framemobile")[0].contentWindow.widgetmobile.New(conf, parentId); // appel d'une fonction dans une iframe

  conf = widget.get(0).conf;
  console.log("New Widget", conf, widget);
  w_current = widget;

  var tr=$('<tr/>');
  tr.get(0).obj = widget;

  var th=$('<th>' + type + '</th>');
  tr.append(th);
  tr.click(function() {
    console.log("click",this.obj);
    editWidgetMobile(this.obj);
  });

  var td=$('<td><span>' + conf.getAttribute('text') + '</span></td>');
  tr.append(td);

  var bpviewxml =$('<td><button>Xml</button></td>');
  //if (_superuser) tr.append(bpviewxml);
  tr.append(bpviewxml);

  bpviewxml.click(function() {
    console.log("XML", this.parentNode.obj.conf);
    $('#tab-design-mobile-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(this.parentNode.obj.conf) + "</textarea>");
    $('#tab-design-mobile-fluxxml').dialog({ 
      width: 812,
      modal: true,
      buttons: [
        { text: tr("Close"), click: function() { $( this ).dialog("close"); } }
      ]
    });
  });


  $("#tab-design-mobile-widgets-list tbody").append(tr);
  editWidgetMobile(widget.get(0));
}

function updateWidgetMobile(conf) {
  var type = conf.getAttribute('type') ;
  if (type == 'list-divider') type = 'button';
  $('#rightContent_mobile .header').text(type);

  $('.show', '#rightContent_mobile').removeClass('show').hide();
  $('#widget-mobile-' + type + '-dialog').addClass('show').show();

/*
 * cf. http://jquerymobile.com/demos/1.1.1/docs/api/data-attributes.html
 *
 */

  switch (type) {
    case 'slider':
      //conf.setAttribute('num_id', $("#widget-mobile-slider-num_id").text());
      //conf.setAttribute('text', $("#widget-mobile-slider-text").val());
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-slider-dialog').val() == "true") );
      conf.setAttribute('highlight', $("#widget-mobile-slider-highlight").is(':checked'));
      conf.setAttribute('min', $("#widget-mobile-slider-min").val());
      conf.setAttribute('max', $("#widget-mobile-slider-max").val());
      conf.setAttribute('theme', $('.themes', '#widget-mobile-' + type + '-dialog').val());
      conf.setAttribute('tracktheme', $('.trackthemes', '#widget-mobile-' + type + '-dialog').val());
      break;
    case 'toggleswicth':
      //conf.setAttribute('text', $("#widget-mobile-toggleswicth-text").val());
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-toggleswicth-dialog').val() == "true"));
      conf.setAttribute('textOff', $("#widget-mobile-toggleswicth-textOff").val());
      conf.setAttribute('textOn', $("#widget-mobile-toggleswicth-textOn").val());
      conf.setAttribute('theme', $('.themes', '#widget-mobile-' + type + '-dialog').val());

      //conf.setAttribute('track-theme', $('.track-theme', '#widget-mobile-' + type + '-dialog').val());
      break; 
    case 'listview':
      break;
    case 'controlgroup':
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-' + type + '-dialog').val() == "true"));
      conf.setAttribute('type', 'vertical'); //horizontal | vertical
      break;
    case 'list-divider':
    case 'button':
      //conf.setAttribute('num_id', $("#widget-mobile-slider-num_id").text());
      //conf.setAttribute('text', $("#widget-mobile-button-text").val());
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-' + type + '-dialog').val() == "true"));
      conf.setAttribute('link', $("#widget-mobile-button-link").val());
      conf.setAttribute('icon', $('.icon', '#widget-mobile-' + type + '-dialog').val());
      conf.setAttribute('iconpos', $('.iconpos', '#widget-mobile-' + type + '-dialog').val());//$("#widget-mobile-slider-iconpos").val();

      conf.setAttribute('transition', $('.transitions', '#widget-mobile-' + type + '-dialog').val());
      // si "link" : transition =	fade | flip | flow | pop | slide | slidedown | slidefade | slideup | turn | none
      conf.setAttribute('inline', ($('.inline', '#widget-mobile-' + type + '-dialog').val() == "true"));

      conf.setAttribute('theme', $('.themes', '#widget-mobile-' + type + '-dialog').val());
      conf.setAttribute('type', $("#widget-mobile-slider-type").val());
      conf.setAttribute('role', type);//$("#widget-mobile-slider-role").val();
      conf.setAttribute('type', "button");
// TODO new à gérer
      conf.setAttribute('corners', true);
      conf.setAttribute('iconshadow', true);
      conf.setAttribute('shadow', true);
      break;
    case 'radioswicth':
      break;
    case 'select':
      break;
    case 'text':
      break;
    case 'html':
      break;
    case 'fieldcontain':
      //role="fieldcontain"
      break;
  }
  return conf;
}

function editWidgetMobile(obj) {
  var conf = obj.conf;
  var type = conf.getAttribute('type');
  w_current = $(obj);

  //$("#framemobile")[0].contentWindow.widgetmobile.removeSelected();
  iframemobile_window.widgetmobile.removeSelected();
  w_current.addClass("selected");

  $('#rightContent_mobile .header').text(type);

  $('.show', '#rightContent_mobile').removeClass('show').hide();
  $('#widget-mobile-' + type + '-dialog').addClass('show').show();
  
  switch (type) {
    case 'slider':
      $("#widget-mobile-slider-num_id").text(conf.getAttribute('num_id'));
      $("#widget-mobile-slider-text").val(conf.getAttribute('text'));
      $('.mini', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('mini'))
      $("#widget-mobile-slider-highlight").removeAttr('checked');
      if (conf.getAttribute('highlight') == "true") $("#widget-mobile-slider-highlight").attr('checked', 'checked');
      $("#widget-mobile-slider-min").val(conf.getAttribute('min'));
      $("#widget-mobile-slider-max").val(conf.getAttribute('max'));
      $('.themes', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('theme'));
      break;
    case 'toggleswicth':
      $("#widget-mobile-toggleswicth-text").val(conf.getAttribute('text')); 
      $('.mini', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('mini'))
      $("#widget-mobile-toggleswicth-textOff").val(conf.getAttribute('textOff'));
      $("#widget-mobile-toggleswicth-textOn").val(conf.getAttribute('textOn'));
      $('.themes', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('theme'));
      break; 
    case 'listview':
      break;
    case 'controlgroup':
      break;
    case 'list-divider':
    case 'button':
      $("#widget-mobile-button-num_id").text(conf.getAttribute('num_id'));
      $("#widget-mobile-button-text").val(conf.getAttribute('text'));
      $('.mini', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('mini'))
      $("#widget-mobile-button-link").val(conf.getAttribute('link'));
      $('.icon', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('icon'));
      $('.iconpos', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('iconpos'));

      $('.transitions', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('transitions'));
      $('.inline', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('inline'));
    
      $('.themes', '#widget-mobile-' + type + '-dialog').val(conf.getAttribute('theme'));
      $("#widget-mobile-slider-type").val(conf.getAttribute('type'));
      break;
    case 'radioswicth':
      break;
    case 'select':
      break;
    case 'text':
      break;
    case 'html':
      break;
    case 'fieldcontain':
      break;
  };
  console.log("Edit", conf.getAttribute('type'), conf, obj);
  return false;
}

function applyModifcationCurrentWidgetMobile() {
    
  var widget = $("#framemobile")[0].contentWindow.widgetmobile.Edit(w_current);

  var conf = w_current.get(0).conf;
  var obj = w_current; // w_current.get(0).conf.getAttribute('obj');
  
  var type = conf.getAttribute('type') ;

  switch (type) {
      case 'slider':
      //conf.setAttribute('num_id', $("#widget-mobile-slider-num_id").text());
      //conf.setAttribute('text', $("#widget-mobile-slider-text").val());
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-slider-dialog').val() == "true") );
      conf.setAttribute('highlight', $("#widget-mobile-slider-highlight").is(':checked'));
      conf.setAttribute('min', $("#widget-mobile-slider-min").val());
      conf.setAttribute('max', $("#widget-mobile-slider-max").val());
      conf.setAttribute('theme', $('.themes', '#widget-mobile-' + type + '-dialog').val());
      conf.setAttribute('tracktheme', $('.trackthemes', '#widget-mobile-' + type + '-dialog').val());
        break;
      case 'toggleswicth':
      //conf.setAttribute('text', $("#widget-mobile-toggleswicth-text").val());
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-toggleswicth-dialog').val() == "true"));
      conf.setAttribute('textOff', $("#widget-mobile-toggleswicth-textOff").val());
      conf.setAttribute('textOn', $("#widget-mobile-toggleswicth-textOn").val());
      conf.setAttribute('theme', $('.themes', '#widget-mobile-' + type + '-dialog').val());
      //conf.setAttribute('track-theme', $('.track-theme', '#widget-mobile-' + type + '-dialog').val());
        break; 
      case 'listview':
      break;
    case 'controlgroup':
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-' + type + '-dialog').val() == "true"));
      conf.setAttribute('type', 'vertical'); //horizontal | vertical
        break;
      case 'list-divider':
      case 'button':
      //conf.setAttribute('num_id', $("#widget-mobile-slider-num_id").text());
      //conf.setAttribute('text', $("#widget-mobile-button-text").val());
      conf.setAttribute('mini', ($('.mini', '#widget-mobile-' + type + '-dialog').val() == "true"));
      conf.setAttribute('link', $("#widget-mobile-button-link").val());
      conf.setAttribute('icon', $('.icon', '#widget-mobile-' + type + '-dialog').val());
      conf.setAttribute('iconpos', $('.iconpos', '#widget-mobile-' + type + '-dialog').val());//$("#widget-mobile-slider-iconpos").val();

      conf.setAttribute('transition', $('.transitions', '#widget-mobile-' + type + '-dialog').val());
      // si "link" : transition =	fade | flip | flow | pop | slide | slidedown | slidefade | slideup | turn | none
      conf.setAttribute('inline', ($('.inline', '#widget-mobile-' + type + '-dialog').val() == "true"));

      conf.setAttribute('theme', $('.themes', '#widget-mobile-' + type + '-dialog').val());
      conf.setAttribute('type', $("#widget-mobile-slider-type").val());
      conf.setAttribute('role', type);//$("#widget-mobile-slider-role").val();
      conf.setAttribute('type', "button");
// TODO new à gérer
      conf.setAttribute('corners', true);
      conf.setAttribute('iconshadow', true);
      conf.setAttribute('shadow', true);


      var icon = ($('.icon', '#widget-mobile-button-dialog').val())?$('.icon', '#widget-mobile-button-dialog').val():"";
  
      obj.buttonMarkup({
        icon: icon,
        iconpos: $('.iconpos', '#widget-mobile-button-dialog').val(),
        inline: ($('.inline', '#widget-mobile-button-dialog').val() == "true"), 
        mini: ($('.mini', '#widget-mobile-button-dialog').val() == "true"),
        theme: $('.themes', '#widget-mobile-button-dialog').val(),
        //text : $("#widget-mobile-button-text").val() 
      });//.button('refresh');
      $(".ui-btn-text", obj).text($("#widget-mobile-button-text").val());


        break;
      case 'radioswicth':
        break;
      case 'select':
        break;
      case 'text':
        break;
      case 'html':
        break;
    case 'fieldcontain':
      //role="fieldcontain"
      break;
  }
  return conf;
}

jQuery(function($) {

  designmobile.loadDesignList();

  w_current = null;
  framemobile = $( "#framemobile" ).contents();
  iframemobile_window = $( "#framemobile" )[0].contentWindow;
  //This is a bug in JQM. Header initialization is using a live pagecreate handler on the page
  //ideally we should be able to write iframe_window.$(".swatch:last").trigger("create");
  //iframemobile_window.$( ".ui-page" ).trigger( "pagecreate" );

  $("button", "#tab-design-properties").button();
  $(".displayXML").button(); 
  
	$("#button-add-new-page-mobile").click(function() {
		designmobile.addPage();
	});

  $("#button-refresh-widget-mobile").button();
  $("#button-refresh-widget-mobile").click(function() {
    $( '#framemobile' ).attr( 'src', function ( i, val ) { return val; });
  });

/* Change la résolution soit donc la "taille" de l'iframe */
  $("#tab-design-mobile-screen-resolution").val("320_480"); // en dur pour les test ...
  $("#tab-design-mobile-screen-resolution").change(function() {
    $("#tab-design-mobile-screen-orientation").val("portrait");
    var resol = $(this).val();
    resol = resol.split("_");
    $("#framemobile").css("width", resol[0]).css("height", resol[1]);    
  });
  $("#tab-design-mobile-screen-orientation").change(function() {
    var resol = $("#tab-design-mobile-screen-resolution").val();
    resol = resol.split("_");
    if ($(this).val() == "landscape")
      $("#framemobile").css("width", resol[1]).css("height", resol[0]);
    else
      $("#framemobile").css("width", resol[0]).css("height", resol[1]);    
  });
  /* Widgets List */
  $("#show-list-widgets-design-mobile-checkbox").change(function() {
    $('#tab-design-mobile-list-widgets').toggle();
    if( $('#tab-design-mobile-list-widgets').is(':visible') )
      $('#show-list-widgets-design-mobile-checkbox').attr('checked','1');
    else
      $('#show-list-widgets-design-mobile-checkbox').removeAttr('checked');
  });
  $("#show-list-widgets-design-mobile-checkbox").click(function() {
    $('#show-list-widgets-design-mobile-checkbox').change();
  });
  $("#show-list-widgets-design-mobile").click(function() {
    $('#show-list-widgets-design-mobile-checkbox').change();
  });
  $("#tab-design-mobile-list-widgets .minus").click(function() {
    $('#show-list-widgets-design-mobile-checkbox').change();
  });

  $("#list-widget-mobile").change(function() {
    newWidgetMobile(this.value);
    this.value = '';
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
  $("#button-clone-widget-mobile").click(function() {
  });

	$("#widget-mobile-apply").button({
		icons: {
			primary: "ui-icon-check"
		}
	});
	$("#widget-mobile-apply").click(function() {
/*
    var icon = ($('.icon', '#widget-mobile-button-dialog').val())?$('.icon', '#widget-mobile-button-dialog').val():"";
    var obj = w_current; // w_current.get(0).conf.getAttribute('obj'); 
    obj.buttonMarkup({
      icon: icon,
      iconpos: $('.iconpos', '#widget-mobile-button-dialog').val(),
      inline: ($('.inline', '#widget-mobile-button-dialog').val() == "true"), 
      mini: ($('.mini', '#widget-mobile-button-dialog').val() == "true"),
      theme: $('.themes', '#widget-mobile-button-dialog').val(),
      //text : $("#widget-mobile-button-text").val() 
    });//.button('refresh');
    $(".ui-btn-text", obj).text($("#widget-mobile-button-text").val());
*/
    applyModifcationCurrentWidgetMobile();
    
	});
  
	$("#widget-mobile-delete").button({
		icons: {
			primary: "ui-icon-closethick"
		}
	});
	$("#widget-mobile-delete").click(function() {
    //var type = w_current.get(0).conf.getAttribute('type');
    w_current.remove();
    // TODO supprimer de la liste des widget aussi ...
    $('.show', '#rightContent_mobile').removeClass('show').hide();
	});

	$("#widget-mobile-clone").button({
		icons: {
			primary: "ui-icon-copy"
		}
	});
	$("#widget-mobile-clone").click(function() {
    alert("TODO...");
	});

  $( ".accordion" ).accordion({
    icons: {
			header: "ui-icon-circle-plus",
			headerSelected: "ui-icon-circle-minus"
		},
    autoHeight: false
  });
  $(".accordion .del").button({
		icons: {
			primary: "ui-icon-trash"
		}
	});
	$(".accordion .val").button({
		icons: {
			primary: "ui-icon-check"
		}
	});


/*  $('.radio-set input:first').button( { text: false, icons: {primary:'ui-icon-arrowthick-1-w'} })
    .next().button( { text: false, icons: {primary:'ui-icon-arrowthick-1-n'} })
    .next().button( { text: false, icons: {primary:'ui-icon-arrowthick-1-s'} })
    .next().button( { text: false, icons: {primary:'ui-icon-arrowthick-1-e'} })
    .parent().buttonset();
*/

	$("#button-add-new-page-mobile").click(function() {
		designmobile.addPage();
	});

	$("#button-remove-page-mobile").click(function() {
		//designmobile.removeCurrentZone();
    alert("TODO...");
	});
	
	$("#button-save-design-mobile").click(function() {
		designmobile.save();
	});

	$("#button-add-design-mobile").click(function() {
		designmobile.addDesign();
	});


	$(".adddivider", "#widget-mobile-listview-dialog").click(function() {
		var accordion = $(".accordion", "#widget-mobile-listview-dialog");
    var h3 = $("h3:first", accordion).clone();
    accordion.append(h3);
    var div = $("div:first", accordion).clone();
    accordion.append(div);
    $(".del", div).show();
    var active = div.accordion('option', 'active'); //pour garder celle active 
    accordion.accordion('destroy').accordion({
      icons: {
  			header: "ui-icon-circle-plus",
  			headerSelected: "ui-icon-circle-minus"
  		},
      autoHeight: false,
      active: active
    });
    var items = [];
    var obj = $('<li data-role="list-divider">Divider</li>');
    $(".del", div).get(0).obj = obj;
    $(".del", div).get(0).h3 = h3;
    $(".del", div).get(0).div = div;
    $(".val", div).get(0).obj = obj; 
    items[0] = obj; 
    $("#framemobile")[0].contentWindow.widgetmobile.addTo(w_current, items); // appel d'une fonction dans une iframe

    $(".val", div).click(function() {
      var obj = this.obj;
      var tabletbody = $(this).parent().parent().parent();
      console.log( "toto ", obj, obj.conf, tabletbody);
      obj.text($('.text-divider', tabletbody).val());
    });
    $(".del", div).click(function() {
      var obj = this.obj;
      obj.remove();
      obj.conf.remove();
      // TODO delete liste widget
      this.h3.remove();
      this.div.remove();
    });

    return false;    
	});
	$(".addbutton", "#widget-mobile-listview-dialog").click(function() {
		var accordion = $(".accordion", "#widget-mobile-listview-dialog");
    var h3 = $("h3:eq(1)", accordion).clone();
    accordion.append(h3);
    var div = $("div:eq(1)", accordion).clone();
    accordion.append(div);
    $(".del", div).show();
    var active = div.accordion('option', 'active'); //pour garder celle active 
    accordion.accordion('destroy').accordion({
      icons: {
  			header: "ui-icon-circle-plus",
  			headerSelected: "ui-icon-circle-minus"
  		},
      autoHeight: false,
      active: active
    });
    var items = [];
    var obj = $('<li><a href="#home">Go to Home</a></li>');
    $(".del", div).get(0).obj = obj;
    $(".del", div).get(0).h3 = h3;
    $(".del", div).get(0).div = div;
    $(".val", div).get(0).obj = obj;
    items[0] = obj; 
    $("#framemobile")[0].contentWindow.widgetmobile.addTo(w_current, items); // appel d'une fonction dans une iframe

    $(".val", div).click(function() {
      var obj = this.obj;
      var tabletbody = $(this).parent().parent().parent();
      console.log( "toto ", obj, obj.conf, tabletbody);
      $('a', obj).text($('.text-button', tabletbody).val()).attr('href', "#" + $('#widget-mobile-button-type', tabletbody).val());
    });
    $(".del", div).click(function() {
      var obj = this.obj;
      obj.remove();
      obj.conf.remove();
      // TODO delete liste widget
      this.h3.remove();
      this.div.remove();
    });

    return false;
	});


	designmobile.load($('#tab-design-mobile-design-list').val(), 'mobile' ); // TODO tab_config[defaultVersionMobile'] = 'mobile' ??
	designmobile.draw($('#tab-design-mobile-page-list').val()); // tab-design-mobile-page-list
	//designmobile.displayDesignProperties();


	loading.hide();
});
