function saveConfigKnxWeb()
{
  var string = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<param>\n';
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
    messageBox(tr("Config saved successfully reload the web page for take effect in KnxWeb immediately"), tr('Info'), 'info');

};

function readFile(pathlogfile, nbenreg, dest)
{
	if (pathlogfile !="") {
    var url = 'readfile.php?objectlog=' + pathlogfile + '&nbenreg=' + nbenreg + '&output=html';
  	req = jQuery.ajax({ type: 'post', url: url, dataType: 'html', 
  			success: function(responseHTML, status) 
  			{
  				$("#"+dest).html(responseHTML);
  			},
  			error: function (XMLHttpRequest, textStatus, errorThrown) {
  				messageBox(tr("Error Unable to load: ")+textStatus, tr('Error'), 'alert');
  			}
  	});
	} else messageBox(tr("Nothing"), tr('Error'), 'alert');
};

function readLinknxLogFile(nbenreg, dest)
{
  var url = 'readfile.php?LogLinknx=true&nbenreg=' + nbenreg + '&output=html';
	req = jQuery.ajax({ type: 'post', url: url, dataType: 'html', 
			success: function(responseHTML, status) 
			{
				$("#"+dest).html(responseHTML);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				messageBox(tr("Error Unable to load: ")+textStatus, tr('Error'), 'alert');
			}
	});
};

function endUpload(success){
  if (success == 1){
    messageBox(tr('Upload OK'), tr('Info'), 'info');
  } else {
    messageBox(tr('Upload KO'), tr('Error'), 'alert');
  }
  return true;
};

function reloadLogObject() {
  readFile($("#selectLogObject").val(), $('#selectLogObjectCount').val(), "divLogObject");
};

function reloadLogLinknx() {
  readLinknxLogFile($('#selectLinknxLogFileCount').val(), "divLinknxLog");
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
  messageBox(tr("update file widgets.css"), tr('Info'), 'info');
  /*
  queryKnxweb(action, type, message, callasync)
=>jQuery.ajax({ type: 'post', url: 'design_technique.php?action='+action, data: message, processData: false, dataType: type,async: callasync,
  */
  queryKnxweb('updatewidgetscss', 'html', val, false);
};

function changeUiTheme(val)
{
  //"lib/jquery/css/cupertino/jquery-ui-1.8.23.custom.css"
  $("link[href*=lib\\/jquery\\/css]:first").attr('href', 'lib/jquery/css/' + $(val).val() + '/jquery-ui.css');
};

jQuery(document).ready(function(){
	$("input[name=saveKnxWebConfig]").click( function() { saveConfigKnxWeb(); } );
	$("#selectLogObject").change( function() { readFile(this.value, $('#selectLogObjectCount').val(), "divLogObject"); } );
	$("#selectLogObjectCount").change( function() {$("#selectLogObject").change();})
	
	$("#selectLinknxLogFileCount").change( function() { readLinknxLogFile(this.value, "divLinknxLog"); } );
  $( "input:button, input:submit").button();
  
  $("input[name=updatewidgetscss]").click( function() { updateWidgetsCss($("#contentwidgetscss").val()); } );	 
	loading.hide();
});