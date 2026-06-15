function fn() {
  var base = karate.call('classpath:pages/BasePage.js');

  var locators = {
    zipCodeInput: '#mx.com.liverpool.shoppingapp:id/edtCp',
    acceptButton: '#mx.com.liverpool.shoppingapp:id/btnAccept',
    selectedStoreLabel: '#mx.com.liverpool.shoppingapp:id/lblStoreSelected',
    galeriasCuernavacaRadio: '//android.widget.TextView[@resource-id="mx.com.liverpool.shoppingapp:id/lblNombreTienda" and @text="Liverpool Galerías Cuernavaca"]/ancestor::android.widget.LinearLayout[1]/preceding-sibling::android.widget.ImageButton'
  };

  return {
    locators: locators,

    searchStoreByZipCode: function(zipCode) {
      base.waitAndInput(locators.zipCodeInput, zipCode, 15);
      base.hideKeyboardIfPresent();
      base.waitAndClick(locators.acceptButton, 10);
    },

    selectStore: function(storeName) {
      if (storeName !== 'Liverpool Galerías Cuernavaca') {
        karate.fail('TODO: add a documented store selector for: ' + storeName);
      }

      base.waitAndClick(locators.galeriasCuernavacaRadio, 15);
    },

    assertSelectedStore: function(storeName) {
      base.waitForText(locators.selectedStoreLabel, storeName, 15);
    }
  };
}
