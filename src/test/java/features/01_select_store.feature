Feature: Select store

  Background:
    * def data = testData
    * def base = call read('classpath:pages/BasePage.js')
    * def permissions = call read('classpath:pages/PermissionPage.js')
    * def home = call read('classpath:pages/HomePage.js')
    * def store = call read('classpath:pages/StorePage.js')
    * configure driver = appium.driverConfig
    * eval base.startFromScratch()
    * driver { webDriverSession: '#(appium.webDriverSession)' }
    * eval permissions.handleInitialScreens()
    * eval home.waitForHome()

  Scenario: Select Liverpool Galerías Cuernavaca store
    When eval home.openStoreSelector()
    And eval store.searchStoreByZipCode(data.store.zipCode)
    And eval store.selectStore(data.store.name)
    Then eval store.assertSelectedStore(data.store.name)
