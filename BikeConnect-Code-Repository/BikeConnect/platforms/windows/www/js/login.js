$(document).ready(function(){
            var storage = window.localStorage;
		   	// $('#replace').append(localStorage.getItem("TOKEN"));
		   	$('#FORM').on('submit', function(){
            event.preventDefault();

			var formData = $(this).serialize();
		    $.post($(this).attr('action'),formData).done(function( data ) {
		    	var jsonf=jQuery.parseJSON(data);
		    	if(jsonf.dbtoken.length>1){
			    	localStorage.setItem("USERNAME", jsonf.dbpost)
					localStorage.setItem("TOKEN", jsonf.dbtoken);
					window.location='Signin Template · Bootstrap.html';
			    }
		    });
		    
		});});