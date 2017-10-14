'use strict';

var ConfirmationController = (function () {
    var self = {};
    var lastOrder = {};
    const confirmationPrefix = 'Votre commande est confirmée ';
    
    self.buildConfirmationInfo = function(){
        let lastOrder = _getLastOrder();
        if(lastOrder == null){
            return ":( Votre commande a été refusée. Veuillez contacter OnlineShopping pour plus d'informations.";
        }
        $("#confirmation-number").html(lastOrder['orderNumber']);
        return confirmationPrefix + lastOrder['firstname'] + " " + lastOrder['lastname'] + "!";
    }
    self.clearLS = function(){        
        ShoppingCartServices.emptyCart();
        HeaderController.updateCartCount();
    }
    function _getLastOrder(){
        lastOrder = OrderServices.getLastOrder();
        if(lastOrder){
            return lastOrder;
        }
        return null;
    }
    $(document).ready(function () {
        $("#confirmation-info").html(ConfirmationController.buildConfirmationInfo());        
        ConfirmationController.clearLS();
    });

    return self;
})();