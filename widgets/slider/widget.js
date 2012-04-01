function CSlider(conf) {
  this.isResizable=true;
  this.init(conf);
  
  this.value=0;
  this.convertPourc = false;
  this.min = 0;
  this.max = 100;
  this.reversevalue = false;
  
  this.refreshHTML();
}

CSlider.type='slider';
UIController.registerWidget(CSlider);
CSlider.prototype = new CWidget();

// Refresh HTML from config
CSlider.prototype.refreshHTML = function() {
  $( '.sliderdiv', this.div ).slider( "destroy" ); // on le détruit si il existe déjà lors de modif en mode edit notamment
  $(this.div).attr( "title", this.conf.getAttribute("feedback-object"));

  if (this.conf.getAttribute("background-picture") != "") 
    $( '.sliderdiv', this.div ).css('background', 'url(' + getImageUrl(this.conf.getAttribute("background-picture")) + ')');
  else $( '.sliderdiv', this.div ).css('background','');

  if (this.conf.getAttribute("border") == 'true') 
    this.div.css('border', "1px solid " + this.conf.getAttribute("border-color")); 
  else
    this.div.css('border','');

  var conf = this.conf;
  if (this.conf.getAttribute("min") != "") this.min = parseInt(this.conf.getAttribute("min"));
  if (this.conf.getAttribute("max") != "") this.max = parseInt(this.conf.getAttribute("max"));
  this.position = this.conf.getAttribute("position");
  this.orientation = this.conf.getAttribute("orientation");
  var disabled = false;
  if (this.conf.getAttribute("command-object") == "") disabled=true;

  if (this.min > this.max) {
    var max = this.max;
    this.max = this.min;
    this.min = max;
  }
  this.oldvalue = (this.min - 1);
  
  var delta = (this.max - this.min); 
  this.delta = delta;

  var step = parseInt( delta / (parseInt(this.conf.getAttribute("width"))) );
  if (step < 1) step = 1;

  var range = 'min';
  if (this.position!='right_bottom') { range = 'max'; this.reversevalue = true; } else { this.reversevalue = false; } 
  
  $( '.sliderdiv', this.div ).slider({
    orientation: conf.getAttribute("orientation"),
    range: range,
    min: 0,
    max: delta,
    value: parseInt( delta / 2), 
    step: step,
    disabled: disabled,
    //animate: true
  });
  $( '.ui-slider-handle', this.div ).hide();
  $( '.sliderdiv', this.div ).removeClass('ui-widget-content');

  if (this.conf.getAttribute("slider-picture")!= "")
  {
    var param = "";
    var translatepicture = false;
    if( conf.getAttribute("translatepicture") == "true") translatepicture = true;
    if (this.orientation == 'vertical' && !translatepicture || this.orientation == 'horizontal' && translatepicture) {
      if (this.position == 'right_bottom') param = param + "right bottom"; else param = param + "left top";
    } else {
      if (this.position == 'right_bottom') param = param + "left top"; else param = param + "right bottom"; 
    } 
    $('.ui-slider-range', this.div).css('background', 'url(' + getImageUrl(this.conf.getAttribute("slider-picture")) + ') no-repeat '+param);
  } else {
    if (this.conf.getAttribute("slider-color")!="") $('.ui-slider-range', this.div).css('background', this.conf.getAttribute("slider-color"));
  }

  $( '.sliderdiv', this.div ).css('width', '100%');
  $( '.sliderdiv', this.div ).css('height', '100%');

  if (this.orientation == 'vertical') {
    $( '.ui-slider-range', this.div ).css('width', '');
    $( '.sliderdiv', this.div ).slider( "option", "orientation", 'vertical' );
  } else {
    $( '.ui-slider-range', this.div ).css('height', '');
    $( '.sliderdiv', this.div ).slider( "option", "orientation", 'horizontal' ); 
  }
  
  if (this.editMode) // en mode édition affichage à "50%" pour voir les 2 "couleurs"
  {
    this.updateObject(this.conf.getAttribute("feedback-object"),(( this.delta / 2 ) + this.min ));
  } else {
    $( '.sliderdiv', this.div )[0].owner = this;
    $( '.sliderdiv', this.div ).bind( "slidestop", function(event, ui) {
      var value = this.owner.convertFromUiValue(ui.value);
      $(".value",this.owner.div).text(value).show(); // + "ui:" + ui.value
      if (!this.owner.editMode)
      {
        var actions = $("actionlist[id=slidestop-action]", this.owner.conf);
        if (actions.length==0 || !actions.length) {
          var actions=this.owner.conf.ownerDocument.createElement('actionlist');
          actions.setAttribute('id', "slidestop-action");
          this.owner.conf.appendChild(actions);
          actions = $(actions);
        }
        var action = $("action[id='" + this.owner.conf.getAttribute("command-object") + "']", actions);
        if ( action.attr("type") == "set-value" ) {
          action.remove();
        } 
        actions.append($("<action type='set-value' id='" + this.owner.conf.getAttribute("command-object") + "' value='" + value + "'></action>")[0]);
        if (actions.length>0) EIBCommunicator.executeActionList(actions);
      }
      //test $(".value",this.owner.div).hide();
    });
    $( '.sliderdiv', this.div ).bind( "slide", function(event, ui) {
      var value = this.owner.convertFromUiValue(ui.value);
      $(".value",this.owner.div).text(value).show(); // + "ui:" + ui.value
      if (!this.owner.editMode)
      {
        var actions=$("actionlist[id=slide-action]", this.owner.conf);
        if (actions.length>0) EIBCommunicator.executeActionList(actions);
      }
    });
  };
}

CSlider.prototype.convertFromUiValue = function(valueui) {
  var value = valueui + this.min;
  if (this.reversevalue) value =  this.max + this.min -  value;
  return value;  
}

CSlider.prototype.convertToUiValue = function(value) {
  //value = parseInt(value);
  if (value < this.min ) value = this.min;
  else if (value > this.max ) value = this.max;
  if (this.reversevalue) value =  this.max + this.min -  value;
  var valueui = parseInt(value + this.min);
  return valueui;  
}

// Called by eibcommunicator when a feedback object value has changed
CSlider.prototype.updateObject = function(obj,value) {
  if (obj==this.conf.getAttribute("feedback-object"))
  {
    var valueui = this.convertToUiValue(value);
    if (this.oldvalue != value ) {
      $( '.sliderdiv', this.div ).slider( "value" , valueui );
      this.oldvalue = value; 
    }
    $(this.div).attr( "title", this.conf.getAttribute("feedback-object") + " value : " + value); // + " convert in " + valueui
  }
};
