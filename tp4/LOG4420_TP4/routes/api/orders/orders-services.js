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
    self.initData = function (d) { // utile ?
        self.data = d;
    }

    /**
     * Validate all fields of an order
     */
    self.validate = function(body) {
      // tester toutes les erreurs possibles
      return true;
    }

    return self;
})();

module.exports = ProductsServices;
