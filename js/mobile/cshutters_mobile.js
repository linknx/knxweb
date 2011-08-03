function CShutters(conf) {
	
	
  this.commandObject=conf.getAttribute("cmdvalue");
	this.updownObject=conf.getAttribute("updown");
	this.stopObject=conf.getAttribute("stop");
	this.returnObject=conf.getAttribute("value");
  this.valueStop='off';
  
  this.statereturn = (conf.getAttribute("statereturn") == 'true');
  	
	this.value=0;
  var widget = this.init(conf);


   UIController.deviceNumber += 1; // incrémenter pour chaque device pour avoir un id unique
   this.numdevice = UIController.deviceNumber; 
    this.id="shutters"+this.numdevice+"";


    var div=$('#newshutters').clone();
    div.attr('id',this.id);  
    div.css('display',"");
    div.get(0).owner=this;
    div.prepend($("<h3>"+this.label+"</h3>"));
    this.div = div.get(0);
  
  this.lienUp = $(".shuttersUp:first",div).get(0);
  this.lienUp.owner=this;
  this.lienUp.onclick=function() {
		var val = 'off';
		EIBCommunicator.eibWrite(this.owner.updownObject, val);
		this.owner.updateObject(this.owner.updownObject, val);
	};

  this.lienDown = $(".shuttersDown:first",div).get(0);
  this.lienDown.owner=this;
  this.lienDown.onclick=function() {
		var val = 'on';
		EIBCommunicator.eibWrite(this.owner.updownObject, val);
		this.owner.updateObject(this.owner.updownObject, val);
	};
	
	this.lienStop = $(".shuttersStop:first",div).get(0);
  this.lienStop.owner=this;
  this.lienStop.onclick=function() {
		var val = (this.owner.valueStop == 'on')? 'off' : 'on';
		EIBCommunicator.eibWrite(this.owner.stopObject, val);
		this.owner.updateObject(this.owner.stopObject, val);
	};
  
  // le select :
  $(".selectShutters:first",div).attr('id',"selectShutters"+this.numdevice);
  $(".selectShutters:first",div).attr('name',"selectShutters"+this.numdevice);
  
  this.select = $(".selectShutters:first",div).get(0);
  this.select.owner=this;
  this.select.onchange=function() {
		value = Math.round(((this.value)/100)*255);
		EIBCommunicator.eibWrite(this.owner.commandObject, value);
    this.owner.updateObject(this.owner.returnObject, value);
		this.owner.value=value;
	};   

}
CShutters.type='shutters';
UIController.registerWidget(CShutters);
CShutters.prototype = new CWidget();
CShutters.prototype.getListeningObject = function() {
	return Array(this.returnObject,this.updownObject,this.stopObject);
};
CShutters.prototype.updateObject = function(obj,value) {
	if (obj==this.returnObject) {
	  this.value = Math.round(((value)/255)*100);
	  if (this.statereturn) {
		/*
		Format de la donnée retour d'état "not in poucent" & Byte : 000MMMPP
		P position :
        00= position intermédiaire
		    01= position haute 
		    10= position basse
		M mode :
		    000= Normal
		    001= Forçage
		    010= Alarme Vent
		    011= Alarme pluie
		    100= Blocage
		    
		intermédiaire :
		    Normal => 0  
		    Forçage => 4
		    Alarme Vent => 8 
		    Alarme pluie => 12
		    Blocage => 16
		haute :
		    Normal => 1  
		    Forçage => 5
		    Alarme Vent => 9 
		    Alarme pluie => 13
		    Blocage => 17		
		basse :
		    Normal => 2  
		    Forçage => 6
		    Alarme Vent => 10 
		    Alarme pluie => 14
		    Blocage => 18
		*/
	    if (value==1 || value==5 || value==9 || value==13 || value==17)
		  {
  		  this.value=0;
      } else if(value==2 || value==6 || value==10 || value==14 || value==18 ) {
        this.value=100;
      } else {
  		  this.value=50;
      }
    }
    $(this.select).val((Math.round((this.value)/10))*10).selectmenu('refresh');
  }
  if (obj==this.updownObject) {
    if (this.value > 0) 
    {
      $(this.radioOff).removeAttr("checked").checkboxradio('refresh');
      $(this.radioOn).attr("checked","true").checkboxradio('refresh');
    }  else {
      $(this.radioOn).removeAttr("checked").checkboxradio('refresh');
      $(this.radioOff).attr("checked","true").checkboxradio('refresh');
    }
	}
	if (obj==this.stopObject) {
	  this.valueStop = value;
	}
};