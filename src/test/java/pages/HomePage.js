function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    searchInput: '#mx.com.liverpool.shoppingapp:id/edt_header_searchbar_old',
    searchInputSearch: '#mx.com.liverpool.shoppingapp:id/edt_header_searchbar',
    wishlistButton: '#mx.com.liverpool.shoppingapp:id/btn_wishlist',
    bagButton: '#mx.com.liverpool.shoppingapp:id/cl_bag_search',
    selectedStoreLabel: '#mx.com.liverpool.shoppingapp:id/lblStoreSelected',
    accountTab: '//android.widget.FrameLayout[@content-desc="Mi cuenta"]',
    servicesTab: '//android.widget.FrameLayout[@content-desc="Servicios"]',
    creditAndSavingsTab: '//android.widget.FrameLayout[@content-desc="Crédito y Ahorro"]',
    exploreTab: '//android.widget.FrameLayout[@content-desc="Explorar"]',
    homeTab: '//android.widget.FrameLayout[@content-desc="Inicio"]',
    locationMessageText: '#mx.com.liverpool.shoppingapp:id/tv_text',
    locationTurnOnButton: '#mx.com.liverpool.shoppingapp:id/turn_on',
    locationCancelButton: '#mx.com.liverpool.shoppingapp:id/btnCancel',
    locationCloseButton: '#mx.com.liverpool.shoppingapp:id/imgClose',
    tutorialText: '#mx.com.liverpool.shoppingapp:id/textViewShowCaseText'
  };

  return {
    locators: locators,

    waitForHome: function() {
      base.waitForElement(locators.homeTab, 15);
      base.waitForElement(locators.exploreTab, 15);
      base.waitForElement(locators.accountTab, 15);
    },

    searchProduct: function(productName) {
      base.waitAndClick(locators.searchInput, 10);
      base.waitAndInput(locators.searchInputSearch, productName, 50)
      base.pressEnter();
      base.hideKeyboardIfPresent();
    },

    openWishlist: function() {
      base.waitAndClick(locators.wishlistButton, 15);
    },

    openBag: function() {
      base.waitAndClick(locators.bagButton, 15);
    },

    openAccount: function() {
      base.waitAndClick(locators.accountTab, 15);
    },

    openHome: function() {
      base.waitAndClick(locators.homeTab, 15);
      base.waitForElement(locators.searchInput, 15);
    },

    openStoreSelector: function() {
      base.waitAndClick(locators.selectedStoreLabel, 15);
      this.handleLocationMessageIfPresent();
    },

    handleLocationMessageIfPresent: function() {
      if (base.clickIfPresent(locators.locationCloseButton, 5)) {
        return;
      }

      base.clickIfPresent(locators.locationCancelButton, 5);
    },

    assertSelectedStore: function(storeName) {
      base.waitForText(locators.selectedStoreLabel, storeName, 15);
    }
  };
}
