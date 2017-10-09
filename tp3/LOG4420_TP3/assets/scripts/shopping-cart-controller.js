'use strict';

var ShoppingCartController = (function() {
    var self = {};

    self.setOnClick = function(){
        _setOnClickRemoveProductBtn();
        _setOnClickSubOneBtn();
        _setOnClickAddOneBtn();
        _setOnClickEmptyCartBtn();
    }

    self.displayShoppingCartPage = function() {
        if (HeaderServices.getCartCount() == 0) {
            _displayEmptyCartPage();
        } else {
            _displayCartPage();
            _setTotalPrice();
        }
    }

    self.onChanges = function() {
        HeaderController.updateCartCount();
    }

    function _displayEmptyCartPage() {
        $('article > *:not(:first-child)').remove();
        $('article').append('<p>Aucun produit dans le panier.</p>');
    }

    function _displayCartPage() {
        var cart = ShoppingCartServices.getCart();
        cart.forEach(product => {
            $('tbody').append(_getLineTemplate(product));
        });
    }

    function _getLineTemplate(product) {
        // button: disabled="" à mettre si quantité == 1 pour les boutons -
        return '<tr>' +
        '  <td><button class="remove-item-button" title="Supprimer"><i class="fa fa-times"></i></button></td>' +
        '  <td><a href="./product.html">' + product.name + '</a></td>' +
        '  <td>' + product.price + '&thinsp;$</td>' +
        '  <td>' +
        '    <div class="row">' +
        '      <div class="col">' +
        '        <button class="remove-quantity-button" title="Retirer" disabled=""><i class="fa fa-minus"></i></button>' +
        '      </div>' +
        '      <div class="col quantity">' + product.quantity + '</div>' +
        '      <div class="col">' +
        '        <button class="add-quantity-button" title="Ajouter"><i class="fa fa-plus"></i></button>' +
        '      </div>' +
        '    </div>' +
        '  </td>' +
        '  <td>' + (product.price*product.quantity) + '&thinsp;$</td>' +
        '</tr>';
    }

    function _setTotalPrice() {
        let price = 0;
        $('table.table > tbody > tr').find('td:last-child').each(function(idx,value){
            let valueParsed = value.innerText.toString().slice(0, -1);
            price += parseFloat(valueParsed);
            console.log(valueParsed)
        });
        $(".shopping-cart-total").html('Total: <strong>' + parseFloat(price.toString()).toFixed(2) + '&thinsp;$</strong>');
    }

    function _setOnClickRemoveProductBtn() {
        $('.remove-item-button').click(() => {
            // Remove line
            //ShoppingCartServices.removeProduct(id); => need to know which one to change
            self.onChanges();
        });    
    }

    function _setOnClickSubOneBtn() {
        $('.remove-quantity-button').click(() => {
            // Change quantity -1
            // Change line price
            //ShoppingCartServices.subOneToProduct(id); => need to know which one to change
            self.onChanges();
        });    
    }

    function _setOnClickAddOneBtn() {
        $('.add-quantity-button').click(() => {
            // Change quantity +1
            // Change line prices
            //ShoppingCartServices.addOneToProduct(id); => need to know which one to change
            self.onChanges();
        });    
    }
    
    function _setOnClickEmptyCartBtn() {
        $('#remove-all-items-button').click(() => {
            // pop up confirmation
            _displayEmptyCartPage();
            ShoppingCartServices.emptyCart();
            self.onChanges();
        });    
    }

    $(document).ready(function() {
        ShoppingCartController.setOnClick();
        ShoppingCartController.displayShoppingCartPage();
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