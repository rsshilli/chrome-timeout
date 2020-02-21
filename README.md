# Chrome Timeout
This is an attempt to create a reproducible test for the dreaded error message:
```
Timed out receiving message from renderer: 10.000
```
See https://bugs.chromium.org/p/chromedriver/issues/detail?id=3328

# Status

Unfortunately I never was able to reproduce this bug reliably. I may come back to it later. It seems maybe Chrome 80 doesn't see this as often?

# Setup
* Install Node 10.16.3
  * Any version of node should work, but that's what I'm using
* Install NPM 6.13.6
  * Again, any should work, but that's what I've got
* Install Docker
  * Constrain the resources like below. You can make this higher but it'll just take longer to fail.
  ![CPU: 1, Memory: 1 GB](https://raw.githubusercontent.com/rsshilli/chrome-timeout/master/images/dockerResources.png)
* Install dependencies: `npm install`

# Run the test locally
**NOTE:** This may not fail. It seems you need a low amount of memory (like in a docker container) to see the error.

Still, this can be useful just so you can see what the test is doing on your machine. It's very simple.
* On Windows: `npm run testWindows`
* On Linux: `npm run testLinux`

# Run the test in Docker
* Run:
```shell script
npm run buildDockerImage
npm run testInDocker
```
* Now wait for a while and you should see the test run and the error

