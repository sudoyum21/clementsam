'use strict';

var ShoppingCartServices = (function() {
    var self = {};

    self.removeProduct = function(index) {

    }

    self.addToProductQuantity = function(index, quantityToAdd) {
        var cart = self.getCart();
        cart[index].quantity += quantityToAdd;
        HeaderServices.addToCartCount(quantityToAdd);
        localStorage['cart'] = JSON.stringify(cart);
    }
    
    self.emptyCart = function() {
        localStorage['cart'] = [];
        HeaderServices.setToZeroCartCount();
    }

    self.getCart = function() {
        var localCartData = localStorage['cart'];
        if (localCartData == null || localCartData == []) {
            return [];
        } 
        return JSON.parse(localCartData);
    }
/*
    self.getTotalPrice = function() {
        var total;
        self.getCart().forEach(product =>  {

        });
        return 
    }*/

    return self;
})();