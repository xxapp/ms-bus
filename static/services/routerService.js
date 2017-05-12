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
  //# sourceMappingURL=/static/services/routerService.js.map
  

});
