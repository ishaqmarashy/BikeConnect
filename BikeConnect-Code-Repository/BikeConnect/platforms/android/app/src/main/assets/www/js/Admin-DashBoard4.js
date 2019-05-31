             function DEL(bid,i) {
               var storage = window.localStorage;

            try{
            var token = storage.getItem("TOKEN");
            var eid = storage.getItem("EID");
             var formData = 'EID='+eid+'&TOKEN='+token+'&BID='+bid+'&STATUS='+'INSERVICE';
            var http = new XMLHttpRequest();
            var url = 'http://192.168.43.248/ADMIN/ADMINdelBike.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                                        // alert('http.responseText');
                    var json = jQuery.parseJSON(http.responseText);
                    json = json.payload;
                    json = JSON.parse(json);
                }
            }
                                  http.send(formData);

            $('#'+i).remove();
              }
               catch (error) {
        console.error(error);
    }

          }