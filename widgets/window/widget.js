function CWindow(conf) {
  this.isResizable=true;
  this.isDraggable=false;

  this.init(conf);
  this.show = false;
 
  this.open = $(".open", this.div).get(0);
  this.open.owner = this;
  $(".open", this.div).click(function() {
    
    var ico_show, ico_hide ;
    if ($(this).hasClass("show")) { // si show présent on cache la fenêtre
      if ($(this).hasClass("bottom")) {
        var top = Math.round(this.owner.div.parent().css("height").replace(/px$/,""));
        animate(this.owner.div, {"top": top + "px" , "height":"0" },callbackAnimateWindowHide);
        ico_show = "n";
        ico_hide = "s";
      }
      if ($(this).hasClass("top")) {
        animate(this.owner.div, {"top": "0" , "height":"0" } ,callbackAnimateWindowHide);
        ico_show = "s";
        ico_hide = "n";
      }
      if ($(this).hasClass("right")) {
        var left = Math.round(this.owner.div.parent().css("width").replace(/px$/,""));
        animate(this.owner.div, {"left": left + "px", "width":"0" },callbackAnimateWindowHide);
        ico_show = "e";
        ico_hide = "w";
      }
      if ($(this).hasClass("left")) {
        animate(this.owner.div, {"left": "0", "width":"0"},callbackAnimateWindowHide);
        ico_show = "w";
        ico_hide = "e";
      }
      $(this).removeClass("show");
      this.owner.show = false;
      $('span', this).removeClass('ui-icon-circle-triangle-'+ico_show);
      $('span', this).addClass('ui-icon-circle-triangle-'+ico_hide);
    } else { // sinon on affiche la fenêtre
      $('.widget', this.owner.div).show();
      if ($(this).hasClass("bottom")){
        var top = Math.round(this.owner.div.parent().css("height").replace(/px$/,"") - this.owner.conf.getAttribute("height").replace(/px$/,""));
        animate(this.owner.div, {"top": top + "px"  , "height": this.owner.conf.getAttribute("height")}, callbackAnimateWindowShow);
        ico_show = "n";
        ico_hide = "s";
      }
      if ($(this).hasClass("top")) {
        animate(this.owner.div, {"top":"0" , "height": this.owner.conf.getAttribute("height")}, callbackAnimateWindowShow);
        ico_show = "s";
        ico_hide = "n";
      }
      if ($(this).hasClass("right")) {
        var left = Math.round(this.owner.div.parent().css("width").replace(/px$/,"") - this.owner.conf.getAttribute("width").replace(/px$/,""));
        animate(this.owner.div, {"left": left + "px" , "width": this.owner.conf.getAttribute("width")}, callbackAnimateWindowShow);
        ico_show = "e";
        ico_hide = "w";
      }
      if ($(this).hasClass("left")) {
        animate(this.owner.div, {"left": "0" , "width": this.owner.conf.getAttribute("width")}, callbackAnimateWindowShow);
        ico_show = "w";
        ico_hide = "e";
      }
      $(this).addClass("show");
      this.owner.show = true;
      $('span', this).removeClass('ui-icon-circle-triangle-'+ico_hide);
      $('span', this).addClass('ui-icon-circle-triangle-'+ico_show);
    }
    
  });
  
  this.content = $(".content", this.div);
  this.content.get(0).owner = this;
  
  $(".content", this.div).droppable({
    activeClass: "redBorder",
    accept: ".widget",
    drop: function( event, ui ) {
      if ( this != ui.draggable.parent().get(0) ) {
        var obj = ui.draggable.get(0).owner;
        ui.draggable.appendTo(this);
        ui.draggable.css('z-index', '501');
        var left = ui.draggable.css('left').replace(/px$/,"") - this.owner.div.css('left').replace(/px$/,"");
        var top = ui.draggable.css('top').replace(/px$/,"") - this.owner.div.css('top').replace(/px$/,"");
      
        ui.draggable.css('left', left);
        ui.draggable.css('top', top);

        var conf=obj.conf.cloneNode(true);
        conf.setAttribute('x',left);
        conf.setAttribute('y',top);
        $(obj.conf).remove();
        this.owner.conf.appendChild(conf);
      }
    }
  });
  
  this.refreshHTML();
}

function callbackAnimateWindowHide() {
  $('.widget', this.owner.div).hide();
};

function callbackAnimateWindowShow() {
  $('.widget', this.owner.div).show();
};

CWindow.type='window';
UIController.registerWidget(CWindow);
CWindow.prototype = new CWidget();

// Return needed feedback object
CWindow.prototype.getListeningObject = function() {
 
  var a=[];
  var widget = eval( "_widgets." + this.conf.getAttribute("type"));

  var w=this;
  if (widget.feedbacks!=undefined)
  {
    $.each(widget.feedbacks, function(index, value) {
      var o=w.conf.getAttribute(value);
      if ((o!="") && (o!=null) && ($.inArray(o, a)==-1)) a.push(o);
    });
  }

  $(".widget", this.div).each(function() {
    var l=this.owner.getListeningObject();
    $.each(l, function(key, value) {
      if ($.inArray(value, a)==-1) a.push(value);
    });
  });

  return a;
}

// Refresh HTML from config
CWindow.prototype.refreshHTML = function() {

  this.div.removeAttr("style");
  this.div.css("width",this.conf.getAttribute("width"));
  this.div.css("height",this.conf.getAttribute("height"));
  this.div.css("display","block");

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

  $(".open", this.div).removeClass("bottom");
  $(".open", this.div).removeClass("top");
  $(".open", this.div).removeClass("right");
  $(".open", this.div).removeClass("left");
  $(".open", this.div).removeClass("show");

  var ico_show = "n", ico_hide = "s";
  $('.open span', this.div)
    .removeClass('ui-icon-circle-triangle-n')
    .removeClass('ui-icon-circle-triangle-s')
    .removeClass('ui-icon-circle-triangle-e')
    .removeClass('ui-icon-circle-triangle-w');

  if (this.conf.getAttribute("position") == "bottom") {
    var top = 0;
    if (!this.div.parent().css("height") ) {
      if (!$('#widgetdiv').css("height") ) top = $('#zoneContainer').css("height").replace(/px$/,"");
      else top = $('#widgetdiv').css("height").replace(/px$/,"");
    } else top = this.div.parent().css("height").replace(/px$/,"");
    this.div.css("top", top + "px");
    this.div.css("left",this.conf.getAttribute("shift") + "px");
    $(".open", this.div).addClass("bottom");
    ico_show = "n";
    ico_hide = "s";
    this.div.css("height",0);
    $('.widget', this.div).hide();
  }
  if (this.conf.getAttribute("position") == "top") {
    this.div.css("top", "0");
    this.div.css("left", this.conf.getAttribute("shift") + "px");
    $(".open", this.div).addClass("top");
    ico_show = "s";
    ico_hide = "n";
    this.div.css("height",0);
    $('.widget', this.div).hide();
  }
  if (this.conf.getAttribute("position") == "right") {
    var left = 0;
    if (!this.div.parent().css("width") ) {
      if (!$('#widgetdiv').css("width") ) left = $('#zoneContainer').css("width").replace(/px$/,"");
      else left = $('#widgetdiv').css("width").replace(/px$/,"");
    } else left = this.div.parent().css("width").replace(/px$/,"");
    this.div.css("left", left + "px");
    this.div.css("top",this.conf.getAttribute("shift") + "px");
    $(".open", this.div).addClass("right");
    ico_show = "e";
    ico_hide = "w";
    this.div.css("width",0);
    $('.widget', this.div).hide();
  }
  if (this.conf.getAttribute("position") == "left") {
    this.div.css("left", "0");
    this.div.css("top",this.conf.getAttribute("shift") + "px");
    $(".open", this.div).addClass("left");
    ico_show = "w";
    ico_hide = "e";
    this.div.css("width",0);
    $('.widget', this.div).hide();
  }
  $('.open span', this.div).addClass('ui-icon-circle-triangle-'+ico_hide);
};

// Called by eibcommunicator when a feedback object value has changed
CWindow.prototype.updateObject = function(obj,value) {
  if (obj==this.conf.getAttribute("feedback-object"))
  {
    var val = value;
    if (parseFloat(val)) val = parseFloat(value);
    var feedback_val = this.conf.getAttribute("feedback-value");
    if (parseFloat(feedback_val)) feedback_val = parseFloat(this.conf.getAttribute("feedback-value"));
    if (feedback_val == val && !this.show) { // show si feedback-object vaut feedback-value sinon => rien ...
      $(".open", this.div).trigger('click');
    }
  }
};

var speed = 1000;

var vP = "";
if ($.browser.webkit) {
  vP = "-webkit-";
} else if ($.browser.msie) {
  vP = "-ms-";
} else if ($.browser.mozilla) {
  vP = "-moz-";
} else if ($.browser.opera) {
  vP = "-o-";
}  

/*
 * animate($("#someID"),{"left":"100px"});
 * 
 * var cssArgs = {};
 * cssArgs[vP+"transform"] = "translate(100px,0px)";
 * animate($("#someID"),cssArgs);
 *   
 */ 
  
function animate(object, cssProperties, callback, ms) {
  if (!ms) {
    ms = speed;
  }
  if ($.isFunction(callback)) {    
    object.animate(cssProperties, ms, callback);
  } else {
    object.animate(cssProperties, ms);      
  }
}
