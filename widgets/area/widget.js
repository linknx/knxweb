function CArea(conf) {
  this.isResizable=true;
  this.isDraggable=true;

  this.init(conf);

  this.content = $(".content", this.div);
  this.content.get(0).owner = this;
  $(".content", this.div).droppable({
    activeClass: "redBorder",
    //hoverClass: "ui-state-active",
    accept: ".widget",
    drop: function( event, ui ) {
      if ( this != ui.draggable.parent().get(0) ) {
        var obj = ui.draggable.get(0).owner;
        ui.draggable.appendTo(this);
        //ui.draggable( "option", "appendTo", "parent" );
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

CArea.type='area';
UIController.registerWidget(CArea);
CArea.prototype = new CWidget();

// Return needed feedback object
CArea.prototype.getListeningObject = function() {
 
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
CArea.prototype.refreshHTML = function() {

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
CArea.prototype.updateObject = function(obj,value) {
//  console.debug(obj + " = " + value);
	if (obj==this.conf.getAttribute("feedback-object"))
	{
    var val = value;
    if (parseFloat(val)) val = parseFloat(value);
    var feedback_val = this.conf.getAttribute("feedback-value");
    if (parseFloat(feedback_val)) feedback_val = parseFloat(this.conf.getAttribute("feedback-value"));
    if (feedback_val == val) {
      this.div.show();
    } else {
      this.div.hide();
    }
  }
};