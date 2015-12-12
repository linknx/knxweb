/*
 *
 * Charts with Highcharts / HighStock : highsoft software product is not free for commercial use lock at http://shop.highsoft.com/
 *
 **/
// TODO gérer les graph valeur en % (ex. volet), conso élec téléinfo et conso eau / gaz en mode "bar"/piques
// TODO : nouvelle version a gérer : $("#container").highcharts("StockChart", { params ...});
// TODO : permettre de gérer une gauge ...

var _chart;

function CCharts(conf) {
  this.isResizable=false;
  this.graph = $(".affgraph", this.div).get(0);
  this.start = 0;
  this.chart = 0;
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
CCharts.prototype.updateObject = function(obj,value) {
  if ( this.liveupdate ) {
    for( var i = 0; i < this.curves.length; i++) {
      if ( this.curves[i].ready && this.curves[i].id == obj ) {
        if (this.curves[i].lastval != value)
        {
          addPoint(this, i, parseFloat(value));
          this.curves[i].lastval = value;
        }
      }
    }
  }
};

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
  this.liveupdate = this.conf.getAttribute("liveupdate") == "true"; // => add newly received knx values

  // => si log de type "mysql"
  this.duration = this.conf.getAttribute("duration");
  this.periodicity = this.conf.getAttribute("periodicity");
  // => si log de type "file"
  this.nbenreg = this.conf.getAttribute("nbenreg");

  this.curves = []; // courbes à tracer

  // récupération des attributs de conf (= "control") pour la 1ere courbe
  var curve = {};
  for( var i = 0; i < 5; i++) {
    var curveData = {};
    curveData.id = this.conf.getAttribute("id" + i);

    curveData.libel = this.conf.getAttribute("libel" + i);
    if (_editMode) {
      var libel = "";
      var id = curveData.id.replace(" ", "_");
      $('object[id=' + id + ']', _objects).each(function() {
        if (id == this.getAttribute('id')) libel = ((this.textContent!="")?this.textContent:this.getAttribute('id'));
      });
      this.conf.setAttribute('libel' + i, libel );
      curveData.libel = libel;
    }
    if (!curveData.libel) curveData.libel = curveData.id;

    curveData.type_curve=this.conf.getAttribute("typecurve" + i); // type de graph "temperature" / "swicth" / "blind" ...
    curveData.type=curveData.type_curve;

    curve.step = false;
    if ( curveData.type_curve == 'switch' || curveData.type_curve == 'dimmer' || curveData.type_curve == 'pourcent') { // fait un graph "carré"
      curveData.type = 'line';
      curveData.step = true;
    }
    if ( curveData.type_curve == 'temperature') curveData.type = 'spline';

    curveData.color = this.conf.getAttribute("color" + i);
    if (curveData.id != '') {
      this.curves.push(curveData);
    }
  };

};

