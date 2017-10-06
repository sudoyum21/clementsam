

(function() {
    'use strict'
    var table = $('table.table >tbody >tr');
    var totalPrice = $(".shopping-cart-total");

    function setBadge(){
        let rowCount = table.length;
        if(rowCount){
            $(".count").css("visibility", "visible");
            $(".count").text(rowCount);
        } else {
            $(".count").css("visibility", "hidden");
        }
    }
    function setPrice(){
        let price = 0;
        console.log( table.find('td:last-child'))
        table.find('td:last-child').each(function(idx,value){

            let valueParsed = value.innerText.toString().slice(0, -1);
            price+=parseFloat(valueParsed);
            console.log(valueParsed)
        })
        totalPrice.text(parseFloat(price.toString()).toFixed(2) + "$");
    }
    function setOnClickEvent(){
        $("button.btn").click(function(){
            table.remove();
            onChanges();
        });    
    }
    function onChanges(){
        table = $('table.table >tbody >tr');
        setBadge();  
        setPrice();
    }
    $( document ).ready(function() {
        onChanges();
        setOnClickEvent();
    });
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