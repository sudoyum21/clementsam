var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var session = require('express-session');
const ShoppingCartService = require('./shopping-cart-services');

var shoppingCart = {
    index: function (req, res) {
        try {
            // console.log('session'+req.session);
            // console.log('got u');
            // console.log(req.sessionID);
            let result = ShoppingCartService.getItems(req);
            res.status(200).send(result);
            // avoid general exception in real life! :P
        } catch (e){
            var vDebug = "";
            for (var prop in e)
            {
               vDebug += "property: "+ prop+ " value: ["+ e[prop]+ "]\n";
            }
            vDebug += "toString(): " + " value: [" + e.toString() + "]";
            // status.rawValue = vDebug;
            console.error('in shoppingcart2 controller : ' + e);
            res.status(500).send(e);
        }
    },
    getById: function (req, res) {
        let id = req.params.id;
        if(id){
            mongoose.model("Product").findOne({ id: id }).exec(function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                if (result == null) {
                    //console.log('404')
                    res.status(404);
                }
                res.status(200).json(result);
            });
        } else {
            res.status(404).send('Invalid id : ' + id);
        }

    },
    addProduct: function (req, res) {
        let body = req.body;        
        try {
            if(body){
                let dataUpdated = ShoppingCartService.addItem(req, body.productId, body.quantity)
                if (dataUpdated == null) {
                    res.status(400);
                }
                console.log(dataUpdated)
                res.status(201).json(dataUpdated);
            } else {
                res.status(404).send('Invalid body : ' + body);
            }
        } catch (e) {
            res.status(400);
        };
    },
    updateProduct: function (req, res) {
        let body = req.body;
        let id = req.params.productId;
        console.log(id)
        console.log(body)
        try {
            if(body){
                let dataUpdated = ShoppingCartService.addItem(req, id, body.quantity)
                if (dataUpdated == null) {
                    res.status(400);
                }
                console.log(dataUpdated);
                res.status(204).json(dataUpdated);
            } else {
                res.status(404).send('Invalid body : ' + body);
            }
        } catch (e) {
            res.status(404);
        };
    },
    deleteProduct: function (req, res) {
        let id = req.params.id;
        if(id){
            try {
                mongoose.model("Product").remove({
                    id: id
                }, function (err, result) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    let itemRemoved = result.result.n;
                    if (itemRemoved == 0) {
                        res.status(404);
                        // res.end();
                    } else {
                        res.status(204).json(result);
                        // res.end();
                    }
                })
            } catch (e) {
                res.status(404);
            };
        } else {
            res.status(404).send('Invalid id : ' + id);
        }
    },
    deleteAllProducts: function (req, res) {
        console.log('deleting all')
        try {
            mongoose.model("Product").remove({}, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(204).json(result);
                // res.end();
            })
        } catch (e) {
            res.status(400);
        };
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
