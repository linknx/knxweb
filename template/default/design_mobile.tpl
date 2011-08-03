<!DOCTYPE html>
<!--<html manifest="cache.manifest">-->
<html>
<head>
  <title>KnxWebMobile</title>
     
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!-- <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
  
  <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
  <meta name="apple-mobile-web-app-capable" content="yes" >
  <meta name="apple-mobile-web-app-status-bar-style" content="black" >
  <link rel="apple-touch-icon" href="apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png" />
  <link rel="apple-touch-startup-image" href="apple-touch-startup-image-320x460.png" />
  <link rel="apple-touch-startup-image" sizes="768x1004" href="apple-touch-startup-image-768x1004.png" />
  -->
  
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <link rel="apple-touch-icon" href="images/logo.png" />
  <link rel="apple-touch-icon-precomposed" href="images/logo.png" />
  <link rel="apple-touch-startup-image" href="images/logo.png" />
		
		<meta http-equiv="pragma" content="no-cache" >
		<meta http-equiv="cache-control" content="no-cache, must-revalidate" >

<!--

  <link rel="stylesheet" href="./css/jquery.mobile-1.0b1.min.css" />
  <script type="text/javascript" src="./js/jquery-1.6.2.min.js"></script>
  
  <link rel="stylesheet" href="./css/style.css" />  

  <script type="text/javascript" src="js/lang.js"></script>
  <script type="text/javascript" src="js/EIBCommunicator_mobile.js"></script>
  <script type="text/javascript" src="js/common_mobile.js"></script>
  <script type="text/javascript" src="js/cwidget_mobile.js"></script>
  <script type="text/javascript" src="js/cswitch_mobile.js"></script>
  <script type="text/javascript" src="js/cdimmer_mobile.js"></script>
  <script type="text/javascript" src="js/cshutters_mobile.js"></script>
  <script type="text/javascript" src="js/ctext_mobile.js"></script>
  <script type="text/javascript" src="js/cthermostat_mobile.js"></script>
  <script type="text/javascript" src="js/cgoto_mobile.js"></script>
  <script type="text/javascript" src="js/chtml_mobile.js"></script>
  <script type="text/javascript" src="js/design_mobile.js"></script>

  <script type="text/javascript" src="./js/jquery.mobile-1.0b1.min.js"></script>

-->		
		
		<script type="text/javascript" >
			var tab_config = {$json_config};
		</script>
		{foreach from=$cssList item=css}
		<link rel="stylesheet" type="text/css" href="{$css}" />
		{/foreach}
		{foreach from=$jsList item=js}
		<script type="text/javascript" src="{$js}"></script>
		{/foreach}
</head>
<body>
  <div data-role="page" id="page0" data-add-back-btn="true">
    <div data-role="header" id="header0" class="header" data-backbtn="false" >
      <a href="#page0" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a>
    </div>
    <div data-role="content" id="content0" class="content" >
      <div id="waitDialog" >
        <img src="./images/Logo_Accueil_160.png" alt="KnxWebMobile" /><br />
        <img src="images/loading.gif" alt="Loading"/><br />
        <span><b>Loading...</b></span>
      </div>
    </div>
    <!-- Bar Bas de page avec bouttons --> 
    <div data-role="footer" class="ui-bar" id="footer" class="footer" >
      <div data-role="navbar" data-iconpos="top" id="navbar"><ul></ul></div>
    </div>
  </div>
  <div data-role="page" id="newPage" style="display: none;" data-add-back-btn="true">  
    <div data-role="header" id="header" class="header"><!--<a href="#" data-icon="arrow-l" class="ui-btn-left" data-rel="back">Back</a>--><a href="#page0" data-icon="gear" class="ui-btn-right" data-iconpos="notext">Home</a></div> 
    <div data-role="content" id="content" class="content"></div>
    <!-- Bar Bas de page avec bouttons --> 
    <div data-role="footer" class="ui-bar" id="footer" class="footer">
      <div data-role="navbar" data-iconpos="top" id="navbar" class="navbar">
        <ul></ul>
      </div>
    </div>
  </div>
  <div data-role="page" style="display: none;" data-add-back-btn="true">  
    <div data-role="content">
  <!-- Switch -->		
  <div data-role="fieldcontain" id="newswitch" >
    <!-- <h3>Switch</h3> -->       
    <div class="ui-grid-a">
      <div class="ui-block-a" id="blockA"></div>
      <div class="ui-block-b" id="blockB">
        <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" style="position:absolute;right:10px;" class="switch" >
          <!--  -->
          <input type="radio" name="radioSwitch" id="radioSwitchOn" class="radioSwitchOn" value="On" checked="true" />
          <label for="radioSwitchOn" class="radioSwitchLabelOn" >I</label>
          <input type="radio" name="radioSwitch" id="radioSwitchOff" class="radioSwitchOff" value="Off" checked="false" />
          <label for="radioSwitchOff" class="radioSwitchLabelOff">O</label>
        </fieldset>
      </div>
    </div>
  </div>
  <!-- Dimmer -->
  <div data-role="fieldcontain" id="newdimmer" >
    <!-- <h3>Dimmer Plafond Cuisine</h3> -->
    <div class="ui-grid-a" id="blockA" >
      <div class="ui-block-a">
        <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
          <!-- -->
          <input type="radio" name="radioDimmer" id="radioDimmerOn" class="radioDimmerOn" value="On" />
          <label for="radioDimmerOn" class="radiolabelOn" >I</label>
          <input type="radio" name="radioDimmer" id="radioDimmerOff" class="radioDimmerOff" value="Off" checked="true" />
          <label for="radioDimmerOff" class="radiolabelOff" >O</label>
        </fieldset>
      </div>
      <div class="ui-block-b" id="blockB">
        <select name="selectDimmer" id="selectDimmer" class="selectdimmer">
          <option value="0">0 %</option>
          <option value="10">10 %</option>
          <option value="20">20 %</option>
          <option value="30">30 %</option>
          <option value="40">40 %</option>
          <option value="50">50 %</option>
          <option value="60">60 %</option>
          <option value="70">70 %</option>
          <option value="80">80 %</option>
          <option value="90">90 %</option>
          <option value="100">100 %</option>
        </select>
      </div>
    </div>
  </div>
  <!-- Volet (blinds /shutters) -->
  <div data-role="fieldcontain" id="newshutters" >
    <!-- <h3>name du device</h3> -->
    <div class="ui-grid-a">
      <div class="ui-block-a" id="blockA">
        <div data-role="controlgroup" >
          <a href="#" data-role="button" data-icon="arrow-u" class="shuttersUp" >Up</a>
          <a href="#" data-role="button" data-icon="delete" class="shuttersStop" >Stop</a>
          <a href="#" data-role="button" data-icon="arrow-d" class="shuttersDown" >Down</a>
        </div>
      </div>
      <div class="ui-block-b" id="blockB">
        <select name="selectShutters" id="selectShutters" class="selectShutters" >
          <option value="0">0 %</option>
          <option value="10">10 %</option>
          <option value="20">20 %</option>
          <option value="30">30 %</option>
          <option value="40">40 %</option>
          <option value="50">50 %</option>
          <option value="60">60 %</option>
          <option value="70">70 %</option>
          <option value="80">80 %</option>
          <option value="90">90 %</option>
          <option value="100">100 %</option>
        </select>
      </div>
    </div>
  </div>
  <!-- thermostat -->
  <div data-role="fieldcontain" id="newthermostat" >
    <!-- <h3>name du device</h3> -->
    <div class="ui-grid-a">
      <div class="ui-block-a newthermostatblockA" id="blockA">
        <!-- <h3 style="font-weight:normal;">Température</h3> -->
      </div>
      <div class="ui-block-b newthermostatblockB" id="blockB">
        <!-- <h3 style="font-size:17px;"> 19.56 °C</h3> -->
      </div>
    </div>
    <label for="selectTh1" class="selectTh1">Mode</label>
    <select name="selectTh1" id="selectTh1" class="selectTh1">
      <option value="comfort">Confort</option>
      <option value="standby">Eco</option>
      <option value="night">Nuit</option>
      <option value="frost">Protection gel</option>
    </select>
    <label for="selectTh2" class="selectTh2">Consigne</label>
    <select name="selectTh2" id="selectTh2" class="selectTh2"></select>
  </div>
  <!-- text (simple / amélioré avec une icone / forme bouton) -->
  <div data-role="fieldcontain" id="newtext" >
    <div class="ui-grid-a">
      <div class="ui-block-a newtextblockA" id="blockA" ><!-- <h3>name du device</h3> --></div>
      <div class="ui-block-b newtextblockB" id="blockB" ></div>
    </div>
  </div>

    </div><!-- /content -->
  </div><!-- /page -->
</body>
</html>