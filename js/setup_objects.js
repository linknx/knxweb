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
			$("#edit-object-type").attr('disabled','1');
			$("#edit-object-gad").val(object[0].data.getAttribute('gad'));

			$("input[id^='edit-object-flag-']").attr('checked',false);
			if (object[0].data.getAttribute('flags')!=null) {
				if (object[0].data.getAttribute('flags').indexOf('c')!=-1) $('#edit-object-flag-c').attr('checked',true);
				if (object[0].data.getAttribute('flags').indexOf('r')!=-1) $('#edit-object-flag-r').attr('checked',true);
				if (object[0].data.getAttribute('flags').indexOf('w')!=-1) $('#edit-object-flag-w').attr('checked',true);
				if (object[0].data.getAttribute('flags').indexOf('t')!=-1) $('#edit-object-flag-t').attr('checked',true);
				if (object[0].data.getAttribute('flags').indexOf('u')!=-1) $('#edit-object-flag-u').attr('checked',true);
				//if (object[0].data.getAttribute('flags').indexOf('s')!=-1) $('#edit-object-flag-s').attr('checked',true);
				//if (object[0].data.getAttribute('flags').indexOf('f')!=-1) $('#edit-object-flag-f').attr('checked',true);
        if (object[0].data.getAttribute('flags').indexOf('f')!=-1 || object[0].data.getAttribute('flags').indexOf('s')!=-1) $('#edit-object-flag-f').attr('checked',true);
			}

			if ((object[0].data.getAttribute('init')=='request')||(object[0].data.getAttribute('init')=='persist')) {
				$("#edit-object-init").val(object[0].data.getAttribute('init'));
				$("#edit-object-init-value").val('');
			} else
			{
				$("#edit-object-init").val('');
				$("#edit-object-init-value").val(object[0].data.getAttribute('init'));
			}
			if (object[0].data.getAttribute('log')!=null) $('#edit-object-flag-log').attr('checked',true);

			var listener = false;
			$('#edit-object-td-listener').empty();
			// Listener
			$('listener', $(object[0].data)).each(function() {
				// Gad listener
				var atrlistener = $("<tr>");
				var id = $("#edit-object-id").val();
        id = id.replace(" ", "_");
				atrlistener.append($('<th>' + tr("Listener") + ' :</th><td> <input type="text" class="listener_' + id + '" value="' + this.getAttribute('gad') + '" size="10" > <input type="checkbox" class="flag_listener" id="flag_listener_' + id + '" ' + (this.getAttribute('read')?'checked="true"':'') + '> ' + tr("Read") + ' </td>'));
				atrlistener.appendTo($('#edit-object-td-listener'));
				listener = true;
			});

			$('#edit-object-init').trigger('change');

			$("#edit-object-form")[0].validator.resetForm();
			$('#edit-object-dialog').dialog('open');
			if (listener) {
				$('#edit-object-dialog').dialog('option','width',650);
				$('#edit-object-td-listener').show();
			}
		}
	},

	// Open edit dialog with blank fields
	newObject: function() {

		$("#edit-object-label").val('');
		$("#edit-object-id").val('');
		$("#edit-object-id").removeAttr('readonly');
		$("#edit-object-type").val('1.001');
		$("#edit-object-type").removeAttr('disabled');
		$("#edit-object-gad").val('');
		$("input[id^='edit-object-flag-']").attr('checked',false);

		$("#edit-object-init").val('request');
			$('#edit-object-init').trigger('change');

		$("#edit-object-form")[0].validator.resetForm();
		$('#edit-object-td-listener').empty();
		$('#edit-object-dialog').dialog('open');
		$('#edit-object-dialog').dialog('option','width',430);
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
		} else messageBox(tr("You cannot delete this Object because it's used in a rule."), tr('Error'),'error');
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
			//if ($('#edit-object-flag-s').attr("checked")) flags+='s';
			if ($('#edit-object-flag-f').attr("checked")) flags+='f';

      var id = $("#edit-object-id").val();
      id = id.replace(" ", "_");
			var body='<write><config><objects><object id="' + id + '"' +
						' gad="' + $("#edit-object-gad").val() + '"' +
						((flags!='')?' flags="' + flags + '"':'') +
						' type="' + $("#edit-object-type").val() + '"' +
						' init="' + ( ($('#edit-object-init').val()!='') ? $("#edit-object-init").val() : $("#edit-object-init-value").val() ) + '"' +
						(($('#edit-object-flag-log').attr("checked"))?' log="true"':'') +
						'>' +	trim($("#edit-object-label").val()) + '';

			//Listener
			$('input:text',$('#edit-object-td-listener')).each( function() {
				if ($(this).val() !="") {
					body+='<listener gad="' + $(this).val() + '"';
					if ($(".flag_listener",$(this).parent()).attr('checked')) body+= ' read="true"';
					body+=' />';
				}
			});

			body+='</object></objects></config></write>';

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

	dialoggraph: function(_this, idobject) {
		//messageBox(tr("TODO ... generate a graph for the object : ") + idobject, tr('Error'),'alert');
    var nbenreg = 10;
    var url = 'readfile.php?objectlog=' + idobject + '&nbenreg=' + nbenreg + '&output=html';
  	req = jQuery.ajax({ type: 'post', url: url, dataType: 'html',
  			success: function(responseHTML, status)
  			{
  				//$("#"+dest).html(responseHTML);
  				$(_this).attr("title", tr("Log")+" : \n"+responseHTML.replace(new RegExp("(<br />)", "g"),"\n").replace(new RegExp("(&gt;)", "g"),">"));
  			},
  			error: function (XMLHttpRequest, textStatus, errorThrown) {
  				messageBox(tr("Error Unable to load: ")+textStatus, tr('Error'), 'alert');
  			}
  	});
	},

	refreshObjectList: function() {
		loading.show();
	  var tab_object_value = [];

    var responseXML = queryLinknx('<read><objects/></read>');
    if (responseXML) {
			$('object', responseXML).each(function() {
				tab_object_value[this.getAttribute('id')] = this.getAttribute('value');
			});
		}

    responseXML = queryLinknx('<read><config><objects/></config></read>');
    if (responseXML) {
			$('#objects-tab-table tbody').empty();

			// Update object cache
			_objects=responseXML;

			$('object', responseXML).each(function() {
				// set defaults
				if (!this.getAttribute('flags')) this.setAttribute('flags','cwtu')
				if (!this.getAttribute('init')) this.setAttribute('init','request')

				var tr = $("<tr>");
				tr.attr('object-id',this.getAttribute('id'));
				tr[0].data=this;
				tr.append($("<td>").html(this.getAttribute('id')));
        var bplog = "";
        if (this.getAttribute('log')=="true") bplog = "&nbsp;<span onclick='objects.dialoggraph(this, \"" + this.getAttribute('id') + "\");' style='position:absolute;' class='ui-state-default ui-corner-all'><span class='ui-icon ui-icon-signal'></span></span>";
				tr.append($("<td style='text-align: center;' />").html(tab_object_value[this.getAttribute('id')] + bplog ));
				tr.append($("<td>").html(this.textContent));
        var listener = "&nbsp;";
        if ($(this).children().is('listener')) listener = "&nbsp;<span style='position:absolute;' class='ui-state-default ui-corner-all' title='Listener' ><span style='margin: 1px 5px;display: block;' >L</span></span>";
        //console.log(this.getAttribute('id'), this, $(this).children(), $(this).children().is('listener'));
				tr.append($("<td>").html((this.getAttribute('gad')?this.getAttribute('gad'):"&nbsp;") + listener ));
				tr.append($("<td>").html(tab_objectTypes[this.getAttribute('type')]));
				tr.dblclick(function() {
					objects.editObject(this.data.getAttribute('id'));
				});
				$('#objects-tab-table').append(tr);
			});

			$("#objects-tab-table").trigger("refresh");
		}
		loading.hide();
	}
}

function trim (myString)
{
  return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

jQuery(document).ready(function(){

	// Bind menu buttons
	$('#button-add-object').bind('click', objects.newObject);
	$('#button-edit-object').bind('click', function() {
		var selected=$('.row_selected:first','#objects-tab-table')[0];
		if (selected) objects.editObject(selected.data.getAttribute('id')); else messageBox(tr('Please select an objet'),tr('Attention'),'alert');
	});
	$('#button-remove-object').bind('click', function() {
		var selected=$('.row_selected:first','#objects-tab-table')[0];
		if (selected) objects.deleteObject(selected.data.getAttribute('id')); else messageBox(tr('Please select an objet'),tr('Attention'),'alert');
	});
	$('#button-read-object').bind('click', objects.readwriteObject);

	// Setup object edit form
	$("#edit-object-form")[0].validator=$("#edit-object-form").validate();

	// Setup object edit dialog
	$('#edit-object-dialog').dialog({
		autoOpen: false,
		buttons: [
      { text: tr("Add a listener"), click: function() {
					var atrlistener = $("<tr>");
					var id = $("#edit-object-id").val();
          id = id.replace(" ", "_");
					atrlistener.append($('<th>' + tr("Listener :") + '</th><td> <input type="text" class="listener_' + id + '" value="" size="10" >  <input type="checkbox" class="flag_listener" id="flag_listener_' + id + '" > ' + tr("Read") + ' </td>'));
					atrlistener.appendTo($('#edit-object-td-listener'));
					$(this).dialog('option','width',650);
					$('#edit-object-td-listener').show();
      } },
      { text: tr("Cancel"), click: function() {
        $(this).dialog("close");
        $('#edit-object-td-listener').hide();
        $(this).dialog('option','width',430);
      } },
      { text: tr("Save"), click: function() {
        if (objects.processAddEdit()) {
          $(this).dialog("close");
          $('#edit-object-td-listener').hide();
          $(this).dialog('option','width',430);
        }
      } }
    ],
		resizable: false,
		title: tr("Add/Edit an objet"), //"Ajouter/Editer un objet",
		width: "430px",
		modal: true
	});
	$('#edit-object-td-listener').hide();

	// Setup read/write object dialog
	$('#readwrite-object-dialog').dialog({
		autoOpen: false,
		buttons: [
      { text: tr("Read"), click: function() {
					var value=readObjectValue($("#readwrite-object-id").val());
					if (value!==false)
						$("#readwrite-object-recv").val(value);
					else
            messageBox(tr("Error when we read the object"),tr("Error"),"error");
      } },
      { text: tr("Write"), click: function() {
					if ($("#readwrite-object-val-select").css('display')!='none')
						var value=$("#readwrite-object-val-select").val();
					else
						var value=$("#readwrite-object-val-input").val();

					var result=writeObjectValue($("#readwrite-object-id").val(),value);
					if (!result) messageBox(tr("Error when we read the object"),tr("Error"),"error");
      } },
      { text: tr("Close"), click: function() { $( this ).dialog("close"); } }
    ],
		resizable: false,
		title: tr("Read/Write value of an objet"),
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
			//$(values).each(function() { $("#readwrite-object-val-select").append('<option value="' + this + '">' + this + '</option>'); });
			$(values).each(function() { $("#readwrite-object-val-select").append('<option value="' + this + '">' + tr(this.substr(0, 1).toUpperCase() + this.substr(1)) + '</option>'); });
			$("#readwrite-object-val-select").show();
			$("#readwrite-object-val-input").hide();
		} else
		{
			$("#readwrite-object-val-select").hide();
			$("#readwrite-object-val-input").show();
		}
	});

	$("#edit-object-type").bind('change', function() {
		if (_objectTypesValues[$("#edit-object-type option:selected")[0].type])
		{
			values=_objectTypesValues[$("#edit-object-type option:selected")[0].type];
			$("#edit-object-init-val-select").empty();
			$(values).each(function() { $("#edit-object-init-val-select").append('<option value="' + this + '">' + this + '</option>'); });
			$("#edit-object-init-val-select").show();
		} else
		{
			$("#edit-object-init-val-select").hide();
		}
	});

	$('#edit-object-init').change(function() {
		if ($('#edit-object-init').val()=='') {
			$('#edit-object-init-value').css('visibility','visible');
			$('#edit-object-init-val-select').css('visibility','visible');
		} else {
			$('#edit-object-init-value').css('visibility','hidden');
			$('#edit-object-init-val-select').css('visibility','hidden');
		}
	});

	$('#edit-object-init').trigger('change');

	// Setup object table
	$('#objects-tab-table').show();
	$('#objects-tab-table').tableize({
		selectable: true,
	});
	// Clean dummy tr
	$('#objects-tab-table tbody').empty();

  objects.refreshObjectList();

/* test ETS.xml */ // TODO mettre dans le paramétrage/config le path + nom du fichier
  // Move tab-objects-propertybottom DOM to #OptionContainer on the bottom of the page
  var etstab = $('#tab-objects-propertybottom').clone();
  $('#tab-objects-propertybottom').remove();
  $('#OptionContainer').append(etstab);


  $("#objects-tab-table-ets").show();
  $("#objects-tab-table-ets").tableize({
		selectable: true,
    id: 'objects-tab-table-ets',
    pager: 'objects-ets-pager',
    pagersize: 10,
    tablesorterOption: {
    		widgets: ['zebra', "filter"],
        sortList:[[0,0],[1,0]],
        headers: { 7:{sorter: false}, 8:{sorter: false}, 9:{sorter: false}, 10:{sorter: false}, 11:{sorter: false}}
    	}
	});
  $("#objects-ets-pager").css("position","static");
  $("#objects-ets-pager").show();

  etstab.show();
  $("#OptionContainer").show();
  $("#openOptionContainer").show();

  //$("#objects-tab-table-ets tbody tr").dblclick(function(){
  $("#objects-tab-table-ets tbody tr").live( 'dblclick', function(){
    msg = "";
    i = 0;
    tab_data = [];
    $("td", this).each(function(){
      i++
      msg = msg + i + " : " + this.textContent + " / ";
      tab_data[i] = this.textContent;
    });
    var listener = false;

    $("#edit-object-label").val('');
    $("#edit-object-id").val('');
    $("#edit-object-id").removeAttr('readonly');
    $("#edit-object-type").val('1.001');
    $("#edit-object-type").removeAttr('disabled');
    $("#edit-object-gad").val('');
    $("input[id^='edit-object-flag-']").attr('checked',false);

    $("#edit-object-init").val('request');
    $('#edit-object-init').trigger('change');

    $("#edit-object-form")[0].validator.resetForm();
    $('#edit-object-td-listener').empty();

    $("#edit-object-label").val(tab_data[1] + ' ' + tab_data[4]);

    if (tab_data[7] == "1 bit") $("#edit-object-type").val('1.001');
    if (tab_data[7] == "4 bit") $("#edit-object-type").val('3.007');
    if (tab_data[7] == "1 Byte") $("#edit-object-type").val('5.xxx');
    if (tab_data[7] == "2 Byte") $("#edit-object-type").val('9.001');
    if (tab_data[7] == "3 Byte") $("#edit-object-type").val('11.001');

    /* flags K(=C) L E T M */
    if (tab_data[8]  == "K") $("#edit-object-flag-c").attr('checked',true);
    if (tab_data[9]  == "L") { $("#edit-object-flag-r").attr('checked',true); $("#edit-object-flag-u").attr('checked',true); }
    if (tab_data[10] == "E") { $("#edit-object-flag-w").attr('checked',true); $("#edit-object-flag-t").attr('checked',true); }
    if (tab_data[11] == "T") $("#edit-object-flag-t").attr('checked',true);
    if (tab_data[12] == "Act") $("#edit-object-flag-u").attr('checked',true);

    var list_gad = tab_data[6].split(', ');

    $("#edit-object-gad").val(list_gad[0]);
    if (list_gad.length > 1 ) listener = true;

    for( i = 1; i < list_gad.length; i++)
    {
      var atrlistener = $("<tr>");
      var id = '';
      atrlistener.append($('<th>' + tr("Listener :") + '</th><td> <input type="text" class="listener_' + id + '" value="' + list_gad[i] + '" size="10" > <input type="checkbox" class="flag_listener" id="flag_listener_' + id + '" > ' + tr("Read") + ' </td>'));
      atrlistener.appendTo($('#edit-object-td-listener'));
    }

    if (listener) {
      $('#edit-object-dialog').dialog('option','width',650);
      $('#edit-object-td-listener').show();
    } else {
      $('#edit-object-dialog').dialog('option','width',430);
      $('#edit-object-td-listener').hide();
    }
    $('#edit-object-dialog').dialog('open');

  });

/*

Flags bit Signification
C(=K) = communication
0-La valeur du point de donnée n'est pas transmise.
1-Le point de donnée est connecté au bus et la valeur du point de donnée
est transmise. C = 1, valeur par défaut pour leseentrées et sorties

L = Lecture
0-La valeur du point de donnée ne peut pas être lue.
1-L'appareil émet la valeur de son point de donnée à la réception d'un ordre
de lecture

E = Écriture
0-La valeur du point de donnée ne peut pas être écrite.
1-L'appareil reçoit et écrase sa valeur de point de donnée
E = 1, réglage par défaut pour les entrées

T = Transmission
0-La valeur du point de donnée n'est pas transmise
1-L'appareil émet la valeur de son point de donnée en cas de changement
de valeur, d'événement, d’intervalle de transmission
T = 1, réglage par défaut pour sorties

M = Mise à jour
0-La valeur du point de donnée n'est pas mise à jour
1-La valeur du point de donnée est mise à jour si le Flag S = 1 (et/ou L = 1)
M =1, réglage par défaut pour les entrées

Flags pour entrées, Réception de valeurs
C L E T M
1 0 1 0 1

Flags pour sorties, Transmission de valeurs
C L E T M
1 0 0 1 0

*/


/* /test ETS.xml */

});
