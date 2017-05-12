define('vendor/ane-component/components/ms-checkbox/ms-checkbox.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_util_1 = require("vendor/ane-component/ane-util.ts");
  if (avalon.msie <= 8) {
      var doc = document;
      var head = doc.getElementsByTagName('head')[0];
      var style = doc.createElement('style');
      var cssStr = "\n        .checkbox-inner-ie input {\n            left: 0;\n            position: static !important;\n            margin-left: 0 !important;\n            margin-top: 6px !important;\n        }\n        .checkbox-inner-ie span {\n            display: none !important;\n        }\n    ";
      style.setAttribute('type', 'text/css');
      if (style.styleSheet) {
          style.styleSheet.cssText = cssStr;
      }
      else {
          style.appendChild(doc.createTextNode(cssStr));
      }
      head.appendChild(style);
  }
  avalon.component('ms-checkbox', {
      soleSlot: 'label',
      template: "\n<div :class=\"@wrapper \" class=\"checkbox-wrapper_nvmxj_2 \" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"checkbox-inner_nvmxj_5 checkbox-inner-ie \">\n        <input type=\"checkbox\"\n            :attr=\"{id:@helpId,disabled:@disabled}\"\n            :duplex-checked=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text \"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>\n",
      defaults: {
          wrapper: 'checkbox',
          label: '',
          checked: false,
          group: false,
          disabled: false,
          onChange: avalon.noop,
          flush: avalon.noop,
          helpId: '',
          onInit: function (event) {
              this.helpId = this.$id;
              // // inline在IE8下显示有问题，待解决
              // if (this.inline != void 0) {
              //     this.wrapper = 'checkbox-inline';
              // }
          },
          onReady: function (event) {
              ane_util_1.parseSlotToVModel(this);
          },
          onDispose: function (vm, el) {
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-checkbox/ms-checkbox.js.map
  

});
