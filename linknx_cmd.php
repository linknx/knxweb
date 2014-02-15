<html>
<head>
<title>Linknx - Exec</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
Aide cf <a href="http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Interacting_with_Linknx">ici</a>
<?php
$address = "127.0.0.1";
$port = 1028;
/*
$_config = (array)simplexml_load_file('include/config.xml'); // conversion en array du fichier xml de configuration
unset($_config['comment']); 
$linknx_host = $_config['linknx_host'];
$linknx_port = $_config['linknx_port'];
*/
if (isset($_REQUEST['address'])) {
  $address = $_REQUEST['address'];
}
if (isset($_REQUEST['port'])) {
  $port = $_REQUEST['port'];
}

function knxsend($fp, $cmd)
{
    $in = "$cmd\n\4";
    fwrite($fp, $in);

    $ret = '';
    $cnt = 0;
    while ($cnt < 1000 && $fp && !feof($fp)) {
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
            //$cmd = stripslashes($_REQUEST['cmd']);
            $cmd = $_REQUEST['cmd'];
            $result = knxsend($fp, $cmd);
        }
    }
	print("<h2>Exec</h2>\n<table border=0>\n");	
	print("<tr><td>Config: Read</td><td>\n"); 
	print("<input type='button' value='All' onclick=\"document.getElementById('cmd').value = '<read><config/></read>'\">\n");
	print("<input type='button' value='Objects' onclick=\"document.getElementById('cmd').value = '<read><config><objects/></config></read>'\">\n");
	print("<input type='button' value='Rules' onclick=\"document.getElementById('cmd').value = '<read><config><rules/></config></read>'\">\n");
	print("<input type='button' value='Services' onclick=\"document.getElementById('cmd').value = '<read><config><services/></config></read>'\">\n");
	print("<input type='button' value='Logging' onclick=\"document.getElementById('cmd').value = '<read><config><logging/></config></read>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Config: Write</td><td>\n"); 
	print("<input type='button' value='All' onclick=\"document.getElementById('cmd').value = '<write><config></config></write>'\">\n");
	print("<input type='button' value='Objects' onclick=\"document.getElementById('cmd').value = '<write><config><objects></objects></config></write>'\">\n");
	print("<input type='button' value='Rules' onclick=\"document.getElementById('cmd').value = '<write><config><rules></rules></config></write>'\">\n");
	print("<input type='button' value='Services' onclick=\"document.getElementById('cmd').value = '<write><config><services></services></config></write>'\">\n");
	print("<input type='button' value='Logging' onclick=\"document.getElementById('cmd').value = '<write><config><logging></logging></config></write>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Read</td><td>\n");
	print("<input type='button' value='All Objects' onclick=\"document.getElementById('cmd').value = '<read><objects/></read>'\">\n");
	print("<input type='button' value='Calendar' onclick=\"document.getElementById('cmd').value = '<read><calendar day=\'".date(d)."\' month=\'".date(m)."\' year=\'".date(Y)."\' /></read>'\">\n");
	print("<input type='button' value='Version' onclick=\"document.getElementById('cmd').value = '<read><version/></read>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Write</td><td>\n");
	print("<input type='button' value='Object' onclick=\"document.getElementById('cmd').value = '<write><object id=\'\' value=\'\'/></write>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Status: </td><td>\n"); 
	print("<input type='button' value='All' onclick=\"document.getElementById('cmd').value = '<read><status/></read>'\">\n");
	print("<input type='button' value='Timers' onclick=\"document.getElementById('cmd').value = '<read><status><timers/></status></read>'\">\n");
	print("<input type='button' value='Rules' onclick=\"document.getElementById('cmd').value = '<read><status><rules/></status></read>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Execute</td><td>\n"); 
	print("<input type='button' value='Action' onclick=\"document.getElementById('cmd').value = '<execute><action .../><action .../></execute>'\">\n");
	print("<input type='button' value='Rule-Actions' onclick=\"document.getElementById('cmd').value = '<execute><rule-actions id=  list=true/false /></execute>'\">\n");
	print("</td></tr>\n");
	print("<tr><td>Admin: </td><td>\n"); 
    $date = date('Y-m-d');
	print("<input type='button' value='Save' onclick=\"document.getElementById('cmd').value = '<admin><save file=\'config-$date.xml\'/></admin>'\">\n");
	print("<input type='button' value='Notification register' onclick=\"document.getElementById('cmd').value = '<admin><notification><register id=\'dim_value_salon\' /></notification></admin>'\">\n");
	print("<input type='button' value='Notification unregister' onclick=\"document.getElementById('cmd').value = '<admin><notification><unregister id=\'dim_value_salon\' /></notification></admin>'\">\n");
	print("<input type='button' value='Notification registerall' onclick=\"document.getElementById('cmd').value = '<admin><notification><registerall/></notification></admin>'\">\n");
	print("<input type='button' value='Notification unregisterall' onclick=\"document.getElementById('cmd').value = '<admin><notification><unregisterall/></notification></admin>'\">\n");
	print("</td></tr>\n");
	print("<tr><td colspan='2'>\n"); 
	print("<form action='' method='POST'>\n");
	print("<textarea id='cmd' name='cmd' rows='20' wrap='off' style='width:100%;'>$cmd</textarea><br>\n");//cols='100'
	print("<input type='hidden' name='action' value='send'>\n");
	print("<input type='submit' value='Exec'>\n");
	print("<tr><td>Param: </td></tr><tr><td></td><td>\n");
	print("Adress : <input type='text' name='address' size='20' value='$address' ></input><br />\n");
	print("Port : <input type='text' name='port' size='10'  value='$port'></input><br />\n");
	print("</td></tr>\n");
	print("</form><br>\n");
	print("</table>\n");

    if ($result != "") {
        print("<h2>Result</h2>\n<table border=1>\n");
        print("<textarea name='result' style='width:100%;' rows='30' wrap='off'>$result</textarea><br>\n");
        print("</table>\n");
    }
    
fclose($fp);
}
?>

<hr>
</body>
</html>