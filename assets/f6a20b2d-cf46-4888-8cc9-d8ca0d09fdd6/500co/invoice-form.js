jQuery(document).ready(function($) {
    var createForm = function() {
        hbspt.forms.create({ 
            portalId: '698640',
            formId: 'd04f1243-3a33-476f-944f-7d609951e61e',
            target: "#invoice-form-host",
            onFormReady: function($form) {
                "use strict";
                (function() {
                    var validatorField = $form.find("[name=invoice_validator]");
                    var itemCountField = $form.find("[name=invoice_item_count]");
                    validatorField.closest("fieldset").hide();
                    var itemFields = $form.find("[name=invoice_line_1], [name=invoice_line_2], [name=invoice_line_3], [name=invoice_line_4], [name=invoice_line_5]");
                    var itemAmountFields = $form.find("[name=invoice_line_1_amount], [name=invoice_line_2_amount], [name=invoice_line_3_amount], [name=invoice_line_4_amount], [name=invoice_line_5_amount]");
                    var totalAmountField = $form.find("[name=invoice_total_amount]");
                    var handled = false;
                    itemAmountFields.on("keyup change blur paste input", function() {
                        if (handled) {
                            return;
                        }
                        setTimeout(function() {
                            handled = false;
                            var total = null;
                            itemAmountFields.each(function() {
                                var val = $(this).val();
                                var parsedVal = parseFloat(val);
                                if (isNaN(parsedVal)) {
                                    return;
                                }
                                if (total === null) {
                                    total = 0;
                                }
                                total += parsedVal;
                            });
                            totalAmountField.val(total === null ? "" : total).change();
                        }, 10);
                    });
                    itemFields.add(itemAmountFields).change(function() {
                        var valid = true;
                        var gotEmpty = false;
                        var numLines = 0;
                        for (var i = 0; i < itemFields.length; i++) {
                            var line = $.trim($(itemFields[i]).val());
                            var amount = $(itemAmountFields[i]).val();
                            if ((line && !amount) || (!line && amount)) {
                                valid = false;
                            }
                            if (line && amount) {
                                if (gotEmpty) {
                                    valid = false; // No empty line between lines
                                } else {
                                    numLines++;
                                }
                            } else {
                                gotEmpty = true;
                            }
                        }
                        validatorField.val(valid ? "OK" : "").change();
                        itemCountField.val(numLines).change();
                    });
                })();
                var API_ENDPOINT = "https://4wzm6rt3l4.execute-api.us-east-1.amazonaws.com/prod/500co-invoice-handler";
                var API_KEY = "PMxA5dWjZ60xF3pAD6EQizJVoJqi2DOvZdOKLpiSR1kKx0ME3Vbw4Q25w8bOip4N";
                var showError = function(msg, severity) {
                    msg = msg || "Unknown error occurred";
                    severity = severity || "error";
                    noty({
                        text: msg,
                        type: severity,
                        killer: true
                    });
                };
                var apiCall = function(body) {
                    body = $.extend({key: API_KEY}, body);
                    return $.ajax({
                        url: API_ENDPOINT,
                        dataType: "json",
                        contentType: "application/json",
                        type: "post",
                        data: JSON.stringify(body)
                    }).pipe(function(resp) {
                        if (!resp.success) {
                            var ret = $.Deferred();
                            ret.reject(resp);
                            return ret;
                        }
                        return resp;
                    }, function(e) {
                        return e;
                    }).fail(function(e) {
                        console.error("API error: ", e);
                        showError("Failed to call API: " + (e.message || e.status || "Unknown error"));
                    });
                };
                var updatingFromContact = false;
                $form.find("[name=domain]").change(function() {
                    if (updatingFromContact) {
                        return;
                    }
                    var self = this;
                    setTimeout(function() {
                        var domain = $(self).val();
                        if (!domain) {
                            return;
                        }
                        noty({
                            text: "Validating domain...",
                            type: "info",
                            modal: true,
                            killer: true,
                            closeWith: []
                        });
                        apiCall({
                            func: "validateDomain",
                            domain: domain
                        }).done(function(resp) {
                            $.noty.closeAll();
                            if (!resp.valid) {
                                $form.find("[name=domain]").val("").change();
                                noty({
                                    text: "Invalid domain: " + domain,
                                    type: "warning",
                                    killer: true,
                                    timeout: 10000
                                });
                            }
                        }).fail(function(e) {
                            console.log(e);
                            $.noty.closeAll();
                            $form.find("[name=domain]").val("").change();
                            showError("Sorry, we are unable to validate the domain at this moment, please try again later, or use 'Fill info from contact email' button instead.");
                        });
                    }, 0);
                    
                });
                $("<button>Fill info from contact email</button>").appendTo($form.find(".hs_email")).click(function(e) {
                    e.preventDefault();
                    var email = $.trim($form.find("[name=email]").val());
                    if (!email) {
                        return;
                    }
                    noty({
                        text: "Fetching contact information...",
                        type: "info",
                        modal: true,
                        killer: true,
                        closeWith: []
                    });
                    apiCall({
                        func: "getContactInfo",
                        email: email
                    }).done(function(resp) {
                        $.noty.closeAll();
                        updatingFromContact = true;
                        $form.find("[name]").each(function() {
                            var o = $(this);
                            if (o.attr("name").indexOf("invoice") > -1) {
                                return;
                            }
                            var val = resp.contact[o.attr("name")];
                            if (val) {
                                o.val(val).change();
                            }
                        });
                        if (resp.company) {
                            $form.find("[name=domain]").val(resp.company.domain || "").change();
                            $form.find("[name=company]").val(resp.company.name || "").change();
                        }
                        updatingFromContact = false;
                    })
                });
            }
        });
    };
    var pendingComps = 1;
    var onCompLoad = function() {
        pendingComps--;
        if (pendingComps <= 0) {
            createForm();
        }
    };
    var loadScriptFor = function(url, cond) {
        if (cond) {
            return;
        }
        pendingComps++;
        $.ajax({
            url: url,
            cache: true,
            dataType: "script"
        }).done(onCompLoad);
    };
    loadScriptFor("//js.hsforms.net/forms/v2.js", window.hbspt && window.hbspt.forms);
    loadScriptFor("https://cdnjs.cloudflare.com/ajax/libs/jquery-noty/2.3.8/packaged/jquery.noty.packaged.min.js", window.noty && $.noty);
    var scriptTag = $("script.invoice-form-loader");
    $("<div class='invoice-form'><div id='invoice-form-host'/></div>").insertBefore(scriptTag.first());
    $("<link rel='stylesheet' type='text/css' href='//inboundlabs.github.io/assets/f6a20b2d-cf46-4888-8cc9-d8ca0d09fdd6/500co/invoice-form.css' />").appendTo("body");
    scriptTag.remove();
    
    onCompLoad();
});

// vim: sw=4 sts=4 ts=4
