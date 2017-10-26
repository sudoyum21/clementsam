'use strict';

var ProductServices = (function() {
    var self = {};
    var data;
    /**
     * obtenir la liste des produits. Il faut que le serveur soit fonctionnel
     */
    self.getRequest = function() {
        return $.get("./data/products.json");
    }
    /**
     * Initialiser notre data 
     */
    self.initData = function(d) {
        data = d;
    }
    /**
     * Obtenir un produit selon un id
     * @param {id} - parametre Id pour chercher un produit
     */
    self.getProduct = function(id) {
        var myProduct = null;
        data.some(product => {
            if (product.id == id) {
                myProduct = product;
                return true;
            }
        });
        return myProduct;
    }

    return self;
})();

ProductServices.Cart = (function() {
    var self = {};
    /**
     * Sauvgearder le produit et mettre a jour la quantite dans le panier
     * @param {id} - identifiant pour le produit
     * @param {quantity} - le nombre ditem interesse
     */
    self.saveAddedProduct = function(id, quantity) {
        var productToSave = _getProductToSave(id, quantity);
        _updateCart(productToSave);
        HeaderServices.addToCartCount(quantity);
    }
    /**
     * Obtenir le produit a sauvegarder
     * @param {id} - identifiant pour le produit
     * @param {quantity} - le nombre ditem interesse
     */
    function _getProductToSave(id, quantity) {
        var product = ProductServices.getProduct(id);

        return {
            id: parseInt(id),
            name: product.name || "",
            price: product.price.toFixed(2).replace(".", ",") || "",
            quantity: parseInt(quantity)
        };
    }
    /**
     * Mettre le panier a jour
     * @param {productToSave} - Produit a sauvegarder
     */
    function _updateCart(productToSave) {
        var cart = _getCart();
        _addToCart(cart, productToSave);
        localStorage['cart'] = JSON.stringify(cart);
    }
    /**
     * Obtenir le panier
     */
    function _getCart() {
        var localCartData = localStorage['cart'];
        if (localCartData == null || localCartData == []) {
            return [];
        } 
        return JSON.parse(localCartData);
    }
    /**
     * Mettre le panier a jour
     * @param {cart} - Le panier en question
     * @param {productToSave} - Produit a sauvegarder
     */
    function _addToCart(cart, productToSave) {
        var productPresent = false;
        cart.some(product => {
            if (product.id === productToSave.id) {
                productPresent = true;
                product.quantity += productToSave.quantity;
                return true;
            }
        });
        if (!productPresent) {
            cart.push(productToSave);
            cart.sort((a, b) => {
                return a.name > b.name;
            });
        }
    }

    return self;
})();
