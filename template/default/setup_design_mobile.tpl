{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<style>
iframe {
    border: medium none;
    height: 100%;
    width: 100%;
}
iframe body {
    background: none repeat scroll 0 0 #FFFFFF;
}

#rightContent_mobile {
  background-color: #DFE8F6;
  border-right: 1px solid #8DB2E3;
  float: right;
  height: 100%;
  padding-left: 2px;
  padding-right: 2px;
  position: relative;
  vertical-align: top;
  width: 300px;
  top: 0;
  left: 0;
}

#rightContent_mobile .header {
    font-size: 11px;
    line-height: 21px;
    padding-left: 6px;
    padding-top: 3px;
}


/*  accordion */

.accordion h3.ui-accordion-header {
	height: 26px;
	padding-left: 2px;
	vertical-align: baseline;
}

.accordion h3.ui-accordion-header * {
	vertical-align: middle;
}

.accordion h3.ui-corner-bottom {
    -moz-border-radius-bottomleft: 0;
    -moz-border-radius-bottomright: 0;
}

.accordion div {
		padding: 0;
}

.accordion div.header{
	background-color: #FFF;
	height: 20px;
	padding: 3px;
}

.accordion div.content {
		padding: 5px;
}


</style>

<div id="tab-design-mobile-fluxxml" title="Flux Xml"></div>

<div id="widgetdiv-mobile">
  <button id="button-refresh-widget-mobile">{l lang='en'}Refresh{/l}</button> <!-- cf. http://stackoverflow.com/questions/4249809/reload-an-iframe-with-jquery -->
  {l lang='en'}Add a widget{/l}
  <select name="list-widget-mobile" id="list-widget-mobile">
    <option value="">{l lang='en'}Choose a Widget{/l}</option>
    <option value="slider">{l lang='en'}Slider{/l}</option>
    <option value="toggleswicth">{l lang='en'}Flip toggle switch{/l}</option>
    <option value="listview">{l lang='en'}List{/l}</option>
    <option value="list-divider">{l lang='en'}List divider{/l}</option>
    <option value="button">{l lang='en'}Button{/l}</option>
    <option value="controlgroup">{l lang='en'}Button Group{/l}</option>
    <option value="radioswicth">{l lang='en'}Radio swicth{/l}</option>
    <option value="select">{l lang='en'}Select{/l}</option>
    <option value="text">{l lang='en'}Text{/l}</option>
    <option value="html">{l lang='en'}Html{/l}</option>
    <option value="fieldcontain">{l lang='en'}Fieldcontain{/l}</option>
  </select>
  {l lang='en'}Prepend/Append{/l} <input type="checkbox" id="prepend-add-widget-mobile">
  <button id="button-add-widget-mobile">{l lang='en'}Add Mobile Widget{/l}</button>
  <br />
  <!-- resolution mobile : cf. http://2.bp.blogspot.com/_K8iJ3CKP3e0/S_wIduoFMMI/AAAAAAAAAro/PwJwFBt7k5I/s1600/comparatif-resolution-ecran-smartphones.jpg -->
  <iframe src="previewmobile.php" id="framemobile" style="width: 320px;height: 480px;" ></iframe> <!--  onload="$.tr.iframeLoadCallback();" -->
  <iframe src="previewmobile_tst.php#newPage1" id="framemobilemenu" style="width: 320px;height: 480px;" ></iframe>

  <div id="rightContent_mobile" class ="ui-widget-content">
TODO ...

  <div class="ui-state-active ui-corner-top header">{l lang='en'}Type{/l}</div>
  
  
	<div id="widget-mobile-buttons" style="padding: 5px;" >
    <button id="widget-mobile-apply">{l lang='en'}Apply{/l}</button>
		<button id="widget-mobile-delete">{l lang='en'}Delete{/l}</button>
		<button id="widget-mobile-clone">{l lang='en'}Clone{/l}</button>
	</div>

  <div id="widget-mobile-parent" style="padding: 5px;" >
    <select class="parent">
      <option value="">{l lang='en'}None{/l}</option>
      <option value="prevfieldcontain">{l lang='en'}Previous{/l} {l lang='en'}Fieldcontain{/l}</option>
      <option value="newfieldcontain">{l lang='en'}New{/l} {l lang='en'}Fieldcontain{/l}</option>
    </select>
    <span id="fieldcontain_id"></span>
	</div>
<!--
    <option value="slider">{l lang='en'}Slider{/l}</option> options : num_id, text, mini, value, highlight, max, min
    <option value="toggleswicth">{l lang='en'}Flip toggle switch{/l}</option> options : num_id, text, mini, val1, val1_label, val2, val2_label
    <option value="listview">{l lang='en'}List{/l}</option> options : num_id, text  (include somes button)
    <option value="list-divider">{l lang='en'}List divider{/l}</option> => button de type "li" + data-role=list-divider
    <option value="button">{l lang='en'}Button{/l}</option> options : num_id, text, mini, link, inline, icon, iconpos, theme (b=active), type (hrml tag : a, li), role (button, list-divider)
    <option value="controlgroup">{l lang='en'}Button Group{/l}</option>
    <option value="radioswicth">{l lang='en'}Radio swicth{/l}</option>
    <option value="select">{l lang='en'}Select{/l}</option>
    <option value="text">{l lang='en'}Text{/l}</option>
    <option value="html">{l lang='en'}Html{/l}</option>

-->

<div id="widget-mobile-toggleswicth-dialog" style="display: none;" title="{l lang='en'}Edit a{/l} {l lang='en'}Toggleswicth{/l}">
  <form id="widget-mobile-slider-form">
    <table class="form">
      <tbody>
        <tr>
          <th>{l lang='en'}Type{/l}</th>
          <td>{l lang='en'}Toggleswicth{/l} <span id="widget-mobile-slider-num_id"></span></td>
        </tr>
        <tr>
          <th>{l lang='en'}Text{/l}</th>
          <td>
            <input type="text" id="widget-mobile-toggleswicth-text">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Miniature{/l}</th>
          <td>
            <select class="mini">
              <option selected="" value="false">{l lang='en'}No{/l}</option>
              <option value="true">{l lang='en'}Yes{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>"{l lang='en'}Off{/l}" {l lang='en'}Text{/l}</th>
          <td>
            <input type="text" id="widget-mobile-toggleswicth-textOff" value="Off">
          </td>
        </tr>
        <tr>
          <th>"{l lang='en'}On{/l}" {l lang='en'}Text{/l}</th>
          <td>
            <input type="text" id="widget-mobile-toggleswicth-textOn" value="On">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Theme{/l}</th>
          <td>
            <select class="themes">
              <option selected="" value="">Default</option>
              <option value="a">A (default: Black)</option>
              <option value="b">B (default: Blue)</option>
              <option value="c">C (default: Gray)</option>
              <option value="d">D (default: Light Gray)</option>
              <option value="e">E (default: Yellow)</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</div>


<div id="widget-mobile-slider-dialog" style="display: none;" title="{l lang='en'}Edit a{/l} {l lang='en'}Slider{/l}">
  <form id="widget-mobile-slider-form">
    <table class="form">
      <tbody>
        <tr>
          <th>{l lang='en'}Type{/l}</th>
          <td>{l lang='en'}Slider{/l} <span id="widget-mobile-slider-num_id"></span></td>
        </tr>
        <tr>
          <th>{l lang='en'}Text{/l}</th>
          <td>
            <input type="text" id="widget-mobile-slider-text">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Miniature{/l}</th>
          <td>
            <select class="mini">
              <option selected="" value="false">{l lang='en'}No{/l}</option>
              <option value="true">{l lang='en'}Yes{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Highlight{/l}</th>
          <td>
            <input type="checkbox" id="widget-mobile-slider-highlight">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Value{/l}</th>
          <td>
            <input type="text" id="widget-mobile-slider-value" value="50">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Minimum{/l}</th>
          <td>
            <input type="text" id="widget-mobile-slider-min" value="0">
          </td>
        </tr>                                                                               
        <tr>
          <th>{l lang='en'}Maximum{/l}</th>
          <td>
            <input type="text" id="widget-mobile-slider-max" value="100">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Theme{/l}</th>
          <td>
            <select class="themes">
              <option selected="" value="">Default</option>
              <option value="a">A (default: Black)</option>
              <option value="b">B (default: Blue)</option>
              <option value="c">C (default: Gray)</option>
              <option value="d">D (default: Light Gray)</option>
              <option value="e">E (default: Yellow)</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Track{/l} {l lang='en'}Theme{/l}</th>
          <td>
            <select class="trackthemes">
              <option selected="" value="">Default</option>
              <option value="a">A (default: Black)</option>
              <option value="b">B (default: Blue)</option>
              <option value="c">C (default: Gray)</option>
              <option value="d">D (default: Light Gray)</option>
              <option value="e">E (default: Yellow)</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</div>


<div id="widget-mobile-radioswicth-dialog" style="display: none;" title="{l lang='en'}Edit a{/l} {l lang='en'}Radioswicth{/l}">
  <form id="widget-mobile-radioswicth-form">
    <table class="form">
      <tbody>
        <tr>
          <th>{l lang='en'}Type{/l}</th>
          <td>{l lang='en'}Radioswicth{/l} <span id="widget-mobile-radioswicth-num_id"></span></td>
        </tr>
        <tr>
          <th>{l lang='en'}Name{/l}</th>
          <td>
            <input type="text" id="widget-mobile-radioswicth-name">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Text{/l}</th>
          <td>
            <input type="text" id="widget-mobile-radioswicth-text">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Miniature{/l}</th>
          <td>
            <select class="mini">
              <option selected="" value="false">{l lang='en'}No{/l}</option>
              <option value="true">{l lang='en'}Yes{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Orientation{/l}</th>
          <td>
            <select id="widget-mobile-radioswicth-orientation">
              <option selected="" value="vertical">{l lang='en'}Vertical{/l}</option>
              <option value="horizontal">{l lang='en'}Horizontal{/l}</option>
            </select>
          </td>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Actionlist{/l}</th>
          <td>
            TODO ... envoi une des valeur selectionnÈe
          </td>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Object status{/l}</th>
          <td>
            TODO ... object de retour d'Ètat
          </td>
          </td>
        </tr>                                                                                                                      
        <tr>
          <th>{l lang='en'}Items{/l}</th>
          <td>
            <div>
              <div class="accordion" class="ui-helper-reset">
                <h3><a href="#">I</a></h3>
                <div style="padding: 0px;">
			            <table class="form">
                    <tbody>
                      <tr>
                        <th>{l lang='en'}Text{/l}</th>
                        <td>
                          <input type="text" class="text-item" value="I">
                        </td>
                      </tr>
                      <tr>
                        <th>{l lang='en'}Value{/l}</th>
                        <td>
                          <input type="text" class="value-item" value="on">
                        </td>
                      </tr>
                      <tr>
                        <th> </th>
                        <td>
                          <button>{l lang='en'}Delete{/l}</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div><h3><a href="#">O</a></h3>
                <div style="padding: 0px;">
                  <table class="form">
                    <tbody>
                      <tr>
                        <th>{l lang='en'}Text{/l}</th>
                        <td>
                          <input type="text" class="text-item" value="O">
                        </td>
                      </tr>
                      <tr>
                        <th>{l lang='en'}Value{/l}</th>
                        <td>
                          <input type="text" class="value-item" value="off">
                        </td>
                      </tr>
                      <tr>
                        <th> </th>
                        <td>
                          <button>{l lang='en'}Delete{/l}</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button id="button-refresh-widget-mobile">{l lang='en'}New Item{/l}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</div>

<div id="widget-mobile-listview-dialog" style="display: none;" title="{l lang='en'}Edit a{/l} {l lang='en'}Listview{/l}">
  <!-- <form id="widget-mobile-listview-form"> -->
    <table class="form">
      <tbody>
        <tr>
          <th>{l lang='en'}Type{/l}</th>
          <td>{l lang='en'}Listview{/l} <span id="widget-mobile-listview-num_id"></span></td>
        </tr>
        <tr>
          <th>{l lang='en'}Divider Theme{/l}</th>
          <td>
            <select class="dividerthemes">
              <option selected="" value="">Default</option>
              <option value="a">A (default: Black)</option>
              <option value="b">B (default: Blue)</option>
              <option value="c">C (default: Gray)</option>
              <option value="d">D (default: Light Gray)</option>
              <option value="e">E (default: Yellow)</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Inset{/l}</th>
          <td>
            <select class="inset">
              <option selected="" value="false">{l lang='en'}No{/l}</option>
              <option value="true">{l lang='en'}Yes{/l}</option>
            </select>
          </td>
        </tr>                                                                                                                    
        <tr>
          <th>{l lang='en'}Items{/l}</th>
          <td>
            <div>
              <div class="accordion ui-helper-reset">
                <h3 class="ui-state-highlight" ><a href="#">Divider</a></h3>
                <div style="padding: 0px;height:auto;">
                  <table class="button">
                    <tbody>
                      <tr>
                        <th>{l lang='en'}Text{/l}</th>
                        <td>
                          <input type="text" class="text-divider" value="divider">
                        </td>
                      </tr>
                      <tr class="delete" >
                        <th>
                          <button class="val" >{l lang='en'}Apply{/l}</button>
                        </th>
                        <td>
                          <button class="del" style="display:none;" >{l lang='en'}Delete{/l}</button>  <!-- pas possible de delete le premier ... -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3><a href="#">Home</a></h3>
                <div style="padding: 0px;">
                  <table class="button">
                    <tbody>
                      <tr>
                        <th>{l lang='en'}Text{/l}</th>
                        <td>
                          <input type="text" class="text-button" value="Go to home">
                        </td>
                      </tr>
                      <tr>
                        <th>{l lang='en'}Link to page{/l}</th>
                        <td>
                          <select id="widget-mobile-button-type">
                            <option selected="" value="home" >Home</option>
                            <option value="page1" >page1</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>{l lang='en'}Link tranistion{/l}</th>
                        <td>
                          <select class="transitions">
                            <option value="none">None</option>
                            <option selected="" value="fade">Fade</option>
                            <option value="pop">Pop</option>
                            <option value="flip">Flip</option>
                            <option value="turn">Turn</option>
                            <option value="flow">Flow</option>
                            <option value="slidefade">Slide Fade</option>
                            <option value="slide">Slide</option>
                            <option value="slideup">Slide Up</option>
                            <option value="slidedown">Slide Down</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>{l lang='en'}Theme{/l}</th>
                        <td>
                          <select class="buttonthemes">
                            <option selected="" value="">Default</option>
                            <option value="a">A (default: Black)</option>
                            <option value="b">B (default: Blue)</option>
                            <option value="c">C (default: Gray)</option>
                            <option value="d">D (default: Light Gray)</option>
                            <option value="e">E (default: Yellow)</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>{l lang='en'}Count Bubble Text{/l}</th>
                        <td>
                          <input type="text" class="count-bubble-text" value="1">
                        </td>
                      </tr>
                      <tr class="delete" >
                        <th>
                          <button class="val" >{l lang='en'}Apply{/l}</button>
                        </th>
                        <td>
                          <button class="del" style="display:none;" >{l lang='en'}Delete{/l}</button> <!-- pas possible de delete le premier ... -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button class="adddivider" >{l lang='en'}New Divider{/l}</button>
              <button class="addbutton" >{l lang='en'}New Button{/l}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  <!-- </form> -->
</div>

<div id="widget-mobile-button-dialog" title="{l lang='en'}Edit a{/l} {l lang='en'}Button{/l}" style="display: none;">
  <form id="widget-mobile-button-form">
    <table class="form">
      <tbody>
        <tr>
          <th>{l lang='en'}Type{/l}</th>
          <td>{l lang='en'}Button{/l} <span id="widget-mobile-button-num_id"></span></td>
        </tr>
        <tr>
          <th>{l lang='en'}Text{/l}</th>
          <td>
            <input type="text" id="widget-mobile-button-text">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Miniature{/l}</th>
          <td>
            <select class="mini">
              <option selected="" value="false">{l lang='en'}No{/l}</option>
              <option value="true">{l lang='en'}Yes{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Inline{/l}</th>
          <td>
            <select class="inline">
              <option selected="" value="false">{l lang='en'}No{/l}</option>
              <option value="true">{l lang='en'}Yes{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Goto{/l}</th>
          <td>
            <select id="widget-mobile-button-type">
              <!-- <option value="a">{l lang='en'}html tag a{/l}</option>
              <option value="li">{l lang='en'}html tag li{/l}</option> -->
              <option selected="" value="page0" class="page">Home</option>
              <option value="URL">URL...</option>
            </select>
            <input type="text" id="widget-mobile-button-link" value="#">
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Actionlist{/l}</th>
          <td>
            TODO ... envoi une des valeur selectionnÈe
          </td>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Object status{/l}</th>
          <td>
            TODO ... object de retour d'Ètat
          </td>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Transitions{/l}</th>
          <td>
            <select class="transitions">
              <option value="none">None</option>
              <option selected="" value="fade">Fade</option>
              <option value="pop">Pop</option>
              <option value="flip">Flip</option>
              <option value="turn">Turn</option>
              <option value="flow">Flow</option>
              <option value="slidefade">Slide Fade</option>
              <option value="slide">Slide</option>
              <option value="slideup">Slide Up</option>
              <option value="slidedown">Slide Down</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Icone{/l}</th>
          <td>
            <select class="icon">
              <option selected="" value="">{l lang='en'}None{/l}</option>
              <option value="arrow-l">{l lang='en'}Left arrow{/l}</option>
              <option value="arrow-r">{l lang='en'}Right arrow{/l}</option>
              <option value="arrow-u">{l lang='en'}Up arrow{/l}</option>
              <option value="arrow-d">{l lang='en'}Down arrow{/l}</option>
              <option value="delete">{l lang='en'}Delete{/l}</option>
              <option value="plus">{l lang='en'}Plus{/l}</option>
              <option value="minus">{l lang='en'}Minus{/l}</option>
              <option value="check">{l lang='en'}Check{/l}</option>
              <option value="gear">{l lang='en'}Gear{/l}</option>
              <option value="refresh">{l lang='en'}Refresh{/l}</option>
              <option value="forward">{l lang='en'}Forward{/l}</option>
              <option value="back">{l lang='en'}Back{/l}</option>
              <option value="grid">{l lang='en'}Grid{/l}</option>
              <option value="star">{l lang='en'}Star{/l}</option>
              <option value="alert">{l lang='en'}Alert{/l}</option>
              <option value="info">{l lang='en'}Info{/l}</option>
              <option value="home">{l lang='en'}Home{/l}</option>
              <option value="search">{l lang='en'}Search{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Icone position{/l}</th>
          <td>
            <select class="iconpos">
              <option selected="" value="">{l lang='en'}None{/l}</option>
              <option value="left">{l lang='en'}Left{/l}</option>
              <option value="top">{l lang='en'}Top{/l}</option>
              <option value="bottom">{l lang='en'}Bottom{/l}</option>
              <option value="right">{l lang='en'}Right{/l}</option>
              <option value="notext">{l lang='en'}No Text{/l}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{l lang='en'}Theme{/l}</th>
          <td>
            <select class="themes">
              <option selected="" value="">Default</option>
              <option value="a">A (default: Black)</option>
              <option value="b">B (default: Blue)</option>
              <option value="c">C (default: Gray)</option>
              <option value="d">D (default: Light Gray)</option>
              <option value="e">E (default: Yellow)</option>
            </select>
          </td>
        </tr>
        <!--<tr>
          <th>{l lang='en'}Role{/l}</th>
          <td>
            <select id="widget-mobile-button-role">
              <option value="button">{l lang='en'}button{/l}</option>
              <option value="list-divider">{l lang='en'}list-divider{/l}</option>
            </select>
          </td>
        </tr>-->
      </tbody>
    </table>
  </form>
</div>  
  </div>
</div>


<div id="tab-design-mobile-fluxxml" title="{l lang='en'}Xml{/l}" display="none"></div>

<div id="tab-design-mobile-list-widgets" style="display:none;">
  <div class="ui-state-active ui-corner-top header">{l lang='en'}Widgets List{/l}
    <div style="float:right;margin-left: 7px;" class="minus ui-button ui-widget ui-state-default ui-corner-all">
      <span class="ui-icon ui-icon-minus"></span>
    </div>
  </div>
  <table cellpadding="0" cellspacing="0" id="tab-design-mobile-widgets-list">
    <thead>
      <tr>
         <th>{l lang='en'}Widget type{/l}</th>
         <th>{l lang='en'}Description{/l}</th>
      </tr>
   </thead>
    <tbody>
    </tbody>
  </table>

  <div class="ui-state-active ui-corner-top header">{l lang='en'}Footer Link List{/l}</div>

  <table cellpadding="0" cellspacing="0" id="tab-design-mobile-footer-list">
    <thead>
      <tr>
         <th>{l lang='en'}Page{/l}</th>
         <th>{l lang='en'}icone{/l}</th>
      </tr>
   </thead>
    <tbody>
    </tbody>
  </table>

</div>

<div id="tab-design-mobile-properties" >
	<div class="ui-state-active ui-corner-top header">
    {l lang='en'}Widget information{/l}
	</div>
	
	<div id="tab-design-mobile-widget-buttons">
    <button id="button-delete-widget-mobile">{l lang='en'}Delete{/l}</button>
    <button id="button-clone-widget-mobile">{l lang='en'}Clone{/l}</button>
	</div>
	<table cellpadding="0" cellspacing="0" id="tab-design-mobile-widget-properties">
		<tbody>
		</tbody>
	</table>
	
	<table cellpadding="0" cellspacing="0" id="tab-design-mobile-design-properties">
		<tbody>
			<!-- TODO a mettre dans le menu on ne g√®re pas les Design ... 
      <tr>
				<th>Design</th>
				<td><select id="tab-design-mobile-design-list"></select></td>
			</tr>
      d√©pend de la r√©slution du device en qui utilise donc √† mettre dans le menu avec valeur par d√©faut par exemple et modifibale mais reste indicatif et non une data du "design" ou "zone"
			<tr> 
				<th>Design width</th>
				<td><input type="text" id="tab-design-mobile-width"></td>
			</tr>
			<tr>
				<th>Design height</th>
				<td><input type="text" id="tab-design-mobile-height"></td>
			</tr> -->
			<tr>
        <th>{l lang='en'}Page{/l}</th>
        <td><select id="tab-design-mobile-page-list" onchange="designmobile.draw(this.value);"></select></td>
			</tr>
			<tr>
        <th>{l lang='en'}Orientation{/l}</th>
        <td>
          <select id="tab-design-mobile-screen-orientation" >
            <option value="portrait">{l lang='en'}Portrait{/l}</option>
            <option value="landscape">{l lang='en'}Landscape{/l}</option>
          </select>
        </td>
      </tr> 
      <tr>
        <th>{l lang='en'}Home button{/l} ??</th>
        <td><input type="checkbox" id="tab-design-mobile-header-home"></td>
      </tr>
      <tr>
        <th>{l lang='en'}Back button{/l}</th>
				<td><input type="checkbox" id="tab-design-mobile-header-back"></td>
			</tr>
			<tr>
        <th>{l lang='en'}Title Page{/l}</th>
				<td><input type="text" id="tab-design-mobile-header-title" value="Title Page" ></td>
			</tr>
			<tr>
        <th>{l lang='en'}Footer{/l}</th>
				<td><input type="checkbox" id="tab-design-mobile-footer"></td>
			</tr>
			<tr>
				<th>{l lang='en'}Display "global" Widgets{/l}</th>
				<td><input type="checkbox" id="tab-design-zone-globalcontrol" checked="checked" ></td>
			</tr>
      <tr>
        <th>{l lang='en'}XML source{/l}</th>
        <td><button class="displayXML" onclick="designmobile.displayXML();">{l lang='en'}View{/l}</button></td>
			</tr>
		</tbody>
	</table>
</div>
