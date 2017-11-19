
const ProductsService = require('../products/products-services');

/**
 * Defines a service to manage the shopping cart.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
var ShoppingCartService = (function (productsService) {
    "use strict";

    var self = {};
    var items = {};
    var productsService = productsService;

    /**
     * Adds an item in the shopping cart.
     *
     * @param productId   The ID associated with the product to add.
     * @param [quantity]  The quantity of the product.
     */
    self.addItem = function (req, productId, quantity) {
        if (productId === undefined) {
            throw new Error("The specified product ID is invalid.")
        }
        if (!quantity || typeof quantity !== "number" || quantity <= 0) {
            quantity = 1;
        }
        if (!req.session.data) {
            req.session['data'] = {};
        }
        if (req.session.data && req.session.data[productId]) {
            req.session.data[productId] += quantity;
        } else {
            req.session.data[productId] = quantity;
        }
        _updateLocalItems();
        return req.session.data;
    };

    /**
     * Gets the items in the shopping cart.
     *
  */
    self.getItems = function (req) {
        let productsHolder = productsService.getProducts("alpha-asc");
        if (req && req.session) {
            if (productsHolder && productsHolder.then) {
                return productsHolder.then(function (products) {
                    return self.filterProducts(products, req);
                });
            }

        }
        return self.filterProducts(productsHolder || [], req);
    };

    self.filterProducts = function (products, req) {
        if(req.session && req.session.data){
            return products.filter(function (product) {
                return req.session.data.hasOwnProperty(product.id) && req.session.data[product.id] !== undefined;
            }).map(function (product) {
                return {
                    product: product,
                    quantity: req.session.data[product.id],
                    total: product.price * req.session.data[product.id]
                };
            });
        }
        return [];
    }

    /**
     * Gets the items count in the shopping cart.
     *
     * @returns {number}  The items count.
     */
    self.getItemsCount = function () {
        var total = 0;
        for (var productId in items) {
            if (items.hasOwnProperty(productId) && items[productId]) {
                total += items[productId];
            }
        }
        return total;
    };

    /**
     * Gets the quantity associated with an item.
     *
     * @param productId   The product ID associated with the item quantity to retrieve.
     * @returns {*}
     */
    self.getItemQuantity = function (productId) {
        return items[productId] || 0;
    };

    /**
     * Gets the total amount of the products in the shopping cart.
     *
     * @returns {jquery.promise}    A promise that contains the total amount.
     */
    self.getTotalAmount = function () {
        return self.getItems().then(function (items) {
            var total = 0;
            items.forEach(function (item) {
                if (item) {
                    total += item.total;
                }
            });
            return total;
        });
    };

    /**
     * Updates the quantity associated with a specified item.
     *
     * @param productId   The product ID associated with the item to update.
     * @param quantity    The item quantity.
     */
    self.updateItemQuantity = function (productId, quantity) {
        if (!quantity || typeof quantity !== "number" || quantity <= 0) {
            throw new Error("The specified quantity is invalid.")
        }
        if (items[productId]) {
            items[productId] = quantity;
            _updateLocalItems();
        }
    };

    /**
     * Removes the specified item in the shopping cart.
     *
     * @param productId   The product ID associated with the item to remove.
     */
    self.removeItem = function (productId) {
        if (items[productId]) {
            items[productId] = undefined;
        }
        _updateLocalItems();
    };

    /**
     * Removes all the items in the shopping cart.
     */
    self.removeAllItems = function () {
        items = {};
        _updateLocalItems();
    };

    /**
     * Updates the shopping cart in the local storage.
     *
     * @private
     */
    function _updateLocalItems() {
        //localStorage["shoppingCart"] = JSON.stringify(items);
    }
    // Initializes the shopping cart.
    //   if (localStorage["shoppingCart"]) {
    //     items = JSON.parse(localStorage["shoppingCart"]);
    //   }

    /**
     * Gets all the products.
     *
     * @param [sortingCriteria]   The sorting criteria to use. If no value is specified, the list returned isn't sorted.
     * @param [category]          The category of the product. The default value is "all".
     * @returns {jquery.promise}  A promise that contains the products list.
     */
    function _getCurrentCart(sortingCriteria, category) {
        //if (!productsPromise) {
        //productsPromise = $.get("http://127.0.0.1:8000/api/products?category="+category+"&sortingCriteria="+sortingCriteria);
        //}
        return productsPromise.then(function (products) {
            // if (category) {
            //   products = _applyCategory(products, category);
            // }
            // if (sortingCriteria) {
            //   products = _applySortingCriteria(products, sortingCriteria);
            // }
            console.log(products)
            return products;
        });
    };


    return self;
})(ProductsService);

module.exports = ShoppingCartService;