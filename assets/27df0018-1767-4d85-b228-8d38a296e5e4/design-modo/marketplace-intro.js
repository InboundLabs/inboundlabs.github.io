(function() {
  

var popupHtml = '<div id="authwindow" class="overlay modal auth">'+
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
	
$(document).ready(function() {
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
