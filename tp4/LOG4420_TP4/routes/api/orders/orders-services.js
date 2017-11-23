'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require('fs');

var ProductsServices = (function () {
    var self = {};
    self.data;

    /**
     * Initialisation of orders
     */
    self.initData = function (d) {
        self.data = d;
    }

    /**
     * Validate all fields of an order
     */
    self.validate = function(body) {
      if(checkStrLengthFail(body, 'firstName')
        || checkStrLengthFail(body, 'lastName')
        || checkStrLengthFail(body, 'email')
        || checkStrLengthFail(body, 'phone')
        || !validateEmail(body['email'])
        || !validatePhone(body['phone'])
        || !validateProductsArray(body['products'])) {
        return false;
      }
      return true;

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
