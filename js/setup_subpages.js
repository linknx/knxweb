_editMode = true;

var subpages = {
	config: null,
	currentSubPage: null,
  number: 0,

	// Load subpages from server
	load: function()
	{
		var url = 'design/subpages.xml';
	
		req = jQuery.ajax({ url: url, dataType: 'xml', async: false, cache: false,
			success: function(responseXML, status) {
				
				subpages.config=responseXML
				subpages.refreshSubPagesList();
			}
		});
	},
	
	// Save subpages from server
	save: function() {
		var string = serializeXmlToString(subpages.config);
		var url = 'design_technique.php?action=savesubpages';
		req = jQuery.ajax({ type: 'post', url: url, data: string, processData: false, dataType: 'xml' ,
			success: function(responseXML, status) {
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') == 'success')
				{
					messageBox(tr("Sub-pages saved successfully"), tr("Info"), "check");
					subpages.load();
				}	else messageBox(tr("Error while saving design: ")+xmlResponse.textContent, tr("Error"), "alert");
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
					messageBox(tr("Error while saving design: ")+textStatus, tr("Error"), "alert");
			}
		});
	},
	
	// Create a new subpage
	new: function()	{
		var name=prompt(tr('Enter name for new subpage'),'');
		if (name!=null)	{
			if (!subpages.subPageExists(name)) {
				var subpage = subpages.config.createElement('subpage');
				subpage.setAttribute('name', name);
				subpage.setAttribute('width', 128);
				subpage.setAttribute('height', 128);

				$('subpages', subpages.config).append(subpage);

				var param = subpages.config.createElement('parameters');
				subpage.appendChild(param);

				var controls = subpages.config.createElement('controls');
				subpage.appendChild(controls);

				subpages.draw(name);
				subpages.refreshSubPagesList();

			} else messageBox(tr("Another sub-page with the same name already exists"), tr("Error"), "alert");
		}
	},
  
  // Clone a subpage
  clone: function()	{ 
    var name=prompt(tr('Enter name for new subpage cloned'),'');
    if (name!=null)	{
      $('subpage', subpages.config).each(function() {
  			if (this.getAttribute('name') == name) {
  				//found=true;
          var subpage = subpages.config.createElement('subpage');
          this.attributes(function(attr){
            subpage.setAttribute(attr.name, attr.value);
          });
          subpage.setAttribute('name', name);
          
          $('subpages', subpages.config).append(subpage);
          
          //var param = subpages.config.createElement('parameters');
          //$('parameters', this).append(subpage);
          var parameters = $('parameters', this).clone();
          //param = parameters[0]; 
          //subpage.appendChild(param);
          subpage.appendChild(parameters[0]);
          
          //var controls = subpages.config.createElement('controls');
          var controlsold = $('controls', this).clone();
          //controls = controlsold[0];
          //subpage.appendChild(controls);
          subpage.appendChild(controlsold[0]);
          
          subpages.draw(name);
          subpages.refreshSubPagesList();
          return;
  			}
  		});
      /* pour le clone d'un widget :
      $("#tab-subpages-clone-widget").click(function() {
    		if ($("div .selected").length>0)	
    		{
    			var conf=$("div .selected").get(0).owner.conf;
    			var newConf=conf.cloneNode(true);
    			newConf.setAttribute('x',20);
    			newConf.setAttribute('y',20);
    			$('subpage[name=' + subpages.currentSubPage + ']', subpages.config).children('controls')[0].appendChild(newConf);
    			var obj=subpages.addWidget(newConf);
    			obj.div.widgetMovable("select");
    		}
    	});
      */
    }
  },

	// Delete a subpage
	delete: function(name)	{
		if (confirm(tr('Really delete sub-page ' + name + '?'))) {
			$('subpage[name=' + name + ']', subpages.config).each(function() { this.parentNode.removeChild( this ); });

			subpages.refreshSubPagesList();
			
			var firstsubpage=$("#tab-subpages-list option:first-child").val();
			if (firstsubpage) subpages.draw(firstsubpage); else subpages.clear();
		}
	},
	
	// Check if a subpage exists
	subPageExists: function(name) {
		var found=false;
		$('subpage', subpages.config).each(function() {
			if (this.getAttribute('name')==name) {
				found=true;
				return found;
			}
		});
		return found;
	},

	// Refresh subpages list select
	refreshSubPagesList: function() {
 		$('#tab-subpages-list').empty();
		$('subpage', subpages.config).each(function() {
			var option = $("<option value='" + this.getAttribute('name') + "'>" + this.getAttribute('name') + "</option>");
			if (this.getAttribute('name')==subpages.currentSubPage) option.attr('selected','1');
			$('#tab-subpages-list').append(option);
		});
	},
	
	// Draw a subpage
	draw: function(name) {
    if (_editMode) _designeditview = false;

		if (name!=null)
		{
			subpages.clear();
	
			this.currentSubPage = name;
			
			var subpage= $('subpage[name=' + name + ']', subpages.config);
	
			$('#widgetsubpagediv').width(subpage[0].getAttribute('width'));
			$('#widgetsubpagediv').height(subpage[0].getAttribute('height'));
			if (subpage[0].getAttribute('bgcolor')) $('#widgetsubpagediv').css("background-color", subpage[0].getAttribute('bgcolor')); else $('#widgetsubpagediv').css("background-color", "");
	
			$("#tab-subpages-width").val(subpage[0].getAttribute('width'));
			$("#tab-subpages-height").val(subpage[0].getAttribute('height'));
			$("#tab-subpages-color").val(subpage[0].getAttribute('bgcolor'));

			var value=subpage[0].getAttribute('bgimage');
			if (value!=null)
			{
		   	var isSubPageParameter=((value.substring(0,1)=="_")?true:false);
		   	var subPageParameterValue=value.substring(1,value.length);
				
		   	var select=$('#tab-subpages-background-list');
					$('subpage[name=' + subpages.currentSubPage + '] parameters parameter', subpages.config).each(function() {
						if (this.getAttribute('type')=='picture') {
			    		var option=($('<option value="' + this.getAttribute('id') + '">' + this.getAttribute('label') + '</option>'));
			    		if (this.getAttribute('id')==subPageParameterValue) option.attr('selected','1');
			    		select.append(option);
			    	}
				});
						
				if (isSubPageParameter) 
				{
					$('#tab-subpages-background-toggle').attr('checked', true);
					$('#tab-subpages-background').css("display","none");
					select.css("display","block");
					$('#widgetsubpagediv').css("background-image", "none");
				} else {
					$('#tab-subpages-background-toggle').attr('checked', false);
					$("#tab-subpages-background").val(value);
					select.css("display","none");
					$('#tab-subpages-background').css("display","block");

					$('#widgetsubpagediv').css("background-image", "url(" + getImageUrl(value) + ")");
				}
			} else {
				$('#widgetsubpagediv').css("background-image", '');
				$("#tab-subpages-background").val('');
				$('#tab-subpages-background-list').css("display","none");
				$('#tab-subpages-background').css("display","block");
			}


	    var number = 0;
			subpage.children('controls').children('control').each(function() {
				var obj = subpages.addWidget(this);
        number++;
        obj.div.css("z-index", number );
			});
		}
	},

	// Add existing widget
	addWidget: function(conf) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = UIController.widgetList[type];

		if (cls)
		{
			obj = new cls(conf);
		
			if (obj!=null) {
				$('#widgetsubpagediv').append(obj.div);
				obj.edit(subpages.onWidgetSelect, subpages.onWidgetMove, subpages.onWidgetResize);
        subpages.addWidgetsList(obj);
        $('control', conf).each(function() {
  				subpages.addWidgetChildren(this, obj.content);
  			});
				return obj;
			}
			return false;
		}	else return false;
	},

	// Add widget from conf and to a parent
	addWidgetChildren: function(conf, parent) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = UIController.widgetList[type];

		if (cls)
		{
			obj = new cls(conf);
			if (obj!=null) {
        parent.append(obj.div);
				obj.edit(subpages.onWidgetSelect, subpages.onWidgetMove, subpages.onWidgetResize);
        subpages.addWidgetsList(obj);
				return obj;
			}
			return false;
		}	else return false;
	},
	
	// Create a new widget
	newWidget: function(type) {
		// Fetch default config and add widget
		req = jQuery.ajax({ type: 'post', url: 'design_technique.php?action=newWidget&type='+type, dataType: 'xml',
			success: function(conf) {

				var conf = conf.documentElement;
				$('subpage[name=' + subpages.currentSubPage + ']', subpages.config).each(function() {
					this.getElementsByTagName('controls')[0].appendChild(conf);
				});
				var obj=subpages.addWidget(conf);
				obj.div.widgetMovable("select");
			}
		});
	},
	
	// Delete a widget
	deleteWidget: function(o) {
    subpages.removeWidgetsList(o);
		// Remove div
		o.div.remove();
		// Remove from xml
		$(o.conf).remove();
	},
	
	// Remove all widget
	clear: function() {
		$("#widgetsubpagediv .widget").each(function() {
			$(this).remove();
		});
    subpages.refreshWidgetsList();
		subpages.currentSubPage=null;
	},

	// Get parameter select
	getParameterSelect: function() {
	},

	// Show design properties
	displaySubpageProperties: function() {
		$('#tab-subpages-properties div:first-child').html(tr('Sub-page properties'));
		$('#tab-subpages-widget-buttons').hide();
		$("#tab-subpages-widget-properties tbody").empty();

		$('#tab-subpages-subpage-properties').show();
	},

  // Show design list widgets off the page
  displayListWidgets: function() {
    $("#tab-subpages-widgets-list").show();
  },
  // add widget to the WidgetsList
  addWidgetsList: function(o) {
    var type=o.conf.getAttribute('type');
    var eis_type=o.conf.getAttribute('eis_type');
    var desc=o.conf.getAttribute('desc');
    if (!desc) desc = type;
    subpages.number++;
    o.number = subpages.number; 

    var table_tr=$('<tr/>');
    table_tr.get(0).obj = o;

    var th=$('<th>' + subpages.number + ' ' + type + '</th>');
    table_tr.append(th);
    table_tr.click(function() {
      this.obj.div.widgetMovable("select");
    });

    var td=$('<td><span>' + desc + '</span></td>');
    table_tr.append(td);
    var bpviewxml =$('<td><button>' + tr('Xml') + '</button></td>');
    //table_tr.append(bpviewxml);

    bpviewxml.click(function() {
      $('#tab-design-fluxxml').html("<textarea rows=30 cols=125>" + serializeXmlToString(this.parentNode.obj.conf) + "</textarea>");
      $('#tab-design-fluxxml').dialog({ 
        width: 812,
        modal: true,
        buttons: [
          { text: tr("Close"), click: function() { $( this ).dialog( "close" ); } }
        ]
      });
    });

    $("#tab-subpages-widgets-list tbody").append(table_tr);
  },
  // Refresh Widgets List	
	refreshWidgetsList: function() {
		$("#tab-subpages-widgets-list tbody").empty();
    subpages.number = 0;
    var table_tr=$('<tr><th>subpage</th><td><span>'+$("#tab-subpages-list").val()+'</span></td></tr>');
    table_tr.click(function() {
  		$(".active", "#tab-subpages-widgets-list").removeClass("active");
      $(this).addClass("active")
      $('div').removeClass("selected");
  		// Hide resizer
  		$(".resizeSE").hide();
  		$("#widgetsubpagediv").addClass("selected");
  		subpages.displaySubpageProperties();
    });
    $("#tab-subpages-widgets-list tbody").append(table_tr);
	},
  // remove widget from the WidgetsList
  removeWidgetsList: function(o) {
    $("tr", "#tab-subpages-widgets-list").each(function() {
      if (this.obj == o) $(this).remove();
    });
  },
  // selected a widget from the function onWidgetSelect()
  selectWidgetsList: function(o) {
    $(".active", "#tab-subpages-widgets-list").removeClass("active");
    $("tr", "#tab-subpages-widgets-list").each(function() {
      if (this.obj == o) $(this).addClass("active");
    });
  },
  
  
	// Fill properties table when selecting a widget
	displayProperties: function(o) {
		var type=o.conf.getAttribute('type');
		var eis_type=o.conf.getAttribute('eis_type');

		$('#tab-subpages-properties div:first-child').html(type + ' properties');

		$('#tab-subpages-subpage-properties').hide();

		$('#tab-subpages-widget-buttons').show();
		
		$("#tab-subpages-widget-properties tbody").empty();
		
		var properties = eval( "_widgets." + type + ".settings" );

	  // Setup standard fields x,y,width,height
	  var table_tr=$('<tr><th colspan="2">X</th><td><input id="tab-subpages-properties-x" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("x") + '"></td></tr>');
	   $("#tab-subpages-widget-properties tbody").append(table_tr);
	 
	  var table_tr=$('<tr><th colspan="2">Y</th><td><input id="tab-subpages-properties-y" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("y") + '"></td></tr>');
	   $("#tab-subpages-widget-properties tbody").append(table_tr);
	
    var table_tr=$('<tr><th colspan="2">' +tr('Description')+'</th><td><input id="tab-subpages-properties-desc" type="text" name="desc" value="' + ((!o.conf.getAttribute("desc"))?'':o.conf.getAttribute("desc")) + '"></td></tr>');
    $("#tab-subpages-widget-properties tbody").append(table_tr);
    $("#tab-subpages-properties-desc").change(function() {
      o.setSetting("desc", $(this).val());
    });
	
		if (o.isResizable) {
			var table_tr=$('<tr><th colspan="2">' +tr('Width')+'</th><td><input id="tab-subpages-properties-width" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("width") + '"></td></tr>');
			$("#tab-subpages-widget-properties tbody").append(table_tr);
			$("#tab-subpages-properties-width").change(function() {
				o.setSetting("width", $(this).val());
			});

	  	var table_tr=$('<tr><th colspan="2">' +tr('Height')+'</th><td><input id="tab-subpages-properties-height" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("height") + '"></td></tr>');
			$("#tab-subpages-widget-properties tbody").append(table_tr);
			$("#tab-subpages-properties-height").change(function() {
				o.setSetting("height", $(this).val());
			});
		}
	   
		$("#tab-subpages-properties-x").change(function() {
			o.setSetting("x", $(this).val());
		});
	
		$("#tab-subpages-properties-y").change(function() {
			o.setSetting("y", $(this).val());
		});
		
		$.each(properties, function() {
	
			// Comment or separator
			if (this.type=="comment" || this.type=="separator")
			{
		    var table_tr=$('<tr>');
		    table_tr.append($('<th colspan="3" class="' + this.type + '">' + tr(this.label) + '</th>'));
			} else
			{
		    var table_tr=$('<tr>');
		    table_tr.append($('<th>' + tr(this.label) + '</th>'));

	    	var value=o.conf.getAttribute(this.id);
	    	if (value=="undefined" || value==null) value="";
	    	var isSubPageParameter=((value.substring(0,1)=="_")?true:false);
	    	var subPageParameterValue=value.substring(1,value.length);
        if (o.conf.getAttribute('type')=="html" && o.conf.firstChild) {
          if (value!="") {
            o.conf.removeAttribute("html");
            o.conf.firstChild.nodeValue = value;
          }
          value = o.conf.firstChild.nodeValue;
        } 

		    // Add checkbox to use a sub-page parameter
		    if ((this.type=="text") || (this.type=="object") || (this.type=="picture") || (this.type=="zone") || (this.type=="multipleObject"))
		    {
			    var input=$('<input type="checkbox">');
			    input.get(0).paramId=this.id;
			    input.attr('title','Use sub-page parameter');
			    if (isSubPageParameter) input.attr('checked',1);
			    input.click(function() {
			    	if ($(this).is(':checked'))
			    	{
							$('[name=' + this.paramId + ']', $(this).parent().parent()).css("display","none");
							$('[name=_' + this.paramId + ']', $(this).parent().parent()).css("display","block");
			    	} else
		    		{
							$('[name=_' + this.paramId + ']', $(this).parent().parent()).css("display","none");
							$('[name=' + this.paramId + ']', $(this).parent().parent()).css("display","block");
		    		}
			    		
			    });
			    table_tr.append($('<th style="width: 15px;">').append(input));
			  } else table_tr.append($('<th style="width: 15px;">'));
		    
				// Add parameter				
		    var td=$('<td>');
	    
		    if ((this.type=="text") || (this.type=="object") || (this.type=="picture") || (this.type=="zone") || (this.type=="multipleObject")) {
					// Select for selecting sub-page parameter
		    	var select=$('<select>');
		    	if (!isSubPageParameter) select.css('display','none');
		    	select.attr('name', "_" + this.id);
		    	var prop=this;
					$('subpage[name=' + subpages.currentSubPage + '] parameters parameter', subpages.config).each(function() {
						if (this.getAttribute('type')==prop.type) {
			    		var option=($('<option value="' + this.getAttribute('id') + '">' + this.getAttribute('label') + '</option>'));
			    		if (this.getAttribute('id')==subPageParameterValue) option.attr('selected','1');
			    		select.append(option);
			    	}
					});
		    	td.append(select);
		    }

		    // Text setting
		    if (this.type=="text") 
		    {
          var input=$('<input type="text" name="' + this.id + '" value="">');
          if (!isSubPageParameter) input.val(value); //o.conf.getAttribute(this.id)
	    		if (isSubPageParameter) input.css('display','none');
		    	td.append(input);
		    }
		    // TextArea setting
        if (this.type=="textarea") {
          var textareaproperties = $('<textarea name="' + this.id + '" rows="4" />');
          if (!isSubPageParameter) textareaproperties.text(value);
	    		if (isSubPageParameter) textareaproperties.css('display','none');
          td.append(textareaproperties);
        };
		
		    // List setting
		    if (this.type=="list") 
		    {
		    	select=$('<select>');
		    	select.attr('name', this.id);
		    	$.each(this.options, function(key, label) {
		    		var option=($('<option value="' + key + '">' + label+ '</option>'));
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
		    		var option=($('<option value="' + this.getAttribute('id') + '">' + this.textContent + '</option>'));
		    		if (!isSubPageParameter) if (this.getAttribute('id')==value) option.attr('selected','1');
		    		select.append(option);
					});
	    		if (isSubPageParameter) select.css('display','none');
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
					var input=($('<input type="text" name="' + this.id + '" value="' + ((!isSubPageParameter)?value:"") + '">')); //o.conf.getAttribute(this.id)
					input.click(function() {
						openImagesManager($(this));
					});			
	    		if (isSubPageParameter) input.css('display','none');
		    	td.append(input);
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
							var actions=subpages.config.createElement("actionlist");
							actions.setAttribute("id", propId);
							o.conf.appendChild(actions);
						}
						
						var subPageObjects=[];
						$('subpage[name=' + subpages.currentSubPage + '] parameters parameter', subpages.config).each(function() {
							if (this.getAttribute('type')=='object') {
								subPageObjects.push({
									id: this.getAttribute('id'),
									value: this.getAttribute('label')
								});
				    	}
						});
						actionEditor.open(actions, subPageObjects);
					});			
		    	td.append(input);
		  	}
		  	
		    // Zone setting
		    if (this.type=="zone") 
		    {
		    	select=$('<select>');
		    	select.attr('name', this.id);
		    	select.attr('disabled', '1');

	    		var option=($('<option value="">Execute action</option>'));
	    		select.append(option);
	
		    	td.append(select);
		  	}
		
		    table_tr.append(td);
			}
			    
	    $("#tab-subpages-widget-properties tbody").append(table_tr);
		});
		
		$("#tab-subpages-widget-properties input, #tab-subpages-widget-properties select, #tab-subpages-widget-properties textarea").change( function() {
			// Update conf on selected object when a property change
			if (($(this).get(0).tagName=="SELECT") || ($(this).attr('type')=="text") || ($(this).get(0).tagName=="TEXTAREA"))
			{
				if ($(this).attr('name').substring(0,1)=="_") {
					var name=$(this).attr('name').substring(1,$(this).attr('name').length);
					var value="_" + $(this).val();
				} else {
					var name=$(this).attr('name');
					var value=$(this).val();
				}
				if ($("div .selected").length>0) {
          //$("div .selected").get(0).owner.setSetting(name, value);
          var selectedWidget=$("div .selected").get(0);
          // if widget is a html :
          if ((selectedWidget.owner.conf.getAttribute('type')=='html') && (name=="html")) 
            $(selectedWidget.owner.conf).empty().append(selectedWidget.owner.conf.ownerDocument.createCDATASection(value));
          else selectedWidget.owner.setSetting(name, value);
        }
			} else $("input[type=text]:visible,select:visible",$(this).parent().parent()).trigger('change');
		});
		
		$("#tab-subpages-widget-properties input, #tab-subpages-widget-properties select").focusout(function() { $(this).trigger('change'); });

	},
	
	// Callback when a widget is selected
	onWidgetSelect: function(widget) {
		subpages.selectWidgetsList(widget.owner);
    // Display properties corresponding to widget type
		subpages.displayProperties(widget.owner);
	},
	
	// Callback when a widget is moved
	onWidgetMove: function(widget) {
		$("#tab-subpages-properties-x").val(widget.conf.getAttribute('x'));
		$("#tab-subpages-properties-y").val(widget.conf.getAttribute('y'));
	},

	// Callback when a widget is resized
	onWidgetResize: function(widget) {
		$("#tab-subpages-properties-width").val(Math.round(widget.conf.getAttribute('width')));
		$("#tab-subpages-properties-height").val(Math.round(widget.conf.getAttribute('height')));
	},
	
	// Add a new line into the parameters dialog
	addParameterLine: function(id, label, type, eis_type) {
		id=((typeof(id)!='undefined')? id : "");
		label=((typeof(label)!='undefined')? label : "");
		type=((typeof(type)!='undefined')? type : "");
		eis_type=((typeof(eis_type)!='undefined')? eis_type : "");
		
		var table_tr=$("<tr>");

		var td=$("<td><input type='text' class='id' value='" + id + "'></td>");
		table_tr.append(td);
		var td=$("<td><input type='text' class='label' value='" + label + "'></td>");
		table_tr.append(td);
		var td=$("<td>");
		
		var select=$("<select class='type'>");
		select.append($("<option value='text'>Text</option>"));
		select.append($("<option value='object'>Object</option>"));
		select.append($("<option value='picture'>Picture</option>"));
		select.append($("<option value='zone'>Zone</option>"));
		//select.append($("<option value='multipleObject' disabled='1' >multipleObject</option>"));  // TODO ...
		select.val(type);
		td.append(select);
		table_tr.append(td);

		var td=$("<td>");
		var select=$("<select class='eis_type'>");
		select.append($("<option value=''>"+tr("undefined")+"</option>"));
		
// 		if (type=='object') {
			$.each(tab_objectTypes, function(key, descr) { select.append($("<option value='" + key + "'>" + descr + "</option>")); });
			select.val(eis_type);
// 		}
		td.append(select);
		table_tr.append(td);
		
		var td=$("<td>");
		var select=$("<select class='eis_type'>");
		select.append($("<option value=''>"+ tr("undefined") + "</option>"));
		
// 		if (type=='object') {
			$.each(tab_objectTypes, function(key, descr) { select.append($("<option value='" + key + "'>" + descr + "</option>")); });
			select.val(eis_type);
// 		}
		td.append(select);
		table_tr.append(td);

		var td=$("<td><img src='images/remove.png'></td>");
		$("img",td).button();
		$("img",td).click(function(e) { $(e.target).parent().parent().remove(); });
		
		table_tr.append(td);

		$("#tab-subpages-parameters-list tbody").append(table_tr);
	},
	
	// Triggered when closing the parameters dialog
	saveParameters: function() {
		var res=false;
		
		$('subpage[name=' + subpages.currentSubPage + '] parameters', subpages.config).empty();
		
		$("#tab-subpages-parameters-list tbody tr").each(function() {

			var id=$(".id",this).val();
			var label=$(".label",this).val();
			var type=$(".type",this).val();
			var eis_type=$(".eis_type",this).val();
			
			if ((id=="")||(label=="")) {
				messageBox(tr("Please complete all fields"), tr("Error"), "alert");
				return false;
			}

			var parameter = subpages.config.createElement('parameter');
			parameter.setAttribute('id', id);
			parameter.setAttribute('label', label);
			parameter.setAttribute('type', type);
			parameter.setAttribute('eis_type', eis_type);
			
			$('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0].getElementsByTagName('parameters')[0].appendChild(parameter);
		
			res=true;
		});
		return res;
	},
	
	// Fill table when opening the parameters dialog
	fillParameters: function() {
		$("#tab-subpages-parameters-list tbody").empty();

		$('subpage[name=' + subpages.currentSubPage + '] parameters parameter', subpages.config).each(function() {
			subpages.addParameterLine(this.getAttribute('id'), this.getAttribute('label'), this.getAttribute('type'), this.getAttribute('eis_type') );
		});
	}
}
/* functions for multipleObject */
function split( val ) {
  return val.split( /,\s*/ );
}
function extractLast( term ) {
  return split( term ).pop();
}

jQuery(function($) {
	
	$("#tab-subpages-properties").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });

	$("#tab-subpages-list-widgets").draggable({ 
  	containment: "parent" ,
  	scroll: false,
  	handle: "div:first"
  });
	
	$("#tab-subpages-delete-widget").button({
		icons: {
			primary: "ui-icon-closethick"
		}
	});
	
	$("#tab-subpages-delete-widget").click(function() {
		if ($("div .selected").length>0)	
		{
			subpages.deleteWidget($("div .selected").get(0).owner);
			// Show subpage properties
			$("#widgetsubpagediv").trigger("click");
		}
	});

	$("#tab-subpages-clone-widget").button({
		icons: {
			primary: "ui-icon-copy"
		}
	});
	
	$("#tab-subpages-clone-widget").click(function() {
		if ($("div .selected").length>0)	
		{
			var conf=$("div .selected").get(0).owner.conf;
			var newConf=conf.cloneNode(true);
			newConf.setAttribute('x',20);
			newConf.setAttribute('y',20);
			$('subpage[name=' + subpages.currentSubPage + ']', subpages.config).children('controls')[0].appendChild(newConf);
			var obj=subpages.addWidget(newConf);
			obj.div.widgetMovable("select");
		}
	});
	
	$("#tab-subpages-width").change(function() {
		var subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0];
		subpage.setAttribute('width', $(this).val());
		$('#widgetsubpagediv').width($(this).val());
	});

	$("#tab-subpages-height").change(function() {
		var subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0];
		subpage.setAttribute('height', $(this).val());
		$('#widgetsubpagediv').height($(this).val());
	});
	
	$("#tab-subpages-parameters").dialog({
		buttons: [
      { text: tr("Ok"), click: function() { if (subpages.saveParameters()) $( this ).dialog( "close" ); } },
      { text: tr("Cancel"), click: function() { $( this ).dialog( "close" ); } }
    ],
		width: 650,
		height: 300,
		modal: true,
		autoOpen: false,
		open: function() {
			subpages.fillParameters();
		},
		"Close": function() {
			if ($("div .selected").length>0)	
				subpages.displayProperties($("div .selected").get(0).owner);
		}
	});
	
	$("#tab-subpages-parameters-add").button();
	$("#tab-subpages-parameters-add").click(function() { subpages.addParameterLine(); });
	
	// Bind menu buttons
	$("#button-add-subpage").click(function() {
		subpages.new();
	});
  
  $("#button-clone-subpage").click(function() {
		subpages.clone();
	});

	$("#button-remove-subpage").click(function() {
		subpages.delete($('#tab-subpages-list').val());
	});
	
	$("#tab-subpages-color").click(function() {
		openColorPicker($(this));
	});			
	
	$("#tab-subpages-color").change(function() {
		var subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0];
		subpage.setAttribute('bgcolor', $(this).val());
		$('#widgetsubpagediv').css("background-color", $(this).val());
	});

	$("#tab-subpages-background").click(function() {
		openImagesManager($(this));
	});

	$("#tab-subpages-background").change(function() {
		var subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0];
		subpage.setAttribute('bgimage', $(this).val());
		$('#widgetsubpagediv').css("background-image", "url(" + getImageUrl($(this).val()) + ")");
	});

	$("#tab-subpages-background-list").change(function() {
		var subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0];
		subpage.setAttribute('bgimage', "_" + $(this).val());
		$('#widgetsubpagediv').css("background-image", "none");
	});
	
	$("#button-save-subpage").click(function() {
		subpages.save();
	});

  $("#show-list-widgets-subpage-checkbox").change(function() {
		$('#tab-subpages-list-widgets').toggle();
    if( $('#tab-subpages-list-widgets').is(':visible') )
      $('#show-list-widgets-subpage-checkbox').attr('checked','1');
    else
      $('#show-list-widgets-subpage-checkbox').removeAttr('checked');
	});
  $("#show-list-widgets-subpage-checkbox").click(function() {
		$('#show-list-widgets-subpage-checkbox').change();
	});
	$("#show-list-widgets-subpage").click(function() {
		$('#show-list-widgets-subpage-checkbox').change();
	});
  $("#tab-subpages-list-widgets .minus").click(function() {
		$('#show-list-widgets-subpage-checkbox').change();
	});

  $("#tab-subpages-list-widgets .down").click(function() {
    if ($(".active", "#tab-subpages-widgets-list").length > 0) {
      var obj = $(".active", "#tab-subpages-widgets-list").get(0).obj;
      if ( obj.number < subpages.number ) {
        var _this_subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config);
        obj.number = obj.number + 1;
        var number = obj.number , objsav = obj;
        $("tbody tr", "#tab-subpages-widgets-list").each(function() { 
          if (this.obj) {
            if (this.obj.number == number && objsav != this.obj) {
              this.obj.number = this.obj.number - 1;
              $(".active", "#tab-subpages-widgets-list").before($(this));
              $(obj.conf, _this_subpage).before($(this.obj.conf, _this_subpage));
            } 
            this.obj.div.css("z-index", this.obj.number ); 
            $( 'th', this).html( this.obj.number + " " + this.obj.conf.getAttribute('type') ); 
          }
        });
      }
    }
	});
  $("#tab-subpages-list-widgets .up").click(function() {
    if ($(".active", "#tab-subpages-widgets-list").length > 0) {
      var obj = $(".active", "#tab-subpages-widgets-list").get(0).obj;
      if (obj.number > 1) {
        var _this_subpage = $('subpage[name=' + subpages.currentSubPage + ']', subpages.config);
        obj.number = obj.number - 1;
        var number = obj.number;
        var objsav = obj;
        $("tbody tr", "#tab-subpages-widgets-list").each(function() { 
          if (this.obj) {
            if (this.obj.number == number && objsav != this.obj) {
              this.obj.number = this.obj.number + 1;
              $(".active", "#tab-subpages-widgets-list").after($(this));
              $(obj.conf, _this_subpage).after($(this.obj.conf, _this_subpage));
            }  
            this.obj.div.css("z-index", this.obj.number ); 
            $( 'th', this).html( this.obj.number + " " + this.obj.conf.getAttribute('type') ); 
          }
        });
      }
    }
	});

	$("#widgetsubpagediv").click(function() {
		$('div').removeClass("selected");
		// Hide resizer
		$(".resizeSE").hide();
		$(this).addClass("selected");
		subpages.displaySubpageProperties();
	});
	
	$("#button-subpage-parameters").click(function() {
		$('#tab-subpages-parameters').dialog('open');
	});

	
	$("#tab-subpages-background-toggle").click(function() {
  	if ($(this).is(':checked'))
  	{
			$('#tab-subpages-background').css("display","none");
			$('#tab-subpages-background-list').css("display","block");
			$('#tab-subpages-background-list').trigger('change');
  	} else
		{
			$('#tab-subpages-background-list').css("display","none");
			$('#tab-subpages-background').css("display","block");
			$('#tab-subpages-background').trigger('change');
		}
  });

	subpages.load();
	subpages.draw($('#tab-subpages-list').val());
	subpages.displaySubpageProperties();
  subpages.displayListWidgets();
  	
	loading.hide();
});
