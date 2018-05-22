	var url_magnific = "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js";
	
	if (/\bil_internal_auth=true\b/g.test(document.cookie)) console.log("exit script");
	else {
		$.getScript(url_magnific, function() {
			console.log("proceed with script");
			$('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css">').appendTo("head");
			var modal = '<div id="test-modal" class="white-popup-block mfp-hide">' + '<form id="auth-form">' + '<h1>Authenticate</h1>' + '<fieldset style="border:0;"> <ul> <li> <label for="name">Password</label>' + '<input id="pwd-field" type="password" name="psw">' + '<input type="submit" value="SUBMIT"> </li> </ul> </fieldset> <label class="error" style="color: red;">Login failed: Please make sure your password is correct.</label></form></div>';
			$("body").append(modal);
			$("#auth-form label.error").css("visibility", "hidden");
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
  				event.preventDefault();
				if($("#pwd-field").val() != "inboundLabs"){					
				  $("#auth-form label.error").css("visibility", "");
			          $("#auth-form").addClass("login-failed");
				}
				else{
				$("#auth-form").removeClass("login-failed");	
				$.getScript("https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js", function() {
					Cookies.set('il_internal_auth', 'true');				
				});				
				$.magnificPopup.close();
				}
			});
			var css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = "#auth-form{background: #FFF;padding: 50px 30px; padding-bottom: 20px; text-align: center;max-width: 650px;margin: 40px auto;position: relative;font-family: Helvetica,Arial,sans-serif;}" + "#auth-form h1{    margin-top: 0;  font-size:24px;  }" + "#auth-form fieldset {        padding:0;    }" + "#auth-form ul{    list-style: none;    margin: 0;    padding: 0;    }" + "#auth-form ul label, #auth-form ul input{        margin-right:10px;    }" + "#auth-form ul input{        padding-left: 5px; display:block; margin: 10px auto;   }" + ".mfp-inline-holder .mfp-content, .mfp-ajax-holder .mfp-content {width:auto;}" + "#auth-form ul input[type='submit']{display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out; color: #007bff; background-color: transparent; background-image: none; border-color: #007bff; cursor: pointer; width:100%;}" + "#auth-form ul input[type='submit']:hover{color: #fff; background-color: #007bff; border-color: #007bff;}" + "#auth-form ul input#pwd-field{    padding: 1em;     border: 1px solid rgba(0,0,0,.12); width: 100%; box-sizing: border-box; }";
			document.body.appendChild(css);
		});
	}
