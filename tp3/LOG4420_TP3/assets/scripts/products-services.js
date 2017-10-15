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
            case 'LH':  data.sort(function(a,b) {return (parseFloat(a.price.toString().replace(",", ".")) > parseFloat(b.price.toString().replace(",", "."))) ? 1 : ((parseFloat(b.price.toString().replace(",", ".")) > (parseFloat(a.price.toString().replace(",", "."))) ? -1 : 0))} );
            break;
            case 'HL':  data.sort(function(a,b) {return (parseFloat(a.price.toString().replace(",", ".")) < parseFloat(b.price.toString().replace(",", "."))) ? 1 : ((parseFloat(b.price.toString().replace(",", "."))< (parseFloat(a.price.toString().replace(",", "."))) ? -1 : 0))} );
            break;
            case 'AZ':  data.sort(function(a,b) {return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0);} );
            break;
            case 'ZA':  data.sort(function(a,b) {return (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() < a.name.toLowerCase()) ? -1 : 0);} );
            break;
        }
    }

    return self;
})();
