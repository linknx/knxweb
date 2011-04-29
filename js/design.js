function gotoZone(id)
{
	$('#selectedZone').val(id);
	UIController.drawZone(id);
}

function loadDesign(design, version)
{
	var url = 'design/'+design+'/'+version+'.xml';

	req = jQuery.ajax({ url: url, dataType: 'xml', cache: false,
		success: function(responseXML, status) {
			UIController.setConfig(responseXML, design);
   		$('#selectedZone').empty();
   		$('#newGotoZone').empty();
			$('zone', responseXML).each(function() {
				var option = "<option value='"+this.getAttribute('id')+"'>"+this.getAttribute('name')+"</option>";
				$('#selectedZone').append(option);
				$('#newGotoZone').append(option);
			});
			UIController.drawZone();
		}
	});
}


jQuery(function($) {
	displayVersion();
	var design = "default";
	var version = "design";
	var matched;
	if (matched = location.search.match(/design=([^&]+)/))
		design = matched[1];
	if (matched = location.search.match(/version=([^&]+)/))
		version = matched[1];

	loadDesign(design, version);
  
	EIBCommunicator.periodicUpdate();
	runAfter.init();
});
