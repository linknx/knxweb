// EIBCommunicator
var EIBCommunicator = {
	listeners: new Object(),
	
	add: function(o) {
		var l=o.getListeningObject();
		for(var i=0;i<l.length; i++)
			if (l[i]) {
				if (!EIBCommunicator.listeners[l[i]]) EIBCommunicator.listeners[l[i]]=Array();
				EIBCommunicator.listeners[l[i]].push(o);
			}
	},
	remove: function(o) {
		for(key in EIBCommunicator.listeners) {
			for (var i=0;i<EIBCommunicator.listeners[key].length; i++) {
				if (EIBCommunicator.listeners[key][i]==o) EIBCommunicator.listeners[key].splice(i,1);
			}
			if (EIBCommunicator.listeners[key].length==0) delete EIBCommunicator.listeners[key];
		}
	},
	refreshListeningObject: function(o) {
		EIBCommunicator.remove(o);
		EIBCommunicator.add(o);		
	},
	eibWrite: function(obj,value, successCallBack) {
		if (!obj)
			return;
		var body = "<write><object id='"+obj+"' value='"+value+"'/></write>";

		var t = new Date().getTime();

		req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd&nocache=' + t, data: body, processData: false, dataType: 'xml' , cache: false,
			success: function(responseXML, status) {
				var xmlResponse = responseXML.documentElement;
				if (xmlResponse.getAttribute('status') == 'success') {
		   			EIBCommunicator.sendUpdate(obj, value);
				}
				else
					alert(tr("Error: ")+xmlResponse.textContent);
				if (successCallBack) successCallBack(response);
			}
		})
	},
	sendUpdate: function(obj,value) {
		var listeners = EIBCommunicator.listeners[obj];
		if (listeners) {
			for (var i=0;i<listeners.length; i++)
				listeners[i].updateObject(obj,value);
		}
	},
	eibRead: function(objects,completeCallBack) {
		if (objects.length > 0) {
			var body = '<read><objects>';
			for (i=0; i < objects.length; i++)
				if (objects[i])
					body += "<object id='" + objects[i] + "'/>";
			body += "</objects></read>";

			var t = new Date().getTime();
      
			var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd&nocache=' + t, data: body, processData: false, dataType: 'xml', cache: false,
				success: function(responseXML, status) {
					var xmlResponse = responseXML.documentElement;
					if (xmlResponse.getAttribute('status') != 'error') {
						// Send update to subscribers
						var objs = xmlResponse.getElementsByTagName('object');
						if (objs.length == 0)
								EIBCommunicator.sendUpdate(objects, xmlResponse.childNodes[0].nodeValue);	
						else {
							for (i=0; i < objs.length; i++) {
								var element = objs[i];
								EIBCommunicator.sendUpdate(element.getAttribute('id'),element.getAttribute('value'));
							}
						}
					}
					else
						UIController.setNotification(tr("Error: ")+xmlResponse.textContent);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					UIController.setNotification(tr("Error: ")+textStatus);
				},
				complete: completeCallBack
			});
		}
		else if (completeCallBack)
		    completeCallBack();
	},
	executeActionList: function(actionsList) {
		//var actions=actionsList.get(0).childNodes;
    var actions=actionsList.get(0);
		if (actions.childNodes.length>0) {
  		var xml='<execute>';
  		for(i=0; i<actions.childNodes.length; i++)
  		{
  			var action=actions.childNodes[i]; //var action=actions[i];
  			// Already dispatch new value if type == set-value
  			if (action.getAttribute('type')=='set-value') EIBCommunicator.sendUpdate(action.getAttribute('id'), action.getAttribute('value'));
  			xml+=serializeXmlToString(actions.childNodes.item(i));//xml+=serializeXmlToString(actions[i]);
  		}
  		xml+='</execute>';
  		EIBCommunicator.query(xml);
  	}
	},
	query: function(body, successCallBack) {
		var t = new Date().getTime();

		req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd&nocache=' + t, data: body, processData: false, dataType: 'xml' , cache: false,
			success: function(responseXML, status) {
				if (successCallBack) successCallBack(responseXML.documentElement);
			}
		})
	},
	updateAll: function(completeCallBack) {
		var obj = new Array();
		for(key in EIBCommunicator.listeners)
			obj.push(key);
		EIBCommunicator.eibRead(obj, completeCallBack);
	},
	periodicUpdate: function() {
		EIBCommunicator.updateAll(function(XMLHttpRequest, textStatus) {
				setTimeout('EIBCommunicator.periodicUpdate()', 1000);
			});
	},
	removeAll: function() {
		for(key in EIBCommunicator.listeners) 
			delete EIBCommunicator.listeners[key];
	}
}