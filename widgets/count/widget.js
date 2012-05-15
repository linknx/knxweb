function CCount(conf) {
  this.isResizable=true;
  this.isDraggable=true;

  this.init(conf);

  this.tabfeedbackobject = new Array;
  this.tabobjectlength = 0;
  this.value = 0;

  this.refreshHTML();
}

CCount.type='count';
UIController.registerWidget(CCount);
CCount.prototype = new CWidget();

// Return needed feedback object
CCount.prototype.getListeningObject = function() {
  var a = this.conf.getAttribute("feedback-object-list").split( /,\s*/ );
  return a;
}

// Refresh HTML from config
CCount.prototype.refreshHTML = function() {

  $(".back", this.div).text(this.conf.getAttribute("text"));
  if (this.conf.getAttribute("size")!="") $('.back', this.div).css('font-size', this.conf.getAttribute("size") + "px"); else $('.back', this.div).css('size', '');
  if (this.conf.getAttribute("color")!="") $('.back', this.div).css('color', this.conf.getAttribute("color")); else $('.back', this.div).css('color', '');
  if (this.conf.getAttribute("bgcolor")!="") $('.back', this.div).css('background-color', this.conf.getAttribute("bgcolor")); else $('.back', this.div).css('background-color', '');
  if (this.conf.getAttribute("align")!="") $('.back', this.div).css('text-align', this.conf.getAttribute("align")); else $('.back', this.div).css('text-align', '');


  var tabobjects = this.conf.getAttribute("feedback-object-list").split( /,\s*/ );
  for( i=0; i < tabobjects.length; i++) this.tabfeedbackobject[tabobjects[i]] = null;
  this.tabobjectlength = this.tabfeedbackobject.length;

  if (this.conf.getAttribute("border")=='true') { 
    $('.back', this.div).css('border', "1px solid " + this.conf.getAttribute("border-color"));
    $('.back', this.div).css('border-radius', this.conf.getAttribute("border-radius")); 
  } else {
    $('.back', this.div).css('border', '');
    $('.back', this.div).css('border-radius', '');
  }

  if (!this.conf.getAttribute("opacity")) 
    $('.back', this.div).css('opacity', '');
  else
    $('.back', this.div).css('opacity', this.conf.getAttribute("opacity"));

  $('.back', this.div).text("0");

};

// Called by eibcommunicator when a feedback object value has changed
CCount.prototype.updateObject = function(obj,value) {
  if (this.tabfeedbackobject[obj] != "undefined")
  {
    //console.log("Account", this.tabfeedbackobject[obj], obj, this.tabfeedbackobject, this.value, this.tabobjectlength);
    var val = value;
    if (parseFloat(val)) val = parseFloat(value);
    var feedback_val = this.conf.getAttribute("feedback-value");
    if (parseFloat(feedback_val)) feedback_val = parseFloat(this.conf.getAttribute("feedback-value"));
    var old_val = this.tabfeedbackobject[obj];
    if (old_val != val) {
      var active;
      if (old_val != null) {
        switch (this.conf.getAttribute("feedback-compare")) {
          case 'eq':
            active=(old_val==feedback_val);
            break;
          case 'neq':
            active=(old_val!=feedback_val);
            break;
          case 'gt':
            active=(old_val>feedback_val);
            break;
          case 'lt':
            active=(old_val<feedback_val);
            break;
          case 'gte':
            active=(old_val>=feedback_val);
            break;
          case 'lte':
            active=(old_val<=feedback_val);
            break;
          default:
            active=false;
            break;
        }
        if (active) this.value--;
      }

      switch (this.conf.getAttribute("feedback-compare")) {
        case 'eq':
          active=(val==feedback_val);
          break;
        case 'neq':
          active=(val!=feedback_val);
          break;
        case 'gt':
          active=(val>feedback_val);
          break;
        case 'lt':
          active=(val<feedback_val);
          break;
        case 'gte':
          active=(val>=feedback_val);
          break;
        case 'lte':
          active=(val<=feedback_val);
          break;
        default:
          active=false;
          break;
      }
      if (active) this.value++;
      this.tabfeedbackobject[obj] = val;
    }
    $('.back', this.div).text(this.value);
    $('.back', this.div).attr('title', this.value + '/' + this.tabobjectlength);
  }
};
