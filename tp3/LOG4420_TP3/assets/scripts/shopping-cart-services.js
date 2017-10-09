'use strict';

var ShoppingCartServices = (function() {
    var self = {};

    self.removeProduct = function(index) {
        var cart = self.getCart();
        var quantityToRemove = cart[index].quantity;
        cart.splice(index, 1);
        localStorage['cart'] = JSON.stringify(cart);
        HeaderServices.addToCartCount(- quantityToRemove);
    }

    self.addToProductQuantity = function(index, quantityToAdd) {
        var cart = self.getCart();
        cart[index].quantity += quantityToAdd;
        localStorage['cart'] = JSON.stringify(cart);
        HeaderServices.addToCartCount(quantityToAdd);
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

    return self;
})();