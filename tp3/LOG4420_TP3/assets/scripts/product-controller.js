'use strict';

var ProductController = (function() {
	var self = {};

	self.init = function() {
		var product = ProductServices.getProduct($.urlParam('id'));
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
		return results[1] || 0;
	}

	return self;
})();

ProductServices.getRequest().done(data => {
	ProductServices.initData(data);
	ProductController.init();
});
