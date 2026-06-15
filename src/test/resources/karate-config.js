function fn() {
  var File = Java.type('java.io.File');
  var System = Java.type('java.lang.System');

  function propertyOrEnv(propertyName, envName, defaultValue) {
    var propertyValue = karate.properties[propertyName];
    if (propertyValue) {
      return propertyValue;
    }

    var envValue = System.getenv(envName);
    if (envValue) {
      return envValue;
    }

    return defaultValue;
  }

  function resolvePath(path) {
    var file = new File(path);
    if (!file.isAbsolute()) {
      file = new File(System.getProperty('user.dir'), path);
    }

    return file.getCanonicalPath();
  }

  var appPackage = 'mx.com.liverpool.shoppingapp';
  var appPath = resolvePath(propertyOrEnv('appium.app', 'APPIUM_APP', 'src/test/resources/apps/9.0.8.apk'));
  var appFile = new File(appPath);

  if (!appFile.exists()) {
    karate.log('[WARN] APK not found at: ' + appPath);
    karate.log('[WARN] Place 9.0.8.apk in src/test/resources/apps or override with -Dappium.app / APPIUM_APP.');
  }

  var capabilities = {
    platformName: 'Android',
    'appium:platformVersion': propertyOrEnv('appium.platformVersion', 'APPIUM_PLATFORM_VERSION', '12.0'),
    'appium:deviceName': propertyOrEnv('appium.deviceName', 'APPIUM_DEVICE_NAME', 'emulator-5554'),
    'appium:automationName': 'UiAutomator2',
    'appium:app': appPath,
    'appium:appPackage': appPackage,
    'appium:appActivity': '.icon.AppIcon',
    'appium:appWaitActivity': '*',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 300
  };

  var webDriverSession = {
    capabilities: {
      alwaysMatch: capabilities,
      firstMatch: [{}]
    }
  };

  var appiumServerUrl = propertyOrEnv('appium.serverUrl', 'APPIUM_SERVER_URL', 'http://127.0.0.1:4723');
  var driverConfig = {
    type: 'android',
    start: false,
    webDriverUrl: appiumServerUrl,
    webDriverSession: webDriverSession,
    httpConfig: {
      readTimeout: 120000
    }
  };

  karate.configure('connectTimeout', 30000);
  karate.configure('readTimeout', 120000);
  karate.configure('driver', driverConfig);
  karate.configure('afterScenario', function() {
    if (karate.info.errorMessage) {
      try {
        var activeDriver = karate.get('driver');
        karate.embed(activeDriver.screenshot(), 'image/png');
      } catch (e) {
        karate.log('Unable to capture screenshot after failure: ' + e);
      }
    }

    try {
      var activeDriverToClose = karate.get('driver');
      if (activeDriverToClose) {
        activeDriverToClose.quit();
      }
    } catch (e) {
      karate.log('No active Appium session to close after scenario.');
    }
  });

  return {
    appPackage: appPackage,
    appium: {
      serverUrl: appiumServerUrl,
      capabilities: capabilities,
      webDriverSession: webDriverSession,
      driverConfig: driverConfig
    },
    testData: read('classpath:test-data/users.json')
  };
}
