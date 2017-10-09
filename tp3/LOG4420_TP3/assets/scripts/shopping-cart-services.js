'use strict';

var ShoppingCartServices = (function() {
	var self = {};
	var cart;

    self.removeProduct = function(id) {

    }

    self.addOneToProduct = function(id) {

    }
    
    self.subOneToProduct = function(id) {

    }
    
    self.emptyCart = function() {
		localStorage['cart'] = [];
		HeaderServices.setToZeroCartCount();
    }
    
    function _getCartLocalStorage() {
        var localCartData = localStorage['cart'];
        if (localCartData == null) {
            return [];
        } 
        return JSON.parse(localCartData);
    }

	return self;
})();