	 
$(document).ready(function(){
            var storage = window.localStorage;

            try{
            var token = storage.getItem("TOKEN");
            var eid = storage.getItem("EID");
            var formData = 'EID='+eid+'&TOKEN='+token+'&DAY='+0;
            var http = new XMLHttpRequest();
	 		var url = 'http://192.168.43.248/ADMIN/ADMINactiveBikes.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
	                var json = jQuery.parseJSON(http.responseText);
                    json = json.payload;
                    json = JSON.parse(json);
                    var i=0;
                    if (json==false);
                    else 
                    	i=json.length;
			url = 'http://192.168.43.248/ADMIN/ADMINCountBikes.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
	                var json = jQuery.parseJSON(http.responseText);
                    json = json.payload;
                    json = JSON.parse(json);
                    i=(i/json[0]['count'])*100;
                    $('#CURRF').empty().append(i+"%");
                    document.getElementById("PBAR").setAttribute("style", "width:"+i+"%");
                }
            }
                        http.send(formData);

                }
            }
            http.send(formData);
            
    } catch (error) {
        console.error(error);
    }
      });