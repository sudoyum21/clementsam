'use strict';

$(document).ready(function() {
    $.validator.addMethod("expCredit", function(value, element) {
        return this.optional(element) || /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value);
    }, "La date d’expiration de votre carte de crédit est invalide.");
    $("#order-form").validate({
        rules:{
            email:{
                required: true,
                email: true
            },
            "first-name" : {
                required: true,
                minlength:2
            },
            "last-name" : {
                required: true,
                minlength:2
            },
            phone : {
                required: true,
                phoneUS: true
            },
            "credit-card": {
                required: true,
                creditcard: true,
            },
            "credit-card-expiry": {
                required: true,
                expCredit: true,
            }
        },
        
    })
});
