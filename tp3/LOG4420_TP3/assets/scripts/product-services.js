'use strict';

var ProductServices = (function() {
    var self = {};
    var data;

    self.getRequest = function() {
        return $.get("./data/products.json");
    }

    self.initData = function(d) {
        data = d;
    }

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

    self.saveAddedProduct = function(id, quantity) {
        var productToSave = _getProductToSave(id, quantity);
        _updateCart(productToSave);
        HeaderServices.addToCartCount(quantity);
    }

    function _getProductToSave(id, quantity) {
        var product = ProductServices.getProduct(id);

        return {
            id: parseInt(id),
            name: product.name || "",
            price: product.price || "",
            quantity: parseInt(quantity)
        };
    }

    function _updateCart(productToSave) {
        var cart = _getCart();
        _addToCart(cart, productToSave);
        localStorage['cart'] = JSON.stringify(cart);
    }

    function _getCart() {
        var localCartData = localStorage['cart'];
        if (localCartData == null || localCartData == []) {
            return [];
        } 
        return JSON.parse(localCartData);
    }

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
