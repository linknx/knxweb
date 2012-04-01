var design = {
	config: null,
	currentDesign: null,
	currentVersion: null,
	currentZone: null,
	
	// Load design
	load: function(designName, version)	{
		if ((designName!="")&&(designName!=null)) {
			var url = 'design/' + designName + '/' + version + '.xml';
		
			design.currentDesign=designName;
			design.currentVersion=version;
			design.currentZone=null;
			
			$('#tab-design-design-list').val(designName);
		
			req = jQuery.ajax({ url: url, dataType: 'xml', async:false, cache: false,
				success: function(responseXML, status) {
					design.config=responseXML;
					design.clear();
					design.refreshZoneList();
				}
			});
		}
	},
	
	// Save design
	save: function() {
		
		//var version=prompt(tr('Enter version name'), design.currentVersion);		// Version vraiment utile?
		var version=tab_config['defaultVersion'];
		if (version!=null)
		{
			design.currentVersion=version;

			var string = serializeXmlToString(design.config);
			var url = 'design_technique.php?action=savedesign&name=' + design.currentDesign + '&ver=' + version;
			req = jQuery.ajax({ type: 'post', url: url, data: string, processData: false, dataType: 'xml' ,
				success: function(responseXML, status) {
					var xmlResponse = responseXML.documentElement;
					if (xmlResponse.getAttribute('status') == 'success') {
						messageBox(tr("Design saved successfully"), "Info", "check");
					}
					else {
						messageBox(tr("Error while saving design: ")+xmlResponse.textContent, "Error", "alert");
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					messageBox(tr("Error while saving design: ")+textStatus, "Error", "alert");
				}
			});
		}
	},

	// Load design list
	loadDesignList: function() {
		req = jQuery.ajax({ url: 'design_technique.php?action=designlist', async: false, dataType: 'xml',
			success: function(responseXML, status) {
				$('#tab-design-design-list').empty();
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') != 'error') {
					$('design', responseXML).each(function() {
						var option = "<option value='" + this.getAttribute('name') +"'>" + this.getAttribute('name') + "</option>";
						$('#tab-design-design-list').append(option);
					});
					$('#tab-design-design-list').val(UIController.getDesignName());
				}
				else
					$('#tab-design-design-list').text('Unable to load design list: '+xmlResponse.textContent);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				messageBox(tr('Unable to load design list: ')+textStatus, "Error", "alert");
			}
		});
	},

	// Refresh zone select	
	refreshZoneList: function() {
		$('#tab-design-zone-list').empty();
		$('zone', design.config).each(function() {
			var option = "<option value='" + this.getAttribute('id')+"'>" + this.getAttribute('name') + "</option>";
			$('#tab-design-zone-list').append(option);
		});
	},	
	
	// Draw a zone
	draw: function(zone) {
		design.clear();

		if (zone!=null) {
			this.currentZone = zone;
			var zone = $('zone[id=' + zone + ']', design.config);

			var width=$("config",design.config)[0].getAttribute('width');
			var height=$("config",design.config)[0].getAttribute('height');
			$("#tab-design-width").val( ((width!=null)?width:1280) );
			$("#tab-design-height").val( ((height!=null)?height:1024) );
			
			$("#tab-design-zone-background").val(zone.attr('img'));

			if ($("config",design.config)[0].getAttribute('enableSlider')=='true') $("#tab-design-slider").attr('checked', true); else $("#tab-design-slider").attr('checked', false);

			$('#widgetdiv').width($("#tab-design-width").val());
			$('#widgetdiv').height($("#tab-design-height").val());

			design.drawZoneBackground();
	
	 		zone.children('control').each(function() {
				design.addWidget(this);
			});
		}
	},
	
	// Create a new widget
	newWidget: function(type) {
		// Fetch default config and add widget
		if (design.currentZone==null) return false;
		
		req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=newWidget&type='+type, dataType: 'xml',
			success: function(conf) {
				var conf = conf.documentElement;
				$('zone[id='+design.currentZone+']', design.config).each(function() {
					this.appendChild(conf);
				});
				var obj=design.addWidget(conf);
				obj.div.widgetMovable("select");
			}
		});
	},

	// Add widget from conf
	addWidget: function(conf) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = UIController.widgetList[type];

		if (cls)
		{
			obj = new cls(conf);
			if (obj!=null) {
				$('#widgetdiv').append(obj.div);
				obj.edit(design.onWidgetSelect, design.onWidgetMove, design.onWidgetResize);
        design.addWidgetsList(obj);
				return obj;
			} 
			return false;
		}	else return false;
	},
	
	// Delete a widget
	deleteWidget: function(o) {
    design.removeWidgetsList(o);
		// Remove div
		o.div.remove();
		// Remove from xml
		$(o.conf).remove();
	},

	// Add a new subpage in the zone
	addSubPage: function(name) {
		
		if (design.currentZone==null) return false;

		var subpage= $('subpage[name=' + name + ']', _subpages);

		var conf = design.config.createElement('subpage');
		conf.setAttribute('name', name);
		conf.setAttribute('x', 1);
		conf.setAttribute('y', 1);
		
		$('zone[id='+design.currentZone+']', design.config).each(function() {
			this.appendChild(conf);
		});

		var div=$("<div class='subpage' />");
		div.width(subpage.attr('width'));
		div.height(subpage.attr('height'));
		div.get(0).conf=conf;

		div.widgetMovable({
			resizable: false,
			onMove: function(widget, left, top) {
				widget.owner.conf.setAttribute('x', Math.round(left) );
				widget.owner.conf.setAttribute('y', Math.round(top) );
				moveCallBack(widget.owner);
			},
			onSelect: function(widget) {
				design.onWidgetSelect(widget);
			}
		});

		subpage.children('controls').children('control').each(function() {

			var obj = null;
			var type = this.getAttribute('type');
			var cls = UIController.widgetList[type];
	
			if (cls)
			{
				obj = new cls(this);
				if (obj!=null) {
					div.append(obj.div);
					return true;
				}
				return false;
			}	else return false;
		});
		
		$('#widgetdiv').append(div);
	},

	// Remove all widgets
	clear: function() {
		$("#widgetdiv .widget").each(function() {
			$(this).remove();
			$('#bgImage').hide();
		});
    design.refreshWidgetsList();
		design.currentZone=null;
	},
	
	// Show image manager to select a new background for the zone
	changeZoneBackground: function() {
		if (design.currentZone==null) return false;

		callbackInput=$('<input>');
		callbackInput.val($('zone[id=' + design.currentZone + ']', design.config).attr('img'));
		
		openImagesManager(callbackInput);
		
		callbackInput.change(function() {
			$('zone[id=' + design.currentZone + ']', design.config).attr('img', $(this).val());
			design.drawZoneBackground();
			$("#tab-design-zone-background").val($(this).val());
		});
	},

	// Display zone background
	drawZoneBackground: function() {
		var bg=$('zone[id=' + design.currentZone + ']', design.config).attr('img');
		if (bg != null && bg != "")
		{
			$('#bgImage').attr('src', getImageUrl(bg));
			$('#bgImage').show();
		} else $('#bgImage').hide();
		
	},
	
	// Display design XML in a window
	displayXML: function() {
	  $('#tab-design-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(design.config) + "</textarea>");
	  $('#tab-design-fluxxml').dialog({ 
	  	width: 812,
			modal: true,
			buttons: {
				Close: function() {
					$( this ).dialog( "close" );
				}
			},
	  });
	},
	
	// Add a new zone
	addZone: function()	{
		var zoneID=prompt(tr('Enter ID for new zone'),'');
		if (zoneID!=null) {
			var zoneName=prompt(tr('Enter name for new zone'),'');
			if (zoneName!=null)	{

				var newzone = design.config.createElement('zone');
				newzone.setAttribute('id', zoneID);
				newzone.setAttribute('name', zoneName);
				$('zones', design.config).append(newzone);

				design.refreshZoneList();
				design.draw(zoneID);

				setTimeout('$("#tab-design-zone-list").val("' + zoneID + '")', 100); // workaround for IE bug
			}
		}
	},

	// Remove current zone
	removeCurrentZone: function() {
		if (confirm(tr('Really delete zone?'))) {
			$('zone[id=' + design.currentZone + ']', design.config).each(function() { this.parentNode.removeChild( this ); });
			design.refreshZoneList();
			var firstZone=$("#selectedZone option:first-child").val();
			if (firstZone) design.draw(firstZone);
		}
	},
	
	// Show design properties
	displayDesignProperties: function() {
		$("#tab-design-properties div:first-child").html('Design properties');
		$("#tab-design-widget-buttons").hide();
		$("#tab-design-widget-properties tbody").empty();
		
		$("#tab-design-design-properties").show();
	},
	
	// Fill properties table when selecting a widget
	displayProperties: function(o) {
		var type=o.conf.getAttribute('type');

		$("#tab-design-properties div:first-child").html(type + ' properties');
		
		$("#tab-design-design-properties").hide();

		$("#tab-design-widget-buttons").show();
		
		$("#tab-design-widget-properties tbody").empty();
	
	  // Setup standard fields x,y,width,height,desc
	  var tr=$('<tr><th>Type</th><td><input type="text" disabled="1" value="' + o.conf.getAttribute("type") + '"></td></tr>');
	   $("#tab-design-widget-properties tbody").append(tr);

	  var tr=$('<tr><th>X</th><td><input id="tab-design-properties-x" type="text" value="' + o.conf.getAttribute("x") + '"></td></tr>');
	   $("#tab-design-widget-properties tbody").append(tr);
	 
	  var tr=$('<tr><th>Y</th><td><input id="tab-design-properties-y" type="text" value="' + o.conf.getAttribute("y") + '"></td></tr>');
	   $("#tab-design-widget-properties tbody").append(tr);

    var tr=$('<tr><th>Description</th><td><input id="tab-design-properties-desc" type="text" name="desc" value="' + ((!o.conf.getAttribute("desc"))?'':o.conf.getAttribute("desc")) + '"></td></tr>');
    $("#tab-design-widget-properties tbody").append(tr);
    $("#tab-design-properties-desc").change(function() {
      o.setSetting("name", $(this).val());
    });

		if (o.isResizable) {
			var tr=$('<tr><th>Width</th><td><input id="tab-design-properties-width" type="text" value="' + o.conf.getAttribute("width") + '"></td></tr>');
			$("#tab-design-widget-properties tbody").append(tr);
			$("#tab-design-properties-width").change(function() {
				o.setSetting("width", $(this).val());
			});
			
	  	var tr=$('<tr><th>Height</th><td><input id="tab-design-properties-height" type="text" value="' + o.conf.getAttribute("height") + '"></td></tr>');
			$("#tab-design-widget-properties tbody").append(tr);
			$("#tab-design-properties-height").change(function() {
				o.setSetting("height", $(this).val());
			});
		}
		
		if (_widgetscssexist) {
      var tr=$('<tr><th>Class CSS</th><td><input id="tab-design-properties-class" type="text" value="' + (( o.conf.getAttribute("class") == null )?'':o.conf.getAttribute("class")) + '"></td></tr>');
			$("#tab-design-widget-properties tbody").append(tr);
    }
	   
		$("#tab-design-properties-x").change(function() {
			o.setSetting("x", $(this).val());
		});
	
		$("#tab-design-properties-y").change(function() {
			o.setSetting("y", $(this).val());
		});
		
		var properties = eval( "_widgets." + type + ".settings" );

		// Clone object
		var p=[];
		$.each(properties, function() {
			p.push( jQuery.extend(true, {}, this));
		});
		properties=p;

		if (type=="subpage")
		{
			$('subpage[name=' + o.conf.getAttribute('subpage') + '] parameters parameter', _subpages).each(function() {
				var p={
					id: this.getAttribute('id'),
					label: this.getAttribute('label'),
					type: this.getAttribute('type'),
				};
				properties.push(p);
			});
		}

		$.each(properties, function() {
	
			if (this.type=="comment" || this.type=="separator")
			{
		    var tr=$('<tr>');
		    tr.append($('<th colspan="2" class="' + this.type + '">' + this.label + '</th>'));
			} else
			{
		    var tr=$('<tr>');
		    tr.append($('<th>' + this.label + '</th>'));

	    	var value=o.conf.getAttribute(this.id);
	    	if (value==null) value="";
		    
		    var td=$('<td>');
		    // Text setting
		    //if (this.type=="text") td.append($('<input type="text" name="' + this.id + '" value="' + value + '">'));
        if (this.type=="text") {
          var textproperties = $('<input type="text" name="' + this.id + '" value="">');
          textproperties.val(value);
          td.append(textproperties);
        };
		
		    // List setting
		    if (this.type=="list") 
		    {
		    	select=$('<select>');
		    	select.attr('name', this.id);
		    	$.each(this.options, function(key, label) {
		    		var option=($('<option value="' + key + '">' + label + '</option>'));
		    		if (key==value) option.attr('selected','1');
		    		select.append(option);
		    	});
		    	td.append(select);
		  	}
		
		    // Object setting
		    if (this.type=="object") 
		    {
		    	select=$('<select>');
		    	select.attr('name', this.id);
	
	    		var option=($('<option value=""></option>'));
	    		select.append(option);
	
					$('object', _objects).each(function() {
		    		var option=($('<option value="' + this.getAttribute('id') + '">' + ((this.textContent=="")?this.getAttribute('id'):this.textContent) + '</option>'));
		    		if (this.getAttribute('id')==value) option.attr('selected','1');
		    		select.append(option);
					});
		    	td.append(select);
		  	}
		
		    // Picture setting
		    if (this.type=="picture") 
		    {
					var input=($('<input type="text" name="' + this.id + '" value="' + value + '">'));
					input.click(function() {
						openImagesManager($(this));
					});			
		    	td.append(input);
		  	}

		    // Subpage setting
		    if (this.type=="subpage") 
		    {
		    	select=$('<select>');
		    	select.attr('name', this.id);
	
					$("subpage",_subpages).each(function() {
		    		var option=($('<option value="' + this.getAttribute('name') + '">' + this.getAttribute('name') + '</option>'));
		    		if (this.getAttribute('name')==value) option.attr('selected','1');
		    		select.append(option);
					});
		    	td.append(select);
		  	}

		    // Color setting
		    if (this.type=="color") 
		    {
					var input=($('<input type="text" name="' + this.id + '" value="' + o.conf.getAttribute(this.id) + '">'));
					input.click(function() {
						openColorPicker($(this));
					});			
		    	td.append(input);
		  	}

		    // Action setting
		    if (this.type=="action") 
		    {
		    	var propId=this.id;
					var input=($('<button>Edit</button>'));
					input.click(function() {
						
						// Check if node exists
						if ($('actionlist[id=' + propId + "]",o.conf).length>0)
							var actions=$('actionlist[id=' + propId + "]",o.conf)[0];
						else {
							var actions=design.config.createElement("actionlist");
							actions.setAttribute("id", propId);
							o.conf.appendChild(actions);
						}
            var widgetObjects=[];
            $.each(o.conf.attributes, function(i, attr){
						  if (attr.name.substr(0,1)=="_") {
								widgetObjects.push({
									id: attr.name.substr(1,attr.name.length),
									value: attr.value
								});
				    	}
						});
            //console.log("click action", o , o.conf, propId, actions, widgetObjects);
						actionEditor.open(actions, widgetObjects);
						//actionEditor.open(actions);
					});			
		    	td.append(input);
		  	}

		    // Zone setting
		    if (this.type=="zone") 
		    {
		    	select=$('<select>');
		    	select.attr('name', this.id);

	    		var option=($('<option value="">Execute action</option>'));
	    		select.append(option);
	
					$('zone', design.config).each(function() {
		    		var option=($('<option value="' + this.getAttribute('id') + '">' + this.getAttribute('name') + '</option>'));
		    		if (this.getAttribute('name')==value) option.attr('selected','1');
		    		select.append(option);
					});
		    	td.append(select);
		  	}
		
		    tr.append(td);
			}
			    
	    $("#tab-design-widget-properties tbody").append(tr);
		});
		
		$("#tab-design-properties input,select").change( function() {
			// Update conf on selected object when a property change
			if ($("#widgetdiv .selected").length>0)
			{
				var selectedWidget=$("#widgetdiv .selected").get(0);
				selectedWidget.owner.setSetting($(this).attr('name'), $(this).val());
				// if widget is a subpage and subpage name modified
				if ((selectedWidget.owner.conf.getAttribute('type')=='subpage') && ($(this).attr('name')=="subpage")) design.displayProperties(selectedWidget.owner);
			}
		});
		
		$("#tab-design-widget-properties input, #tab-design-widget-properties select").focusout(function() { $(this).trigger('change'); });
	},

  // Show design list widgets off the page
  displayDesignListWidgets: function() {
    $("#tab-design-widgets-list").show();
  },

  // add widget to the WidgetsList
  addWidgetsList: function(o) {
    var type=o.conf.getAttribute('type');
    var desc=o.conf.getAttribute('desc');
    if (!desc) desc = type;

    var tr=$('<tr/>');
    tr.get(0).obj = o;

    var th=$('<th>' + type + '</th>');
    tr.append(th);
    /*
    th.click(function() {
      this.parentNode.obj.div.widgetMovable("select");
    });
    */
    tr.click(function() {
      this.obj.div.widgetMovable("select");
    });

    var td=$('<td><span>' + desc + '</span></td>');
    tr.append(td);
    var bpviewxml =$('<td><button>Xml</button></td>');
    //td.append(bpviewxml);
    tr.append(bpviewxml);

    //td.click(function() {
    bpviewxml.click(function() {
      //$('#tab-design-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(this.parentNode.parentNode.obj.conf) + "</textarea>");
      $('#tab-design-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(this.parentNode.obj.conf) + "</textarea>");
      $('#tab-design-fluxxml').dialog({ 
        width: 812,
        modal: true,
        buttons: {
          Close: function() {
            $( this ).dialog( "close" );
          }
        },
      });
    });

    $("#tab-design-widgets-list tbody").append(tr);
  },
  // Refresh Widgets List	
	refreshWidgetsList: function() {
		$("#tab-design-widgets-list tbody").empty();
	},
  // remove widget from the WidgetsList
  removeWidgetsList: function(o) {
    $("tr", "#tab-design-widgets-list").each(function() {
      if (this.obj == o) $(this).remove();
    });
  },
  // selected a widget from the function onWidgetSelect()
  selectWidgetsList: function(o) {
    $(".active", "#tab-design-widgets-list").removeClass("active");
    $("tr", "#tab-design-widgets-list").each(function() {
      if (this.obj == o) $(this).addClass("active");
    });
  },

	
	// Add a new design
	addDesign: function()
	{
		var name=prompt(tr('Enter name for new design'),'');
		if (name!=null) {
			req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=createdesign&name='+name, dataType: 'xml',
				success: function(responseXML, status) {
					var xmlResponse = responseXML.documentElement;
					if (xmlResponse.getAttribute('status') != 'error') {
						design.loadDesignList();
						design.load(name, 'design');
					}
					else {
						messageBox(tr("Unable to create design: ")+xmlResponse.textContent, "Error", "alert");
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					messageBox(tr("Unable to create design: ")+textStatus, "Error", "alert");
				}
			});
		}
	},

	// Callback when a widget is selected
	onWidgetSelect: function(widget) {
		design.selectWidgetsList(widget.owner);
		// Display properties corresponding to widget type
		design.displayProperties(widget.owner);
	},

	// Callback when a widget is moved
	onWidgetMove: function(widget) {
		$("#tab-design-properties-x").val(widget.conf.getAttribute('x'));
		$("#tab-design-properties-y").val(widget.conf.getAttribute('y'));
	},

	// Callback when a widget is resized
	onWidgetResize: function(widget) {
		$("#tab-design-properties-width").val(Math.round(widget.conf.getAttribute('width')));
		$("#tab-design-properties-height").val(Math.round(widget.conf.getAttribute('height')));
	}

}

jQuery(function($) {
	
	design.loadDesignList();
	
	$("#tab-design-properties").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });

	$("#tab-design-list-widgets").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });

	$("#tab-design-width").change(function() {
		$("config",design.config)[0].setAttribute('width', $(this).val());
		$('#widgetdiv').width($(this).val());
	});

	$("#tab-design-height").change(function() {
		$("config",design.config)[0].setAttribute('height', $(this).val());
		$('#widgetdiv').height($(this).val());
	});
	
	$("#tab-design-slider").click(function() {
		if ($(this).is(':checked'))
				$("config",design.config)[0].setAttribute('enableSlider', 'true');
		else
				$("config",design.config)[0].setAttribute('enableSlider', 'false');
	});
  
	$("#button-delete-widget").button({
		icons: {
			primary: "ui-icon-closethick"
		}
	});
	$("#button-delete-widget").click(function() {
		if ($("#widgetdiv .selected").length>0)	
		{
			design.deleteWidget($("#widgetdiv .selected").get(0).owner); 
			// Show design properties
			$("#widgetdiv").trigger("click");
		}
	});

	$("#button-clone-widget").button({
		icons: {
			primary: "ui-icon-copy"
		}
	});
	$("#button-clone-widget").click(function() {
		if ($("#widgetdiv .selected").length>0)	
		{
			var conf=$("#widgetdiv .selected").get(0).owner.conf;
			var newConf=conf.cloneNode(true);
			newConf.setAttribute('x',20);
			newConf.setAttribute('y',20);
			$('zone[id='+design.currentZone+']', design.config)[0].appendChild(newConf);
			var obj=design.addWidget(newConf);
			obj.div.widgetMovable("select");
		}
	});

	$("#button-add-new-zone").click(function() {
		design.addZone();
	});

	$("#button-add-remove-zone").click(function() {
		design.removeCurrentZone();
	});
	
	$("#button-save-design").click(function() {
		design.save();
	});

	$("#button-add-design").click(function() {
		design.addDesign();
	});

	$("#button-try-design").click(function() {
		design.save();
		window.open("design_view.php?design=" + design.currentDesign + "&version=" + design.currentVersion + "&zone=" + design.currentZone, "KNXWeb - Try design", 'width=' + $("#tab-design-width").val() + ',height=' + $("#tab-design-height").val());
	});
	
	$("#tab-design-design-list").change(function(e) {
		design.load($(this).val(), tab_config['defaultVersion']);
		design.draw($('#tab-design-zone-list').val());
	});
	
	// Display design properties when clicked
	$("#widgetdiv").click(function() {
		$('div').removeClass("selected");
		// Hide resizer
		$(".resizeSE").hide();
		$(this).addClass("selected");
		design.displayDesignProperties();
	});

	design.load($('#tab-design-design-list').val(), tab_config['defaultVersion']);
	design.draw($('#tab-design-zone-list').val());
	design.displayDesignProperties();
	design.displayDesignListWidgets();
	
	loading.hide();
});
