define('vendor/ane/components/ms-view/ms-view', function(require, exports, module) {

  "use strict";
  var avalon = require('node_modules/avalon2/dist/avalon');
  var states = {};
  avalon.component('ms-view', {
      template: '<div ms-html="@page" class="ms-view"></div>',
      defaults: {
          page: '&nbsp;',
          path: 'no',
          onReady: function (e) {
              var path = e.vmodel.path;
              var state = states[path];
              avalon.vmodels[state.vm.$id] = state.vm;
              setTimeout(function () {
                  e.vmodel.page = state.html;
              }, 100);
          },
          onDispose: function (e) {
              var path = e.vmodel.path;
              var state = states[path];
              var vm = state.vm;
              var render = vm.render;
              render && render.dispose();
              delete avalon.vmodels[vm.$id];
          }
      }
  });
  exports.add = function addState(path, html, vm) {
      states[path] = {
          vm: vm,
          html: html
      };
  };
  exports.resolve = function (path) {
      var state = states[path];
      state.html = typeof state.html == 'function' ? state.html() : state.html;
      state.vm = typeof state.vm == 'function' ? state.vm() : state.vm;
      return Promise.all([state.html, state.vm]).then(function (result) {
          state.html = result[0];
          state.vm = result[1];
      });
  };
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-view/ms-view.js.map
  

});
