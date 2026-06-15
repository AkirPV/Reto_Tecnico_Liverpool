function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    karcherProduct: '//(//android.widget.TextView[@text="Hidrolavadora K2 Universal Car Edition"]/preceding-sibling::android.view.View[@clickable="true"])[last()]'
  };

  return {
    locators: locators,

    openProduct: function(productName) {
      if (productName === 'Hidrolavadora K2 Universal Car Edition') {
        base.waitAndClick(locators.karcherProduct, 15);
        return;
      }

      karate.fail('TODO: add a documented search-result selector for product: ' + productName);
    },

    openProductIfResultListIsDisplayed: function(productName) {
      if (productName === 'Hidrolavadora K2 Universal Car Edition') {
        return this.openProduct(productName);
      }

      var productText = base.textViewByExactText(productName);
      base.clickIfPresent(productText, 5);
    }
  };
}
