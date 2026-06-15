Feature: Add product to wishlist

  Background:
    * def data = testData
    * def productData = data.products.wishlistProduct
    * def base = call read('classpath:pages/BasePage.js')
    * def permissions = call read('classpath:pages/PermissionPage.js')
    * def home = call read('classpath:pages/HomePage.js')
    * def account = call read('classpath:pages/AccountPage.js')
    * def results = call read('classpath:pages/SearchResultsPage.js')
    * def product = call read('classpath:pages/ProductPage.js')
    * def wishlist = call read('classpath:pages/WishlistPage.js')
    * configure driver = appium.driverConfig
    * eval base.startFromScratch()
    * driver { webDriverSession: '#(appium.webDriverSession)' }
    * eval permissions.handleInitialScreens()
    * eval home.waitForHome()
    * eval account.loginIfNeeded(data.validUser.email, data.validUser.password)
    * eval home.openHome()

  Scenario: Add product to wishlist and verify it appears in wishlist
    When eval home.searchProduct(productData.searchText)
    And eval results.openProductIfResultListIsDisplayed(productData.name)
    And eval product.assertProductId(productData.productId)
    And eval product.assertProductName(productData.name)
    When eval product.addToWishlist()
    And eval product.returnHomeFromProductMenu()
    And eval home.openWishlist()
    And eval wishlist.openMyWishlist()
    Then eval wishlist.assertContainsProduct()
