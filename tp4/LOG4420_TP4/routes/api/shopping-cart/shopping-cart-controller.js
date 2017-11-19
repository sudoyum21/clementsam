var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var session = require('express-session');
const ShoppingCartService = require('./shopping-cart-services');

var shoppingCart = {
    index: function (req, res) {
        try {
            // console.log('line 10 '+req.session.data)
            // console.log(req.session.data)
            // console.log('line 11 '+req.session.data)
            let result = ShoppingCartService.getItems(req);
            res.status(200).send(result);
            // avoid general exception in real life! :P
        } catch (e){
            res.status(500).send(e);
        }res.end();
    },
    getById: function (req, res) {
        let id = req.params.productId;
        if(id){
            mongoose.model("Product").findOne({ id: id }).exec(function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }             
                if (result == null || result.length == 0 ||  !req.session || !req.session.data) {
                    //console.log('404')
                    res.status(404);
                    res.end();
                    return;
                }
                let data = req.session.data;
                res.status(200).json({
                    "productId" : id, 
                    "quantity" : data[id]
                } || {});
            });
        } else {
            res.status(404).send('Invalid id : ' + id);
        }
        res.end();
    },
    addProduct: function (req, res) {
        let body = req.body;        
        try {
            if(body){
                let dataUpdated = ShoppingCartService.addItem(req, body.productId, body.quantity)
                if (dataUpdated == null) {
                    res.status(400);
                }
                console.log('line 50 '+dataUpdated)
                res.status(201).json(dataUpdated);
            } else {
                res.status(404).send('Invalid body : ' + body);
            }
        } catch (e) {
            res.status(400);
        };
        res.end();
    },
    updateProduct: function (req, res) {
        let body = req.body;
        let id = req.params.productId;
        // console.log('line 62 '+id)
        // console.log('line 63  '+body)
        try {
            if(body){
                let dataUpdated = ShoppingCartService.updateItem(req, id, body.quantity)
                if (dataUpdated == null) {
                    res.status(400);
                }
                // console.log('line 70 '+dataUpdated);
                res.status(204).json(dataUpdated);
            } else {
                res.status(404).send('Invalid body : ' + body);
            }
        } catch (e) {
            res.status(404);
        };
        res.end();
    },
    deleteProduct: function (req, res) {
        let id = req.params.productId;
        if(id){
            try {
                ShoppingCartService.removeItem(id, req)
                res.status(204);
            } catch (e) {
                res.status(404);
            };
        } else {
            res.status(404).send('Invalid id : ' + id);
        }
        res.end();
    },
    deleteAllProducts: function (req, res) {
        console.log('deleting all')
        try {
            ShoppingCartService.removeAllItems(req);                    
            res.status(204);
        } catch (e) {
            res.status(400);
        };
        res.end();
    },
}

module.exports = shoppingCart;






// router.get("/", function (req, res) {
//     var id = req.params.name
//     console.log(req.params)
//     for(var i in req.params){
//         console.log(req.params[i])
//     }
//     //mongoose.connection.db.collection('products', function (err, collection) {
//         // console.log(collection.find({}));
//         // });
//     res.render("index", { title: "COMMANDE", message: "Ça semble extra!"+id });
//     //Get the default connection
//     // var db = mongoose.connection;
//     // //Bind connection to error event (to get notification of connection errors)
//     // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//     //mongoose.


//     // doc.find({}, function (err, collection) {
//     //   console.log(collection)
//     //   console.log(collection)
//     //   console.log(collection)
//     //   console.log(collection)
//     //   console.log(collection)
//     // });

//   });

// router.get("/:productId", function (req, res) {
//     var id = req.params.productId;
//   res.render("index", { title: "COMMANDE", message: "Ça semble 5555!"+id });
//   //Get the default connection
//   // var db = mongoose.connection;
//   // //Bind connection to error event (to get notification of connection errors)
//   // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   //mongoose.


//   // doc.find({}, function (err, collection) {
//   //   console.log(collection)
//   //   console.log(collection)
//   //   console.log(collection)
//   //   console.log(collection)
//   //   console.log(collection)
//   // });

// });
