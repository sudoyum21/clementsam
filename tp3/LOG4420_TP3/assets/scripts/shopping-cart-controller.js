
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





