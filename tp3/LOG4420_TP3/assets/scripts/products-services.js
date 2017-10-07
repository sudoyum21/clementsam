var ProductsServices = (function() {
	'use strict'
	var self = {};

	self.getData = function() {
		return $.get("./data/products.json");
	};

	return self;
})();

ProductsServices.Categories = (function() {
	var self = {};
	
	self.setOnClick = function() {
		$('#product-categories > button').each(function() {
			$(this).click(() => {
				$('#product-categories > button').each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
			});
		});
	};

	self.camerasOnly = function(data) {
		return data.filter(product => {
			return product.category === 'cameras';
		});
	};

	self.consolesOnly = function(data) {
		return data.filter(product => {
			return product.category === 'consoles';
		});
	};

	self.screensOnly = function(data) {
		return data.filter(product => {
			return product.category === 'screens';
		});
	};

	self.computersOnly = function(data) {
		return data.filter(product => {
			return product.category === 'computers';
		});
	};

	return self;
})();

ProductsServices.Criteria = (function() {
	var self = {};

	self.setOnClick = function() {
		$('#product-criteria > button').each(function() {
			$(this).click(() => {
				$('#product-criteria > button').each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
			});
		});
	};

	self.sortPriceLowHigh = function(data) {
		data.sort((a, b) => {
			return a.price > b.price;
		});
	};
	
	self.sortPriceHighLow = function(data) {
		data.sort((a, b) => {
			return a.price < b.price;
		});
	};
	
	self.sortNameAZ = function(data) {
		data.sort((a, b) => {
			return a.name > b.name;
		});
	};
	
	self.sortNameZA = function(data) {
		data.sort((a, b) => {
			return a.name < b.name;
		});
	};

	return self;
})();
