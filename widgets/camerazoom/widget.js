function CCamerazoom(conf) {
	this.isResizable=true;
	this.init(conf);
	this.refreshHTML();
	this.oldvalue = undefined;
}

CCamerazoom.type='camerazoom';
UIController.registerWidget(CCamerazoom);
CCamerazoom.prototype = new CWidget();

// Refresh HTML from config
CCamerazoom.prototype.refreshHTML = function() {
	$(".buttonContent", this.div).css({'background-image': 'url(' + getImageUrl(this.conf.getAttribute("icon-picture")) + ')', 'height': '100%'});

	var conf = this.conf;
  if (conf.getAttribute("supported-resolutions")) supported_resolutions = JSON.parse(conf.getAttribute("supported-resolutions"));
  else supported_resolutions = [[640,480]];
	if (supported_resolutions instanceof Array == 0)
	{
		console.log("can't parse supported-resolutions, use [[640,480]]");
		supported_resolutions = [[640,480]];
	}

// 	var supported_resolutions = [[160,120],[320,240][640,480],[768,576],[800,600],[1024,768],[1280,960]]

	var dialogdiv = $( '.dialogContent', this.div );
	dialogdiv.titleheight = 30;
	dialogdiv.dialog({
		autoOpen: false,
// 		title: '<span class="ui-icon ui-icon-unlocked" style="float: left, margin-right: 4px"></span>Haustürcam',
		title: conf.getAttribute("desc"),
		resizable: true,
		width: conf.getAttribute("resx"),
		height: parseInt(conf.getAttribute("resy"))+29,
		minwidth: supported_resolutions[0][0],
		minheight: supported_resolutions[0][1],
		modal: false,
// 		dialogClass: dialogClass,
		position: { my: "left top", at: "left top", of: window },
		open: function(event, ui) {
			var width, height, aspect;
			for ( var i = 0; i < supported_resolutions.length; i++)
			{
				width = (supported_resolutions[i])[0];
				height = (supported_resolutions[i])[1];
				aspect = width/height
				if ( width >= $(this).width())
					break;
			}
			var url = conf.getAttribute("stream-url").replace('<width>', width).replace('<height>', height)
			if ( conf.getAttribute("stream-type") == 'img' ) {
				var oImg=document.createElement("img");
				oImg.setAttribute('src', url);
				oImg.setAttribute('width', $(this).width());
				oImg.setAttribute('height', parseInt($(this).width())/aspect);
				$(this).html(oImg);
			} else {
				var oVideo=document.createElement("video");
				oVideo.setAttribute('width', conf.getAttribute("resx"));
				oVideo.setAttribute('height',conf.getAttribute("resy"));
				oVideo.setAttribute('autoplay', '');
				var oSrc=document.createElement("source");
				oSrc.setAttribute('src', url);
				oSrc.setAttribute('type', "video/" + conf.getAttribute("stream-type"));
// 				oVideo.innerHTML = oSrc;
				oVideo.appendChild(oSrc);
				$(this).html(oVideo);
			}
			$(this).height('auto');
// 				  <video width="1280" height="720" autoplay>
//   <source src="http://kelvin:8081" type="video/mp4">
// Your browser does not support the video tag.
// </video>
// 				
			var unlock_obj = conf.getAttribute("unlock-object");
			if (unlock_obj == "" || unlock_obj == 'undefined') {
			} else {
				if ($(".ui-dialog-titlebar > a.ui-icon-unlocked").length===0) {
					$(this).parent().find('.ui-dialog-titlebar').append("<a href='#' id='unlock' class='ui-icon ui-icon-unlocked' style='float: right; margin-right: 30px;'></a>");
					$(this).parent().find('.ui-icon-unlocked').click(function(){
						EIBCommunicator.eibWrite(unlock_obj, "on");
					});
				}
			}
		},
		resizeStop: function(event, ui) {
// 			$(this).updateImg();
			var width, height;
			for ( var i = 0; i < supported_resolutions.length; i++)
			{
				width = (supported_resolutions[i])[0];
				height = (supported_resolutions[i])[1];
				if ( width >= $(this).width())
					break;
			}
			var oImg=document.createElement("img");
			var url = conf.getAttribute("stream-url").replace('<width>', width).replace('<height>', height)
			console.log('replaced url', url);
			oImg.setAttribute('src', url);
			oImg.setAttribute('width', $(this).width());
			oImg.setAttribute('height', parseInt($(this).width())*3/4);
			$(this).html(oImg);
			$(this).height('auto');
		},
		close: function(event, ui) {
			$(this).html('');
		}
	});

	this.motionAlert = function() {
		dialogdiv.dialog('open');
	}

	this.endAlert = function() {
		dialogdiv.dialog('close');
	}

	$(".buttonContent", this.div).click(function() {
		dialogdiv.dialog('open');
	});
}

CCamerazoom.prototype.updateObject = function(obj,value) {
	if (obj==this.conf.getAttribute("activity-object"))
	{
		if (value != this.oldvalue)
		{
			if (value == "on" || value == "true") {
				this.motionAlert();
			}
			else {
				this.endAlert();
			}
		}
		this.oldvalue = value;
	}
};
