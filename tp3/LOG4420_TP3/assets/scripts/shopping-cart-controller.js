
// ***** Patron module *****
var example = (function (number, document) {
    // Variable privée
    var privateVariable = number;
    var document = document;
    // Function privée
    function _privateFunction() { /* ... */
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
console.log($(".logo"))
let testA = new example(5, document);
console.log(testA.publicFunction2());
console.log(testA)
let testB = new example(12, window.document);

console.log(testB.publicFunction2());
console.log(testB.publicFunction2())
console.log($(".count").text());


function setBadge(){
    let rowCount = $('table.table >tbody >tr').length;
    if(rowCount){
        $(".count").css("visibility", "visible");
        $(".count").text(rowCount);
    } else {
        $(".count").css("visibility", "hidden");
    }
}

setBadge();  


// var rowCount = $('table.table >tbody >tr').each(function(idx) {
//     console.log(this)
//     console.log(idx)
// }, this);;

