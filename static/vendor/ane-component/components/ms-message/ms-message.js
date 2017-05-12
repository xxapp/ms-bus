define('vendor/ane-component/components/ms-message/ms-message.ts', function(require, exports, module) {

  "use strict";
  var noty = require("node_modules/noty/js/noty/packaged/jquery.noty.packaged");
  var defaultOptions = {
      duration: 1500
  };
  exports.__esModule = true;
  exports["default"] = {
      info: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-info-circle"></i>' + content,
              type: 'information',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      success: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-check-circle"></i>' + content,
              type: 'success',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      error: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-times-circle"></i>' + content,
              type: 'error',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      warning: function (_a) {
          var content = _a.content, duration = _a.duration;
          noty({
              text: '<i class="fa fa-warning"></i>' + content,
              type: 'warning',
              layout: 'topCenter',
              timeout: duration || defaultOptions.duration
          });
      },
      warn: function (_a) {
          var content = _a.content, duration = _a.duration;
          this.warning({ content: content, duration: duration });
      },
      config: function (options) {
          if (options.duration !== undefined) {
              defaultOptions.duration = options.duration;
          }
      }
  };
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-message/ms-message.js.map
  

});
