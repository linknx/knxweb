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
      months: _months,
      shortMonths: _shortmonths,
      weekdays: _weekdays,
      decimalPoint: ",",
      thousandsSep: ".",
      rangeSelectorFrom: tr("From"),
      rangeSelectorTo: tr("to")
    },
    legend: {
      enabled: false
    },
    global: {
      useUTC: false
    },
  });
});

var afterSetExtremesDummy = function(e) { };
var afterSetExtremes = function(e, widget)
{
  var c = widget.chart;
  if (c.series == undefined || c.series.last_extremes !== undefined && e.min == c.series.last_extremes.min && e.max == c.series.last_extremes.max)
      return;
  c.showLoading('Loading detail data...');
  afterSetExtremesDummy = function(e) { };

  var deferred_requests = [];
  for(var i=0; i<widget.curves.length; i++) {
    var uri = 'widgets/charts/retrieve.php?output=json&objectlog=' + widget.curves[i].id
    + '&start=' + Math.round(e.min) + '&end=' + Math.round(e.max) + '&valcount=' + c.chartWidth;
//     console.log("i:", i, "scheduling detail retrieve", uri);
    widget.curves[i].ready = false;
    deferred_requests.push(
      $.getJSON(uri+'&callback=?',
        (function(i) {
          return function (data) {
            var idx = i;
            var startx = -1, endx = -1;
            var first_part = [], last_part = [], new_data;
            for (var x=0; x < c.series[idx].options.data.length; x++) {
              if ( endx > 0 ) {
                last_part.push(c.series[idx].options.data[x]);
              } else if ( startx == -1 && c.series[idx].options.data[x][0] >= Math.round(e.min) ) {
                startx = x;
                first_part = c.series[idx].options.data.slice(0,startx);
              } else if ( endx == -1 && c.series[idx].options.data[x][0] >= Math.round(e.max) ) {
                endx = x;
              }
            }
            new_data = first_part.concat(data, last_part);
            c.series[idx].setData(new_data);
            widget.curves[i].ready = true;
          };
        }(i))
      )
    );
  }
  c.series.last_extremes = e;
  $.when.apply($, deferred_requests).done( function() {
    finishedDetailsRetrieve(widget);
  });
}

function finishedDetailsRetrieve(widget)
{
  var c = widget.chart;
  c.hideLoading();
  afterSetExtremesDummy = (function(widget) {
    return function(e) {
      afterSetExtremes(e, widget);
    };
  }(widget))
}

function finishedOverviewRetrieve(widget)
{
  var c = widget.chart;
  c.hideLoading();
//   c.xAxis[0].setExtremes(widget.initial_start, Date.now());
//   c.series[1].setData([].concat(c.series[0].options.data))
  afterSetExtremesDummy = (function(widget) {
    return function(e) {
      afterSetExtremes(e, widget);
    };
  }(widget))
}

function addPoint(widget, i, value)
{
  var idx = i;
  widget.chart.series[idx].addPoint([Date.now(), value], true, true);
}

function getTSperiod(periodicity, duration)
{
  var period = 3600000; // ms in hour
  switch (periodicity) {
    case 'day':
      period *= 24;
      break;
    case 'week':
      period *= (24*7);
      break;
    case 'month':
      period *= (24*30);
      break;
    case 'year':
      period *= (24*365);
      break;
  }
  period *= duration;
  return period;
}

function setUnits(unitsDict, widget) {
    for(var i=0; i<widget.curves.length; i++) {
      var idx = i;
      widget.chart.series[idx].unit = unitsDict[widget.curves[i].id];
    }
}

function creategraph(widget) {

  var graph;

  widget.construct_time = Date.now();

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
          type: 'day',
          count: 1,
          text: 'd'
        },{
          type: 'day',
          count: 7,
          text: 'w'
        },{
          type: 'month',
          count: 1,
          text: 'M'
        },{
          type: 'year',
          count: 1,
          text: 'Y'
        }],
        selected: 3
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
      xAxis: {
        ordinal: widget.ordinal,
           events : {
             afterSetExtremes : function (e) {
               afterSetExtremesDummy(e);
             }
           },
      },
      yAxis: [],
      tooltip: {
        shared: false,
        useHTML: true,
        headerFormat: '{point.key}<table>',
        pointFormat: '<tr><td style="color: {series.color}; text-shadow: 1px 1px 1px #202020;">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y} {series.unit}</b></td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
      },
      series: [],
      legend: {},
      navigator: {}
  };

  var conf_period = getTSperiod(widget.periodicity, widget.duration);
  widget.initial_start = widget.construct_time - conf_period;
  var last_rsp = 0;
  for(var r=0; r<options_chart["rangeSelector"].buttons.length; r++) {
    var b = options_chart["rangeSelector"].buttons[r];
    var rsp = getTSperiod(b["type"],b["count"]);
    if ( rsp == conf_period ) {
      options_chart["rangeSelector"].selected = r;
      break;
    }
    else if ( rsp > conf_period )
    {
      var new_b = {
          type: widget.periodicity,
          count: widget.duration,
          text: widget.duration+widget.periodicity.charAt(0)
        }
      options_chart["rangeSelector"].buttons.splice(r, 0, new_b);
      options_chart["rangeSelector"].selected = r;
      break;
    }
    last_rsp = rsp;
  }

  var legend = {
    enabled: true,
    align: 'center',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    layout: 'vertical',
    verticalAlign: 'top',
    shadow: true,
    floating: true,
    draggable: true,
    title: {
             text: widget.title
           }
  };
  if (widget.legend) {
    options_chart.legend = legend;
  } else options_chart.legend.enabled = false;

  var yAxis_switch = {
    title: {
      text: 'Switch'
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
    } },
    plotLines : [{ // lignes min et max
      value : 200, // TODO ...
      color : 'red',
      dashStyle : 'shortdash', //'dash'
      width : 2,
      label : {
        align : 'right',
        text : 'min ' //+ data.seuils.min + '°C'
      }
    }, {
      value : 200, // TODO ...
      color : 'blue',
      dashStyle : 'shortdash', //'dash'
      width : 2,
      label : {
        align : 'right',
        text : 'max ' //+ data.seuils.max + '°C'
      }
    }]
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

  var type_curve = widget.curves[0].type_curve; // type de la première courbe

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

//   création du graph
  options_chart.series.push(createSeries(widget, 0, options_chart));
  if (widget.navigator) {
    graph = new Highcharts.StockChart( options_chart,
      function(c) {
//         c.showLoading('loading navigator data...');

        for(var i=1; i<widget.curves.length; i++) {
          c.addSeries(createSeries(widget, i, options_chart));
        }

        var deferred_requests = [];
        for(var i=0; i<widget.curves.length; i++) {
          var uri = 'widgets/charts/retrieve.php?output=json&objectlog=' + widget.curves[i].id + '&end=' + widget.initial_start + '&valcount=' + c.chartWidth;
//           console.log("i:", i, "scheduling overview retrieve", uri);
          deferred_requests.push(
            $.getJSON(uri+'&callback=?',
              (function(i) {
                return function (data) {
                  var idx = i;
                  var concat_data = data.concat(c.series[idx].options.data);
                  c.series[idx].setData(concat_data);
                  widget.curves[i].ready = true;
                };
              }(i))
            )
          );
        }
        $.when.apply($, deferred_requests).done( function() {
          finishedOverviewRetrieve(widget);
        });
      }
    );
  } else {
    graph = new Highcharts.Chart( options_chart,
      function(c) {
        c.setTitle(null, {
        text: tr('Build in')+' '+ (new Date() - start) +'ms'
      });}
    );
  }

  return graph;
}

function createSeries(widget, i, options_chart, async) {
    curve = widget.curves[i];

    var data2 = [];
    var series2 = {
      yAxis: 0, // premier axe yAxis par défaut
      data: []
    };
    series2.name = curve.libel; //curve.id;
    series2.type = curve.type;

    series2.type_curve = curve.type_curve; // utiliseable dans les tooltip ensuite si besoin

    if (series2.type == 'line')
      series2.step = curve.step;
    if (curve.color)
      series2.color = curve.color;

  var type_curve = curve.type_curve; // type de la première courbe
  var yAxis_tab = [];
  yAxis_tab[0] = type_curve;

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
    series2.data = getdatajson_teleinfo(curve.id, widget.initial_start, Date.now(), $( "#containerhighstockdialog" ).dialog().width());

    return series2;
}

function getdatajson_teleinfo(id, start, end, valcount) {

  var url = 'widgets/charts/retrieve.php?output=json&objectlog=' + id + '&start=' + start + '&end=' + end + (valcount?('&valcount=' + valcount):'');
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
