var smsgateway = {

	refreshData: function() {
		var body = '<read><config><services></services></config></read>';
		var responseXML=queryLinknx(body);
		if (responseXML!=false)	{
			var data=$('smsgateway',responseXML)[0];
			if (data.getAttribute('type')) {
				$('#smsgateway-enable').attr('checked','true');
				$('#smsgateway-type').val(data.getAttribute('type'));
				$('#smsgateway-username').val(data.getAttribute('user'));
				$('#smsgateway-password').val(data.getAttribute('pass'));
				$('#smsgateway-password-confirm').val(data.getAttribute('pass'));
				$('#smsgateway-apiid').val(data.getAttribute('api_id'));
				$('#smsgateway-from').val(data.getAttribute('from'));
			} else $('#smsgateway-enable').removeAttr('checked');
			$('#smsgateway-enable').trigger('change');
		}
	},
	
	saveData: function() {
		if ($('#smsgateway-password').val() == $('#smsgateway-password-confirm').val() ) 
		{ 
			if ($("#smsgateway-form").valid())
			{
				if ($('#smsgateway-enable').attr("checked"))
				{
					var body = '<write><config><services><smsgateway ' + 
											'type="' + $('#smsgateway-type').val() + '" ' +
											'user="' + $('#smsgateway-username').val() + '" ' +
											'pass="' + $('#smsgateway-password').val() + '" ' +
											'api_id="' + $('#smsgateway-apiid').val() + '" ' +
											'from="' + $('#smsgateway-from').val() + '" ' +
											'/></services></config></write>';
				} else var body = '<write><config><services><smsgateway/></services></config></write>';
				loading.show();
				var responseXML=queryLinknx(body);
				saveConfig();
				loading.hide();
				if (responseXML!=false) maintab.tabs('remove', '#tab-smsgateway');
			}
		} else {
			$('.error').show();
		}
	}
}

jQuery(document).ready(function(){

	$("#smsgateway-tab-table").tableize({
		sortable: false,
		selectable: false
	});
	
	$("#smsgateway-enable").change(function() {
		$("#smsgateway-tab-table input,select").attr('disabled',!($("#smsgateway-enable").attr('checked')));
	});

	$('#smsgateway-password-confirm').change(function() {
		if($("#smsgateway-password").val() == $(this).val()) {
			$('.error').hide();
		} else {
			$('.error').show();
		}
	});
	
	$("#smsgateway-button-save").button();
	$("#smsgateway-button-save").click(smsgateway.saveData);
	
	smsgateway.refreshData();
	loading.hide();
});