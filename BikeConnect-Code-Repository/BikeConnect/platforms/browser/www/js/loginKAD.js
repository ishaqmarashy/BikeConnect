$(document).ready(function(){
            var storage = window.localStorage;
            var t=true;
           try{
           	if(localStorage.getItem("EID").length>=1){
           		t=false;
			
			}	
       }catch(error) {  console.error(error);}
       if(t){
       		window.location = 'AdminLogIn.html'	;
       }		
});