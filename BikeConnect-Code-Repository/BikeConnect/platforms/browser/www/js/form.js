
 $(document).ready(function() {

             $('#FF1').click(function() {
                event.preventDefault();
                window.location='Signin Template · Bootstrap.html';
             });

     $('#FF').click(function() {
         event.preventDefault();
         var postData = $(document.getElementById("FORM").elements).serialize();
         var http = new XMLHttpRequest();
         var url = 'http://127.0.0.1/registration.php';
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
         // alert($(this).attr('value'));
         http.onreadystatechange = function() {
             if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    json = json.payload;
                    if(json=='false')
                        alert('Registration successful');
                    else alert('Username or e-mail is already taken');
             }
         }
         http.send(postData);

     });
 });