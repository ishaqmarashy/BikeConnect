 $(document).ready(function() {

     $('#COMP').submit(function() {
         event.preventDefault();
          var storage = window.localStorage;
    try {
        var TOKEN = storage.getItem("TOKEN");
        var USERNAME = storage.getItem("USERNAME");
         var BOID=$(this).find('#BOID').val();
         var COMPLAINT=$(this).find('#COMPLAINT').val();

         var formData = 'TOKEN='+TOKEN+'&USERNAME='+USERNAME+'&BOID='+BOID+'&COMPLAINT='+COMPLAINT;
         var http = new XMLHttpRequest();
         var url = 'http://127.0.0.1/USER/USERcomplaint.php';
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');              
         http.onreadystatechange = function() {
             if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                     json = json.payload;
                    json = JSON.parse(json);
                    if(json==-1)
                    alert('BOID does not exist.');
                    else if(json==1)  
                    alert('Complaint sucessfully sent.');

                }
         }
         http.send(formData);
    } catch (error) {
        console.error(error);
    }
         
     });
 });