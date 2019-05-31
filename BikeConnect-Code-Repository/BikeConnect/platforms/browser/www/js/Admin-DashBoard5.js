



// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var names = [];
var numbers = [];
var shades = [];
var size = 0;
$(document).ready(function(){
            var storage = window.localStorage;

            try{
            var token = storage.getItem("TOKEN");
            var eid = storage.getItem("EID");
  
            var formData = 'EID='+eid+'&TOKEN='+token+'&STATUS='+'BROKEN';;
            var http = new XMLHttpRequest();
      var url = 'http://127.0.0.1/ADMIN/ADMINviewhub.php';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
             http.onreadystatechange = function() {
                if (http.readyState == XMLHttpRequest.DONE) {
                    json = jQuery.parseJSON(http.responseText);
                    json = json.payload;
                    json = JSON.parse(json);
                    var i=0;
                    size=json.length;
                    for (key in json){
                      names.push(json[key]['HNAME']);
                       $("#piepie").append( `<span class="mr-1">
                <i class="fas fa-circle text-info"></i> `+json[key]['HNAME']+`</span>`);
                      numbers.push(json[key]['count']);
                      var shade=(((i++)/size)*255).toString(16);
                      shade="#"+(shade+shade+"FF");
                      shades.push(shade);
                    }

                    var ctx = document.getElementById("myPieChart");
                    var myPieChart = new Chart(ctx, {
                      type: 'doughnut',
                      data: {
                        labels: names,
                        datasets: [{
                          data: numbers,
                          backgroundColor: shades,
                          hoverBackgroundColor: shades,
                          hoverBorderColor: "rgba(234, 236, 244, 1)",
                        }],
                      },
                      options: {
                        maintainAspectRatio: false,
                        tooltips: {
                          backgroundColor: "rgb(255,255,255)",
                          bodyFontColor: "#858796",
                          borderColor: '#dddfeb',
                          borderWidth: 1,
                          xPadding: 15,
                          yPadding: 15,
                          displayColors: false,
                          caretPadding: 10,
                        },
                        legend: {
                          display: false
                        },
                        cutoutPercentage: 80,
                      },
                    });
                }
            }
            http.send(formData);
            
    } catch (error) {
        console.error(error);
    }
  




















  
});