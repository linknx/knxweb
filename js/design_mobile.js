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


cf. http://www.touraineverte.com/jquery-mobile/demos/1.0/docs/api/data-attributes.html
http://www.touraineverte.com/jquery-mobile/demos/1.0/docs/pages/page-dynamic.html



 */

//var _versionMobile = tab_config['defaultDesign']+'/'+tab_config['defaultVersion'];
//var _versionMobile = tab_config['defaultDesign']+'/mobile'; // TODO ajouter common.js et gérer aussi "tab_config" ...
var _versionMobile = 'z/mobile';

_currentPage = "home";

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
  setCurrentPage: function(page) {
    // TODO à tester changer de page ...
    $.mobile.changePage("#"+page);
    _currentPage = page;
  },
  removeSelected: function() {
    $('.selected', '#' + _currentPage).removeClass('selected');
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
    'fieldcontain' : 'Fieldcontain', 
	},
	// Load design
  New: function(conf, parentId)  {
    this.incControl ++;
    console.log("New widgetmobile ",conf.getAttribute("type")," N°",this.incControl, "conf=", conf, "parentId=", parentId);
    conf.setAttribute('num_id', this.incControl);
    var div;

    if (!parentId) {
      parentId = _currentPage + " .content" ;
    }
    conf.setAttribute('parentId', parentId);

    switch (conf.getAttribute('type')) {
      case 'slider':
        div = widgetmobile.slider(conf);
        break;
      case 'toggleswicth':
        div = widgetmobile.toggleswicth(conf);
        break; 
      case 'listview':
        div = widgetmobile.listview(conf);
        break;
      case 'list-divider':
        div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'controlgroup':
        div = widgetmobile.controlgroup(conf);
        break;
      case 'button':
        div = widgetmobile.button(conf);
        break;
      case 'radioswicth':
        div = widgetmobile.radioswicth(conf);
        break;
      case 'select':
        div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'text':
        div = widgetmobile.text(conf);
        break;
      case 'html':
        div = widgetmobile.html(conf);
        break;
      case 'fieldcontain':
        var id = "control_"+this.incControl;
        conf.setAttribute('id',id);
        //div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
        div = $('<div data-role="fieldcontain" />');
        div.click(function(){
          window.parent.editWidgetMobile(this);
          return false; 
        })
        break;
    }
    div.get(0).conf = conf;
/*
    if (conf.getAttribute('prepend') == "true" ) {
      //div.prependTo( "#" + parentId ).trigger( "create" );
      div.prependTo( "#" + parentId );
    } else {
      div.appendTo( "#" + parentId ).trigger( "create" );
    }
*/

    this.tabControls[this.incControl] = div;
    return div;
	},

  // Load design
  Edit: function(div)  {
    var conf = div.get(0).conf;
    console.log("Edit widgetmobile ",conf.getAttribute("type"), "conf=", conf, "div=", div);

    switch (conf.getAttribute('type')) {
      case 'slider':
        div = widgetmobile.slider(conf, true);
        div.slider('refresh');
        break;
      case 'toggleswicth':
        div = widgetmobile.toggleswicth(conf, true);
        break; 
      case 'listview':
        //div = 'TODO ...' + conf.getAttribute('type');
        div.listview('refresh');
        break;
      case 'list-divider':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'button':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'radioswicth':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'select':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'text':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'html':
        //div = 'TODO ...' + conf.getAttribute('type');
        break; 
    }
    //div.trigger('destroy').trigger('create');
    return div;
  },

  addTo: function(obj, items)  { // items can be an array ...
    var conf = obj.get(0).conf;
    console.debug("Add to widgetmobile ",conf.getAttribute("type"), "conf=", conf, "obj=", obj, "items=", items, items.length);
    var div;
    var id = conf.getAttribute('id');
    switch (conf.getAttribute('type')) {
      case 'slider':
        //div = widgetmobile.slider(conf, true);
        obj.slider('refresh');
        break;
      case 'toggleswicth':
        //div = widgetmobile.toggleswicth(conf, true);
        break; 
      case 'listview':
        for (var i=0; i<items.length; i++)
        {
          obj.append(items[i]);
          console.log("items ",items[i]);
        }
        //$('ul', obj).listview('refresh');
        //obj.trigger('refresh');
        $(obj).listview('refresh');
        break;
      case 'list-divider':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'button':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'radioswicth':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'select':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'text':
        //div = 'TODO ...' + conf.getAttribute('type');
        break;
      case 'html':
        //div = 'TODO ...' + conf.getAttribute('type');
        break; 
    }
    //div.trigger('destroy').trigger('create');
    return div;
	},

	// Slider
  slider: function(conf, edit)  {
/*
 * options : num_id, text, mini, value, highlight, max, min
 * obj : <input>
 * 
 */
    var html = '';
    if (!edit) {
      var id = "control_"+this.incControl;
      //conf.getAttribute('num_id') = this.incControl;
      conf.setAttribute('id',id);
      conf.setAttribute('value', (parseInt(conf.getAttribute('max')) + parseInt(conf.getAttribute('min'))) / 2);
      html+= '<label for="' + id + '">' + conf.getAttribute('text') + '</label>';
      html+= '<input type="range" data-type="range" name="' + id + '" id="' + id + '" value="' + conf.getAttribute('value') + '" min="' + conf.getAttribute('min') + '" max="' + conf.getAttribute('max') + '" data-highlight="' + conf.getAttribute('highlight') + '" data-mini="' + conf.getAttribute('mini') + '" />';
      // TODO ajouter step="5" data-theme="a" : theme data-track-theme="b" : trackTheme ...

      var input_slider = $(html);

//      var slider = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
      var slider = $('<div />');
      slider.append(input_slider);
      slider.click(function(){
        window.parent.editWidgetMobile(this); 
      })
      //conf.setAttribute('obj', input_slider); // $('input', slider);

      //input_slider.slider();
      //slider = input_slider;
      //slider.get(0).conf = conf;

      if (conf.getAttribute('prepend') == "true" ) {
        //slider.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
        slider.prependTo( "#" + conf.getAttribute('parentId') );
      } else {
        slider.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      }
    } else { // Edit Mode
      var slider = this.tabControls[conf.getAttribute('num_id')];
    }

    /*
    $( ".selector" ).bind( "change", function(event, ui) {
      ...
    });
    */

    return slider;
	},

	// Toggle swicth
  toggleswicth: function(conf, edit)  {
/*
 * options : num_id, text, mini, val1, val1_label, val2, val2_label
 * obj : <select>
 * 
 */
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
    if (!conf.getAttribute('mini')) conf.setAttribute('mini', true);
    var id = "control_"+this.incControl;
    conf.setAttribute('id', id);
    var html = '';

    if (!edit) {
      conf.setAttribute('num_id', this.incControl);
      if (!conf.getAttribute('val1_label')) { if (!conf.getAttribute('val1')) conf.setAttribute('val1_label',"Off"); else conf.setAttribute('val1_label',conf.getAttribute('val1')); }
      if (!conf.getAttribute('val1')) conf.setAttribute('val1',"off");
      if (!conf.getAttribute('val2_label')) { if (!conf.getAttribute('val2')) conf.setAttribute('val2_label',"On"); else conf.setAttribute('val2_label',conf.getAttribute('val2')); }
      if (!conf.getAttribute('val2')) conf.setAttribute('val2',"on");

      if (!conf.getAttribute('text')) conf.setAttribute('text',"Select slider"); // TODO pour les tests à enlever !!

      html+= '<label for="' + id + '">' + conf.getAttribute('text') + '</label>';
      html+= '<select name="' + id + '" id="' + id + '" data-role="slider" data-mini="' + conf.getAttribute('mini') + '" ><option value="' + conf.getAttribute('val1') + '">' + conf.getAttribute('val1_label') + '</option><option value="' + conf.getAttribute('val2') + '">' + conf.getAttribute('val1_label') + '</option></select>'; 

      var select_toggleswicth = $(html);
/*
      var toggleswicth  = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
      toggleswicth.append(select_toggleswicth);
      conf.setAttribute('obj', select_toggleswicth); // $('select', toggleswicth );
      toggleswicth.get(0).conf = conf;
      select_toggleswicth.select();

*/

      //var toggleswicth  = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
      var toggleswicth  = $('<div/>');
      toggleswicth.append(select_toggleswicth);

      toggleswicth.click(function(){
        window.parent.editWidgetMobile(this); 
      })
      //conf.setAttribute('obj', select_toggleswicth); // $('select', toggleswicth );

      //toggleswicth.get(0).conf = conf;
      select_toggleswicth.select();
      //toggleswicth = select_toggleswicth;

      if (conf.getAttribute('prepend') == "true" ) {
        //toggleswicth.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
        toggleswicth.prependTo( "#" + conf.getAttribute('parentId') );
      } else {
        toggleswicth.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      }
    } else { // Edit Mode
      var toggleswicth = this.tabControls[conf.getAttribute('num_id')];
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
  listview: function(conf, edit)  { // ensemble de "button"
/*
 * options : num_id, text
 * obj : <div>
 * 
 */
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
    if (!conf.getAttribute('mini')) conf.setAttribute('mini',true);
    var id = "control_"+this.incControl;
    conf.setAttribute('id',id);
    var html = '';

    //var listview = $('<ul data-role="listview" data-inset="true" id="' + id + '" ><li data-role="list-divider">' + conf.getAttribute('text') + '</li><li><a href="#home">Go to Home</a></li></ul>');
    var listview = $('<ul data-role="listview" id="' + id + '" />');
    var divider = $('<li data-role="list-divider">' + conf.getAttribute('text') + '</li>');
    listview.append(divider);
    listview.get(0).divider = [];
    listview.get(0).divider[1] = divider;
    var link = $('<li><a href="#home">Go to Home</a></li>');
    listview.append(link);
    listview.get(0).link = [];
    listview.get(0).link[1] = link;
/*    var div = $('<div/>');
    div.append(listview);
    div.click(function(){
      window.parent.editWidgetMobile(this); 
    });
*/
    listview.click(function(){
      window.parent.editWidgetMobile(this); 
    });
    if (conf.getAttribute('prepend') == "true" ) {
      //div.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      listview.prependTo( "#" + conf.getAttribute('parentId') );
      listview.listview().trigger( "create" );
    } else {
      //div.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      //div.appendTo( "#" + conf.getAttribute('parentId') );
      listview.appendTo( "#" + conf.getAttribute('parentId') );
      listview.listview().trigger( "create" );
    }

    return listview;// div;
	},

	// button
  button: function(conf, edit)  {
/*
 * options : num_id, text, mini, link, inline, icon, iconpos, theme (b=active), type (hrml tag : a, li), role (button, list-divider)  // TODO gérer type et role pour les listes notament
 * obj : button
 * 
 */
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
    var id = "control_"+this.incControl;
    conf.setAttribute('num_id', this.incControl);
    conf.setAttribute('id', id);
    var html = '';
    if (conf.getAttribute('mini')) html+= 'data-mini="' + conf.getAttribute('mini') + '" ';
    if (conf.getAttribute('inline')) html+= 'data-inline="' + conf.getAttribute('inline') + '" '; // false => largeur "page" / true => bouton "réduit"
    if (conf.getAttribute('icon')) html+= 'data-icon="' + conf.getAttribute('icon') + '" ';
    if (conf.getAttribute('iconpos')) html+= 'data-iconpos="' + conf.getAttribute('iconpos') + '" '; // notext/top/bottom/right/left(default)
    if (conf.getAttribute('theme')) html+= 'data-theme="' + conf.getAttribute('theme') + '" '; // data-theme="b" => boutton "active" blue color

    var button = $('<a href="' + conf.getAttribute('link') + '" data-role="button" id="' + id + '" ' + html + '>' + conf.getAttribute('text') + '</a>');

    //conf.setAttribute('obj', button);
    
/*    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
    div.append(button);
    div.get(0).conf = conf;
    div.click(function(){
      window.parent.editWidgetMobile(this); // appel fonction de la fenetre parent en mode "iframe" 
    })
*/
    //button.get(0).conf = conf;
    button.click(function(){
      window.parent.editWidgetMobile(this); 
    })
    //button.button();
//    return div;

    if (conf.getAttribute('prepend') == "true" ) {
      button.prependTo( "#" + conf.getAttribute('parentId') ).button();
    } else {
      button.appendTo( "#" + conf.getAttribute('parentId') ).button();
    }

    return button;
	},


  // controlgroup
  controlgroup: function(conf, edit)  { // ensemble de button 
/*
 * options : num_id, text, type (''/horizontal)
 * obj : null
 * 
 */
/*
<div data-role="controlgroup">
  <a href="index.html" data-role="button">Yes</a>
  <a href="index.html" data-role="button">No</a>
  <a href="index.html" data-role="button">Maybe</a>
</div>
*/
    var id = "control_"+this.incControl;
    conf.setAttribute('id', id);
    var html = '';
    if (conf.getAttribute('mini')) html+= 'data-mini="' + conf.getAttribute('mini') + '" ';
    if (conf.getAttribute('type')) html+= 'data-type="' + conf.getAttribute('type') + '" '; // horizontal
    var id = "control_"+this.incControl;

    // TODO a supprimer pour test ajoute des "button" 
    var html2 = '<a href="#" data-role="button">Yes</a><a href="#" data-role="button">No</a><a href="#" data-role="button">Maybe</a>';

    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" ><div data-role="controlgroup" id="' + id + '" ' + html + '>' + html2 + '</div></div>');
    //div.get(0).conf = conf;
    if (conf.getAttribute('prepend') == "true" ) {
      //div.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      div.prependTo( "#" + conf.getAttribute('parentId') );
    } else {
      div.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
    }

		return div;
	},

  // radioswicth
  radioswicth: function(conf, edit)  { // ensemble de 2 bouton radio
/*
 * options : num_id, text, val1, val1_label, val2, val2_label, type (''/horizontal)
 * obj : null
 * 
 */
/*
 * options : num_id, text, type
 * obj : <select>
 * 
 */
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
    if (!conf.getAttribute('mini')) conf.setAttribute('mini', true);
    var id = "control_"+this.incControl;
    conf.setAttribute('id',id);
    var html = '';

    // TODO a supprimer pour test ajoute des "button" 
    var html2 = '<fieldset data-role="controlgroup" data-type="horizontal" >';
    html2 = html2 + '<input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1"  />';
    html2 = html2 + '<label for="radio-choice-1">I</label>';
    html2 = html2 + '<input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2" checked="checked" />';
    html2 = html2 + '<label for="radio-choice-2">O</label>';
    html2 = html2 + '</fieldset>';

    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" ><div data-role="controlgroup" id="' + id + '" ' + html + '>' + html2 + '</div></div>');
    //div.get(0).conf = conf;

    if (conf.getAttribute('prepend') == "true" ) {
      //div.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      div.prependTo( "#" + conf.getAttribute('parentId') );
    } else {
      div.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
    }
    
		return div;
	},

	// text
  text: function(conf, edit)  { 
/*
 * options : num_id, text, text2
 * obj : null
 * 
 */
/*
<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" >
  <div class="ui-grid-a">
    <div class="ui-block-a newtextblockA" id="blockA" ><h3>name du device</h3></div>
    <div class="ui-block-b newtextblockB" id="blockB" >nextextB</div>
  </div>
</div>
*/
    if (!conf.getAttribute('mini')) conf.setAttribute('mini',true);
    var id = "control_"+this.incControl;
    conf.setAttribute('id',id);
    var html = '';
    html+= '<div class="ui-grid-a" id="' + id + '"><div class="ui-block-a newtextblockA" ><h3>' + conf.getAttribute('text') + '</h3></div><div class="ui-block-b newtextblockB" >' + conf.getAttribute('text2') + '</div></div>';
    
    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" >' + html + '</div>');

    if (conf.getAttribute('prepend') == "true" ) {
      //div.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      div.prependTo( "#" + conf.getAttribute('parentId') );
    } else {
      div.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
    }

		return div;
	},

	// Html
  html: function(conf, edit)  { // TODO ... 
/*
 * options : num_id, text
 * obj : null
 * 
 */ 
    var id = "control_"+this.incControl;
    conf.setAttribute('id',id);
    if (!edit) {
      var slider = $('<label for="' + id + '">Input slider:</label><input type="range" name="slider" id="' + id + '" value="60" min="0" max="100" data-highlight="true" data-mini="true"/>');
      //conf.setAttribute('num_id',this.incControl);
    } else {
      //var slider = $("#" + conf.getAttribute('id') );
      var slider = this.tabControls[conf.getAttribute('num_id')];
    }

    $('input', slider).slider();
    //$('.selector').slider({ mini: "true", highlight: "true" }); // disabled: "true"
    //$('input', slider).slider('refresh');
    
    $('input', slider).slider('refresh');

    var div = $('<div class="ui-field-contain ui-body ui-br" data-role="fieldcontain" />');
    div.append(slider);

    //slider.appendTo( ".ui-page" ).trigger( "create" );
    //div.appendTo( "#" + _currentPage + " .content" ).trigger( "create" );

    if (conf.getAttribute('prepend') == "true" ) {
      //div.prependTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
      div.prependTo( "#" + conf.getAttribute('parentId') );
    } else {
      div.appendTo( "#" + conf.getAttribute('parentId') ).trigger( "create" );
    }

    return div;
	},

  // Load design
  addPage: function(id, title)  {
    var html = '<div data-role="page" id="' + id + '" data-add-back-btn="true">';
    // header
    html = html + '<div data-role="header" class="header">';
    html = html + '<h1>' + title + '</h1>';
    html = html + '<a href="#home" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a>';
    html = html + '</div>';
    // page content
    html = html + '<div data-role="content" class="content"></div>';

    html = html + '</div>';
    var page = $(html)
    $('body').append(page);
    return page;
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

  //test loadDesign(_versionMobile); // TODO pour le moment en dur dans le code de la page !!

  
  
  //Démarrer data-icon="home" onlcick="$("#page0").show();$.mobile.changePage("#page0");"

  //test EIBCommunicator.periodicUpdate();
});