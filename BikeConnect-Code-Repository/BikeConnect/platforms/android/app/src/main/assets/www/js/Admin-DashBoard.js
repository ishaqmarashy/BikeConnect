
$(document).ready(function(){
            var storage = window.localStorage;

            try{
            var token = storage.getItem("TOKEN");
            var eid = storage.getItem("EID");
  
            var formData = 'EID='+eid+'&TOKEN='+token;
            var http = new XMLHttpRequest();
            var url = 'http://192.168.43.248/ADMIN/ADMINviewbooking.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    $('#TOTALB').empty();
                    json = json.payload;
                    json = JSON.parse(json);
                     var url = 'http://192.168.43.248/ADMIN/ADMINgetSum.php';
                      http.open('POST', url, true);
                      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                      http.onreadystatechange = function() {
                          if (http.readyState == XMLHttpRequest.DONE) {
                            var json = jQuery.parseJSON(http.responseText);
                              $('#REV').empty();
                              json = json.payload;
                              json = JSON.parse(json);
                              if(json!=false)
                               $('#REV').append(json[0]['total']);
                               else  $('#REV').append(0);

                              var url = 'http://192.168.43.248/ADMIN/ADMINviewACC.php';
                                    http.open('POST', url, true);
                                    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                    http.onreadystatechange = function() {
                                        if (http.readyState == XMLHttpRequest.DONE) {
                                          var json = jQuery.parseJSON(http.responseText);
                                            $('#REG').empty();
                                            json = json.payload;
                                            json = JSON.parse(json);
                                            if(json!=false)
                                            $('#REG').append(json[0]['count']);
                                            else  $('#REG').append(0);


                                        }

                                    }
                                    http.send(formData);
                                            }
                      }
                      http.send(formData);
                      if(json!=false)
                      $('#TOTALB').append(json.length);
                    else  $('#TOTALB').append(0);

                }
            }
            http.send(formData);

    } catch (error) {
        console.error(error);
    }
      });