/*
var _areas = 'areas';
var _area = 'area';
var _device = 'device';
*/
var _areas = 'zones';
var _area = 'zone';
var _device = 'control';

//var _version = "mobile";
//var _version = "default/design";
var _version = tab_config['defaultDesign']+'/'+tab_config['defaultVersion'];

_visuMobile = true;

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
	$('#waitDialog').hide();
}

function gotoZone(id)
{
	UIController.drawZone(id);
}

function loadDesign(version)
{
	var url = 'design/'+version+'.xml';
	req = jQuery.ajax({ url: url, dataType: 'xml', cache: false, async: false,
		success: function(responseXML, status) {
			UIController.setConfig(responseXML, version);
			UIController.drawPage();
		}
	});
}

$(document).bind("mobileinit", function(){
  // indiquer vos paramètres personnalisés ici
  // Lorsque jQuery Mobile commence à être exécuté, il déclenche un événement mobileinit sur l'objet document,
  //  auquel vous pouvez vous lier, via bind, pour ne pas appliquer les paramètres par défaut de jQuery Mobile.
  $.mobile.selectmenu.prototype.options.nativeMenu = false;
  $.mobile.loadingMessage="Chargement";
  $.mobile.pageLoadErrorMessage="Erreur de Chargement de la Page";
  $.mobile.addBackBtn = true;
});  

$(document).ready(function() {

	loadDesign(_version);
  
  $('#waitDialog').append('<br /><a href="#page0" data-role="button" data-theme="b" data-icon="arrow-r" data-iconpos="right" >Start</a>');
  
  //Démarrer data-icon="home" onlcick="$("#page0").show();$.mobile.changePage("#page0");"
  
  EIBCommunicator.periodicUpdate();
  hideWaitDialog();
});