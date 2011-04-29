var objects = {
	
	// Open edit dialog for object 'id'
	editObject: function (id) {
	
		var object=$('#objects-tab-table tbody tr[object-id=' + id +']');
	
		if (object)
		{
			$("#edit-object-label").val(object[0].data.textContent);
			$("#edit-object-id").val(object[0].data.getAttribute('id'));
			$("#edit-object-id").attr('readonly','1');
			$("#edit-object-type").val(object[0].data.getAttribute('type'));
			$("#edit-object-gad").val(object[0].data.getAttribute('gad'));
			
			$("input[id^='edit-object-flag-']").attr('checked',false);
			if (object[0].data.getAttribute('flags')!=null) if (object[0].data.getAttribute('flags').indexOf('c')!=-1) $('#edit-object-flag-c').attr('checked',true);
			if (object[0].data.getAttribute('flags')!=null) if (object[0].data.getAttribute('flags').indexOf('r')!=-1) $('#edit-object-flag-r').attr('checked',true);
			if (object[0].data.getAttribute('flags')!=null) if (object[0].data.getAttribute('flags').indexOf('w')!=-1) $('#edit-object-flag-w').attr('checked',true);
			if (object[0].data.getAttribute('flags')!=null) if (object[0].data.getAttribute('flags').indexOf('t')!=-1) $('#edit-object-flag-t').attr('checked',true);
			if (object[0].data.getAttribute('flags')!=null) if (object[0].data.getAttribute('flags').indexOf('u')!=-1) $('#edit-object-flag-u').attr('checked',true);
			if (object[0].data.getAttribute('flags')!=null) if (object[0].data.getAttribute('flags').indexOf('f')!=-1) $('#edit-object-flag-f').attr('checked',true);
	
			if ((object[0].data.getAttribute('init')=='request')||(object[0].data.getAttribute('init')=='persist')) {
				$("#edit-object-init").val(object[0].data.getAttribute('init'));
				$("#edit-object-init-value").val('');
			} else
			{
				$("#edit-object-init").val('');
				$("#edit-object-init-value").val(object[0].data.getAttribute('init'));
			}
			$('#edit-object-init').trigger('change');
	
			$("#edit-object-form")[0].validator.resetForm();
			$('#edit-object-dialog').dialog('open');
		}
		
	},
	
	// Open edit dialog with blank fields
	newObject: function() {
	
		$("#edit-object-label").val('');
		$("#edit-object-id").val('');
		$("#edit-object-id").removeAttr('readonly');
		$("#edit-object-type").val('1.001');
		$("#edit-object-gad").val('');
		$("input[id^='edit-object-flag-']").attr('checked',false);
	
		$("#edit-object-init").val('request');
			$('#edit-object-init').trigger('change');
	
		$("#edit-object-form")[0].validator.resetForm();
		$('#edit-object-dialog').dialog('open');
	},
	
	// Delete object 'id'
	deleteObject: function(id)
	{
		loading.show();
		if (!isObjectUsed(id))
		{
			var body = '<write><config><objects><object id="' + id + '" delete="true"/></objects></config></write>';
			var responseXML=queryLinknx(body);
			if (responseXML!=false)	objects.refreshObjectList();
			loading.hide();
		} else messageBox('Vous ne pouvez pas supprimer cet objet car il est utilisé dans une règle.','Erreur','error');
	},
	
	// Process add/edit object
	processAddEdit: function()
	{
		if ($("#edit-object-form").valid())
		{
			var flags='';
			if ($('#edit-object-flag-c').attr("checked")) flags+='c';
			if ($('#edit-object-flag-r').attr("checked")) flags+='r';
			if ($('#edit-object-flag-w').attr("checked")) flags+='w';
			if ($('#edit-object-flag-t').attr("checked")) flags+='t';
			if ($('#edit-object-flag-u').attr("checked")) flags+='u';
			if ($('#edit-object-flag-f').attr("checked")) flags+='f';
		
			var body='<write><config><objects><object id="' + $("#edit-object-id").val() + '"' +
						' gad="' + $("#edit-object-gad").val() + '"' +
						((flags!='')?' flags="' + flags + '"':'') +
						' type="' + $("#edit-object-type").val() + '"' +
						' init="' + ( ($('#edit-object-init').val()!='') ? $("#edit-object-init").val() : $("#edit-object-init-value").val() ) + '"' +
						'>' +	$("#edit-object-label").val() + '</object></objects></config></write>';
		
			loading.show();
			var responseXML=queryLinknx(body);
			if (responseXML!=false)	objects.refreshObjectList();
			loading.hide();
			return true;
		} else return false;
	},
	
	// Open read/write dialog
	readwriteObject: function() {
		$("#readwrite-object-id").empty();
		$('#objects-tab-table tbody tr').each(function () {
			var option=$('<option>' + this.data.getAttribute('id') + '</option>').attr('value',this.data.getAttribute('id'));
			option[0].type=this.data.getAttribute('type');
			$("#readwrite-object-id").append(option);
		});
		
		$('#readwrite-object-id').trigger('change');
		
		$('#readwrite-object-dialog').dialog('open');
	},
	
	refreshObjectList: function() {
		loading.show();
	
		var body = '<read><config><objects/></config></read>';
		var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',
			success: function(responseXML, status) {
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'error') {
					
					$('#objects-tab-table tbody').empty();
	
					$('object', responseXML).each(function() {
						// set defaults
						if (!this.getAttribute('flags')) this.setAttribute('flags','cwtu')
						if (!this.getAttribute('init')) this.setAttribute('init','request')
						
						var tr = $("<tr>");
						tr.attr('object-id',this.getAttribute('id'));
						tr[0].data=this;
						tr.append($("<td>").html(this.getAttribute('id')));
						tr.append($("<td>").html(this.textContent));
						tr.append($("<td>").html(this.getAttribute('gad')));
						tr.append($("<td>").html(this.getAttribute('type')));
						tr.dblclick(function() {
							objects.editObject(this.data.getAttribute('id'));
						});
						$('#objects-tab-table').append(tr);
					});
					
					$("#objects-tab-table").trigger("refresh");
				}
				else
					messageBox(tr("Error: ")+responseXML.textContent, 'Erreur', 'alert');
				loading.hide();
			}
		});
	}
}

jQuery(document).ready(function(){

	objects.refreshObjectList();

	// Bind menu buttons
	$('#button-add-object').bind('click', objects.newObject);
	$('#button-edit-object').bind('click', function() {
		var selected=$('.row_selected:first','#objects-tab-table')[0];
		if (selected) objects.editObject(selected.data.getAttribute('id')); else messageBox('Veuillez choisir un objet dans la liste','Attention','alert');
	});
	$('#button-remove-object').bind('click', function() {
		var selected=$('.row_selected:first','#objects-tab-table')[0];
		if (selected) objects.deleteObject(selected.data.getAttribute('id')); else messageBox('Veuillez choisir un objet dans la liste','Attention','alert');
	});
	$('#button-read-object').bind('click', objects.readwriteObject);
	
	// Setup object edit form
	$("#edit-object-form")[0].validator=$("#edit-object-form").validate();

	// Setup object edit dialog
	$('#edit-object-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Annuler": function() { $(this).dialog("close"); },
				"Sauver": function() { if (objects.processAddEdit()) $(this).dialog("close"); }
		},
		resizable: false,
		title: "Ajouter/Editer un objet",
		width: "430px",
		modal: true
	});

	// Setup read/write object dialog
	$('#readwrite-object-dialog').dialog({ 
		autoOpen: false,
		buttons: { 
				"Lire": function() {
					var value=readObjectValue($("#readwrite-object-id").val());
					if (value!=false) 
						$("#readwrite-object-recv").val(value);
					else
						messageBox("Erreur lors de la lecture de l'object","Erreur","error");
				},
				"Ecrire": function() {
					if ($("#readwrite-object-val-select").css('display')!='none')
						var value=$("#readwrite-object-val-select").val();
					else
						var value=$("#readwrite-object-val-input").val();
	
					var result=writeObjectValue($("#readwrite-object-id").val(),value);
					if (!result) messageBox("Erreur lors de l'écriture de l'object","Erreur","error");
				},
				"Fermer": function() { $(this).dialog("close"); }
		},
		resizable: false,
		title: "Lire/Envoyer un objet",
		width: "430px",
		modal: true
	});
	
	$("#readwrite-object-readbutton").button();
	$("#readwrite-object-writebutton").button();
	
	$("#readwrite-object-id").bind('change', function() {
		if (_objectTypesValues[$("#readwrite-object-id option:selected")[0].type])
		{
			values=_objectTypesValues[$("#readwrite-object-id option:selected")[0].type];
			$("#readwrite-object-val-select").empty();
			$(values).each(function() { $("#readwrite-object-val-select").append('<option value="' + this + '">' + this + '</option>'); });
			$("#readwrite-object-val-select").show();
			$("#readwrite-object-val-input").hide();
		} else
		{
			$("#readwrite-object-val-select").hide();
			$("#readwrite-object-val-input").show();
		}
	});

	$('#edit-object-init').trigger('change');

	// Setup object table
	$('#objects-tab-table').show();
	$('#objects-tab-table').tableize({
		selectable: true,
		disableTextSelect: true
	});
	// Clean dummy tr
	$('#objects-tab-table tbody').empty();
	
});	
