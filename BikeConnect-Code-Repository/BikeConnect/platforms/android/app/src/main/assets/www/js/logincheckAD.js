$(document).ready(function(){
            var storage = window.localStorage;
           try{
           	if(localStorage.getItem("EID").length>=1){
				window.location = 'Admin-DashBoard.html'	;
			}	
       }catch(error) {  console.error(error);}		
});