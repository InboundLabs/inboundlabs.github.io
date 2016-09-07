// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
// MIT license
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };
(function() {
    'use strict';
    
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

(function() {
    var $;
    var wrapRaf = function(func) {
        var updateRequested = false;
        var handler = function(ts) {
            updateRequested = false;
            func(ts);
        };
        return function() {
            if (updateRequested) {
                return;
            }
            updateRequested = true;
            requestAnimationFrame(handler);
        };
    };

    var calloutHtml = (function () {/*
    <div class="randstad-callout" style="display: none">
        <img src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOC42MzgiIGhlaWdodD0iMTguNjQiIHZpZXdCb3g9IjAgMCAxOC42MzggMTguNjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIuNTY5IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0uMjg0LjI4NWgxNy45NDNWMTguMjNILjI4NHpNLjI4My4yODRsMTguMTU0IDE4LjE1NE0xOC4yMjguMjg0TC4yODMgMTguMjMiLz48L2c+PC9zdmc+" class="close-callout"/>
        <div class="callout-view view-intro">
            <h2>share this job to <strong>win a trip</strong> to a <strong>Formula One race</strong> in Texas</h2>
            <a class="callout-button jump-form" href="#">send to a friend</a>
            <a class="callout-small-link" href="#">learn more</a>
        </div>
        <div class="callout-view view-form">
            <div id="randstad-callout-formhost"></div>
            <label class="agree-toc"><input type="checkbox"/> I agree to the <a href="#">terms and conditions</a></label>
            <ul class="hs-error-msgs inputs-list toc-error" style="display:none;">
                <li>
                    <label>Please accept our terms and conditions before submitting the form.</label>
                </li>
            </ul>
            <div class="field hs-form-field combined-name">
                <label for="-"><span>your name</span></label>
                <div class="input">
                    <input class="hs-input" placeholder="" required="" type="text" value="">
                </div>
                <ul class="hs-error-msgs inputs-list" style="display:none;">
                    <li>
                        <label>Please enter your full name.</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="callout-view view-success">
        <h2><strong>success!</strong> you have been <strong>entered for <span class="nowrap">your chance to win!</span></strong></h2>
            <a class="callout-button" href="#">learn more about the race</a>
        </div>
    </div>
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    var haveJquery = !!window.jQuery;
    var init = function() {
        $ = window.jQuery;
        if (!haveJquery) {
            $.noConflict();
        }
        var CALLOUT_COOKIE = "randstad_callout_shown";
        $("<div/>").html(calloutHtml).children().appendTo("body");
        var container = $(".randstad-callout");
        var allViews = container.children(".callout-view");
        allViews.addClass("in");
        container.children(".close-callout").remove().prependTo(allViews);
        var adjustContainerHeight = function() {
            var newHeight = 0;
            allViews.each(function() {
                var viewHeight = $(this).outerHeight();
                if (viewHeight > newHeight) {
                    newHeight = viewHeight;
                }
            });
            container.height(newHeight);
        };
        container.find(".close-callout").click(function() {
            container.removeClass("in");
        });
        container.find(".jump-form").click(function(e) {
            e.preventDefault();
            allViews.filter(".view-intro").removeClass("in");
        });
        var showCallout = function() {
            container.hide();
            allViews.addClass("in");
            container.show();
            container.addClass("in");
            adjustContainerHeight();
            Cookies.set(CALLOUT_COOKIE, "1", {expires: 365});
        };
        hbspt.forms.create({ 
            css: '',
            portalId: '409577',
            formId: 'e1bb2e51-4d08-4749-8237-426f24e28cfc',
            target: "#randstad-callout-formhost",
            onFormSubmit: function() {
                allViews.filter(".view-form").removeClass("in");
                if (window.ga) {
                    ga('send', 'event', 'Form', 'submission', 'Contest Recommended Jobs 2016');
                }
            },
            onFormReady: function($form) {
                $form.find("[name=page_url]").val(location.href.replace(/[?#].*$/, "")).change();
                $form.find("[name=page_url_raw]").val(location.href).change();
                $form.find("[name=callout_job_title]").val($(".snap-content h1").first().text() || "").change();
                $form.find("[name=callout_job_location]").val($(".jbs-results-details dd span[id*=Location]").first().text() || "").change();
                $form.find("[name=callout_date_posted]").val($(".jbs-results-details dd span[id*=DatePosted]").first().text() || "").change();
                $form.find("[name=callout_job_type]").val($(".jbs-results-details dd span[id*=JobType]").first().text() || "").change();
                container.find(".agree-toc, .toc-error").insertBefore($form.find(".hs_submit"));
                var agreeTocCheckBox = $form.find(".agree-toc input");
                var tocError = $form.find(".toc-error");
                agreeTocCheckBox.on("click keyup change", function() {
                    tocError.hide();
                });
                var combinedName = container.find(".combined-name").insertBefore($form.find(".hs-form-field.hs_firstname"));
                var combinedNameErrorMsg = combinedName.find(".hs-error-msgs");
                var combinedNameInput = combinedName.find("input");
                var firstNameInput = $form.find(".hs_firstname input");
                var lastNameInput = $form.find(".hs_lastname input");
                combinedNameInput.on("input paste keyup change", wrapRaf(function() {
                    var splitted = $.trim(combinedNameInput.val()).split(" ");
                    firstNameInput.val(splitted[0]).change();
                    lastNameInput.val(splitted.slice(1).join(" ")).change();
                    combinedNameInput.toggleClass("invalid error", splitted.length < 2);
                    combinedNameErrorMsg.hide();
                })).blur(function() {
                    setTimeout(function() {
                        if (combinedNameInput.hasClass("invalid")) {
                            combinedNameErrorMsg.show();
                        }
                    }, 100);
                });
                $form.find(".hs_firstname, .hs_lastname").hide();
                var friendEmailInput = $form.find(".hs_friend_email input");
                var friendEmailErrorMsg = $("<ul class='hs-error-msgs inputs-list'><li><label>Please enter a valid email address.</label></li></ul>");
                var isFriendEmailValid = function() {
                    return /^[^@]+@[^.]+\..+$/gi.test(friendEmailInput.val());
                };
                var validateFriendEmail = function() {
                    if (friendEmailInput.val() && !isFriendEmailValid()) {
                        friendEmailInput.addClass("invalid error");
                        friendEmailErrorMsg.insertAfter(friendEmailInput.parent());
                    }
                };
                friendEmailInput.on("input paste keyup change", function() {
                    friendEmailErrorMsg.remove();
                }).blur(function() {
                    setTimeout(function() {
                        validateFriendEmail();
                    }, 100);
                });
                var originalSubmitButton = $form.find("input[type=submit]");
                var hookedButton = $("<a class='hs-button' href='#'/>").text(originalSubmitButton.val()).insertAfter(originalSubmitButton).click(function(e) {
                    e.preventDefault();
                    validateFriendEmail();
                    $form.find(".hs-input").trigger("change").trigger("blur");
                    if (combinedNameInput.hasClass("invalid")) {
                        combinedNameErrorMsg.show();
                    }
                    if (!agreeTocCheckBox.is(":checked")) {
                        tocError.show();
                    }
                    if ($form.find(".hs-error-msgs:visible").length) {
                        return;
                    }
                    originalSubmitButton.click();
                });
                originalSubmitButton.hide();
                $form.find("input").on("keydown keyup", function(e) {
                    if (e.which === 13) {
                        e.stopPropagation();
                        e.preventDefault();
                        hookedButton.click();
                    }
                });
                adjustContainerHeight();
                if (!Cookies.get(CALLOUT_COOKIE)) {
                    setTimeout(function() {
                        showCallout();
                    }, 10000);
                }
                $(document).on("click", ".randstad-callout-trigger", function(e) {
                    e.preventDefault();
                    showCallout();
                });
            }
        });

    };
    var pendingComps = 1;
    var onCompLoad = function() {
        pendingComps--;
        if (pendingComps <= 0) {
            init();
        }
    };
    var loadScript = function(url, callback) {
        // Adding the script tag to the head as suggested before
        var ref = document.getElementsByTagName('script')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        var cbCalled = false;
        var cbHandler = function() {
            if ( !cbCalled && (!this.readyState || this.readyState == 'complete') ) {
                cbCalled = true;
                callback();
            }
        };
        script.onreadystatechange = cbHandler;
        script.onload = cbHandler;

        // Fire the loading
        ref.parentNode.insertBefore(script, ref);
    }
    var loadScriptFor = function(url, cond) {
        if (cond) {
            return;
        }
        pendingComps++;
        loadScript(url, onCompLoad);
    };
    loadScriptFor("//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js", window.jQuery);
    loadScriptFor("//js.hsforms.net/forms/v2.js", window.hbspt && window.hbspt.forms);
    loadScriptFor("//cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.2/js.cookie.min.js", window.Cookies);
    onCompLoad();
})();
