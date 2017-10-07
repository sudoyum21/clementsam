'use strict';

var ProductsController = (function () {
	var self = {};
	
	self.displayProducts = function(data) {
		data.forEach(product => {
			$("#products-list").append(_getProductTemplate(product.name, product.image, product.price));
		});
	}

	function _getProductTemplate(name, image, price) {
		return '        <div class="product">' +
		'		   <a href="./product.html" title="En savoir plus...">' +
		'	         <h2>' + name + '</h2>' +
		'	         <img alt="' + name + '" src="./assets/img/' + image + '">' +
		'            <p><small>Prix</small> ' + price + '&thinsp;$</p>' +
		'          </a>' +
		'        </div>';
	}

	return self;
})();

ProductsController.Categories = (function() {
	var self = {};
	
	self.setOnClick = function() {
		$('#product-categories > button').each(function() {
			$(this).click(() => {
				$('#product-categories > button').each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
			});
		});
	}

	self.whichSelected = function() {
		var selectedText;
		$('#product-categories > button').each(function() {
			if ($(this).attr('class') === 'selected') {
				selectedText = $(this).text();
				return false;
			}
		});
		switch(selectedText) {
			case 'Appareils photo': return 'cameras';
			case 'Consoles': return 'consoles';
			case 'Écrans': return 'screens';
			case 'Ordinateurs': return 'computers';
			case 'Tous les produits': return 'all';
		}
	}

	return self;
})();

ProductsController.Criteria = (function() {
	var self = {};

	self.setOnClick = function() {
		$('#product-criteria > button').each(function() {
			$(this).click(() => {
				$('#product-criteria > button').each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
			});
		});
	}

	self.whichSelected = function() {
		var selectedText;
		$('#product-criteria > button').each(function() {
			if ($(this).attr('class') === 'selected') {
				selectedText = $(this).text();
				return false;
			}
		});
		switch(selectedText) {
			case 'Prix (bas-haut)': return 'LH';
			case 'Prix (haut-bas)': return 'HL';
			case 'Nom (A-Z)': return 'AZ';
			case 'Nom (Z-A)': return 'ZA';
		}
	}

	return self;
})();

ProductsController.Categories.setOnClick();
ProductsController.Criteria.setOnClick();
ProductsServices.getData().done(data => {
	var filter = ProductsController.Categories.whichSelected(); 
	var sort = ProductsController.Criteria.whichSelected(); 
	var updatedData = ProductsServices.update(data, filter, sort);
	ProductsController.displayProducts(updatedData);
	$('#products-count').html(updatedData.length + ' produits');
});
