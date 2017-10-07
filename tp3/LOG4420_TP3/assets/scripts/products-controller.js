var ProductsController = (function () {
	'use strict'
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
	ProductsServices.setOnClickCategories();
	ProductsServices.setOnClickCriteria();
	var camerasOnly = ProductsServices.camerasOnly(data);
	ProductsServices.sortPriceLowHigh(camerasOnly);
	ProductsController.displayProducts(camerasOnly);
	$('#products-count').html(camerasOnly.length + ' produits');
});
