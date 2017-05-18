define('vendor/ane/components/ms-radio/ms-radio-group.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane/components/ms-form/utils.ts");
  require("vendor/ane/components/ms-radio/ms-radio.ts");
  ms_control_1["default"].extend({
      displayName: 'ms-radio-group',
      template: "\n<div class=\"checkbox-group \">\n    <ms-radio \n        :widget=\"{\n            checked:@selected,\n            value:option.value,\n            name:@helpId,\n            group:true,\n            onChange:function(){\n                @toggleOption(arguments[0], option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-radio>\n</div>\n",
      defaults: {
          value: '',
          disabled: false,
          options: [],
          selected: '',
          toggleOption: function (e, option) {
              this.selected = option.value;
              this.handleChange({
                  target: { value: this.selected },
                  type: 'radio-group'
              });
          },
          helpId: '',
          mapValueToSelected: function (value) {
              this.selected = value;
          },
          onInit: function (event) {
              var _this = this;
              this.helpId = this.$id;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToSelected(v);
                  _this.handleChange({
                      target: { value: v },
                      denyValidate: true,
                      type: 'radio-group'
                  });
              });
              this.mapValueToSelected(this.value);
          },
          onReady: function (event) {
          },
          onDispose: function (event) {
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-radio/ms-radio-group.js.map
  

});
