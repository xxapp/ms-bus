define('vendor/ane-component/components/ms-textarea/ms-textarea.ts', function(require, exports, module) {

  "use strict";
  var ms_control_1 = require("vendor/ane-component/components/ms-form/ms-control.ts");
  var utils_1 = require("vendor/ane-component/components/ms-form/utils.ts");
  /**
   * 多行文本输入组件
   * @prop value 组件值(inherit)
   * @prop col 字段路径(inherit)
   * @prop rows 文本框行数
   *
   * @example
   * ``` html
   * <ms-textarea :widget="{value: @bio, col: 'bio', rows: 3}"></ms-textarea>
   * ```
   */
  ms_control_1["default"].extend({
      displayName: 'ms-textarea',
      template: "\n<textarea class=\"form-control \" \n    :duplex=\"@value\" \n    :attr=\"{rows:@rows,name:@col}\"\n    data-duplex-changed=\"@handleChange\"></textarea>\n",
      defaults: {
          rows: '',
          onInit: function (event) {
              var _this = this;
              utils_1.emitToFormItem(this);
              this.$watch('value', function (v) {
                  _this.handleChange({
                      target: { value: v },
                      denyValidate: true,
                      type: 'changed'
                  });
              });
          }
      }
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-textarea/ms-textarea.js.map
  

});
