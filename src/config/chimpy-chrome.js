/*
   This file contains the default options we want for our testing tool, Chimp.  Check out the options available here:
      https://github.com/xolvio/chimp/blob/master/src/bin/default.js
 */

const chimpOptions = require("./chimpy-base");

chimpOptions.webdriverio.desiredCapabilities = {
  chromeOptions: {
    // ChromeDriver is just AWFUL because every version or two it breaks unless you pass cryptic arguments.  See https://stackoverflow.com/a/52340526/491553
    args: ["--no-sandbox",
      "enable-automation", // https://stackoverflow.com/a/43840128/1689770
      "--disable-infobars", // https://stackoverflow.com/a/43840128/1689770
      "--disable-dev-shm-usage", // https://stackoverflow.com/a/50725918/1689770
      "--disable-browser-side-navigation", // https://stackoverflow.com/a/49123152/1689770
      "--disable-gpu", // https://stackoverflow.com/questions/51959986/how-to-solve-selenium-chromedriver-timed-out-receiving-message-from-renderer-exc
      "--enable-blink-features=TrustedDOMTypes", // This is enabled whether you like it or not in Chrome 77
    ],
    prefs: {
      "credentials_enable_service": false,
      "profile": {
        "password_manager_enabled": false,
        "default_content_setting_values": {"automatic_downloads": 1}
      }
    }
  },
  handlesAlerts: true,
  unexpectedAlertBehaviour: "ignore",
  extensionLoadTimeout: 30000, // Ryan's own creation to attempt to stop https://stackoverflow.com/a/43840128/1689770
};

module.exports = chimpOptions;
