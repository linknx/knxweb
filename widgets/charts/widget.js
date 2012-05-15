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
    title: 'Charts'
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
    if (!this.owner.editMode)
    {
        if (this.owner.curves[0].id == '' ) {
          alert("pas de courbes à afficher");
          return false;
        }
        $("body").css("cursor", "progress");
    
        this.owner.chart = creategraph(this.owner.curves, this.owner.title, this.owner.curves[0].type_curve, this.owner.legend);
        $( "#containerhighstock" ).show();
        
        $( "#containerhighstockdialog" ).dialog({ title: this.owner.title });
        $( "#containerhighstockdialog" ).dialog("open");
    
        $("body").css("cursor", "auto");
    }
  });
  
  this.refreshHTML();
}

CCharts.type='charts';
UIController.registerWidget(CCharts);
CCharts.prototype = new CWidget();

// Called by eibcommunicator when a feedback object value has changed
CCharts.prototype.updateObject = function(obj,value) {
  
};

// Refresh HTML from config
CCharts.prototype.refreshHTML = function() {
  $('div:first-child', this.div).css('background-image', 'url(' + tab_config.imageDir + this.conf.getAttribute("picture") + ')');

  this.title=this.conf.getAttribute("title"); // => titre graphique
  if (!this.title)
    this.title = "Curve log object with HighStock";
  this.div.attr("title",this.title);

  this.legend = this.conf.getAttribute("legend"); // => afficher la legend true/false
  if (!this.legend) this.legend = false;

  this.nbcurve = 1;
  this.curves = []; // courbes à tracer

  // récupération des attricbut de conf (= "control") pour la 1ere courbe
  var curve = {};
  curve.id = this.conf.getAttribute("id");

  curve.nbenreg=this.conf.getAttribute("nbenreg");
  if (!curve.nbenreg)
    curve.nbenreg=1000;

  curve.type_curve=this.conf.getAttribute("typeid"); // type de graph "temperature" / "swicth" / "blind" ...
  if (!curve.type_curve) curve.type_curve = 'temperature';
  curve.type=curve.type_curve;

  if ( curve.type == 'temperature' || curve.type == '') { // si température (default) alors c'est une courbe sinon c'est une ligne "hachée"
    curve.type = 'spline';
    curve.step = false;
  } else {
    curve.type = 'line';
    curve.step = true; // si type on/off fait un graph "carré"
  }
  
  var nbcurve = this.nbcurve;

  var nbenreg = curve.nbenreg; // par défaut même nbenreg pour toutes les "curve"
  var type_curve = curve.type_curve; // par défaut même type_curve pour toutes les "curve"
  
  if (curve.id != '') {
    this.curves.push(curve);
  }

  var i = 1;
  for( i = 1; i < 5; i++) {
    var curveData = {};
    curveData.id = this.conf.getAttribute("id" + i);

    curveData.nbenreg=this.conf.getAttribute("nbenreg" + i);
    if (!curveData.nbenreg)
      curveData.nbenreg=nbenreg;

    curveData.type_curve=this.conf.getAttribute("typeid" + i); // type de graph "temperature" / "swicth" / "blind" ...
    if ( curveData.type_curve == '') curveData.type_curve=type_curve;
    curveData.type=curveData.type_curve; 
    if ( curveData.type == 'temperature' || curveData.type == '') { // si température (default) alors c'est une courbe sinon c'est une ligne "hachée"
      curveData.type = 'spline';
    } else {
      curveData.type = 'line';
      curveData.step = true; // si type on/off fait un graph "carré"
    }

    if (curveData.id != '') {
      this.curves.push(curveData);
    }
  };

};

function creategraph(curves, title, type_graph, displaylegend) {

  // date de début de chargement du graph
  var start = + new Date();

  var options_chart = {
      chart: {
          renderTo: 'containerhighstock'
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
        //3type: 'datetime'
        ordinal: true 
      },
      title: {
        text: title
      },
      yAxis: [{
        title: {
            text: type_graph
        },
        showLastLabel: true,
        alternateGridColor: '#FDFFD5',
        minorGridLineWidth: 0,
        labels: { formatter: function() { 
          if ( type_graph == 'temperature' || type_graph == '') return this.value +'°C';
          if ( type_graph == 'swicth') {
            if (this.value == 1 ) return 'On';
            else if (this.value == 0 ) return 'Off';
          }
          if ( type_graph == 'dimmer') {
            if (this.value == 1 ) return 'up';
            else if (this.value == 0 ) return 'stop';
            else if (this.value == -1 ) return 'down';
          }
          return this.value;
        }},
        plotLines : [{
          value : 0,
          color : 'red',
          width : 1
        }]
      }],
      tooltip: {
        //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> {point.change}<br/>',
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
  var navigator = {
    top: 415
  };
  if (displaylegend == "true") {
    options_chart.legend = legend;
  } else options_chart.legend.enabled = false;

  var otheryAxis = false; // création d'un nouvel axe si 2 types différents de courbes exemple temperature et swicth ...

  var yAxis2 = {
    title: {
        text: 'Axis2'
    },
    top: 350,
    height: 50,
    offset: 0,
    tickInterval: 1, // intervale des points sur l'axe lui même
    max: 2,
    min: -1,
    startOnTick: false,

    endOnTick: false,  
    showLastLabel: true,
    labels: { formatter: function() { 
      //if ( type_graph == 'temperature' || type_graph == '') return this.value +'°C';
      //if ( type_graph == 'swicth') {
        if (this.value == 1 ) return 'On';
        else if (this.value == 0 ) return 'Off';
      /*}
      if ( type_graph == 'dimmer') {
        if (this.value == 1 ) return 'up';
        else if (this.value == 0 ) return 'stop';
        else if (this.value == -1 ) return 'down';
      }*/
      return this.value;
    } }
  };
  
  // chargement des données de chaques courbes
  for(var i=0;i<curves.length; i++) {
    var data2 = [];
    var series2 = {
      yAxis: 0, // premier axe yAxis
      data: []
    };
    series2.name = curves[i].id;
    series2.type = curves[i].type;
    if (series2.type == 'line')
      series2.step = curves[i].step;
    series2.data = [];

    series2.data = getdatajson(curves[i].id, curves[i].nbenreg);
    
    series2.yAxis = 0; // premier axe yAxis
    options_chart.series.push(series2);
  };

  // création du graph
  _chart = new Highcharts.StockChart( options_chart,
    function(c) {
      c.setTitle(null, {
      text: 'Construit en '+ (new Date() - start) +'ms'
    });}
  );

  return _chart;
}

function getdatajson(id, nbenreg) {
  var url = 'readfile.php?objectlog=' + id + '&nbenreg=' + nbenreg + '&output=json';

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

