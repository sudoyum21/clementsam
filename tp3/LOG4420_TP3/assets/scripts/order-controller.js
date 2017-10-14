'use strict';

var OrderController = (function () {
    var self = {};

    self.setOnSubmitClearCartCount = function ()  {
        $('#order-form').submit((event) => {
            let cart = ShoppingCartServices.getCart();
            if(Object.keys(cart).length > 0){
                let firstname = $('#first-name').val();
                let lastname = $('#last-name').val();
                OrderServices.updateLastOrderToLS(firstname, lastname);
            }
        });
    }

    self.formValidator = function (){
        $("#order-form").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                "first-name": {
                    required: true,
                    minlength: 2
                },
                "last-name": {
                    required: true,
                    minlength: 2
                },
                phone: {
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
            }
        });
        _addExpCreditValidator();
    }

    function _addExpCreditValidator(){
        $.validator.addMethod("expCredit", function (value, element) {
            return this.optional(element) || /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value);
        }, "La date d'expiration de votre carte de crédit est invalide.");    
    }
  
    $(document).ready(function () {
        OrderController.formValidator();
        OrderController.setOnSubmitClearCartCount();      
    });

    return self;
})();