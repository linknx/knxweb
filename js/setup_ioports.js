var ioports = {
	
	// Open edit dialog for ioport 'id'
	editIOport: function (id) {
	
		var ioport=$('#ioports-tab-table tbody tr[ioport-id=' + id +']');
		if (ioport)
		{
			$("#edit-ioport-id").val(ioport[0].data.getAttribute('id'));
			$("#edit-ioport-id").attr('readonly','1');

			if (ioport[0].data.getAttribute('type')=='serial')
			{
				$("#edit-ioport-type-serial").attr('checked',true);
				$("#edit-ioport-serial-dev").val(ioport[0].data.getAttribute('dev'));
				$("#edit-ioport-serial-speed").val(ioport[0].data.getAttribute('speed'));
				$("#edit-ioport-serial-framing").val(ioport[0].data.getAttribute('framing'));
				if (ioport[0].data.getAttribute('flow')) $("#edit-ioport-serial-flow").val(ioport[0].data.getAttribute('flow')); else $("#edit-ioport-serial-flow").val('none');
        // only in linknx version >= 0.0.1.31 !!!
        if (ioport[0].data.getAttribute('mode')) $("#edit-ioport-serial-mode").val(ioport[0].data.getAttribute('mode')); else $("#edit-ioport-serial-mode").val('text');
        if (ioport[0].data.getAttribute('timeout')) $("#edit-ioport-serial-timeout").val(ioport[0].data.getAttribute('timeout')); else $("#edit-ioport-serial-timeout").val('');
        if (ioport[0].data.getAttribute('regex')=='true')	$("#edit-ioport-serial-regex").attr('checked',true); else $("#edit-ioport-serial-regex").removeAttr('checked');
			} else if (ioport[0].data.getAttribute('type')=='tcp')
			{
				$("#edit-ioport-type-tcp").attr('checked',true);
				$("#edit-ioport-tcp-host").val(ioport[0].data.getAttribute('host'));
				$("#edit-ioport-tcp-port").val(ioport[0].data.getAttribute('port'));
				if (ioport[0].data.getAttribute('permanent')=='true')	$("#edit-ioport-tcp-permanent").attr('checked',true); else $("#edit-ioport-tcp-permanent").removeAttr('checked');
			} else
			{
				$("#edit-ioport-type-udp").attr('checked',true);
				$("#edit-ioport-udp-host").val(ioport[0].data.getAttribute('host'));
				$("#edit-ioport-udp-port").val(ioport[0].data.getAttribute('port'));
				$("#edit-ioport-udp-rxport").val(ioport[0].data.getAttribute('rxport'));
			}
			ioports.switchType();
			
			$("#edit-ioport-form")[0].validator.resetForm();
			$('#edit-ioport-dialog').dialog('open');

      $("#edit-ioport-serial-mode").change(function() {
        if (this.value != 'raw') $("#edit-ioport-serial-timeout").attr("disabled", "1");
        else $("#edit-ioport-serial-timeout").removeAttr("disabled"); 
      });
      $("#edit-ioport-serial-mode").trigger("change");
		}
		
	},
	
	// Open edit dialog with blank fields
	newIOport: function() {
	
		$("#edit-ioport-type-tcp").attr('checked',true);
		$("#edit-ioport-id").val('');
		$("#edit-ioport-udp-host").val('');
		$("#edit-ioport-udp-port").val('');
		$("#edit-ioport-udp-rxport").val('');
		$("#edit-ioport-tcp-host").val('');
		$("#edit-ioport-tcp-port").val('');
		$("#edit-ioport-tcp-permanent").val('');
		$("#edit-ioport-serial-dev").val('');
		$("#edit-ioport-serial-speed").val('');
		$("#edit-ioport-serial-framing").val('');
		$("#edit-ioport-serial-flow").val('none');
		$("#edit-ioport-serial-mode").val('text');
		$("#edit-ioport-serial-timeout").val('');
		$("#edit-ioport-serial-regex").removeAttr('checked');

		$("#edit-ioport-id").removeAttr('readonly');

		ioports.switchType();

		$("#edit-ioport-form")[0].validator.resetForm();
		$('#edit-ioport-dialog').dialog('open');

    $("#edit-ioport-serial-mode").change(function() {
      if (this.value != 'raw') $("#edit-ioport-serial-timeout").attr("disabled", "1");
      else $("#edit-ioport-serial-timeout").removeAttr("disabled"); 
    });
    $("#edit-ioport-serial-mode").trigger("change");
	},
	
	// Delete ioport 'id'
	deleteIOport: function(id)
	{
		loading.show();
		if (!isIOportUsed(id))
		{
			var body = '<write><config><services><ioports><ioport id="' + id + '" delete="true"/></ioports></services></config></write>';
			var responseXML=queryLinknx(body);
			if (responseXML!=false)	ioports.refreshIOportList();
			loading.hide();
		} else messageBox("You cannot delete this IO port because it's used in a rule.", 'Error','error');
	},
	
	// Process add/edit ioport
	processAddEdit: function()
	{
		if ($("#edit-ioport-form").valid())
		{
		
			var body='<write><config><services><ioports><ioport id="' + $("#edit-ioport-id").val() + '" ';
			if ($("#edit-ioport-type-tcp").attr('checked'))
			{
				body+='type="tcp" ';
				body+='host="' + $("#edit-ioport-tcp-host").val() + '" ';
				body+='port="' + $("#edit-ioport-tcp-port").val() + '" ';
				body+='permanent="' + (($("#edit-ioport-tcp-permanent").attr('checked'))?'true':'false') + '" ';
			} else if ($("#edit-ioport-type-udp").attr('checked')) {
				body+='type="udp" ';
				body+='host="' + $("#edit-ioport-udp-host").val() + '" ';
				body+='port="' + $("#edit-ioport-udp-port").val() + '" ';
				body+='rxport="' + $("#edit-ioport-udp-rxport").val() + '" ';
			}	else {
				body+='type="serial" ';
        body+='dev="' + $("#edit-ioport-serial-dev").val() + '" ';
				body+='speed="' + $("#edit-ioport-serial-speed").val() + '" ';
				body+='framing="' + $("#edit-ioport-serial-framing").val() + '" ';
				body+='flow="' + $("#edit-ioport-serial-flow").val() + '" ';
				body+='mode="' + $("#edit-ioport-serial-mode").val() + '" ';
				if ( $("#edit-ioport-serial-mode").val() == 'raw') body+='timeout="' + $("#edit-ioport-serial-timeout").val() + '" ';
				body+='regex="' + (($("#edit-ioport-serial-regex").attr('checked'))?'true':'false') + '" ';
			}
			body+='/></ioports></services></config></write>';
		
			loading.show();
			var responseXML=queryLinknx(body);
			if (responseXML!=false)	ioports.refreshIOportList();
			loading.hide();
			return true;
		} else return false;
	},
	
	switchType: function() {
		$('#edit-ioport-serial-tbody input').attr('disabled','1');
		$('#edit-ioport-udp-tbody input').attr('disabled','1');
		$('#edit-ioport-tcp-tbody input').attr('disabled','1');
		$('#edit-ioport-serial-tbody').hide();
		$('#edit-ioport-udp-tbody').hide();
		$('#edit-ioport-tcp-tbody').hide();

		if ($('#edit-ioport-type-tcp').attr('checked')) {
			$('#edit-ioport-tcp-tbody input').removeAttr('disabled');
			$('#edit-ioport-tcp-tbody').show();
		}	else if ($('#edit-ioport-type-udp').attr('checked')) {
			$('#edit-ioport-udp-tbody input').removeAttr('disabled');
			$('#edit-ioport-udp-tbody').show();
		}	else {
			$('#edit-ioport-serial-tbody input').removeAttr('disabled');
			$('#edit-ioport-serial-tbody').show();
		}
	},
	
	refreshIOportList: function() {
		loading.show();
	
		var body = '<read><config><services><ioports /></services></config></read>';
		var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',
			success: function(responseXML, status) {
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'error') {
					
					$('#ioports-tab-table tbody').empty();
	
					$('ioport', responseXML).each(function() {
						var tr = $("<tr>");
						tr.attr('ioport-id',this.getAttribute('id'));
						tr[0].data=this;
						tr.append($("<td>").html(this.getAttribute('id')));
						if (this.getAttribute('type')) tr.append($("<td>").html(this.getAttribute('type'))); else tr.append($("<td>").html('udp'));
						
						if (this.getAttribute('type')=='serial')
							tr.append($("<td>").html(this.getAttribute('dev')));
						else
							tr.append($("<td>").html(this.getAttribute('host')));

						tr.dblclick(function() {
							ioports.editIOport(this.data.getAttribute('id'));
						});
						$('#ioports-tab-table').append(tr);
					});
					
					$("#ioports-tab-table").trigger("refresh");
				}
				else
					messageBox(tr("Error: ")+responseXML.textContent, 'Error', 'alert');
				loading.hide();
			}
		});
	}
}

jQuery(document).ready(function(){

	ioports.refreshIOportList();

	// Bind menu buttons
	$('#button-add-ioport').bind('click', ioports.newIOport);
	$('#button-edit-ioport').bind('click', function() {
		var selected=$('.row_selected:first','#ioports-tab-table')[0];
		if (selected) ioports.editIOport(selected.data.getAttribute('id')); else messageBox('Please select an IO port in the list','Warning','alert');
	});
	$('#button-remove-ioport').bind('click', function() {
		var selected=$('.row_selected:first','#ioports-tab-table')[0];
		if (selected) ioports.deleteIOport(selected.data.getAttribute('id')); else messageBox('Please select an IO port in the list','Warning','alert');
	});
	
	// Setup ioport edit form
	$("#edit-ioport-form")[0].validator=$("#edit-ioport-form").validate();

	// Setup ioport edit dialog
	$('#edit-ioport-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Cancel": function() { $(this).dialog("close"); },
				"Save": function() { if (ioports.processAddEdit()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Add/Edit IO port",
		width: "540px",
		modal: true
	});
	
	$('#edit-ioport-type-tcp').click(ioports.switchType);
	$('#edit-ioport-type-udp').click(ioports.switchType);
	$('#edit-ioport-type-serial').click(ioports.switchType);
	ioports.switchType();
	
	// Setup ioport table
	$('#ioports-tab-table').show();
	$('#ioports-tab-table').tableize({
		selectable: true,
		disableTextSelect: true
	});
	// Clean dummy tr
	$('#ioports-tab-table tbody').empty();
	
});	
