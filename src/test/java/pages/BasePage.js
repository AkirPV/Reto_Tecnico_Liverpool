function fn() {
var APP_LOAD_TIMEOUT = 30;
var PAGE_TIMEOUT = 20;
var ELEMENT_TIMEOUT = 10;
var OPTIONAL_TIMEOUT = 3;
var INTERVAL = 500;

  var DEFAULT_TIMEOUT = 30;
  var OPTIONAL_TIMEOUT = 5;
  var INTERVAL = 1000;
  var Thread = Java.type('java.lang.Thread');
  var appPackage = karate.get('appPackage') || 'mx.com.liverpool.shoppingapp';

  var locators = {
    homeTab: '//android.widget.FrameLayout[@content-desc="Inicio"]',
    exploreTab: '//android.widget.FrameLayout[@content-desc="Explorar"]',
    accountTab: '//android.widget.FrameLayout[@content-desc="Mi cuenta"]'
  };

  function driverRef() {
    return karate.get('driver');
  }

  function isPresent(locator) {
    try {
      return exists(locator);
    } catch (e) {
      return false;
    }
  }

function waitForElement(locator, timeout) {
  var maxSeconds = timeout || ELEMENT_TIMEOUT;
  var maxAttempts = Math.ceil((maxSeconds * 1000) / INTERVAL);

  logWait('Waiting up to ' + maxSeconds + 's for: ' + locator);

  for (var i = 1; i <= maxAttempts; i++) {
    if (existsSafe(locator)) {
      logOk('Found: ' + locator);
      return locate(locator);
    }

    // Log only first and last retry, not every attempt
    if (i === 1 || i === maxAttempts) {
      karate.log('[RETRY] Attempt ' + i + '/' + maxAttempts + ': ' + locator);
    }

    java.lang.Thread.sleep(INTERVAL);
  }

  logIssue('Element not found after ' + maxSeconds + 's: ' + locator);
  karate.fail('Element not found after ' + maxSeconds + 's: ' + locator);
}

function waitAndClick(locator, timeout) {
  logStep('Click: ' + locator);
  waitForElement(locator, timeout || ELEMENT_TIMEOUT);
  click(locator);
}

function waitAndInput(locator, value, timeout) {
  logStep('Input into: ' + locator);
  waitForElement(locator, timeout || ELEMENT_TIMEOUT);
  click(locator);
  input(locator, value);
}

function waitForAppLoaded() {
  logStep('Wait for app loaded');

  waitForAnyElement([
    'id=mx.com.liverpool.shoppingapp:id/btn_deny_permission',
    'id=mx.com.liverpool.shoppingapp:id/skip_action',
    '//android.widget.FrameLayout[@content-desc="Inicio"]',
    '//android.widget.FrameLayout[@content-desc="Explorar"]',
    '//android.widget.FrameLayout[@content-desc="Mi cuenta"]',
    'id=mx.com.liverpool.shoppingapp:id/edt_header_searchbar_old'
  ], APP_LOAD_TIMEOUT);
}

function waitForAnyElement(locators, timeout) {
  var maxSeconds = timeout || APP_LOAD_TIMEOUT;
  var maxAttempts = Math.ceil((maxSeconds * 1000) / INTERVAL);

  for (var i = 1; i <= maxAttempts; i++) {
    for (var j = 0; j < locators.length; j++) {
      if (existsSafe(locators[j])) {
        logOk('Loaded with element: ' + locators[j]);
        return locators[j];
      }
    }

    if (i === 1 || i === maxAttempts) {
      karate.log('[RETRY] App load attempt ' + i + '/' + maxAttempts);
    }

    java.lang.Thread.sleep(INTERVAL);
  }

  karate.fail('App did not load after ' + maxSeconds + 's');
}

  function waitForText(locator, expected, timeout) {
    waitForElement(locator, timeout);
    var actual = text(locator) || '';

    if (actual.indexOf(expected) === -1) {
      karate.fail('Expected text "' + expected + '" but found "' + actual + '" for locator: ' + locator);
    }
  }

function clickIfPresent(locator, timeout) {
  var maxSeconds = timeout || OPTIONAL_TIMEOUT;
  var maxAttempts = Math.ceil((maxSeconds * 1000) / INTERVAL);

  for (var i = 1; i <= maxAttempts; i++) {
    if (existsSafe(locator)) {
      karate.log('[STEP] Optional click: ' + locator);
      click(locator);
      return true;
    }

    java.lang.Thread.sleep(INTERVAL);
  }

  karate.log('[SKIP] Optional not present: ' + locator);
  return false;
}

  function isPresentWithin(locator, timeout) {
    var max = timeout || OPTIONAL_TIMEOUT;

    for (var i = 0; i < max; i++) {
      if (isPresent(locator)) {
        return true;
      }
      Thread.sleep(INTERVAL);
    }

    return false;
  }

  function pressEnter() {
    driverRef().script('mobile: performEditorAction', { action: 'search' });
  }

  function scrollDown() {
    return driverRef().script('mobile: scrollGesture', {
      left: 0,
      top: 650,
      width: 1080,
      height: 1400,
      direction: 'down',
      percent: 0.85
    });
  }

  function scrollUntilVisible(locator, maxScrolls) {
    var max = maxScrolls || 8;

    for (var i = 0; i < max; i++) {
      if (isPresent(locator)) {
        return locate(locator);
      }
      scrollDown();
      Thread.sleep(INTERVAL);
    }

    karate.fail('Element not visible after scroll: ' + locator);
  }

  function waitAndClickAfterScroll(locator, maxScrolls) {
    scrollUntilVisible(locator, maxScrolls);
    waitAndClick(locator, DEFAULT_TIMEOUT);
  }

  function hideKeyboardIfPresent() {
    try {
      driverRef().hideKeyboard();
    } catch (e) {
      karate.log('Keyboard was not visible.');
    }
  }

  function startFromScratch() {
    try {
      var activeDriver = driverRef();
      if (activeDriver) {
        activeDriver.quit();
      }
    } catch (e) {
      karate.log('No previous Appium session was active.');
    }
  }

function xpathLiteral(value) {
  value = String(value);

  if (value.indexOf('"') === -1) {
    return '"' + value + '"';
  }

  if (value.indexOf("'") === -1) {
    return "'" + value + "'";
  }

  return 'concat("' + value.replace(/"/g, '", \'"\', "') + '")';
}

  return {
   APP_LOAD_TIMEOUT: APP_LOAD_TIMEOUT,
   PAGE_TIMEOUT: PAGE_TIMEOUT,
   ELEMENT_TIMEOUT : ELEMENT_TIMEOUT,
   INTERVAL: INTERVAL,
    DEFAULT_TIMEOUT: DEFAULT_TIMEOUT,
    OPTIONAL_TIMEOUT: OPTIONAL_TIMEOUT,
    locators: locators,
    waitForElement: waitForElement,
    waitAndClick: waitAndClick,
    waitAndInput: waitAndInput,
    waitForText: waitForText,
    clickIfPresent: clickIfPresent,
    isPresent: isPresentWithin,
    pressEnter: pressEnter,
    scrollDown: scrollDown,
    scrollUntilVisible: scrollUntilVisible,
    waitAndClickAfterScroll: waitAndClickAfterScroll,
    hideKeyboardIfPresent: hideKeyboardIfPresent,
    startFromScratch: startFromScratch,
    textViewByExactText: function(value) {
      return '//android.widget.TextView[@text=' + xpathLiteral(value) + ']';
    },
    textViewByContainsText: function(value) {
      return '//android.widget.TextView[contains(@text,' + xpathLiteral(value) + ')]';
    }
  };

  function existsSafe(locator) {
    try {
      return exists(locator);
    } catch (e) {
      return false;
    }
  }

  function logStep(message) {
    karate.log('[STEP] ' + message);
  }

  function logWait(message) {
    karate.log('[WAIT] ' + message);
  }

  function logOk(message) {
    karate.log('[OK] ' + message);
  }

  function logIssue(message) {
    karate.log('[ISSUE] ' + message);
  }

}
