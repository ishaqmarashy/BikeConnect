$(document).ready(function(){
            var storage = window.localStorage;
           try{
           	if(localStorage.getItem("USERNAME").length>=1){
				window.location = 'MainBooking.html'	;
			}	
       }catch(error) {  console.error(error);}		
});