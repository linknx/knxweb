<!DOCTYPE html>
<html>
<head>
  <title>KnxWebMobile</title>
     
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <link rel="apple-touch-icon" href="images/logo.png" />
  <link rel="apple-touch-icon-precomposed" href="images/logo.png" />
  <link rel="apple-touch-startup-image" href="images/logo.png" />
		
	<meta http-equiv="pragma" content="no-cache" >
	<meta http-equiv="cache-control" content="no-cache, must-revalidate" >
	
		
	<script type="text/javascript" >
		//var tab_config = {$json_config};
	</script>
	{foreach from=$cssList item=css}
	<link rel="stylesheet" type="text/css" href="{$css}" />
	{/foreach}
	{foreach from=$jsList item=js}
	<script type="text/javascript" src="{$js}"></script>
	{/foreach}
  
  <style>
  /* pour les test on affiche le cadre autour des "fieldcontain" */
  .ui-field-contain {
    border : 1px dotted black;
  }
  </style>


<script type="text/javascript" >
jQuery(function($) {
  $( document ).delegate("#page0", "pagebeforecreate", function() {
    alert('la page "page0" va être créée par jQuery Mobile!');
  });
  $( document ).delegate("#page0", "pageinit", function() {
    alert('la page "page0" viens juste d\'être créée par jQuery Mobile!');
  });
});
</script>

</head>
<body>
  <div data-role="page" id="newPage" data-add-back-btn="true">  
    <div data-role="header" id="header" class="header"><h1>Titre Page</h1><a href="#page0" data-icon="gear" class="ui-btn-right" data-iconpos="notext">Home</a></div> 
    <div data-role="content" id="content" class="content">
      <div style="display:none;">
        <div data-role="fieldcontain" >
          <label for="slider-0">Input slider:</label>
          <input type="range" name="slider" id="slider-0" value="25" min="0" max="100"  />
        </div><div data-role="fieldcontain">
        <label for="flip-a">Select slider:</label>
        <select name="slider" id="flip-a" data-role="slider">
        	<option value="off">Off</option>
        	<option value="on">On</option>
        </select> 
      </div>
      <div data-role="fieldcontain">
        <label for="flip-a">Select slider Mini:</label>
        <select name="slider" id="flip-a" data-role="slider" data-mini="true" >
        	<option value="off">Off</option>
        	<option value="on">On</option>
        </select> 
      </div>
      <div data-role="fieldcontain">
        <a href="" data-role="button" data-inline="true">Cancel</a>
        <a href="" data-role="button" data-inline="true" data-theme="b">Save</a>
      </div>
      <div data-role="fieldcontain">
        <a href="" data-role="button" data-inline="true" data-mini="true">Cancel</a>
        <a href="" data-role="button" data-inline="true" data-theme="b" data-mini="true">Save</a>
      </div>
      <div data-role="fieldcontain">
        <div data-role="controlgroup">
          <a href="" data-inline="true" data-role="button">I</a>
          <a href="" data-inline="true" data-role="button">O</a>
        </div>
        <a href="" data-role="button" data-inline="true" data-iconpos="notext" data-icon="delete" >que l'icone</a>
      </div>

      <div data-role="fieldcontain">
        <fieldset data-role="controlgroup" data-type="horizontal" >
          <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1"  />
         	<label for="radio-choice-1">I</label>
          <input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2" checked="checked" />
         	<label for="radio-choice-2">O</label>
        </fieldset>
      </div>
      <div data-role="fieldcontain">
        <div data-role="controlgroup">
          <a href="" data-role="button" data-iconpos="notext" data-icon="arrow-u">Up</a>
          <a href="" data-role="button" data-iconpos="notext" data-icon="delete">Stop</a>
          <a href="" data-role="button" data-iconpos="notext" data-icon="arrow-d">down</a>
        </div>
      </div>
      </div>
     </div><!-- /content -->
    <!-- Bar Bas de page avec bouttons --> 
    <div data-role="footer" class="ui-bar" id="footer" class="footer">
      <h4>Page Footer</h4>
    </div>
  </div><!-- /page -->
  <div data-role="page" id="newPage1" data-add-back-btn="true"> <!-- style="display: none;" -->  
    <div data-role="header" id="header" class="header"><!--<a href="#" data-icon="arrow-l" class="ui-btn-left" data-rel="back">Back</a>--><h1>Titre Page</h1><a href="#page0" data-icon="gear" class="ui-btn-right" data-iconpos="notext">Home</a></div> 
    <div data-role="content" id="content" class="content">
    <div style="display:none;">
      <div data-role="fieldcontain" >
        <label for="slider-0">Input slider:</label>
        <input type="range" name="slider" id="slider-0" value="25" min="0" max="100"  />
      </div>
    </div>
    <p>Hello le monde</p>
    <div id="tototest" style="width:100%;height:50px;"></div>
  <!-- Switch -->		
  <div data-role="fieldcontain" id="newswitch" >
    <div class="ui-grid-a">
      <div class="ui-block-a" id="blockA"><h3>Switch</h3></div>
      <div class="ui-block-b" id="blockB">
        <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" style="position:absolute;right:10px;" class="switch" >
          <input type="radio" name="radioSwitch" id="radioSwitchOn" class="radioSwitchOn" value="On" checked="true" />
          <label for="radioSwitchOn" class="radioSwitchLabelOn" >I</label>
          <input type="radio" name="radioSwitch" id="radioSwitchOff" class="radioSwitchOff" value="Off" />
          <label for="radioSwitchOff" class="radioSwitchLabelOff">O</label>
        </fieldset>
      </div>
    </div>
  </div>
  <!-- Dimmer -->
  <div data-role="fieldcontain" id="newdimmer" >
    <h3>Dimmer Plafond Cuisine</h3>
    <div class="ui-grid-a" id="blockA" >
      <div class="ui-block-a">
        <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
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
    <h3>name du device</h3>
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
    <h3>name du device</h3>
    <div class="ui-grid-a">
      <div class="ui-block-a newthermostatblockA" id="blockA">
        <h3 style="font-weight:normal;">Température</h3>
      </div>
      <div class="ui-block-b newthermostatblockB" id="blockB">
        <h3 style="font-size:17px;"> 19.56 °C</h3>
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
      <div class="ui-block-a newtextblockA" id="blockA" ><h3>name du device</h3></div>
      <div class="ui-block-b newtextblockB" id="blockB" >nextextB</div>
    </div>
  </div>
  
    <div data-role="fieldcontain" id="newswitch" >
        <div class="ui-grid-a">
          <div class="ui-block-a" id="blockA"><h3>newswitch</h3></div>
          <div class="ui-block-b" id="blockB">
            <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" style="position:absolute;right:10px;" class="switch" >
              <input type="radio" name="radioSwitch" id="radioSwitchOn" class="radioSwitchOn" value="On" checked="true" />
              <label for="radioSwitchOn" class="radioSwitchLabelOn" >I</label>
              <input type="radio" name="radioSwitch" id="radioSwitchOff" class="radioSwitchOff" value="Off" />
              <label for="radioSwitchOff" class="radioSwitchLabelOff">O</label>
            </fieldset>
          </div>
        </div>
      </div>
      <div data-role="fieldcontain" id="newsend" >
        <div class="ui-grid-a">
          <div class="ui-block-a" id="blockA"><h3>newsend</h3></div>
          <div class="ui-block-b" id="blockB">
            <fieldset data-role="fieldcontain" style="position:absolute;right:10px;" class="send" data-inline="true" >
              <button id="buttonSend" class="buttonSend">On</button>
            </fieldset>
          </div>
        </div>
      </div>
      <div data-role="fieldcontain" id="newdimmer" >
        <div class="ui-grid-a" id="blockA" >
          <div class="ui-block-a" style="width:25%;">
            <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
              <input type="radio" name="radioDimmer" id="radioDimmerOn" class="radioDimmerOn" value="On" />
              <label for="radioDimmerOn" class="radiolabelOn" >I</label>
              <input type="radio" name="radioDimmer" id="radioDimmerOff" class="radioDimmerOff" value="Off" checked="true" />
              <label for="radioDimmerOff" class="radiolabelOff" >O</label>
            </fieldset>
          </div>
          <div class="ui-block-b" id="blockB" style="width:75%;">
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
          <div class="ui-block-b" id="blockB2" style="width:75%;display: none;">
            <input type="range" name="sliderDimmer" id="sliderDimmer" class="sliderdimmer" value="0" min="0" max="100" />
          </div>
          <div class="ui-block-b" id="blockB3" style="width:25%;display: none;">
            <span class='ui-btn ui-btn-inline ui-btn-corner-all ui-shadow' style='cursor:auto;' >
              <span class='ui-btn-inner ui-btn-corner-all'>
                <span class='ui-btn-text valuedimmer'>aa</span>
              </span>
            </span>
          </div>
          <div class="ui-block-c" id="blockC" style="width:50%;display: none;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="arrow-u" class="dimmerUp" >Up</a>
              <a href="#" data-role="button" data-icon="arrow-d" class="dimmerDown" >Down</a>
            </div>
          </div>
          <div class="ui-block-c" id="blockC2" style="width:50%;display: none;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="plus" class="dimmerPlus" >Plus</a>
              <a href="#" data-role="button" data-icon="minus" class="dimmerMinus" >Moins</a>
            </div>
          </div>
        </div>
      </div>
      <div data-role="fieldcontain" id="newdimmer2" >
        <div class="ui-grid-a" id="blockA" >
          <div class="ui-block-a" style="width:25%;">
            <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
              <input type="radio" name="radioDimmer" id="radioDimmerOn" class="radioDimmerOn" value="On" />
              <label for="radioDimmerOn" class="radiolabelOn" >I</label>
              <input type="radio" name="radioDimmer" id="radioDimmerOff" class="radioDimmerOff" value="Off" checked="true" />
              <label for="radioDimmerOff" class="radiolabelOff" >O</label>
            </fieldset>
          </div>
          <div class="ui-block-b" id="blockB" style="width:75%;display: none;">
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
          <div class="ui-block-b" id="blockB2" style="width:75%;">
            <input type="range" name="sliderDimmer" id="sliderDimmer" class="sliderdimmer" value="0" min="0" max="100" />
          </div>
          <div class="ui-block-b" id="blockB3" style="width:25%;display: none;">
            <span class='ui-btn ui-btn-inline ui-btn-corner-all ui-shadow' style='cursor:auto;' >
              <span class='ui-btn-inner ui-btn-corner-all'>
                <span class='ui-btn-text valuedimmer'>aa</span>
              </span>
            </span>
          </div>
          <div class="ui-block-c" id="blockC" style="width:50%;display: none;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="arrow-u" class="dimmerUp" >Up</a>
              <a href="#" data-role="button" data-icon="arrow-d" class="dimmerDown" >Down</a>
            </div>
          </div>
          <div class="ui-block-c" id="blockC2" style="width:50%;display: none;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="plus" class="dimmerPlus" >Plus</a>
              <a href="#" data-role="button" data-icon="minus" class="dimmerMinus" >Moins</a>
            </div>
          </div>
        </div>
      </div>
      <div data-role="fieldcontain" id="newdimmer3" >
        <div class="ui-grid-a" id="blockA" >
          <div class="ui-block-a" style="width:25%;">
            <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
              <input type="radio" name="radioDimmer" id="radioDimmerOn" class="radioDimmerOn" value="On" />
              <label for="radioDimmerOn" class="radiolabelOn" >I</label>
              <input type="radio" name="radioDimmer" id="radioDimmerOff" class="radioDimmerOff" value="Off" checked="true" />
              <label for="radioDimmerOff" class="radiolabelOff" >O</label>
            </fieldset>
          </div>
          <div class="ui-block-b" id="blockB" style="width:75%;display: none;">
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
          <div class="ui-block-b" id="blockB2" style="width:75%;display: none;">
            <input type="range" name="sliderDimmer" id="sliderDimmer" class="sliderdimmer" value="0" min="0" max="100" />
          </div>
          <div class="ui-block-b" id="blockB3" style="width:25%;">
            <span class='ui-btn ui-btn-inline ui-btn-corner-all ui-shadow' style='cursor:auto;' >
              <span class='ui-btn-inner ui-btn-corner-all'>
                <span class='ui-btn-text valuedimmer'>aa</span>
              </span>
            </span>
          </div>
          <div class="ui-block-c" id="blockC" style="width:50%;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="arrow-u" class="dimmerUp" >Up</a>
              <a href="#" data-role="button" data-icon="arrow-d" class="dimmerDown" >Down</a>
            </div>
          </div>
          <div class="ui-block-c" id="blockC2" style="width:50%;display: none;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="plus" class="dimmerPlus" >Plus</a>
              <a href="#" data-role="button" data-icon="minus" class="dimmerMinus" >Moins</a>
            </div>
          </div>
        </div>
      </div>
      <div data-role="fieldcontain" id="newdimmer3" >
        <div class="ui-grid-a" id="blockA" >
          <div class="ui-block-a" style="width:25%;">
            <fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
              <input type="radio" name="radioDimmer" id="radioDimmerOn" class="radioDimmerOn" value="On" />
              <label for="radioDimmerOn" class="radiolabelOn" >I</label>
              <input type="radio" name="radioDimmer" id="radioDimmerOff" class="radioDimmerOff" value="Off" checked="true" />
              <label for="radioDimmerOff" class="radiolabelOff" >O</label>
            </fieldset>
          </div>
          <div class="ui-block-b" id="blockB" style="width:75%;display: none;">
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
          <div class="ui-block-b" id="blockB2" style="width:75%;display: none;">
            <input type="range" name="sliderDimmer" id="sliderDimmer" class="sliderdimmer" value="0" min="0" max="100" />
          </div>
          <div class="ui-block-b" id="blockB3" style="width:25%;">
            <span class='ui-btn ui-btn-inline ui-btn-corner-all ui-shadow' style='cursor:auto;' >
              <span class='ui-btn-inner ui-btn-corner-all'>
                <span class='ui-btn-text valuedimmer'>aa</span>
              </span>
            </span>
          </div>
          <div class="ui-block-c" id="blockC" style="width:50%;display: none;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="arrow-u" class="dimmerUp" >Up</a>
              <a href="#" data-role="button" data-icon="arrow-d" class="dimmerDown" >Down</a>
            </div>
          </div>
          <div class="ui-block-c" id="blockC2" style="width:50%;">
            <div style="" class="" data-inline="true" data-role="controlgroup" >
              <a href="#" data-role="button" data-icon="plus" class="dimmerPlus" >Plus</a>
              <a href="#" data-role="button" data-icon="minus" class="dimmerMinus" >Moins</a>
            </div>
          </div>
        </div>
      </div>
      <div data-role="fieldcontain" id="newshutters" >
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
      <div data-role="fieldcontain" id="newthermostat" >
        <div class="ui-grid-a">
          <div class="ui-block-a newthermostatblockA" id="blockA">newthermostatA</div>
          <div class="ui-block-b newthermostatblockB" id="blockB">newthermostatB</div>
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
      <div data-role="fieldcontain" id="newtext" >
        <div class="ui-grid-a">
          <div class="ui-block-a newtextblockA" id="blockA" >newtextA</div>
          <div class="ui-block-b newtextblockB" id="blockB" >newtextB</div>
        </div>
      </div>
 
     </div><!-- /content -->
    <!-- Bar Bas de page avec bouttons --> 
    <div data-role="footer" class="ui-bar" id="footer" class="footer">
      <h4>Page Footer</h4>
    </div>
  </div><!-- /page -->
  <div data-role="page" id="page0" data-add-back-btn="true" data-url="">
    <div data-role="header" id="header0" class="header" data-backbtn="false" >
      <a href="#page0" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a><h1>Maison KnxWebMobile</h1>
    </div>
    <div data-role="content" id="content0" class="content" >
      <ul data-role="listview" data-inset="true" >
        <li data-role="list-divider">RDC</li>
        <li><a href="#newPage">newPage</a></li>
        <li><a href="#pagemodel">pagemodel</a></li>
        <li><a href="#newPage1">Salon</a></li>
        <li><a href="#page0">Salon</a></li>
        <li><a href="#page0">Cuisine</a></li>
        <li><a href="#page0">Chambre</a></li>
        <li data-role="list-divider">Etage1</li>
        <li><a href="#page0" >Chambre1</a></li>
        <li data-role="list-divider">Sous-sol</li>
        <li><a href="#page0" >Sous-sol</a></li>
        <li data-role="list-divider">Extérieur</li>
        <li><a href="#page0" >Jardin</a></li>
      </ul>
    </div>
    <div data-role="footer" class="ui-bar" id="footer" class="footer" >
      <div data-role="navbar" data-iconpos="top" id="navbar">
        <ul>
          <li><a href="http://www.google.fr" rel="external" data-role="button" data-icon="home">Google</a></li>
          <li><a href="#pagemodel" data-role="button" data-icon="star">Modèle</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div data-role="page" id="pagemodel" data-add-back-btn="true" data-url="" data-title="Modèle">
    <div data-role="header" id="header0" class="header" data-backbtn="false" >
      <a href="#page0" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a><h1>Modèle</h1>
    </div>
    <div data-role="content" id="content0" class="content" >


      <div data-role="fieldcontain" >
        <label for="slider-0">Input slider:</label>
        <input type="range" name="slider" id="slider-0" value="25" min="0" max="100"  />
      </div>
      <div data-role="fieldcontain">
        <label for="flip-a">Select slider:</label>
        <select name="slider" id="flip-a" data-role="slider">
        	<option value="off">Off</option>
        	<option value="on">On</option>
        </select> 
      </div>
      <div data-role="fieldcontain">
        <label for="flip-a">Select slider Mini:</label>
        <select name="slider" id="flip-a" data-role="slider" data-mini="true" >
        	<option value="off">Off</option>
        	<option value="on">On</option>
        </select> 
      </div>
      <div data-role="fieldcontain">
        <a href="" data-role="button" data-inline="true">Cancel</a>
        <a href="" data-role="button" data-inline="true" data-theme="b">Save</a>
      </div>
      <div data-role="fieldcontain">
        <a href="" data-role="button" data-inline="true" data-mini="true">Cancel</a>
        <a href="" data-role="button" data-inline="true" data-theme="b" data-mini="true">Save</a>
      </div>
      <div data-role="fieldcontain">
        <div data-role="controlgroup">
          <a href="" data-inline="true" data-role="button">I</a>
          <a href="" data-inline="true" data-role="button">O</a>
        </div>
        <a href="" data-role="button" data-inline="true" data-iconpos="notext" data-icon="delete" >que l'icone</a>
      </div>

      <div data-role="fieldcontain">
        <fieldset data-role="controlgroup" data-type="horizontal" >
          <input type="radio" name="radio-choice-1" id="radio-choice-1" value="choice-1"  />
         	<label for="radio-choice-1">I</label>
          <input type="radio" name="radio-choice-1" id="radio-choice-2" value="choice-2" checked="checked" />
         	<label for="radio-choice-2">O</label>
        </fieldset>
      </div>
      <div data-role="fieldcontain">
        <div data-role="controlgroup">
          <a href="" data-role="button" data-iconpos="notext" data-icon="arrow-u">Up</a>
          <a href="" data-role="button" data-iconpos="notext" data-icon="delete">Stop</a>
          <a href="" data-role="button" data-iconpos="notext" data-icon="arrow-d">down</a>
        </div>
      </div>
    </div>
    <div data-role="footer" class="ui-bar" id="footer" class="footer" >
      <div data-role="navbar" data-iconpos="top" id="navbar">
        <ul></ul>
      </div>
    </div>
  </div>
</body>
</html>