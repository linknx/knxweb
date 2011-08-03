var logging = {

	refreshData: function() {

		var body = '<read><config><logging /></config></read>';
		var responseXML=queryLinknx(body);
		if (responseXML!=false)	{
			var data=$('logging',responseXML)[0];
			$('#logging-level').val('INFO');
			if (data) {
				if (data.getAttribute('type')=='simple')
				{
					if (data.getAttribute('level')!='') $('#logging-level').val(data.getAttribute('type')); else $('#logging-level').val('INFO');
				} else
				{
					$("#logging-log4cpp-output").val(data.getAttribute('output'));
					
					if ((data.getAttribute('format')=='simple')||(data.getAttribute('format')=='basic'))
						$("#logging-format").val(data.getAttribute('format'));
					else
					{
						$("#logging-format").val('custom');
						$("#logging-customformat").val(data.getAttribute('format'));
					}
						
					$("#logging-log4cpp-maxfilesize").val(data.getAttribute('maxfilesize'));
					$("#logging-log4cpp-maxfileindex").val(data.getAttribute('maxfileindex'));
					$("#logging-log4cpp-config").val(data.getAttribute('config'));
				}
				$("#logging-log4cpp-type").val(data.getAttribute('type'));
			}
			$("#logging-format").trigger('change');
		}
	},
	
	saveData: function() {

		if ($("#logging-form").valid())
		{
			var body = '<write><config>';

			body += '<logging level="' + $("#logging-level").val() + '" ';
			if ($("#logging-log4cpp-output").val()!="") body += 'output="' + $("#logging-log4cpp-output").val() + '" ';
			if (($("#logging-format").val()=='simple')||($("#logging-format").val()=='basic'))
				body += 'format="' + $("#logging-format").val() + '" ';
			else
				body += 'format="' + $("#logging-customformat").val() + '" ';
			if ($("#logging-log4cpp-maxfilesize").val()!="") body += 'maxfilesize="' + $("#logging-log4cpp-maxfilesize").val() + '" ';
			if ($("#logging-log4cpp-maxfileindex").val()!="") body += 'maxfileindex="' + $("#logging-log4cpp-maxfileindex").val() + '" ';
			if ($("#logging-log4cpp-config").val()!="") body += 'config="' + $("#logging-log4cpp-config").val() + '" ';
			body += '/>';
			
			body += '</config></write>';

			loading.show();
			var responseXML=queryLinknx(body);
			loading.hide();
		  if (responseXML!=false) maintab.tabs('remove', '#tab-logging');
		}	
	}
}

jQuery(document).ready(function(){

	$("#logging-tab-table").tableize({
		sortable: false,
		selectable: false
	});
	
	$("#logging-button-save").button();
	$("#logging-button-save").click(logging.saveData);

	$("#logging-format").change(function () {
		$("#logging-customformat").attr('disabled',!($(this).val()=='custom'));
	});
	
	logging.refreshData();
	loading.hide();
});