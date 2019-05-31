$(document).ready(function(){
            var storage = window.localStorage;
		   	$('#FORM').on('submit', function(){
            event.preventDefault();

         var postData = $(this).serialize();
         var http = new XMLHttpRequest();
         var url = 'http://127.0.0.1/ADMIN/loginAD.php';
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

         http.onreadystatechange = function() {
             if (http.readyState == XMLHttpRequest.DONE) {
		    	var jsonf=jQuery.parseJSON(http.responseText);
		    	if(jsonf.dbtoken.length>1){
              
			    	localStorage.setItem("EID", jsonf.dbresponse)
					localStorage.setItem("TOKEN", jsonf.dbtoken);
					window.location='Admin-DashBoard.html';
			    }
			            }
         }
         http.send(postData);
		    
		});});