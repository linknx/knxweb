function CSubPage(conf) {
	this.isResizable=false;
  this.init(conf);
  
  this.active=false;
  
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

	return a;
}

// Refresh HTML from config
CSubPage.prototype.refreshHTML = function() {

	var subpage= $('subpage[name=' + this.conf.getAttribute("subpage") + ']', _subpages);

	var div=this.div;
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

}

// Called by eibcommunicator when a feedback object value has changed
CSubPage.prototype.updateObject = function(obj,value) {
//	console.debug(obj + " = " + value);
	$(".widget", this.div).each(function() {
		this.owner.updateObject(obj, value);
	});
	
};
