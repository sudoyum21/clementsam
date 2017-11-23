var onlineShop = onlineShop || {};

/**
 * Defines a service to manage the orders.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.ordersService = (function() {
  "use strict";

  var self = {};
  //var orders = [];
  self['lastOrderId'] = -1;
  /**
   * Creates a new order.
   *
   * @param order   The order to create.
   */
  self.createOrder = function(order) {
    /*
    if (order) {
      order.id = orders.length + 1;
      orders.push(order);
      _updateLocalStorage();
    }*/
    $.ajax({
      url: "http://127.0.0.1:8000/api/orders/",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(order),
      dataType: "json",
      success: function(result) {
        console.log(result);
        self['lastOrderId'] = result['id'];
      },
      error: function (err) {}
    });
  };

  /**
   * Gets the order based on the specified ID.
   *
   * @param orderId   The ID of the order.
   * @returns {*}     The order associated with the specified ID.
   */
  self.getOrder = function(orderId) {
    /*
    if (orderId <= 0 || orderId > orders.length) {
      throw new Error("Invalid order ID specified.")
    }
    return orders[orderId - 1];*/
    return $.get("http://127.0.0.1:8000/api/orders/"+orderId);
  };

  /**
   * Gets the orders count.
   *
   * @returns {Number}  The orders count.
   */
  self.getCommandId = function() {
    return self['lastOrderId'];
  };

  /**
   * Updates the orders list in the local storage.
   *
   * @private
   */
  /*function _updateLocalStorage() {
    localStorage["orders"] = JSON.stringify(orders);
  }

  // Initializes the orders list.
  if (localStorage["orders"]) {
    orders = JSON.parse(localStorage["orders"]);
  }*/

  return self;
})();
