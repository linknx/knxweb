function modifyCurrentZone()
{
	UIController.editZone();
}

function saveDesign()
{
	// recherche mon version
	var Nameversion = "design";
	var matched;
	if (matched = location.search.match(/version=([^&]+)/))	Nameversion = matched[1];
	
	//var version=prompt(tr('Enter version name'),'design');
	var version=prompt(tr('Enter version name'),Nameversion);
	if (version!=null)
	{
		UIController.saveDesign(version);
		$('#designVersion').val(version);
	}
}

function displayDesign()
{
	UIController.displayDesign();
}

function modifyBgImage()
{
		var design = UIController.getDesignName();
		$('#bgImages').empty().append($("<img src='images/loading.gif'/>"));
		req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=filelist&name='+design, dataType: 'xml',
			success: function(responseXML, status) {
				$('#bgImages').empty();
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'error') {
					$('file', responseXML).each(function() {
						var file = $(this).text();
						var re = new RegExp('\.(gif|jpe?g|png)$');
						if (re.test(file)) {
							var option = $("<img width='200' height='150' src='design/"+design+"/"+file+"' alt='"+file+"'/>");
							option.click(function () { setBackground(file); $('#changeImage').css('display', 'none'); });
							$('#bgImages').append(option);
						}
					});
				}
				else
					$('#bgImages').text(tr("Unable to load images: ")+xmlResponse.textContent);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$('#bgImages').text(tr("Unable to load images: ")+textStatus);
			}
		});
	
		$('#changeImage').css('left',(document.body.clientWidth/4)+'px').css('width',(document.body.clientWidth/2)+'px');
		$('#changeImage').css('display', 'block');
}

function setBackground(filename)
{
	if (filename!="")
	{
		UIController.changeZoneBackground($('#selectedZone').val(), filename);
	}
}

function addZone()
{
	var zoneID=prompt(tr('Enter ID for new zone'),'');
	var zoneName=prompt(tr('Enter name for new zone'),'');
	if (zoneName!=null)	{
		UIController.addZone(zoneID, zoneName);
		UIController.drawZone(zoneID);
		setTimeout('$("#selectedZone").val("'+zoneID+'")', 100); // workaround for IE bug
	}
}

function delZone()
{
	if (confirm(tr('Really delete zone?'))) {
		var zone = $('#selectedZone');
		UIController.removeZone(zone.val());
		UIController.drawZone(zone.val());
	}
}

function addDesign()
{
	var name=prompt(tr('Enter name for new design'),'');
	if (name!=null) {
		req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=createdesign&name='+name, dataType: 'xml',
			success: function(responseXML, status) {
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'error') {
					var option = $("<option>"+name+"</option>");
					$('#designName').append(option);
					$('#designName').val(name);
					loadDesign(name, 'design');
				}
				else {
					UIController.setNotification(tr("Unable to create design: ")+xmlResponse.textContent);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				UIController.setNotification(tr("Unable to create design: ")+textStatus);
			}
		});
	}
}

function loadDesignList()
{
	req = jQuery.ajax({ url: 'design_technique.php?action=designlist', dataType: 'xml',
		success: function(responseXML, status) {
			$('#designName').empty();
			var xmlResponse = responseXML.documentElement;
			if (xmlResponse.getAttribute('status') != 'error') {
				$('design', responseXML).each(function() {
					var option = $("<option>"+this.textContent+"</option>");
					$('#designName').append(option);
				});
				$('#designName').val(UIController.getDesignName());
			}
			else
				$('#designName').text('Unable to load design list: '+xmlResponse.textContent);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$('#designName').text(tr('Unable to load design list: ')+textStatus);
		}
	});
}

function createMenu(element)
{
	

	$(element).accordion();
  $(element).draggable({ containment: "parent" , scroll: false });
/*
	$(element).dialog({
		title: 'Menu',
		resizable: false
	});
*/

return;	
	
	$('.subMenuItem', element).hide();
		
	$('.menuItem', element).click(function() {
		if ($('.subMenuItem',$(this).parent()).css('display')!='none')
			$('.subMenuItem',$(this).parent()).hide();
		else
			$('.subMenuItem',$(this).parent()).show();
	});
	
	$(element).dialog();
}

function addMenu()
{
return;
	var headerTr = $("<tr class='editWidget'/>");
	var header = $("<th align='right'/>");
	headerTr.append(header);
	var menu = $("#menu");
	headerTr.css('cursor', 'move');
//	headerTr.click(function () { $('td.menu').toggle(); });
	var closeBtn = $("<img src='images/close.gif' style='cursor: pointer; margin-right: 2px;'/>").get(0);
	closeBtn.owner=this;
	closeBtn.onclick=function() { $('td.menu').toggle(); };
	header.append(closeBtn);

	menu.get(0).dragObject=menu.draggable({ handle: headerTr });

	$("#menu table").prepend(headerTr);
	menu.css('left', "0px");
	menu.css('top', "32px");

 	var cb = $("<input type='checkbox'/>");
 	var grid = $("<input type='text' value='16' size='3'/>");
 	grid.keypress(function() { cb.val([]); });
	cb.change(function () { 
		if (this.checked) $('.ui-draggable').draggable('option', 'grid', [grid.val(), grid.val()]); else $('.ui-draggable').draggable('option', 'grid', [1, 1]);
	}).change();

	addMenuSection('design', 'Design')
		.append('<a name="modifyZoneLayout" href="" onclick="modifyCurrentZone(); return false">'+tr('Modify layout')+'</a><br/>')
		.append(tr('Grid: ')).append(grid).append(cb).append('<br/><a name="saveDesign" href="" onclick="saveDesign(); return false">'+tr('Save design')+'</a><br/>'
		+'<a name="displayDesign" href="" onclick="displayDesign(); return false">'+tr('Display design (XML)')+'</a><br/>'
		+'<a name="gotoDesignList" href="index.html" >'+tr('Design list')+'</a><br/>');
	addMenuSection('zones', 'Zones')
		.append('<select id="selectedZone" name="selectedZone" onchange="UIController.drawZone(this.value);"></select>'
		+'<a href="javascript:addZone();"><img src="images/add.gif"></a>'
		+'<a href="javascript:delZone();"><img src="images/delete.gif"></a><br>'
		+'<a name="modifyBackground" href="" onclick="modifyBgImage(); return false">'+tr('Modify background')+'</a><br/>');

	changeImage=$('<div id="changeImage">'
		+'	<table align="center" cellpadding="5">'
		+'		<tr><td><h4>'+tr('Background selection')+'</h4><div id="bgImages"></div></td></tr>'
		+'		<tr><td align="right"><input type="button" onclick="$(\'#changeImage\').css(\'display\', \'none\');" value="'+tr('Cancel')+'"></td></tr>'
		+'	</table>'
		+'</div>');
		
	document.body.appendChild(changeImage.get(0));
				
	UIController.addZoneListListener(function (config) {
		$('#selectedZone').empty();
		$('zone', config)
			.each(function() {
				$('#selectedZone').append("<option value='"+this.getAttribute('id')+"'>"+this.getAttribute('name')+"</option>");
			});
		});

	for(idx in UIController.widgetList) {
		var widget = UIController.widgetList[idx];
		var widgetMenu = addMenuSection('menuWidget'+idx, widget.menuText);
		widget.prototype.addObjectFields(widgetMenu, null);
	}
    
}

jQuery(function($) {
	//addMenu();
	createMenu($('#menu'));
	loadDesignList();
	EIBCommunicator.loadObjectList();
	loading.hide();
});
