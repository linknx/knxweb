<html>
<head>
<title>Linknx - Exec</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
<?php
$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']);
$address = $_config['linknx_host'];
$port = $_config['linknx_port'];
$max_lines = intval($_config['max_result_lines']);
function knxsend($fp, $cmd)
{
  global $max_lines;
  $in = "$cmd\n\4";
  fwrite($fp, $in);

  $ret = '';
  $cnt = 0;
  while ($cnt < $max_lines && $fp && !feof($fp)) {
    $ret .= fgets($fp, 128);
    $c = fgetc($fp);
    if ($c == "\4") {
        return $ret;
    }
    $ret .= $c;
    $cnt++;
  }
  return $ret;
}

$fp = fsockopen($address, $port, $errno, $errstr, 30);
if (!$fp) {
    echo "$errstr ($errno)<br />\n";
}
else {
  $cmd="";
  $result="";
  if (isset($_REQUEST['action'])) {
    $action = $_REQUEST['action'];
    if ($action == 'send') {
      $cmd = $_REQUEST['cmd'];
      $result = knxsend($fp, $cmd);
    }
  }
	print("<table style='width:50%;float: left;' border=0>");
	print("<tr><td>Config: 'Read'</td><td>\n");
	print("<input type='button' value='All' onclick=\"document.getElementById('cmd').value = '<read><config/></read>'\">\n");
	print("<input type='button' value='Objects' onclick=\"document.getElementById('cmd').value = '<read><config><objects/></config></read>'\">\n");
	print("<input type='button' value='Rules' onclick=\"document.getElementById('cmd').value = '<read><config><rules/></config></read>'\">\n");
	print("<input type='button' value='Services' onclick=\"document.getElementById('cmd').value = '<read><config><services/></config></read>'\">\n");
	print("<input type='button' value='Logging' onclick=\"document.getElementById('cmd').value = '<read><config><logging/></config></read>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Config: 'Write'</td><td>\n");
	print("<input type='button' value='All' onclick=\"document.getElementById('cmd').value = '<write><config></config></write>'\">\n");
	print("<input type='button' value='Objects' onclick=\"document.getElementById('cmd').value = '<write><config><objects></objects></config></write>'\">\n");
	print("<input type='button' value='Rules' onclick=\"document.getElementById('cmd').value = '<write><config><rules></rules></config></write>'\">\n");
	print("<input type='button' value='Services' onclick=\"document.getElementById('cmd').value = '<write><config><services></services></config></write>'\">\n");
	print("<input type='button' value='Logging' onclick=\"document.getElementById('cmd').value = '<write><config><logging></logging></config></write>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Read: </td><td>\n");
	print("<input type='button' value='All Objects' onclick=\"document.getElementById('cmd').value = '<read><objects/></read>'\">\n");
	print("<input type='button' value='Calendar' onclick=\"document.getElementById('cmd').value = '<read><calendar day=\'".date(d)."\' month=\'".date(m)."\' year=\'".date(Y)."\' /></read>'\">\n");
	print("<input type='button' value='Version' onclick=\"document.getElementById('cmd').value = '<read><version/></read>'\">\n");
	print("</td></tr>\n");
	print("</table>\n");
	print("<table style='width:50%;float: left;' border=0>");
	print("<tr><td>Write: </td><td>\n");
	print("<input type='button' value='Object' onclick=\"document.getElementById('cmd').value = '<write><object id=\'\' value=\'\'/></write>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Status: </td><td>\n");
	print("<input type='button' value='All' onclick=\"document.getElementById('cmd').value = '<read><status/></read>'\">\n");
	print("<input type='button' value='Timers' onclick=\"document.getElementById('cmd').value = '<read><status><timers/></status></read>'\">\n");
	print("<input type='button' value='Rules' onclick=\"document.getElementById('cmd').value = '<read><status><rules/></status></read>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Execute: </td><td>\n");
	print("<input type='button' value='Action' onclick=\"document.getElementById('cmd').value = '<execute><action .../><action .../></execute>'\">\n");
	print("<input type='button' value='Rule-Actions' onclick=\"document.getElementById('cmd').value = '<execute><rule-actions id=\'\'  list=\'true/false\' /></execute>'\">\n");
	print("</td></tr>\n");
	print("</table><br>\n");
	print("<table style='width:100%;float: left;' border=0>");
	print("<tr><td>Admin: </td><td>\n");
	print("<input type='button' value='Save config' onclick=\"document.getElementById('cmd').value = '<admin><save/></admin>'\">\n");
    $date = date('Y-m-d');
  print("<input type='button' value='Save config to an other file' onclick=\"document.getElementById('cmd').value = '<admin><save file=\'config-$date.xml\'/></admin>'\">\n");
	print("<input type='button' value='Notification register' onclick=\"document.getElementById('cmd').value = '<admin><notification><register id=\'\' /></notification></admin>'\">\n");
	print("<input type='button' value='Notification unregister' onclick=\"document.getElementById('cmd').value = '<admin><notification><unregister id=\'\' /></notification></admin>'\">\n");
	print("<input type='button' value='Notification registerall' onclick=\"document.getElementById('cmd').value = '<admin><notification><registerall/></notification></admin>'\">\n");
	print("<input type='button' value='Notification unregisterall' onclick=\"document.getElementById('cmd').value = '<admin><notification><unregisterall/></notification></admin>'\">\n");
	print("</td></tr>\n");

	$config=simplexml_load_string(knxsend($fp, "<read><config/></read>"));
  if ($config) {
    print("<tr><td colspan='2' align='center'>\n");
?>
<script>
function adddata(data) {
  //if (data != "") document.getElementById('cmd').value = document.getElementById('cmd').value + '\n' + data;
  insertAtCursor(document.getElementById('cmd'),data);
  return true;
}
function insertAtCursor(myField, myValue) {
  //IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  }
  //MOZILLA and others
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
  } else {
    myField.value += myValue;
  }
}

</script>
<?php
    echo " Add an Object : <select onchange=\"adddata(this.value);this.value='';\" >";
    echo '<option value="">--== Select an Object ==--</option>';
    foreach($config->config->objects->object as $object) {
      //foreach($object->attributes() as $var => $value) { echo "<br>".$var . "=". (string)$value; }
      //echo "<br>".$object." (".$object->attributes()->id.")";
      echo '<option value="'.$object->attributes()->id.'">'.(((string)$object)?(string)$object:$object->attributes()->id)." (" .$object->attributes()->type.")</option>";
    }
    echo "</select>";
    echo " Add an Rule : <select onchange=\"adddata(this.value);this.value='';\" >";
    echo '<option value="">--== Select an Rule ==--</option>';
    foreach($config->config->rules->rule as $rule) {
      echo '<option value="'.$rule->attributes()->id.'">'.(($rule->attributes()->description)?$rule->attributes()->description:$rule->attributes()->id)."</option>";
    }
    echo "</select>";
    echo " Add an IO-Port : <select onchange=\"adddata(this.value);this.value='';\" >";
    echo '<option value="">--== Select an IO-Port ==--</option>';
    if ($config->config->services->ioports) {
      foreach($config->config->services->ioports->ioport as $ioport) {
        echo '<option value="'.$ioport->attributes()->id.'">'.$ioport->attributes()->id."</option>";
      }
    }
    echo "</select>";

    print("</td></tr>\n");
  }

	print("<tr><td colspan='2'>\n");
	print("<form action='' method='POST'>\n");
	print("<textarea id='cmd' name='cmd' rows='20' wrap='off' style='width:100%;' >$cmd</textarea><br>\n");//cols='100'
	print("<input type='hidden' name='action' value='send'>\n");
	print("<input type='submit' style='zoom: 2; padding: 5px;margin: 5px; color: red;font-weight : bold;' value='Exec'>\n");
	print("</td></tr>\n");
	print("</form>\n");
	print("</table>\n");

    if ($result != "") {
        print("<b>Result</b>\n");
        print("<textarea name='result' style='width:100%;' rows='30' wrap='off'>$result</textarea>\n");
    }

fclose($fp);


	print("<hr>Linknx Address : '$address' Port : '$port'");

}
?>

<hr>
Help cf <a href="http://sourceforge.net/p/linknx/wiki/Interacting_with_Linknx/">ici</a>
</body>
</html>