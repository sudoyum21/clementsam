'use strict';

var ProductController = (function() {
	var self = {};
	var originalData;

	self.getData = function() {
		return $.get("./data/products.json");
	}

	self.test = function(data) {
		originalData = data;
		var product = _getProduct($.urlParam('id'));
		if (product != null) {
			_displayProduct(product);
		} else {
			_displayNotFound();
		}
	}

	function _getProduct(id) {
		var myProduct = null;
		originalData.some(product => {
			if (product.id == id) {
				myProduct = product;
				return true;
			}
		});
		return myProduct;
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

	$.urlParam  = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}

	return self;
})();

ProductController.getData().done(data => {
	ProductController.test(data);
});