<?php
function parsePluginXML($xml) {
  $setting=array();
  foreach($xml->attributes() as  $key => $value)  $setting[(string)$key]=(string)$value;
  return $setting;
};

function getPlugin($path) {
  if (file_exists($path . '/manifest.xml'))
  {
    $xml = (array)simplexml_load_file($path . '/manifest.xml');
    $ret=array(
      "name"  => basename($path),//$type,
      "path"  => $path,
      "label"  => $xml['label'],
      "description"  => $xml['description'],
      "version" => $xml['version'],
      "category" => $xml['category'],
      "settings" => array()
    );
    if (isset($xml['settings'])) {
      $settings=(array)$xml['settings'];
      if ($settings) {
        if (is_array($settings['setting'])) {
          // Multiple settings
          foreach((array)$settings['setting'] as $v) {
            $setting=parsePluginXML($v);
            $ret['settings'][]=$setting;
          }
        } else {
          // single setting
          $setting=parsePluginXML($settings['setting']);
          $ret['settings'][]=$setting;
        }
      }
    }/*
    if (isset($xml['feedbacks'])) {
      $feedbacks=(array)$xml['feedbacks'];
      if ($feedbacks) {
          if (isset($feedbacks['feedback']) && is_array($feedbacks['feedback'])) {
          // Multiple feedbacks
          foreach((array)$feedbacks['feedback'] as $v) {
            $ret['feedbacks'][]=(string)$v->attributes()->id;
          }
        } else {
          // single feedback
          if (isset($feedbacks['feedback'])) $ret['feedbacks'][]=(string)$feedbacks['feedback']->attributes()->id;
        }
      }
    }*/
    if (isset($xml['blocks'])) {
      $blocks=(array)$xml['blocks'];
      if ($blocks) {
        if (isset($blocks['block']) && is_array($blocks['block'])) {
          // Multiple blocks
          foreach((array)$blocks['block'] as $v) {
            $ret['blocks'][]=(string)$v->attributes()->type;
          }
        } else {
          // single block
          if (isset($blocks['block'])) $ret['blocks'][]=(string)$blocks['block']->attributes()->type;
        }
      }
    }
    return $ret;
  } else return false;
};

?>