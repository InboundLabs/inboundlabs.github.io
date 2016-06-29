window.__initStateForm = function($form) {
    var countrySel = $form.find("[name=country]");
    var stateRow = $form.find("[name=state_province]").closest(".hs-form-field").parent();
    var provinceRow = $form.find("[name=province]").closest(".hs-form-field").parent();
    if (!countrySel.length || !stateRow.length || !provinceRow.length) {
        console.log("Not all required fields are present");
        return;
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
