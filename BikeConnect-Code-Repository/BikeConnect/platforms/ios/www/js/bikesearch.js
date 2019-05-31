$(document).ready(function() {
    var storage = window.localStorage;
    try {
        var token = storage.getItem("TOKEN");
        var username = storage.getItem("USERNAME");
        $('#BIKESEARCH').on('keyup', function(e) {
            let input = e.target.value;
            var formData = 'USERNAME='+username+'&TOKEN='+token+'&BOID='+input
            ;
            // +'&COND="current_timestamp<"DATEFROM"';
            
            var http = new XMLHttpRequest();
            var url = 'http://127.0.0.1/bikesearch.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    $('#TABLE1').empty();
                    json = json.payload;
                    json = JSON.parse(json);
                    var i = 0;
                    //no 23188
                    //yes 23189
                    for (key in json) {
                        var j = json[key];
                        $('#TABLE1').append(
                            `
            <tr id="`+i+`">
            <th scope="row">` + i + `</th>
            <td>` + j.BOOKINGTYPE + `</td>
            <td>` + j.USERNAME + `</td>
            <td>` + j.DATEFROM + `</td>
            <td>` + j.DATETO + `</td>
            <td>` + j.BOID + `</td>
            <td>` + j.HID + `</td>
            <td>` + (j.GEAR=='t'? 'YES':'NO') + `</td>
            <td><button id="BOOKING" name="BOOKING" onclick="CAN(`+j.BOID+`,`+i+`)" value="`+j.BID+`"class="btn btn-primary" type="button">Cancel</button></td>
          </tr>`);
                        i = i + 1;
                    }
                }
            }
            http.send(formData);
        });

    } catch (error) {
        console.error(error);
    }
});