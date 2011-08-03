<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache, must-revalidate" />
		
		<title>{$_config['title']}</title>
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
