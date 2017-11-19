var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var session = require('express-session');
const ShoppingCartService = require('./shopping-cart-services');
const productsService = require('../products/products-services');

var shoppingCart = {
    index: function (req, res) {
        try {
            // console.log('line 10 '+req.session.data)
            // console.log(req.session.data)
            // console.log('line 11 '+req.session.data)
            let resultToSend = [];
            if(productsService.isDataEmpty()){
                console.log('updating data ')
               return mongoose.model("Product").find({}).exec(function (err, results) {
                   if (err) {
                       res.status(404).send(err);
                   }
                    console.log('productsService')
                   // console.log(productsService)
                   productsService.initData(results || []);
                   let productsHolder = productsService.getProducts("alpha-asc", "all");
                   // console.log(productsHolder)
                   // console.log(req.session)
                   // console.log('productsHolder')
                   // console.log(productsHolder)
                   //  console.log(productsHolder)
                   if (req && req.session) {
                       console.log('productsService3')
                       if (productsHolder ) {
                           console.log('productsService4')
                           resultToSend = ShoppingCartService.filterProductsRaw(productsHolder || [], req);  
                           resultToSend = ShoppingCartService.prepareSpecialListJustForTest(req, productsHolder);       
                           console.log('productsService5')
                       }
           
                   } else {
                       console.log('here')
                       resultToSend = ShoppingCartService.filterProductsRaw(productsHolder || [], req);
                       resultToSend = ShoppingCartService.prepareSpecialListJustForTest(req, productsHolder);
                   }  
                   if(!resultToSend) resultToSend = []
                   console.log('resultToSend')
                   console.log(resultToSend)
                   res.status(200).send(resultToSend);
                   res.end();
                   return;                  
               });
           } else {
                console.log('data is not empty data ')
               let productsHolder = productsService.getProducts("alpha-asc", "all");
               // console.log(productsHolder)
               // console.log(req.session)
               console.log('productsHolder')
               // console.log(productsHolder)
               // console.log(productsHolder)
               if (req && req.session) {
                   if (productsHolder ) {                                        
                    resultToSend =  ShoppingCartService.filterProductsRaw(productsHolder || [], req);    
                    resultToSend = ShoppingCartService.prepareSpecialListJustForTest(req, productsHolder);           
                   }
       
               } else {
                   console.log('herfe3')
                   resultToSend =  ShoppingCartService.filterProductsRaw(productsHolder || [], req);
                   resultToSend = ShoppingCartService.prepareSpecialListJustForTest(req, productsHolder);
               }
               console.log('in result ')
               console.log(resultToSend.length)
            //    console.log(resultToSend)
               res.status(200).send(resultToSend);
               res.end();
               return;
        
           }
          
          
            // avoid general exception in real life! :P
        } catch (e){
            res.status(500).send(e);
            res.end();
        }
        
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
                    "productId" : parseInt(id), 
                    "quantity" : data[id]
                } || {});
            });
        } else {
            res.status(404).send('Invalid id : ' + id);
        }
        // res.end();
    },
    addProduct: function (req, res) {
        let body = req.body;        
        try {
            if(body){
                let dataUpdated = ShoppingCartService.addItem(req, body.productId, body.quantity);
                resultToSend =  ShoppingCartService.filterProductsRaw(productsService.getProducts("alpha-asc", "all"), req);
                console.log('resultToSend')
                // console.log('resultToSend')
                // console.log('resultToSend')
                // console.log(resultToSend)
                //  console.log('resultToSend')
                //  console.log('resultToSend')
                //  console.log('resultToSend')
                // console.log(dataUpdated)
                if (resultToSend == null || resultToSend.length == 0) {
                    res.status(400);
                    res.end();
                    return;
                }
                // console.log('line 50 '+resultToSend)
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
