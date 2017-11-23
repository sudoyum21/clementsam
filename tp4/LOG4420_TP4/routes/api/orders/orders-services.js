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
        || checkStrLengthFail(body, 'phone')){
        return false;
      }
      if (!validateEmail(body['email'])
        || !validatePhone(body['phone'])) {
        return false;
      }
      let productsArray = body.products;
      if(productsArray && productsArray.length > 0){
        let fail = false;
        productsArray.forEach(function(feat){
          if((!feat ) || (!feat.length > 0)){
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
      return true;

      function checkStrLengthFail(obj, name) {
        return !obj || !obj[name].length > 0;
      }
      function validateEmail(email) {
        return true;
      }
      function validatePhone(phone) {
        return true;
      }
    };

    return self;
})();

module.exports = ProductsServices;
