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
