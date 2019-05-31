$(document).ready(function(){
            var storage = window.localStorage;
            var token = storage.getItem("TOKEN");
            var username = storage.getItem("USERNAME");
		   	$('#BIKESEARCH').on('keyup', function(e){
		   		let input =  e.target.value;

	            var formData={USERNAME: username,TOKEN: token,BOID:input};
	             
         		 $.post("//127.0.0.1/bikesearch.php",formData).done(function( data ) {
           		 	  var json=jQuery.parseJSON(data);
           		 	  $('#TABLE1').empty();
            		  json=json.payload;
            		  json=JSON.parse(json);   
            		  var i=0;
            		  for(key in json){
                		var j=json[key];
            		        	$('#TABLE1').append(
            		        		`
						<tr>
						<th scope="row">`+i+`</th>
						<td>`+j.BOOKINGTYPE+`</td>
						<td>`+j.USERNAME+`</td>
						<td>`+j.DATE+`</td>
						<td>`+j.BOID+`</td>
						<td>`+j.HID+`</td>
					</tr>`);
            		        	i=i+1;
              				}

           		 });
			});
});