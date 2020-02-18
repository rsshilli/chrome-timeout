/*
   This file contains the default options we want for our testing tool, Chimp.  Check out the options available here:
      https://github.com/xolvio/chimp/blob/master/src/bin/default.js

   Browser specific options are in chimp-chrome.js and chimp-firefox.js
 */

module.exports = {
  path: "src/features",
  watchSource: "src",
  showXolvioMessages: false,
  screenshotsOnError: true,
  screenshotsPath: "build/test/report/screenshots",
  captureAllStepScreenshots: true,
  jsonOutput: "build/test/report/testReport.json",
  //versions: true, // Uncomment to see the versions of everything you're using and have chimp quit
  // debug: true, // Uncomment to see the versions of everything you're using
  // debugCucumber: true, // To debug a cucumber test in your IDE (use debug instead of inspect mode)
  webdriverio: {
    logLevel: "verbose",
    logOutput: "build/test/report",
    deprecationWarnings: false,
    coloredLogs: false,
    waitforTimeout:  120*1000,
  },
  seleniumStandaloneOptions: {
    // check for more recent versions of selenium here:
    // http://selenium-release.storage.googleapis.com/index.html
    version: "3.9.1",
    baseURL: "https://selenium-release.storage.googleapis.com",
    drivers: {
      chrome: {
        version: "74.0.3729.6", // This is actually controlled by the version of cherry-chimp
        arch: process.arch,
        baseURL: "https://chromedriver.storage.googleapis.com"
      },
      ie: {
        // check for more recent versions of internet explorer driver here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: "3.14.0",
        arch: "ia32",
        baseURL: "https://selenium-release.storage.googleapis.com"
      },
      firefox: {
        // check for more recent versions of gecko  driver here:
        // https://github.com/mozilla/geckodriver/releases
        version: "0.23.0",
        arch: process.arch,
        baseURL: "https://github.com/mozilla/geckodriver/releases/download"
      }
    }
  },

};
