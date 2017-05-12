define('vendor/ane-component/components/ms-checkbox/ms-checkbox-group.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane-component/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane-component/components/ms-form/utils.ts");
  require("vendor/ane-component/components/ms-checkbox/ms-checkbox.ts");
  ms_control_1["default"].extend({
      displayName: 'ms-checkbox-group',
      template: "\n<div class=\"checkbox-group \">\n    <ms-checkbox \n        :widget=\"{\n            checked:@value.indexOf(option.value)!=-1,\n            group:true,\n            onChange:function(){\n                @toggleOption(option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-checkbox>\n</div>\n",
      defaults: {
          value: [],
          disabled: false,
          options: [],
          toggleOption: function (option) {
              var optionIndex = this.value.indexOf(option.value);
              if (optionIndex === -1) {
                  this.value.push(option.value);
              }
              else {
                  this.value.remove(option.value);
              }
              this.handleChange({
                  target: { value: this.value.$model || this.value },
                  type: 'checkbox-group'
              });
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.handleChange({
                      target: { value: v.$model || v },
                      denyValidate: true,
                      type: 'checkbox-group'
                  });
              });
          },
          onReady: function (event) {
              //vm.elHiddenInput = $(el).find('input:hidden');
          },
          onDispose: function (event) {
          }
      }
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-checkbox/ms-checkbox-group.js.map
  

});
