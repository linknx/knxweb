function CButton(conf) {
	this.isResizable=true;
  this.init(conf);
  
  this.active=false;
  
  $(this.div).click(function() {
    if (!_editMode)
  	{
	  	var answer = true
      if (this.owner.conf.getAttribute('confirm') == "yes") answer = confirm(tr("confirm the command"));
    	if (answer) {
        if (this.owner.active)
  	  	{
  	  		if (this.owner.conf.getAttribute('active-goto')!="")
  	  		{
  	  			gotoZone(this.owner.conf.getAttribute('active-goto'));
  	  			return;
  	  		}
  	  		var actions=$("actionlist[id=active-action]", this.owner.conf);
  	  	} else
  	  	{
  	  		if (this.owner.conf.getAttribute('inactive-goto')!="")
  	  		{
  	  			gotoZone(this.owner.conf.getAttribute('inactive-goto'));
  	  			return;
  	  		}
  	  		var actions=$("actionlist[id=inactive-action]", this.owner.conf);
  	  	}
  
  	  	if (actions.length>0) EIBCommunicator.executeActionList(actions);
  		}
    }
  });
  
  this.refreshHTML();
}

CButton.type='button';
UIController.registerWidget(CButton);
CButton.prototype = new CWidget();

// Refresh HTML from config
CButton.prototype.refreshHTML = function() {
  var displaypicture = this.conf.getAttribute("display-picture");
  if (_editMode && displaypicture == "yes")
    $(".buttonContent", this.div).css('background-image', 'url(' + getImageUrl(this.conf.getAttribute("picture-active")) + ')');
  else
	$(".buttonContent", this.div).css('background-image', 'url(' + getImageUrl(this.conf.getAttribute("picture")) + ')');
	
	$(".buttonContent", this.div).text(this.conf.getAttribute("text"));
	if (this.conf.getAttribute("size")!="") $('.buttonContent', this.div).css('font-size', this.conf.getAttribute("size") + "px"); else $('.buttonContent', this.div).css('size', '');
	if (this.conf.getAttribute("color")!="") $('.buttonContent', this.div).css('color', this.conf.getAttribute("color")); else $('.buttonContent', this.div).css('color', '');
	if (this.conf.getAttribute("align")!="") $('.buttonContent', this.div).css('text-align', this.conf.getAttribute("align")); else $('.buttonContent', this.div).css('text-align', '');
	if (this.conf.getAttribute("text-padding")!="") $('.buttonContent', this.div).css('padding-top', this.conf.getAttribute("text-padding")); else $('.buttonContent', this.div).css('padding-top', '0');

}

// Called by eibcommunicator when a feedback object value has changed
CButton.prototype.updateObject = function(obj,value) {
	if (obj==this.conf.getAttribute("feedback-object"))
	{
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
		}

		var picture=((this.active)?this.conf.getAttribute("picture-active"):this.conf.getAttribute("picture"));
		if (picture!="") $(".buttonContent", this.div).css('background-image','url(' + getImageUrl(picture) + ')');
			
	}
};
