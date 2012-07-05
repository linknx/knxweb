var maintab;
var _objects;
var imagesDir='';
var imagesInput=null;
var colorPickerInput=null;
//var _superuser=false;
var _superuser=(tab_config['superuser']=="true")?true:false;

jQuery(document).ready(function(){

	$("#leftMenu").accordion({
		autoHeight: false
	});
	
	// Create image manager dialog
	$("#images-manager-dialog").dialog( { 
		title: 'Image manager',
		width: 725,
		height: 635,
		autoOpen: false,
		modal: true,
		buttons: [
	    {
	        text: "Set no image",
	        click: function() { 
						if (imagesInput!=null)
						{
	        		imagesInput.val('');
							imagesInput.trigger('change');
						}
						$(this).dialog("close");
	        }
	    },
	    {
	        text: "Create folder",
	        click: function() { createImageFolder(); }
	    },
	    {
	        text: "Close",
	        click: function() { $(this).dialog("close"); }
	    }
		]
	});
	
	$("#images-manager-dialog-url-set").button();
	$("#images-manager-dialog-url-set").click(function() {
		if (imagesInput!=null)
		{
			imagesInput.val($("#images-manager-dialog-url").val());
			imagesInput.trigger('change');
		}
		$("#images-manager-dialog").dialog("close");
	});

	// Create colorpicker dialog
	$("#colorpicker-dialog").dialog( { 
		title: 'Color picker',
		width: 215,
		height: 320,
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: [
	    {
	        text: "Ok",
	        click: function() { 
	        	colorPickerInput.val($("#colorpicker-dialog-input").val());
	        	colorPickerInput.trigger('change');
	        	$(this).dialog("close"); 
	        }
	    },
	    {
	        text: "Cancel",
	        click: function() { $(this).dialog("close"); }
	    }
		]
	});

	// Initialize tabs
	maintab =jQuery('#tabs','#mainContent').tabs({
		add: function(e, ui) {
		  // append close button
		  $(ui.tab).parents('li:first')
		      .append('<span class="ui-tabs-close ui-icon ui-icon-close" title="Fermer"></span>')
		      .find('span.ui-tabs-close')
		      .click(function() {
		          $("#leftMenu").accordion('activate', 0);
		          maintab.tabs('remove', $('li', maintab).index($(this).parents('li:first')[0]));
		      });
		  // select added tab
		  maintab.tabs('select', '#' + ui.panel.id);
		},
		select: function(event, ui) {
      $('h3', '#leftMenu').each(function() {
        if ($(this).attr("tab_id") == $(ui.tab).attr('href').substring(5)) {
          //$(this).click();
          //$(this).trigger("accordionchange");
          //switchTab($(this));
          //maintab.tabs('select',$(this).attr('tab_id'));
          return true;
        }
      });
			$("#propertiesContainer div").hide();
			var property=$(ui.tab).attr('href') + '-property';
			if ($(property).length)	
			{
				$("#propertiesContainer div:first").show();
				$("#propertiesContainer").show();
				$(property).show();
			}
			$("#OptionContainer div").hide();
			var propertybottom=$(ui.tab).attr('href') + '-propertybottom';
			if ($(propertybottom).length)	
			{
				$("#OptionContainer div:first").show();
				$("#OptionContainer").show();
        $("#openOptionContainer").show();
				$(propertybottom).show();
			}
		},
		remove: function(event, ui) {
			var property=$(ui.tab).attr('href') + '-property';
			if ($(property).length)	$(property).remove();
			var propertybottom=$(ui.tab).attr('href') + '-propertybottom';
			if ($(propertybottom).length)	$(propertybottom).remove();
		}
	});

	$("#leftMenu").bind( "accordionchange", function(event, ui) {
		if (ui.newHeader.attr('tab_id')) switchTab(ui.newHeader);
	});

	$("#leftMenu .subItem").click( function() {
		if ($(this).attr('tab_id')) switchTab($(this));
	});

	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
		    var check = false;
		    var re = new RegExp(regexp);
		    return this.optional(element) || re.test(value);
		},
		"Invalid value"
	);
	
	// Fill object table cache
	var body = '<read><config><objects/></config></read>';
	var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, async: false, dataType: 'xml',
		success: function(responseXML, status) {
			_objects = responseXML.documentElement;
		}
	});
	
	$('#colorpicker-dialog-picker').farbtastic(function(color) {
		$("#colorpicker-dialog-input").css('background-color',color);
		$("#colorpicker-dialog-input").val(color);
	});
	$("#colorpicker-dialog-input").keypress(function() {
		$("#colorpicker-dialog-input").css('background-color', "");
	});
	
	$("#colorpicker-dialog-none").button();
	$("#colorpicker-dialog-none").click(function() {
		$("#colorpicker-dialog-input").val('');
	});

	$('#images-manager-dialog-file').change(function() {
		$(this).upload('setup.php?ajax&uploadImage&path=' + imagesDir, function(responseXML) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status')!='success') messageBox("Error: " + xmlResponse.textContent, "Error", "alert"); else openImagesManager();
		}, 'xmlDoc');
	});
  
	$("#openOptionContainer").click(function() {
    if($('#OptionContainer').css('height') == '0px') {
       $('#OptionContainer div').show();
       $('#openOptionContainer span').removeClass('ui-icon-circle-triangle-n');
       $('#openOptionContainer span').addClass('ui-icon-circle-triangle-s'); 
     } else {
       $('#OptionContainer div').hide();
       $('#openOptionContainer').show();
       $('#openOptionContainer span').removeClass('ui-icon-circle-triangle-s');
       $('#openOptionContainer span').addClass('ui-icon-circle-triangle-n'); 
     }
  });
  
	loadSubPages();
  $("body").css("cursor", "auto");
});

function switchTab(tab) {

	var st = "#tab-"+tab.attr('tab_id');
	if($(st).html() != null ) {
		maintab.tabs('select',tab.attr('tab_id'));
		
		// Refresh design on tab switch
		if (tab.attr('tab_id')=="designedit") design.draw($("#tab-design-zone-list").val());
		else if (tab.attr('tab_id')=="subpageedit") subpages.draw($("#tab-subpages-list").val());
		
	} else
	{
		loading.show();
		maintab.tabs('add',st, tab.attr('tab_label'));
		maintab.tabs('select',tab.attr('tab_id'));
		$.ajax({
			url: tab.attr('tab_url'),
			type: "GET",
			dataType: "html",
			complete : function (req, err) {
				$(st,"#tabs").append(req.responseText);
			}
		});

	}
}

function readObjectValue(id)
{
	var value;
	var body = '<read><object id="' + id + '"/></read>';
	var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',async: false,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') != 'error') {
				value=xmlResponse.textContent;
			}
		}
	});
	return value;
}

function writeObjectValue(id, value)
{
	var result;
	var body = '<write><object id="' + id + '" value="' + value + '"/></write>';
	var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',async: false,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') != 'error') {
				result=true;
			}
			else
				result=false;
		}
	});
	return result;
}

function deleteImage(filename) {
	if (confirm("Are you sure you want to delete " + filename + "?")) {
		req = jQuery.ajax({ 
			type: 'post',
			url: 'setup.php?ajax&deleteImage&filename=' + filename, 
			dataType: 'xml', 
			success: function(responseXML, status) 
			{
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'success') 
					messageBox("An error has occured while deleting file", "Error", "alert");
				else
					openImagesManager();
			}
		});
	}
}

function deleteImageFolder(folder) {
	if (confirm("Are you sure you want to delete folder " + folder + " (folder must be empty) ?")) {
		req = jQuery.ajax({ 
			type: 'post',
			url: 'setup.php?ajax&deleteImageFolder&folder=' + folder, 
			dataType: 'xml', 
			success: function(responseXML, status) 
			{
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'success') 
					messageBox("An error has occured while deleting folder", "Error", "alert");
				else
					openImagesManager();
			}
		});
	}
}

function createImageFolder() {
	var folder=prompt("Please enter the new folder name","");
	if (folder!="") {
		req = jQuery.ajax({ 
			type: 'post',
			url: 'setup.php?ajax&createImageFolder&folder=' + imagesDir + folder, 
			dataType: 'xml', 
			success: function(responseXML, status) 
			{
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'success') 
					messageBox("An error has occured while creating folder", "Error", "alert");
				else
					openImagesManager();
			}
		});
	}
}

// Open Image Manager
function openImagesManager(input) {

	if (typeof(input)!='undefined') imagesInput=input;

	$("#images-manager-dialog").dialog("open");
	
	if (imagesInput.val().match(/^http:\/\//)) 
		$("#images-manager-dialog-url").val(imagesInput.val());
	else
		$("#images-manager-dialog-url").val('');

	$("#images-manager-dialog .info").html("Current path : <strong>" + ((imagesDir=="")?"root":imagesDir.replace(/\//g,' / ')) + "</strong>" );

	$("#images-manager-dialog .images").empty().append($("<img src='images/loading.gif'/>"));
	req = jQuery.ajax({
		type: 'post',
		url: 'design_technique.php?action=filelistdir&name=' + imagesDir,
		dataType: 'xml', 
		success: function(responseXML, status) 
		{
			$("#images-manager-dialog .images").empty();
			var xmlResponse = responseXML.documentElement;

			if (imagesDir!="")
			{
				var div = $("<div class='thumb'><div class='image'><img style='padding-top: 28px; padding-left: 5px;' src='images/parentfolder.png' /></div><div class='label'>Parent folder</div></div>");

				div.click(function () {
					imagesDir=imagesDir.replace(/[^\/]+\/$/g,"");
					openImagesManager();
				});
				$("#images-manager-dialog .images").append(div);
			}
			
			if (xmlResponse.getAttribute('status') != 'error') {

				$('directory', responseXML).each(function() {
					var file = $(this).text();
					var div = $("<div class='thumb'><img class='close' src='images/close.png'><div class='image'><img style='padding-top: 28px; padding-left: 5px;' src='images/folder.png' /></div><div class='label'>" + file + "</div></div>");

					$(".close", div).click(function(event) {
						deleteImageFolder(imagesDir + file);
						event.stopPropagation();
					});

					div.click(function () {
							imagesDir+=$(this).text()+"/";
							openImagesManager();
					});
					$("#images-manager-dialog .images").append(div);
				});

				$('file', responseXML).each(function() {
					var file = $(this).text();
					var re = new RegExp('\.(gif|jpe?g|png)$');
					if (re.test(file)) {
						var idpoint = file.lastIndexOf('.', 100);

						var div = $("<div class='thumb'><img class='close' src='images/close.png'><div class='image'><img style='display: none;' src='"+ tab_config.imageDir + imagesDir + file+"' alt='"+file+"' title='"+file+"'/></div><div class='label'>" + file + "</div></div>");

						$(".close", div).click(function(event) {
							deleteImage(imagesDir + file);
							event.stopPropagation();
						});

						$(".image img", div).load(function() {
							var label=$('.label', $(this).parent().parent());
							label.html(label.html() + '<br />(' + this.width + 'x' + this.height + ')');
							if ((this.width>120)||(this.height>120))
								if (this.width>this.height) this.width=120; else this.height=120;
							
							$(this).css('padding-left', Math.round(60-(this.width/2)) + 'px');
							$(this).css('padding-top', Math.round(60-(this.height/2)) + 'px');
							
							$(this).css('display','block');
						});
						
						div.click( function () {
								if (imagesInput!=null)
								{
									imagesInput.val(imagesDir+file);
									imagesInput.trigger('change');
								}
								$("#images-manager-dialog").dialog("close");
						});
						$("#images-manager-dialog .images").append(div);
					}
				});

			}
			else
				$("#images-manager-dialog .images").text(tr("Unable to load: ")+xmlResponse.textContent);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#images-manager-dialog .images").text(tr("Unable to load: ")+textStatus);
		}
	});
}

// Open color picker
function openColorPicker(input) {
	colorPickerInput=input;
	$("#colorpicker-dialog-input").val(input.val());
	$("#colorpicker-dialog").dialog("open");
}