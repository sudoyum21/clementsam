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
        $("#name").text(confirmationPrefix + lastOrder['firstname'] + " " + lastOrder['lastname'] + "!");   
        $("#confirmation-number").html(lastOrder['orderNumber']);
    }
    self.clearLS = function(){        
        ShoppingCartServices.emptyCart();
        HeaderController.updateCartCount();
        OrderServices.clearOrders();
    }
    function _getLastOrder(){
        lastOrder = OrderServices.getLastOrder();
        if(lastOrder){
            console.log(lastOrder)
            return lastOrder;
        }
        return null;
    }
    $(document).ready(function () {        
        ConfirmationController.buildConfirmationInfo();          
        ConfirmationController.clearLS();
    });

    return self;
})();