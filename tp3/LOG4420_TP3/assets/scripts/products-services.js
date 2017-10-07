'use strict';

var ProductsServices = (function() {
	var self = {};

	self.getData = function() {
		return $.get("./data/products.json");
	}

	self.update = function(data, filter, sort) {
		var updatedData = _updateCatagories(data, filter);
		_updateCriteria(updatedData, sort);
		return updatedData;
	}

	function _updateCatagories(data, filter) {
		if (filter === 'all') return data;
		return data.filter(product => {
			return product.category === filter;
		});
	}

	function _updateCriteria(data, sort) {
		data.sort((a, b) => {
			return _applySortCriteria(a, b, sort);
		});
	}

	function _applySortCriteria(a, b, sort) {
		switch(sort) {
			case 'LH': return a.price > b.price;
			case 'HL': return a.price < b.price;
			case 'AZ': return a.name > b.name;
			case 'ZA': return a.name < b.name;
		}
	}

	return self;
})();
