function CCombobox(conf) {
	this.isResizable=true;
  this.init(conf);

  $('.comboboxList', this.div).change(function() {
    if (!_editMode)
  	{
  		gotoZone(this.value);
      this.value='';
    }
  });
  
  this.refreshHTML();
}

CCombobox.type='combobox';
UIController.registerWidget(CCombobox);
CCombobox.prototype = new CWidget();

// Refresh HTML from config
CCombobox.prototype.refreshHTML = function() {
  $('.comboboxList', this.div).empty();
  $('.comboboxList', this.div).append("<option value=''>" +  this.conf.getAttribute('firstoption') + "</option>");
  var _this=this;
  if (!_editMode)
  {
    $('zone', design_view.config).each(function() {
  		var option = "<option value='" + this.getAttribute('id')+"'>" + this.getAttribute('name') + "</option>";
  		$('.comboboxList', _this.div).append(option);
  	});
  } else {
    $('zone', design.config).each(function() {
  		var option = "<option value='" + this.getAttribute('id')+"'>" + this.getAttribute('name') + "</option>";
  		$('.comboboxList', _this.div).append(option);
  	});
  }
	$(".comboboxContent", this.div).text(this.conf.getAttribute("text"));
	if (this.conf.getAttribute("size")!="") $('.comboboxContent', this.div).css('font-size', this.conf.getAttribute("size") + "px"); else $('.comboboxContent', this.div).css('size', '');
	if (this.conf.getAttribute("color")!="") $('.comboboxContent', this.div).css('color', this.conf.getAttribute("color")); else $('.comboboxContent', this.div).css('color', '');
	if (this.conf.getAttribute("align")!="") $('.comboboxContent', this.div).css('text-align', this.conf.getAttribute("align")); else $('.comboboxContent', this.div).css('text-align', '');
}

// Called by eibcommunicator when a feedback object value has changed
CCombobox.prototype.updateObject = function(obj,value) {};
