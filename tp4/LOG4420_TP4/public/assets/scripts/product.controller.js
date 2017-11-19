var onlineShop = onlineShop || {};

/**
 * Controls the "product" view.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
(function($, productsService, utils) {
  "use strict";

  /**
   * Updates the view.
   *
   * @param product   The product to use to update the view.
   * @private
   */
  function _updateView(product) {
    $("#product-name").text(product.name);
    $("#product-desc").html(product["description"]);
    $("#product-price").html(utils.formatPrice(product.price));
    $("#product-image").attr("src", "./assets/img/" + product.image);
    $("#product-features").append(product["features"].map(function(feature) {
      return $("<li>" + feature + "</li>");
    }));
    $("#add-to-cart-form").attr("data-product-id", product.id);
  }

  // Initialize the product view.
  var productId = +utils.getUrlParameter("id");
  let promise = productsService.getProduct(productId);
  promise.catch(function(err){
    console.error("Invalid ID specified");
    $("article").html('<h1>Page non trouvée!</h1>')
  
  })
  promise.done(function(product) {
    console.log('product')
    console.log(product)
    if (product) {
      _updateView(product);
    } else {
      console.error("Invalid ID specified");
      $("article").html('<h1>Page non trouvée!</h1>')
    }
  });

})(jQuery, onlineShop.productsService, onlineShop.utils);
