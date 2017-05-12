define('services/ajaxService.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  "use strict";
  var __assign = (this && this.__assign) || Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  var bootbox = require("node_modules/bootbox/bootbox");
  var ane_1 = require("vendor/ane-component/index.ts");
  var configService_1 = require("services/configService.ts");
  // 拦截ajax请求，检测是否超时，以重新登录
  $(document).ajaxComplete(function (event, xhr, settings) {
      if (xhr.status === 200) {
          if (settings.dataType === 'json' && xhr.responseJSON !== void 0) {
              var result = xhr.responseJSON;
              if (result.code === '20' || result.code === '21') {
                  bootbox.confirm("Session已经失效，请重新登录", function (result) {
                      if (result) {
                          global.location.href = "/login.html";
                      }
                  });
              }
              else if (result.error) {
                  ane_1.notification.error({
                      message: result.error.message
                  });
              }
          }
      }
      else if (xhr.status === undefined) {
      }
      else {
          ane_1.notification.error({
              message: '请求错误，请联系管理员'
          });
      }
  });
  function default_1(options) {
      var defaultOptions = {
          dataType: 'json',
          cache: false
      };
      options.data = processRequest(options.data);
      options.url = configService_1.serviceUrl + options.url;
      return $.ajax(__assign({}, defaultOptions, options)).then(processResponse);
  }
  exports.__esModule = true;
  exports["default"] = default_1;
  ;
  // 标准化传给后台的参数
  function processRequest(r) {
      var str = r || {};
      if (str.start || str.limit) {
          str.page = {
              start: str.start || 0,
              limit: str.limit || 15
          };
          delete str.start;
          delete str.limit;
      }
      return {
          params: JSON.stringify(str)
      };
  }
  // 标准化后台相应数据格式
  function processResponse(r) {
      var str = {};
      if (r.rows) {
          str = r;
          str.code = '0';
          str.list = r.rows;
          delete str.rows;
      }
      else {
          if (!r.error) {
              str.code = '0';
              str.data = r;
          }
          else {
              str.code = '1';
              str.message = r.message || r.error;
          }
      }
      return str;
  }
  //# sourceMappingURL=/ms-bus/static/services/ajaxService.js.map
  

});
