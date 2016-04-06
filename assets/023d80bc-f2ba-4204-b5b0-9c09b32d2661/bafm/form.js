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
	var ref = w.document.getElementsByTagName( "script" )[ 0 ];
	var script = w.document.createElement( "script" );
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

})();
