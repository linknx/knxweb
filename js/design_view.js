var _subpages;

var design_view = {
	config: null,
	currentDesign: null,
	currentVersion: null,
	currentZone: null,

	load: function(designName, version)	{
		var url = 'design/' + designName + '/' + version + '.xml';
	
		design_view.currentDesign=designName;
		design_view.currentVersion=version;
		
		req = jQuery.ajax({ url: url, dataType: 'xml', async:false, cache: false,
			success: function(responseXML, status) {
				design_view.config=responseXML;
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

//				UIController.objects.push(obj);
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

	 		$('control', this).each(function() {
				design_view.addWidget(this, e);
			});

			e.css('background-image', 'url(' + tab_config.imageDir + this.getAttribute('img') + ')');
	
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

	loadSubPages();

	design_view.load(design, version);
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
