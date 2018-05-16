<!-- Magnific Popup core CSS file -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css">
<!-- https://github.com/js-cookie/js-cookie  -->
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<!-- jQuery 1.7.2+ or Zepto.js 1.0+ -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<!-- Magnific Popup core JS file -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>



<!-- link that opens popup -->
<a class="popup-modal" href="#test-modal">Open modal</a>

<div id="test-modal" class="white-popup-block mfp-hide">
	<form id="auth-form">
	<h1>Authenticate</h1>
	<fieldset style="border:0;"> <ul> <li> <label for="name">Password</label>
	<input id="pwd-field" type="password" name="psw">
	<input type="submit" value="Submit"> </li> </ul> </fieldset> </form>
</form>
</div>


<script>
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
</script>
<style>
    #auth-form{
    background: #FFF;
    padding: 20px 30px;
    text-align: left;
    max-width: 650px;
    margin: 40px auto;
    position: relative;
    }
    #auth-form ul{
            list-style: none;
    }
    #auth-form ul label, #auth-form ul input{
        margin-right:10px;
    }
</style>
