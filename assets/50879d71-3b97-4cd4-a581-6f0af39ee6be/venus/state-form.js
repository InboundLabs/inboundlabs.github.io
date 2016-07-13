window.__initStateForm = function($form) {
    var countrySel = $form.find("[name=country]");
    var stateRow = $form.find("[name=state_province]").closest(".hs-form-field").parent();
    var provinceRow = $form.find("[name=province]").closest(".hs-form-field").parent();
    if (!countrySel.length || !stateRow.length || !provinceRow.length) {
        console.log("Not all required fields are present");
        return;
    }
    window.initCountry = window.initCountry || function() {};
    if ($form.data("form-id") === "767f4061-d55e-4c6e-af76-d7550fba6063") {
        jQuery("<style type='text/css'> #theme-page .career-form-hs .hs-form fieldset.form-columns-1 .hs_country, #theme-page .career-form-hs .hs-form fieldset.form-columns-1 .hs_state_province { float: none; width: auto; } \n #theme-page .career-form-hs select { margin: 0; width: 100%; }</style>").appendTo("head");
    }
    var targetFields = $form.find("[name=state], [name=state_province_new__c]");
    var placeholderField = $form.find("[name=state_placeholder]");
    placeholderField.closest(".hs-form-field").parent().hide();
    var getActiveFieldRow = function() {
        var country = countrySel.val();
        if (country === "United States") {
            return stateRow;
        }
        if (country === "Canada") {
            return provinceRow;
        }
        return null;
    };
    var refreshActiveFieldRow = function() {
        var country = countrySel.val();
        if (country === "United States") {
            stateRow.show();
        } else {
            stateRow.hide();
            stateRow.find("[name]").val("").change();
        }
        if (country === "Canada") {
            provinceRow.show();
        } else {
            provinceRow.hide();
            provinceRow.find("[name]").val("").change();
        }
        return getActiveFieldRow();
    };
    var updateStateValue = function() {
        var stateRow = getActiveFieldRow();
        var state = stateRow ? stateRow.find("[name]").val() : "";
        state = state || "";
        targetFields.val(state).change();
        if (stateRow) {
            stateRow.find(".hs-error-msgs").remove();
        }
        placeholderField.val(stateRow ? state : "N/A").change();
    };
    var validateMandatoryState = function() {
        var activeRow = getActiveFieldRow();
        if (!activeRow) {
            return;
        }
        var isEmpty = !activeRow.find("[name]").val();
        activeRow.find(".hs-error-msgs").remove();
        if (isEmpty) {
            activeRow.children().first().append('<ul class="hs-error-msgs inputs-list" style="display:block;"><li><label>Please complete this mandatory field.</label></li></ul>');
        }
    };
    refreshActiveFieldRow();
    updateStateValue();
    countrySel.on("change keydown keyup mousedown mouseup", function() {
        refreshActiveFieldRow();
        updateStateValue();
    });
    stateRow.add(provinceRow).on("change keydown keyup mousedown mouseup", function() {
        updateStateValue();
    });
    $form.submit(validateMandatoryState);
    $form.find("input[type=submit]").click(validateMandatoryState);
};
if (window.jQuery) {
    window.jQuery(document).ready(function($) {
        "use strict";
        $("script.venus-state-form").each(function() {
            var scriptTag = $(this);
            if (scriptTag.data("inject-style")) {
                $("<link rel='stylesheet' type='text/css' href='//inboundlabs.github.io/assets/50879d71-3b97-4cd4-a581-6f0af39ee6be/venus/state-form-style.css' />").appendTo("head");
            }
            if (scriptTag.data("form-id")) {
                var target = scriptTag.data("form-container") || "career-form-hs";
                if (!$("#" + target).length) {
                    var formContainer = $('<div class="career-form-hs"/>');
                    formContainer.attr("id", target);
                    if (scriptTag.data("include-notes")) {
                        formContainer.append($('<p>* indicates required field</p><p>We value your <a href="/en-global/privacy-policy/">Privacy</a></p>'))
                    }
                    formContainer.insertAfter(scriptTag);
                }
                var initForm = function() {
                    hbspt.forms.create({
                        portalId: scriptTag.data("portal-id") || '712058',
                        formId: scriptTag.data("form-id"),
                        target: "#" + target,
                        onFormReady: function($form) {
                            window.__initStateForm($form);
                        }
                    });
                };
                if (window.hbspt && window.hbspt.forms) {
                    initForm();
                } else {
                    $.ajax({
                        url: "//js.hsforms.net/forms/v2.js",
                        cache: true,
                        dataType: "script"
                    }).done(initForm);
                }
            }
            scriptTag.remove();
        });
    });
}
