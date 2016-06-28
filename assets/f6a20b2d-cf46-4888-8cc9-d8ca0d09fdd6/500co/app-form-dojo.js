jQuery(document).ready(function($) {
  "use strict";
  $(document).on("onAppFormReady", function(e, $form) {
    var locationField = $form.find("[name=what_dojo]");
    var ownerField = $form.find("[name=hubspot_owner_form]");
    var locationOwners = {
      "LA": "6932349", // Andrei
      "Toronto": "9294262", // Dominic
      "Berlin": "7368417", // Matt Lerner
      "London": "7368417", // Matt Lerner
      "Miami": "9294157", // Bedy
      "Kuala Lumpur": "11582477" // Justyna
    };
    var refreshHsOwner = function() {
      var location = locationField.val();
      if (!location) {
        return;
      }
      var owner = locationOwners[location];
      if (!owner) {
        console.warn("No owner for location: " + location);
        owner = locationOwners["LA"];
      }
      ownerField.val(owner).change();
    };
    locationField.on("change keydown keyup mousedown mouseup blur", function() {
      refreshHsOwner();
    });
    refreshHsOwner();
  });
});
