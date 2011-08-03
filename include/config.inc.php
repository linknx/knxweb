<?

$_config=array(
	"linknx_host"	=> 	"127.0.0.1",  // ip du serveur linknx
	"linknx_port"	=>	1028,         // portconnesion avec serveur linknx
	"template" 	=>	"default",      // template utilisé images, css, code html tpl
	"lang"		=>	"fr",             // langue
	"version"	=>	"0.9",            // version de KnxWeb
	"title"	=>	"KnxWeb - Ma maison en un clic",       // Titre des pages Web 
	"Path_Image_Background" => "design/default/",      // emplancement des images de fond d'écran 
	"defaultDesign" 	=>	"default",                   // version et design par défaut => design/version.xml par défaut default/design.xml  
	"defaultVersion" 	=>	"design",                    // fichier xml de description
	"startMobileView" 	=>	false,                     // démérrage par défaut de la vue "Mobile"
	"defaultMobileDesign" 	=>	"default",             // version et design par défaut de la visu "Mobile"
	"defaultMobileVersion" 	=>	"mobile",              // fichier xml de description
	"eibd" 	=>	"-d -D -S -T -i ipt:192.168.1.10:3671",              // paramètre d'appel de eibd exameple : ft12:/dev/ttyS0
	"linknx" 	=>	"-d --config=/var/lib/linknx/linknx.xml",              // paramètre d'appel de linknx
);

/*

Ces valeures peuvent être utilisées sans les scripts de la façon suivante exemple : 
javascript : var _version=tab_config['version'];
php : $_config['version'];
tpl : {$_config['version']} ou {$_config.version}

*/

?>