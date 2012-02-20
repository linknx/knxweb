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
			$('#setupgeneral-persistence-type').val('');
			if (data) {
					$('#setupgeneral-persistence-type').val(data.getAttribute('type'));
					$('#setupgeneral-persistence-path').val(data.getAttribute('path'));
					$('#setupgeneral-persistence-logpath').val(data.getAttribute('logpath'));
					$('#setupgeneral-persistence-host').val(data.getAttribute('host'));
					$('#setupgeneral-persistence-user').val(data.getAttribute('user'));
					$('#setupgeneral-persistence-password').val(data.getAttribute('pass'));
					$('#setupgeneral-persistence-password-confirm').val(data.getAttribute('pass'));
					$('#setupgeneral-persistence-db').val(data.getAttribute('db'));
					$('#setupgeneral-persistence-table').val(data.getAttribute('table'));
					$('#setupgeneral-persistence-logtable').val(data.getAttribute('logtable'));
			}
			$('#setupgeneral-persistence-type').trigger('change');
			
			var data=$('location',responseXML)[0];
			if (data) {
					$('#setupgeneral-location-lat').val(data.getAttribute('lat'));
					$('#setupgeneral-location-lon').val(data.getAttribute('lon'));
			}

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
									
			if ($('#setupgeneral-persistence-type').val()=='file')
				body += '<persistence type="' + $('#setupgeneral-persistence-type').val() + '" path="' + $('#setupgeneral-persistence-path').val() + '" ' +
										(($('#setupgeneral-persistence-logpath').val()!='')?'logpath="' + $('#setupgeneral-persistence-logpath').val() + '"':'') + '/> ';
			else
				if ($('#setupgeneral-persistence-type').val()=='mysql')
					body += '<persistence type="' + $('#setupgeneral-persistence-type').val() + '" host="' + $('#setupgeneral-persistence-host').val() + 
										'" user="' + $('#setupgeneral-persistence-user').val() + '" pass="' + $('#setupgeneral-persistence-password').val() + 
										'" db="' + $('#setupgeneral-persistence-db').val() + '" table="' + $('#setupgeneral-persistence-table').val() + 
										'" logtable="' + $('#setupgeneral-persistence-logtable').val() +  '"/> ';
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
			loading.show();
			var responseXML=queryLinknx(body);
			saveConfig();
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
	$("#setupgeneral-button-save").click(function() {
		setupgeneral.saveData();
	});

	$("#setupgeneral-persistence-type").change(function() {
		$("#setupgeneral-form .setupgeneral-persistence-file").hide();
		$("#setupgeneral-form .setupgeneral-persistence-mysql").hide();
		// Disable inputs for form validation
		$("#setupgeneral-form .setupgeneral-persistence-file input").attr("disabled", "1");
		$("#setupgeneral-form .setupgeneral-persistence-mysql input").attr("disabled", "1");
		
		if ($("#setupgeneral-persistence-type").val()=='mysql'){
			$("#setupgeneral-form .setupgeneral-persistence-mysql").show();
			$("#setupgeneral-form .setupgeneral-persistence-mysql input").removeAttr("disabled");
		}
		if ($("#setupgeneral-persistence-type").val()=='file'){
			$("#setupgeneral-form .setupgeneral-persistence-file").show();
			$("#setupgeneral-form .setupgeneral-persistence-file input").removeAttr("disabled");
		}
	});

	$('#setupgeneral-exceptiondays-add').button();
	$('#setupgeneral-exceptiondays-add').click(function() {
		$("#exceptiondays-dialog-date").val('');
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
				"Cancel": function() { $(this).dialog("close"); },
				"Add": function() {
					if ($("#exceptiondays-form").valid())
					{
						var option=$('<option value="' + $("#exceptiondays-dialog-date").val() + '">' + $("#exceptiondays-dialog-date").val() + '</option>');
						$("#setupgeneral-exceptiondays").append(option);
						$(this).dialog("close");
					}
				}
		},
		resizable: false,
		title: "Add date",
		width: 400,
		modal: true
	});
	
	$('#setupgeneral-persistence-password-confirm').change(function() {
		if($("#setupgeneral-persistence-password").val() == $(this).val()) {
			$('.error').hide();
		} else {
			$('.error').show();
		} 
	});

	
	// Setup form validator
	$("#setupgeneral-form").validate();
	
	$("#exceptiondays-form")[0].validator=$("#exceptiondays-form").validate();
	$("#exceptiondays-dialog-date").rules("add", { regex: "^[0-9]{1,2}\/[0-9]{1,2}(\/[0-9]{4}){0,1}$" });

	$("#setupgeneral-exceptiondays").empty();
	
	setupgeneral.refreshData();
	loading.hide();
});