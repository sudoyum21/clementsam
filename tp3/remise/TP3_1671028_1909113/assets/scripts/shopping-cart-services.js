'use strict';

var ShoppingCartServices = (function() {
    var self = {};
    /**
     * enlever un produit par index
     * @param {index} - index du produit
     */
    self.removeProduct = function(index) {
        var cart = self.getCart();
        var quantityToRemove = cart[index].quantity;
        cart.splice(index, 1);
        localStorage['cart'] = JSON.stringify(cart);
        HeaderServices.addToCartCount(-quantityToRemove);
    }
    /**
     * Mettre a jour la quantite du produit selon lindex et la quantite
     * @param {index} - index du produit
     * @param {quantityToAdd} - quantite a ajouter
     */
    self.addToProductQuantity = function(index, quantityToAdd) {
        var cart = self.getCart();
        cart[index].quantity += quantityToAdd;
        localStorage['cart'] = JSON.stringify(cart);
        HeaderServices.addToCartCount(quantityToAdd);
    }
    /**
     * vider le panier
     */
    self.emptyCart = function() {
        localStorage['cart'] = [];
        HeaderServices.setToZeroCartCount();
    }
    /**
     * obtenir le panier
     */
    self.getCart = function() {
        var localCartData = localStorage['cart'];
        if (localCartData == null || localCartData == []) {
            return [];
        } 
        return JSON.parse(localCartData);
    }

    return self;
})();