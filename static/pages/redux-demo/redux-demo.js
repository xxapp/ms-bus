define('pages/redux-demo/redux-demo.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  /// <reference path="../../typings/index.d.ts" />
  "use strict";
  var redux_1 = require("node_modules/redux/dist/redux");
  var avalon = require("node_modules/avalon2/dist/avalon");
  var jQuery = require("node_modules/jquery/dist/jquery");
  global.$ = global.jQuery = jQuery;
  '';
  require("node_modules/bootstrap/dist/js/bootstrap");
  var ane_1 = require("vendor/ane-component/index.ts");
  function counter(state, action) {
      if (state === void 0) { state = 0; }
      switch (action.type) {
          case 'INCREMENT':
              return state + 1;
          case 'DECREMENT':
              return state - 1;
          default:
              return state;
      }
  }
  var store = redux_1.createStore(counter, global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__());
  function render() {
      vm.value = store.getState();
  }
  store.subscribe(render);
  var vm = avalon.define({
      $id: 'demo',
      value: 0,
      title: 'hello',
      show: false,
      $form: ane_1.createForm({
          onFieldsChange: function (fields) {
              console.log(fields);
              console.log(this.record);
          }
      }),
      increment: function () {
          store.dispatch({ type: 'INCREMENT' });
      },
      decrement: function () {
          store.dispatch({ type: 'DECREMENT' });
      },
      incrementIfOdd: function () {
          if (store.getState() % 2 !== 0) {
              store.dispatch({ type: 'INCREMENT' });
          }
      },
      incrementAsync: function () {
          setTimeout(function () {
              store.dispatch({ type: 'INCREMENT' });
          }, 1000);
      }
  });
  //# sourceMappingURL=/static/pages/redux-demo/redux-demo.js.map
  

});
