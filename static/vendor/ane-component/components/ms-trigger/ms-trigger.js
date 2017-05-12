define('vendor/ane-component/components/ms-trigger/ms-trigger.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var domAlign = require("node_modules/dom-align/lib/index");
  avalon.component('ms-trigger', {
      template: '<span style="display:none;"></span>',
      defaults: {
          width: 0,
          visible: false,
          innerVmId: '',
          innerClass: '',
          innerTemplate: '',
          withInBox: function () { return true; },
          getTarget: avalon.noop,
          onHide: avalon.noop,
          hide: function (panel) {
              panel.style.top = '-9999px';
              panel.style.left = '-9999px';
              this.onHide();
          },
          onInit: function (event) {
              var _this = this;
              var DOC = document, body = DOC.body;
              var medium = DOC.createElement('div');
              var panel = DOC.createElement('div');
              medium.setAttribute('id', this.$id);
              medium.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 100%;');
              panel.setAttribute('class', this.innerClass);
              panel.setAttribute(':important', this.innerVmId);
              panel.innerHTML = this.innerTemplate;
              medium.appendChild(panel);
              body.appendChild(medium);
              avalon.scan(panel, avalon.vmodels[this.innerVmId]);
              avalon.bind(body, 'click', function (e) {
                  if (_this.visible && panel !== e.target && !avalon.contains(panel, e.target) && !_this.withInBox(e.target)) {
                      _this.hide(panel);
                  }
              });
              this.$watch('visible', function (v) {
                  if (v) {
                      panel.style.width = _this.width + 'px';
                      panel.scrollTop = 0;
                      domAlign(panel, _this.getTarget(), {
                          points: ['tl', 'bl'],
                          offset: [0, 1],
                          //targetOffset: ['0%','100%']
                          overflow: {
                              adjustY: true
                          }
                      });
                  }
                  else {
                      _this.hide(panel);
                  }
              });
          },
          onDispose: function (event) {
              var DOC = document, body = DOC.body;
              var medium = DOC.getElementById(this.$id);
              body.removeChild(medium);
          }
      }
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-trigger/ms-trigger.js.map
  

});
