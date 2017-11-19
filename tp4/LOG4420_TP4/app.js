var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require('mongoose');
var parseurl = require('parseurl');
var products = require('./routes/api/products/products-controller');
require("./lib/db");
// products.restoreAll();
// products.deleteAllProducts();
var index = require("./routes/index");
const api = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

if(process.env.NODE_ENV !== 'test') {
  app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// initialize the session
app.use(session({
  secret: 'log4420',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
// link : https://github.com/expressjs/session/
// app.use(function (req, res, next) {
//   console.log('req.session in app ')
//   console.log(req.session.data)

//   if (!req.session.views) {
//     req.session.views = {}
//   }

//   // get the url pathname
//   var pathname = parseurl(req).pathname

//   // count the views
//   req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

//   next()
// })

app.use("/", index);
app.use("/api", api);
// app.use("/api/shopping-cart", apiShoppingCart);
// app.use("/api/shopping-cart", apiShoppingCart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//TODO REMOVE TEST


module.exports = app;
