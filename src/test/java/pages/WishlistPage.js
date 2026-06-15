function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    wishlistTitle: '#mx.com.liverpool.shoppingapp:id/title_wishlist_textview',
    wishlistTitleXpath: '//android.widget.TextView[@resource-id="mx.com.liverpool.shoppingapp:id/title_wishlist_textview"]',
    whisListNameProduct: '//android.widget.TextView[contains(@text,"'+productData.completeName+'")]',
    productName: function(productName) {
      return base.textViewByContainsText(productName);
    }
  };

  return {
    locators: locators,

    openMyWishlist: function() {
      base.waitAndClick(locators.wishlistTitle, 15);
    },

    assertContainsProduct: function() {
      base.waitForElement(locators.whisListNameProduct, 15);
    }
  };
}
