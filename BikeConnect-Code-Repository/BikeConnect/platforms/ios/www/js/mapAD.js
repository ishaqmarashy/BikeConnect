
$(document).ready(function(){
     //MAPCONTENT
            var storage = window.localStorage;
            try{
            var TOKEN = storage.getItem("TOKEN");
            var EID = storage.getItem("EID");
       
         var formData = 'EID='+EID+'&TOKEN='+TOKEN;
         var http = new XMLHttpRequest();
         var url = 'http://127.0.0.1/ADMIN/mapAD.php';
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
                    var strn=`<tr ><th >`+j.BID+`</th><th >`+j.BTYPE+`</th><th >`+j.VID+`</th><th >`+j.HID+`</th><th >`+j.LATITUDE+`</th><th >`+j.LONGITUDE+`</th></tr>`;
                    pins=pins+`var x`+j.BID+` = new google.maps.Marker({position: {lat:`+j.LATITUDE+`, lng: `+j.LONGITUDE+`}, map: map}); x`
                    +j.BID+`.addListener('click', function() {
                    var xy=this;
                    $("#TABLE3").empty().append("`+strn+`");
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

      });s