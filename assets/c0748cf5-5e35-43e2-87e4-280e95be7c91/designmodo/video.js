// Depends on: https://github.com/nfl/jquery-oembed-all
jQuery(document).ready(function() {
  $("a.oembed").each(function() {
    var o = $(this);
    var href = o.attr("href");
    if (/\bwistia\.com\b/g.test(href)) {
      o.attr("href", href + (href.indexOf("?") ? "&" : "?") + "embedType=async_popover&videoFoam=true");
    }
  }).oembed();
});
