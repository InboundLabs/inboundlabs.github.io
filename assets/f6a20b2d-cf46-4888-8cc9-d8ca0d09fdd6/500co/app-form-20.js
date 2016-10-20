jQuery(document).ready(function($) {
    $('head').append("<link href='https://fonts.googleapis.com/css?family=Lato:400,700,300&subset=latin,latin-ext' rel='stylesheet' type='text/css'>");
    $('body').append("<link href='https://inboundlabs.github.io/assets/f6a20b2d-cf46-4888-8cc9-d8ca0d09fdd6/500co/app-form.css' rel='stylesheet' type='text/css'>");
    $("body").append("");
    var validationError = false;
    var refreshAllMandatoryStatus = null;
    hbspt.forms.create({
        css: '',
        portalId: '698640',
        formId: window.__appFormGuid || '8740254f-ae5d-4c8a-80a7-d0b4c1c9e6e3',
        target: '#appb17-formhost',
        onFormReady: function($form) {
            var launchedMandatoryFieldNames = ["when_launched", "active_customers", "churn_rate", "customer_channels", "gross_margins", "revenue_last_6_months"];
            var launchedMandatoryFields = $form.find("input, textarea").filter(function() {
                return launchedMandatoryFieldNames.indexOf($(this).attr("name")) > -1;
            });
            launchedMandatoryFields.addClass("launched-required");
            var isLaunchedFieldsMandatory = function() {
                var selectedLaunchedRadio = $form.find("input[name=product_launched]:checked");
                return !selectedLaunchedRadio.length || $.trim(selectedLaunchedRadio.val().toLowerCase()) === "yes";
            };
            var mandatoryErrorMsgElem = $(decodeURIComponent("%3Cli%2F%3E"))
            .addClass("mandatory-error-msg")
            .append($(decodeURIComponent("%3Clabel%2F%3E")).text("Please complete this mandatory field."));
            var updateMandatoryStatus = function(elem, skipValidation) {
                elem = $(elem);
                var isMandatory = isLaunchedFieldsMandatory();
                elem.closest(".hs-form-field").toggleClass("required-field", isMandatory);
                var errorMsgs = elem.closest(".hs-form-field").find(".hs-error-msgs");
                if (!errorMsgs.length) {
                    errorMsgs = $(decodeURIComponent("%3Cul%2F%3E")).addClass("hs-error-msgs inputs-list").appendTo(elem.closest(".hs-form-field"));
                }
                if (isMandatory) {
                    if (!skipValidation) {
                        var isInvalid = !$.trim(elem.val());
                        elem.toggleClass("invalid error", isInvalid);
                        if (isInvalid) {
                            if (!errorMsgs.find(".mandatory-error-msg").length) {
                                mandatoryErrorMsgElem.clone().appendTo(errorMsgs);
                            }
                        } else {
                            errorMsgs.find(".mandatory-error-msg").remove();
                        }
                    }
                } else {
                    if (!$.trim(elem.val())) {
                        elem.removeClass("invalid error");
                        errorMsgs.find(".mandatory-error-msg").remove();
                    }
                }
            }
            launchedMandatoryFields.on("change keydown paste blur", function() {
                updateMandatoryStatus(this);
            });
            refreshAllMandatoryStatus = function(skipValidation) {
                launchedMandatoryFields.each(function() {
                    updateMandatoryStatus(this, skipValidation);
                });
            };
            $form.find("input[name=product_launched]").on("click change", function() {
                refreshAllMandatoryStatus(true);
            });
            refreshAllMandatoryStatus(true);
            var requireds = $form.find('.hs-form-required, .launched-required');
            requireds.each(function(i, it) {
                $(it).closest('.hs-form-field').addClass('required-field');
                $(it).closest('.hs-form-field').find('.input').append('<span class="req-label">Required<\/span>');
            });
            $form.submit(function(e) {
                validationError = false;
                var scrollToElem = function(elem) {
                    elem.focus();
                    var targetTop = Math.max(0, elem.offset().top - 100);
                    var viewport = $("html");
                    if (viewport.scrollTop() > targetTop) {
                        viewport.scrollTop(targetTop);
                    }
                };
                var showFieldError = function(msg) {
                    noty({
                        text: msg,
                        type: "warning",
                        killer: true,
                        timeout: 5000
                    });
                };
                refreshAllMandatoryStatus();
                var enteredDomain = $.trim($form.find("input[name=domain]").val());
                if (!enteredDomain || enteredDomain.indexOf(" ") > -1 || enteredDomain.indexOf(".") === -1 || /^\d+$/.test(enteredDomain) || !/^(https?:\/\/[^\/]+\.[^\/]+\/?|[^\/]+\.[^\/]+)$/i.test(enteredDomain)) {
                    e.preventDefault();
                    validationError = true;
                    showFieldError("Please enter a correct domain name.")
                    scrollToElem($form.find("input[name=domain]"));
                    return;
                }
                var enteredAngelListLink = $.trim($form.find("input[name=angellist_link]").val());
                if (enteredAngelListLink && !/https?:\/\/(www\.)?angel\.co\/.*$/i.test(enteredAngelListLink)) {
                    e.preventDefault();
                    validationError = true;
                    showFieldError("Please enter a correct AngelList link.")
                    scrollToElem($form.find("input[name=angellist_link]"));
                    return;
                }
                if ($form.find(".hs-input.invalid").length) {
                    validationError = true;
                }
                setTimeout(function() {
                    var firstInvalidInput = $form.find(".invalid:visible").first();
                    if (firstInvalidInput.length) {
                        validationError = true;
                        scrollToElem(firstInvalidInput);
                        var errorMsg = $.trim(
                            firstInvalidInput
                            .closest(".hs-form-field")
                            .find(".hs-error-msgs li")
                            .filter(function() { return $(this).text().toLowerCase().indexOf("did you mean") === -1; })
                            .last().text()
                        );
                        if (errorMsg) {
                            if (firstInvalidInput.attr("name") === "email") {
                                var enteredEmail = $.trim(firstInvalidInput.val());
                                if (enteredEmail && enteredEmail.length < 10) {
                                    errorMsg = "Please use a longer email address.";
                                }
                            }
                            showFieldError(errorMsg);
                        }
                    }
                }, 10);
            });
            $(document).ready(function() {
                setTimeout(function() {
                    $(document).trigger("onAppFormReady", $form);
                }, 100);
            });
        },
        onFormSubmit: function($form) {
            $form.attr("action", "about:blank");
            $form.attr("target", "appb17-target");
            refreshAllMandatoryStatus();
            if ($form.find(".hs-input.invalid").length) {
                validationError = true;
            }
            if (validationError) {
                return;
            }
            var submittedMessage = $("<div class='submitted-message'>Thanks for submitting details about your startup to us. Someone on the team will contact you if there is a fit.</div>");
            setTimeout(function() {
                var hsSubmittedMessage = $(".submitted-message");
                if (!hsSubmittedMessage.length) {
                    return;
                }
                submittedMessage = hsSubmittedMessage.clone();
                hsSubmittedMessage.text("Submitting your form, please wait...");
                $("body").addClass("show-submitted-message");
            }, 1000);
            $form.find("input[type=submit]").hide().after($(decodeURIComponent("%3Cp%2F%3E")).addClass("form-submitting").text("Submitting your form, please wait..."));
            $form.on("submit.appb17", function(e) {
                e.preventDefault();
            });
            var TARGET_URL = "https://script.google.com/macros/s/AKfycbzcwekurPuau2slWavrvVMMCtC7qgWqCXApCD2En1kvLJd07H4h/exec";
            var makeToken = function()
            {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for( var i=0; i < 32; i++ )
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            };
            var token = "app" + makeToken();
            var submissionFrame = $("<iframe src='about:blank'/>").attr("name", token).appendTo("body");
            $form.attr("target", token);
            $form.attr("action", TARGET_URL + "?submissionToken=" + token);
            var onSubmissionFail = function(internalMessage, extra) {
                noty({
                    text: "Sorry, we are unable to submit your form at this moment, please try again later.",
                    type: "error",
                    killer: true
                });
                $form.find("input[type=submit]").show();
                $form.find(".form-submitting").remove();
                $form.off("submit.appb17");
                window.Raven && window.Raven.captureMessage(internalMessage, {
                    level: "error",
                    extra: {
                        submissionData: $form.serialize(),
                        extra: extra
                    }
                });
            };
            var timeoutToken = setTimeout(function() {
                onSubmissionFail("Submission doesn't complete before timeout");
            }, 30000);
            submissionFrame.load(function() {
                clearTimeout(timeoutToken);
                submissionFrame.remove();
                $.ajax(TARGET_URL + "?callback=?&submissionToken=" + token, {
                    dataType: "jsonp"
                }).pipe(function(resp) {
                    if (resp.success) {
                        noty({
                            text: window.__appFormSuccessMessage || "Thank you for applying to Batch 17. We will process your application and get back to you!",
                            type: "success",
                            killer: true
                        });
                        $form.remove();
                        $("body").addClass("show-submitted-message");
                        $("#appb17-formhost").html("").append(submittedMessage);
                        setTimeout(function() {
                            location.href = "http://500.co/";
                        }, 10000);
                    } else {
                        onSubmissionFail("Submission handler returned error, check log. resp: " + JSON.stringify(resp));
                    }
                }).fail(function(reason) {
                    onSubmissionFail("Failed to get submission result", reason);
                });
            });
            return;
        }
    });
})(jQuery);
