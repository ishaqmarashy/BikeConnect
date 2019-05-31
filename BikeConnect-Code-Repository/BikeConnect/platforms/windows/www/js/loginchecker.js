$(document).ready(function(){
            var storage = window.localStorage;
           try{
           	if(localStorage.getItem("TOKEN").length>1){
				window.location = 'MainBooking.html'	;
			}
       }catch(error) {  console.error(error);

}

		
});