var _tabobject = new Array;
function CAccount(conf) {
  this.isResizable=true;
  this.isDraggable=true;

  this.init(conf);
  _this=this;

  this.tabfeedbackobject = new Array;
  this.tabobjectlength = 0;

/* resize /2 la carte :
   $('area', this.div).each(function(){
      var coord_vals = $(this).attr('coords').split(',');
      var new_vals;
      for(var i=0; i<coord_vals.length; i++) {
          new_vals[i] = coord_vals[i] / 2;
      }
      new_vals = new_vals.join(",");
      $(this).attr('coords').val(new_vals);
   });


canvas jquery

http://www.lafermeduweb.net/tutorial/l-element-html-5-canvas-p23.html

http://motyar.blogspot.fr/2010/04/drawing-on-web-with-canvas-and-jquery.html
http://www.lafermeduweb.net/billet/gury-simplifier-l-utilisation-du-html5-canvas-avec-ce-plugin-jquery-952.html

*/

  /* cf. http://cyberzoide.developpez.com/html/map.php3 */
/*
  this.map = $("<map name='nommap'>");  
  this.map.append('<area shape="poly" coords="0,0,34,0,78,20,43,33,46,69,19,54,0,78,0,0" href="#moi">');
  this.map.append('<area shape="poly" coords="34,0,78,20,43,33,46,69,19,54,0,78,0,93,91,93,123,76,98,49,147,34,131,0,34,0" href="#toi">');
  this.map.append('<area shape="poly" coords="131,0,200,0,200,94,91,93,123,76,98,49,147,34,131,0" href="#nous">');
  this.map.append('<area shape="rect" coords="10,3,60,16" href="#home"><area shape="circle" coords="50,50,40" href="#bulles">');


  this.div.append(this.map);
  this.div.append('<img border="0" usemap="#nommap" src="pictures/Buttons/green-button.png">');

$('area', this.map).css('background-color','#E51515');
$('area', this.map).resizable();

$('area', this.map).mouseover(function() {

    console.log($(this).attr('id'), $(this).attr('href'));

}).mouseout(function(){
    console.log('Mouseout....');      
});
*/

  $('object', _objects).each(function() {
    var label_obj = ((this.textContent=="")?this.getAttribute('id'):this.textContent);
    var value_obj = this.getAttribute('id');        
    var tab = [];
    tab["label"] = label_obj;
    tab["value"] = value_obj;
    _tabobject.push(tab);
    //var obj = { label: label_obj , value: value_obj };
    //_tabobject.push(obj);
  });


  this.refreshHTML();
}

CAccount.type='account';
UIController.registerWidget(CAccount);
CAccount.prototype = new CWidget();

// Refresh HTML from config
CAccount.prototype.refreshHTML = function() {

  /*if (this.editMode)
  {
    $( "select[name=feedback-object-list]", "#tab-design-widget-properties" ).combobox();
  }
  */
/*
  .ui-combobox {
		position: relative;
		display: inline-block;
	}
	.ui-combobox .ui-button {
		position: absolute;
		top: 0;
		bottom: 0;
		margin-left: -1px;
		padding: 0;
	}
	.ui-combobox .ui-autocomplete-input {
		margin: 0;
		padding: 0.3em;
	}
.ui-autocomplete {
max-height: 200px;
overflow: auto;
}


  $("#feedback-object-input-list").remove();
  wrapper = $( "<span>" )
    .addClass( "ui-combobox" )
    .attr("id", "feedback-object-input-list")
    .insertAfter( $( "select[name=feedback-object-list]", "#tab-design-widget-properties" ) );
  input = $("<input>")
    .appendTo( wrapper )
    .val( "" )
    .addClass( "ui-state-default" )
    // don't navigate away from the field on tab when selecting an item
    .bind( "keydown", function( event ) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).data( "autocomplete" ).menu.active ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      delay: 0,
      source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
          _tabobject, extractLast( request.term ) ) );
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        //this.value = terms.join( "|" ); // le séparateur doit être en lien avec la fonction "split( val )" définie plus bas 
        return false;
      }
    })
    .addClass( "ui-widget ui-widget-content ui-corner-left" );
  $( "<a>" )
    .attr( "tabIndex", -1 )
    .attr( "title", "Show All Items" )
    .appendTo( wrapper )
    .button({
      icons: {
        primary: "ui-icon-triangle-1-s"
      },
      text: false
    })
    .removeClass( "ui-corner-all" )
    .addClass( "ui-corner-right ui-button-icon" )
    .click(function() {
      // close if already visible
      if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
        input.autocomplete( "close" );
        return;
      }
      // work around a bug (likely same cause as #5265)
      $( this ).blur();
      // pass empty string as value to search for, displaying all results
      input.autocomplete( "search", "" );
      input.focus();
    });

$( "select[name=feedback-object-list]", "#tab-design-widget-properties" ).hide();
*/
/* ouvre la liste :
  $( "select[name=feedback-object-list]", "#tab-design-widget-properties" ).autocomplete( "search", "" );
  $( "select[name=feedback-object-list]", "#tab-design-widget-properties" ).focus();
*/



  this.tabfeedbackobject = this.conf.getAttribute("feedback-object-list").split('|');
  this.tabobjectlength = this.tabfeedbackobject.length;

  if (this.conf.getAttribute("border")=='true') 
    $('.back', this.div).css('border', "1px solid " + this.conf.getAttribute("border-color")); 
  else
    $('.back', this.div).css('border','');

  if (!this.conf.getAttribute("background-color")) 
    $('.back', this.div).css('background-color','');
  else
    $('.back', this.div).css('background-color', this.conf.getAttribute("background-color"));

  if (!this.conf.getAttribute("opacity")) 
    $('.back', this.div).css('opacity','');
  else
    $('.back', this.div).css('opacity', this.conf.getAttribute("opacity"));

};

// Called by eibcommunicator when a feedback object value has changed
CAccount.prototype.updateObject = function(obj,value) {
//  console.debug(obj + " = " + value);
  //if (obj==this.conf.getAttribute("feedback-object"))
  if (this.tabfeedbackobject[obj] != "undefined")
  {
    console.log("Account", this.tabfeedbackobject[obj], obj, this.tabfeedbackobject);
/*
    var val = value;
    if (parseFloat(val)) val = parseFloat(value);
    var feedback_val = this.conf.getAttribute("feedback-value");
    if (parseFloat(feedback_val)) feedback_val = parseFloat(this.conf.getAttribute("feedback-value"));
    switch (this.conf.getAttribute("feedback-compare")) {
      case 'eq':
        this.active=(val==feedback_val);
        break;
      case 'neq':
        this.active=(val!=feedback_val);
        break;
      case 'gt':
        this.active=(val>feedback_val);
        break;
      case 'lt':
        this.active=(val<feedback_val);
        break;
      case 'gte':
        this.active=(val>=feedback_val);
        break;
      case 'lte':
        this.active=(val<=feedback_val);
        break;
      default:
        this.active=false;
        break;
    }

    var picture=((this.active)?this.conf.getAttribute("picture-active"):this.conf.getAttribute("picture"));
    if (picture!="") $(".buttonContent", this.div).css('background-image','url(' + getImageUrl(picture) + ')');
*/
    var val = value;
    if (parseFloat(val)) val = parseFloat(value);
    var feedback_val = this.conf.getAttribute("feedback-value");
    if (parseFloat(feedback_val)) feedback_val = parseFloat(this.conf.getAttribute("feedback-value"));
    this.tabfeedbackobject[obj] = feedback_val;
    /*if (feedback_val == val) {
      this.div.show();
    } else {
      this.div.hide();
    }*/
  }
};

function split( val ) {
  return val.split( /,\s*/ );  // \s :	Permet de capturer un "caractère blanc" (espace, retour chariot, tabulation, saut de ligne, saut de page).
  //return val.split( /|*/ );
}
function extractLast( term ) {
  return split( term ).pop();
}
