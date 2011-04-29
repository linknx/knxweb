var maintab;

jQuery(document).ready(function(){

	$("#leftMenu").accordion({
		autoHeight: false
	});

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
			$("#propertiesContainer div").hide();
			var property=$(ui.tab).attr('href') + '-property';
			if ($(property).length)	
			{
				$("#propertiesContainer div:first").show();
				$("#propertiesContainer").show();
				$(property).show();
			}
		},
		remove: function(event, ui) {
			var property=$(ui.tab).attr('href') + '-property';
			if ($(property).length)	$(property).remove();
		}
	});

	$("#leftMenu").bind( "accordionchange", function(event, ui) {
		if (ui.newHeader.attr('tab_id')) switchTab(ui.newHeader);
	});

	$("#leftMenu .subItem").click( function() {
		if ($(this).attr('tab_id')) switchTab($(this));
	});

	$("#button-write-config").click(function() {
		loading.show();
		saveConfig();
		loading.hide();
	});
	
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
		    var check = false;
		    var re = new RegExp(regexp);
		    return this.optional(element) || re.test(value);
		},
		"Valeur incorrect"
	);
	
});

function switchTab(tab) {

	var st = "#tab-"+tab.attr('tab_id');
	if($(st).html() != null ) {
		maintab.tabs('select',tab.attr('tab_id'));
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
