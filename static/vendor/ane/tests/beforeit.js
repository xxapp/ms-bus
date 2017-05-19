define('vendor/ane/tests/beforeit', function(require, exports, module) {

  "use strict";
  require('node_modules/es5-shim/es5-shim');
  require('node_modules/es6-promise/dist/es6-promise.auto');
  require('node_modules/jquery/dist/jquery');
  window.$ = window.jQuery = jQuery;
  require('node_modules/bootstrap/dist/js/bootstrap');
  var bootbox = require('node_modules/bootbox/bootbox');
  bootbox.setLocale('zh_CN');
  var avalon = require('node_modules/avalon2/dist/avalon');
  avalon.config({
      debug: false
  });
  if (avalon.msie === 8) {
      Object.defineProperty = function (obj, property, meta) {
          obj[property] = meta.value;
      };
  }
  require('node_modules/es5-shim/es5-sham');
  require('../output/ane.js');
  //# sourceMappingURL=/ms-bus/static/vendor/ane/tests/beforeit.js.map
  

});
