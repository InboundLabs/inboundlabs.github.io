// Async HubSpot Analytics Code
(function(d,s,i,r) {
if (d.getElementById(i)){return;}
var n=d.createElement(s),e=d.getElementsByTagName(s)[0];
n.id=i;n.src='//js.hs-analytics.net/analytics/'+(Math.ceil(new Date()/r)*r)+'/234796.js';
e.parentNode.insertBefore(n, e);
})(document,"script","hs-analytics",300000);

(function() {
"use strict";

var loadJS = function( src, cb ){
	var ref = document.getElementsByTagName( "script" )[ 0 ];
	var script = document.createElement( "script" );
	script.src = src;
	script.async = true;
	if (cb && typeof(cb) === "function") {
		script.onload = cb;
	}
	ref.parentNode.insertBefore( script, ref );
	return script;
};
var loadMultipleJS = function(srcs, cb) {
    if (!srcs.length) {
        cb();
        return;
    }
    var pendingScripts = srcs.length;
    for (var i = 0; i < srcs.length; i++) {
        (function() {
            var loaded = false;
            loadJS(srcs[i], function() {
                if (!loaded) {
                    loaded = true;
                    pendingScripts--;
                    if (pendingScripts <= 0) {
                        cb()
                    }
                }
            });
        })();
    }
};
var ensureDeps = function(cb) {
    cb = cb || function() {};
    var deps = [];
    if (!window.URI) {
        deps.push("https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.17.1/URI.min.js");
    }
    if (!window.UAParser) {
        deps.push("https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.10/ua-parser.min.js");
    }
    if (!window.hbspt || !window.hbspt.forms || !window.hbspt.forms.create) {
        deps.push("//js.hsforms.net/forms/v2.js");
    }
    loadMultipleJS(deps, cb);
};

// http://stackoverflow.com/a/24603642/987337
// This function ONLY works for iFrames of the same origin as their parent
var iFrameReady = function(iFrame, fn) {
    function ready() {
        fn.call(this);
    }

    function readyState() {
        if (this.readyState === "complete") {
            ready.call(this);
        }
    }

    // cross platform event handler for compatibility with older IE versions
    function addEvent(elem, event, fn) {
        if (elem.addEventListener) {
            return elem.addEventListener(event, fn);
        } else {
            return elem.attachEvent("on" + event, function () {
                return fn.call(elem, window.event);
            });
        }
    }

    addEvent(iFrame, "load", function () {
        var doc = null;
        try {
            doc = (iFrame.contentDocument || iFrame.contentWindow.document);
        } catch (e) {}
        ready.call(doc);
    });

    function checkLoaded() {
        var doc = iFrame.contentDocument || iFrame.contentWindow.document;
        addEvent(doc, "DOMContentLoaded", ready);
        addEvent(doc, "readystatechange", readyState);
    }
    checkLoaded();
};

var generateFormToken = function() {
    return "ft" + Math.random().toString(36).slice(2);
};
ensureDeps(function() {
    jQuery(document).ready(function($) {
        $("script[data-bafm-form=1]").each(function() {
            var scriptTag = $(this);
            var readParam = function(name, defaultValue) {
                return $.trim(scriptTag.data(name) || "") || defaultValue;
            };
            var token = generateFormToken();
            var formRoot = $("<div/>").addClass("formroot-" + token);
            formRoot.insertAfter(scriptTag);
            var formTarget = $("<iframe src='about:blank'/>")
            .attr("id", "target" + token)
            .attr("name", "target" + token)
            .css("display", "none")
            .appendTo(formRoot);
            var formContainer = $("<div/>")
            .attr("id", "formcontainer-" + token)
            .addClass("bafm-form-container")
            .appendTo(formRoot);

            var redirectUrlPersonal = readParam("redirect-url-personal", "//bookaflashmob.com/v2/hire-a-flash-mob-for-personal-events-thank-you/");
            var redirectUrlCorporate = readParam("redirect-url-corporate", "//bookaflashmob.com/v2/hire-a-flash-mob-corporate-thank-you/");
            var redirectionUrl = readParam("redirect-url-default", redirectUrlPersonal); // Sane default
            var selectRedirectionUrl = function($form) {
                var selectedInquiryFor = $.trim($form.find("input[name=this_inquiry_is_for]:checked").val() || "").toLowerCase();
                if (selectedInquiryFor === "company event" || selectedInquiryFor === "brand marketing campaign") {
                    redirectionUrl = redirectUrlCorporate;
                } else {
                    redirectionUrl = redirectUrlPersonal;
                }
            };
            var onFormTargetLoad = function() {
                var submitted = false;
                var iframeUrl = null;
                try {
                    iframeUrl = formTarget[0].contentWindow.location.href;
                } catch (e) {
                    // Cross-domain URL, assume it is redirected
                    submitted = true;
                }
                if (iframeUrl) {
                    submitted = !!/^https?:.*/.test(iframeUrl);
                }
                if (submitted) {
                    location.href = redirectionUrl;
                }
            };
            var avoidDuplicate = function($form) {
                if ($form.attr("data-submitted")) {
                    return false;
                }
                $form.attr("data-submitted", 1);
                $("<iframe name='dummy-iframe' src='about:blank'/>").css("display", "none").appendTo("body");
                setTimeout(function() {
                    $form.attr("target", "dummy-iframe");
                    $form.attr("action", "about:blank");
                    try {
                        $form[0].submit = function() {};
                    } catch (e) {
                        console.log(e);
                    }
                }, 0);
                $form.find("input[type=submit]")
                .prop("disabled", "disabled")
                .val("Please wait...")
                .text("Please wait...")
                .on("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                setTimeout(function() {
                    // Fallback, haven't found any way to catch onload event on iOS
                    location.href = redirectionUrl;
                }, 5000);
                return true;
            };
            hbspt.forms.create({ 
                sfdcCampaignId: readParam("sfdc-campaign-id", '701A00000004QxDIAU'),
                portalId: readParam("portal-id", '234796'),
                css: '',
                target: "#" + formContainer.attr("id"),
                formId: readParam("form-id", '715c680e-f293-4576-bc29-4e2b53f7044c'),
                formInstanceId: token,
                onFormSubmit: function($form) {
                    if (!avoidDuplicate($form)) {
                        throw new Error("Already submitted, throwing error to avoid duplicated submission");
                    }
                    selectRedirectionUrl($form);
                },
                onFormReady: function($form) {
                    "use strict";

                    $form.attr("target", formTarget.attr("name"));
                    
                    setTimeout(function() {
                        $form.find("input[type=submit]").prop("disabled", false);
                        $form.attr("data-submitted", "");
                    });
                    $form.on("submit", function(e) {
                        if (e.isDefaultPrevented()) {
                            return;
                        }
                        if (!avoidDuplicate($form)) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            return false;
                        }
                        selectRedirectionUrl($form);
                    });
                    
                    // Additional fields start
                    var uri = new URI();
                    var uriParams = uri.search(true);
                    
                    $form.find("input[name=unbounce_page_title]").val(document.title).change();
                    $form.find("input[name=unbounce_page_url]").val(location.href).change();
                    $form.find("input[name=unbounce_page_url_raw]").val(uri.search("").fragment("").toString()).change();
                    $form.find("input[name=website_domain_lead_converted_on]").val(uri.host()).change();
                    $form.find("input[name=referrer_unbounce]").val(document.referrer || "").change();
                    $form.find("input[name=unbounce_utm_campaign]").val(uriParams.utm_campaign || "").change();
                    $form.find("input[name=unbounce_utm_source]").val(uriParams.utm_source || "").change();
                    $form.find("input[name=unbounce_utm_medium]").val(uriParams.utm_medium || "").change();
                    
                    $.each(uriParams || {}, function(key, value) {
                        key = $.trim(String(key).toLowerCase()).replace(/[^0-9a-z]+/ig, "_");
                        $form.find("input[name=urlparam_" + key + "]").val(value || "").change();
                    });
                    
                    var uaResult = (new UAParser()).getResult();
                    $form.find("input[name=browser_name]").val(uaResult.browser.name || "").change();
                    $form.find("input[name=browser_version]").val(uaResult.browser.version || "").change();
                    $form.find("input[name=device_type]").val(uaResult.device.type || "").change();
                    $form.find("input[name=os_name]").val(uaResult.os.name || "").change();
                    $form.find("input[name=os_version]").val(uaResult.os.version || "").change();
                    
                    
                    // Additional fields end
                    formTarget.attr("src", "");
                    formTarget.on("load", onFormTargetLoad);
                    formTarget.load(onFormTargetLoad);
                    try {
                        iFrameReady(formTarget[0], onFormTargetLoad);
                    } catch (e) {
                        console.warn(e);
                    }
                }
            });
        }).remove();
    });
});

})();
