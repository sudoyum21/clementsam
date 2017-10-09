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
    var cart;

    self.saveAddedProduct = function(id, quantity) {
        var productToSave = _getProductToSave(id, quantity);
        cart = _getCartFromLocalStorage();
        _addToCart(productToSave);
        localStorage['cart'] = JSON.stringify(cart);
        console.log('Cart local storage:');
        console.log(cart);
    }

    function _getProductToSave(id, quantity) {
        var product = ProductServices.getProduct(id);
        return {
            id: parseInt(id),
            name: product.name,
            price: product.price,
            quantity: parseInt(quantity)
        };
    }

    function _getCartFromLocalStorage() {
        var localCartData = localStorage['cart'];
        if (localCartData == null) {
            return [];
        } 
        return JSON.parse(localCartData);
    }

    function _addToCart(productToSave) {
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
