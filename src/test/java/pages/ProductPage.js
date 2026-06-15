function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    addToBagButton: '//android.widget.TextView[@text="Agregar a mi bolsa"]',
    buyNowButton: '//android.widget.TextView[@text="Comprar ahora"]',
    plusButton: '//android.widget.TextView[@text="+"]',
    addedToBagMessage: '//android.widget.TextView[@text="Agregaste un producto a tu bolsa"]',
    bagBadge: '#mx.com.liverpool.shoppingapp:id/badge',
    wishlistButton: '//android.view.View[@content-desc="wishlist"]',
    wishlistAccessibilityId: '@wishlist',
    wishlistUiAutomator: '-new UiSelector().description("wishlist")',
    headerBagButton: '#mx.com.liverpool.shoppingapp:id/btn_header_bag',
    moreHeaderButton: '#mx.com.liverpool.shoppingapp:id/more',
    headerSearchInput: '#mx.com.liverpool.shoppingapp:id/edt_header_searchbar_old',
    headerBackButton: '#mx.com.liverpool.shoppingapp:id/btn_header_back',
    goHomeMenuItem: '//android.widget.TextView[@resource-id="mx.com.liverpool.shoppingapp:id/description" and @text="Ir a inicio"]',
    goHomeMenuItemUiAutomator: '-new UiSelector().text("Ir a inicio")',

    productIdLabel: function(productId) {
      return '//android.widget.TextView[@text="Código de producto: ' + productId + '"]';
    },

    productNameLabel: function(productName) {
      return base.textViewByExactText(productName);
    },

    bagProductName: function(productName) {
      return base.textViewByContainsText(productName);
    }
  };

  return {
    locators: locators,

    assertProductId: function(productId) {
      base.scrollUntilVisible(locators.productIdLabel(productId), 4);
      base.waitForElement(locators.productIdLabel(productId), 15);
    },

    assertProductName: function(productName) {
      base.waitForElement(locators.productNameLabel(productName), 15);
    },

    scrollToAddToBagButton: function() {
      base.scrollUntilVisible(locators.addToBagButton, 8);
    },

    addProductToBag: function() {
      base.waitAndClickAfterScroll(locators.addToBagButton, 8);
      base.waitForElement(locators.addedToBagMessage, 15);
    },

    assertBagBadge: function(expectedValue) {
      base.waitForText(locators.bagBadge, expectedValue, 15);
    },

    openBagFromHeader: function() {
      base.waitAndClick(locators.headerBagButton, 15);
    },

    assertBagContainsProduct: function(productName) {
      base.waitForElement(locators.bagProductName(productName), 15);
    },

    addToWishlist: function() {
      if (base.clickIfPresent(locators.wishlistButton, 15)) {
        return;
      }

      if (base.clickIfPresent(locators.wishlistAccessibilityId, 15)) {
        return;
      }

      base.waitAndClick(locators.wishlistUiAutomator, 15);
    },

    returnHomeFromProductMenu: function() {
      base.waitAndClick(locators.moreHeaderButton, 15);

      if (base.clickIfPresent(locators.goHomeMenuItem, 5)) {
        return;
      } else {
        base.waitAndClick(locators.goHomeMenuItemUiAutomator, 15);
      }
    }
  };
}
