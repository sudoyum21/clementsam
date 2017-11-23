'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require('fs');

var ProductsServices = (function () {
    var self = {};
    self.data;

    /**
     * Initialisation des datas
     */
    self.initData = function (d) {
        // if (!self.data) {
            self.data = d;
            // console.log(self.data)
        // }
    }

    /**
     * Check if data is empty.
     */
    self.isDataEmpty = function () {
        // console.log('self.data.length')
        if(self.data){
            // console.log('self.data.length')
            // console.log(Object.keys(self.data).length)
        }
        // console.log(self.data)
        return self.data == undefined || self.data.length == 0;
    }

    /**
     * Gets all the products.
     */
    self.getProducts = function (sortingCriteria, category) {
        // console.log('sortingCriteria ' + sortingCriteria + " category " + category)
        // console.log(self.data.length)
        let results = self.getUpdatedData(sortingCriteria, category);
        return results;
    }

    /**
     * Mettre a jour les datas
     */
    self.getUpdatedData = function (sort,category) {
        // console.log(self.data)
        var data = _applyCategory(self.data, category);
        _applySortingCriteria(data, sort);
        return data;
    },

    /**
     * Validate all fields in product
     */
    self.validate = function(body){
        /*                  id: body.id,
        name: body.name,
        price: body.price,
        image: body.image,
        category: body.category,
        description: body.description,
        features: body.features,
        */
        if(checkStrLengthFail(body, 'name')||checkStrLengthFail(body, 'description')||checkStrLengthFail(body, 'image')
    ||checkStrLengthFail(body,'name') || parseFloat(body['price'])<0 || isNaN(body['price'])){
            return false;
        }
        let featureArray = body.features;
        if(featureArray && featureArray.length > 0){
            let fail = false;
            featureArray.forEach(function(feat){
                if((!feat )|| (!feat.length > 0)){
                    fail = true;
                    return false;
                }
            })
            if(fail){
                return false;
            }
        } else {
            return false;
        }
        // if (fs.existsSync(imagePath)) {
        //     // Do something
        //      console.log('here15')
        //     console.log('here17')
        // } else {
        //     console.log('11111')
        //     console.log(imagePath)
        //     return false;
        // }

        if (!_.some(self.categoryEnum, function (cat) {
            return cat === body.category;
        })) {
            return false;
        }
        return true;

        function checkStrLengthFail(obj, name){
            return !obj || !obj[name].length > 0;
        }
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
        // console.log('102 ' + products)
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
        EMPTY: "",
        PRICEASC: "price-asc",
        PRICEDSC: "price-dsc",
        ALPHAASC: "alpha-asc",
        ALPHADSC: "alpha-dsc"
    }
    self.categoryEnum = {
        EMPTY: "",
        ALL: "all",
        CAMERAS: "cameras",
        COMPUTERS: "computers",
        CONSOLES: "consoles",
        SCREENS: "screens"
    }
    return self;
})();

module.exports = ProductsServices;
