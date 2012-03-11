var subpages = {
	config: null,
	currentSubPage: null,

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
					messageBox("Sub-pages saved successfully", "Info", "check");
					loadSubPages();
				}	else messageBox(tr("Error while saving design: ")+xmlResponse.textContent, "Error", "alert");
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
					messageBox(tr("Error while saving design: ")+textStatus, "Error", "alert");
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

			} else messageBox("Another sub-page with the same name already exists", "Error", "alert");
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
				return;
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
				$("#tab-subpages-background").val('');
				$('#tab-subpages-background-list').css("display","none");
				$('#tab-subpages-background').css("display","block");
			}


	
			subpage.children('controls').children('control').each(function() {
				subpages.addWidget(this);
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
		$('#tab-subpages-properties div:first-child').html('Sub-page properties');
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
    var desc=o.conf.getAttribute('desc');
    if (!desc) desc = type;

    var tr=$('<tr/>');
    tr.get(0).obj = o;

    var th=$('<th>' + type + '</th>');
    tr.append(th);
    tr.click(function() {
      this.obj.div.widgetMovable("select");
    });

    var td=$('<td><span>' + desc + '</span></td>');
    tr.append(td);
    var bpviewxml =$('<td><button>Xml</button></td>');
    //tr.append(bpviewxml);

    bpviewxml.click(function() {
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

    $("#tab-subpages-widgets-list tbody").append(tr);
  },
  // Refresh Widgets List	
	refreshWidgetsList: function() {
		$("#tab-subpages-widgets-list tbody").empty();
    var tr=$('<tr><th>subpage</th><td><span>'+$("#tab-subpages-list").val()+'</span></td></tr>');
    tr.click(function() {
  		$(".active", "#tab-subpages-widgets-list").removeClass("active");
      $(this).addClass("active")
      $('div').removeClass("selected");
  		// Hide resizer
  		$(".resizeSE").hide();
  		$("#widgetsubpagediv").addClass("selected");
  		subpages.displaySubpageProperties();
    });
    $("#tab-subpages-widgets-list tbody").append(tr);
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

		$('#tab-subpages-properties div:first-child').html(type + ' properties');

		$('#tab-subpages-subpage-properties').hide();

		$('#tab-subpages-widget-buttons').show();
		
		$("#tab-subpages-widget-properties tbody").empty();
		
		var properties = eval( "_widgets." + type + ".settings" );

	  // Setup standard fields x,y,width,height
	  var tr=$('<tr><th colspan="2">X</th><td><input id="tab-subpages-properties-x" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("x") + '"></td></tr>');
	   $("#tab-subpages-widget-properties tbody").append(tr);
	 
	  var tr=$('<tr><th colspan="2">Y</th><td><input id="tab-subpages-properties-y" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("y") + '"></td></tr>');
	   $("#tab-subpages-widget-properties tbody").append(tr);
	
		if (o.isResizable) {
			var tr=$('<tr><th colspan="2">Width</th><td><input id="tab-subpages-properties-width" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("width") + '"></td></tr>');
			$("#tab-subpages-widget-properties tbody").append(tr);
			$("#tab-subpages-properties-width").change(function() {
				o.setSetting("width", $(this).val());
			});

	  	var tr=$('<tr><th colspan="2">Height</th><td><input id="tab-subpages-properties-height" type="text" name="' + this.id + '" value="' + o.conf.getAttribute("height") + '"></td></tr>');
			$("#tab-subpages-widget-properties tbody").append(tr);
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
			if (this.type=="comment")
			{
		    var tr=$('<tr>');
		    tr.append($('<th colspan="3" class="comment">' + this.label + '</th>'));
			} else
			{
		    var tr=$('<tr>');
		    tr.append($('<th>' + this.label + '</th>'));

	    	var value=o.conf.getAttribute(this.id);
	    	if (value==null) value="";
	    	var isSubPageParameter=((value.substring(0,1)=="_")?true:false);
	    	var subPageParameterValue=value.substring(1,value.length);

		    // Add checkbox to use a sub-page parameter
		    if ((this.type=="text") || (this.type=="object") || (this.type=="picture"))
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
			    tr.append($('<th style="width: 15px;">').append(input));
			  } else tr.append($('<th style="width: 15px;">'));
		    
				// Add parameter				
		    var td=$('<td>');
	    
		    if ((this.type=="text") || (this.type=="object") || (this.type=="picture")) {
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
          if (!isSubPageParameter) input.val(o.conf.getAttribute(this.id));
	    		if (isSubPageParameter) input.css('display','none');
		    	td.append(input);
		    }
		
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
		
		    // Picture setting
		    if (this.type=="picture") 
		    {
					var input=($('<input type="text" name="' + this.id + '" value="' + ((!isSubPageParameter)?o.conf.getAttribute(this.id):"") + '">'));
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
		
		    tr.append(td);
			}
			    
	    $("#tab-subpages-widget-properties tbody").append(tr);
		});
		
		$("#tab-subpages-widget-properties input, #tab-subpages-widget-properties select").change( function() {
			// Update conf on selected object when a property change
			if (($(this).get(0).tagName=="SELECT") || ($(this).attr('type')=="text"))
			{
				if ($(this).attr('name').substring(0,1)=="_") {
					var name=$(this).attr('name').substring(1,$(this).attr('name').length);
					var value="_" + $(this).val();
				} else {
					var name=$(this).attr('name');
					var value=$(this).val();
				}
				if ($("div .selected").length>0)	$("div .selected").get(0).owner.setSetting(name, value);
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
	addParameterLine: function(id, label, type) {
		id=((typeof(id)!='undefined')? id : "");
		label=((typeof(label)!='undefined')? label : "");
		type=((typeof(type)!='undefined')? type : "");
		
		var tr=$("<tr>");

		var td=$("<td><input type='text' class='id' value='" + id + "'></td>");
		tr.append(td);
		var td=$("<td><input type='text' class='label' value='" + label + "'></td>");
		tr.append(td);
		var td=$("<td>");
		
		var select=$("<select class='type'>");
		select.append($("<option value='text'>Text</option>"));
		select.append($("<option value='object'>Object</option>"));
		select.append($("<option value='picture'>Picture</option>"));
		select.val(type);
		td.append(select);
		tr.append(td);

		var td=$("<td><img src='images/remove.png'></td>");
		$("img",td).button();
		$("img",td).click(function(e) { $(e.target).parent().parent().remove(); });
		
		tr.append(td);

		$("#tab-subpages-parameters-list tbody").append(tr);
	},
	
	// Triggered when closing the parameters dialog
	saveParameters: function() {
		var res=false;
		
		$('subpage[name=' + subpages.currentSubPage + '] parameters', subpages.config).empty();
		
		$("#tab-subpages-parameters-list tbody tr").each(function() {

			var id=$(".id",this).val();
			var label=$(".label",this).val();
			var type=$(".type",this).val();
			
			if ((id=="")||(label=="")) {
				messageBox("Please complate all fields", "Error", "alert");
				return false;
			}

			var parameter = subpages.config.createElement('parameter');
			parameter.setAttribute('id', id);
			parameter.setAttribute('label', label);
			parameter.setAttribute('type', type);
			
			$('subpage[name=' + subpages.currentSubPage + ']', subpages.config)[0].getElementsByTagName('parameters')[0].appendChild(parameter);
		
			res=true;
		});
		return res;
	},
	
	// Fill table when opening the parameters dialog
	fillParameters: function() {
		$("#tab-subpages-parameters-list tbody").empty();

		$('subpage[name=' + subpages.currentSubPage + '] parameters parameter', subpages.config).each(function() {
			subpages.addParameterLine(this.getAttribute('id'), this.getAttribute('label'), this.getAttribute('type'));
		});
	}
}

jQuery(function($) {
	
	$("#tab-subpages-properties").draggable({ 
  	containment: "parent" ,
  	scroll: false
  });

	$("#tab-subpages-list-widgets").draggable({ 
  	containment: "parent" ,
  	scroll: false
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
		buttons: {
			Ok: function() {
				if (subpages.saveParameters()) $( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		width: 450,
		height: 300,
		modal: true,
		autoOpen: false,
		open: function() {
			subpages.fillParameters();
		},
		close: function() {
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
