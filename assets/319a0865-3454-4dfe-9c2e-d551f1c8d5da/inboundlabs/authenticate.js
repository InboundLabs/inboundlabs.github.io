<script>
	var url_magnific = "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js";
	var url_cookie = "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js";
$.getScript(url_cookie, function() {
    var cookie_val = Cookies.get('il_internal_auth');
		if (cookie_val == "true")
		    console.log("exit script");
		else{
	$.getScript(url_magnific, function() {
			console.log("proceed with script");
			$('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css">').appendTo("head");
			var modal = '<div id="test-modal" class="white-popup-block mfp-hide">' + '<form id="auth-form">' + '<h1>Authenticate</h1>' + '<fieldset style="border:0;"> <ul> <li> <label for="name">Password</label>' + '<input id="pwd-field" type="password" name="psw">' + '<input type="submit" value="Submit"> </li> </ul> </fieldset> </form></div>';
			$("body").append(modal);
			$.magnificPopup.open({
				items: {
					src: '#test-modal'
				},
				type: 'inline',
				preloader: false,
				focus: '#username',
				modal: true
			});
		
		$("#auth-form").submit(function(event) {
			Cookies.set('il_internal_auth', 'true');
			event.preventDefault();
			$.magnificPopup.close();
		});
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = "#auth-form{background: #FFF;padding: 50px 30px;text-align: left;max-width: 650px;margin: 40px auto;position: relative;font-family: Helvetica,Arial,sans-serif;}" + "#auth-form h1{    margin-top: 0;    }" + "#auth-form fieldset {        padding:0;    }" + "#auth-form ul{    list-style: none;    margin: 0;    padding: 0;    }" + "#auth-form ul label, #auth-form ul input{        margin-right:10px;    }" + "#auth-form ul input{        padding-left: 5px;    }";
		document.body.appendChild(css);
		var link = '<a class="popup-modal" href="#test-modal">Open modal</a>';
	});
		}
}); </script>
