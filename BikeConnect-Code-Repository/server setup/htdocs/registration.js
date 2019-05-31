
 $(document).ready(function() {
     $('#FORM').submit(function() {
         event.preventDefault();

         var postData = $(this).serialize();
         var http = new XMLHttpRequest();
         var url = 'http://127.0.0.1/registration.php';
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

         http.onreadystatechange = function() {
             if (http.readyState == XMLHttpRequest.DONE) {

                // alert(http.responseText);
                
             }
         }
         http.send(postData);
     });
 });