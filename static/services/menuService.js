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
  //# sourceMappingURL=/ms-bus/static/services/menuService.js.map
  

});
