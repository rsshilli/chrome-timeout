"use strict";

const fs = require("fs");
const path = require("path");
const moment = require("moment");

let shouldPerformOneTimeSetup = true;
let myStepDefinitionsWrapper = function() {

  this.Before(function() {
    if (shouldPerformOneTimeSetup) {
      console.log("Remove any stray alerts until they stop showing up...");
      try {
        // noinspection InfiniteLoopJS
        while (true) {
          browser.alertAccept();
          // If the alert exists, give the next one a hot second to show up.
          browser.pause(1000);
        }
      } catch (ignored) {
        // This is expected after they're gone.
      }

      console.log("Figuring out the max size of the window...");
      browser.windowHandleMaximize();
      let windowSize = browser.windowHandleSize().value;
      console.log("Window size: " + windowSize.width + " x " + windowSize.height);

      console.log("Setting the new size of the window...");
      browser.windowHandlePosition({x: 500, y: 0});
      browser.windowHandleSize({width: windowSize.width - 510, height: windowSize.height - 15});

      shouldPerformOneTimeSetup = false;
    }
  });

  let count = 0;
  let startTime = moment();

  this.When(/^I go to the (first|second) page$/, function(page) {
    let fileName = path.join(__dirname, "..", "..", "webpages", page + ".html");
    // Uncomment to see where it's going to
    // console.log("Navigating to:", fileName);
    count++;
    if ((count % 10) === 0) {
      let soFar = moment.duration(moment().diff(startTime), "milliseconds");
      let msPerPage = soFar.asMilliseconds()/count;
      let msToGo = (100000-count)*msPerPage;
      let durationToGo = moment.duration(msToGo, "milliseconds");
      console.log(`${count} of 100k screenshots produced in ${(formatDuration(soFar))}. ${formatDuration(durationToGo)} left to go (about ${durationToGo.humanize()})`);
    }

    browser.url("file://" + fileName);
  });

  function formatDuration(duration, includeMS = false) {
    return `${duration.hours()}:${formatNum(duration.minutes())}:${formatNum(duration.seconds())}`;
  }

  function formatNum(num) {
    return num < 10 ? "0" + num : num;
  }

};

module.exports = myStepDefinitionsWrapper;

