$(document).ready(function() {
    var storage = window.localStorage;
    try {
        var token = storage.getItem("TOKEN");
        var username = storage.getItem("USERNAME");
        var formData = 'USERNAME='+username+'&TOKEN='+token;
            var http = new XMLHttpRequest();
            var url = 'http://127.0.0.1/bookingtypes.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                    $('#BOOKINGTYPE').empty();
                    json = json.payload;
                    json = JSON.parse(json);
                    var i = 0;
                    for (key in json) {
                        var j = json[key];
                        if(i==0){$('#BOOKINGTYPE').append(`<option selected>` + j.BTYPE + `</option>`);}
                        else {$('#BOOKINGTYPE').append(` <option>` + j.BTYPE + `</option>`);}
                        i = i + 1;}
                }
            }
            http.send(formData);
    } catch (error) {
        console.error(error);
    }
});