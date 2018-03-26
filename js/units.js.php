<?php
  require_once("../include/objectstypes.php");
  $unitdict = [];
  foreach ($_objectTypes as $obj)
  {
    $ex = explode(' : ', $obj);
    if (sizeof($ex) == 3)
    {
      $unitdict[$ex[0]] = $ex[2];
    }
  }
?>

function getUnits(have_units_cb, user_data) {
  var type_units = <?php echo json_encode($unitdict); ?>;
  var object_units = Array();
  var responseXML = queryLinknx('<read><config><objects/></config></read>');
  if (responseXML) {
    var objs = responseXML.getElementsByTagName('object');
    for (var i=0; i < objs.length; i++) {
      var element = objs[i];
      if (element.getAttribute('type') in type_units)
        object_units[element.getAttribute('id')] = type_units[element.getAttribute('type')]
    }
    have_units_cb(object_units, user_data);
  }
}
