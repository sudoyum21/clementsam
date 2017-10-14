'use strict';

var OrderServices = (function() {
    var self = {};
    var data;

    self.updateLastOrderToLS = function(firstname, lastname) {
        var orders = [];
        let newOrderNumber = 1;
        let lastOrder = self.getLastOrder();
        if(lastOrder['orderNumber']){
            newOrderNumber =  parseInt(lastOrder['orderNumber'].toString()) + 1;
        }        
        console.log(newOrderNumber)
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
        console.log(localStorage.getItem('orders'))
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