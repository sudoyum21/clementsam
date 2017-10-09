'use strict';

var ProductController = (function() {
    var self = {};
    var productId;

    self.setOnSubmitAddToCartForm = function() {
        $('#add-to-cart-form').submit((event) => {
            event.preventDefault();
            var quantity = $('#product-quantity').val();
            $('#dialog').text('Le produit a été ajouté au panier.');
            $('#dialog').addClass('show');
            setTimeout(function(){ $('#dialog').removeClass('show'); }, 5000);
            ProductServices.Cart.saveAddedProduct(productId, quantity);
            HeaderController.updateCartCount();
        });
    }

    self.displayProduct = function() {
        productId = $.urlParam('id');
        if (productId == null) {
            _displayNotFound();
            return;
        }
        var product = ProductServices.getProduct(productId);
        if (product != null) {
            _displayProduct(product);
        } else {
            _displayNotFound();
        }
    }

    function _displayProduct(product) {
        $('#product-name').html(product.name);
        $('#product-image').attr('alt', product.name);
        $('#product-image').attr('src', './assets/img/' + product.image);
        $('#product-desc').html(product.description);
        product.features.forEach(feature => {
            $('#product-features').append('<li>' + feature + '</li>');
        });
        $('#product-price').html(product.price + ' $');
    }

    function _displayNotFound(product) {
        $('#product-name').html('Page non trouvée !');
        $('.row').remove();
    }

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) return null;
        return results[1] || 0;
    }

    $(document).ready(function() {
        ProductServices.getRequest().done(data => {
            ProductServices.initData(data);
            ProductController.displayProduct();
            ProductController.setOnSubmitAddToCartForm();
        });
    });

    return self;
})();
