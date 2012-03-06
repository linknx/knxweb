function CSlider(conf) {
  this.isResizable=true;
  this.init(conf);
  
  this.value=0;
  this.convertPourc = false;
  this.min = 0;
  this.max = 100;
  
  this.refreshHTML();
}

CSlider.type='slider';
UIController.registerWidget(CSlider);
CSlider.prototype = new CWidget();

// Refresh HTML from config
CSlider.prototype.refreshHTML = function() {
  $( '.sliderdiv', this.div ).slider( "destroy" ); // on le détruit si il existe déjà lors de modif en mode edit notamment


  if (this.conf.getAttribute("border")=='true') 
    this.div.css('border', "1px solid " + this.conf.getAttribute("border-color")); 
  else
    this.div.css('border','');

  var conf = this.conf;
  var range = 'min';
  if (this.conf.getAttribute("position")!='right_bottom') range = 'max'; 
  
  $( '.sliderdiv', this.div ).slider({
    orientation: conf.getAttribute("orientation"),
    range: range, //"min",
    min: conf.getAttribute("min"),
    max: conf.getAttribute("max"),
    step: 5,
    //animate: true,
    range: range,
    slide: function( event, ui ) {
      //$( "#amount" ).val( ui.value );
    }
  });
  $( '.ui-slider-handle', this.div ).hide();
  $( '.sliderdiv', this.div ).removeClass('ui-widget-content');
    
  if (this.conf.getAttribute("slider-picture")!="")
  {
    var param = "";
    var translatepicture = false;
    if( conf.getAttribute("translatepicture") =="true") translatepicture = true;
    if (conf.getAttribute("orientation") == 'vertical' && !translatepicture || conf.getAttribute("orientation") == 'horizontal' && translatepicture) {
      if (conf.getAttribute("position") == 'right_bottom') param = param + "right bottom"; else param = param + "left top";
    } else {
      if (conf.getAttribute("position") == 'right_bottom') param = param + "left top"; else param = param + "right bottom";
    } 
    $('.ui-slider-range', this.div).css('background', 'url(' + getImageUrl(this.conf.getAttribute("slider-picture")) + ') no-repeat '+param);
  } else 
  {
    if (this.conf.getAttribute("slider-color")!="") $('.ui-slider-range', this.div).css('background', this.conf.getAttribute("slider-color"));
  }
  $( '.sliderdiv', this.div ).css('width', '100%');
  $( '.sliderdiv', this.div ).css('height', '100%');
  if (this.conf.getAttribute("orientation")=='vertical') {
    $( '.ui-slider-range', this.div ).css('width', '');
    $( '.sliderdiv', this.div ).slider( "option", "orientation", 'vertical' );
  } else {
    $( '.ui-slider-range', this.div ).css('height', '');
    $( '.sliderdiv', this.div ).slider( "option", "orientation", 'horizontal' );
  }
  if (this.conf.getAttribute("min")!="") this.min = parseFloat(this.conf.getAttribute("min"));
  if (this.conf.getAttribute("max")!="") this.max = parseFloat(this.conf.getAttribute("max"));
  if (this.min > this.max) {
    var max = this.max;
    this.max = this.min;
    this.min = max;
  }
  
  if (this.editMode) // en mode édition affichage à 50% pour voir les 2 "couleurs"
  {
    this.updateObject(this.conf.getAttribute("feedback-object"),(this.max - this.min)/2);
  }
  $( '.sliderdiv', this.div )[0].owner = this;
  $( '.sliderdiv', this.div ).bind( "slidestop", function() {
    if (!this.owner.editMode)
    {
      var actions=$("actionlist[id=slidestop-action]", this.owner.conf);
      if (actions.length>0) EIBCommunicator.executeActionList(actions);
    }
  });
  $( '.sliderdiv', this.div ).bind( "slide", function() {
    if (!this.owner.editMode)
    {
      var actions=$("actionlist[id=slide-action]", this.owner.conf);
      if (actions.length>0) EIBCommunicator.executeActionList(actions);
    }
  });
  
}

// Called by eibcommunicator when a feedback object value has changed
CSlider.prototype.updateObject = function(obj,value) {
  if (obj==this.conf.getAttribute("feedback-object"))
  {
    value = parseFloat(value);
    if (value < this.min ) value = this.min;
    else if (value > this.max ) value = this.max;
    $( '.sliderdiv', this.div ).slider( "value" , value );
  }
};
