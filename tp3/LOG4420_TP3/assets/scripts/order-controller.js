'use strict';


var OrderController = (function () {
    var self = {};
    var orderNumber;

    self.setOnSubmitClearCartCount = function ()  {
        $('#order-form').submit((event) => {
            let cart = ShoppingCartServices.getCart();
            if(Object.keys(cart).length > 0){
                let firstname = $('#first-name').val();
                let lastname = $('#last-name').val();
                _setOrderNumber();
                OrderServices.updateLastOrderToLS(firstname, lastname, orderNumber);
            }
        });
    }
    self.setOrderNo = function(orderNo){
        orderNumber = orderNo ? orderNo : 0;
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
        }, "La date d’expiration de votre carte de crédit est invalide.");    
    }
    function _setOrderNumber(orderNo) {
        if(orderNo && orderNo < 0) {
            console.error('Setting order number failed. Input value is ' + orderNo)
            return;
        }
        orderNumber = orderNo ? orderNo : orderNumber + 1;
    }

    $(document).ready(function () {
        OrderController.formValidator();
        OrderController.setOrderNo(OrderServices.getLastOrder()['orderNumber']);
        OrderController.setOnSubmitClearCartCount();      
    });

    return self;
})();