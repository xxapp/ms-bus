define('vendor/ane/components/ms-loading/ms-loading-directive.ts', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  '';
  /**
   * loading 指令
   *
   * @example
   * ``` html
   * <table :loading="true">...</table>
   * ```
   */
  avalon.directive('loading', {
      init: function () {
          this.instance = null;
          this.oldPositionStyle = '';
      },
      update: function (vdom, value) {
          var _this = this;
          if (value) {
              if (this.instance === null) {
                  var t_1 = setInterval(function () {
                      var dom = vdom.dom;
                      var computedStyle = global.getComputedStyle ? global.getComputedStyle(dom) : dom.currentStyle;
                      var width = dom.offsetWidth, height = dom.offsetHeight, className = dom.className;
                      var borderLeftWidth = computedStyle.borderLeftWidth, borderTopWidth = computedStyle.borderTopWidth, display = computedStyle.display;
                      _this.oldPositionStyle = dom.style.position;
                      // 如果元素是隐藏的，什么都不做
                      if (display === 'none') {
                          clearInterval(t_1);
                      }
                      // 如果宽度和高度都不为0，则添加loading遮罩
                      if (width !== 0 && height !== 0) {
                          clearInterval(t_1);
                      }
                      else {
                          return;
                      }
                      var maskElement = global.document.createElement('div');
                      maskElement.className = 'bus-loading-mask';
                      maskElement.innerText = '加载中...';
                      maskElement.style.left = 0 - (borderLeftWidth === 'medium' ? 0 : parseFloat(borderLeftWidth)) + 'px';
                      maskElement.style.top = 0 - (borderTopWidth === 'medium' ? 0 : parseFloat(borderTopWidth)) + 'px';
                      maskElement.style.width = width + 'px';
                      maskElement.style.height = height + 'px';
                      maskElement.style.lineHeight = height + 'px';
                      dom.style.position = 'relative';
                      if (!~(" " + className + " ").indexOf(' masked ')) {
                          dom.className += ' masked';
                      }
                      dom.appendChild(maskElement);
                      _this.instance = maskElement;
                      console.log('mask初始化完成');
                  }, 100);
              }
              else {
                  var dom = vdom.dom;
                  var maskElement = this.instance;
                  var className = dom.className;
                  this.oldPositionStyle = dom.style.position;
                  maskElement.style.display = 'block';
                  dom.style.position = 'relative';
                  if (!~(" " + className + " ").indexOf(' masked ')) {
                      dom.className = className + ' masked';
                  }
              }
          }
          else {
              setTimeout(function () {
                  if (_this.instance !== null) {
                      var dom = vdom.dom;
                      var maskElement = _this.instance;
                      var className = dom.className;
                      maskElement.style.display = 'none';
                      if (_this.oldPositionStyle) {
                          dom.style.position = _this.oldPositionStyle;
                      }
                      dom.className = (" " + className + " ").replace(/\s*masked\s*/, ' ');
                  }
              }, 100);
          }
      },
      beforeDispose: function () {
          var dom = this.node.dom;
          this.instance !== null && dom.removeChild(this.instance);
      }
  });
  /**
   * 全局 loading 方法
   *
   * @example
   * ``` js
   * import { Loading } from './components/ms-loading';
   * Loading.show();
   * setTimeout(() => {
   *   Loading.hide();
   * }, 5000)
   * ```
   */
  var loadingDirective = avalon.directives['loading'];
  var globalLoadingContext = {
      node: { dom: document.body }
  };
  exports.Loading = {
      show: function () {
          if (globalLoadingContext.instance === undefined) {
              loadingDirective.init.call(globalLoadingContext);
              avalon.ready(function () {
                  loadingDirective.update.call(globalLoadingContext, {
                      dom: globalLoadingContext.node.dom
                  }, true);
              });
          }
          else {
              loadingDirective.update.call(globalLoadingContext, {
                  dom: globalLoadingContext.node.dom
              }, true);
          }
      },
      hide: function () {
          if (globalLoadingContext.instance !== undefined) {
              loadingDirective.update.call(globalLoadingContext, {
                  dom: globalLoadingContext.node.dom
              }, false);
          }
      }
  };
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-loading/ms-loading-directive.js.map
  

});
