function CText(conf) {
	this.isResizable=true;
  this.init(conf);
  this.refreshHTML();
}

CText.type='text';
UIController.registerWidget(CText);
CText.prototype = new CWidget();

// Refresh HTML from config
CText.prototype.refreshHTML = function() {
  $(".text", this.div).addClass(this.conf.getAttribute("class"));
	$("div:first-child", this.div).text(this.conf.getAttribute("text"));
	$("div:first-child", this.div).attr('style',this.conf.getAttribute("style"));
	if (this.conf.getAttribute("size")!="") $('div:first-child', this.div).css('font-size', this.conf.getAttribute("size") + "px"); else $('div:first-child', this.div).css('size', '');
	if (this.conf.getAttribute("color")!="") $('div:first-child', this.div).css('color', this.conf.getAttribute("color")); else $('div:first-child', this.div).css('color', '');
	if (this.conf.getAttribute("bgcolor")!="") $('div:first-child', this.div).css('background-color', this.conf.getAttribute("bgcolor")); else $('div:first-child', this.div).css('background-color', '');
	if (this.conf.getAttribute("align")!="") $('div:first-child', this.div).css('text-align', this.conf.getAttribute("align")); else $('div:first-child', this.div).css('text-align', '');
}

// Called by eibcommunicator when a feedback object value has changed
CText.prototype.updateObject = function(obj,value) {
	if (obj==this.conf.getAttribute("object"))
	{
			var regex = new RegExp(this.conf.getAttribute("pattern"));

	    var m = value.match(regex);
	    if (m)
            value = m[0].replace(regex, this.conf.getAttribute("text"));
        else
            value = '';
		$('div:first-child', this.div).text(value);
	}
};