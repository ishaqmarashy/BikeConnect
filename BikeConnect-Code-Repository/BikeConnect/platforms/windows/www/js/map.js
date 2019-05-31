$(document).ready(function(){
     //MAPCONTENT
            var storage = window.localStorage;
            var token = storage.getItem("TOKEN");
            var username = storage.getItem("USERNAME");
            var formData={USERNAME: username,TOKEN: token};
            // var formData={USERNAME: "1",TOKEN: "1"};
       
            
            $.post("//127.0.0.1/map.php",formData).done(function( data ) {
              var json=jQuery.parseJSON(data);
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
                    `; 
              var pins=" ";
              for(key in json){
                var j=json[key];
                pins=pins+`var x`+j.HID+` = new google.maps.Marker({position: {lat:`+j.LATITUDE+`, lng: `+j.LONGITUDE+`}, map: map}); x`
                +j.HID+`.addListener('click', function() {
                map.setCenter(this.getPosition());
                document.getElementById('validationDefault04').value=this.getPosition();
              }); `;
              }

            //  $("#replace").append(pins);
              Mapin=Mapin+pins;
              Mapin=Mapin+`}</script>
                <script async defer
                  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlJqywLdB7npTxSJDGyGIQM4raDCm45RM&callback=initMap">
                </script>`
             $("#MAPCONTENT").append(Mapin);

           });
      });