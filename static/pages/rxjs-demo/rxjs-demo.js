define('pages/rxjs-demo/rxjs-demo.ts', function(require, exports, module) {

  "use strict";
  require("node_modules/es5-shim/es5-shim");
  require("node_modules/es6-promise/dist/es6-promise.auto");
  require("node_modules/addeventlistener-with-dispatch/src/addeventlistener-with-dispatch");
  var avalon = require("node_modules/avalon2/dist/avalon");
  if (avalon.msie === 8) {
      Object.defineProperty = function (obj, property, meta) {
          obj[property] = meta.value;
      };
  }
  var Rx = require("node_modules/rx/dist/rx.all");
  avalon.define({
      $id: 'demo',
      text: 'Click Me',
      click: function (e) {
      }
  });
  // const button = document.getElementsByTagName('button')[0];
  // const source = Rx.Observable.fromEvent<MouseEvent>(button, 'click')
  //                             .map(e => (e.target as HTMLButtonElement).value)
  //                             .debounce(500);
  // const subscription = source.subscribeOnNext(value => console.log(`Input value: %${value}`));
  // const throttled = Rx.Observable.fromEvent(window, 'resize').throttle(250);
  // throttled.subscribeOnNext(e => {
  //     console.log(window.innerHeight, window.innerWidth);
  // });
  // setTimeout(() => {
  //     subscription.dispose();
  // }, 2000)
  // const source = Rx.Observable.interval(1000).bufferWithTime(3000).map(arr => arr.reduce((acc, x) => acc + x, 0));
  // const subscription = source.subscribe(
  //     x => console.log(`onNext: ${x}`),
  //     e => console.log(`onError: ${e}`),
  //     () => console.log('onCompleted'));
  var codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  function isKonamiCode(buffer) {
      console.log(buffer.toString());
      return codes.toString() === buffer.toString();
  }
  var keys = Rx.Observable.fromEvent(document, 'keyup')
      .map(function (e) { return e.keyCode; })
      .bufferWithCount(10, 1)
      .filter(isKonamiCode)
      .subscribeOnNext(function () { return console.log('KONAMI!'); });
  //# sourceMappingURL=/ms-bus/static/pages/rxjs-demo/rxjs-demo.js.map
  

});
