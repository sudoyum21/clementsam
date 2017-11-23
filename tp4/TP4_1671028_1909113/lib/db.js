"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


var Product = new Schema({
  id: { type: Number, unique: true },
  name: {type : String, min:[1, 'Invalid name']},
  price: Number,
  image: String,
  category: {type : String, min:[1, 'Invalid category']},
  description: {type : String, min:[1, 'Invalid description']},
  features: Array
}, { versionKey: false });



mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
//
//mongoose.connect("mongodb://...", { useMongoClient: true });
mongoose.connect('mongodb://admin:admin@ds235775.mlab.com:35775/log4420')

