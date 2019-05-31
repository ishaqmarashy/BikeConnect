	 
$(document).ready(function(){
            var storage = window.localStorage;

            try{
            var token = storage.getItem("TOKEN");
            var eid = storage.getItem("EID");
	
            var formData = 'EID='+eid+'&TOKEN='+token+'&STATUS='+'BROKEN';;
            var http = new XMLHttpRequest();
	 		var url = 'http://192.168.43.248/ADMIN/ADMINcomplaints.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                 http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    $('#TABLE2').empty();
                    json = json.payload;
                    json = JSON.parse(json);
                    var i = 0;
                    for (key in json) {
                        var j = json[key];
                        $('#TABLE2').append(
                            `
            <tr role="row" id="`+i+`">
            <th scope="col">` + i + `</th>
            <th scope="col">` + j.BOID + `</th>
            <th scope="col">` + j.USERNAME + `</th>
            <th scope="col">` + j.DATEFROM + `</th>
            <th scope="col">` + j.BID + `</th>
            <th scope="col">` + j.GEAR + `</th>
            <th scope="col">` + j.COMPLAINT + `</th>
             </tr>`);
                        i = i + 1;
                    }
                }
            }
            http.send(formData);
            
    } catch (error) {
        console.error(error);
    }
      });