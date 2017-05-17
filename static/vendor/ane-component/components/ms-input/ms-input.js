define('vendor/ane-component/components/ms-input/ms-input.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane-component/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane-component/components/ms-form/utils.ts");
  /**
   * 文本输入组件
   * @prop value 组件值(inherit)
   * @prop col 字段路径(inherit)
   *
   * @example
   * ``` html
   * <ms-input :widget="{value: @title1, col: 'title'}"></ms-input>
   * ```
   */
  ms_control_1["default"].extend({
      displayName: 'ms-input',
      template: "\n<input type=\"text\" class=\"form-control \" \n    :duplex=\"@text\" \n    :attr=\"{name:@col,placeholder:@placeholder}\" \n    :rules=\"{required:true}\"\n    data-duplex-changed=\"@handleChange\">\n",
      defaults: {
          text: '',
          mapValueToText: function (value) {
              this.text = value;
          },
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.mapValueToText(v);
                  _this.handleChange({
                      target: { value: v },
                      denyValidate: true,
                      type: 'changed'
                  });
              });
              this.mapValueToText(this.value);
          }
      }
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane-component/components/ms-input/ms-input.js.map
  

});
