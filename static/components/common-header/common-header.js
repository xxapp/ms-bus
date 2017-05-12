define('components/common-header/common-header.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  exports.name = 'common-header';
  avalon.component(exports.name, {
      template: "\n<div class=\"navbar-inner \">\n    <div class=\"navbar-container \">\n        <!-- Navbar Barnd -->\n        <div class=\"navbar-header pull-left \">\n            <a href=\"#\" class=\"navbar-brand \">\n                <small>\n                    <img style=\"height: 45px;width: 162px;\" src=\"/ms-bus/static/static/beyond/img/logo-inverted.png\" alt=\"\" />\n                </small>\n            </a>\n        </div>\n        <!-- /Navbar Barnd -->\n\n        <!-- Sidebar Collapse -->\n        <div class=\"sidebar-collapse \" id=\"sidebar-collapse\">\n            <i class=\"collapse-icon fa fa-bars \"></i>\n        </div>\n        <!-- /Sidebar Collapse -->\n        <!-- Account Area and Settings -->\n        <div class=\"navbar-header pull-right \">\n            <div class=\"navbar-account \">\n                <ul class=\"account-area \">\n                   <li>\n                        <a class=\"login-area dropdown-toggle hidden \" data-toggle=\"dropdown\">\n                            <div class=\"avatar \" title=\"View your public profile\">\n                                <img src=\"/ms-bus/static/static/beyond/img/avatars/adam-jansen.jpg\">\n                            </div>\n                            <section>\n                                <h2><span class=\"profile \"><span></span></span></h2>\n                            </section>\n                        </a>\n                        <!--Login Area Dropdown-->\n                        <ul class=\"pull-right dropdown-menu dropdown-arrow dropdown-login-area \">\n                            <li class=\"username \"><a>David Stevenson</a></li>\n                            <!--<li class=\"email \"><a>David.Stevenson@live.com</a></li>-->\n                            <li class=\"edit \">\n                                <a href=\"javascript:;\" class=\"pull-left \" ms-click=\"logout\">\n                                    退出登录\n                                </a>\n                                <!--<a href=\"javascript:;\" class=\"pull-left \">Profile</a>\n                                <a href=\"#\" class=\"pull-right \">Setting</a>-->\n                            </li>\n                            <!--<li class=\"dropdown-footer \">\n                                <a href=\"javascript:;\" ms-click=\"logout\">\n                                    退出登录\n                                </a>\n                            </li>-->\n                        </ul>\n                        <!--/Login Area Dropdown-->\n                    </li>\n                    <!-- /Account Area -->\n                    <!--Note: notice that setting div must start right after account area list.\n                    no space must be between these elements-->\n                </ul>\n            </div>\n        </div>\n        <!-- /Account Area and Settings -->\n    </div>\n</div>\n",
      defaults: {
          currentUserName: '',
          logout: function () {
              global.sessionStorage.removeItem('adminSession');
              global.location.href = '/login.html';
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/components/common-header/common-header.js.map
  

});
