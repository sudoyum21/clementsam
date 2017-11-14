var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');

const productsServices = require('./products-services');

var products = {
    index: function (req, res) {
        //check if req query are valids       
        var categoryEnum = productsServices.categoryEnum;
        var sortingCriteriaEnum = productsServices.sortingCriteriaEnum;
        var category = req.query.category;
        var sortingCriteria = req.query.sortingCriteria;
        if (!_.some(sortingCriteriaEnum, function (crit) {
            return crit === sortingCriteria;
        }) || !_.some(categoryEnum, function (cat) {
            return cat === category;
        })) {
            //res.status(400).send("Parameters criteria " + sortingCriteria + " or category " + category + " are invalid");
            res.status(400);
        }
        mongoose.model("Product").find({}).exec(function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            productsServices.initData(result || []);
            results = productsServices.getUpdatedData(req.query.category, req.query.sortingCriteria);
            res.status(200).json(results || []);
        });
    }
}
module.exports = products;
//   module.exports = router;(req, res) => {

//     //   mongoose.model("Product").insertMany(arrayTest, function(err){
//     //     console.log(err)
//     // })