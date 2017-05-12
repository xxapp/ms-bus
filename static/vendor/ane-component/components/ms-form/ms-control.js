define('vendor/ane-component/components/ms-form/ms-control.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  exports.__esModule = true;
  /**
   * 表单控制组件，只能从此继承，不能呢实例此组件
   * @prop value 组件值
   * @prop col 字段路径
   *
   * @example
   * ``` js
   * import controlComponent from '../ms-from/ms-control';
   * controlComponent.extend({
   *      displayName: 'ms-input',
   *      template: '../ms-input.html',
   *      defaults: {...}
   * })
   * ```
   */
  exports["default"] = avalon.component('ms-control', {
      template: '&nbsp;',
      defaults: {
          $formItem: null,
          $rules: null,
          value: '',
          col: '',
          placeholder: '',
          onChange: avalon.noop,
          emitValue: function (e) {
              var v = e.target.value;
              this.$formItem && this.$formItem.onFormChange({
                  name: this.col, value: v, denyValidate: e.denyValidate
              });
          },
          handleChange: function (e) {
              this.emitValue(e);
              this.onChange(e);
          }
      }
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-form/ms-control.js.map
  

});
