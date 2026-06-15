function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    allowPermissionButton: '#mx.com.liverpool.shoppingapp:id/btn_allow_permission',
    denyPermissionButton: '#mx.com.liverpool.shoppingapp:id/btn_deny_permission',
    skipOnboardingButton: '#mx.com.liverpool.shoppingapp:id/skip_action'
  };

  return {
    locators: locators,

    denyPermissionIfPresent: function() {
      return base.clickIfPresent(locators.denyPermissionButton, 5);
    },

    skipOnboardingIfPresent: function() {
      return base.clickIfPresent(locators.skipOnboardingButton, 5);
    },

    handleInitialScreens: function() {
      this.denyPermissionIfPresent();
      this.skipOnboardingIfPresent();
    }
  };
}
