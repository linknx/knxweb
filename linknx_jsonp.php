<?php
header('cache-control: no-cache');
header("Access-Control-Allow-Origin: http://www.knxweb.fr");
header('Content-Type: application/javascript; charset=utf-8');
error_reporting(0);
$version = "0.3";

$req_xml = "<read><objects/></read>";
if (isset($_GET["xml"])) {
  $req_xml = $_GET["xml"];
} else if (isset($_POST["xml"])) {
  $req_xml = $_POST["xml"];
}
if (isset($_GET["jsonp"])) {
  $func_jsonp = $_GET["jsonp"];
} else $func_jsonp = '';

$xmlresponse = false;
if (isset($_GET["xmlresponse"])) {
  $xmlresponse = $_GET["xmlresponse"];
}

$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);

$max_result_lines = 1000;
if ($_config['max_result_lines']) { $max_result_lines = intval($_config['max_result_lines']); }
$xml = '';

$sock = fsockopen($_config['linknx_host'], $_config['linknx_port'], $errno, $errstr, 30);
if (!$sock)
		$xml = "<response status='error'>Unable to connect to linknx</response>\n";
else {
	//fwrite($sock, file_get_contents("php://input") . chr(4));
  fwrite($sock, $req_xml . chr(4));
	$xml = '';
	$cnt = 0;
	while ($cnt < $max_result_lines && $sock && !feof($sock)) {
		$xml .= fgets($sock, 128);
		$c = fgetc($sock);
		if ($c == "\4")	break;
		$xml .= $c;
		$cnt++;
	}
	fclose($sock);
}

function xmlToArray($xml, $options = array()) {
    $defaults = array(
        'namespaceSeparator' => ':',//you may want this to be something other than a colon
        'attributePrefix' => '', //'@'  //to distinguish between attributes and nodes with the same name
        'alwaysArray' => array(),   //array of xml tag names which should always become arrays
        'autoArray' => true,        //only create arrays for tags which appear more than once
        'textContent' => '$',       //key used for the text content of elements
        'autoText' => true,         //skip textContent key if node has no attributes or child nodes
        'keySearch' => false,       //optional search and replace on tag and attribute names
        'keyReplace' => false       //replace values for above search values (as passed to str_replace())
    );
    $options = array_merge($defaults, $options);
    $namespaces = $xml->getDocNamespaces();
    $namespaces[''] = null; //add base (empty) namespace

    //get attributes from all namespaces
    $attributesArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->attributes($namespace) as $attributeName => $attribute) {
            //replace characters in attribute name
            if ($options['keySearch']) $attributeName =
                    str_replace($options['keySearch'], $options['keyReplace'], $attributeName);
            $attributeKey = $options['attributePrefix']
                    . ($prefix ? $prefix . $options['namespaceSeparator'] : '')
                    . $attributeName;
            $attributesArray[$attributeKey] = (string)$attribute;
        }
    }

    //get child nodes from all namespaces
    $tagsArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->children($namespace) as $childXml) {
            //recurse into child nodes
            $childArray = xmlToArray($childXml, $options);
            list($childTagName, $childProperties) = each($childArray);

            //replace characters in tag name
            if ($options['keySearch']) $childTagName =
                    str_replace($options['keySearch'], $options['keyReplace'], $childTagName);
            //add namespace prefix, if any
            if ($prefix) $childTagName = $prefix . $options['namespaceSeparator'] . $childTagName;

            if (!isset($tagsArray[$childTagName])) {
                //only entry with this key
                //test if tags of this type should always be arrays, no matter the element count
                $tagsArray[$childTagName] =
                        in_array($childTagName, $options['alwaysArray']) || !$options['autoArray']
                        ? array($childProperties) : $childProperties;
            } elseif (
                is_array($tagsArray[$childTagName]) && array_keys($tagsArray[$childTagName])
                === range(0, count($tagsArray[$childTagName]) - 1)
            ) {
                //key already exists and is integer indexed array
                $tagsArray[$childTagName][] = $childProperties;
            } else {
                //key exists so convert to integer indexed array with previous value in position 0
                $tagsArray[$childTagName] = array($tagsArray[$childTagName], $childProperties);
            }
        }
    }

    //get text content of node
    $textContentArray = array();
    $plainText = trim((string)$xml);
    if ($plainText !== '') $textContentArray[$options['textContent']] = $plainText;

    //stick it all together
    $propertiesArray = !$options['autoText'] || $attributesArray || $tagsArray || ($plainText === '')
            ? array_merge($attributesArray, $tagsArray, $textContentArray) : $plainText;

    //return node as array
    return array(
        $xml->getName() => $propertiesArray
    );
}

$xml = simplexml_load_string($xml);

$arrayData = xmlToArray($xml);
if ($func_jsonp == '') {
  if ($xmlresponse != false)
    echo "xml_data = '" . $xml . "';\n";
  else
    echo "json_data = " . json_encode($arrayData) . ";\n";
} else {
  if ($xmlresponse != false)
    echo $func_jsonp . "('" . $xml . "', '" . $req_xml . "' );\n";
  else
    echo $func_jsonp . "(". json_encode($arrayData) . ", '" . $req_xml . "' );\n";
}


?>