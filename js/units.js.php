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
  //echo json_encode($unitdict);
?>

function getUnits() {

  var unitdict = <?php echo json_encode($unitdict); ?>;
  var units = Array();

  var body = '<read><config><objects/></config></read>';
  var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',
    success: function(responseXML, status) {
      var xmlResponse = responseXML.documentElement;
      if (xmlResponse.getAttribute('status') != 'error') {
        $('object', responseXML).each(function() {
          for ( var i=0; i < query_objects.length; i++)
          {
            if (this.getAttribute('id') == query_objects[i])
            {
              units[this.getAttribute('id')] = unitdict[this.getAttribute('type')];
              break;
            }
          }
      });
      return units;
    }
    else
      console.log("Error: "+responseXML.textContent);
    }
  });
}




