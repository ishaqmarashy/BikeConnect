	 
$(document).ready(function(){
            var storage = window.localStorage;

            try{
            var token = storage.getItem("TOKEN");
            var eid = storage.getItem("EID");
	
            var formData = 'EID='+eid+'&TOKEN='+token+'&STATUS='+'BROKEN';;
            var http = new XMLHttpRequest();
	 		var url = 'http://127.0.0.1/ADMIN/ADMINdisabledbikes.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
             http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    $('#TABLE1').empty();
                    json = json.payload;
                    json = JSON.parse(json);
                    var i = 0;
                    for (key in json) {
                        var j = json[key];
                        $('#TABLE1').append(
                            `
            <tr role="row" id="`+i+`">
            <th scope="col">` + i + `</th>
            <th scope="col">` + j.BID + `</th>
            <th scope="col">` + j.BTYPE + `</th>
            <th scope="col">` + j.STATUS + `</th>
            <th scope="col">` + j.VID + `</th>
            <th scope="col">` + j.HID + `</th>
            <th scope="col">` + j.LATITUDE + `</th>
            <th scope="col">` + j.LONGITUDE + `</th>
            <th scope="col"><button id="BIKE" name="BIKE" onclick="DEL(`+j.BID+`,`+i+`)" value="`+j.BID+`"class="btn btn-primary" type="button">Repair</button>
</th>
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