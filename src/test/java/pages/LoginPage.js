function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    usernameInput: '-new UiSelector().resourceId("username")',
    passwordInput: '-new UiSelector().resourceId("password")',
    loginButton: '-new UiSelector().text("Iniciar sesión")',
    usernameInputXpath: '//android.widget.EditText[@resource-id="username"]',
    passwordInputXpath: '//android.widget.EditText[@resource-id="password"]',
    loginButtonXpath: '//android.widget.Button[@text="Iniciar sesión"]'
  };

  return {
    locators: locators,

    waitForLogin: function() {
      base.waitForElement(locators.usernameInput, 15);
      base.waitForElement(locators.passwordInput, 30);
    },

    login: function(email, password) {
      this.waitForLogin();
      base.waitAndInput(locators.usernameInput, email, 15);
      base.hideKeyboardIfPresent();

      base.waitAndInput(locators.passwordInput, password, 15);
      base.hideKeyboardIfPresent();

      base.waitAndClick(locators.loginButton, 15);
    }
  };
}
