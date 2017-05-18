define('vendor/ane/components/ms-notification/ms-notification.ts', function(require, exports, module) {

  "use strict";
  var noty = require("node_modules/noty/js/noty/packaged/jquery.noty.packaged");
  var defaultOptions = {
      timeout: 3000
  };
  exports.__esModule = true;
  exports["default"] = {
      info: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-info-circle'),
              type: 'information',
              timeout: timeout || defaultOptions.timeout
          });
      },
      success: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-check-circle'),
              type: 'success',
              timeout: timeout || defaultOptions.timeout
          });
      },
      error: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-times-circle'),
              type: 'error',
              timeout: timeout || defaultOptions.timeout
          });
      },
      warning: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          noty({
              text: template(title, message, 'fa fa-warning'),
              type: 'warning',
              timeout: timeout || defaultOptions.timeout
          });
      },
      warn: function (_a) {
          var message = _a.message, title = _a.title, timeout = _a.timeout;
          this.warning({ message: message, title: title, timeout: timeout });
      },
      config: function (options) {
          if (options.timeout !== undefined) {
              defaultOptions.timeout = options.timeout;
          }
      }
  };
  function template(title, message, icon) {
      title = title ? "<strong>" + title + "</strong><br>" : '';
      return "<div>\n                <i class=\"" + icon + " pull-left\" style=\"font-size: 38px;min-width: 38px;text-align: center;\"></i>\n                " + title + "\n                " + message + "\n            </div>";
  }
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-notification/ms-notification.js.map
  

});
