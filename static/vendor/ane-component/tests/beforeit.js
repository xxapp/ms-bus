define('vendor/ane-component/tests/beforeit', function(require, exports, module) {

  "use strict";
  bootbox.setLocale('zh_CN');
  avalon.config({
      debug: false
  });
  if (avalon.msie === 8) {
      Object.defineProperty = function (obj, property, meta) {
          obj[property] = meta.value;
      };
  }
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/tests/beforeit.js.map
  

});
