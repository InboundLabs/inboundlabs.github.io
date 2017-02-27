// Depends on: https://github.com/nfl/jquery-oembed-all
jQuery(document).ready(function() {
  $("a.oembed").each(function() {
    var o = $(this);
    var bgMode = o.hasClass("oembed-bg-video");
    var href = o.attr("href");
    var paramCh = (href.indexOf("?") > -1 ? "&" : "?");
    var addDefaultParam = function(key, value) {
      var re = new RegExp("\\?(.*&)?" + key + "=");
      if (re.test(href)) {
        return;
      }
      href += paramCh;
      paramCh = "&";
      href += key + "=" + value;
    };
    var onBeforeEmbed = function() {};
    if (/\bwistia\.com\b/g.test(href)) {
      if (bgMode) {
        addDefaultParam("embedType", "async");
        addDefaultParam("videoFoam", "false");
        addDefaultParam("playbar", "false");
        addDefaultParam("controlsVisibleOnLoad", "false");
        addDefaultParam("autoPlay", "true");
        addDefaultParam("endVideoBehavior", "loop");
        addDefaultParam("volume", "0");
      } else {
        addDefaultParam("embedType", "async_popover");
        addDefaultParam("videoFoam", "true");
      }
    } else if (/\byoutube\b/g.test(href) || /\byoutu\.be\b/g.test(href)) {
      addDefaultParam("rel", "0");
      addDefaultParam("showinfo", "0");
      if (bgMode) {
        addDefaultParam("controls", "0");
        addDefaultParam("autoplay", "1");
        addDefaultParam("loop", "1");
      }
    } else if (/\bvimeo\b/g.test(href)) {
      addDefaultParam("title", "false");
      if (bgMode) {
        onBeforeEmbed = function(_, data) {
          console.log(data.code);
        };
        addDefaultParam("autopause", "false");
        addDefaultParam("autoplay", "true");
        addDefaultParam("loop", "true");
      }
    }
    o.attr("href", href);
    o.oembed({
      beforeEmbed: onBeforeEmbed
    });
  })
});
