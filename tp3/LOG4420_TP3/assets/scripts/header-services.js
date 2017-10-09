'use struct';

var HeaderServices = (function() {
	var self = {};

    self.getCartCount = function() {
    	var cartCount = localStorage['cartCount'];
    	if (cartCount == null) {
    		localStorage['cartCount'] = 0;
    		return 0;
    	}
        return cartCount;
    }

    self.addToCartCount = function(quantityToAdd) {
        localStorage['cartCount'] = parseInt(localStorage['cartCount']) + parseInt(quantityToAdd);
    }

    self.setToZeroCartCount = function() {
    	localStorage['cartCount'] = 0;
    }

	return self;
})();