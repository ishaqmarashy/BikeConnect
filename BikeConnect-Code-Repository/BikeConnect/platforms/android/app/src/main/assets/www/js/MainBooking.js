 $(document).ready(function() {

     $('#FORM').submit(function() {
         event.preventDefault();
          var storage = window.localStorage;
    try {
        var token = storage.getItem("TOKEN");
        var username = storage.getItem("USERNAME");
         var str=$(this).find('#location').val();
         var DATEFROM=$(this).find('#dtimefield').val();
         var DATETO=$(this).find('#time').val();
         var BOOKINGTYPE=$(this).find('#BOOKINGTYPE').val();
         var BTYPE=$(this).find('#inputBike').val();
         var QUANTITY=$(this).find('#QUANTITY').val();
         var GEAR=$(this).find('#GEAR').prop("checked");
         str  =str.substring(1,str.length-1);
         str= str.split(", ");
         var lat=str[0];
         var long=str[1];
         str=DATEFROM.split("T");
         DATEFROM=DATEFROM.replace("T", " ");
         str=str[0]+" "+DATETO;
         var formData = 
         'LAT='+lat+'&LONG='+long+'&DATEFROM='+
         DATEFROM+'&DATETO='+str+'&BTYPE='+BTYPE+
         '&USERNAME='+username+'&TOKEN='+token+
         '&BOOKINGTYPE='+BOOKINGTYPE+'&QUANTITY='+QUANTITY+'&GEAR='+GEAR;
            var http = new XMLHttpRequest();
         var url = 'http://192.168.43.248/USER/USERbookingconstraintbbconstrainbikesinsert.php';
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
         http.onreadystatechange = function() {
             if (http.readyState == XMLHttpRequest.DONE) {
                    var json = jQuery.parseJSON(http.responseText);
                if(json.dbtoken=='false') alert('Failed to make booking:'+json.dbexception);  
                else if(json.dbtoken=='true') alert('Booking successful! Booking ID:'+json.dbquery); 
             }
         }
         http.send(formData);
    } catch (error) {
        console.error(error);
    }
         
     });
 });