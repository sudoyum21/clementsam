'use strict';

var OrderServices = (function() {
    var self = {};
    var data;

    self.updateLastOrderToLS = function(firstname, lastname) {
        var orders = [];
        
        let lastOrder = self.getLastOrder();
        let newOrderNumber = lastOrder['orderNumber'] ? parseInt(lastOrder['orderNumber'].toString()) + 1 : 1; 
        let ordersLSRaw = localStorage.getItem('orders');
        if(ordersLSRaw){
            orders = JSON.parse(ordersLSRaw);
        }     
        orders.push({
            firstname : firstname,
            lastname : lastname,
            orderNumber : newOrderNumber
        });
        localStorage.setItem('orders', JSON.stringify(orders));  
    }

    self.getLastOrder = function (){
        let lastOrder = {};
        let orders, ordersLength;
        let ordersLSRaw = localStorage.getItem('orders');
        if(ordersLSRaw){
            console.log(ordersLSRaw)
            orders = JSON.parse(ordersLSRaw);  
            ordersLength = Object.keys(orders).length;       
        }        
        if(ordersLength > 0) {
            
            lastOrder = orders[ordersLength-1];
        } 
        console.log(lastOrder)
        return lastOrder;
    }

    self.clearOrders = function(){
        let orders = [];
        localStorage.setItem('orders', JSON.stringify(orders));  
    }

    return self;
})();