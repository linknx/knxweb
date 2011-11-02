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
function saveConfigKnxWeb()
{
  var string = '<?xml version="1.0" encoding="utf-8" standalone="no"?><param>';
  for (var key in tab_config) 
  {
    string = string+'<'+key+'>'+tab_config[key]+'</'+key+'>';
  }
  string = string+'</param>';
  
  //queryKnxweb(action, type, message, async)
  if (queryKnxweb('saveconfig', 'xml', string, false)) 
    messageBox(tr("Design saved successfully")+" il faut actualiser la page web de KnxWeb pour en tenir compte imédiatement", 'Info', 'info');


	//var url = 'design_technique.php?action=saveconfig&dir=toto';
/*
	var url = 'design_technique.php?action=saveconfig';
	req = jQuery.ajax({ type: 'post', url: url, data: string, processData: false, dataType: 'xml' ,
		success: function(responseXML, status) {
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') == 'success') {
				//UIController.setNotification(tr("Design saved successfully"));
				//alert(tr("Design saved successfully")+" il faut actualiser la page web de KnxWeb pour en tenir compte imédiatement");
				messageBox(tr("Design saved successfully")+" il faut actualiser la page web de KnxWeb pour en tenir compte imédiatement", 'Info', 'info');
			}
			else {
				//UIController.setNotification(tr("Error while saving design: ")+xmlResponse.textContent);
				//alert(tr("Error while saving design: ")+xmlResponse.textContent);
				messageBox(tr("Error while saving design: ")+xmlResponse.textContent, 'Erreur', 'alert');
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//UIController.setNotification(tr("Error while saving design: ")+textStatus);
			//alert(tr("Error while saving design: ")+textStatus);
			messageBox(tr("Error while saving design: ")+textStatus, 'Erreur', 'alert');
		}
	});
*/

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
  				//alert(tr("Unable to load: ")+textStatus);
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
	loading.hide();
});