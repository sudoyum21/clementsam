'use strict';

var OrderServices = (function() {
    var self = {};
    var data;

    self.updateLastOrderToLS = function(firstname, lastname, orderNumber) {
        var orders = [];
        let ordersLSRaw = localStorage.getItem('orders');
        if(ordersLSRaw){
            orders = JSON.parse(ordersLSRaw);
        }     
        orders.push({
            firstname : firstname,
            lastname : lastname,
            orderNumber : orderNumber
        });
        localStorage.setItem('orders', JSON.stringify(orders));  
    }

    self.getLastOrder = function (){
        let lastOrder = {};
        let orders, ordersLength;
        let ordersLSRaw = localStorage.getItem('orders');
        if(ordersLSRaw){
            orders = JSON.parse(ordersLSRaw);  
            ordersLength = Object.keys(orders).length;       
        }        
        if(ordersLength > 0) {
            lastOrder = orders[ordersLength-1];
        } 
        return lastOrder;
    }

    return self;
})();