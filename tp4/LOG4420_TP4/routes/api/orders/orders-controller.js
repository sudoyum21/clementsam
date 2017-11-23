var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var session = require('express-session');

const ordersServices = require('./orders-services');

var orders = {
  index: function (req, res) {
    try {
      mongoose.model("Order").find({}).exec(function (err, result) {
        //ordersServices.initData(result || []);
        /* tests ??
        if (err) {
          res.status(404).send(err);
        }*/
        res.status(200).send(result || []);
      });
    } catch (e){
      res.status(500).send(e);
    }
  },
  getById: function (req, res) {
    let id = req.params.id;
    if(id){
      mongoose.model("Order").findOne({ id: id }).exec(function (err, result) {
        if (result === null) {
          res.status(404).end();
        } else {
          res.status(200).send(result);
        }
      });
    } else {
      res.status(404).end();
    }
  },
  addOrder: function (req, res) {
    let body = req.body;
    try {
      if (body) {
        if (!ordersServices.validate(body)) {
          res.status(400).send("Failed validator");
          return;
        }
        mongoose.model("Order").create({
          id: ordersServices.getNextCommandNumber(),
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
          products: body.products
        }, function (err, result) {
          if (err) {
            res.status(400).end();
            return;
          }
          if (result === null) {
            res.status(400).end();
            return;
          }
          res.status(201).send(result);
        })
      } else {
        res.status(400).end();
      }
    } catch (e) {
      res.status(400).send(e);
    }
  },
  deleteOrder: function (req, res) {
    let id = req.params.id;
    if (id) {
      try {
        mongoose.model("Order").remove({ id: id }, function (err, result) {
          if (err) {
            res.status(400).send(err);
          }
          let orderRemoved = result.result.n;
          if (orderRemoved === 0) {
            res.status(404).end();
          } else {
            res.status(204).end();
          }
        })
      } catch (e) {
        res.status(404).end();
      }
    } else {
      res.status(404).end();
    }
  },
  deleteAllOrders: function (req, res) {
    try {
      mongoose.model("Order").remove({}, function (err, result) {
        if (err) {
          res.status(404).send(e);
        }
        res.status(204).end();
      })
    } catch (e) {
      res.status(404).send(e);
    }
  },
};

module.exports = orders;
