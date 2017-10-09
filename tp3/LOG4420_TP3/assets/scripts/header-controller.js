'use struct';

var HeaderController = (function() {
	var self = {};

    self.updateCartCount = function() {
    	var cartCount = HeaderServices.getCartCountLocalStorage();
        console.log('update cart count: ' + cartCount);
    	if(cartCount > 0){
            $(".shopping-cart > .count").css("visibility", "visible");
            $(".shopping-cart > .count").text(cartCount);
        } else {
            $(".shopping-cart > .count").css("visibility", "hidden");
        }
    }

	return self;
})();