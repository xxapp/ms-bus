define('index.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  /// <reference path="typings/index.d.ts" />
  "use strict";
  require("node_modules/es5-shim/es5-shim");
  require("node_modules/es6-promise/dist/es6-promise.auto");
  var jQuery = require("node_modules/jquery/dist/jquery");
  global.$ = global.jQuery = jQuery;
  '';
  require("node_modules/bootstrap/dist/js/bootstrap");
  var bootbox = require("node_modules/bootbox/bootbox");
  bootbox.setLocale('zh_CN');
  var avalon = require("node_modules/avalon2/dist/avalon");
  require("node_modules/mmRouter/dist/mmRouter");
  if (avalon.msie === 8) {
      Object.defineProperty = function (obj, property, meta) {
          obj[property] = meta.value;
      };
  }
  require("node_modules/es5-shim/es5-sham");
  // root vm
  var root = avalon.define({
      $id: 'root',
      currentPath: '/',
      currentPage: '',
      title: '仪表板',
      breadCrumb: [],
      user: {},
      $routeConfig: []
  });
  require("services/routerService.ts");
  avalon.history.start({
      fireAnchor: false
  });
  if (!/#!/.test(global.location.hash)) {
      avalon.router.navigate('/', 2);
  }
  avalon.scan(document.body);
  //# sourceMappingURL=/ms-bus/static/index.js.map
  

});
