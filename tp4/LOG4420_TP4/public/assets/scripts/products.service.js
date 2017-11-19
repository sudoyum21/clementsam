var onlineShop = onlineShop || {};

/**
 * Defines a service to retrieve the products.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.productsService = (function($) {
  "use strict";

  var self = {};
  var productsPromise;

  /**
   * Gets all the products.
   *
   * @param [sortingCriteria]   The sorting criteria to use. If no value is specified, the list returned isn't sorted.
   * @param [category]          The category of the product. The default value is "all".
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  self.getProducts = function(sortingCriteria, category) {
    //if (!productsPromise) {
      console.log('sending category ' + category + " " + sortingCriteria)
      productsPromise = $.get("http://127.0.0.1:8000/api/products?category="+category+"&criteria="+sortingCriteria);
    //}
    return productsPromise.then(function(products) {
      // if (category) {
      //   products = _applyCategory(products, category);
      // }
      // if (sortingCriteria) {
      //   products = _applySortingCriteria(products, sortingCriteria);
      // }
      console.log(products)
      return products;
    });
  };

  /**
   * Gets the product associated with the product ID specified.
   *
   * @param productId           The product ID associated with the product to retrieve.
   * @returns {jquery.promise}  A promise that contains the product associated with the ID specified.
   */
  self.getProduct = function(productId) {
    console.log(productId)
    return $.get("http://127.0.0.1:8000/api/products/"+productId);
    // return self.getProducts().then(function(products) {
    //   var product = products.filter(function(product) {
    //     return product.id === productId;
    //   });
    //   if (product.length > 0) {
    //     return product[0];
    //   } else {
    //     return null;
    //   }
    // });
  };

  /**
   * Applies a filter to the specified products list to keep only the products of the specified category.
   *
   * @param products        The products list to filter.
   * @param category        The category to use with the filter.
   * @returns {*}           The products list filtered.
   * @private
   */
  function _applyCategory(products, category) {
    if (products) {
      products = products.filter(function(product) {
        return category === "all" || product.category === category;
      });
    }
    return products;
  }

  /**
   * Applies a sorting criteria to the specified products list.
   *
   * @param products          The product list to sort.
   * @param sortingCriteria   The sorting criteria to use. The available values are:
   *                            - price-up (ascendant price);
   *                            - price-down (descendant price);
   *                            - alpha-up (alphabetical order ascending);
   *                            - alpha-down (alphabetical order descending).
   * @returns {*}             The products list sorted.
   * @private
   */
  function _applySortingCriteria(products, sortingCriteria) {
    if (products) {
      switch (sortingCriteria) {
        case "price-asc":
          products = products.sort(function(a, b) {
            return a["price"] - b["price"];
          });
          break;
        case "price-dsc":
          products = products.sort(function(a, b) {
            return b["price"] - a["price"];
          });
          break;
        case "alpha-asc":
          products = products.sort(function(a, b) {
            var nameA = a["name"].toLowerCase();
            var nameB = b["name"].toLowerCase();
            if (nameA > nameB) {
              return 1;
            } else if (nameA < nameB) {
              return -1;
            }
            return 0;
          });
          break;
        case "alpha-dsc":
          products = products.sort(function(a, b) {
            var nameA = a["name"].toLowerCase();
            var nameB = b["name"].toLowerCase();
            if (nameA > nameB) {
              return -1;
            } else if (nameA < nameB) {
              return 1;
            }
            return 0;
          });
          break;
      }
    }
    return products;
  }

  return self;
})(jQuery);
