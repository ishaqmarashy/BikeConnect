$(document).ready(function(){
            $('#logout').on('click', function(){
            window.localStorage.clear();
            event.preventDefault();
        	window.location = 'index.html'	;
});});