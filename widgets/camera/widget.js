function CCamera(conf) {
	this.isResizable=true;
  this.init(conf);
  this.refreshHTML();
}

CCamera.type='camera';
UIController.registerWidget(CCamera);
CCamera.prototype = new CWidget();

// Refresh HTML from config
CCamera.prototype.refreshHTML = function() {
	if (this.conf.getAttribute("url")!="") {
		$("img", this.div).attr("src", this.conf.getAttribute("url")); 
		$("img", this.div).show();
	} else $("img", this.div).hide();
}