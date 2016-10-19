jQuery(document).ready(function() {
    var form2Tag = $('script[type="IN/Form2"]');
    var token;
    var initForm = function() {
        var forms = $(".body-container form.hs-form[id], form.hs-form[id]").first();
        if (!forms.length) {
            token = setTimeout(initForm, 1000);
            return;
        }
        token = null;
        $(window).off("load.liautofill");
        form2Tag.attr("data-form", forms.attr("id"));
        $.ajax({
        	url: "https://www.linkedin.com/autofill/js/autofill.js",
            dataType: "script",
            cache: true
        });
    };
    if (form2Tag.length) {
    	initForm();
        $(window).on("load.liautofill", function() {
        	setTimeout(function() {
            	clearTimeout(token);
			}, 5000);
        });
    } else {
    	console.log("LinkedIn autofill script tag is not present");
    }
});
