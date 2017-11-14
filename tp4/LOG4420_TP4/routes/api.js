var express = require("express");
var router = express.Router();

var products = require('./api/products/products-controller');
var orders = require('./api/orders/orders-controller');
var shoppingCart = require('./api/shopping-cart/shopping-cart-controller');

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


// /// shopping-cart ///

// /* GET request for creating Author. NOTE This must come before route for id (i.e. display author) */
// router.get('/shoppingCart/', shoppingCart.index);

// router.get('/shoppingCart/create', shoppingCart.author_create_get);

// /* POST request for creating Author. */
// router.post('/shoppingCart/create', shoppingCart.author_create_post);

// /* GET request to delete Author. */
// router.get('/shoppingCart/:id/delete', orders.author_delete_get);

// // POST request to delete Author
// router.post('/shoppingCart/:id/delete', shoppingCart.author_delete_post);

// /* GET request to update Author. */
// router.get('/shoppingCart/:id/update', shoppingCart.author_update_get);

// // POST request to update Author
// router.post('/shoppingCart/:id/update', shoppingCart.author_update_post);

// /* GET request for one Author. */
// router.get('/shoppingCart/:id', shoppingCart.author_detail);

// /* GET request for list of all Authors. */
// router.get('/shoppingCart', shoppingCart.author_list);

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