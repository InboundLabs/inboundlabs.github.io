jQuery(document).ready(function($) {
  $(document).on("onAppFormReady", function(e, $form) {
    console.log("onAppFormReady", e, $form);
  });
});
