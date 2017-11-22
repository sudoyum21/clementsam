var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var session = require('express-session');

const ordersServices = require('./orders-services');

var orders = {
  index: function (req, res) {
    try {
      mongoose.model("Order").find({}).exec(function (err, result) {
        ordersServices.initData(result || []);
        /* tests ??
        if (err) {
          res.status(404).send(err);
        }*/
        res.status(200).send(result || []);
      });
    // avoid general exception in real life! :P
    } catch (e){
      res.status(500).send(e);
    }
  },
  getById: function (req, res) {
    let id = req.params.id;
    if(id){
      mongoose.model("Order").findOne({ id: id }).exec(function (err, result) {
        if (result === null) {
          res.status(404).end();//send();
        } else {
          res.status(200).send(result);
        }
      });
    } else {
      res.status(404).send('Invalid id : ' + id);
    }
  },
  addOrder: function (req, res) {
    let body = req.body;
    try {
      if (body) {
        if (!ordersServices.validate(body)) { // TOUT TESTER DANS VALIDATE
          res.status(400).send("Failed validator");
          return;
        }
        console.log("----DEBUG");
        console.log("id: " + body.id + "\nbody: ");
        console.log(body);
        mongoose.model("Order").create({
          id: body.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
          products: body.products
        }, function (err, result) {
          if (err) {
            res.status(400).send(err);
            return;
          }
          if (result == null) {
            res.status(400).send("Empty result");
            return;
          }
          res.status(201).send(result);
        })
      } else {
        res.status(400).send('Invalid body : ' + body);
      }
    } catch (e) {
      res.status(400).send(e);
    };
  },
  deleteOrder: function (req, res) {
    let id = req.params.id;
    if (id) {

    } else {
      res.status(404).send('Invalid id : ' + id);
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
    };
  },
}

module.exports = orders;
