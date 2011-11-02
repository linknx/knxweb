<?php
$tab_Extension = array('jpg','gif','png','jpeg'); 
if (!isset($_POST['image_dir'])) $_POST['image_dir'] = "background";
$uploads_dir = dirname(__FILE__).'/images/'.$_POST['image_dir'];

$extension = pathinfo($_FILES['fichier']['name'], PATHINFO_EXTENSION);
$result=0;
if(in_array(strtolower($extension),$tab_Extension))
{
  $infosImg = getimagesize($_FILES['fichier']['tmp_name']);
  if(isset($_FILES['fichier']['error']) && UPLOAD_ERR_OK === $_FILES['fichier']['error'])
  {
    if ($_FILES["fichier"]["error"] == UPLOAD_ERR_OK) {
      $tmp_name = $_FILES["fichier"]["tmp_name"];
      $name = basename($_FILES["fichier"]["name"]);
      if(move_uploaded_file($tmp_name, "$uploads_dir/$name")) {
        $result=1;
      }
    }
  }
}
 
?>
<script language="javascript" type="text/javascript">window.top.window.endUpload(<?php echo $result; ?>);</script>   
