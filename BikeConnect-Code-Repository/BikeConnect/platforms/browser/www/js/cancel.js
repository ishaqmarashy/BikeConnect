             function CAN(boid,i) {
               var storage = window.localStorage;
            try{
            var TOKEN = storage.getItem("TOKEN");
            var USERNAME = storage.getItem("USERNAME");
             var formData = 'USERNAME='+USERNAME+'&TOKEN='+TOKEN+'&BOID='+boid;
            var http = new XMLHttpRequest();
            var url = 'http://127.0.0.1/USER/USERDdelbooking.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    json = json.payload;
                    json = JSON.parse(json);
                    if(json==false)
                                        alert('Booking:'+boid+" canceled.");
                                                  $('#'+i).remove();

                }
            }
                                  http.send(formData);

              }
               catch (error) {
        console.error(error);
    }

          }