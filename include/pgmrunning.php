<?php
/*

Ce script est à modifier pour chaque programmes que l'utilisateur soouhaite vérifier si il est ou non actif 

TODO : a détailler ...

*/

/*
$owserver_running=`ps aux | grep owserver | grep -v grep`;
$owserver_running_param=explode("owserver ",$owserver_running);
$owserver_running_param=$owserver_running_param[1];

$pgmrunning["owserver"] = $owserver_running;
$pgmrunning_param["owserver"] = $owserver_running_param;

*/
function pgm_running($pgm)
{
  global $pgmrunning, $pgmrunning_param;

 /* $owserver_running=`ps aux | grep owserver | grep -v grep`; */
  $path_pgm = exec('which '.$pgm);
  if ($path_pgm!="") {
    $pgm_running = exec('ps | grep '.$pgm.' | grep -v grep');
    if ($pgm_running!="") {
      /*$pgm_running_param = explode("$pgm ",$pgm_running);*/
      $pgm_running_param = explode("$path_pgm",$pgm_running);
      $pgm_running_param = $pgm_running_param[1];
    } else {
      $pgm_running = exec('ps ax | grep '.$pgm.' | grep -v grep');
      if ($pgm_running!="") {
        /*$pgm_running_param = explode("$pgm ",$pgm_running);*/
        $pgm_running_param = explode("$path_pgm",$pgm_running);
        $pgm_running_param = $pgm_running_param[1];
      } else {
        return false;
      }
    }
    $pgmrunning["$pgm"] = $pgm_running;
    $pgmrunning_param["$pgm"] = $pgm_running_param;
  } else {
    $pgmrunning["$pgm"] = "";
    $pgmrunning_param["$pgm"] = $pgm.' not on the system';
  }
}

//pgm_running("owserver");



?>
