var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var session = require('express-session');
const OrdersService = require('./orders-services');

var orders = {
  index: function (req, res) {
    try {
      let resultToSend = [];

    // avoid general exception in real life! :P
    } catch (e){
      res.status(500).send(e);
      res.end();
    }
  },
  getById: function (req, res) {
    let id = req.params.id;
    if(id){
      mongoose.model("Order").findOne({ id: id }).exec(function (err, result) {
        if (err) {
          res.status(500).send(err);
        }
        if (result == null || result.length == 0 ||  !req.session || !req.session.data) {
          res.status(404);
          res.end();
          return;
        }
        let data = req.session.data.find(function(dt){
          return dt.id == id;
        });
        if(data){
          res.status(200).json({
            "productId" : parseInt(id),
            "quantity" : data.quantity
          } || {});
        } else {
          res.status(404).send('Invalid id : ' + id);                }

      });
    } else {
      res.status(404).send('Invalid id : ' + id);
    }
    // res.end();
  },
  addOrder: function (req, res) {
    let body = req.body;
    try {
      if (body) {
        if (!productsServices.validate(body)) {
          // res.status(500).send(err);
          //POUR LES TESTS DU TP
          res.status(400).send("Failed validator");
          // res.end();
          return;
        }
        mongoose.model("Order").create({
          id: body.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
          products: body.products
        }, function (err, result) {
          if (err) {
            // res.status(500).send(err);
            //POUR LES TESTS DU TP
            res.status(400).send(err);
            // res.end();
            return;
          }
          if (result == null) {
            //console.log('400')
            // res.status(400);
            //POUR LES TESTS DU TP
            res.status(400).send("Empty result");
            // res.end();
            return;
          }
          res.status(201).json(result);
          // res.end();
          return;
        })
      } else {
        res.status(400).send('Invalid body : ' + body);
        // res.end();
        return;
      }
    } catch (e) {
      // res.status(400);
      //POUR LES TESTS DU TP
      res.status(400).send(e);
      // res.end();
      return;
    };
    // res.end();
  },
  deleteOrder: function (req, res) {
    let id = req.params.id;
    if (id) {

    } else {
      res.status(404).send('Invalid id : ' + id);
    }
  },
  deleteAllOrders: function (req, res) {

  },
}

module.exports = orders;
