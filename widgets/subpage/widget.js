function CSubPage(conf) {
	this.isResizable=false;
  this.init(conf);
  
  this.active=false;
  this.dialogdiv = '';
  
  this.refreshHTML();
}

CSubPage.type='subpage';
UIController.registerWidget(CSubPage);
CSubPage.prototype = new CWidget();

// Return needed feedback object
CSubPage.prototype.getListeningObject = function() {
	
	var a=[];

	$(".widget", this.div).each(function() {
		var l=this.owner.getListeningObject();
		$.each(l, function(key, value) {
			if ($.inArray(value, a)==-1) a.push(value);
		});
	});
  if (this.dialogdiv != '') {
    $(".widget", this.dialogdiv).each(function() {
  		var l=this.owner.getListeningObject();
  		$.each(l, function(key, value) {
  			if ($.inArray(value, a)==-1) a.push(value);
  		});
  	});
  }

	return a;
}

// Refresh HTML from config
CSubPage.prototype.refreshHTML = function() {

	var subpage= $('subpage[name=' + this.conf.getAttribute("subpage") + ']', _subpages);

	this.div.empty();
  if (this.conf.getAttribute("view_mode")!="") { 
    //$(".widget", div).hide();
    var div=$("<div class='subpagedialog' style='position:relative;' />");
  } else {
    //$(".widget", div).show();
    var div=this.div;
  }  
	div.empty();
	div.width(subpage.attr('width'));
	div.height(subpage.attr('height'));
	if ((subpage.attr('bgcolor')!=null)&&(subpage.attr('bgcolor')!="")) div.css("background-color", subpage.attr('bgcolor')); else div.css("background-color", "transparent");

	var page=this;
	
	var bgimage=subpage.attr('bgimage');
	if ((bgimage!=null)&&(bgimage!=""))
	{
		if (bgimage.substr(0,1)=="_")
			div.css("background-image", "url(" + getImageUrl(page.conf.getAttribute(bgimage.substr(1,bgimage.length))) + ")"); 
		else
			div.css("background-image", "url(" + getImageUrl(bgimage) + ")"); 
	} else div.css("background-image", "none");
	
	subpage.children('controls').children('control').each(function() {
		var obj = null;
		var type = this.getAttribute('type');
		var cls = UIController.widgetList[type];

		var conf=$(this).clone().get(0);

		$.each(this.attributes, function(i, attrib){
			var name = attrib.name;
			var value = attrib.value;
     	if (value.substr(0,1)=="_")	conf.setAttribute(name,page.conf.getAttribute(value.substr(1,value.length)));
		});
		
		$("actionlist action",conf).each(function() {
			var action=this;
			$.each(this.attributes, function(i, attrib){
				var name = attrib.name;
				var value = attrib.value;
				if (value.substr(0,1)=="_")	action.setAttribute(name,page.conf.getAttribute(value.substr(1,value.length)));
			});
		});

		if (cls)
		{
			obj = new cls(conf);

			if (obj!=null) {
				div.append(obj.div);
				return true;
			}
			return false;
		}	else return false;
	});
	
//	this.div.append(div); 
  if (this.conf.getAttribute("view_mode")!="") { 
    this.dialogdiv = div;
    
    this.opensubpage = $("<img src='" + getImageUrl(this.conf.getAttribute("picture-dialog")) + "' alt='click'/>"); 
    this.opensubpage[0].owner = this;
    
    this.div.append(this.opensubpage);
    div.hide();
    this.div.append(div);
    
    if (this.conf.getAttribute("view_mode") == "dialog" || this.conf.getAttribute("view_mode") == "dialogmodal" ) {
      this.opensubpage.click(function() {
        this.owner.dialogdiv.dialog('open');
      });
      this.div.width('auto');
      this.div.height('auto');
      var modal = false;
      if (this.conf.getAttribute("view_mode") == "dialogmodal" ) modal = true;
      var dialogClass = '';
      var heighttitle = 26;
      if (this.conf.getAttribute("hidetitledialog") == "true" ) {
        dialogClass = 'notitledialog';
        heighttitle = 0;
      }
      div.dialog({
        autoOpen: false,
        title: '',
        resizable: false,
        width: parseInt(subpage.attr('width')),
        minWidth: parseInt(subpage.attr('width')),
        height: parseInt(subpage.attr('height')) + heighttitle,
        minHeight: parseInt(subpage.attr('height')),
        modal: modal,
        dialogClass: dialogClass
      });
    } else {
      this.div.width('auto');
      this.div.height('auto');
      this.opensubpage.click(function() {
        this.owner.dialogdiv.toggle();
      });
    }
  }

}

// Called by eibcommunicator when a feedback object value has changed
CSubPage.prototype.updateObject = function(obj,value) {
//	console.debug(obj + " = " + value);
	$(".widget", this.div).each(function() {
		this.owner.updateObject(obj, value);
	});
  if (this.dialogdiv != '') {
  	$(".widget", this.dialogdiv).each(function() {
  		this.owner.updateObject(obj, value);
  	});
  }	
};
