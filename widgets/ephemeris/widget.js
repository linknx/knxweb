function CEphemeris(conf) {
	this.isResizable=true;
  this.init(conf);
  this.refreshHTML();
}

CEphemeris.type='ephemeris';
UIController.registerWidget(CEphemeris);
CEphemeris.prototype = new CWidget();

// Refresh HTML from config
CEphemeris.prototype.refreshHTML = function() {
  $(".ephemeris", this.div).addClass(this.conf.getAttribute("class"));
/*
  req : <read><calendar day='16' month='01' year='2012' /></read>
  
  response :
  <read status="success">
  	<calendar day="16" month="1" year="2012">
  		<exception-day>false</exception-day>
  		<sunrise hour="8" min="54" />
  		<sunset hour="17" min="46" />
  		<noon hour="13" min="20" />
  	</calendar>
  </read>

*/

  var today = new Date();
  var responseXML=queryLinknx('<read><calendar day="' + today.getDate() + '" month="' + ( today.getMonth() + 1 ) + '" year="' + today.getFullYear() + '" /></read>');
  if (responseXML!=false)
  {
    var html = "";

    if (this.conf.getAttribute("exception-day")!="false" ) html += "<div class='exception-day'><span class='ephemeris-text'> exception-day : " + $("exception-day",responseXML)[0].textContent + "</span></div>";

    var sunrise = $("sunrise",responseXML)[0];
    if (sunrise && this.conf.getAttribute("sunrise")!="false" ) {
      html += "<div class='sunrise' >";
      if (this.conf.getAttribute("sunrise-picture")!="") //html += "<img src='" + getImageUrl(this.conf.getAttribute("sunrise-picture")) + "' alt='sunrise'> ";
        html += "<span class='ephemeris-icon' style='background-image:url(\"" + getImageUrl(this.conf.getAttribute("sunrise-picture")) + "\");'  /> ";
      html += "<span class='ephemeris-text'>" + sunrise.getAttribute("hour") + ":" + ((sunrise.getAttribute("min") < 10)?("0"+sunrise.getAttribute("min")):sunrise.getAttribute("min")) + "</span></div>";
    }

    var sunset = $("sunset",responseXML)[0];
    if (sunset && this.conf.getAttribute("sunset")!="false" ) {
      html += "<div class='sunset' > ";
      if (this.conf.getAttribute("sunset-picture")!="") //html += "<img src='" + getImageUrl(this.conf.getAttribute("sunset-picture")) + "' alt='sunset'> ";
        html += "<spann class='ephemeris-icon'  style='background-image:url(\"" + getImageUrl(this.conf.getAttribute("sunset-picture")) + "\");'  /> ";
      html += "<span class='ephemeris-text'>" + sunset.getAttribute("hour") + ":" + ((sunset.getAttribute("min") < 10)?("0"+sunset.getAttribute("min")):sunset.getAttribute("min")) + "</span></div>";
    }

    var noon = $("noon",responseXML)[0];
    if (noon && this.conf.getAttribute("noon")!="false" ) {
      html += "<div class='noon' > ";
      if (this.conf.getAttribute("noon-picture")!="") //html += "<img src='" + getImageUrl(this.conf.getAttribute("noon-picture")) + "' alt='noon'> ";
        html += "<spann class='ephemeris-icon'  style='background-image:url(\"" + getImageUrl(this.conf.getAttribute("noon-picture")) + "\");'  /> ";
      html += "<span class='ephemeris-text'>" + noon.getAttribute("hour") + ":" + ((noon.getAttribute("min") < 10)?("0"+noon.getAttribute("min")):noon.getAttribute("min")) + "</span></div>";
    }
   
    $("div:first-child", this.div).html(html);
  } else $("div:first-child", this.div).html("error reading linknx");

}

// Called by eibcommunicator when a feedback object value has changed
CEphemeris.prototype.updateObject = function(obj,value) {};