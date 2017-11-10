var express = require("express");
var mongoose = require('mongoose');
var mongooseAPI = require('../../lib/db');
var router = express.Router();

router.get("/", function (req, res) {
    var id = req.params.name
    console.log(req.params)
    for(var i in req.params){
        console.log(req.params[i])
    }
    mongoose.connection.db.collection('products', function (err, collection) {
        console.log(collection.find({}));
        });
    res.render("index", { title: "COMMANDE", message: "Ça semble extra!"+id });
    //Get the default connection
    // var db = mongoose.connection;
    // //Bind connection to error event (to get notification of connection errors)
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    //mongoose.
  
  
    // doc.find({}, function (err, collection) {
    //   console.log(collection)
    //   console.log(collection)
    //   console.log(collection)
    //   console.log(collection)
    //   console.log(collection)
    // });
  
  });

router.get("/:productId", function (req, res) {
    var id = req.params.productId;
  res.render("index", { title: "COMMANDE", message: "Ça semble 5555!"+id });
  //Get the default connection
  // var db = mongoose.connection;
  // //Bind connection to error event (to get notification of connection errors)
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  //mongoose.


  // doc.find({}, function (err, collection) {
  //   console.log(collection)
  //   console.log(collection)
  //   console.log(collection)
  //   console.log(collection)
  //   console.log(collection)
  // });

});

module.exports = router;
