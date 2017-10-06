'use strict'
/* Besoin de séparer services et controllers (controllers = touche au html)
   Clic catégorie: supprimer tout le html de produtcs-list et rajouter ceux qu'il faut
*/
var ProductsController = (function () {
	var self = {};

	function getProductTemplate(name, image, price) {
		return '        <div class="product">' +
		'		   <a href="./product.html" title="En savoir plus...">' +
		'	         <h2>' + name + '</h2>' +
		'	         <img alt="' + name + '" src="./assets/img/' + image + '">' +
		'            <p><small>Prix</small> ' + price + '&thinsp;$</p>' +
		'          </a>' +
		'        </div>';
	};

	self.displayProducts = function(data) {
		data.forEach(product => {
			$("#products-list").append(getProductTemplate(product.name, product.image, product.price));
		});
	};

	return self;
})();
ProductsServices.getData().done(data => {
	var camerasOnly = ProductsServices.camerasOnly(data);
	ProductsServices.sortPriceLowHigh(camerasOnly);
	ProductsController.displayProducts(camerasOnly);
});
