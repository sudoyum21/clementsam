'use strict';

var ProductsServices = (function () {
    var self = {};
    self.data;

    /**
     * Initialisation des datas
     */
    self.initData = function (d) {
        if(!self.data){
            self.data = d;
        }        
    }
      /**
   * Gets all the products.
   */
  self.getProducts = function(sortingCriteria, category) {
    let results = self.getUpdatedData(sortingCriteria);
    return results;
  }
    /**
     * Mettre a jour les datas
     */
    self.getUpdatedData = function (filter, sort) {
        var updatedData = _applyCategory(self.data, filter);
        _applySortingCriteria(updatedData, sort);
        return self.data;
    }
    /**
     * Applies a filter to the specified products list to keep only the products of the specified category.
     *
     * @param products        The products list to filter.
     * @param category        The category to use with the filter.
     * @returns {*}           The products list filtered.
     * @private
     */
    function _applyCategory(products, category) {
        if (products) {
            products = products.filter(function (product) {
                return category === "all" || product.category === category;
            });
        }
        return products;
    }

    /**
     * Applies a sorting criteria to the specified products list.
     *
     * @param products          The product list to sort.
     * @param sortingCriteria   The sorting criteria to use. The available values are:
     *                            - price-up (ascendant price);
     *                            - price-down (descendant price);
     *                            - alpha-up (alphabetical order ascending);
     *                            - alpha-down (alphabetical order descending).
     * @returns {*}             The products list sorted.
     * @private
     */
    function _applySortingCriteria(products, sortingCriteria) {
        if (products) {
            switch (sortingCriteria) {
                case "price-asc":
                    products = products.sort(function (a, b) {
                        return a["price"] - b["price"];
                    });
                    break;
                case "price-dsc":
                    products = products.sort(function (a, b) {
                        return b["price"] - a["price"];
                    });
                    break;
                case "alpha-asc":
                    products = products.sort(function (a, b) {
                        var nameA = a["name"].toLowerCase();
                        var nameB = b["name"].toLowerCase();
                        if (nameA > nameB) {
                            return 1;
                        } else if (nameA < nameB) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "alpha-dsc":
                    products = products.sort(function (a, b) {
                        var nameA = a["name"].toLowerCase();
                        var nameB = b["name"].toLowerCase();
                        if (nameA > nameB) {
                            return -1;
                        } else if (nameA < nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
            }
        }
        return products;
    }
    self.sortingCriteriaEnum = {
        PRICEASC:"price-asc",
        PRICEDSC:"price-dsc",
        ALPHAASC:"alpha-asc",
        ALPHADSC:"alpha-dsc"
    }
    self.categoryEnum = {
        ALL:"all",
        CAMERAS:"cameras",
        COMPUTERS:"computers",
        CONSOLES:"consoles",
        SCREENS:"screens"
    }
    return self;
})();

module.exports = ProductsServices;