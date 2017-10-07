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


ProductsServices.Categories.setOnClick();
ProductsServices.Criteria.setOnClick();
ProductsServices.getData().done(data => {
	var camerasOnly = ProductsServices.Categories.camerasOnly(data);
	ProductsServices.Criteria.sortPriceLowHigh(camerasOnly);
	ProductsController.displayProducts(camerasOnly);
	$('#products-count').html(camerasOnly.length + ' produits');
});
