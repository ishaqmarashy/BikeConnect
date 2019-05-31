$(document).ready(function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var mmin= today.getMinutes();
	 if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	      if(hh<10){
	        hh='0'+hh
	    } 
     if(mmin<10){
	        mmin='0'+mmin
	    } 


	today = yyyy+'-'+mm+'-'+dd +"T"+ hh+":"+mmin ;
	document.getElementById("dtimefield").setAttribute("min", today);

	document.getElementById("dtimefield").setAttribute("value", today);

});