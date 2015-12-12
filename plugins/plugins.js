//var _superuser=(tab_config['superuser']=="true")?true:false;

/*
div : id="leftMenu"

<h3 tab_id="plugins" tab_label="{l lang='en'}Plugins{/l}"><a href="#"><img src="images/setup.png"> {l lang='en'}Plugins{/l}</a></h3>
<div id="plugins_list">
  <!--
  <div class="subItem" tab_id="general" tab_label="{l lang='en'}General{/l}" tab_url="setup_general.php"><img src="images/home.png" /> {l lang='en'}General{/l}</div>
  -->
</div>

*/

_editMode = true;

var plugins = {
  config: null,
  currentplugin: "",
	pluginList: new Array(),
  
	registerPlugin: function(plugin) {
		this.pluginList[plugin.type]=plugin;
	},
  // Load plugins from server
  load: function()
  {
    //var url = 'design/plugins.xml';
    var url = 'plugins/plugins.xml';
  
    req = jQuery.ajax({ url: url, dataType: 'xml', async: false, cache: false,
      success: function(responseXML, status) {
        plugins.config=responseXML;
        plugins.refreshpluginsList();
      }
    });
  },
  // Save plugins from server
  save: function() {
    var string = serializeXmlToString(plugins.config);
    var result = queryKnxweb('saveplugins', 'xml', string, false);
    if (result != false ) {
      if (result.getAttribute('status') == 'success')
      {
        messageBox(tr("Plugins saved successfully"), tr("Info"), "check");
        plugins.load();
      }  else messageBox(tr("Error while saving plugin")+result.textContent, tr("Error"), "alert");
    } else messageBox(tr("Error while saving plugin"), tr("Error"), "alert");
  },
  // Create a new plugin
  new: function(name)  {
    var id=prompt(tr('Enter id for new plugin'),'');
    if (id!=null)  {
      if (!plugins.pluginExists(id)) {
        var plugin = plugins.config.createElement('plugin');
        plugin.setAttribute('id', id);
        plugin.setAttribute('name', name);
        plugin.setAttribute('desc', "");
        $('plugins', plugins.config).prepend(plugin);
        var param = plugins.config.createElement('params');
        plugin.appendChild(param);
        // params of the "name" plugin :
        var plugin_name = eval( "_plugins_list." + name); // config du plugin soit le manifest.xml au format JSON
        
        $.each(plugin_name.settings, function() {
          var def = "";
          if (this.default) def = this.default;
          param.setAttribute(this.id, def);
        });             
        /*
        var controls = plugins.config.createElement('controls');
        plugin.appendChild(controls);
        */
        plugins.currentplugin = id;
        plugins.refreshpluginsList();
      } else messageBox(tr("Another plugin with the same id already exists"), tr("Error"), "alert");
    }
  },
  // Check if a plugin exists
	pluginExists: function(id) {
		var found=false;
		$('plugin', plugins.config).each(function() {
			if (this.getAttribute('id')==id) {
				found=true;
				return found;
			}
		});
		return found;
	},
  // Clone a plugin
  clone: function(clone)  { 
    var id=prompt(tr('Enter id for new plugin cloned'),'');
    if (id!=null)  {
      $('plugin', plugins.config).each(function() {
        if (this.getAttribute('id') == clone) {
          var plugin = plugins.config.createElement('plugin');
          /*
          this.attributes(function(attr){
            plugin.setAttribute(attr.name, attr.value);
          });
          */
          plugin.setAttribute('id', id);
          plugin.setAttribute('name', this.getAttribute('name'));
          plugin.setAttribute('desc', this.getAttribute('desc'));
          $('plugins', plugins.config).prepend(plugin);
          var parameters = $('params', this).clone();// $('parameters', this).clone();
          plugin.appendChild(parameters[0]);
          /*var controlsold = $('controls', this).clone(); // TODO ai-je besoin de balise controls dans la cofig des plugins ? ... 
          plugin.appendChild(controlsold[0]);*/
          plugins.currentplugin = id;
          plugins.refreshpluginsList();
          return;
        }
      });
    }
  },
  // Delete a plugin
  delete: function(id)  {
    if (id && confirm(tr('Really delete the plugin') + ' ' + id + '?')) {
      $('plugin[id=' + id + ']', plugins.config).each(function() { this.parentNode.removeChild( this ); });
      plugins.refreshpluginsList();
    }
  },
  // Refresh plugins list select
  refreshpluginsList: function() {
    $('#tab-plugins-list').empty();
    $('#plugins-container').empty();    
    $('plugin', plugins.config).each(function() {
      var option = $("<option value='" + this.getAttribute('id') + "'>" + this.getAttribute('id') + " (" + this.getAttribute('name') + ")</option>");
      $('#tab-plugins-list').append(option);
      
      var plugin = eval( "_plugins_list." + this.getAttribute("name")); // config du plugin soit le manifest.xml au format JSON
      
      var plugindiv = $('#templateplugin').clone();
      plugindiv.attr("id", this.getAttribute("id"));
      $('.idplugin', plugindiv).html(this.getAttribute('id'));
      $('.pluginname', plugindiv).html(this.getAttribute('name') + " - " + plugin.label); // + " - " + this.getAttribute('desc')
      $('.pluginname', plugindiv).attr("title", plugin.description);
      
      $('#plugins-container').append(plugindiv);
      $('.idplugin', plugindiv).click(function() {
        //$('.config_plugin').hide();
        $('.config_plugin', this.parentNode).toggle();
      });
      $('.edit', plugindiv).click(function() {
        $('.config_plugin', this.parentNode.parentNode).toggle();
      });
      $('.delete', plugindiv).click(function() {
        plugins.delete(this.parentNode.parentNode.config.getAttribute('id'));
      });
      $('.clone', plugindiv).click(function() {
        plugins.clone(this.parentNode.parentNode.config.getAttribute('id'));
      });
      var params = $('params', this)[0];
      var html = "<table name= '"+this.getAttribute("name")+"' id= '"+this.getAttribute("id")+"' >";
      //html+="=> Description = " + this.getAttribute('desc') + "<br />";
      html+="<tr><th>" + tr("Description") + "</th><td><input type='text' value='" + this.getAttribute('desc') + "' size='100' name='desc'></td></tr>";
      $.each(plugin.settings, function() {
        //html+="=> " + this.id + " = " + params.getAttribute(this.id) + "<br />";
        var inputdata =""
        if (!this.type) this.type = 'text';
        if (this.type == "number" || this.type == "range") inputdata+= "min='"+this.min+"' max='"+this.max+"'";
        html+="<tr><th>" + this.id + "</th><td><input type='" + this.type + "' " + inputdata+ " value='" + params.getAttribute(this.id) + "' size='100' name='" + this.id + "'></td></tr>";
      });
      html+= "</table>";
      //$('.params', plugindiv).text($(this).html());
      $('.params', plugindiv).html(html);
      plugindiv.show();
      plugindiv[0].config = this;
      //plugins.arrayPlugins[this.getAttribute('name')]=plugindiv;
      if (this.getAttribute("id") == plugins.currentplugin) {
        $('.config_plugin', plugindiv).show();
        plugins.currentplugin = "";
      } 
        
      $('button', plugindiv).button();
      $('button', plugindiv).click(function() {
        plugins.updatePlugin(this.parentNode.parentNode.parentNode.id);
      });
    });
  },
  // Update Plugin conf
  updatePlugin: function(id) {
    //$('plugin[id=' + id + ']', plugins.config).each(function() { this.parentNode.removeChild( this ); });
    var parameter = $('plugin[id=' + id + '] params', plugins.config)[0];  
    console.log("updatePlugin : 1 ",parameter.parentNode);
    
    var res=false;
    $('input', 'table[id="' + id + '"]').each(function() {
      if (this.name == "desc") {
        parameter.parentNode.setAttribute(this.name, this.value);
      } else  parameter.setAttribute(this.name, this.value);
      res=true;
    });
    console.log("updatePlugin : 2 ",parameter);
    
    if (res) {
      plugins.save();
    }
    return res;
  }
};

jQuery(function($) {

  plugins.load();
  
  $("#new-plugin").click(function(){
    // new
    if (this.value != "") plugins.new(this.value);
  });
      
  $("body").css("cursor", "auto");
  loading.hide();
});