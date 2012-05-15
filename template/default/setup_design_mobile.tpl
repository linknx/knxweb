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
</style>

<div id="widgetdiv-mobile">
  <button id="button-refresh-widget-mobile">Refresh</button> <!-- cf. http://stackoverflow.com/questions/4249809/reload-an-iframe-with-jquery -->
  Add a widget
  <select name="list-widget-mobile" id="list-widget-mobile">
    <option value="slider">Slider</option>
    <option value="toggleswicth">Flip toggle switch</option>
    <option value="listview">List</option>
    <option value="list-divider">List divider</option>
    <option value="button">Button</option>
    <option value="controlgroup">Button Group</option>
    <option value="radioswicth">Radio swicth</option>
    <option value="select">Select</option>
    <option value="text">Text</option>
    <option value="html">Html</option>
  </select>
  Prepend/Append <input type="checkbox" id="prepend-add-widget-mobile">
  <button id="button-add-widget-mobile">Add Mobile Widget</button>
  <br />
  <!-- resolution mobile : cf. http://2.bp.blogspot.com/_K8iJ3CKP3e0/S_wIduoFMMI/AAAAAAAAAro/PwJwFBt7k5I/s1600/comparatif-resolution-ecran-smartphones.jpg -->
  <iframe src="previewmobile.php" id="framemobile" style="width: 320px;height: 480px;" ></iframe> <!--  onload="$.tr.iframeLoadCallback();" -->
  <iframe src="previewmobile.php#newPage1" id="framemobilemenu" style="width: 320px;height: 480px;" ></iframe>
  <iframe src="previewmobile.php#pagemodel" id="framemobilepagemodel" style="width: 320px;height: 480px;" ></iframe>
</div>


<div id="tab-design-mobile-fluxxml" title="Flux Xml" display="none"></div>

<div id="tab-design-mobile-list-widgets" style="display:none;">
  <div class="ui-state-active ui-corner-top header">Widgets List</div>

  <table cellpadding="0" cellspacing="0" id="tab-design-mobile-widgets-list">
    <thead>
      <tr>
         <th>Widget type</th>
         <th>Description</th>
      </tr>
   </thead>
    <tbody>
    </tbody>
  </table>

  <div class="ui-state-active ui-corner-top header">Footer Link List</div>

  <table cellpadding="0" cellspacing="0" id="tab-design-mobile-footer-list">
    <thead>
      <tr>
         <th>Page</th>
         <th>icone</th>
      </tr>
   </thead>
    <tbody>
    </tbody>
  </table>

</div>

<div id="tab-design-mobile-properties" >
	<div class="ui-state-active ui-corner-top header">
		Widget information
	</div>
	
	<div id="tab-design-mobile-widget-buttons">
		<button id="button-delete-widget-mobile">Delete</button>
		<button id="button-clone-widget-mobile">Clone</button>
	</div>
	<table cellpadding="0" cellspacing="0" id="tab-design-mobile-widget-properties">
		<tbody>
		</tbody>
	</table>
	
	<table cellpadding="0" cellspacing="0" id="tab-design-mobile-design-properties">
		<tbody>
			<!-- TODO a mettre dans le menu on ne gère pas les Design ... 
      <tr>
				<th>Design</th>
				<td><select id="tab-design-mobile-design-list"></select></td>
			</tr>
      dépend de la réslution du device en qui utilise donc à mettre dans le menu avec valeur par défaut par exemple et modifibale mais reste indicatif et non une data du "design" ou "zone"
			<tr> 
				<th>Design width</th>
				<td><input type="text" id="tab-design-mobile-width"></td>
			</tr>
			<tr>
				<th>Design height</th>
				<td><input type="text" id="tab-design-mobile-height"></td>
			</tr> -->
			<tr>
				<th>Page</th>
				<td><select id="tab-design-mobile-zone-list" onchange="designmobile.draw(this.value);"></select></td>
			</tr>
			<tr>
				<th>Back button</th>
				<td><input type="checkbox" id="tab-design-mobile-header-back"></td>
			</tr>
			<tr>
				<th>Title Page</th>
				<td><input type="text" id="tab-design-mobile-header-title" value="Title Page" ></td>
			</tr>
			<tr>
				<th>Footer</th>
				<td><input type="checkbox" id="tab-design-mobile-footer"></td>
			</tr>
			<tr>
				<th>XML source</th>
				<td><button onclick="designmobile.displayXML();">View</button></td>
			</tr>
		</tbody>
	</table>
</div>
