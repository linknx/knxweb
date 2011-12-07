function CButton(conf) {
	this.isResizable=true;
  this.init(conf);
  
  this.active=false;
  
  $(this.div).click(function() {
  	if (!this.owner.editMode)
  	{
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
  });
  
  this.refreshHTML();
}

CButton.type='button';
UIController.registerWidget(CButton);
CButton.prototype = new CWidget();

// Refresh HTML from config
CButton.prototype.refreshHTML = function() {
	$(".buttonContent", this.div).css('background-image', 'url(' + tab_config.imageDir + this.conf.getAttribute("picture") + ')');
	
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
		switch (this.conf.getAttribute("feedback-compare")) {
			case 'eq':
				this.active=(value==this.conf.getAttribute("feedback-value"));
				break;
			case 'neq':
				this.active=(value!=this.conf.getAttribute("feedback-value"));
				break;
			case 'gt':
				this.active=(value>this.conf.getAttribute("feedback-value"));
				break;
			case 'lt':
				this.active=(value<this.conf.getAttribute("feedback-value"));
				break;
			case 'gte':
				this.active=(value>=this.conf.getAttribute("feedback-value"));
				break;
			case 'lte':
				this.active=(value<=this.conf.getAttribute("feedback-value"));
				break;
			default:
				this.active=false;
		}

		var picture=((this.active)?this.conf.getAttribute("picture-active"):this.conf.getAttribute("picture"));
		if (picture!="") $(".buttonContent", this.div).css('background-image','url(' + tab_config.imageDir + picture + ')');
			
	}
};
