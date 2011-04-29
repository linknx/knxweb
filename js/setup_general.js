var setupgeneral = {

	refreshData: function() {

		var body = '<read><config><services></services></config></read>';
		var responseXML=queryLinknx(body);
		if (responseXML!=false)	{
			var data=$('knxconnection',responseXML)[0];
			if (data) {
				var matches = data.getAttribute('url').match(/(.*):(.*)/);
				if (matches.length>0)
				{
					$('#setupgeneral-knxconnection-type').val(matches[1]);
					$('#setupgeneral-knxconnection-value').val(matches[2]);
				}
			} else $('#setupgeneral-knxconnection-value').val('');
			
			var data=$('xmlserver',responseXML)[0];
			if (data) {
					$('#setupgeneral-xmlserver-type').val(data.getAttribute('type'));
					$('#setupgeneral-xmlserver-port').val(data.getAttribute('port'));
			}

			var data=$('persistence',responseXML)[0];
			if (data) {
					$('#setupgeneral-persistence-type').val(data.getAttribute('type'));
					$('#setupgeneral-persistence-path').val(data.getAttribute('path'));
					$('#setupgeneral-persistence-logpath').val(data.getAttribute('logpath'));
			}
			$('#setupgeneral-persistence-type').trigger('change');

			$('exceptiondays date', responseXML).each(function() {
				var date=lz(this.getAttribute('day')) + '/' + lz(this.getAttribute('month')) + ((this.getAttribute('year'))?'/' + this.getAttribute('year'):''); 
				var option=$('<option value="' + date + '">' + date + '</option>');
				$("#setupgeneral-exceptiondays").append(option);
			});
		}
	},
	
	saveData: function() {

		if ($("#setupgeneral-form").valid())
		{
			var body = '<write><config><services>' + 
									'<knxconnection url="' + $('#setupgeneral-knxconnection-type').val() + ':' + $('#setupgeneral-knxconnection-value').val() + '" /> ' +
									'<xmlserver type="' + $('#setupgeneral-xmlserver-type').val() + '" port="' + $('#setupgeneral-xmlserver-port').val() + '" /> ';
									
			if ($('#setupgeneral-persistence-type').val()!='disabled')
				body += '<persistence type="' + $('#setupgeneral-persistence-type').val() + '" path="' + $('#setupgeneral-persistence-path').val() + '" ' +
										(($('#setupgeneral-persistence-logpath').val()!='')?'logpath="' + $('#setupgeneral-persistence-logpath').val() + '"':'') + '/> ';
			else
				body += '<persistence />';
			
			body += '<exceptiondays clear="true">';
			$("#setupgeneral-exceptiondays option").each(function () {
				var matches=$(this).val().match('^([0-9]){1,2}\/([0-9]){1,2}(\/([0-9]{4})){0,1}$');
				if (matches)
				{
					if (matches[4])
						body += '<date day="' + matches[1] + '" month="' + matches[2] + '" year="' + matches[4] + '" />';
					else
						body += '<date day="' + matches[1] + '" month="' + matches[2] + '" />';
				}					
			});
			body += '</exceptiondays>';

			if (($('#setupgeneral-location-lat').val()!='')&&($('#setupgeneral-location-lon').val()!=''))
				body += '<location lon="' + $('#setupgeneral-location-lon').val() + '" lat="' + $('#setupgeneral-location-lat').val() + '"/>';
				
			body += '</services></config></write>';
//alert(body);
//return;
			loading.show();
			var responseXML=queryLinknx(body);
			loading.hide();
		  if (responseXML!=false) maintab.tabs('remove', '#tab-setupgeneral');
		}	
	}
}

jQuery(document).ready(function(){

	$("#setupgeneral-tab-table").tableize({
		sortable: false,
		selectable: false
	});
	
	$("#setupgeneral-enable").change(function() {
		$("#setupgeneral-tab-table input,select").attr('disabled',!($("#setupgeneral-enable").attr('checked')));
	});
	
	$("#setupgeneral-button-save").button();
	$("#setupgeneral-button-save").click(setupgeneral.saveData);

	$("#setupgeneral-persistence-type").change(function() {
		$("#setupgeneral-persistence-path").attr('disabled', ($("#setupgeneral-persistence-type").val()=='disabled') );
		$("#setupgeneral-persistence-logpath").attr('disabled', ($("#setupgeneral-persistence-type").val()=='disabled') );
	});

	$('#setupgeneral-exceptiondays-add').button();
	$('#setupgeneral-exceptiondays-add').click(function() {
		$('#exceptiondays-dialog').dialog('open');
	});

	$('#setupgeneral-exceptiondays-remove').button();
	$('#setupgeneral-exceptiondays-remove').click(function() {
		if ($("#setupgeneral-exceptiondays").val())
			$("#setupgeneral-exceptiondays option:selected").remove();
		else
			messageBox("Veuillez choisir une date dans la liste", "Attention", "alert");
	});
	
	$('#exceptiondays-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { $(this).dialog("close"); },
				"Ajouter": function() {
					if ($("#exceptiondays-form").valid())
					{
						var option=$('<option value="' + $("#exceptiondays-dialog-date").val() + '">' + $("#exceptiondays-dialog-date").val() + '</option>');
						$("#setupgeneral-exceptiondays").append(option);
						$(this).dialog("close");
					}
				}
		},
		resizable: false,
		title: "Ajouter une date",
		width: 400,
		modal: true
	});
	
	$("#exceptiondays-form")[0].validator=$("#exceptiondays-form").validate();
	$("#exceptiondays-dialog-date").rules("add", { regex: "^[0-9]{1,2}\/[0-9]{1,2}(\/[0-9]{4}){0,1}$" });

	$("#setupgeneral-exceptiondays").empty();
	
	setupgeneral.refreshData();
	loading.hide();
});