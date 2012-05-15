/*
 * ce script doit servir pour :
 *  - dans l'iframe être appellé par l'écran en désign pour "dupliquer" un "template" de widget tel que Boutton / slider / menu ... TODO : définir la liste
 *    => dans l' ancienne version de KnxWebMobile : data-role="list-divider", send (BP envoi une valeur), switch, dimmer, text, thermostat, shutters, goto, html
 *    =>  listview ( + data-role="list-divider") (action possible : "goto") , button ( nombre : alone 1 ou group de 2 à 3, avec text et/ou icone ) , slider (min = 0 , max à définir) ,
 *     radioswicth, select (typevalue = % et step/pas = 10 => 0 à 100 %),
 *     toogleswitch (label :on/off), text, (à voir pour html)  
 *      pour chacun : parmètre mini yes/no, label yes/no, actions (goto ou "actionlist")    
 *  - pour chaque widget retourner un ID et une "position" pour gérer l'ordre dans la page (ex: ordonner les menus en drag&drop => sortable en jqueryui cf. http://jqueryui.com/demos/sortable/#placeholder ...)
 *    
 * ensuite cela stock dans design/+tab_config['defaultDesign']+/mobile.xml les infos
 * le découpage du xml est le suivant 
 * 
<config> // width="320" height="480" sont automatiquement gérer par jquerymobile 
  <pages>
    <page num_id="0" name="page0" title="">
      <header> (que 1 control de type ="button")
        <control type="button" num_id="2" name="" desc="" ...>
          <actionlist id=""/>
        </control>
      </header>
      <control type="slider" num_id="0" name="" desc="" ...>
        <actionlist id=""/>
      </control>
      ...
      <footer>
        <control type="button" num_id="1" name="" desc="" ...>
          <actionlist id=""/>
        </control>
        ...
      </footer>
    </page>
  </pages>
</config>

 * => besoin liste les pages et le num_id qui soit unique ... idem pour les "control"
 * => creer mobile.xml avec le "pattern" décrit plus haut si le fichier n'existe pas à gérer dans le php design_mobile.php ...


var iframe = document.getElementById('my_iframe');
if(iframe) iframe.src = "javascript:ma_fonction();";

cf. http://www.developpez.net/forums/d271424/webmasters-developpement-web/contribuez/faq-transferer-informations-fenetre-parent-fenetre-enfant/ 


cf. doc pour les "events" : http://jquerymobile.com/demos/1.1.0/docs/api/events.html

 */

//var _version = tab_config['defaultDesign']+'/'+tab_config['defaultVersion'];
//var _version = tab_config['defaultDesign']+'/mobile'; // TODO ajouter common.js et gérer aussi "tab_config" ...
var _version = 'design/mobile';

_visuMobile = true;
//_currentPage = "page0";
_currentPage = "newPage";

var widgetmobile = {
	config: null,
  version: null,
  incControl: 0,
  incPage: 0,
  tabPages: [],
  tabControls: [],
  
	// Set XML config of design
	setConfig: function(doc, name) {
		this.config = doc; // flux xml complet du "design" 
		this.version = name;
	},
	getVersion: function() {
		return this.version;
	},

	widgetList: {
	  'slider' : 'Slider',
	  'toggleswicth' : 'Flip toggle switch', // c'est un select "spécial"
	  'listview' : 'List',
	  'list-divider' : 'List divider',
	  'button' : 'Button',
    'controlgroup' : 'Button Group',
	  'radioswicth' : 'Radio swicth',
	  'select' : 'Select',
	  'text' : 'Text',
	  'html' : 'Html', 
	},
	// Load design
	New: function(w)	{
    this.incControl ++;
    console.log("New widgetmobile ",w['type']," N°",this.incControl, w );
    var div;
		switch (w['type']) {
      case 'slider':
      	div = widgetmobile.slider(w);
        break;
      case 'toggleswicth':
      	div = widgetmobile.toggleswicth(w);
        break; 
      case 'listview':
      	div = widgetmobile.listview(w);
        break;
      case 'list-divider':
      	div = 'TODO ...' + w['type'];
        break;
      case 'controlgroup':
      	div = widgetmobile.controlgroup(w);
        break;
      case 'button':
      	div = widgetmobile.button(w);
        break;
      case 'radioswicth':
      	div = 'TODO ...' + w['type'];
        break;
      case 'select':
      	div = 'TODO ...' + w['type'];
        break;
      case 'text':
      	div = widgetmobile.text(w);;
        break;
      case 'html':
      	//div = widgetmobile.html(w);
      	div = widgetmobile.sliderTST(w);
        break;
    }
    /*
    if (w['prepend'])
      $("#content", "#" + _currentPage).prepend(div.get(0));
    else
      $("#content", "#" + _currentPage).append(div.get(0));
    */

    if (w['prepend']) {
      div.prependTo( "#" + _currentPage + " .content" ).trigger( "create" );
      //div.prependTo( "#" + _currentPage + " .content" );
    } else {
      div.appendTo( "#" + _currentPage + " .content" ).trigger( "create" );
      //div.appendTo( "#" + _currentPage + " .content" );
    }

    this.tabControls[this.incControl] = div;
	},

  // Load design
	Edit: function(w)	{
    //this.incControl ++;
    var div;
		switch (w['type']) {
      case 'slider':
      	div = widgetmobile.slider(w, true);
        div.slider('refresh');
        break;
      case 'toggleswicth':
      	div = widgetmobile.toggleswicth(w, true);
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
    }
	},

	// Slider
	slider: function(w, edit)	{

    if (!w['mini']) w['mini'] = "true";
    if (!w['highlight']) w['highlight'] = "true";
    var id = "control_"+this.incControl;
    var html = '';
    if (!edit) {
      if (!w['max']) w['max'] = 100;
      if (!w['text']) w['text'] = "Input slider:"; // TODO pour les tests à enlever !!

      html+= '<label for="' + id + '">' + w['text'] + '</label>';
      html+= '<input type="range" name="slider" id="' + id + '" value="60" min="0" max="' + w['max'] + '" data-highlight="' + w['highlight'] + '" data-mini="' + w['mini'] + '" />';

      //var input_slider = $('<label for="' + id + '">' + w['text'] + '</label><input type="range" name="slider" id="' + id + '" value="60" min="0" max="' + w['max'] + '" data-highlight="' + w['highlight'] + '" data-mini="' + w['mini'] + '" />');
      var input_slider = $(html);
//data-highlight="' + w['highlight'] + '" data-mini="' + w['mini'] + '"
      w['num_id'] = this.incControl;
      var slider = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
      slider.append(input_slider);
      w['obj'] = $('input', slider);

    } else { // Edit Mode
      //var slider = $("#" + w['id'] );
      var slider = this.tabControls[w['num_id']];
    }

    //$('input', slider).slider();
    //$('input', slider).slider({ mini: w['mini'], highlight: w['highlight'] });  => fonctionne !!!! mais que pour le slider pas le "label" et la zone en saisie pour le "chiffre"
    //$("#"+id, slider).slider({ mini: w['mini'], highlight: w['highlight'] });  // disabled: "true"
    //$('input', slider).slider('refresh');

    /*
    $( ".selector" ).bind( "change", function(event, ui) {
      ...
    });
    */

    return slider;
	},
  // Slider tst
	sliderTST: function(w, edit)	{
    if (!edit) {
      var slider = $("#slider-0").parent().clone();
      $("input", slider).attr("id", "control_"+this.incControl);
      $("label", slider).attr("for", "control_"+this.incControl);
      $("label", slider).attr("id", "control_"+this.incControl+"-label");
      w['num_id'] = this.incControl;
    } else {
      //var slider = $("#" + w['id'] );
      var slider = this.tabControls[w['num_id']];
    }
    console.log(slider);
    //$("input", slider).attr("data-highlight", "true");
    //$("input", slider).attr("data-mini", "true");
    //$("input", slider).slider('refresh');
    //$("input", slider).slider();
    return slider;
	},

	// Toggle swicth
	toggleswicth: function(w, edit)	{
/*
<div class="containing-element">
  <label for="flip-a">Select slider:</label>
  <select name="slider" id="flip-a" data-role="slider">
  	<option value="off">Off</option>
  	<option value="on">On</option>
  </select>
</div>

quand les "labels" sont "grand" il faut modifier le css genre :
.containing-element .ui-slider-switch { width: 9em }
ou de façon globale à tous :
ui-field-contain div.ui-slider-switch { width: […]; }
TODO : à voir comment gérer ça ...
 
*/
    if (!w['mini']) w['mini'] = "true";
    var id = "control_"+this.incControl;
    var html = '';

    if (!edit) {
      if (!w['val1_label']) { if (!w['val1']) w['val1_label'] = "Off"; else w['val1_label'] = w['val1']; }
      if (!w['val1']) w['val1'] = "off";
      if (!w['val2_label']) { if (!w['val2']) w['val2_label'] = "On"; else w['val2_label'] = w['val2']; }
      if (!w['val2']) w['val2'] = "on";

      if (!w['text']) w['text'] = "Select slider:"; // TODO pour les tests à enlever !!

      html+= '<label for="' + id + '">' + w['text'] + '</label>';
      html+= '<select name="slider" id="' + id + '" data-role="slider" data-mini="' + w['mini'] + '" ><option value="' + w['val1'] + '">' + w['val1_label'] + '</option><option value="' + w['val2'] + '">' + w['val1_label'] + '</option></select>'; 

      var select_toggleswicth = $(html);

      w['num_id'] = this.incControl;
      var toggleswicth  = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
      toggleswicth.append(select_toggleswicth);
      w['obj'] = $('input', toggleswicth );

    } else { // Edit Mode
      var toggleswicth = this.tabControls[w['num_id']];
      //$('.selector').slider('refresh');
    }

    /*
    $( ".selector" ).bind( "change", function(event, ui) {
      ...
    });
    */

    return toggleswicth;
	},

	// listview
	listview: function(w, edit)	{ // ensemble de "button"
/*
<ul data-role="listview" data-theme="g">
	<li><a href="acura.html">Acura</a></li>
	<li><a href="audi.html">Audi</a></li>
	<li><a href="bmw.html">BMW</a></li>
</ul>

<ul data-role="listview" data-inset="true" >
  <li data-role="list-divider">RDC</li>
  <li><a href="#newPage">newPage</a></li>
  <li><a href="#pagemodel">pagemodel</a></li>
  <li><a href="#newPage1">Salon</a></li>
  <li><a href="#page0">Salon</a></li>
  <li data-role="list-divider">Extérieur</li>
  <li><a href="#page0" >Jardin</a></li>
</ul>

$('#mylist').listview();
$('#mylist').listview('refresh');
*/
    if (!w['mini']) w['mini'] = "true";
    var id = "control_"+this.incControl;
    var html = '';

    var listview = $('<ul data-role="listview" data-inset="true" id="' + id + '" ><li data-role="list-divider">' + w['text'] + '</li><li><a href="#page0">Page0</a></li></ul>');
    //var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
    var div = $('<div/>');
    div.append(listview);
		return div;
	},

	// button
	button: function(w, edit)	{
/*
$('a').buttonMarkup({ icon: "star" , iconpos: "right", iconshadow: "false", shadow: "false"});
$('[type='submit']').button('refresh');
$( ".myButton" ).bind( "click", function(event, ui) {
  ...
});
icon list : 
Left arrow - data-icon="arrow-l"
Right arrow - data-icon="arrow-r"
Up arrow - data-icon="arrow-u"
Down arrow - data-icon="arrow-d"
Delete - data-icon="delete"
Plus - data-icon="plus"
Minus - data-icon="minus"
Check - data-icon="check"
Gear - data-icon="gear"
Refresh - data-icon="refresh"
Forward - data-icon="forward"
Back - data-icon="back"
Grid - data-icon="grid"
Star - data-icon="star"
Alert - data-icon="alert"
Info - data-icon="info"
Home - data-icon="home"
Search - data-icon="search"



*/
    if (!w['mini']) w['mini'] = "true"; // TODO pour les test à supprimer  
    if (!w['link']) w['link'] = "#"; // TODO pour les test à supprimer
    var id = "control_"+this.incControl;
    var html = '';
    if (w['mini']) html+= 'data-mini="' + w['mini'] + '" ';
    if (w['inline']) html+= 'data-inline="' + w['inline'] + '" '; // false => largeur "page" / true => bouton "réduit"
    if (w['icon']) html+= 'data-icon="' + w['icon'] + '" ';
    if (w['iconpos']) html+= 'data-iconpos="' + w['iconpos'] + '" '; // notext/top/bottom/right/left(default)
    if (w['theme']) html+= 'data-theme="' + w['theme'] + '" '; // data-theme="b" => boutton "active" blue color

    var button = $('<a href="' + w['link'] + '" data-role="button" id="' + id + '" ' + html + '>' + w['text'] + '</a>');
    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
    div.append(button);
		return div;
	},


  // controlgroup
	controlgroup: function(w, edit)	{ // ensemble de button
/*
<div data-role="controlgroup">
  <a href="index.html" data-role="button">Yes</a>
  <a href="index.html" data-role="button">No</a>
  <a href="index.html" data-role="button">Maybe</a>
</div>
*/
    var id = "control_"+this.incControl;
    var html = '';
    if (w['mini']) html+= 'data-mini="' + w['mini'] + '" ';
    if (w['type']) html+= 'data-mini="' + w['type'] + '" '; // horizontal

    // TODO a supprimer pour test ajoute des "button" 
    var html2 = '<a href="#" data-role="button">Yes</a><a href="#" data-role="button">No</a><a href="#" data-role="button">Maybe</a>';

    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" ><div data-role="controlgroup" id="' + id + '" ' + html + '>' + html2 + '</div></div>');
		return div;
	},

  // radioswicth
	radioswicth: function(w, edit)	{ // ensemble de 2 bouton radio
/*
<div data-role="fieldcontain">
  <fieldset data-role="controlgroup" data-type="horizontal" >
    <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1"  />
   	<label for="radio-choice-1">I</label>
    <input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2" checked="checked" />
   	<label for="radio-choice-2">O</label>
  </fieldset>
</div>
*/
    if (!w['mini']) w['mini'] = "true";
    var id = "control_"+this.incControl;
    var html = '';

    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" ><div data-role="controlgroup" id="' + id + '" ' + html + '>' + html2 + '</div></div>');

    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" ><div data-role="controlgroup" id="' + id + '" ' + html + '>' + html2 + '</div></div>');
		return div;
	},

	// text
	text: function(w, edit)	{
/*
<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" >
  <div class="ui-grid-a">
    <div class="ui-block-a newtextblockA" id="blockA" ><h3>name du device</h3></div>
    <div class="ui-block-b newtextblockB" id="blockB" >nextextB</div>
  </div>
</div>
*/
    if (!w['mini']) w['mini'] = "true";
    var id = "control_"+this.incControl;
    var html = '';
    html+= '<div class="ui-grid-a" id="' + id + '"><div class="ui-block-a newtextblockA" ><h3>' + w['text'] + '</h3></div><div class="ui-block-b newtextblockB" >' + w['text'] + '</div></div>';
    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" >' + html + '</div>');
		return div;
	},

	// Html
	html: function(w, edit)	{
    if (!edit) {
      var slider = $('<label for="' + this.incControl + '">Input slider:</label><input type="range" name="slider" id="' + this.incControl + '" value="60" min="0" max="100" data-highlight="true" data-mini="true"/>');
      w['num_id'] = this.incControl;
    } else {
      //var slider = $("#" + w['id'] );
      var slider = this.tabControls[w['num_id']];
    }

    $('input', slider).slider();
    //$('.selector').slider({ mini: "true", highlight: "true" }); // disabled: "true"
    //$('input', slider).slider('refresh');
    
    $('input', slider).slider('refresh');

    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
    div.append(slider);

    //slider.appendTo( ".ui-page" ).trigger( "create" );
    //div.appendTo( "#" + _currentPage + " .content" ).trigger( "create" );
    div.appendTo( "#" + _currentPage + " .content" ).trigger( "create" );

    return div;
	},
}

function loadDesign(version)
{
	var url = 'design/'+version+'.xml';
	req = jQuery.ajax({ url: url, dataType: 'xml', cache: false, async: false,
		success: function(responseXML, status) {
			widgetmobile.setConfig(responseXML, version);
			//UIController.drawPage();
		}
	});
}

/*
$(document).bind("mobileinit", function(){
  // indiquer vos paramètres personnalisés ici
  // Lorsque jQuery Mobile commence à être exécuté, il déclenche un événement mobileinit sur l'objet document,
  //  auquel vous pouvez vous lier, via bind, pour ne pas appliquer les paramètres par défaut de jQuery Mobile.
  $.mobile.selectmenu.prototype.options.nativeMenu = false;
  $.mobile.loadingMessage="Chargement";
  $.mobile.pageLoadErrorMessage="Erreur de Chargement de la Page";
  $.mobile.addBackBtn = true;
});
*/  

$(document).ready(function() {

	//test loadDesign(_version); // TODO pour le moment en dur dans le code de la page !!

  
  
  //Démarrer data-icon="home" onlcick="$("#page0").show();$.mobile.changePage("#page0");"

  //test EIBCommunicator.periodicUpdate();
});