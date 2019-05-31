
$(document).ready(function(){
     //MAPCONTENT
            var storage = window.localStorage;
            try{
            var token = storage.getItem("TOKEN");
            var username = storage.getItem("USERNAME");
            var formData={USERNAME: username,TOKEN: token};
            // var formData={USERNAME: "1",TOKEN: "1"};
       
         var formData = 'USERNAME='+username+'&TOKEN='+token;
         var http = new XMLHttpRequest();
         var url = 'http://192.168.43.248/USER/map.php';
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            
         http.onreadystatechange = function() {
              if (http.readyState == XMLHttpRequest.DONE) {
                  var json=jQuery.parseJSON(http.responseText);
                  json=json.payload;
                  json=JSON.parse(json);
                  var Mapin=  `<script>
                  // Initialize and add the map
                    function initMap() {
    					var pos ={lat: 25.0657, lng: 55.17128};
    					if (navigator.geolocation) {
    					  navigator.geolocation.getCurrentPosition(function(position) {
    						var pos = {
    						  lat: position.coords.latitude,
    						  lng: position.coords.longitude
    					  };})}
                        var map = new google.maps.Map(
                        document.getElementById('map'), {zoom: 12, center:pos});

                        var geocoder = new google.maps.Geocoder;
                        var infowindow = new google.maps.InfoWindow;
                        `; 
                  var pins=" ";
                  for(key in json){
                    var j=json[key];
                    pins=pins+`var x`+j.HID+` = new google.maps.Marker({position: {lat:`+j.LATITUDE+`, lng: `+j.LONGITUDE+`}, map: map}); x`
                    +j.HID+`.addListener('click', function() {
                    var xy=this;
                    geocoder.geocode( { 'location': xy.getPosition()}, function(results, status) {
                      if (status === 'OK') {
                            if (results[0]) {
                              map.setCenter(xy.getPosition());
                              infowindow.setContent(results[0].formatted_address);
                              infowindow.open(map, xy);
                           }
                        }
                       });
                    document.getElementById('location').value=this.getPosition();
                  }); `;
              }

            //  $("#replace").append(pins);
              Mapin=Mapin+pins;
              Mapin=Mapin+`}</script>
                <script async defer
                  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0c6uz6U6phJevwpEQ10DLgLZ1mf2SVyo&sensor=true&callback=initMap">
                </script>
                `
             $("#MAPCONTENT").append(Mapin);
   }
         }
         http.send(formData);
                 }catch(error) {  console.error(error);}

      });