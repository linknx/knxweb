function widgetsdl(w)
{
  loading.show();
  var result = queryKnxweb('widgetsdl&widget=' + w, 'xml', '', false);
  if (result != false ) messageBox(tr("Download the Widget") + " " + w + " " + tr("is complete"), tr("Info"), "check");
  loading.hide(); 
}

function subpagesdl(w)
{
  loading.show();
  var result = queryKnxweb('subpagesdl&subpage=' + w, 'xml', '', false);
  if (result != false ) messageBox(tr("Download the Subpage") + " " + w + " " + tr("is complete"), tr("Info"), "check");
  loading.hide(); 
}

function displayImg(subpage, directory , picture)
{
  if (subpage) {
    var img = '<p><img src="http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/subpages_knxweb2/' + directory + '/' + picture + '" alt="' + directory + '"></p>';

    //var img = '<p><img src="olddimmer.png" alt="' + directory + '"></p>'; // TODO que pour tests ...

    var title = tr("Sub-page") + " : " + directory;
  } else {
    var img = '<p><img src="http://linknx.cvs.sourceforge.net/viewvc/linknx/knxweb/widgets_knxweb2/' + directory + '/' + picture + '" alt="' + directory + '"></p>';
    var title = tr("Widget") + " : " + directory;
  }
  $( "#dialog_repository" ).dialog( "destroy" );
  $( "#dialog_repository" ).empty().attr("title", title).append(img);
  $( "#dialog_repository" ).dialog();
}

jQuery(function($) {

  /* _widgets list on this knxweb : hide download button if exist */
  for (var i in _widgets)
  {
    // _widgets.NAMEWIDGET.version => i.version
    if ($("#widget_"+i).data("version")) {
      if (parseFloat(parseFloat(_widgets[i].version)) >= parseFloat($("#widget_"+i).data("version")))
        $(".widgetsdl", "#widget_" + i).html('<span class="ui-button-text">' + tr("Already downloaded") + " / " + tr("Up to date") + '</span>').removeAttr("onclick");
    } 
  }

  /* _subpages list on this knxweb : hide download button if exist */
  if (typeof(_subpages)!='object') {
    loadSubPages();
  }

  $("subpage",_subpages).each(function() {
    //$(".subpagesdl", "#subpage_" + this.getAttribute('name')).hide();
    $(".subpagesdl", "#subpage_" + this.getAttribute('name')).html('<span class="ui-button-text">' + tr("Already downloaded") + '</span>').removeAttr("onclick");
  });
/*
 	//$('#widgetsdl-list').empty();
  for (var i=0; i < _repository_widgetsdllist.length; i++)
  {
 		var option = $("<option value='" + _repository_widgetsdllist[i][0] + "'>" + _repository_widgetsdllist[i][0] + "</option>");
		$('#widgetsdl-list').append(option);
  }

  //$('#subpagesdl-list').empty();
  for (var i=0; i < _repository_subpagesdllist.length; i++)
  {
 		var option = $("<option value='" + _repository_subpagesdllist[i][0] + "'>" + _repository_subpagesdllist[i][0] + "</option>");
		$('#subpagesdl-list').append(option);
  }
*/

  loading.hide();
});
