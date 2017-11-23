'use strict';
let mongoose = require('mongoose');

const ordersServices = require('./orders-services');

let orders = {
  index: function (req, res) {
    try {
      mongoose.model("Order").find({}).exec(function (err, result) {
        if (err) {
          res.status(404).end();
        }
        res.status(200).send(result || []);
      });
    } catch (e){
      res.status(404).end();
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
        if (!ordersServices.validate(body) || body.id) {
          res.status(400).end();
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
      res.status(400).end();
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
          res.status(404).end();
        }
        res.status(204).end();
      })
    } catch (e) {
      res.status(404).end();
    }
  },
};

module.exports = orders;
