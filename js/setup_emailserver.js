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
				$('#emailserver-login').val(data.getAttribute('login'));
				$('#emailserver-pass').val(data.getAttribute('pass'));
				$('#emailserver-pass-confirm').val(data.getAttribute('pass'));
				$('#emailserver-from').val(data.getAttribute('from'));
			} else $('#emailserver-enable').removeAttr('checked');
			$('#emailserver-enable').trigger('change');
		}
	},
	
	saveData: function() {
		if ($('#emailserver-pass').val() == $('#emailserver-pass-confirm').val() 
			|| $('#emailserver-pass').val() == "" ) 
		{
			if ($("#emailserver-form").valid())
			{
				if ($('#emailserver-enable').attr("checked"))
				{
						var body = '<write><config><services><emailserver ' + 
												'type="' + $('#emailserver-type').val() + '" ' +
												'host="' + $('#emailserver-host').val() + '" ' +
												( ($('#emailserver-login').val()!='')?'login="' + $('#emailserver-login').val() + '" ':'') +
												( ($('#emailserver-pass').val()!='')?'pass="' + $('#emailserver-pass').val() + '" ':'') +
												'from="' + $('#emailserver-from').val() + '" ' +
												'/></services></config></write>';
				} else var body = '<write><config><services><emailserver/></services></config></write>';
					
				loading.show();
				var responseXML=queryLinknx(body);
				loading.hide();
				if (responseXML!=false) maintab.tabs('remove', '#tab-emailserver');
			}
		} else {
			$('.error').show();
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

	$('#emailserver-pass-confirm').change(function() {
		if($("#emailserver-pass").val() == $(this).val()) {
			$('.error').hide();
		} else {
			$('.error').show();
		} 
	})
	
	$("#emailserver-button-save").button();
	$("#emailserver-button-save").click(emailserver.saveData);

	$("#emailserver-form")[0].validator=$("#emailserver-form").validate();
	
	emailserver.refreshData();
	loading.hide();
});