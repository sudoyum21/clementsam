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
  self.data = [];
  // var items = {};
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
  };
  /**
   * Gets the items count in the shopping cart.
   *
   * @returns {number}  The items count.
   */
  self.getItemsCount = function () {
      return this.getItems().then(function(items){
        return items.length;
      })
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
   * Gets all the products.
   *
   * @param [sortingCriteria]   The sorting criteria to use. If no value is specified, the list returned isn't sorted.
   * @param [category]          The category of the product. The default value is "all".
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  self.getProducts = function() {
    //if (!productsPromise) {
      return $.get("http://127.0.0.1:8000/api/products?category=all&criteria=price-asc");
    //}
  };
  /**
   * Gets all the products.
   *
   * @param [sortingCriteria]   The sorting criteria to use. If no value is specified, the list returned isn't sorted.
   * @param [category]          The category of the product. The default value is "all".
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  self.initData = function(data) {
    self.data = data;
  };
  /**
   * Gets the total amount of the products in the shopping cart.
   *
   * @returns {jquery.promise}    A promise that contains the total amount.
   */
  self.getTotalAmount = function() {
      var total = 0;

      return self.getItems().then(function(items){
        // console.log(items)
        items.forEach(function(item) {
          if (item) {
            let newItem = self.filterProducts(item)
            total += newItem.total;
          }
        });
        return total;
      })
  };
  self.filterProducts = function (sc) {
    if (sc) {
      let productFound = self.data.find(function(prod){
        return prod.id == parseInt(sc.productId);
      });
      let newItem = {
        product: productFound,
        quantity : sc.quantity,
        total : sc.quantity * productFound.price
      }
      return newItem;
        // return products.filter(function (product) {
        //     let dataFound = sc.find(function(prod){
        //         return prod.productId == product.id
        //     })
        //     return dataFound;
        // }).map(function (product) {
        //     return product;
        // });
        //     return {
        //         product: product,
        //         quantity: sc.find(function(prod){
        //             return prod.productId == product.id
        //         }).id ,
        //         total: product.price * sc.find(function(prod){
        //             return prod.productId == product.id
        //         }).quantity
        //     };
        // });
    } else {
        return [];
    }
}
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
  self.removeItem = function(id) {
    $.ajax({
      url: "http://127.0.0.1:8000/api/shopping-cart/" + id,
      type: 'DELETE',
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        // console.log(result)
      },
      error: function (err){
    }
  });
  // }
  };
  self.getItemQuantity = function (productId) {
    return self.getItems().then(function(items){
      var qty = 0;
      items.forEach(function(item){
        // console.log(item)
        if(item.productId == productId){
          qty = item.quantity;
        }
      })
      // console.log(qty)
      return qty;
    })
};
  /**
   * Removes all the items in the shopping cart.
   */
  self.removeAllItems = function() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/shopping-cart/",
      type: 'DELETE',
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        // console.log(result)
      },
      error: function (err){
    }
  });
  }

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
   * @param [category]          The c
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
      // console.log(products)
      return products;
    });
  };


  return self;
})(jQuery, onlineShop.productsService);
