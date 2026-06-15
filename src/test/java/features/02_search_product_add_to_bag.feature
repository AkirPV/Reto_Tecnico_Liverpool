Feature: Search product and add to bag

  Background:
    * def data = testData
    * def productData = data.products.karcher
    * def base = call read('classpath:pages/BasePage.js')
    * def permissions = call read('classpath:pages/PermissionPage.js')
    * def home = call read('classpath:pages/HomePage.js')
    * def results = call read('classpath:pages/SearchResultsPage.js')
    * def product = call read('classpath:pages/ProductPage.js')
    * configure driver = appium.driverConfig
    * eval base.startFromScratch()
    * driver { webDriverSession: '#(appium.webDriverSession)' }
    * eval permissions.handleInitialScreens()
    * eval home.waitForHome()

  Scenario: Search Karcher K2 product and add it to the bag
    When eval home.searchProduct(productData.searchText)
    And eval results.openProduct(productData.name)
    And eval product.assertProductId(productData.productId)
    And eval product.assertProductName(productData.name)
    When eval product.scrollToAddToBagButton()
    And eval product.addProductToBag()
    Then eval product.assertBagBadge('1')
    When eval product.openBagFromHeader()
    Then eval product.assertBagContainsProduct(productData.completeName)
