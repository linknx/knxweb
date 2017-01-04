function CVProgressBar(conf) {
	this.isResizable=true;
	this.init(conf);
  
  this.value=0;
  
  this.refreshHTML();
}

CVProgressBar.type='vprogressbar';
UIController.registerWidget(CVProgressBar);
CVProgressBar.prototype = new CWidget();

// Refresh HTML from config
CVProgressBar.prototype.refreshHTML = function() {
//	$(".image", this.div).attr('src' , getImageUrl(this.conf.getAttribute("picture")) );

	if (this.conf.getAttribute("border")=='true') 
		this.div.css('border', "1px solid " + this.conf.getAttribute("border-color")); 
	else
		this.div.css('border','');
		
	if (this.conf.getAttribute("progress-picture")!="")
	{
		$('.bar', this.div).css('background-image', 'url(' + getImageUrl(this.conf.getAttribute("progress-picture")) + ')');
		$('.bar', this.div).css('background-color', '');
	} else 
	{
		if (this.conf.getAttribute("progress-color")!="") $('.bar', this.div).css('background-color', this.conf.getAttribute("progress-color"));
		$('.bar', this.div).css('background-image', '');
	}
}

// Called by eibcommunicator when a feedback object value has changed
CVProgressBar.prototype.updateObject = function(obj,value) {

	if (obj==this.conf.getAttribute("feedback-object"))
	{
			if (!this.conf.getAttribute("feedback-type") || this.conf.getAttribute("feedback-type") == "5.xxx" || this.conf.getAttribute("feedback-type") == "5.001") $('.bar', this.div).css('height', Math.round(value) + '%');
			else if (this.conf.getAttribute("feedback-type") == "5.003") $('.bar', this.div).css('height', (Math.round(value) * 100 / 360) + '%');
	}
};
