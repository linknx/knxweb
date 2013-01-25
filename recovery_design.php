<?php

  header('Content-Type: text/html; charset=utf-8'); 

  $send = isset($_POST['send'])?$_POST['send']:'none';

  $dossier_image = isset($_POST['dossier_image'])?$_POST['dossier_image']:"reprise"; // dossier dans knxweb2/picture/
  
  $design = isset($_POST['design'])?$_POST['design']:'default';
  $version_knxwebOld = isset($_POST['version_knxwebOld'])?$_POST['version_knxwebOld']:"design_knxweb1_2";//'design_old';
  $version_knxwebNew = isset($_POST['version_knxwebNew'])?$_POST['version_knxwebNew']:"design";

  $subpage_dimmer = isset($_POST['subpage_dimmer'])?$_POST['subpage_dimmer']:"old_dimmer22";
  $subpage_dimmer2 = isset($_POST['subpage_dimmer2'])?$_POST['subpage_dimmer2']:"old_dimmer2";
  
  $subpage_thermostat = isset($_POST['subpage_thermostat'])?$_POST['subpage_thermostat']:"old_thermostat";
  $subpage_thermostat2 = isset($_POST['subpage_thermostat2'])?$_POST['subpage_thermostat2']:"old_thermostat2";
  $subpage_thermostat3 = isset($_POST['subpage_thermostat3'])?$_POST['subpage_thermostat3']:"old_thermostat3";

  $subpage_camera = isset($_POST['subpage_camera'])?$_POST['subpage_camera']:"camera";

  $width_design = isset($_POST['width_design'])?$_POST['width_design']:1280;
  $height_design = isset($_POST['height_design'])?$_POST['height_design']:1024;

/*
switch => New switch
switch2 => New switch (short/long) => non géré dans knxweb2 ...
value => New value input
multi => New multiswitch
dimmer => New dimmer
dimmer2 => New dimmer2
scale => New scale
thermostat => New thermostat
thermostat2 => New thermostat II
thermostat3 => New thermostat III
goto => New goto
camera => New camera
text => New text
html => New HTML block
hslider => New slider
send => New Send value
temp => New temperature
*/
?>

<style>
caption {
  background-color: #DEEDF7;
  border: 1px solid #444444;
  padding: 4px;
  color: #444444;
  font-weight: bold;
}
</style>
<form method="POST">
  <input type="hidden" name="send" value="yes">
<table align="center" style="border: 1px solid #000000;">
    <caption> Convert design xml </caption>
    <tbody>
      <tr class="odd">
        <th>Dossier Image (create the dir in knxweb2/picture/) </th>
        <td><input type="text" name="dossier_image" value="<?php echo $dossier_image;?>" ></td>
      </tr>
      <tr class="even">
        <th>Design </th>
        <td><input type="text" name="design" value="<?php echo $design;?>" ></td>
      </tr>
      <tr class="odd">
        <th>Xml Old version </th>
        <td><input type="text" name="version_knxwebOld" value="<?php echo $version_knxwebOld;?>" ></td>
      </tr>
      <tr class="even">
        <th>New version </th>
        <td><input type="text" name="version_knxwebNew" value="<?php echo $version_knxwebNew;?>" ></td>
      </tr>
      <tr class="odd">
        <th>width design </th>
        <td><input type="text" name="width_design" value="<?php echo $width_design;?>" ></td>
      </tr>
      <tr class="even">
        <th>height design </th>
        <td><input type="text" name="height_design" value="<?php echo $height_design;?>" ></td>
      </tr>
    </tbody>
  </table>
<br />

<table align="center" style="border: 1px solid #000000;">
  <tbody>
    <tr>
      <td align="center" colspan="2">
        <input type="submit" value="Convert" style="background-color: #DEEDF7;color: #444444;font-weight: bold;" >
      </td>
    </tr>
  </tbody>
</table>

<br />
<table align="center" style="border: 1px solid #000000;">
<caption> Convert Widgets "Old" to "New"</caption>
<!--
<thead>
<tr>
  <td>
  Old Componant in KnxWeb version <= 0.7
  </td>
  <td>
  Convert in new Widget in KnxWeb version > 0.9
  </td>
</tr>
</thead>
-->
<tbody>
<tr>
  <td>
  switch => New switch
  </td>
  <td>
  Button
  </td>
</tr>
<tr>
  <td>
  switch2 => New switch (short/long)
  </td>
  <td>
  No exist (use the widget "switchshortlong" on cvs)
  </td>
</tr>
<tr>
  <td>
  value => New value input
  </td>
  <td>
  Send value
  </td>
</tr>
<tr>
  <td>
  multi => New multiswitch
  </td>
  <td>
  Not in this version
  </td>
</tr>
<tr>
  <td>
  dimmer => New dimmer
  </td>
  <td>
  Subpage : <input type="text" name="subpage_dimmer" value="<?php echo $subpage_dimmer;?>" >
  </td>
  <td>
  Create Subpage <input type="checkbox" name="subpage_dimmer_create" checked="1">
  </td>
</tr>
<!--
      <tr class="odd">
        <th>Name of the subpage for Dimmer widget </th>
        <td><input type="text" name="subpage_dimmer" value="<?php echo $subpage_dimmer;?>" ></td>
      </tr>
-->
<tr>
  <td>
  dimmer2 => New dimmer2
  </td>
  <td>
  A Slider and a Subpage : <input type="text" name="subpage_dimmer2" value="<?php echo $subpage_dimmer2;?>" >
  </td>
  <td>
  Create Subpage <input type="checkbox" name="subpage_dimmer2_create" checked="1">
  </td>
</tr>
<tr>
  <td>
  scale => New scale
  </td>
  <td>
  Slider
  </td>
</tr>
<tr>
  <td>
  thermostat => New thermostat
  </td>
  <td>
  Subpage : <input type="text" name="subpage_thermostat" value="<?php echo $subpage_thermostat;?>" >  TODO ...
  </td>
  <td>
  Create Subpage <input type="checkbox" name="subpage_thermostat_create" checked="1">
  </td>
</tr>
<!--
      <tr class="even">
        <th>Name of the subpage for Thermostat widget </th>
        <td><input type="text" name="subpage_thermostat" value="<?php echo $subpage_thermostat;?>" ></td>
      </tr>
-->
<tr>
  <td>
  thermostat2 => New thermostat II
  </td>
  <td>
  Subpage : <input type="text" name="subpage_thermostat2" value="<?php echo $subpage_thermostat2;?>" >  TODO ...
  </td>
  <td>
  Create Subpage <input type="checkbox" name="subpage_thermostat2_create" checked="1">
  </td>
</tr>
<tr>
  <td>
  thermostat3 => New thermostat III
  </td>
  <td>
  Subpage : <input type="text" name="subpage_thermostat3" value="<?php echo $subpage_thermostat3;?>" >  TODO ...
  </td>
  <td>
  Create Subpage <input type="checkbox" name="subpage_thermostat3_create" checked="1">
  </td>
</tr>
<tr>
  <td>
  goto => New goto
  </td>
  <td>
  Button
  </td>
</tr>
<tr>
  <td>
  camera => New camera
  </td>
  <td>
  Camera <input type="text" name="subpage_camera" value="<?php echo $subpage_camera;?>" >
  <br />=> TODO faire une subpage avec un bouton pour "ouvrir" la cam en "dialog"
  </td>
  <td>
  Create Subpage <input type="checkbox" name="subpage_camera_create" checked="1">
  </td>
</tr>
<tr>
  <td>
  text => New text
  </td>
  <td>
  text
  </td>
</tr>
<tr>
  <td>
  html => New HTML block
  </td>
  <td>
  html
  </td>
</tr>
<tr>
  <td>
  hslider => New slider
  </td>
  <td>
  No exist (subpage, area ?)
  </td>
</tr>
<tr>
  <td>
  send => New Send value
  </td>
  <td>
  No exist (Button ?)
  </td>
</tr>
<tr>
  <td>
  temp => New temperature
  </td>
  <td>
  temp
  </td>
</tr>
</tbody>
</table>

</form>

<?php 

if ($send =="yes") { 

?>


<table align="center" style="border: 1px solid #000000;">
  <tbody>
    <tr>
      <td align="center" style="width: 200px;">
        <a href="setup.php">click here</a> to configure knxweb
      </td>
      <td align="center" style="width: 200px;">
        Or <a href="design_view.php?design=<?php echo $design; ?>&version=<?php echo $version_knxwebNew; ?>">here</a> for view Desgin
      </td>
    </tr>
  </tbody>
</table>

<?php
 
  if (!file_exists('design/' . $design.'/'.$version_knxwebOld.'.xml'))
  {
    //header('Location: check_install.php');
    echo " pas de design  : design/" . $design.'/'.$version_knxwebOld.'.xml';
    die;
  }

  $_design = (array)simplexml_load_file('design/' . $design.'/'.$version_knxwebOld.'.xml'); // conversion en array du fichier xml de configuration

  unset($_design['comment']); // enleve les commentaires
  $i=0;

/* cf. http://php.net/manual/fr/function.simplexml-load-file.php */
$xml = "";
foreach($_design as $key0 => $value){
  //echo "1 zones ..[$key0] => $value";
  $xml = $xml . "<$key0";
  foreach($value->attributes() as $attributeskey0 => $attributesvalue1){
  //echo "__[$attributeskey0] = $attributesvalue1";
  if ($attributeskey0 == "img") {
    $xml = $xml . " " . $attributeskey0 . '="Background/' . $attributesvalue1 . '"';
  }
  else $xml = $xml . " " . $attributeskey0 . '="' . $attributesvalue1 . '"';
  }
  $xml = $xml . ">";
  ////////////////////////////////////////////////
  foreach($value as $key => $value2){
    $xml = $xml . "<$key";
    foreach($value2->attributes() as $attributeskey => $attributesvalue2){
      if ($attributeskey == "img") {
        if (file_exists('pictures/Background/' . $attributesvalue2)) {
          $xml = $xml . " " . $attributeskey . '="Background/' . $attributesvalue2 . '"';
          $infos_image = @getImageSize('pictures/Background/' . $attributesvalue2);
        } else {                                                      
          $xml = $xml . " " . $attributeskey . '="pictures/' . $dossier_image . '/' .  $attributesvalue2 . '"';
          $infos_image = @getImageSize('pictures/' . $dossier_image . '/' . $attributesvalue2);
        }
        if ( $width_design < (int)$infos_image[0]) $width_design = (int)$infos_image[0];
        if ( $height_design < (int)$infos_image[1]) $height_design = (int)$infos_image[1];
      } else $xml = $xml . " " . $attributeskey . '="' . $attributesvalue2 . '"';
    }
    $xml = $xml . ">";
    ////////////////////////////////////////////////
    foreach($value2 as $key2 => $value3){
      $arr = $value3->attributes();
      $control = "";
      if ($arr['type'] == "switch" || $arr['type'] == "switch3") {
        $width = 32;
        $height = 32;
        $control = '<control type="button" ';
        $control = $control . 'name="' . $arr['label'] . '" '; 
        if ($arr['img'] == "custom" ) {
          $control = $control . 'picture="' . $dossier_image . '/' . $arr['off'] . '" picture-active="' . $dossier_image . '/' . $arr['on'] . '" ';
          $infos_image = @getImageSize('pictures/' . $dossier_image . '/' . $arr['off']);
// '@' est placé devant la fonction getImageSize()pour empecher l'affichage
// des erreurs si l'image est absente.
          $width = $infos_image[0];
          $height = $infos_image[1];
        } else if ($arr['img'] == "pump" ) $control = $control . 'picture="32x32_pump_off.png" picture-active="32x32_pump_on.png" ';
        else if ($arr['img'] == "outlet" ) $control = $control . 'picture="32x32_priseOff.png" picture-active="32x32_priseOn.png" ';
        //else if ($arr['img'] == "fan" ) $control = $control . 'picture="32x32_fan_off.png" picture-active="32x32_fan_on.png" ';
        else if ($arr['img'] == "blinds" ) $control = $control . 'picture="32x32_blinds_up.png" picture-active="32x32_blinds_down.png" ';
        else $control = $control . 'picture="32x32_ampouleOff.png" picture-active="32x32_ampouleOn.png" ';
        $control = $control . 'text="" size="12" color="#000000" align="" text-padding="0" ';
        if ($arr['type'] == "switch3") $control = $control . 'confirm="yes" '; 
        else $control = $control . 'confirm="no" ';
        $control = $control . 'feedback-object="' . $arr['object'] . '" feedback-compare="eq" feedback-value="on" '; 
        $control = $control . 'inactive-goto="" inactive-action="" active-goto="" active-action="" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" '; 
        $control = $control . 'width="' . $width . '" height="' . $height . '" '; 
        $control = $control . 'id="' . $arr['label'] . '" > ';
        $control = $control . '<actionlist id="inactive-action"><action type="set-value" id="' . $arr['object'] . '" value="on"/></actionlist> ';
        $control = $control . '<actionlist id="active-action"><action type="set-value" id="' . $arr['object'] . '" value="off"/></actionlist> ';
        $control = $control . '</control>';
      } else if ($arr['type'] == "goto") {
/* new
<control type="button" picture="" picture-active="" display-picture="no" text="My button" size="12" color="#000000" align="" 
 text-padding="0" confirm="no" validation-code="" feedback-object="" feedback-compare="eq" feedback-value="" inactive-goto="2" 
 inactive-action="" active-goto="" active-action="" x="104" y="89" width="32" height="32" />
*/
/* old
<control type="goto" label="Scenario" target="scenario" img="custom" imgfile="Scenario.png" x="30" y="540"/>
*/
        $width = 32;
        $height = 32;
        $control = '<control type="button" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        if ($arr['img'] == "custom" ) {
          $control = $control . 'picture="' . $dossier_image . '/' . $arr['imgfile'] . '" picture-active="" ';
          $infos_image = @getImageSize('pictures/' . $dossier_image . '/' . $arr['imgfile']);
// '@' est placé devant la fonction getImageSize()pour empecher l'affichage
// des erreurs si l'image est absente.
          $width = $infos_image[0];
          $height = $infos_image[1];
        } else if ($arr['img'] == "left" ) $control = $control . 'picture="32x32_flecheLeft2.png" picture-active="" ';
        else if ($arr['img'] == "right" ) $control = $control . 'picture="32x32_flecheRight2.png" picture-active="" ';
        else if ($arr['img'] == "upper" ) $control = $control . 'picture="32x32_flecheUp2.png" picture-active="" ';
        else if ($arr['img'] == "lower" ) $control = $control . 'picture="32x32_flecheDown2.png" picture-active="" ';
        else $control = $control . 'picture="32x32_ampouleOff.png" picture-active="" ';
        $control = $control . 'text="" size="12" color="#000000" align="" text-padding="0" confirm="no" '; 
        $control = $control . 'feedback-object="" feedback-compare="eq" feedback-value="" '; 
        $control = $control . 'inactive-goto="' . $arr['target'] . '" inactive-action="" active-goto="" active-action="" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ) . '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="' . $width . '" height="' . $height . '" />';
      } else if ($arr['type'] == "text") {
/* new
<control type="text" text="Date : $3/$2/$1" size="20" color="#cc6e1e" bgcolor="" align="" style="" 
object="Date" pattern="(\d+)-(\d+)-(\d+)" x="280" y="300" width="193" height="30" />
*/
/* old
<control type="text" label="Scenario" style="" x="95" y="550"/>
<control type="text" label="" object="pourc_vannes_sejour" format="$1%" x="262" y="714"/>
<control type="text" label="" style="" format="Date : $3/$2/$1" object="Date" pattern="(\d+)-(\d+)-(\d+)" x="30" y="500"/>
*/
        $control = '<control type="text" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        $control = $control . 'text="' . (($arr['format'])?$arr['format']:$arr['label']) . '" size="12" color="#000000" bgcolor="" align="" style="' . $arr['style'] . 'white-space: nowrap;" ';
        $control = $control . 'object="' . $arr['object'] . '" pattern="' . (($arr['pattern'])?$arr['pattern']:"(.*)") . '" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="' . $arr['width'] . '" height="' . $arr['height'] . '" />';
      } else if ($arr['type'] == "html") {
/* new
<control type="html" html="code" x="20" y="20" width="32" height="32" />
*/
/* old
<control type="html" label="afficheSSol" x="34" y="74"><![CDATA[
  <script type="text/javascript">afficheSSol();</script>
]]></control>
*/
        $control = '<control type="html" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        //$control = $control . 'html="' . $value3 . '" ';  // TODO à améliorer html="<![CDATA[' . $value3 . ']]>"
        //$control = $control . 'html="TODO..." ';  // TODO à améliorer  
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="32" height="32" >';
        $control = $control . '<![CDATA[' . $value3 . ']]>';
        $control = $control . '</control>';
      } else if ($arr['type'] == "dimmer") {
/* new
<control type="subpage" view_mode="" hidetitledialog="false" picture-dialog="" subpage="domovea_blind2" x="278" y="53" title="volet salon" footer="volet salon" picture="" object_status="envoi_position_volet_Salon_Baie"/>
<control type="subpage" view_mode="" hidetitledialog="false" picture-dialog="" subpage="dimmer" x="63" y="40" />



  <subpage name="old_dimmer" width="32" height="96" bgcolor="#999999">
    <parameters>
      <parameter id="dim" label="Dimmer" type="object"/>
      <parameter id="switch" label="switch" type="object"/>
      <parameter id="value" label="Value" type="object"/>
    </parameters>
    <controls>
      <control type="slider" slider-color="#FFFF00" slider-picture="" translatepicture="false" background-picture="" border="false" border-color="#000000" orientation="vertical" position="right_bottom" min="0" max="255" actionstop="true" actionslide="" feedback-object="_value" command-object="" slidestop-action="" slide-action="" x="0" y="0" width="32" height="96" undefined="32"/>
      <control type="button" picture="32x32_ampouleOff.png" picture-active="32x32_ampouleOn.png" text="" size="12" color="#000000" align="default" text-padding="0" feedback-object="_switch" feedback-compare="eq" feedback-value="on" inactive-goto="" inactive-action="" active-goto="" active-action="" x="0" y="0" width="32" height="32" undefined="32">
        <actionlist id="inactive-action">
          <action type="set-value" id="_switch" value="on"/>
        </actionlist>
        <actionlist id="active-action">
          <action type="set-value" id="_switch" value="off"/>
        </actionlist>
      </control>
      <control type="button" picture="32x32_plus.png" picture-active="" text="" size="12" color="#000000" align="default" text-padding="0" feedback-object="" feedback-compare="eq" feedback-value="" inactive-goto="" inactive-action="" active-goto="" active-action="" x="0" y="32" width="32" height="32" undefined="0">
        <actionlist id="inactive-action">
          <action type="set-value" id="_dim" value="up:2"/>
          <action type="set-value" id="_dim" value="stop" delay="1s"/>
        </actionlist>
      </control>
      <control type="button" picture="32x32_moins.png" picture-active="" text="" size="12" color="#000000" align="default" text-padding="0" feedback-object="" feedback-compare="eq" feedback-value="" inactive-goto="" inactive-action="" active-goto="" active-action="" x="0" y="64" width="32" height="32" undefined="0">
        <actionlist id="inactive-action">
          <action type="set-value" id="_dim" value="down:2"/>
          <action type="set-value" id="_dim" value="stop" delay="1s"/>
        </actionlist>
      </control>
    </controls>
  </subpage>


*/
/* old
<control type="dimmer" label="Cuisine" dim="dim_Cuisine" switch="ecl_Cuisine" value="dim_val_Cuisine" x="689" y="408"/>
*/
        $control = '<control type="subpage" subpage="' . $subpage_dimmer . '" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        $control = $control . 'view_mode="" hidetitledialog="false" picture-dialog="" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'dim="' . $arr['dim'] . '" ';
        $control = $control . 'switch="' . $arr['switch'] . '" ';
        $control = $control . 'value="' . $arr['value'] . '" ';
        $control = $control . ' />';
      } else if ($arr['type'] == "dimmer2") {
/* new
<control type="subpage" view_mode="" hidetitledialog="false" picture-dialog="" subpage="dimmer" x="63" y="40" />
<control type="subpage" view_mode="hideshow" hidetitledialog="true" picture-dialog="32x32_vide.png" subpage="old_dimmer2" x="20" y="20" value="" name="" desc=""></control>
*/
/* old
<control type="dimmer2" label="volet Sejour" dim="envoi_position_volet_sejour" switch="volet_onoff_Sejour" value="volet_Sejour2" img="blinds" x="762" y="805" />
*/
        $control = '<control type="slider" ';
        $control = $control . 'slider-color="#000000" name="' . $arr['label'] . '" desc="' . $arr['label'] . '" ';
        if ($arr['img'] == "blinds" ) $control = $control . 'translatepicture="true" background-picture="32x32_blinds_up.png" slider-picture="32x32_blinds_down.png" translaterimage="false" ';
        else $control = $control . 'translatepicture="true" background-picture="32x32_blinds_up.png" slider-picture="32x32_blinds_down.png" translaterimage="false" '; // TODO à gérer ...
        $control = $control . 'border="false" border-color="#000000" orientation="vertical" position="percent" min="0" max="255" ';
        $control = $control . 'feedback-object="' . $arr['value'] . '" ';
        $control = $control . 'slidestop-action="" slide-action="" ';
        $control = $control . 'actionstop="false" command-object="" ';
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="32" height="32" />';

        $control = $control . '<control type="subpage" subpage="' . $subpage_dimmer2 . '" ';
        $control = $control . 'name="' . $arr['label'] . '" desc="' . $arr['label'] . '" ';
        $control = $control . 'view_mode="hideshow" hidetitledialog="true" picture-dialog="32x32_vide.png" '; //Black/var/blinds/1.png 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'dim="' . $arr['dim'] . '" ';
        $control = $control . 'switch="' . $arr['switch'] . '" ';
        $control = $control . 'value="' . $arr['value'] . '" ';
        $control = $control . ' />';
      } else if ($arr['type'] == "scale") {
/* new
<control type="slider" 
 slider-color="#FF0000" name="" desc="" 
 translatepicture="true" background-picture="32x32_blinds_up.png" slider-picture="32x32_blinds_down.png" translaterimage="false" 
 border="false" border-color="#000000" orientation="vertical" position="percent" min="0" max="100" 
 feedback-object="volet_Sejour" 
 slidestop-action="" slide-action="" 
 x="200" y="200"
 width="32" height="32" />
*/
/* old
<control type="scale" label="v_Salon" object="volet_Salon_Baie2" img="blinds" x="1044" y="805"/>
*/
        $control = '<control type="slider" ';
        $control = $control . 'slider-color="#000000" name="' . $arr['label'] . '" desc="" ';
        if ($arr['img'] == "blinds" ) $control = $control . 'translatepicture="true" background-picture="32x32_blinds_up.png" slider-picture="32x32_blinds_down.png" translaterimage="false" ';
        else $control = $control . 'translatepicture="true" background-picture="32x32_blinds_up.png" slider-picture="32x32_blinds_down.png" translaterimage="false" '; // TODO à gérer ...
        $control = $control . 'border="false" border-color="#000000" orientation="vertical" position="percent" min="0" max="255" ';
        $control = $control . 'feedback-object="' . $arr['object'] . '" ';
        $control = $control . 'slidestop-action="" slide-action="" command-object="" ';
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="32" height="32" />';
      } else if ($arr['type'] == "camera") {
/* new
<control type="camera" url="" x="20" y="20" width="32" height="32"></control>
*/
/* old
<control type="camera" label="aa" url="ip" height="240" width="320" x="372" y="65"/>
*/
        $control = '<control type="camera" ';
        $control = $control . 'name="' . $arr['label'] . '" desc="" ';
        $control = $control . 'url="' . $arr['url'] . '" ';
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="' . $arr['width'] . '" height="' . $arr['height'] . '" />';
      } else if ($arr['type'] == "temp") {
/* new
<control type="temp" feedback-object="Temp_Exterieur" 
mod="0.01" decimal="2" scale="100" tempinf="-99" tempsup="99" tempmin="-99" tempmax="99" 
width="100" height="100" x="856" y="11" 
name="" desc="" ></control>
*/
/* old
<control type="temp" label="Temp_Exterieur" object="Temp_Exterieur" x="720" y="60" 
tempmin="-10" tempmax="35" tempinf="18" tempsup="24" decimal="2" mod="0.01"/>
*/
        $control = '<control type="temp" ';
        $control = $control . 'feedback-object="' . $arr['object'] . '" scale="' . (($arr['scale'])?$arr['scale']:'100') . '" ';
        $control = $control . 'mod="' . $arr['mod'] . '" decimal="' . $arr['decimal'] . '" ';
        $control = $control . 'tempinf="' . $arr['tempinf'] . '" tempsup="' . $arr['tempsup'] . '" tempmin="' . $arr['tempmin'] . '" tempmax="' . $arr['tempmax'] . '" ';
        $control = $control . 'name="' . $arr['label'] . '" desc="" ';
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'width="' . (($arr['scale'])?$arr['scale']:'100') . '" height="' . (($arr['scale'])?$arr['scale']:'100') . '" />';
      } else if ($arr['type'] == "thermostat") {
/* new subpage
*/
/* old
<control type="thermostat" label="Ch1" mode="Temp_mode_CH1" setpoint="Temp_consigne_CH1" temp="Temp_CH1" x="1194" y="511"/>
<control type="thermostat2" label="thermostat2" comfort="Alarme_VMC_OFF" night="Alarme_VMC_OFF" frost="Alarme_VMC_OFF" setpoint="1w_Temp_Ch1" temp="1w_Temp_Ch1"/>
<control type="thermostat3" label="thermostat3" mode="Temp_mode_CH1" setpoint="1w_Temp_Ch1" temp="1w_Temp_Ch1" setpointOffset="1w_Temp_Ch1"/>
*/
        $control = '<control type="subpage" subpage="' . $subpage_thermostat . '" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        $control = $control . 'view_mode="" hidetitledialog="false" picture-dialog="" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'mode="' . $arr['mode'] . '" ';
        $control = $control . 'setpoint="' . $arr['setpoint'] . '" ';
        $control = $control . 'temp="' . $arr['temp'] . '" ';
        $control = $control . ' />';
      } else if ($arr['type'] == "thermostat2") {
/* new subpage
*/
/* old
<control type="thermostat2" label="thermostat2" comfort="Alarme_VMC_OFF" night="Alarme_VMC_OFF" frost="Alarme_VMC_OFF" setpoint="1w_Temp_Ch1" temp="1w_Temp_Ch1"/>
*/
        $control = '<control type="subpage" subpage="' . $subpage_thermostat2 . '" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        $control = $control . 'view_mode="" hidetitledialog="false" picture-dialog="" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'comfort="' . $arr['comfort'] . '" ';
        $control = $control . 'night="' . $arr['night'] . '" ';
        $control = $control . 'frost="' . $arr['frost'] . '" ';
        $control = $control . 'setpoint="' . $arr['setpoint'] . '" ';
        $control = $control . 'temp="' . $arr['temp'] . '" ';
        $control = $control . ' />';
      } else if ($arr['type'] == "thermostat3") {
/* new subpage
*/
/* old
<control type="thermostat3" label="thermostat3" mode="Temp_mode_CH1" setpoint="1w_Temp_Ch1" temp="1w_Temp_Ch1" setpointOffset="1w_Temp_Ch1"/>
*/
        $control = '<control type="subpage" subpage="' . $subpage_thermostat3 . '" ';
        $control = $control . 'name="' . $arr['label'] . '" ';
        $control = $control . 'view_mode="" hidetitledialog="false" picture-dialog="" '; 
        $control = $control . 'x="' . ($arr['x'] - 10 ). '" y="' . ($arr['y'] - 10 ) . '" ';
        $control = $control . 'mode="' . $arr['mode'] . '" ';
        $control = $control . 'setpoint="' . $arr['setpoint'] . '" ';
        $control = $control . 'temp="' . $arr['temp'] . '" ';
        $control = $control . 'setpointOffset="' . $arr['setpointOffset'] . '" ';
        $control = $control . ' />';
      } else {
        echo " The widget <b>\"". $arr['label'] . "\"</b> with type=<b>\"" . $arr['type']."\"</b> can't be convert <br />";
      }
      


/*      
<control type="text" text="Date : $3/$2/$1" size="20" color="#cc6e1e" bgcolor="" align="" style="" object="Date" pattern="(\d+)-(\d+)-(\d+)" x="280" y="300" width="193" height="30" />
<control type="temp" feedback-object="Temp_Exterieur" mod="0.01" decimal="2" scale="100" tempinf="-99" tempsup="99" tempmin="-99" tempmax="99" width="100" height="100" x="856" y="11" name="" desc="" />
<control type="button" picture="20x20_ampouleOff.png" picture-active="20x20_ampouleOn.png" display-picture="no" text="" size="12" color="#000000" align="" text-padding="0" confirm="no" feedback-object="ecl_CH1" feedback-compare="eq" feedback-value="on" inactive-goto="" inactive-action="" active-goto="" active-action="" x="377" y="547" width="32" height="32" id="ecl_CH1" values="off">
  <actionlist id="inactive-action">
    <action type="set-value" id="ecl_CH1" value="on"/>
  </actionlist>
  <actionlist id="active-action">
    <action type="set-value" id="ecl_CH1" value="off"/>
  </actionlist>
</control>

<control type="subpage" view_mode="" hidetitledialog="false" picture-dialog="" subpage="domovea_blind2" x="278" y="53" title="volet salon" footer="volet salon" picture="" object_status="envoi_position_volet_Salon_Baie"/>
<control type="html" html="code" x="20" y="20" width="32" height="32" />

Old Knxweb :

<control type="goto" label="Scenario" target="scenario" img="custom" imgfile="Scenario.png" x="30" y="540"/>

<control type="text" label="Scenario" style="" x="95" y="550"/>
<control type="text" label="" object="pourc_vannes_sejour" format="$1%" x="262" y="714"/>
<control type="text" label="" style="" format="Date : $3/$2/$1" object="Date" pattern="(\d+)-(\d+)-(\d+)" x="30" y="500"/>

<control type="dimmer" label="Cuisine" dim="dim_Cuisine" switch="ecl_Cuisine" value="dim_val_Cuisine" x="689" y="408"/>

<control type="thermostat" label="Ch1" mode="Temp_mode_CH1" setpoint="Temp_consigne_CH1" temp="Temp_CH1" x="1194" y="511"/>

<control type="html" label="afficheSSol" x="34" y="74"><![CDATA[
  <script type="text/javascript">afficheSSol();</script>                                                                      
]]></control>
*/

      $xml = $xml . $control;
    }
    $xml = $xml . "</$key>";
  }
  $xml = $xml . "</$key0>";
}

/*
 * write the knxweb2/design/"design"/"version".xml file
 *
 */

$res=file_put_contents('design/' . $design.'/'.$version_knxwebNew.'.xml', '<?xml version="1.0" encoding="UTF-8"?><config width="' . $width_design . '" height="' . $height_design . '" enableSlider="false">'.$xml.'</config>');

} /* end-if send == "yes" */

?>