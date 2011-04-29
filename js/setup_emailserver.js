var emailserver = {

	refreshData: function() {
		var body = '<read><config><services></services></config></read>';
		var responseXML=queryLinknx(body);
		if (responseXML!=false)	{
			var data=$('emailserver',responseXML)[0];
			if (data.getAttribute('type')) {
				$('#emailserver-enable').attr('checked','true');
				$('#emailserver-type').val(data.getAttribute('type'));
				$('#emailserver-host').val(data.getAttribute('host'));
				$('#emailserver-user').val(data.getAttribute('user'));
				$('#emailserver-pass').val(data.getAttribute('pass'));
				$('#emailserver-from').val(data.getAttribute('from'));
			} else $('#emailserver-enable').removeAttr('checked');
			$('#emailserver-enable').trigger('change');
		}
	},
	
	saveData: function() {
		
		if ($("#emailserver-form").valid())
		{
			if ($('#emailserver-enable').attr("checked"))
			{
					var body = '<write><config><services><emailserver ' + 
											'type="' + $('#emailserver-type').val() + '" ' +
											'host="' + $('#emailserver-host').val() + '" ' +
											( ($('#emailserver-user').val()!='')?'user="' + $('#emailserver-user').val() + '" ':'') +
											( ($('#emailserver-pass').val()!='')?'pass="' + $('#emailserver-pass').val() + '" ':'') +
											'from="' + $('#emailserver-from').val() + '" ' +
											'/></services></config></write>';
			} else var body = '<write><config><services><emailserver/></services></config></write>';
				
			loading.show();
			var responseXML=queryLinknx(body);
			loading.hide();
		  if (responseXML!=false) maintab.tabs('remove', '#tab-emailserver');
		}
	}
}

jQuery(document).ready(function(){

	$("#emailserver-tab-table").tableize({
		sortable: false,
		selectable: false
	});
	
	$("#emailserver-enable").change(function() {
		$("#emailserver-tab-table input,select").attr('disabled',!($("#emailserver-enable").attr('checked')));
	});
	
	$("#emailserver-button-save").button();
	$("#emailserver-button-save").click(emailserver.saveData);

	$("#emailserver-form")[0].validator=$("#emailserver-form").validate();
	
	emailserver.refreshData();
	loading.hide();
});