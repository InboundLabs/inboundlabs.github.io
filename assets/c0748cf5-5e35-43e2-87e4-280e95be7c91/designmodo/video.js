// Depends on: https://github.com/nfl/jquery-oembed-all
jQuery(document).ready(function() {
  $("a.oembed").each(function() {
    var o = $(this);
    var href = o.attr("href");
    var paramCh = (href.indexOf("?") ? "&" : "?");
    var addDefaultParam = function(key, value) {
      var re = new RegExp("\\?(.*&)?" + key + "=");
      if (re.test(key)) {
        return;
      }
      href += paramCh;
      paramCh = "&";
      href += key + "=" + value;
    };
    if (/\bwistia\.com\b/g.test(href)) {
      addDefaultParam("embedType", "async_popover");
      addDefaultParam("videoFoam", "true");
    }
    o.attr("href", href);
  }).oembed();
});
