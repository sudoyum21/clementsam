var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

var products = {
    index: function (req, res) {
        mongoose.model("Product").find({}).exec(function(err,result){
            res.status(200).json(result || []);
        });
    }
}

// router.get("/", function(req, res) {
//     console.log('sup')
// mongoose.connection.db.collection('products', function (err, collection) {
//     console.log(collection.find({}));
//     res.status(200).json(collection.find({}));
//     });
//     console.log('sup')
//   });

module.exports = products;
//   module.exports = router;(req, res) => {

//     //   mongoose.model("Product").insertMany(arrayTest, function(err){
//     //     console.log(err)
//     // })




    // mongoose.model("Product").find({}).exec(function(err,result){
    //     res.status(200).json(result || []);
    // });

//   };