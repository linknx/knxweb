
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
	eibWrite: function(obj,value, successCallBack) {
		if (!obj)
			return;
		var body = "<write><object id='"+obj+"' value='"+value+"'/></write>";

		req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml' ,
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

			var req = jQuery.ajax({ type: 'post', url: 'linknx.php?action=cmd', data: body, processData: false, dataType: 'xml',
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
						//UIController.setNotification(tr("Error: ")+xmlResponse.textContent);
						UIController.setAlert(tr("Error: ")+xmlResponse.textContent);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					//UIController.setNotification(tr("Error: ")+textStatus);
					UIController.setAlert(tr("Error: ")+textStatus);
				},
				complete: completeCallBack
			});
		}
		else if (completeCallBack)
		    completeCallBack();
	},
	updateAll: function(completeCallBack) {
		var obj = new Array();
		for(key in EIBCommunicator.listeners)
			obj.push(key);
		EIBCommunicator.eibRead(obj, completeCallBack);
	},
	periodicUpdate: function() {
		EIBCommunicator.updateAll(function(XMLHttpRequest, textStatus) {
				setTimeout('EIBCommunicator.periodicUpdate()', 3000);
			});
	},
	removeAll: function() {
		for(key in EIBCommunicator.listeners) 
			delete EIBCommunicator.listeners[key];
	}
}