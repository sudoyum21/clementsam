var express = require("express");
var router = express.Router();

var products = require('./api/products');
var orders = require('./api/orders');
var shoppingCart = require('./api/shopping-cart');

/// products ///

/* GET catalog home page. */
router.get('/products/', products.index);

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
// router.get('/products/create', products.book_create_get);

// /* POST request for creating Book. */
// router.post('/products/create', products.book_create_post);

// /* GET request to delete Book. */
// router.get('/products/:id/delete', products.book_delete_get);

// // POST request to delete Book
// router.post('/products/:id/delete', products.book_delete_post);

// /* GET request to update Book. */
// router.get('/products/:id/update', products.book_update_get);

// // POST request to update Book
// router.post('/products/:id/update', products.book_update_post);

// /* GET request for one Book. */
// router.get('/products/:id', products.book_detail);

// /* GET request for list of all Book items. */
// router.get('/products', products.book_list);


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