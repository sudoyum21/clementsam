'use struct';

var HeaderController = (function() {
    var self = {};

    self.updateCartCount = function() {
        var cartCount = HeaderServices.getCartCount();
        if(cartCount > 0){
            $(".shopping-cart > .count").css("visibility", "visible");
            $(".shopping-cart > .count").text(cartCount);
        } else {
            $(".shopping-cart > .count").css("visibility", "hidden");
        }
    }

    $(document).ready(function() {
        HeaderController.updateCartCount();
    })

    return self;
})();