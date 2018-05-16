
<script>
    $(document).ready(function() {
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css">');
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
</script>
