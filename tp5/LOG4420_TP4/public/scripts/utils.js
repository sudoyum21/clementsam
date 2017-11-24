var onlineShop = onlineShop || {};

/**
 * Provides some useful functions.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.utils = {

  /**
   * Formats the specified number as a price.
   *
   * @param price         The price to format.
   * @returns {string}    The price formatted.
   */
  formatPrice: function(price) {
    return price.toFixed(2).replace(".", ",") + "&thinsp;$";
  }
};
