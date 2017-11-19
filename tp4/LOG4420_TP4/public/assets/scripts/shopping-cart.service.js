var onlineShop = onlineShop || {};

/**
 * Defines a service to manage the shopping cart.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.shoppingCartService = (function($, productsService) {
  "use strict";

  var self = {};
  var items = {};
  var shoppingCartPromise;

  /**
   * Adds an item in the shopping cart.
   *
   * @param productId   The ID associated with the product to add.
   * @param [quantity]  The quantity of the product.
   */
  self.addItem = function(productId, quantity) {
    if (productId === undefined) {
      throw new Error("The specified product ID is invalid.")
    }
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      quantity = 1;
    }
    _addItemToShoppingCart(productId, quantity);
    items = this.getItems();
  };

  /**
   * Gets the items in the shopping cart.
   *
   * @returns {jquery.promise}    A promise that contains the list of items in the shopping cart.
   */
  self.getItems = function() {
    return $.get("http://127.0.0.1:8000/api/shopping-cart");
  };


  /**
   * Gets the total amount of the products in the shopping cart.
   *
   * @returns {jquery.promise}    A promise that contains the total amount.
   */
  self.getTotalAmount = function() {
      var total = 0;
      items.forEach(function(item) {
        if (item) {
          total += item.total;
        }
      });
      return total;
  };

  /**
   * Updates the quantity associated with a specified item.
   *
   * @param productId   The product ID associated with the item to update.
   * @param quantity    The item quantity.
   */
  self.updateItemQuantity = function(productId, quantity) {
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      throw new Error("The specified quantity is invalid.")
    }
    _updateItemToShoppingCart(productId,quantity);
  };

  /**
   * Removes the specified item in the shopping cart.
   *
   * @param productId   The product ID associated with the item to remove.
   */
  self.removeItem = function(productId) {
    if (items[productId]) {
      items[productId] = undefined;
    }
    items = this.getItems();
  };

  /**
   * Removes all the items in the shopping cart.
   */
  self.removeAllItems = function() {
    items = {};
    items = this.getItems();
  };
  
  /**
   * Add new item the shopping cart via req.
   *
   * @private
   */
  function _addItemToShoppingCart(id, qty) {
    //if (!productsPromise) {
      // console.log(item)
      // if(!shoppingCartPromise || !items.length > 0){
        var that = this;
        $.ajax({
          url: "http://127.0.0.1:8000/api/shopping-cart",
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({productId:id, quantity:qty}),
          dataType: "json",
          success: function(result) {
          },
          error: function (err){
        }
      });
      // }
  }
  /**
   * Updates the shopping cart via req.
   *
   * @private
   */
  function _updateItemToShoppingCart(id, qty) {
    //if (!productsPromise) {
      // console.log(item)
      // if(!shoppingCartPromise || !items.length > 0){
        var that = this;
        $.ajax({
          url: "http://127.0.0.1:8000/api/shopping-cart/" + id,
          type: 'PUT',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({quantity:qty}),
          dataType: "json",
          success: function(result) {
          },
          error: function (err){
        }
      });
      // }
  }

  /**
   * Gets all the products.
   *
   * @param [sortingCriteria]   The sorting criteria to use. If no value is specified, the list returned isn't sorted.
   * @param [category]          The category of the product. The default value is "all".
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  function _getCurrentCart(sortingCriteria, category) {
    //if (!productsPromise) {
      productsPromise = $.get("http://127.0.0.1:8000/api/products?category="+category+"&sortingCriteria="+sortingCriteria);
    //}
    return productsPromise.then(function(products) {
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
})(jQuery, onlineShop.productsService);
