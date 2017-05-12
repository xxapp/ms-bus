define('vendor/ane-component/components/ms-radio/ms-radio.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_util_1 = require("vendor/ane-component/ane-util.ts");
  if (avalon.msie <= 8) {
      var doc = document;
      var head = doc.getElementsByTagName('head')[0];
      var style = doc.createElement('style');
      var cssStr = "\n        .radio-inner-ie input {\n            left: 0;\n            position: static !important;\n            margin-left: 0 !important;\n            margin-top: 6px !important;\n        }\n        .radio-inner-ie span {\n            display: none !important;\n        }\n    ";
      style.setAttribute('type', 'text/css');
      if (style.styleSheet) {
          style.styleSheet.cssText = cssStr;
      }
      else {
          style.appendChild(doc.createTextNode(cssStr));
      }
      head.appendChild(style);
  }
  avalon.component('ms-radio', {
      soleSlot: 'label',
      template: "\n<div :class=\"@wrapper \" class=\"radio-wrapper_vkaeg_2 \" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"radio-inner_vkaeg_5 radio-inner-ie \">\n        <input type=\"radio\"\n            :attr=\"{id:@helpId,disabled:@disabled,value:@value,name:@name}\"\n            :duplex=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text \"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>\n",
      defaults: {
          wrapper: 'radio',
          label: '',
          checked: '',
          value: '',
          name: '',
          group: false,
          disabled: false,
          onChange: function (e) {
              this.onChange(e);
          },
          helpId: '',
          onInit: function (event) {
              this.helpId = this.$id;
          },
          onReady: function (event) {
              ane_util_1.parseSlotToVModel(this);
          },
          onDispose: function (vm, el) {
          }
      }
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-radio/ms-radio.js.map
  

});
