'use strict';

var ProductsServices = (function() {
    var self = {};
    var data;

    self.getRequest = function() {
        return $.get("./data/products.json");
    }
    /**
     * Initialisation des datas
     */
    self.initData = function(d) {
        data = d;
    }
    /**
     * Mettre a jour les datas
     */
    self.getUpdatedData = function(filter, sort) {
        var updatedData = _updateCatagory(filter);
        //console.log(updatedData)
        _updateCriteria(updatedData, sort);
        return updatedData;
    }
    /**
     * Mettre a jour la categorie
     */
    function _updateCatagory(filter) {
        if (filter === 'all') return data;
        return data.filter(product => {
            return product.category === filter;
        });
    }
    /**
     * Mettre a jour la liste des produits selon les criteres de filtrages ou categorisation
     */
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
