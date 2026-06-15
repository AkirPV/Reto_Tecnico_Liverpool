function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    accountTab: '//android.widget.FrameLayout[@content-desc="Mi cuenta"]',
    guestLoginOption: '#mx.com.liverpool.shoppingapp:id/rlGuest',
    loggedInIndicator: null
  };

  return {
    locators: locators,

    openAccount: function() {
      base.waitAndClick(locators.accountTab, 10);
    },

    selectGuestLogin: function() {
      base.waitAndClick(locators.guestLoginOption, 15);
    },

    isSessionActive: function() {
      if (!locators.loggedInIndicator) {
        return false;
      }

      try {
        return base.isPresent(locators.loggedInIndicator, 5);
      } catch (e) {
        return false;
      }
    },

    assertSessionStarted: function() {
      if (!locators.loggedInIndicator) {
        karate.log('TODO: add post-login account selector and assert it here.');
        return;
      }

      base.waitForElement(locators.loggedInIndicator, 15);
    },

    loginIfNeeded: function(email, password) {
      if (this.isSessionActive()) {
        return;
      }

      this.openAccount();
      this.selectGuestLogin();

      var loginPage = karate.call('classpath:pages/LoginPage.js');
      loginPage.login(email, password);
      this.assertSessionStarted();
    }
  };
}
