<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtmlmobile12.dtd">
<html>
<head>
  <title>KnxWebMobile</title>
     
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <!--<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=0.25" />--> 
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <link rel="apple-touch-icon" href="images/logo.png" />
  <link rel="apple-touch-icon-precomposed" href="images/logo.png" />
  <link rel="apple-touch-startup-image" href="images/logo.png" />
		
	<meta http-equiv="pragma" content="no-cache" >
	<meta http-equiv="cache-control" content="no-cache, must-revalidate" >
	
  <meta name="HandheldFriendly" content="true" />
  <meta name="format-detection" content="telephone=no">
		
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
  /* pour les tests on affiche le cadre autour des "fieldcontain" sur passage de la souris */
  .ui-field-contain:hover {
    border : 1px dotted black;
  }
  .selected {
    border : 1px dotted red;
  }
  body {
    /*-webkit-touch-callout:none;*/
  }
  </style>

</head>
<body>
  <div data-role="page" id="home" data-add-back-btn="true">  
    <div data-role="header" class="header"><h1>KnxWebMobile</h1><a href="#home" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a></div> 
    <div data-role="content" class="content">
      <ul data-role="listview" data-inset="true" >
        <li data-role="list-divider">divider</li>
        <li><a href="#newPage">newPage</a></li>
      </ul>
     </div><!-- /content -->
    <div data-role="footer" class="ui-bar" class="footer">
      <h4>Page Footer</h4>
    </div>
  </div><!-- /page -->
  <div data-role="page" id="newPage" data-add-back-btn="true">  
    <div data-role="header" class="header"><h1>Titre Page</h1><a href="#home" data-icon="home" class="ui-btn-right" data-iconpos="notext">Home</a></div> 
    <div data-role="content" class="content"></div>
    <!-- Bar Bas de page avec bouttons --> 
    <div data-role="footer" class="ui-bar" class="footer" >
      <div data-role="navbar" data-iconpos="top" class="navbar">
        <ul></ul>
      </div>
    </div>
  </div><!-- /page -->
</body>
</html>