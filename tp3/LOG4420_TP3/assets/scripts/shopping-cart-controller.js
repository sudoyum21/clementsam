'use strict';

var ShoppingCartController = (function() {
    var self = {};

    self.setOnClick = function(){
        _setOnClickRemoveProductBtn();
        ShoppingCartController.Quantity.setOnClickQuantityBtn();
        _setOnClickEmptyCartBtn();
    }

    self.onChanges = function() {
        HeaderController.updateCartCount();
        ShoppingCartController.Page.updateCartPage();
    }

    function _setOnClickRemoveProductBtn() {
        $('.remove-item-button').click(function() {
            var confirmBox = confirm("Voulez-vous supprimer le produit du panier ?");
            if (confirmBox == true) {
                var row = $(this).closest('tr');
                ShoppingCartServices.removeProduct(row.index());
                row.remove();
                self.onChanges();
            }
        });    
    }
    
    function _setOnClickEmptyCartBtn() {
        $('#remove-all-items-button').click(() => {
            var confirmBox = confirm("Voulez-vous supprimer tous les produits du panier ?");
            if (confirmBox == true) {
                ShoppingCartServices.emptyCart();
                self.onChanges();
            }
        });    
    }

    $(document).ready(function() {
        ShoppingCartController.Page.setHtmlCartPage();
        ShoppingCartController.setOnClick();
    });

    return self;
})();

ShoppingCartController.Page = (function() {
    var self = {};

    self.setHtmlCartPage = function() {
        if (HeaderServices.getCartCount() == 0) {
            _displayEmptyCartPage();
            return;
        }
        var cart = ShoppingCartServices.getCart();
        cart.forEach(product => {
            $('tbody').append(_getRowTemplate(product));
        });
        _displayTotalPrice();
    }

    self.updateCartPage = function() {
        if (HeaderServices.getCartCount() == 0) {
            _displayEmptyCartPage();
        } else {
            _displayTotalPrice();
        }
    }

    function _displayTotalPrice() {
        let price = 0;
        var cart = ShoppingCartServices.getCart();
        cart.forEach(product => {
            (price) += parseFloat(product.price) * product.quantity;
        });
        $("#total-amount strong").text(price.toFixed(2).replace(".", ",") + ' $');
    }

    function _displayEmptyCartPage() {
        $('article > *:not(:first-child)').remove();
        $('article').append('<p>Aucun produit dans le panier.</p>');
    }

    function _getRowTemplate(product) {
        var disabled = '';
        //var priceFormatted = parseFloat(parseFloat(product.price.toString()).toFixed(2).replace(".", ","));
        var priceFormatted = parseFloat(product.price);
        //var priceQuantityFormatted = parseFloat(parseFloat(product.price*product.quantity).toFixed(2).replace(".", ","));
        var priceQuantityFormatted = parseFloat(parseFloat(product.price)*product.quantity).toFixed(2).replace(".", ",");
        console.log(priceQuantityFormatted)
        if (product.quantity == 1) {
            disabled = ' disabled=""';
        }
        return '<tr>' +
        '  <td><button class="remove-item-button" title="Supprimer"><i class="fa fa-times"></i></button></td>' +
        '  <td><a href="./product.html?id=' + product.id + '">' + product.name + '</a></td>' +
        '  <td>' + priceFormatted + ' $</td>' +
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
        '  <td class="price">' + priceQuantityFormatted + ' $</td>' +
        '</tr>';
    }

    return self;
})();

ShoppingCartController.Quantity = (function() {
    var self = {};

    self.setOnClickQuantityBtn = function() {
        $('.remove-quantity-button').click(function() {
            _updateQuantity($(this), -1);
            _updatePrice($(this));
            _disableMinusButtonIfNecessary($(this));
            ShoppingCartController.onChanges();
        }); 
        $('.add-quantity-button').click(function() {
            _updateQuantity($(this), +1);
            _updatePrice($(this));
            _disableMinusButtonIfNecessary($(this));
            ShoppingCartController.onChanges();
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
        var newPrice = parseFloat(cart[rowIndex].price) * cart[rowIndex].quantity;
        var priceNode = button.closest('tr').find('.price');
        priceNode.text(newPrice.toFixed(2).replace(".", ",") + ' $');
    }

    return self;
})();
