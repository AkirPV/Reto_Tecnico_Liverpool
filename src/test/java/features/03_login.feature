Feature: Login

  Background:
    * def data = testData
    * def base = call read('classpath:pages/BasePage.js')
    * def permissions = call read('classpath:pages/PermissionPage.js')
    * def home = call read('classpath:pages/HomePage.js')
    * def account = call read('classpath:pages/AccountPage.js')
    * def login = call read('classpath:pages/LoginPage.js')
    * configure driver = appium.driverConfig
    * eval base.startFromScratch()
    * driver { webDriverSession: '#(appium.webDriverSession)' }
    * eval permissions.handleInitialScreens()
    * eval home.waitForHome()

  Scenario: Login with valid credentials
    When eval home.openAccount()
    And eval account.selectGuestLogin()
    And eval login.login(data.validUser.email, data.validUser.password)
    Then eval account.assertSessionStarted()
