'use strict';

var ProductsController = (function () {
    var self = {};
    /**
     * Set les event click handler
     */
    self.setOnClick = function() {
        _setOnClickSideBar($('#product-categories > button'));
        _setOnClickSideBar($('#product-criteria > button'));
    }
    /**
     * Mettre a jour les produits
     */
    self.updateProducts = function() {
        $('#products-list').empty();
        var filter = _getSelectedCategory();
        var sort = _getSelectedCriteria();
        var updatedData = ProductsServices.getUpdatedData(filter, sort);
        _displayProducts(updatedData);
    }
    /**
     * Levenement click pour le sidebar
     */
    function _setOnClickSideBar(buttonsGroup) {
        buttonsGroup.each(function() {
            $(this).click(() => {
                buttonsGroup.each(function() {
                    $(this).removeClass('selected');
                });
                $(this).addClass('selected');
                self.updateProducts();
            });
        });
    }
    /**
     * Affichage des produits 
     * @param {data} - les datas obtenus 
     */
    function _displayProducts(data) {
        let suffix = " produit" + ((data.length > 1) ? "s" : "");
        $('#products-count').html(data.length + suffix);
        data.forEach(product => {
            $("#products-list").append(_getProductTemplate(product.id, product.name, product.image, product.price.toFixed(2).replace(".", ",")));
        });
    }
    /**
     * Faire le template pour chacun des produits
     * @param {id} - identifiant du produit
     * @param {name} - nom du produit
     * @param {image} - image du produit
     * @param {price} - prix du produit
     * @return {template} - le template en format html du produit
     */
    function _getProductTemplate(id, name, image, price) {
        return '<div class="product">' +
        '  <a href="./product.html?id=' + id + '" title="En savoir plus...">' +
        '    <h2>' + name + '</h2>' +
        '    <img alt="' + name + '" src="./assets/img/' + image + '">' +
        '    <p><small>Prix</small> ' + price + '&thinsp;$</p>' +
        '  </a>' +
        '</div>';
    }
    /**
     * Faire le template pour chacun des produits
     * @param {id} - identifiant du produit
     * @param {name} - nom du produit
     * @param {image} - image du produit
     * @param {price} - prix du produit
     * @return {template} - le template en format html du produit
     */
    function _getSelectedCategory() {
        switch(_findSelectedText($('#product-categories > button'))) {
            case 'Appareils photo': return 'cameras';
            case 'Consoles': return 'consoles';
            case 'Écrans': return 'screens';
            case 'Ordinateurs': return 'computers';
            case 'Tous les produits': return 'all';
        }
    }
    /**
     * obtenir les criteres de selection ou filtrage
     */
    function _getSelectedCriteria() {
        switch(_findSelectedText($('#product-criteria > button'))) {
            case 'Prix (bas-haut)': return 'LH';
            case 'Prix (haut-bas)': return 'HL';
            case 'Nom (A-Z)': return 'AZ';
            case 'Nom (Z-A)': return 'ZA';
        }
    }
    /**
     * Recherche dun item html par class ayant selected comme nom
     */
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

    $(document).ready(function() {
        ProductsServices.getRequest().done(data => {
            ProductsServices.initData(data);
            ProductsController.updateProducts();
            ProductsController.setOnClick();
        });
    });

    return self;
})();
