'use strict';

var ProductsController = (function () {
	var self = {};
	var originalData;

	self.init = function(data) {
		originalData = data;
	}
	
	self.setOnClickSideBar = function() {
		_setOnClick($('#product-categories > button'));
		_setOnClick($('#product-criteria > button'));
	}

	self.up = function() {
		//$('#produits-list').empty();
		$('#produits-list').html('');
		var filter = _getSelectedCategory();
		var sort = _getSelectedCriteria();
		var updatedData = ProductsServices.update(originalData, filter, sort);
		_displayProducts(updatedData);
		console.log('UP: ' + filter + ', ' + sort);
		console.log('    data: ' + updatedData);
	}

	function _setOnClick(buttonsGroup) {
		buttonsGroup.each(function() {
			$(this).click(() => {
				buttonsGroup.each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
				self.up();
			});
		});
	}
	
	function _displayProducts(data) {
		$('#products-count').html(data.length + ' produits');
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

	function _getSelectedCategory() {
		switch(_findSelectedText($('#product-categories > button'))) {
			case 'Appareils photo': return 'cameras';
			case 'Consoles': return 'consoles';
			case 'Écrans': return 'screens';
			case 'Ordinateurs': return 'computers';
			case 'Tous les produits': return 'all';
		}
	}

	function _getSelectedCriteria() {
		switch(_findSelectedText($('#product-criteria > button'))) {
			case 'Prix (bas-haut)': return 'LH';
			case 'Prix (haut-bas)': return 'HL';
			case 'Nom (A-Z)': return 'AZ';
			case 'Nom (Z-A)': return 'ZA';
		}
	}

	function _findSelectedText(buttonsGroup) {
		var selectedText;
		buttonsGroup.each(function() {
			if ($(this).attr('class') === 'selected') {
				selectedText = $(this).text();
				return false;
			}
		});
		return selectedText;
	}

	return self;
})();

ProductsServices.getData().done(data => {
	ProductsController.init(data);
	ProductsController.setOnClickSideBar();
	ProductsController.up();
});
