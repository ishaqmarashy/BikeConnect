  $(document).ready(function(){
            $('#FORM').on('submit', function(){
            event.preventDefault();
            var formData = $(this).serialize();
		    $.post($(this).attr('action'),formData).done(function( formData ) {});
          });});