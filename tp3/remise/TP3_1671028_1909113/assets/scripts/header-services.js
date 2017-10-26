'use struct';

var HeaderServices = (function() {
    var self = {};
/**
 * Retourne le nombre ditem dans le cart
 * @return cartCount
 */
    self.getCartCount = function() {
        var cartCount = localStorage['cartCount'];
        if (cartCount == null) {
            localStorage['cartCount'] = 0;
            return 0;
        }
        return cartCount;
    }
    /**
     * Ajout des items dans la cart
     * @param {quantityToAdd} - quantite a ajouter
     */
    self.addToCartCount = function(quantityToAdd) {
        localStorage['cartCount'] = parseInt(localStorage['cartCount']) + parseInt(quantityToAdd);
    }
    /**
     * Remet le cart count a zero
     */
    self.setToZeroCartCount = function() {
        localStorage['cartCount'] = 0;
    }

    return self;
})();