/*
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
*/
function saveConfigKnxWeb()
{
  var string = '<?xml version="1.0" encoding="utf-8" standalone="no"?>\n<param>\n';
  for (var key in tab_config) 
  {
    if ($("#config-"+key+"-id")[0].type == "checkbox" ) {
      if ($("#config-"+key+"-id").attr("checked")) tab_config[key] = "true"; else tab_config[key] = "false";
    } else { 
      tab_config[key] = $("#config-"+key+"-id").val();
    }
    string = string+'  <'+key+'>'+tab_config[key]+'</'+key+'>\n';
  }
  string = string+'</param>';
  
  if (queryKnxweb('saveconfig', 'xml', string, false)) 
    messageBox("Config saved successfully reload the web page for take effect in KnxWeb immediately", 'Info', 'info');

};

function readFile(pathlogfile, nbenreg, dest)
{
	if (pathlogfile !="") {
    var url = 'readfile.php?action=readfilehtml&pathlogfile='+pathlogfile+'&nbenreg='+nbenreg;
  	req = jQuery.ajax({ type: 'post', url: url, dataType: 'html', 
  			success: function(responseHTML, status) 
  			{
  				$("#"+dest).html(responseHTML);
  			},
  			error: function (XMLHttpRequest, textStatus, errorThrown) {
  				messageBox(tr("Error Unable to load: ")+textStatus, 'Erreur', 'alert');
  			}
  	});
	} else alert("Pas de fichier à afficher");
};

function endUpload(success){
  if (success == 1){
    messageBox('Upload OK', 'Info', 'info');
  } else {
    messageBox('Upload KO', 'Erreur', 'alert');
  }
  return true;
};

function reloadLogObject() {
  readFile($("#selectLogObject").val(), $('#selectLogObjectCount').val(), "divLogObject" );
};

function reloadLogLinknx() {
  readFile(_log_Linknx, $('#selectLinknxLogFileCount').val(), "divLinknxLog" );
};

function sendAction(actiontype)
{
	if (actiontype !="") {
    var url = 'design_technique.php?action='+actiontype;
  	req = jQuery.ajax({ type: 'post', url: url, dataType: 'html', 
  			success: function(responseHTML, status) 
  			{
  				$("#"+dest).html(responseHTML);
  			},
  			error: function (XMLHttpRequest, textStatus, errorThrown) {
  				alert(tr("Unable to send action: ")+textStatus);
  			}
  	});
	} else alert("Pas d'action à lancer");
};

function updateWidgetsCss(val)
{
	alert("update file widgets.css");
  /*
  queryKnxweb(action, type, message, callasync)
=>jQuery.ajax({ type: 'post', url: 'design_technique.php?action='+action, data: message, processData: false, dataType: type,async: callasync,
  */
  queryKnxweb('updatewidgetscss', 'html', val, false);
};


var _log_Linknx ='/tmp/linknx.log'; /* TODO à récupérer de linknx l'info de log type file ou mysl ou stdout */

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
	$("input[name=saveKnxWebConfig]").click( function() { saveConfigKnxWeb(); } );
	$("#selectLogObject").change( function() { readFile(this.value, $('#selectLogObjectCount').val(), "divLogObject" ); } );
	$("#selectLogObjectCount").change( function() {$("#selectLogObject").change();})
	
	$("#selectLinknxLogFileCount").change( function() { readFile(_log_Linknx, this.value, "divLinknxLog" ); } );
  $( "input:button, input:submit").button();
  
  $("input[name=updatewidgetscss]").click( function() { updateWidgetsCss($("#contentwidgetscss").val()); } );	 
	loading.hide();
});