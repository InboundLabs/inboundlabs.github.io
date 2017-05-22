(function() {
  

var popupHtml = '<div id="authwindow" class="overlay modal auth hidden">'+
'    <div>'+
'        <div class="window slideDown">'+
'            <div class="upperSide">'+
'                <img src="https://cdn2.hubspot.net/hubfs/346178/BRiX_LP_Assets/brix-logo-desktop.png" alt="BRiX Logo">'+
'                <h1>Welcome to The Startup Framework!</h1>'+
'                <p class="message-normal">Our BRIX editor allows you to build new HubSpot pages with simple drag & drop. You can share the page with other team members for review by copying the URL. Once you are ready simply hit the ?install? button and your page will be deployed in your HubSpot portal.</p>'+
'                <p class="message-standalone-module-installer">Sign in to install all modules of The Startup Framework including a sample page.</p>'+
'                <span id="authContinue" class="authContinue btn btn-orange btn-with-sprocket">SIGN-IN NOW</span>'+

'                <div class="authNoHubDb-container">'+
'                    <p><strong>BRiX works best with <a href="http://designers.hubspot.com/docs/tools/hubdb" target="_blank">HubDB</a> enabled.</strong> This requires the HubSpot <a href="https://www.hubspot.com/products/website" target="_blank">website add-on</a>. If your portal doesn\'t have this add-on (or your add-on is in trial mode), some design modules will be removed from the editor to make the Framework compatible with HubSpot landing pages.</p>'+
'                </div>'+

'                <div class="trial-portal-container signin-checkbox">'+
'                    <p>'+
'                        <label><input type="checkbox" id="is-trial-portal" />I am on a free Hubspot trial</label>'+
'                    </p>'+
'                </div>'+
'            </div>'+
'        </div>'+
'    </div>'+
'</div>';

var DMI_BASE = "https://ttwh15z7dc.execute-api.us-east-1.amazonaws.com/prod/dmi";
var buildHiddenForm = function(formId, extraOptions, onFormReady) {
    var formToken = "ft" + String(Math.random()).slice(2);
    var formContainer = $("<div/>").attr("id", "ct" + formToken).hide().appendTo("body");
    var targetFrame = $("<iframe/>").attr("name", "target" + formToken).hide().appendTo("body");
    hbspt.forms.create($.extend({
        portalId: '346178',
        formId: formId,
        target: "#" + formContainer.attr("id"),
        formInstanceId: formToken,
        onFormReady: function($form) {
            if (!extraOptions.redirectUrl) {
                $form.attr("target", targetFrame.attr("name"));
            }
            return onFormReady.apply(this, arguments);
        }
    }, extraOptions));
};
function urlSafeBase64Encode(input) {
    return window.btoa(unescape(encodeURIComponent(input))).replace(/\+/g, '-') // Convert '+' to '-'
        .replace(/\//g, '_') // Convert '/' to '_'
        .replace(/=+$/, ''); // Remove ending '='
}
var startAuth = function(editorUrl) {
    removeAuthUrlParams();
    var redirectUrl = DMI_BASE + "/run/" + urlSafeBase64Encode(JSON.stringify({
        authRedirect: editorUrl
    }));
    buildHiddenForm('0737253c-3c80-40cf-9179-f33b69dff350', {
        redirectUrl: redirectUrl
    }, function($form) {
        $form.attr("target", "_top");
        $form.find("[name=brix_is_trial_portal]").val($("#is-trial-portal:checked").length ? "Yes" : "No").change();
        $form.submit();
    });
};
$(document).ready(function() {
    $("a[href*='/brix-editor']").one("click", function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        $(popupHtml).appendTo("body");
        setTimeout(function() {
            $("#authwindow").removeClass("hidden");
            $("#authContinue").click(function(e) {
                e.preventDefault();
                startAuth(href);
            });
        }, 10);
    });
});

!function() {
  var t;
  if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0, 
  t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
  t.factory = function(e) {
    return function() {
      var n;
      return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
    };
  }, t.methods.forEach(function(e) {
    t[e] = t.factory(e);
  }), t.load = function(t) {
    var e, n, o, i;
    e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"), 
    o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js", 
    n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
  });
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('p9y82rccazwz');

drift.on('ready', function(api) {
    setTimeout(function() {
        api.openChat();
    }, 5000);
});
})();
