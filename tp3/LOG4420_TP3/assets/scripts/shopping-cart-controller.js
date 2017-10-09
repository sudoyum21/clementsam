'use strict';

var ShoppingCartController = (function() {
    var self = {};

    self.setOnClick = function(){
        _setOnClickRemoveProductBtn();
        _setOnClickQuantityBtn();
        _setOnClickEmptyCartBtn();
    }

    self.displayShoppingCartPage = function() {
        if (HeaderServices.getCartCount() == 0) {
            _displayEmptyCartPage();
        } else {
            _displayCartPage();
            _displayTotalPrice();
        }
    }

    function _onChanges() {
        HeaderController.updateCartCount();
        //_disableMinusButtonIfNecessary
        _displayTotalPrice();
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
        var disabled = '';
        if (product.quantity == 1) {
            disabled = ' disabled=""';
        }
        return '<tr>' +
        '  <td><button class="remove-item-button" title="Supprimer"><i class="fa fa-times"></i></button></td>' +
        '  <td><a href="./product.html?id=' + product.id + '">' + product.name + '</a></td>' +
        '  <td>' + product.price + ' $</td>' +
        '  <td>' +
        '    <div class="row">' +
        '      <div class="col">' +
        '        <button class="remove-quantity-button" title="Retirer"' + disabled + '><i class="fa fa-minus"></i></button>' +
        '      </div>' +
        '      <div class="col quantity">' + product.quantity + '</div>' +
        '      <div class="col">' +
        '        <button class="add-quantity-button" title="Ajouter"><i class="fa fa-plus"></i></button>' +
        '      </div>' +
        '    </div>' +
        '  </td>' +
        '  <td class="price">' + (product.price*product.quantity).toFixed(2) + ' $</td>' +
        '</tr>';
    }

    function _displayTotalPrice() {
        let price = 0;
        var cart = ShoppingCartServices.getCart();
        cart.forEach(product => {
            price += product.price * product.quantity;
        });
        $("#total-amount strong").text(price.toFixed(2) + ' $');
    }

    function _setOnClickRemoveProductBtn() {
        $('.remove-item-button').click(function() {
            // Remove line
            //ShoppingCartServices.removeProduct(index);
            _onChanges();
        });    
    }

    function _setOnClickQuantityBtn() {
        $('.remove-quantity-button').click(function() {
            _updateQuantity($(this), -1);
            _updatePrice($(this));
            _disableMinusButtonIfNecessary($(this));
            _onChanges();
        }); 
        $('.add-quantity-button').click(function() {
            _updateQuantity($(this), +1);
            _updatePrice($(this));
            _disableMinusButtonIfNecessary($(this));
            _onChanges();
        });   
    }

    function _disableMinusButtonIfNecessary(button) {
        var quantityNode = button.closest('td').find('.quantity');
        if (parseInt(quantityNode.text()) <= 1) {
            button.attr("disabled", "");
        } else {
            button.closest('td').find('.remove-quantity-button').removeAttr("disabled");
        }
    }

    function _updateQuantity(button, addOrSub) {
        var quantityNode = button.closest('td').find('.quantity');
        quantityNode.text(parseInt(quantityNode.text()) + addOrSub);

        var rowIndex = button.closest('tr').index();
        ShoppingCartServices.addToProductQuantity(rowIndex, addOrSub);
    }

    function _updatePrice(button) {
        var rowIndex = button.closest('tr').index();
        var cart = ShoppingCartServices.getCart();
        var newPrice = cart[rowIndex].price * cart[rowIndex].quantity;
        var priceNode = button.closest('tr').find('.price');
        priceNode.text(newPrice.toFixed(2) + ' $');
    }
    
    function _setOnClickEmptyCartBtn() {
        $('#remove-all-items-button').click(() => {
            // pop up confirmation
            _displayEmptyCartPage();
            ShoppingCartServices.emptyCart();
            _onChanges();
        });    
    }

    $(document).ready(function() {
        ShoppingCartController.displayShoppingCartPage();
        ShoppingCartController.setOnClick();
    });

    return self;
})();
