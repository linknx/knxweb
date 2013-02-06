/*
 *
 * Charts with Highcharts / HighStock : highsoft software product is not free for commercial use lock at http://shop.highsoft.com/
 *
 **/
// TODO gérer les graph valeur en % (ex. volet), conso élec téléinfo et conso eau / gaz en mode "bar"/piques 

var _chart;

jQuery(function($) {
  // création de la "Dialog" ensuite uniquement l'ouvrir/fermer au besoin
  $( "#containerhighstockdialog" ).dialog({
    modal: true,
    autoOpen: false,
    width: 920,
    title: tr('Charts')
  });

  Highcharts.setOptions({
    lang: {
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
      weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      decimalPoint: ",",
      thousandsSep: ".",
      rangeSelectorFrom: "Du",
      rangeSelectorTo: "au"
    },
    legend: {
      enabled: false
    },
    global: {
      useUTC: false
    },
    scrollbar: { // scrollbar "stylée" grise 
      barBackgroundColor: 'gray',
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: 'gray',
      buttonBorderWidth: 0,
      buttonBorderRadius: 7,
      trackBackgroundColor: 'none',
      trackBorderWidth: 1,
      trackBorderRadius: 8,
      trackBorderColor: '#CCC'      
    }
  });

});

function CCharts(conf) {
  this.isResizable=false;
  this.graph = $(".affgraph", this.div).get(0);
  this.start = 0;
  this.init(conf);

  $(this.div).click(function() {
    if (!_editMode)
    {
        if (this.owner.curves[0].id == '' ) {
          messageBox(tr("No Curve to Display"), tr('Error'), 'alert');
          return false;
        }
        $("*").css("cursor", "progress");
    
        this.owner.chart = creategraph(this.owner);
        $( "#containerhighstock" ).show();
        
        $( "#containerhighstockdialog" ).dialog({ title: this.owner.title });
        $( "#containerhighstockdialog" ).dialog("open");
    
        $("*").css("cursor", "auto");
    }
  });
  
  this.refreshHTML();
}

CCharts.type='charts';
UIController.registerWidget(CCharts);
CCharts.prototype = new CWidget();

// Called by eibcommunicator when a feedback object value has changed
CCharts.prototype.updateObject = function(obj,value) {};
  
CCharts.prototype.deleteWidget = function() {};

// Refresh HTML from config
CCharts.prototype.refreshHTML = function() {
  $('div:first-child', this.div).css('background-image', 'url(' + tab_config.imageDir + this.conf.getAttribute("picture") + ')');

  this.title=this.conf.getAttribute("title"); // => titre graphique
  if (!this.title)
    this.title = "Curve log object with HighStock";
  this.div.attr("title",this.title);

  this.legend = this.conf.getAttribute("legend") == "true"; // => afficher la legend true/false
  if (!this.legend) this.legend = false;

  this.navigator = this.conf.getAttribute("navigator") == "true"; // => afficher le graph de navigator true/false

  this.ordinal = this.conf.getAttribute("ordinal") == "true"; // => mode de l'axe du temp

  // => si log de type "mysql"
  this.duration = this.conf.getAttribute("duration");
  this.periodicity = this.conf.getAttribute("periodicity");
  // => si log de type "file"
  this.nbenreg = this.conf.getAttribute("nbenreg");


  this.curves = []; // courbes à tracer

  // récupération des attributs de conf (= "control") pour la 1ere courbe
  var curve = {};
  curve.id = this.conf.getAttribute("id");

  curve.libel = this.conf.getAttribute("libel");
  if (!curve.libel) curve.libel = curve.id;
  if (_editMode) {
    var libel = "";
    $('object[id=' + curve.id + ']', _objects).each(function() {
      if (curve.id == this.getAttribute('id')) libel = ((this.textContent!="")?this.textContent:this.getAttribute('id'));
    });
    this.conf.setAttribute('libel', libel );
    curve.libel = libel;
  }

/*
  curve.nbenreg=this.conf.getAttribute("nbenreg");
  if (!curve.nbenreg)
    curve.nbenreg=1000;

  curve.type_curve=this.conf.getAttribute("typeid"); // type de graph "temperature" / "swicth" / "blind" ...
*/
  curve.type_curve=this.conf.getAttribute("typecurve"); // type de graph "temperature" / "swicth" / "blind" ...

  if (!curve.type_curve) curve.type_curve = 'temperature';
  curve.type=curve.type_curve;
/*
  if ( curve.type == 'temperature' || curve.type == '') { // si température (default) alors c'est une courbe sinon c'est une ligne "hachée"
    curve.type = 'spline';
    curve.step = false;
  } else {
    curve.type = 'line';
    curve.step = true; // si type on/off fait un graph "carré"
  }
  
  var nbenreg = curve.nbenreg; // par défaut même nbenreg pour toutes les "curve"
*/
  curve.step = false;
  if ( curve.type_curve == 'switch' || curve.type_curve == 'dimmer' || curve.type_curve == 'pourcent') { // fait un graph "carré"
    curve.type = 'line';
    curve.step = true;
  }
 if ( curve.type_curve == 'temperature') curve.type = 'spline';


  var type_curve = curve.type_curve; // par défaut même type_curve pour toutes les "curve"
  
  if (curve.id != '') {
    this.curves.push(curve);
  }

  var i = 1;
  for( i = 1; i < 5; i++) {
    var curveData = {};
    curveData.id = this.conf.getAttribute("id" + i);

    curveData.libel = this.conf.getAttribute("libel" + i);
    if (!curveData.libel) curveData.libel = curveData.id;
    if (_editMode) {
      var libel = "";
      $('object[id=' + curveData.id + ']', _objects).each(function() {
        if (curveData.id == this.getAttribute('id')) libel = ((this.textContent!="")?this.textContent:this.getAttribute('id'));
      });
      this.conf.setAttribute('libel' + i, libel );
      curveData.libel = libel;
    }
/*
    curveData.nbenreg=this.conf.getAttribute("nbenreg" + i);
    if (!curveData.nbenreg)
      curveData.nbenreg=nbenreg;
*/
    //curveData.type_curve=this.conf.getAttribute("typeid" + i); // type de graph "temperature" / "swicth" / "blind" ...
    curveData.type_curve=this.conf.getAttribute("typecurve" + i); // type de graph "temperature" / "swicth" / "blind" ...

    curveData.type=curveData.type_curve;

/*
    if ( curveData.type_curve == '') curveData.type_curve=type_curve;
    curveData.type=curveData.type_curve; 
    if ( curveData.type == 'temperature' || curveData.type == '') { // si température (default) alors c'est une courbe sinon c'est une ligne "hachée"
      curveData.type = 'spline';
    } else {
      curveData.type = 'line';
      curveData.step = true; // si type on/off fait un graph "carré"
    }
*/
    if ( curveData.type_curve == 'switch' || curveData.type_curve == 'dimmer' || curveData.type_curve == 'pourcent') { // fait un graph "carré"
      curveData.type = 'line';
      curveData.step = true;
    }
    if ( curveData.type_curve == 'temperature') curveData.type = 'spline';

    if (curveData.id != '') {
      this.curves.push(curveData);
    }
  };

};

function creategraph(chart) {

  var graph;
  // date de début de chargement du graph
  var start = + new Date();

  var options_chart = {
      chart: {
          renderTo: 'containerhighstock',
          zoomType: 'x'
      },
      rangeSelector: {
        buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        },{
          type: 'hour',
          count: 6,
          text: '6h'
        },{
          type: 'hour',
          count: 12,
          text: '12h'
        },{
          type: 'day',
          count: 1,
          text: '1d'
        },{
          type: 'day',
          count: 2,
          text: '2d'
        },{
          type: 'all',
          text: 'All'
        }],
        selected: 3,
      },
      scrollbar: { // scrollbar "stylée" grise 
        barBackgroundColor: 'gray',
        barBorderRadius: 7,
        barBorderWidth: 0,
        buttonBackgroundColor: 'gray',
        buttonBorderWidth: 0,
        buttonBorderRadius: 7,
        trackBackgroundColor: 'none',
        trackBorderWidth: 1,
        trackBorderRadius: 8,
        trackBorderColor: '#CCC'      
      },
      subtitle: {
        text: 'Construit en...'
      },
      xAxis: {
        ordinal: chart.ordinal 
      },
      title: {
        text: chart.title
      },
      yAxis: [],
      tooltip: {
        yDecimals: 2
      },
      series: [],
      legend: {},
      navigator: {}
  };

  var legend = {
    enabled: true,
    align: 'right',
    borderColor: 'black',
    borderWidth: 2,
    layout: 'vertical',
    verticalAlign: 'middle',
    shadow: true
  };
  if (chart.legend) {
    options_chart.legend = legend;
  } else options_chart.legend.enabled = false;

  var yAxis_switch = {
    title: {
      text: 'Swicth'
    },
    gridLineWidth: 0,
    offset: 0,
    //tickInterval: 1, // intervale des points sur l'axe lui même
    min: 0,
    startOnTick: false,
    endOnTick: false,  
    showLastLabel: true,
    alternateGridColor: '#FDFFD5',
    labels: { formatter: function() { 
      if (this.value == 1 ) return 'On';
      else if (this.value == 0 ) return 'Off';
    } },
    plotLines : [{ // ligne rouge pour la valeur "y=1"
      value : 1,
      color : 'red',
      width : 1
    },{ // ligne rouge pour la valeur "y=0"
      value : 0,
      color : 'red',
      width : 1
    },/*{
			value : 0.6738,
			color : 'green',
			dashStyle : 'shortdash',
			width : 2,
			label : {
				text : 'Last quarter minimum'
			}
		}*/]
  };

  var yAxis_dimmer = {
    title: {
        text: 'Dimmer'
    },
    gridLineWidth: 0,
    offset: 0,
    //tickInterval: 1, // intervale des points sur l'axe lui même
    //max: 1.1,
    min: -1,
    startOnTick: false,
    endOnTick: false,  
    showLastLabel: true,
    alternateGridColor: '#FDFFD5',
    labels: { formatter: function() { 
      if (this.value == 1 ) return 'up';
      else if (this.value == 0 ) return 'stop';
      else if (this.value == -1 ) return 'down';
    } },
    plotLines : [{ // ligne rouge pour la valeur "y=1"
      value : 1,
      color : 'red',
      width : 1
    },{ // ligne rouge pour la valeur "y=-1"
      value : -1,
      color : 'red',
      width : 1
    }]
  };

  var yAxis_temperature = {
    title: {
      text: 'Temperature'
    },
    gridLineWidth: 0,                                                         
    //tickInterval: 1, // intervale des points sur l'axe lui même
    offset: 0,
    startOnTick: false,
    endOnTick: false,  
    showLastLabel: true,
    alternateGridColor: '#FDFFD5',
    labels: { formatter: function() {
      return this.value +'°C';
    } }
  };

  var yAxis_poucent = {
    title: {
      text: 'Pourcentage'
    },
    gridLineWidth: 0,
    offset: 0,
    startOnTick: false,
    endOnTick: false,  
    showLastLabel: true,
    alternateGridColor: '#FDFFD5',
    labels: { formatter: function() {
      return this.value +'%';
    } }
  };


  var type_curve = chart.curves[0].type_curve; // type de la première courbe
  var yAxis_tab = [];
  yAxis_tab[0] = type_curve;

  var yAxis = {
    title: {
      text: type_curve // TODO à améliorer
    },
    gridLineWidth: 0,
    showLastLabel: true,
    alternateGridColor: '#FDFFD5',
    minorGridLineWidth: 0,
    labels: { formatter: function() { 
      if ( type_curve == 'temperature') return this.value +'°C';
      if ( type_curve == 'switch') { // switch
        if (this.value == 1 ) return 'On';
        else if (this.value == 0 ) return 'Off';
      }
      if ( type_curve == 'dimmer') { // dimmer
        if (this.value == 1 ) return 'up';
        else if (this.value == 0 ) return 'stop';
        else if (this.value == -1 ) return 'down';
      }
      if ( type_curve == 'pourcent') return this.value +'%';
      return this.value;
    }},
    plotLines : [{ // ligne rouge pour la valeur "y=0"
      value : 0,
      color : 'red',
      width : 1
    }]
  };
  
  if ( type_curve == 'temperature') options_chart.yAxis.push(yAxis_temperature);
  else if ( type_curve == 'switch') options_chart.yAxis.push(yAxis_switch); 
  else if ( type_curve == 'dimmer') options_chart.yAxis.push(yAxis_dimmer); 
  else if ( type_curve == 'pourcent') options_chart.yAxis.push(yAxis_poucent);
  else options_chart.yAxis.push(yAxis);

/*
  yAxis_temperature.opposite = true;
  options_chart.yAxis.push(yAxis_temperature);

  yAxis_poucent.gridLineWidth = 0;
  yAxis_poucent.opposite = true;
  options_chart.yAxis.push(yAxis_poucent);
*/
  
  // chargement des données de chaques courbes
  for(var i=0;i<chart.curves.length; i++) {
    var data2 = [];
    var series2 = {
      yAxis: 0, // premier axe yAxis par défaut
      data: []
    };
    series2.name = chart.curves[i].libel; //chart.curves[i].id;
    series2.type = chart.curves[i].type;

    series2.type_curve = chart.curves[i].type_curve; // utiliseable dans les tooltip ensuite si besoin

    if (series2.type == 'line')
      series2.step = chart.curves[i].step;

    var attach = false;
    for(var j=0;j<yAxis_tab.length; j++) {
      if (yAxis_tab[j] == series2.type_curve) {
        series2.yAxis = j;
        attach = true;
      } 
    }
    if (!attach) { // ajout d'un nouvel axe pour la courbe "en cours"
      var opposite = true;
      j = yAxis_tab.length;
      if ((j -1)%2) opposite = false;
      if ( series2.type_curve == 'temperature') {
        options_chart.yAxis.push(yAxis_temperature);
        if (opposite) yAxis_temperature.opposite = true;
        yAxis_tab[j] = series2.type_curve;
        series2.yAxis = j;
      }
      else if ( series2.type_curve == 'switch') {
        options_chart.yAxis.push(yAxis_switch);
        if (opposite) yAxis_switch.opposite = true;
        yAxis_tab[j] = series2.type_curve;
        series2.yAxis = j;
      } 
      else if ( series2.type_curve == 'dimmer') {
        options_chart.yAxis.push(yAxis_dimmer);
        if (opposite) yAxis_dimmer.opposite = true;
        yAxis_tab[j] = series2.type_curve;
        series2.yAxis = j;
      } 
      else if ( series2.type_curve == 'pourcent') {
        options_chart.yAxis.push(yAxis_poucent);
        if (opposite) yAxis_poucent.opposite = true;
        yAxis_tab[j] = series2.type_curve;
        series2.yAxis = j;
      }
    }

    series2.data = [];

    //series2.data = getdatajson(curves[i].id, curves[i].nbenreg);
    series2.data = getdatajson_teleinfo(chart.curves[i].id, chart.duration, chart.periodicity, chart.nbenreg);
    
    options_chart.series.push(series2);
  };

  // création du graph
  if (chart.navigator) {
    graph = new Highcharts.StockChart( options_chart,
    function(c) {
      c.setTitle(null, {
      text: 'Construit en '+ (new Date() - start) +'ms'
    });}
  );
  } else {
    graph = new Highcharts.Chart( options_chart,
      function(c) {
        c.setTitle(null, {
        text: 'Construit en '+ (new Date() - start) +'ms'
      });}
    );
  }

  return graph;
}

function getdatajson_teleinfo(id, duration, periodicity, nbenreg) {

  var url = 'readfile.php?output=json&objectlog=' + id + '&duration=' + duration + '&periodicity=' + periodicity + '&nbenreg=' + nbenreg;  
  // TODO modifier  readfile.php pour gérer duration et periodicity sur le mode : datejour - ( duration * periodicity ) comme date de début

  var data_json = [];

  jQuery.ajax({ type: "GET", url: url, dataType: "json", async : false, 
			success: function(data) {
        var prev_val_0 = 0;
        $.each(data, function(key, val) {
          if (val[0] != prev_val_0) {
            data_json.push([ val[0], parseFloat(val[1])]);
          }
          prev_val_0 = val[0];
        });
      }
  });

  return data_json;
}

