define('vendor/ane/nightwatch.conf', function(require, exports, module) {

  "use strict";
  module.exports = (function (settings) {
      if (process.platform === 'win32') {
          settings.selenium.cli_args['webdriver.chrome.driver'] += '.exe';
      }
      return settings;
  })(require('vendor/ane/nightwatch.json'));
  //# sourceMappingURL=/ms-bus/static/vendor/ane/nightwatch.conf.js.map
  

});
