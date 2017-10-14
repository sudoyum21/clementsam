'use strict';

var ProductsServices = (function() {
    var self = {};
    var data;

    self.getRequest = function() {
        return $.get("./data/products.json");
    }

    self.initData = function(d) {
        data = d;
    }

    self.getUpdatedData = function(filter, sort) {
        var updatedData = _updateCatagory(filter);
        _updateCriteria(updatedData, sort);
        return updatedData;
    }

    function _updateCatagory(filter) {
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
        console.log(a.price.toString().replace(",", "."))
        console.log(b.price.toString().replace(",", "."))
        switch(sort) {
            case 'LH': return a.price.toString().replace(",", ".") > b.price.toString().replace(",", ".");
            case 'HL': return a.price.toString().replace(",", ".") < b.price.toString().replace(",", ".");
            case 'AZ': return a.name > b.name;
            case 'ZA': return a.name < b.name;
        }
    }

    return self;
})();
