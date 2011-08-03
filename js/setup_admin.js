var admin = {

	refreshData: function() {
		var body = '<read><config><services></services></config></read>';
		var responseXML=queryLinknx(body);
		if (responseXML!=false)	{
			var data=$('admin',responseXML)[0];
			if (data.getAttribute('type')) {
				$('#admin-enable').attr('checked','true');
				$('#admin-type').val(data.getAttribute('type'));
				$('#admin-username').val(data.getAttribute('user'));
				$('#admin-password').val(data.getAttribute('pass'));
				$('#admin-apiid').val(data.getAttribute('api_id'));
			} else $('#admin-enable').removeAttr('checked');
			$('#admin-enable').trigger('change');
		}
	},
	
	saveData: function() {

		if ($("#admin-form").valid())
		{
			if ($('#admin-enable').attr("checked"))
			{
				var body = '<write><config><services><admin ' + 
										'type="' + $('#admin-type').val() + '" ' +
										'user="' + $('#admin-username').val() + '" ' +
										'pass="' + $('#admin-password').val() + '" ' +
										'api_id="' + $('#admin-apiid').val() + '" ' +
										'/></services></config></write>';
			} else var body = '<write><config><services><admin/></services></config></write>';
			loading.show();
			var responseXML=queryLinknx(body);
			loading.hide();
		  if (responseXML!=false) maintab.tabs('remove', '#tab-admin');
		}	
	}
}

jQuery(document).ready(function(){
  /*
	$("#admin-tab-table").tableize({
		sortable: false,
		selectable: false
	});
	
	$("#admin-enable").change(function() {
		$("#admin-tab-table input,select").attr('disabled',!($("#admin-enable").attr('checked')));
	});
	
	$("#admin-button-save").button();
	$("#admin-button-save").click(admin.saveData);
	
	admin.refreshData();
	*/
	loading.hide();
});