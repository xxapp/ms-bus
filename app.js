;/*!components/common-header/common-header.ts*/
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
    

});

;/*!vendor/beyond/index.js*/
define('vendor/beyond/index', function(require, exports, module) {

  "use strict";
  var $ = require('node_modules/jquery/dist/jquery');
  var avalon = require('node_modules/avalon2/dist/avalon');
  function getThemeColorFromCss(n) {
      var t = $("<span><\/span>").hide().appendTo("body"), i;
      return t.addClass(n),
          i = t.css("color"),
          t.remove(),
          i;
  }
  function InitiateSideMenu() {
      // 用途不明
      $(".sidebar-toggler").on("click", function () {
          return $("#sidebar").toggleClass("hide"),
              $(".sidebar-toggler").toggleClass("active"),
              !1;
      });
      var isMenuCompacted = $("#sidebar").hasClass("menu-compact");
      // 菜单展开和收起
      $("#sidebar-collapse").on("click", function () {
          $("#sidebar").is(":visible") || $("#sidebar").toggleClass("hide");
          $("#sidebar").toggleClass("menu-compact");
          $(".sidebar-collapse").toggleClass("active");
          avalon.vmodels.sidebar.compact = isMenuCompacted = $("#sidebar").hasClass("menu-compact");
          isMenuCompacted && $(".open > .submenu").removeClass("open");
      });
  }
  function InitiateWidgets() {
      $('.widget-buttons *[data-toggle="maximize"]').on("click", function (n) {
          n.preventDefault();
          var t = $(this).parents(".widget").eq(0), i = $(this).find("i").eq(0), r = "fa-compress", u = "fa-expand";
          t.hasClass("maximized") ? (i && i.addClass(u).removeClass(r),
              t.removeClass("maximized"),
              t.find(".widget-body").css("height", "auto")) : (i && i.addClass(r).removeClass(u),
              t.addClass("maximized"),
              maximize(t));
      });
      $('.widget-buttons *[data-toggle="collapse"]').on("click", function (n) {
          n.preventDefault();
          var t = $(this).parents(".widget").eq(0), r = t.find(".widget-body"), i = $(this).find("i"), u = "fa-plus", f = "fa-minus", e = 300;
          t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u),
              t.removeClass("collapsed"),
              r.slideUp(0, function () {
                  r.slideDown(e);
              })) : (i && i.addClass(u).removeClass(f),
              r.slideUp(200, function () {
                  t.addClass("collapsed");
              }));
      });
      $('.widget-buttons *[data-toggle="dispose"]').on("click", function (n) {
          n.preventDefault();
          var i = $(this), t = i.parents(".widget").eq(0);
          t.hide(300, function () {
              t.remove();
          });
      });
  }
  function maximize(n) {
      if (n) {
          var t = $(window).height(), i = n.find(".widget-header").height();
          n.find(".widget-body").height(t - i);
      }
  }
  function scrollTo(n, t) {
      var i = n && n.size() > 0 ? n.offset().top : 0;
      jQuery("html,body").animate({
          scrollTop: i + (t ? t : 0)
      }, "slow");
  }
  function InitiateSettings() {
      readCookie("navbar-fixed-top") != null && readCookie("navbar-fixed-top") == "true" && ($("#checkbox_fixednavbar").prop("checked", !0),
          $(".navbar").addClass("navbar-fixed-top"));
      readCookie("sidebar-fixed") != null && readCookie("sidebar-fixed") == "true" && ($("#checkbox_fixedsidebar").prop("checked", !0),
          $(".page-sidebar").addClass("sidebar-fixed"));
      readCookie("breadcrumbs-fixed") != null && readCookie("breadcrumbs-fixed") == "true" && ($("#checkbox_fixedbreadcrumbs").prop("checked", !0),
          $(".page-breadcrumbs").addClass("breadcrumbs-fixed"));
      readCookie("page-header-fixed") != null && readCookie("page-header-fixed") == "true" && ($("#checkbox_fixedheader").prop("checked", !0),
          $(".page-header").addClass("page-header-fixed"));
      $("#checkbox_fixednavbar").change(function () {
          $(".navbar").toggleClass("navbar-fixed-top");
          $("#checkbox_fixedsidebar").is(":checked") && ($("#checkbox_fixedsidebar").prop("checked", !1),
              $(".page-sidebar").toggleClass("sidebar-fixed"));
          $("#checkbox_fixedbreadcrumbs").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedbreadcrumbs").prop("checked", !1),
              $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
          $("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1),
              $(".page-header").toggleClass("page-header-fixed"));
          setCookiesForFixedSettings();
      });
      $("#checkbox_fixedsidebar").change(function () {
          $(".page-sidebar").toggleClass("sidebar-fixed");
          $("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0),
              $(".navbar").toggleClass("navbar-fixed-top"));
          $("#checkbox_fixedbreadcrumbs").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedbreadcrumbs").prop("checked", !1),
              $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
          $("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1),
              $(".page-header").toggleClass("page-header-fixed"));
          setCookiesForFixedSettings();
      });
      $("#checkbox_fixedbreadcrumbs").change(function () {
          $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed");
          $("#checkbox_fixedsidebar").is(":checked") || ($("#checkbox_fixedsidebar").prop("checked", !0),
              $(".page-sidebar").toggleClass("sidebar-fixed"));
          $("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0),
              $(".navbar").toggleClass("navbar-fixed-top"));
          $("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1),
              $(".page-header").toggleClass("page-header-fixed"));
          setCookiesForFixedSettings();
      });
      $("#checkbox_fixedheader").change(function () {
          $(".page-header").toggleClass("page-header-fixed");
          $("#checkbox_fixedbreadcrumbs").is(":checked") || ($("#checkbox_fixedbreadcrumbs").prop("checked", !0),
              $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
          $("#checkbox_fixedsidebar").is(":checked") || ($("#checkbox_fixedsidebar").prop("checked", !0),
              $(".page-sidebar").toggleClass("sidebar-fixed"));
          $("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0),
              $(".navbar").toggleClass("navbar-fixed-top"));
          setCookiesForFixedSettings();
      });
  }
  function setCookiesForFixedSettings() {
      createCookie("navbar-fixed-top", $("#checkbox_fixednavbar").is(":checked"), 100);
      createCookie("sidebar-fixed", $("#checkbox_fixedsidebar").is(":checked"), 100);
      createCookie("breadcrumbs-fixed", $("#checkbox_fixedbreadcrumbs").is(":checked"), 100);
      createCookie("page-header-fixed", $("#checkbox_fixedheader").is(":checked"), 100);
  }
  function getcolor(n) {
      switch (n) {
          case "themeprimary":
              return themeprimary;
          case "themesecondary":
              return themesecondary;
          case "themethirdcolor":
              return themethirdcolor;
          case "themefourthcolor":
              return themefourthcolor;
          case "themefifthcolor":
              return themefifthcolor;
          default:
              return n;
      }
  }
  function switchClasses(n, t) {
      var u = document.getElementsByClassName(n), r;
      for (i = u.length - 1; i >= 0; i--)
          hasClass(u[i], "dropdown-menu") || (addClass(u[i], n + "-temp"),
              removeClass(u[i], n));
      for (r = document.getElementsByClassName(t),
          i = r.length - 1; i >= 0; i--)
          hasClass(r[i], "dropdown-menu") || (addClass(r[i], n),
              removeClass(r[i], t));
      for (tempClasses = document.getElementsByClassName(n + "-temp"),
          i = tempClasses.length - 1; i >= 0; i--)
          hasClass(tempClasses[i], "dropdown-menu") || (addClass(tempClasses[i], t),
              removeClass(tempClasses[i], n + "-temp"));
  }
  function addClass(n, t) {
      var i = n.className;
      i && (i += " ");
      n.className = i + t;
  }
  function removeClass(n, t) {
      var i = " " + n.className + " ";
      n.className = i.replace(" " + t, "").replace(/^\s+/g, "").replace(/\s+$/g, "");
  }
  function hasClass(n, t) {
      var i = " " + n.className + " ", r = " " + t + " ";
      return i.indexOf(r) != -1;
  }
  var themeprimary = getThemeColorFromCss("themeprimary"), themesecondary = getThemeColorFromCss("themesecondary"), themethirdcolor = getThemeColorFromCss("themethirdcolor"), themefourthcolor = getThemeColorFromCss("themefourthcolor"), themefifthcolor = getThemeColorFromCss("themefifthcolor"), rtlchanger, popovers, hoverpopovers;
  exports.init = function () {
      $(window).load(function () {
          setTimeout(function () {
              $(".loading-container").addClass("loading-inactive");
          }, 0);
      });
      $("#fullscreen-toggler").on("click", function () {
          var n = document.documentElement;
          $("body").hasClass("full-screen") ? ($("body").removeClass("full-screen"),
              $("#fullscreen-toggler").removeClass("active"),
              document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : ($("body").addClass("full-screen"),
              $("#fullscreen-toggler").addClass("active"),
              n.requestFullscreen ? n.requestFullscreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen() : n.msRequestFullscreen && n.msRequestFullscreen());
      });
      popovers = $("[data-toggle=popover]");
      $.each(popovers, function () {
          $(this).popover({
              html: !0,
              template: '<div class="popover ' + $(this).data("class") + '"><div class="arrow"><\/div><h3 class="popover-title ' + $(this).data("titleclass") + '">Popover right<\/h3><div class="popover-content"><\/div><\/div>'
          });
      });
      hoverpopovers = $("[data-toggle=popover-hover]");
      $.each(hoverpopovers, function () {
          $(this).popover({
              html: !0,
              template: '<div class="popover ' + $(this).data("class") + '"><div class="arrow"><\/div><h3 class="popover-title ' + $(this).data("titleclass") + '">Popover right<\/h3><div class="popover-content"><\/div><\/div>',
              trigger: "hover"
          });
      });
      $("[data-toggle=tooltip]").tooltip({
          html: !0
      });
      InitiateWidgets();
  };
  exports.initHeader = function () {
      $("#skin-changer li a").click(function () {
          createCookie("current-skin", $(this).attr("rel"), 10);
          window.location.reload();
      });
      $("#btn-setting").on("click", function () {
          $(".navbar-account").toggleClass("setting-open");
      });
      //InitiateSettings();
  };
  exports.initSidebar = function () {
      // rtlchanger = document.getElementById("rtl-changer");
      // location.pathname != "/index-rtl-fa.html" && location.pathname != "/index-rtl-ar.html" && (readCookie("rtl-support") ? (switchClasses("pull-right", "pull-left"),
      // switchClasses("databox-right", "databox-left"),
      // switchClasses("item-right", "item-left"),
      // $(".navbar-brand small img").attr("src", "/static/beyond/img/logo-rtl.png"),
      // rtlchanger != null && (document.getElementById("rtl-changer").checked = !0)) : rtlchanger != null && (rtlchanger.checked = !1),
      // rtlchanger != null && (rtlchanger.onchange = function() {
      //     this.checked ? createCookie("rtl-support", "true", 10) : eraseCookie("rtl-support");
      //     setTimeout(function() {
      //         window.location.reload()
      //     }, 600)
      // }
      // ));
      InitiateSideMenu();
  };
    

});

;/*!services/configService.ts*/
define('services/configService.ts', function(require, exports, module) {

  "use strict";
  exports.pageSize = 10;
  exports.domain = '/ms-bus';
  exports.serviceUrl = 'https://www.easy-mock.com/mock/58ff1b7c5e43ae5dbea5eff3';
    

});

;/*!services/ajaxService.ts*/
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
  var ane_1 = require("vendor/ane/index.ts");
  var configService_1 = require("services/configService.ts");
  // 拦截ajax请求，检测是否超时，以重新登录
  $(document).ajaxComplete(function (event, xhr, settings) {
      if (xhr.status === 200) {
          if (settings.dataType === 'json' && xhr.responseJSON !== void 0) {
              var result = xhr.responseJSON;
              if (result.code === '20' || result.code === '21') {
                  if (prompt("Session已经失效，请重新登录")) {
                      global.location.href = "/login.html";
                  }
                  ;
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
          cache: true,
          jsonp: 'callback'
      };
      options.data = processRequest(options.data);
      options.url = /^\w+:\/\//.test(options.url) ? options.url : configService_1.serviceUrl + options.url;
      if (configService_1.serviceUrl) {
          defaultOptions.dataType = 'jsonp';
          options.data.jsonp_param_name = 'callback';
      }
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
    

});

;/*!services/menuService.ts*/
define('services/menuService.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ajaxService_1 = require("services/ajaxService.ts");
  var menu = [{
          name: 'dashboard',
          stateName: 'root',
          title: '主页',
          icon: 'glyphicon-home',
          href: '#!/'
      }, {
          name: 'demo1',
          title: '例子一级',
          icon: 'glyphicon-home',
          href: 'javascript:;',
          children: [{
                  name: 'demo',
                  stateName: 'root.demo',
                  title: '例子',
                  icon: 'glyphicon-home',
                  href: '#!/demo',
                  childStates: ['root.supplier']
              }, {
                  name: 'demo-redux',
                  stateName: 'root.demoRedux',
                  title: 'redux例子',
                  icon: 'glyphicon-home',
                  href: '#!/demo-redux'
              }, {
                  name: 'demo-fast',
                  stateName: 'root.demoFast',
                  title: '快速CURD例子',
                  icon: 'glyphicon-home',
                  href: '#!/demo-fast'
              }]
      }, {
          name: 'doc-ms',
          title: '组件文档',
          icon: 'glyphicon-book',
          href: 'javascript:;',
          children: [{
                  name: 'doc-ms-table',
                  stateName: 'root.doc-ms-table',
                  title: 'Table',
                  href: '#!/doc-ms-table'
              }, {
                  name: 'doc-ms-form',
                  stateName: 'root.doc-ms-form',
                  title: 'Form',
                  href: '#!/doc-ms-form'
              }]
      }, {
          name: 'rxjs-demo-page',
          title: 'RxJS Demo Page',
          icon: 'glyphicon-page',
          href: '/pages/rxjs-demo/rxjs-demo.html',
          target: '_blank'
      }];
  // 根据权限过滤菜单
  var menuPromise = new Promise(function (rs, rj) {
      ajaxService_1["default"]({
          url: '/api/loged',
          type: 'get'
      }).then(function (result) {
          if (result.code === '0') {
              $('#loadImg').css('display', 'none');
              $('.login-area').removeClass('hidden').addClass('animated flipInX');
              travelMenu(menu, result.data.t.functions, result.data.t.allowedFunctions);
              avalon.mix(avalon.vmodels.root, { user: result.data.t });
              rs(menu.slice(0));
          }
          else {
              rj(result);
          }
      });
  });
  exports.menu = menuPromise;
  function travelMenu(menulet, functions, allowedFunctions) {
      if (!menulet) {
          return;
      }
      for (var i = 0, item = void 0; item = menulet[i++];) {
          var hasPermission = false;
          for (var j = 0, func = void 0; func = functions[j++];) {
              if (func.code === item.name && (allowedFunctions[func.code]) || allowedFunctions['all']) {
                  item.href = func.uri || item.href || 'javascript:;';
                  item.icon = func.icon_url || item.icon;
                  item.target = item.target || '_self';
                  item.children = item.children || [];
                  item.opened = false;
                  hasPermission = true;
                  break;
              }
          }
          item.show = hasPermission === true;
          travelMenu(item.children, functions, allowedFunctions);
      }
  }
  function walkMenu(name, process, level, menuLet) {
      if (level === void 0) { level = 1; }
      if (menuLet === void 0) { menuLet = menu.slice(0); }
      var finded = false;
      for (var i = 0, item = void 0; item = menuLet[i++];) {
          if (item.name === name || item.stateName === name) {
              process && process(item, level);
              finded = true;
              break;
          }
          if (item.childStates && ~item.childStates.indexOf(name)) {
              process && process(item, level);
              finded = true;
              break;
          }
          if (item.children && walkMenu(name, process, level + 1, item.children)) {
              process && process(item, level);
              finded = true;
              break;
          }
      }
      return finded;
  }
  exports.walkMenu = walkMenu;
    

});

;/*!components/common-sidebar/common-sidebar.ts*/
define('components/common-sidebar/common-sidebar.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var beyond = require("vendor/beyond/index");
  var menuService = require("services/menuService.ts");
  avalon.effect('collapse', {
      enter: function (elem, done) {
          $(elem).slideDown(200, done);
      },
      leave: function (elem, done) {
          $(elem).slideUp(200, done);
      }
  });
  exports.name = 'common-sidebar';
  avalon.component(exports.name, {
      template: "\n<ul class=\"nav sidebar-menu \">\n    <!--Dashboard-->\n    <li :visible=\"item.show\" \n        :class=\"[((@actived===item.name || @isChildActived(item)) ? 'active' : ''), ((@opened === item.name && !@compact) ? 'open' : '')] \" \n        :for=\"item in @menu\">\n        <a :attr=\"{href: item.href, target: item.target}\" \n            :class=\"[((item.children && item.children.length > 0) ? 'menu-dropdown' : '')] \"  \n            :click=\"@menuClick(item)\">\n            <i :class=\"['menu-icon', 'glyphicon', item.icon] \"></i>\n            <span class=\"menu-text \"> {{ item.name }} </span>\n            <i class=\"menu-expand \" :if=\"item.children && item.children.length > 0\"></i>\n        </a>\n        <ul class=\"submenu \" :effect=\"{is:'collapse',action:@opened == item.name?'enter':'leave'}\">\n            <li :visible=\"sub.show\" :class=\"[(actived===sub.name ? 'active' : '')] \" :for=\"sub in item.children || []\">\n                <a :attr=\"{href: sub.href, target: sub.target}\" :click=\"@menuClick(sub, item)\">\n                    <span class=\"menu-text \">{{ sub.title }}</span>\n                </a>\n            </li>\n        </ul>\n    </li>\n</ul>\n",
      defaults: {
          menu: [],
          actived: 'dashboard',
          opened: '',
          compact: false,
          menuClick: function (item, parent) {
              if (!item.children || item.children.length === 0) {
                  this.actived = item.name;
                  if (parent) {
                      this.opened = parent.name;
                  }
              }
              else {
                  if (this.opened == item.name) {
                      this.opened = '';
                  }
                  else {
                      this.opened = item.name;
                  }
              }
          },
          search: function () {
              this.$fire('all!title', 'Demo');
          },
          isChildActived: function (item) {
              // if (item.name === sidebar.actived) {
              //     return false;
              // }
              // for (var i = 0, bread; bread = avalon.vmodels.root.breadCrumb.$model[i++]; ) {
              //     return bread.name === item.name;
              // }
              if (!item.children)
                  return;
              if (item.children.length === 0)
                  return;
              for (var i = 0, child = void 0; child = item.children[i++];) {
                  if (child.name === this.actived) {
                      //sidebar.opened = item.name;
                      return true;
                  }
              }
              return false;
          },
          onInit: function (event) {
              var _this = this;
              menuService.menu.then(function (menu) {
                  _this.menu = menu;
              });
          },
          onReady: function (event) {
              beyond.initSidebar();
          }
      }
  });
    

});

;/*!services/routerService.ts*/
define('services/routerService.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  require("node_modules/mmRouter/dist/mmRouter");
  // import * as menuService from './menuService';
  function getPage(component) {
      var html = "<xmp is=\"" + component + "\" :widget=\"{id:'" + component.replace(/\-/g, '_') + "',expire:" + Date.now() + "}\"></xmp>";
      return html;
  }
  function applyRouteConfig(config, parentRoute, accPath) {
      if (accPath === void 0) { accPath = ''; }
      config.map(function (route) {
          var components = {};
          if (route.component) {
              components.currentPage = route.component;
          }
          if (route.components) {
              components = route.components;
          }
          avalon.router.add(accPath + route.path, function () {
              Object.keys(components).map(function (viewName) {
                  var component = components[viewName];
                  if (typeof component === 'function') {
                      component(function (m) {
                          avalon.vmodels[parentRoute.name][viewName] = getPage(m.name);
                      });
                  }
                  else {
                      avalon.vmodels[parentRoute.name][viewName] = getPage(component.name);
                  }
              });
          });
          // TODO 支持嵌套路由
          //route.children && applyRouteConfig(route.children, route, accPath + route.path);
      });
  }
  require('components/common-header/common-header.ts');
  require('components/common-sidebar/common-sidebar.ts');
  var routeConfig = [{
          path: '/',
          component: function (resolve) {
              require.async(['components/gf-dashboard/gf-dashboard.ts'], resolve);
          }
      }, {
          path: '/aaa',
          component: function (resolve) {
              require.async(['components/gf-aaa/gf-aaa.ts'], resolve);
          }
      }, {
          path: '/demo',
          component: function (resolve) {
              require.async(['components/gf-demo/gf-demo.ts'], resolve);
          }
      }, {
          path: '/demo-redux',
          component: function (resolve) {
              require.async(['components/gf-demo-redux/gf-demo-redux.ts'], resolve);
          }
      }, {
          path: '/demo-fast',
          component: function (resolve) {
              require.async(['components/gf-demo-fast/gf-demo-fast.ts'], resolve);
          }
      }, {
          path: '/doc-ms-table',
          component: function (resolve) {
              require.async(['components/doc-ms-table/doc-ms-table.ts'], resolve);
          }
      }, {
          path: '/doc-ms-form',
          component: function (resolve) {
              require.async(['components/doc-ms-form/doc-ms-form.ts'], resolve);
          }
      }];
  applyRouteConfig(routeConfig, {
      name: 'root'
  });
  // mmState全局配置
  // avalon.state.config({
  //     onError: function() {
  //         console.log('mmState配置出错：', arguments)
  //     },
  //     onLoad: function(fromStat, toState) {
  //         var breadCrumb = [], flagTree;
  //         var root = avalon.vmodels.root;
  //         menuService.walkMenu(toState.stateName, function (item, level) {
  //             breadCrumb.unshift(item);
  //         });
  //         if (breadCrumb.length) {
  //             flagTree = breadCrumb[breadCrumb.length-1]
  //             root.title = flagTree.title;
  //             avalon.vmodels.sidebar.actived = flagTree.name;
  //             avalon.mix(root, { breadCrumb: breadCrumb });
  //         }
  //     }
  // })
    

});

;/*!index.ts*/
define('index.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  /// <reference path="typings/index.d.ts" />
  "use strict";
  require("node_modules/es5-shim/es5-shim");
  require("node_modules/es6-promise/dist/es6-promise.auto");
  var jQuery = require("node_modules/jquery/dist/jquery");
  global.$ = global.jQuery = jQuery;
  require("node_modules/bootstrap/dist/js/bootstrap");
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
    

});

;/*!vendor/ane/components/ms-checkbox/index.ts*/
define('vendor/ane/components/ms-checkbox/index.ts', function(require, exports, module) {

  "use strict";
  require("vendor/ane/components/ms-checkbox/ms-checkbox.ts");
  require("vendor/ane/components/ms-checkbox/ms-checkbox-group.ts");
    

});
