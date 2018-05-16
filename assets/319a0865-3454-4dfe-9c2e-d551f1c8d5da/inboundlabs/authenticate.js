
    $(document).ready(function() {
    var cookie_val = Cookies.get('authenticated');
    if(cookie_val == "true")
        console.log("exit script");
    else{
        console.log("proceed with script");

        $.magnificPopup.open({
          items: {
            src: '#test-modal'
          },
        	type: 'inline',
        		preloader: false,
        		focus: '#username',
        		modal: true
        });
}

$( "#auth-form" ).submit(function( event ) {
  Cookies.set('authenticated', 'true');
  event.preventDefault();
  $.magnificPopup.close();
});
});
