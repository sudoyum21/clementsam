var express = require("express");
var router = express.Router();

var Q = require("q");
var productsManager = require("../managers/products");
var shoppingCartManager = require("../managers/shopping-cart");

/**
 * Gets the items count in the shopping cart.
 *
 * @return {number}   The items count.
 */
function getItemsCount() {
  return shoppingCartManager.getItems().reduce(function(sum, item){
    return sum + item.quantity;
  }, 0);
}

/**
 * Formats the specified number as a price.
 *
 * @param price         The price to format.
 * @returns {string}    The price formatted.
 */
function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + "&thinsp;$";
}


// Initialize the shopping cart session.
router.use(function(req, res, next) {
  shoppingCartManager.initialize(req.session);
  next();
});

// Home Page
router.get([ "/", "/accueil" ], function(req, res) {
  res.render("home", { title: "Accueil", nav: "home", itemsCount: getItemsCount() });
});

// Products Page
router.get("/produits", function(req, res) {
  productsManager.getProducts().done(function(result) {
    res.render("products", { title: "Produits", nav:
      "products", productsList: result.data, itemsCount: getItemsCount(), formatPrice: formatPrice });
  });
});

// Product Page
router.get("/produit", function(req, res) {
  productsManager.getProduct(req.query.id).done(function(result) {
    res.render("product", { title: "Produit", nav: "products",
      product: result.data, itemsCount: shoppingCartManager.getItems().length, formatPrice: formatPrice });
  });
});

// Contact Page
router.get("/contact", function(req, res) {
  res.render("contact", { title: "Contact", nav: "contact", itemsCount: getItemsCount() });
});

// Shopping Cart Page
router.get("/panier", function(req, res) {
  productsManager.getProducts("alpha-asc").done(function(result) {
    var products = result.data;
    var items = shoppingCartManager.getItems();

    function getItemAssociatedWithProduct(productId) {
      return items.find(function(item) {
        return item.productId === productId;
      })
    }
    var total = 0;
    var resultedItems = products.filter(function(product) {
      return getItemAssociatedWithProduct(product.id) !== undefined;
    }).map(function(product) {
      var item = getItemAssociatedWithProduct(product.id);
      var productTotal = product.price * item.quantity;

      total += productTotal;
      return {
        product: product,
        quantity: item.quantity,
        total: productTotal
      };
    });
    res.render("shopping-cart", { title: "Panier", nav: "cart",
      items: resultedItems, total: total, itemsCount: getItemsCount(), formatPrice: formatPrice });
  });
});

// Order Page
router.get("/commande", function(req, res, next) {
  var itemsCount = getItemsCount();
  if (itemsCount > 0) {
    res.render("order", { title: "Commande", nav: "", itemsCount: getItemsCount() });
  } else {
    next();
  }
});

// Confirmation Page
router.post("/confirmation", function(req, res, next) {
  var orderManager = require("../managers/orders");
  orderManager.getOrders().then(function(result) {
    if (result.data.length > 0) {
      function pad(number, width) {
        var symbol = '0';
        number = number + '';
        return number.length >= width ? number : new Array(width - number.length + 1).join(symbol) + number;
      }

      var order = result.data[result.data.length - 1];
      res.render("confirmation", { title: "Confirmation", nav: "",
        itemsCount: getItemsCount(), order: order, pad: pad });
    } else {
      next();
    }
  });
});

module.exports = router;
