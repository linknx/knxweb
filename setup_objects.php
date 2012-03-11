<?

require_once("include/common.php");

tpl()->assignByRef('objectTypes', $_objectTypes);
tpl()->assignByRef('json_objectTypes', $json_objectTypes);

tpl()->addJs('js/setup_objects.js');


/*
* Extract ETS 3 en xml : cf. page 20 => http://download.hager.com/Hager.se/files_download/instruction_manuals/Domovea_starthjalp.pdf
* Mod Opération dans ETS3, To generate the ETS .xml file :
* 1-select device view and select the devices to be exported
* 2-To export data, select "File" in the menu then Save as "CSV/XML" in submenu, then select "Export"
* and the "XML" format in the popup displayed. Confirm by clicking "OK". Select the destination
* directory and file name, and terminate by clicking the Save button.
* 
* 3- enregistrer le fichier à la racine du dossier knxweb2 il doit se nommer "ETS.xml"
* 
*/
$pathETSxml = 'ETS.xml';
$fileETSexist = file_exists($pathETSxml);
$xmletstabhead = array();
$xmletstablines = array();
$nbligne = 0;

if ($fileETSexist) {

  $xml = simplexml_load_file($pathETSxml);
  foreach($xml as $key0 => $value){
    if ($key0 == "columns") {   // niveau 1 : columns
      foreach($value as $key => $value2){
        $xmletstabhead[] = $value2;      // niveau 2 : colName
      }
    }
    if ($key0 == "rows") { // niveau 1 : rows
      $value3_sv = "";
      $add_ligne = true;
      $nbligne = 0;
      
      foreach($value as $key => $value2){
        $colonne = 0;
        foreach($value2 as $key2 => $value3){
          $colval = $value3;
          foreach($value3->attributes() as $attributeskey2 => $attributesvalue3){
            if ((string)$attributeskey2 == "nr" && (string)$attributesvalue3 == "1" && (string)$value3 == "" && $value3_sv != "") {
              $colval.= $value3_sv;
            }
            if ((string)$attributeskey2 == "nr" && (string)$attributesvalue3 == "1" && (string)$value3 != "") $value3_sv = (string)$value3;
          }
          $xmletstablines[$nbligne][$colonne] = $colval;
          $colonne++;
          if ($colonne == 6 and $value3 == "") $add_ligne = false;
        }
  
        if ($add_ligne) { // si pas de GA colonne 6 à blanc on écrit pas la ligne
          $nbligne++;
        } 
        $add_ligne = true;
      }
    }
  }
}
tpl()->assignByRef("xmletstabhead",$xmletstabhead);
tpl()->assignByRef("xmletstablines",$xmletstablines);
tpl()->assignByRef('nbligne', $nbligne);   
tpl()->assignByRef('fileETSexist', $fileETSexist);

tpl()->display('setup_objects.tpl');

?>