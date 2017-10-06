'use strict'
/* Besoin de séparer services et controllers (controllers = touche au html)
   Clic catégorie: supprimer tout le html de produtcs-list et rajouter ceux qu'il faut
*/
var getProducts = (function () {
	function _getAsync() {
		$.get("./data/products.json", data => {
			//data = computersOnly(data);
			sortPriceLowHigh(data);
			displayProducts(data);
		});
	};
	function camerasOnly(data) {
		return data.filter(product => {
			return product.category === 'cameras';
		});
	};
	function consolesOnly(data) {
		return data.filter(product => {
			return product.category === 'consoles';
		});
	};
	function screensOnly(data) {
		return data.filter(product => {
			return product.category === 'screens';
		});
	};
	function computersOnly(data) {
		return data.filter(product => {
			return product.category === 'computers';
		});
	};
	function sortPriceLowHigh(data) {
		data.sort((a, b) => {
			return a.price > b.price;
		});
	};
	function sortPriceHighLow(data) {
		data.sort((a, b) => {
			return a.price < b.price;
		});
	};
	function sortNameAZ(data) {
		data.sort((a, b) => {
			return a.name > b.name;
		});
	};
	function sortNameZA(data) {
		data.sort((a, b) => {
			return a.name < b.name;
		});
	};
	function getProductTemplate(name, image, price) {
		return '        <div class="product">' +
		'		   <a href="./product.html" title="En savoir plus...">' +
		'	         <h2>' + name + '</h2>' +
		'	         <img alt="' + name + '" src="./assets/img/' + image + '">' +
		'            <p><small>Prix</small> ' + price + '&thinsp;$</p>' +
		'          </a>' +
		'        </div>';
	};
	function displayProducts(data) {
		data.forEach(product => {
			$("#products-list").append(getProductTemplate(product.name, product.image, product.price));
		});
	};
	return {       
		getDatas: function () {
            _getAsync();
        },
    };
});
var test = new getProducts();
test.getDatas();
