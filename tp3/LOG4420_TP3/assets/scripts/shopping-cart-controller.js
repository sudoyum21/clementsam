'use strict';

var ShoppingCartController = (function() {
    var self = {};
    var table = $('table.table > tbody > tr');
    var totalPrice = $(".shopping-cart-total");

    self.setPrice = function() {
        let price = 0;
        console.log( table.find('td:last-child'))
        table.find('td:last-child').each(function(idx,value){
            let valueParsed = value.innerText.toString().slice(0, -1);
            price += parseFloat(valueParsed);
            console.log(valueParsed)
        });
        console.log(parseFloat(price.toString()));
        totalPrice.text(parseFloat(price.toString()).toFixed(2) + "$");
    }
    
    self.setOnClickEmptyCartBtn = function(){
        $('#remove-all-items-button').click(function(){
            // pop up confirmation
            // display page "no product in cart" without refresh
            ShoppingCartServices.emptyCart();
            HeaderController.updateCartCount();
            
            // Avant :
            //table.remove();
            //self.onChanges();
        });    
    }

    self.onChanges = function(){
        HeaderController.updateCartCount();
        self.setPrice();
    }

    $(document).ready(function() {
        ShoppingCartController.onChanges();
        ShoppingCartController.setOnClickEmptyCartBtn();
    });

    return self;
})();




// var rowCount = $('table.table >tbody >tr').each(function(idx) {
//     console.log(this)
//     console.log(idx)
// }, this);;














/*

// ***** Patron module *****
var example = (function (number, document) {
    // Variable privée
    var privateVariable = number;
    var document = document;
    // Function privée
    function _privateFunction() { /* ... 
        console.log('hello private')
    }
    // Fonctions publiques
    return {
        publicFunction1: function () {
            _privateFunction();
            privateVariable = 2;
        },
        publicFunction2: function () {
            return privateVariable;
        },
        document
    };
});

*/