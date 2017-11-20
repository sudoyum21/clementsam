var express = require("express");
var router = express.Router();

var products = require('./api/products/products-controller');
var orders = require('./api/orders/orders-controller');
var shoppingCart = require('./api/shopping-cart/shopping-cart-controller');
var session = require('express-session');


/// products ///
//TODO REMOVE DEBUG restore
/* GET RESTORE products */
// router.get('/products/test', products.restoreAll);

/* GET all products */
router.get('/products', products.index);

/* GET product by ID */
router.get('/products/:id', products.getById);

/* POST request for creating product. */
router.post('/products/', products.createProduct);

/* DELETE request for a specific product by id. */
router.delete('/products/:id', products.deleteProduct);

/* DELETE request for all products. */
router.delete('/products', products.deleteAllProducts);


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
router.put('/shopping-cart/:productId', shoppingCart.updateProduct);

/* DELETE request for a specific product by id. */
router.delete('/shopping-cart/:productId', shoppingCart.deleteProduct);

/* DELETE request for all products. */
router.delete('/shopping-cart/', shoppingCart.deleteAllProducts);

/// orders ///

/* GET all orders */
router.get('/orders', orders.index);

/* GET order by ID */
router.get('/orders/:id', orders.getById);

/* POST request to create an order */
router.post('/orders/', orders.addOrder);

/* DELETE request for a specific order by id. */
router.delete('/orders/:id', orders.deleteOrder);

/* DELETE request for all orders. */
router.delete('/orders/', orders.deleteAllOrders);




module.exports = router;
