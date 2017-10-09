'use strict';

var ShoppingCartServices = (function() {
	var self = {};
	var cart;

    self.removeProduct = function(id) {

    }

    self.addOneToProduct = function(id) {
    	cart = self.getCart();
    	cart.some(product => {
            if (product.id === productToSave.id) {
                productPresent = true;
                product.quantity += 1;
                return true;
            }
        });
    	HeaderServices.addToCartCount(1);
    }
    
    self.subOneToProduct = function(id) {
    	HeaderServices.addToCartCount(-1);
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