define('vendor/ane-component/components/ms-checkbox/ms-checkbox-group.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane-component/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane-component/components/ms-form/utils.ts");
  require("vendor/ane-component/components/ms-checkbox/ms-checkbox.ts");
  ms_control_1["default"].extend({
      displayName: 'ms-checkbox-group',
      template: "\n<div class=\"checkbox-group \">\n    <ms-checkbox \n        :widget=\"{\n            checked:@selection.indexOf(option.value)!=-1,\n            group:true,\n            onChange:function(){\n                @toggleOption(option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-checkbox>\n</div>\n",
      defaults: {
          value: [],
          disabled: false,
          options: [],
          selection: [],
          toggleOption: function (option) {
              var optionIndex = this.selection.indexOf(option.value);
              if (optionIndex === -1) {
                  this.selection.push(option.value);
              }
              else {
                  this.selection.remove(option.value);
              }
              this.handleChange({
                  target: { value: this.selection.toJSON() },
                  type: 'checkbox-group'
              });
          },
          mapValueToSelection: function (value) {
              this.selection = this.options.filter(function (o) { return value.contains(o.value); }).map(function (o) { return o.value; });
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToSelection(v);
                  _this.handleChange({
                      target: { value: v.toJSON() },
                      denyValidate: true,
                      type: 'checkbox-group'
                  });
              });
              this.mapValueToSelection(this.value);
          },
          onReady: function (event) {
              //vm.elHiddenInput = $(el).find('input:hidden');
          },
          onDispose: function (event) {
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-checkbox/ms-checkbox-group.js.map
  

});
