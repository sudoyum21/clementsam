'use strict';

let ProductsServices = (function () {
  let self = {};
  //self.data;
  self.nextCommandNumber = 1;

  /**
   * Initialisation of orders
   */
  /*self.initData = function (d) {
      self.data = d;
  }*/

  /**
   * Return the next command number.
   */
  self.getNextCommandNumber = function () {
      return self.nextCommandNumber++;
  };

  /**
   * Validate all fields of an order
   */
  self.validate = function(body) {
    return (checkStrLengthFail(body, 'firstName')
      || checkStrLengthFail(body, 'lastName')
      || checkStrLengthFail(body, 'email')
      || checkStrLengthFail(body, 'phone')
      || !validateEmail(body['email'])
      || !validatePhone(body['phone'])
      || !validateProductsArray(body['products']));

    function checkStrLengthFail(obj, name) {
      return !obj || !obj[name].length > 0;
    }
    function validateEmail(email) { // from StackOverflow
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    function validatePhone(phone) { // from StackOverflow; Accepts (123) 456-7890 or 123-456-7890
      let re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
      return re.test(phone);
    }
    function validateProductsArray(products) {
      if(products && products.length > 0){
        let fail = false;
        products.forEach(function(product){
          if (!/^\d*[1-9]+\d*$/.test(product['id'])
            || !/^\d*[1-9]+\d*$/.test(product['quantity'])) {
            fail = true;
            return false;
          }
        });
        if(fail){
          return false;
        }
      } else {
        return false;
      }
      return true;
    }
  };

  return self;
})();

module.exports = ProductsServices;
