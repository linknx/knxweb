_editMode = false;

var design_view = {
	config: null,
	currentDesign: null,
	currentVersion: null,
	currentZone: null,

	load: function(designName, version, zone, callback)	{
		var url = 'design/' + designName + '/' + version + '.xml';
	
		design_view.currentDesign=designName;
		design_view.currentVersion=version;
    design_view.currentZone=zone;
		
		req = jQuery.ajax({ url: url, dataType: 'xml', async: true, cache: false,
			success: function(responseXML, status) {
				design_view.config=responseXML;
				callback();
        if (zone) gotoZone(zone);
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
    var conf_zone = $("config",design_view.config)[0];
    
    _floating_zone = ((conf_zone.getAttribute('floating'))?true:false);
    _floating_zone_margin = conf_zone.getAttribute('floating');
		
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

			design_view.currentZone = this.getAttribute('id');
			e.append('<img id="bgImage_' + this.getAttribute('id') + '" src="' + ((this.getAttribute('img')!="")?getImageUrl(this.getAttribute('img')):'images/1pixel.gif') + '" style="width: ' + width + 'px; height: ' + height + 'px;" usemap="#shapes_' + this.getAttribute('id') + '"><map id="shapes_' + this.getAttribute('id') + '" name="shapes_' + this.getAttribute('id') + '"></map>');
			container.append(e);
	 		 /*
       $('control', this).each(function() {
				design_view.addWidget(this, e);
			});
      */
	 		$(this).children('control').each(function() {
				design_view.addWidget(this, e);
			})

      // charger également les "control" lié au design lui-même, soit des controls/widget lié au design et pas à une zone précise
      if (this.getAttribute('globalcontrol')!='false') {
        $('zones', design_view.config).children('control').each(function() {
          design_view.addWidget(this, e);
        });
      }

	
			$('#bgImage_' + this.getAttribute('id')).maphilight();
			design_view.currentZone = null;
		});

		if (enableSlider)
		{
			$("#screen .prev").css('left', '10px');
			$("#screen .prev").css('top', Math.round(height/2)-25 + 'px');
	
			$("#screen .next").css('left', (width-50) + 'px');
			$("#screen .next").css('top', Math.round(height/2)-25 + 'px');
			
			$("#screen .prev").css('display','block');
			$("#screen .next").css('display','block');


      if(isMobile()){
         container.bind('swipeleft',function(event){
            $("#screen .next").click();
         });
         container.bind('swiperight',function(event){
            $("#screen .prev").click();
         });
      }
		}
	},
	
	clear: function() {
		EIBCommunicator.removeAll();
		$("#widgetdiv .widget").each(function() {
			this.owner.deleteWidget();
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

    var selectedEffect = $("config",design_view.config)[0].getAttribute('effect');
    if (!selectedEffect) selectedEffect = "";
    if (selectedEffect=="random" ) selectedEffect = _tab_effects[Math.floor(Math.random() * (_tab_effects.length + 1 ) )];
    
    // most effect types need no options passed by default
    var options = {};
    // some effects have required parameters
    if ( selectedEffect === "scale" ) {
        options = { percent: 100 };
    } else if ( selectedEffect === "size" ) {
  		var width=$("config",design_view.config)[0].getAttribute('width');
  		var height=$("config",design_view.config)[0].getAttribute('height');
      options = { to: { width: width, height: height } };
    }
    
    // run the effect
    $("#" + id).show( selectedEffect, options, 1000 );
		//$("#" + id).show();
	}
  design_view.currentZone=id;
}

jQuery(function($) {
	var design = tab_config['defaultDesign'];
	var version = tab_config['defaultVersion'];
  var zone = null;
	
	var matched;
	if (matched = location.search.match(/design=([^&]+)/))
		design = matched[1];
	if (matched = location.search.match(/version=([^&]+)/))
		version = matched[1];
	if (matched = location.search.match(/zone=([^&]+)/))
		zone = matched[1];

	design_view.loadSubPages(function() {
		design_view.load(design, version, zone, function() {
			
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
			 
      EIBCommunicator.runUpdate();
/* 
			if (tab_config.useJavaIfAvailable=='true')
			{
				if (navigator.javaEnabled())
				{
					// Update all object
					EIBCommunicator.updateAll();
				} else EIBCommunicator.periodicUpdate();
			} else EIBCommunicator.periodicUpdate();
*/
			
			loading.hide();
		});
	});
});

/*
 * En test permet de ne pas faire de "pooling" quand la fenêtre/page n'est pas active
 */

$(window).focus(function() {
  if (EIBCommunicator.polling) {
    if (EIBCommunicator.stoppolling) {
      EIBCommunicator.stoppolling = false;
      var d = new Date();
      //console.log( "focus windows Restart le Polling à ", d.getHours(),"h", d.getMinutes(),"min.", d.getSeconds(),"sec."); // d.getTime()
      var diff = dateDiff(EIBCommunicator.date_stop_polling, d);
      //console.log( "Soit une pause de", diff.hour ,"h", diff.min,"min.", diff.sec,"sec."); // d.getTime()
      EIBCommunicator.periodicUpdate();
    }
  }
});
function dateDiff(date1, date2){
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures
  /*
  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;
  */
  return diff;
}
$(window).blur(function() {
  EIBCommunicator.stoppolling = true;
  EIBCommunicator.date_stop_polling = new Date();
  //console.log( "blur windows Stop le Polling à ", EIBCommunicator.date_stop_polling.getHours(),"h", EIBCommunicator.date_stop_polling.getMinutes(),"min.", EIBCommunicator.date_stop_polling.getSeconds(),"sec.");
});
