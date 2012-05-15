var _subpages;

var design_view = {
	config: null,
	currentDesign: null,
	currentVersion: null,
	currentZone: null,

	load: function(designName, version, callback)	{
		var url = 'design/' + designName + '/' + version + '.xml';
	
		design_view.currentDesign=designName;
		design_view.currentVersion=version;
		
		req = jQuery.ajax({ url: url, dataType: 'xml', async: true, cache: false,
			success: function(responseXML, status) {
				design_view.config=responseXML;
				callback();
			}
		});
	},
	
	loadSubPages: function(callback) {
	    var url = 'design/subpages.xml';

	    var req = jQuery.ajax({ url: url, dataType: 'xml', async: true, cache: false,
		success: function(responseXML, status) {
		    _subpages=responseXML
		    callback();
		}
	    });	
	},

	// Add existing widget
	addWidget: function(conf, div) {
		var obj = null;
		var type = conf.getAttribute('type');
		var cls = UIController.widgetList[type];
		if (cls)
		{
			obj = new cls(conf);
			if (obj!=null) {

//				obj.edit(design.onWidgetSelect, design.onWidgetMove, design.onWidgetResize);
				div.append(obj.div);
        // If the widget had Children 
        //$('control', conf).each(function() {
        $(conf).children('control').each(function() {
  				design_view.addWidgetChildren(this, obj.content);
  			});

//				UIController.objects.push(obj);
				EIBCommunicator.add(obj);
				return true;
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
				EIBCommunicator.add(obj);
				return true;
			} 
			return false;
		}	else return false;
	},

	draw: function(zone) {
		var enableSlider=(($("config",design_view.config)[0].getAttribute('enableSlider')=='true')?true:false);
		
		design_view.clear();

		var width=$("config",design_view.config)[0].getAttribute('width');
		var height=$("config",design_view.config)[0].getAttribute('height');
		
		$("#zoneContainer").width(width);
		$("#zoneContainer").height(height);
		
		if (enableSlider) {
			var container=$("<ul>");
			$("#zoneContainer").append(container);
		} else container=$("#zoneContainer");
		
		var zones=$('zone', design_view.config);
		
		$("#zoneContainer ul").width(zones.length*width);
		
		zones.each(function() {
			if (enableSlider) 
				var e=$("<li>");
			else
				var e=$("<div>");
			e.attr('id', this.getAttribute('id'));
			e.width(width);
			e.height(height);

	 		 /*
       $('control', this).each(function() {
				design_view.addWidget(this, e);
			});
      */
	 		$(this).children('control').each(function() {
				design_view.addWidget(this, e);
			})

      // charger également les "control" lié au design lui-même, soit des controls/widget lié au design et pas à une zone précise
      // TODO a gérer avec paramètre de la zone si celle-ci ne veux pas afficher les control/widgets "globaux" on aura globalcontrol="false" par défaut on affiche sinon
      if (this.getAttribute('globalcontrol')!='false') {
        $('zones', design_view.config).children('control').each(function() {
          design_view.addWidget(this, e);
        });
      }

			e.css('background-image', 'url(' + getImageUrl(this.getAttribute('img')) + ')');
	
			container.append(e);
		});

		if (enableSlider)
		{
			$("#screen .prev").css('left', '10px');
			$("#screen .prev").css('top', Math.round(height/2)-25 + 'px');
	
			$("#screen .next").css('left', (width-50) + 'px');
			$("#screen .next").css('top', Math.round(height/2)-25 + 'px');
			
			$("#screen .prev").css('display','block');
			$("#screen .next").css('display','block');
		}
	},
	
	clear: function() {
		EIBCommunicator.removeAll();
		$("#widgetdiv .widget").each(function() {
			$(this).remove();
		});
		design_view.currentZone=null;
	}
};

function gotoZone(id)
{
	var enableSlider=(($("config",design_view.config)[0].getAttribute('enableSlider')=='true')?true:false);
	
	if (enableSlider) {
		var i=0;
		$("#zoneContainer ul li").each(function() {
			if ($(this).attr('id')==id)
			{
				$('#zoneContainer').trigger( 'goto', [ i ]);
			}
			i++;
		});
	} else
	{
		$("#zoneContainer > div").hide();
		$("#" + id).show();
	}
}

jQuery(function($) {
	var design = tab_config['defaultDesign'];
	var version = tab_config['defaultVersion'];
	
	var matched;
	if (matched = location.search.match(/design=([^&]+)/))
		design = matched[1];
	if (matched = location.search.match(/version=([^&]+)/))
		version = matched[1];

	design_view.loadSubPages(function() {
		design_view.load(design, version, function() {
			
			design_view.draw();
			
			if ($("config",design_view.config)[0].getAttribute('enableSlider')=='true') {
				$('#screen').serialScroll({
					target:'#zoneContainer',
					items:'li',
					prev:'img.prev',
					next:'img.next',
					axis:'x',
					duration:1000,
					force:true
				});
			}
			 
			if (tab_config.useJavaIfAvailable=='true')
			{
				if (navigator.javaEnabled())
				{
					// Update all object
					EIBCommunicator.updateAll();
				} else EIBCommunicator.periodicUpdate();
			} else EIBCommunicator.periodicUpdate();
			
			loading.hide();
		});
	});
});
