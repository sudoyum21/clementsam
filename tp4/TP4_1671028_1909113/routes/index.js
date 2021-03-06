var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

router.get("/", function (req, res) {
  res.render("index", { title: "Accueil" });
  //Get the default connection
  // var db = mongoose.connection;
  // //Bind connection to error event (to get notification of connection errors)
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  //mongoose.


  // doc.find({}, function (err, collection) {
  //   console.log(collection)
  // });

});
router.get("/accueil", function (req, res) {
  res.render("index", { title: "Accueil" });
});
router.get("/produits", function(req, res) {
  res.render("products", { title: "Produits" });
});
router.get("/produit", function(req, res) {
  res.render("product", { title: "Produit" });
});
router.get("/contact", function(req, res) {
  res.render("contact", { title: "Contact" });
});
router.get("/panier", function(req, res) {
  res.render("shopping-cart", { title: "Panier" });
});
router.get("/commande", function(req, res) {
  res.render("order", { title: "Commande" });
});
router.get("/confirmation", function(req, res) {
  res.render("confirmation", { title: "Confirmation" });
});

module.exports = router;
