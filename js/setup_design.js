_editMode = true;

var design = {
	config: null,
	currentDesign: null,
	currentVersion: null,
	currentZone: null,
  grid: false,
  gridwidgetsize: false,
  gridWidth: 1,
  widgetMargin: 10,
  floating: false,
	
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
    $('#tab-design-zones-list tbody').empty();
		$('zone', design.config).each(function() {
			var option = "<option value='" + this.getAttribute('id')+"'>" + this.getAttribute('name') + "</option>";
			$('#tab-design-zone-list').append(option);
      var table_tr = $("<tr zoneId='" + this.getAttribute('id') + "'><td>" + this.getAttribute('id')+"</td><td>" + this.getAttribute('name') + "</td></tr>");
      table_tr.click(function() {
        $(".active", "#tab-design-zones-list").removeClass("active");
        $(this).addClass("active");
      });
      $('#tab-design-zones-list tbody').append(table_tr);
		});
	},	
	
	// Draw a zone
	draw: function(zone) {
		design.clear();
    if (_editMode) _designeditview = true;

		if (zone!=null) {
			this.currentZone = zone;
			var zone = $('zone[id=' + zone + ']', design.config);

			var width=$("config",design.config)[0].getAttribute('width');
			var height=$("config",design.config)[0].getAttribute('height');
			$("#tab-design-width").val( ((width!=null)?width:1280) );
			$("#tab-design-height").val( ((height!=null)?height:1024) );
			var effect=$("config",design.config)[0].getAttribute('effect');
      if (effect) $("#tab-design-effect").val(effect);
			
			$("#tab-design-zone-background").val(zone.attr('img'));
      $("#tab-design-zone-globalcontrol").attr("checked", ((zone.attr('globalcontrol')!="false")?true:false));

			if ($("config",design.config)[0].getAttribute('enableSlider')=='true') {
        $("#tab-design-slider").attr('checked', true);
        $("#tab-design-effect").attr('disabled', 'disabled'); 
      } else {
        $("#tab-design-slider").attr('checked', false);
        $("#tab-design-effect").removeAttr('disabled');
      }
      if ($("config",design.config)[0].getAttribute('grid')) {
        $("#tab-design-grid").attr('checked', true);
        $("#tab-design-grid-width").val($("config",design.config)[0].getAttribute('grid')); 
      } else {
        $("#tab-design-grid").attr('checked', false);
        //$("#tab-design-grid-width").val(1);
      }
      $("#tab-design-grid-width").change();
      if ($("config",design.config)[0].getAttribute('gridwidgetsize')) {
        $("#tab-design-grid-widgetsize").attr('checked', true);
      } else {
        $("#tab-design-grid-widgetsize").attr('checked', false);
      }
      
      if ($("config",design.config)[0].getAttribute('floating')) {
        $("#tab-design-floating").attr('checked', true);
        $("#tab-design-margin").val($("config",design.config)[0].getAttribute('floating'));
        _floating_zone = true;
        _floating_zone_margin = $("config",design.config)[0].getAttribute('floating');
      } else {
        $("#tab-design-floating").attr('checked', false);
        _floating_zone = false;
        _floating_zone_margin = 10;
      }
      $("#tab-design-floating").change();

			$('#widgetdiv').width($("#tab-design-width").val());
			$('#widgetdiv').height($("#tab-design-height").val());

			design.drawZoneBackground();
	
	 		zone.children('control').each(function() {
				design.addWidget(this);
			});

      // charger également les "control" lié au design lui-même, soit des controls/widget lié au design et pas à une zone précise
      // géré avec paramètre de la zone si celle-ci ne veux pas afficher les control/widgets "globaux" on aura globalcontrol="false" par défaut on affiche
      if (zone[0].getAttribute('globalcontrol')!='false') {
        $('zones', design.config).children('control').each(function() {
          design.addWidget(this, true);
        });
      }
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
	addWidget: function(conf, globalcontrol) { /* globalcontrol=true => widget on design not in a zone */
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = UIController.widgetList[type];

		if (cls)
		{
			obj = new cls(conf);
			if (obj!=null) {
				$('#widgetdiv').append(obj.div);
				obj.edit(design.onWidgetSelect, design.onWidgetMove, design.onWidgetResize);
        design.addWidgetsList(obj, globalcontrol);
        obj.globalcontrol = globalcontrol;
        // If the widget had Children 
  	 		/*conf.children('control')*/
        //$(conf).children('control').each(function() {... });
        $('control', conf).each(function() {
  				design.addWidgetChildren(this, obj.content, globalcontrol);
  			});
				return obj;
			} 
			return false;
		}	else return false;
	},

	// Add widget from conf and to a parent
	addWidgetChildren: function(conf, parent, globalcontrol) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = UIController.widgetList[type];

		if (cls)
		{
			obj = new cls(conf);
			if (obj!=null) {
        parent.append(obj.div);
				obj.edit(design.onWidgetSelect, design.onWidgetMove, design.onWidgetResize);
        design.addWidgetsList(obj, globalcontrol, true);
        obj.globalcontrol = globalcontrol;
				return obj;
			} 
			return false;
		}	else return false;
	},
	
	// Delete a widget
	deleteWidget: function(o) {
    var ow = o.get(0).owner;
    if (!ow) return false;
    //$(o.conf).children('control').each(function() {
    $(".widget", o).each(function() {
      design.deleteWidget($(this));
    });
    design.removeWidgetsList(ow);
		// Remove div
		ow.div.remove();
		ow.deleteWidget();
		// Remove from xml
		$(ow.conf).remove();
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
          
          $('control', this).each(function() {
          	var obj2 = null;
      			var type2 = this.getAttribute('type');
      			var cls2 = UIController.widgetList[type2];
      			if (cls2)
      			{
      				obj2 = new cls2(this);
      				if (obj2!=null) {
      					obj.content.append(obj2.div);
      					return true;
      				}
      				return false;
      			}	else return false;
          });
          
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
			if(this.owner) this.owner.deleteWidget();
			$(this).remove();
		});
		$('#bgImage').hide();
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
			buttons: [
        { text: tr("Close"), click: function() { $( this ).dialog("close"); } }
      ]
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
		if (design.currentZone==null) return false;
		if (confirm(tr('Really delete zone?'))) {
			$('zone[id=' + design.currentZone + ']', design.config).each(function() { this.parentNode.removeChild( this ); });
			design.refreshZoneList();
      var firstZone=$("#tab-design-zone-list option:first-child").val();
      design.clear();
			if (firstZone) design.draw(firstZone);
		}
	},

	// Clone current zone and all controls in 
	cloneCurrentZone: function() {
		var zoneID=prompt(tr('Enter ID for new zone'),'');
		if (zoneID!=null) {
			var zoneName=prompt(tr('Enter name for new zone'),'');
			if (zoneName!=null)	{
        var newzone = $('zone[id=' + design.currentZone + ']', design.config).get(0).cloneNode(true);

				newzone.setAttribute('id', zoneID);
				newzone.setAttribute('name', zoneName);
				$('zones', design.config).append(newzone);

				design.refreshZoneList();
				design.draw(zoneID);

				setTimeout('$("#tab-design-zone-list").val("' + zoneID + '")', 100); // workaround for IE bug
			}
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

    if (o.globalcontrol)
      $('#button-attach-widget').button( "option", "icons", {primary:'ui-icon-pin-s'}).removeClass('ui-button-text-icon-primary').addClass("ui-state-error");
    else
      $('#button-attach-widget').button( "option", "icons", {primary:'ui-icon-pin-w'}).removeClass('ui-button-text-icon-primary').removeClass("ui-state-error");
      
    design.updateglobalcontrolWidgetsList(o, o.globalcontrol);

    if (o.disable)	
		{
			$("#button-locked-widget").button( "option", "icons", {primary:'ui-icon-locked'}).removeClass('ui-button-text-icon-primary').addClass("ui-state-highlight");
    } else {
      $("#button-locked-widget").button( "option", "icons", {primary:'ui-icon-unlocked'}).removeClass('ui-button-text-icon-primary').removeClass("ui-state-highlight");
    }
	
	  // Setup standard fields x,y,width,height,desc
	  var table_tr=$('<tr><th>' +tr('Type')+'</th><td><input type="text" disabled="1" value="' + o.conf.getAttribute("type") + '"></td></tr>');
	   $("#tab-design-widget-properties tbody").append(table_tr);

		if (o.isDraggable) {
  	  var table_tr=$('<tr><th>X</th><td><input id="tab-design-properties-x" type="text" value="' + o.conf.getAttribute("x") + '"></td></tr>');
  	   $("#tab-design-widget-properties tbody").append(table_tr);
  	 
  	  var table_tr=$('<tr><th>Y</th><td><input id="tab-design-properties-y" type="text" value="' + o.conf.getAttribute("y") + '"></td></tr>');
  	   $("#tab-design-widget-properties tbody").append(table_tr);
    }

    var table_tr=$('<tr><th>' +tr('Description')+'</th><td><input id="tab-design-properties-desc" type="text" name="desc" value="' + ((!o.conf.getAttribute("desc"))?'':o.conf.getAttribute("desc")) + '"></td></tr>');
    $("#tab-design-widget-properties tbody").append(table_tr);
    $("#tab-design-properties-desc").change(function() {
      o.setSetting("desc", $(this).val());
    });

		if (o.isResizable) {
			var table_tr=$('<tr><th>' +tr('Width')+'</th><td><input id="tab-design-properties-width" type="text" value="' + o.conf.getAttribute("width") + '"></td></tr>');
			$("#tab-design-widget-properties tbody").append(table_tr);
			$("#tab-design-properties-width").change(function() {
				o.setSetting("width", $(this).val());
			});
			
	  	var table_tr=$('<tr><th>' +tr('Height')+'</th><td><input id="tab-design-properties-height" type="text" value="' + o.conf.getAttribute("height") + '"></td></tr>');
			$("#tab-design-widget-properties tbody").append(table_tr);
			$("#tab-design-properties-height").change(function() {
				o.setSetting("height", $(this).val());
			});
		}
		
		if (_widgetscssexist) {
      var table_tr=$('<tr><th>' +tr('Class CSS')+'</th><td><input id="tab-design-properties-class" type="text" value="' + (( o.conf.getAttribute("class") == null )?'':o.conf.getAttribute("class")) + '"></td></tr>');
			$("#tab-design-widget-properties tbody").append(table_tr);
			$("#tab-design-properties-class").change(function() {
				o.setSetting("class", $(this).val());
			});
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
					eis_type: this.getAttribute('eis_type')
				};
				properties.push(p);
			});
		}

		$.each(properties, function() {
	
			if (this.type=="comment" || this.type=="separator")
			{
		    var table_tr=$('<tr>');
		    table_tr.append($('<th colspan="2" class="' + this.type + '">' + this.label + '</th>'));
			} else
			{
		    var table_tr=$('<tr>');
		    table_tr.append($('<th>' + this.label + '</th>'));

	    	var value=o.conf.getAttribute(this.id);
	    	if (value=="undefined" || value==null) value="";
        if (o.conf.getAttribute('type')=="html" && o.conf.firstChild) {
          if (value!="") {
            o.conf.removeAttribute("html"); //o.conf.setAttribute("html", "");
            o.conf.firstChild.nodeValue = value;
          }
          value = o.conf.firstChild.nodeValue;
        } 
		    
		    var td=$('<td>');
		    // Text setting
		    //if (this.type=="text") td.append($('<input type="text" name="' + this.id + '" value="' + value + '">'));
        if (this.type=="text") {
          var textproperties = $('<input type="text" name="' + this.id + '" value="">');
          textproperties.val(value);
          td.append(textproperties);
        };

		    // TextArea setting
        if (this.type=="textarea") {
          var textareaproperties = $('<textarea name="' + this.id + '" rows="4" />');
          textareaproperties.text(value);
          td.append(textareaproperties);
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
	
          var only_type = [];
          if (this.eis_type) {
            only_type = [this.eis_type];
          } else if (this.only_type) {
            only_type = this.only_type.split(',');
            exlude_type = [];
          }

          var exlude_type = [];
          if (this.exlude_type) {
            exlude_type = this.exlude_type.split(',');
          }

          if (only_type.length > 0) {
            var prev_groups=["","",""];
					$('object', _objects).each(function() {
            if (array_search( this.getAttribute('type'), only_type )!=-1 ){
                var groups = this.getAttribute('id').split(':');
                if ( groups.length == 3 && ( groups[0] != prev_groups[0] || groups[1] != prev_groups[1] ) ) {
                  var grouplabel = groups[0] + ':' + groups[1];
                  select.append("<optgroup label='" + grouplabel + "'>");
                  prev_groups = groups;
                }
		    		var option=($('<option value="' + this.getAttribute('id') + '">' + ((this.textContent=="")?this.getAttribute('id'):this.textContent) +' (' + this.getAttribute('type') + ')</option>'));
		    		if (this.getAttribute('id')==value) option.attr('selected','1');
		    		select.append(option);
            }
					});
          } else {
					$('object', _objects).each(function() {
            if (array_search( this.getAttribute('type'), exlude_type )==-1 ){
		    		var option=($('<option value="' + this.getAttribute('id') + '">' + ((this.textContent=="")?this.getAttribute('id'):this.textContent) +' (' + this.getAttribute('type') + ')</option>'));
		    		if (this.getAttribute('id')==value) option.attr('selected','1');
		    		select.append(option);
            }//if (exlude_type.length > 0){}
					});
          }
		    	td.append(select);
		  	}

		    // multipleObject setting
		    if (this.type=="multipleObject") 
		    {
					var tabobject = new Array;
          $('object', _objects).each(function() {
            var label_obj = ((this.textContent=="")?this.getAttribute('id'):this.textContent);
            var value_obj = this.getAttribute('id');        
            var tab = [];
            tab["label"] = label_obj;
            tab["value"] = value_obj;
            tabobject.push(tab);
					});

          /* use autocomplete jquery-ui cf. http://jqueryui.com/demos/autocomplete/#combobox and http://jqueryui.com/demos/autocomplete/#multiple */
          wrapper = $( "<span>" )
            .addClass( "ui-combobox" );
          input = $("<input>")
            .appendTo( wrapper )
            .val( value )
            .attr("id", this.id)
            .attr("name", this.id)
            // don't navigate away from the field on tab when selecting an item
            .bind( "keydown", function( event ) {
              if ( event.keyCode === $.ui.keyCode.TAB &&
                  $( this ).data( "autocomplete" ).menu.active ) {
                event.preventDefault();
              }
            })
            .autocomplete({
              minLength: 0,
              delay: 0,
              source: function( request, response ) {
                // delegate back to autocomplete, but extract the last term
                response( $.ui.autocomplete.filter(
                  tabobject, extractLast( request.term ) ) );
              },
              focus: function() {
                // prevent value inserted on focus
                return false;
              },
              select: function( event, ui ) {
                var terms = split( this.value );
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push( ui.item.value );
                // add placeholder to get the comma-and-space at the end
                terms.push( "" );
                this.value = terms.join( ", " );
                //this.value = terms.join( "|" ); // le séparateur doit être en lien avec la fonction "split( val )" définie plus bas 
                return false;
              }
            });

          $( "<span>" )
            .attr( "tabIndex", -1 )
            .attr( "title", "Show All Items" )
            .appendTo( wrapper )
            .append('<span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span>')
            .addClass( "ui-button ui-state-default ui-button-icon-only" )
            .click(function() {
              // close if already visible
              if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                input.autocomplete( "close" );
                return;
              }
              // work around a bug (likely same cause as #5265)
              $( this ).blur();
              // pass empty string as value to search for, displaying all results
              input.autocomplete( "search", "" );
              input.focus();
            });
		    	td.append(wrapper);
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
					var input=($('<input type="text" name="' + this.id + '" value="' + value + '">'));
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
						actionEditor.open(actions, widgetObjects);
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
		
		    table_tr.append(td);
			}
			    
	    $("#tab-design-widget-properties tbody").append(table_tr);
		});
		
		$("#tab-design-properties input, #tab-design-properties select, #tab-design-properties textarea").change( function() {
			// Update conf on selected object when a property change
			//if ($("#widgetdiv .selected").length>0 && $(this).attr('name') != "undefined")
      if ($("#widgetdiv .selected").length>0 && $(this).attr('name'))
			{
				var selectedWidget=$("#widgetdiv .selected").get(0);
				// if widget is a html :
				if ((selectedWidget.owner.conf.getAttribute('type')=='html') && ($(this).attr('name')=="html")) 
					$(selectedWidget.owner.conf).empty().append(selectedWidget.owner.conf.ownerDocument.createCDATASection($(this).val()));
				else selectedWidget.owner.setSetting($(this).attr('name'), $(this).val());
				// if widget is a subpage and subpage name modified
				if ((selectedWidget.owner.conf.getAttribute('type')=='subpage') && ($(this).attr('name')=="subpage")) design.displayProperties(selectedWidget.owner);
			}
		});
		
		$("#tab-design-widget-properties input, #tab-design-widget-properties select").focusout(function() { $(this).trigger('change'); });
	},

  // add widget to the WidgetsList
  addWidgetsList: function(o, globalcontrol, child) {
    var type=o.conf.getAttribute('type');
    var desc=o.conf.getAttribute('desc');
    if (!desc) desc = type;

    var table_tr=$('<tr/>');
    table_tr.get(0).obj = o;
    if (globalcontrol) table_tr.css("color", "#FF0000"); // si globalcontrol == "true" c'est que le control/widget est lié au design et pas a la zone elle même
    if (child) table_tr.css("color", "#0000FF"); // si child == "true" c'est que le control/widget est lié a un widget "content"

    var th=$('<th>' + type + '</th>');
    table_tr.append(th);
    table_tr.click(function() {
      this.obj.div.widgetMovable("select");
    });

    var td=$('<td><span>' + desc + '</span></td>');
    table_tr.append(td);
    var bpviewxml =$('<td><button>Xml</button></td>');
    if (_superuser) table_tr.append(bpviewxml);

    bpviewxml.click(function() {
      $('#tab-design-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(this.parentNode.obj.conf) + "</textarea>");
      $('#tab-design-fluxxml').dialog({ 
        width: 812,
        modal: true,
        buttons: [
          { text: tr("Close"), click: function() { $( this ).dialog("close"); } }
        ]
      });
    });

    $("#tab-design-widgets-list tbody").append(table_tr);
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
  // chang widget global or not
  updateglobalcontrolWidgetsList: function(o, globalcontrol) {
    $("tr", "#tab-design-widgets-list").each(function() {
      if (this.obj == o) {
        if (globalcontrol) $(this).css("color", "#FF0000"); 
        else $(this).css("color", "");
      }
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
		var name=prompt(tr('Enter name for new design'),'default');
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

	// remove current design
	removeDesign: function()
	{
    if (confirm(tr('Really remove current design ') + design.currentDesign + "?")) {
			req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=removedesign&name=' + design.currentDesign, dataType: 'xml',
				success: function(responseXML, status) {
					var xmlResponse = responseXML.documentElement;
					if (xmlResponse.getAttribute('status') != 'error') {
						messageBox(tr("Design removed successfully"), "Info", "check"); 
					}
					else {
						messageBox(tr("Unable to remove design: ")+xmlResponse.textContent, "Error", "alert");
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					messageBox(tr("Unable to remove design: ")+textStatus, "Error", "alert");
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

/* functions for multipleObject */
function split( val ) {
  return val.split( /,\s*/ );
}
function extractLast( term ) {
  return split( term ).pop();
}

function array_search(what, where) {
  var index_du_tableau=-1;
  for(elt in where) {
    index_du_tableau++;
    if (where[elt]==what) { return index_du_tableau }
  }
  index_du_tableau=-1;
  return index_du_tableau;
}

jQuery(function($) {
	
	design.loadDesignList();

	$("button").button();

	$("#tab-design-properties").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });

	$("#tab-design-list-widgets").draggable({ 
  	containment: "parent" ,
  	scroll: false,
  	handle: "div:first"
  });

	$("#tab-design-width").change(function() {
		$("config",design.config)[0].setAttribute('width', $(this).val());
		$('#widgetdiv').width($(this).val());
	});

	$("#tab-design-height").change(function() {
		$("config",design.config)[0].setAttribute('height', $(this).val());
		$('#widgetdiv').height($(this).val());
	});
	
  $("#tab-design-grid").click(function() {
    $("#tab-design-grid-width").change();
    /*if ($(this).is(':checked')) {
      $("config",design.config)[0].setAttribute('grid', $("#tab-design-grid-width").val());
      design.grid = true;
      $("#widgetdiv .selected").draggable('option', 'grid', [design.gridWidth, design.gridWidth]);
      $("#tab-design-grid-width").change();
      $('.grid', '#widgetdiv').show();
    } else {
      $("config",design.config)[0].removeAttribute('grid');
      design.grid = false;
      $("#widgetdiv .selected").draggable('option', 'grid', [1, 1]);                              
      $('.grid', '#widgetdiv').hide();
    }*/
  });

  $("#tab-design-grid-width").change(function() {
    var val = parseInt($(this).val());
    $('.grid', '#widgetdiv').remove();
    if (val < 1 ) val = 1;
    if (val > 10) {
      var designwidth = $("#tab-design-width").val();
      var designheight = $("#tab-design-height").val(); 
      for (i=val; i < designwidth; i = i + val) { //z-index:1000;  &nbsp;
        $('#widgetdiv').prepend('<div class="grid" style="border-left: 1px dashed Black;position:absolute;height:' + designheight + 'px;display: block;top:0;left: ' + i + 'px;"></div>');
      }
      for (i=val; i < designheight; i = i + val) { // z-index:1000;
        $('#widgetdiv').prepend('<div class="grid" style="border-bottom: 1px dashed Black;position:absolute;width:' + designwidth + 'px;display: block;left:0;top: ' + i + 'px;"></div>');
      }
    }
    design.gridWidth = val;
    if ($("#tab-design-grid").is(':checked')) {
      $("config",design.config)[0].setAttribute('grid', val);
      design.grid = true;
      $("#widgetdiv .selected").draggable('option', 'grid', [design.gridWidth, design.gridWidth]);
      $('.grid', '#widgetdiv').show();
    } else {
      $("config",design.config)[0].removeAttribute('grid');
      design.grid = false;
      $("#widgetdiv .selected").draggable('option', 'grid', [1, 1]);                              
      $('.grid', '#widgetdiv').hide();
    }
  });
  $("#tab-design-grid-widgetsize").click(function() {
    if ($(this).is(':checked')) {
      design.gridwidgetsize = true;
      $("config",design.config)[0].setAttribute('gridwidgetsize', true);
    } else {
      design.gridwidgetsize = false;
      $("config",design.config)[0].removeAttribute('gridwidgetsize');
    }
  });

  $("#tab-design-floating").click(function() {
    $("#tab-design-margin").change();
  });

  $("#tab-design-margin").change(function() {
    var val = parseInt($(this).val());
    design.widgetMargin = val;
    if ($("#tab-design-floating").is(':checked')) {
      $("config",design.config)[0].setAttribute('floating', val);
      design.floating = true;
    } else {
      $("config",design.config)[0].removeAttribute('floating');
      design.floating = false;
    }
  });

  $("#tab-design-effect").change(function(e) {
    var val = $(this).val();
    if (val !="") $("config",design.config)[0].setAttribute('effect', val);
    else $("config",design.config)[0].removeAttribute('effect');
  });

  $("#tab-design-effect").empty();
  $("#tab-design-effect").append('<option value="" selected="1" >' + tr("None") + '</option>');
  $("#tab-design-effect").append('<option value="random">' + tr("Random") + '</option>');
  $.each(_tab_effects, function(key, label) {
    var option=($('<option value="' + label + '">' + tr(label) + '</option>'));
    $("#tab-design-effect").append(option);
  });

	$("#tab-design-slider").click(function() {
		if ($(this).is(':checked')) {
				$("config",design.config)[0].setAttribute('enableSlider', 'true');
        $("#tab-design-effect").attr('disabled', 'disabled');
		} else {
				$("config",design.config)[0].setAttribute('enableSlider', 'false');
        $("#tab-design-effect").removeAttr('disabled');
    }
	});

  $("#tab-design-zone-globalcontrol").click(function() {
    if (design.currentZone==null) return false;
    if ($(this).is(':checked'))
      $('zone[id=' + design.currentZone + ']', design.config)[0].setAttribute('globalcontrol', 'true' );
    else
      $('zone[id=' + design.currentZone + ']', design.config)[0].setAttribute('globalcontrol', 'false' );
  });
  
	$("#button-delete-widget").button({
		icons: {
			primary: "ui-icon-closethick"
		}
	});
	$("#button-delete-widget").click(function() {
		if ($("#widgetdiv .selected").length>0)	
		{
			//design.deleteWidget($("#widgetdiv .selected").get(0).owner); 
      design.deleteWidget($("#widgetdiv .selected"));
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
			newConf.setAttribute('x',parseInt(conf.getAttribute('x')) + 20);
			newConf.setAttribute('y',parseInt(conf.getAttribute('y')) + 20);
			$('zone[id='+design.currentZone+']', design.config)[0].appendChild(newConf);
			var obj=design.addWidget(newConf);
			obj.div.widgetMovable("select");
		}
	});

	$("#button-locked-widget").button({
		icons: {
			primary: "ui-icon-unlocked"
		},
    text: false
	}).removeClass('ui-button-text-icon-primary');
	$("#button-locked-widget").click(function() {
		var obj = $("#widgetdiv .selected");
    if (obj.length>0)	
		{
			//if (!obj.draggable( "option", "disabled")) {
      if (!obj.get(0).owner.disable) {
        $(this).button( "option", "icons", {primary:'ui-icon-locked'}).removeClass('ui-button-text-icon-primary').addClass("ui-state-highlight");
        $("#widgetdiv .selected").draggable( "disable" ).removeClass("ui-state-disabled");
        $("#widgetdiv .selected").get(0).owner.disable = true;
      } else {
        $(this).button( "option", "icons", {primary:'ui-icon-unlocked'}).removeClass('ui-button-text-icon-primary').removeClass("ui-state-highlight");
        $("#widgetdiv .selected").draggable( "enable" );
        $("#widgetdiv .selected").get(0).owner.disable = false;
      }
		}
	});
	$("#button-locked-widget").change(function() {
    if ($("#widgetdiv .selected").get(0).owner.disable)	
		{
			$(this).button( "option", "icons", {primary:'ui-icon-locked'}).removeClass('ui-button-text-icon-primary').addClass("ui-state-highlight");
    } else {
      $(this).button( "option", "icons", {primary:'ui-icon-unlocked'}).removeClass('ui-button-text-icon-primary').removeClass("ui-state-highlight");
    }
	});

	$("#button-attach-widget").button({
		icons: {
			primary: "ui-icon-pin-w"
		},
    text: false
	}).removeClass('ui-button-text-icon-primary');
  
	$("#button-attach-widget").click(function() {
		var obj = $("#widgetdiv .selected");
    if (obj.length>0)	
		{
			if (!obj.get(0).owner.globalcontrol) {
        $(this).button( "option", "icons", {primary:'ui-icon-pin-s'}).removeClass('ui-button-text-icon-primary').addClass("ui-state-error");
        var conf=obj.get(0).owner.conf.cloneNode(true);
        $(obj.get(0).owner.conf).remove();
        $('zones', design.config).append(conf);
        obj.get(0).owner.globalcontrol = true;
        design.updateglobalcontrolWidgetsList(obj.get(0).owner, obj.get(0).owner.globalcontrol);
      }
		}
	});

	$("#button-add-new-zone").click(function() {
		design.addZone();
	});

	$("#button-remove-zone").click(function() {
		design.removeCurrentZone();
	});
	
	$("#button-save-design").click(function() {
		design.save();
	});

	$("#button-add-design").click(function() {
		design.addDesign();
	});

	$("#button-remove-design").click(function() {
		design.removeDesign();
	});
  /* Widgets List */
  $("#show-list-widgets-design-checkbox").change(function() {
		$('#tab-design-list-widgets').toggle();
    if( $('#tab-design-list-widgets').is(':visible') )
      $('#show-list-widgets-design-checkbox').attr('checked','1');
    else
      $('#show-list-widgets-design-checkbox').removeAttr('checked');
	});
  $("#show-list-widgets-design-checkbox").click(function() {
		$('#show-list-widgets-design-checkbox').change();
	});
	$("#show-list-widgets-design").click(function() {
		$('#show-list-widgets-design-checkbox').change();
	});
  $("#tab-design-list-widgets .minus").click(function() {
		$('#show-list-widgets-design-checkbox').change();
	});
  /* Zones list */

	$("#design-zones-list").draggable({ 
  	containment: "parent" ,
  	scroll: false,
  	handle: "div:first"
  });

  $("#show-zones-list-checkbox").change(function() {
		$('#design-zones-list').toggle();
    if( $('#design-zones-list').is(':visible') )
      $('#show-zones-list-checkbox').attr('checked','1');
    else
      $('#show-zones-list-checkbox').removeAttr('checked');
	});
  $("#show-zones-list-checkbox").click(function() {
		$('#show-zones-list-checkbox').change();
	});
	$("#show-zones-list").click(function() {
		$('#show-zones-list-checkbox').change();
	});
  $("#design-zones-list .minus").click(function() {
		$('#show-zones-list-checkbox').change();
	});
  $("#design-zones-list .down").click(function() {
    if ($(".active", "#tab-design-zones-list").length > 0) {
      var zoneId = $(".active", "#tab-design-zones-list").attr('zoneId');
      var next = false;
      $("tbody tr", "#tab-design-zones-list").each(function() {
        if ( zoneId == this.getAttribute("zoneId")) next = true;
        else if (next) {
          $(".active", "#tab-design-zones-list").before($(this));
          $('zone[id=' + zoneId + ']', design.config).before($('zone[id=' + this.getAttribute("zoneId") + ']', design.config));
          next = false;
        }
      });
    }
	});
  $("#design-zones-list .up").click(function() {
    if ($(".active", "#tab-design-zones-list").length > 0) {
      var zoneId = $(".active", "#tab-design-zones-list").attr('zoneId');
      var zoneIdprec = "";
      var _this_prec = "";
      $("tbody tr", "#tab-design-zones-list").each(function() {
        if ( zoneId == this.getAttribute("zoneId")) { 
          $(".active", "#tab-design-zones-list").after($(_this_prec));
          $('zone[id=' + zoneId + ']', design.config).after($('zone[id=' + zoneIdprec + ']', design.config));
        }
        zoneIdprec = this.getAttribute("zoneId");
        _this_prec = this;
      });
    }
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
	
	loading.hide();
});
