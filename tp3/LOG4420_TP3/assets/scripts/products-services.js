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
        console.log(updatedData)
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
        switch(sort) {
            case 'LH':  data.sort(function(a,b) {return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);} );
            break;
            case 'HL':  data.sort(function(a,b) {return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0);} );
            break;
            case 'AZ':  data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
            break;
            case 'ZA':  data.sort(function(a,b) {return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0);} );
            break;
        }
       

    }

    function _applySortCriteria(a, b, sort) {
        console.log(a)
        console.log(b)
        console.log(a.price > b.price)
        switch(sort) {
            case 'LH': return a.price > b.price;
            case 'HL': return a.price < b.price;
            case 'AZ': return a.name > b.name;
            case 'ZA': return a.name < b.name;
        }
    }

    return self;
})();
