var express = require("express");
var router = express.Router();

var products = require('./api/products/products-controller');
var orders = require('./api/orders/orders-controller');
var shoppingCart = require('./api/shopping-cart/shopping-cart-controller');
var session = require('express-session');


/// products ///
//TODO REMOVE DEBUG restore
/* GET RESTORE products */
router.get('/products/test', products.restoreAll);

/* GET all products */
router.get('/products/', products.index);

/* GET product by ID */
router.get('/product/:id', products.getById);

/* POST request for creating product. */
router.post('/products/create', products.createProduct);

/* DELETE request for a specific product by id. */
router.delete('/products/:id', products.deleteProduct);

/* DELETE request for all products. */
router.delete('/products/', products.deleteAllProducts);


/// products ///
//TODO REMOVE DEBUG restore
/* GET RESTORE products */
// router.get('/shopping-cart/test', products.restoreAll);

/* GET all products */
router.get('/shopping-cart/', shoppingCart.index);

/* GET product by ID */
router.get('/shopping-cart/:productId', shoppingCart.getById);

/* POST request for adding product. */
router.post('/shopping-cart/', shoppingCart.addProduct);

/* PUT request for updating product in shopping cart. */
router.put('/shopping-cart/:productId', shoppingCart.update);

/* DELETE request for a specific product by id. */
router.delete('/shopping-cart/:productId', shoppingCart.deleteProduct);

/* DELETE request for all products. */
router.delete('/shopping-cart/', shoppingCart.deleteAllProducts);

// /// orders ///

// /* GET request for creating Author. NOTE This must come before route for id (i.e. display author) */
// router.get('/orders/', orders.index);

// router.get('/orders/create', orders.author_create_get);

// /* POST request for creating Author. */
// router.post('/orders/create', orders.author_create_post);

// /* GET request to delete Author. */
// router.get('/orders/:id/delete', orders.author_delete_get);

// // POST request to delete Author
// router.post('/orders/:id/delete', orders.author_delete_post);

// /* GET request to update Author. */
// router.get('/orders/:id/update', orders.author_update_get);

// // POST request to update Author
// router.post('/author/:id/update', orders.author_update_post);

// /* GET request for one Author. */
// router.get('/orders/:id', orders.author_detail);

// /* GET request for list of all Authors. */
// router.get('/orders', orders.author_list);




module.exports = router;