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
  //# sourceMappingURL=/static/components/common-sidebar/common-sidebar.js.map
  

});
