
var _version=tab_config['version'];
var _visuMobile=false;   // TODO a gérer mieux que ça ...

var _objectTypesValues = {
	'1.001': ['on','off'],
	'3.007': ['up','down','stop'],
	'3.008': ['close','open','stop'],
	'20.102': ['comfort','standby','night','frost']
}

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

function addMenuSection(id, name)
{
	var menu = $('<div class="menuItem" />');
	menu.click(function () { $('#'+id).toggle() });
	menu.mouseover(function () { this.className='menuItem menuItemOver' });
	menu.mouseout(function () { this.className='menuItem' });
	menu.text(tr(name));
	
	var submenu = $('<div class="subMenuItem" style="display: none;" id="'+id+'"/>');
	$("td.menu").append(menu).append(submenu);
	return submenu;
}

function addScriptMenuSection(id, name,func)
{
	var menu = $('<div class="menuItem" />');
	menu.click(func);
	menu.mouseover(function () { this.className='menuItem menuItemOver' });
	menu.mouseout(function () { this.className='menuItem' });
	menu.text(tr(name));
	
	var submenu = $('<div class="subMenuItem" style="display: none;" id="'+id+'"/>');
	$("td.menu").append(menu).append(submenu);
	return submenu;
}

function displayVersion()
{
	$('.menuTitle').append("<a href='#'><img src='images/settings.gif'/> KnxWeb " + _version + "</a>")
}

function processHTMLTranslate()
{
	$('translate').each(function() { this.innerHTML=tr(this.innerHTML); });
}

function tr(msg)
{
	var cRet = (typeof(i18n)!='undefined') ? i18n[msg] : msg;
	if(!cRet) {
		return "§§§" + msg + "§§§";
	}
	return cRet;
}

function saveConfig()
{
  var now = new Date();
  var month = now.getMonth() + 1;
  var file = prompt( tr("Please enter path and save file name :"), "config-" + now.getFullYear() + "-" + month + "-"+now.getDate() +".xml" );
  
  if (!file) { 
	  alert(tr("Error: No file to write config to"));
	  return;
	} else { 
	  var body = '<admin><save file="' + file + '"/></admin>';
	}
	queryLinknx(body);
	//queryLinknx('<admin><save/></admin>');
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
				return false; // ?? à tester ...
			}
		});
		$('action', responseXML).each(function() {
			if ((this.getAttribute('type')=='set-value')&&(this.getAttribute('id')==id))
			{
				used=true;
				return false;
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
				return false;
			}
		});
		$('action', responseXML).each(function() {
			if ((this.getAttribute('type')=='ioport-tx')&&(this.getAttribute('id')==id))
			{
				used=true;
				return false;
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
	this[0].tableizeOption=option;
	
	this.addClass("tableize");
	$('thead',this).addClass('ui-state-active');

	if (option.selectable)
	{
		$('tbody tr', this).click( function() {
				var checked=$(this).hasClass('row_selected');
				$('#objects-tab-table tr').removeClass('row_selected');
				if (!checked) $(this).addClass('row_selected');
		});
	}
	
	if (option.sortable!=false) this.tablesorter({
		widgets: ['zebra'],
		sortList: [[0,0]]
	}); else
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
						$('#objects-tab-table tr').removeClass('row_selected');
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
       
                loaderContent.css("top", ($(window).height() - loaderContent.height()) / 2);
                loaderContent.css("left", ($(window).width() - loaderContent.width()) / 2);
        
                if (($.browser.msie) && ($.browser.version<7)) $("select").hide();
                
								$("#loaderModal").fadeIn();
        },
        hide: function()
        {
								$("#loaderModal").fadeOut();
                if (($.browser.msie) && ($.browser.version<7)) $("select").show();
        }                                                                 
                
};

function messageBox(message,title,icon) {
	// icon : alert, info, notice, help, mail-open, mail-closed, comment, person, trash, locked, unlocked, home, star, link, cancel, newwin, refresh
  // voir pour ajouter la class ui-state-highlight ou ui-state-error en fonction si "bon ou mauvais" 
	a=$('<div id="dialog-message" title="' + title + '">');
	a.html('<p><span class="ui-icon ui-icon-' + icon + '" style="float:left; margin:0 7px 50px 0;"></span>' + message + '</p>');
	a.dialog({
			width: 350,
			autosize: true,
			resizable: false,
			autoopen: true,
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function(event, ui) {
				$(this).dialog("destroy");
  			$(this).remove();
  	 	}
	});

}

function queryLinknx(message) {
	
	var data;
	var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: message, processData: false, dataType: 'xml',async: false,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') == 'success') {
				data=xmlResponse;
			}
			else 
			{
				messageBox(tr("Error: ")+xmlResponse.textContent, 'Erreur', 'alert');
				data=false;
			}
		}
	});
	return data;
}

function queryKnxweb(action, type, message, callasync) {
	//if (!type) type = 'xml';
  //if (!message) message = '';
  //if (!callasync) callasync = false;
	var data;
	var req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action='+action, data: message, processData: false, dataType: type,async: callasync,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') == 'success') {
				data=xmlResponse;
			}
			else 
			{
				messageBox(tr("Error: ")+xmlResponse.textContent, 'Erreur', 'alert');
				data=false;
			}
		}
	});
	return data;
}

function lz(i) {
	if (i<10) return '0'+i; else return i;
}

/*- Window for create a new widget -*/
function editWidget(widgetType, textWidget) {

  if($('#editWidget')) { $('#editWidget').remove(); }
  
  var divEdit = $('<div id="editWidget" />');
  divEdit.get(0);  

  var widget = UIController.widgetList[widgetType];

  divEdit.dialog( { title: widget.menuText+' - '+textWidget , width: 300});

  widget.prototype.addObjectFields( divEdit , null);
}

/*- Window for list image of a directory -*/
function listImage(DossierImage, Click_img, onOff ) {
	if(!DossierImage)  DossierImage = "template/default/images/";
	if($('#listImage')) { $('#listImage').remove(); }
	
	var divListImage = $('<div id="listImage" />');
	divListImage.get(0);

	divListImage.dialog( { title: 'Select Image' , width: 410,
			close: function(event, ui) {
				$(this).dialog("destroy");
  			$(this).remove();
  	 	}
	});  
	divListImage.empty().append($("<img src='images/loading.gif'/>"));

	req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=filelistdir&name='+DossierImage, dataType: 'xml', 
			success: function(responseXML, status) 
			{
				divListImage.empty();
				var xmlResponse = responseXML.documentElement;
				
				if (xmlResponse.getAttribute('status') != 'error') {
					$('file', responseXML).each(function() {
						var file = $(this).text();
						var re = new RegExp('\.(gif|jpe?g|png)$');
						if (re.test(file)) {
							var idpoint = file.lastIndexOf('.', 100);
							if (onOff && (file.substring(idpoint,idpoint+4) == ".png") && (file.substring(idpoint,idpoint-3) == "_on") ) { // recherche que les "_on" et "_off" en n'en affiche la "paire"
								// ex file = "light_on.png"
								var id = file.lastIndexOf('_', 100); // position du "_" dans le nom
								ext=file.substring(id,id+3);					// ex ext = "_on" ou "_of"
								imgName=file.substring(0,id);	//on garde le nom ex imgName = "light" 	
								//$('#ImgconfWifgetOn'+label.val()).attr('src',DossierImage+imgName+'_on.png' ); //on change l'image dans de fenetre conf
								//$('#ImgconfWifgetOff'+label.val()).attr('src',DossierImage+imgName+'_off.png' );
								var option = $("<img width='32' height='32' src='"+DossierImage+imgName+"_on.png' alt='"+imgName+"_on' title='"+imgName+"_on'/>");
								option.click(
									function () {
										if(Click_img) 	Click_img(DossierImage+file); 
										else{
											return (DossierImage+file); 
										} 
									}
								);
								divListImage.append(option);
								var option2 = $("<img width='32' height='32' src='"+DossierImage+imgName+"_off.png' alt='"+imgName+"_off' title='"+imgName+"_off'/>");
								option2.click(
									function () {
										if(Click_img) 	Click_img(DossierImage+file); 
										else{
											return (DossierImage+file); 
										} 
									}
								);
								divListImage.append(option2);
							}
							if (!onOff) {
								var option = $("<img width='32' height='32' src='"+DossierImage+file+"' alt='"+file+"' title='"+file+"'/>");
								option.click(
									function () {
										if(Click_img) 	Click_img(DossierImage+file); 
										else{
											return (DossierImage+file); 
										} 
									}
								);
								divListImage.append(option);
							}
						}
					});
				}
				else
					divListImage.text(tr("Unable to load: ")+xmlResponse.textContent);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				divListImage.text(tr("Unable to load: ")+textStatus);
			}
	});
}