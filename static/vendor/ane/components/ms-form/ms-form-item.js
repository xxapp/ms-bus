define('vendor/ane/components/ms-form/ms-form-item.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  var ane_util_1 = require("vendor/ane/ane-util.ts");
  /**
   * 表单项组件
   * @prop label 表单项标签
   *
   * @example
   * ``` html
   * <ms-form-item :widget="{label: '标题'}">
          <ms-input :widget="{value: @title, col: 'title'}"></ms-input>
      </ms-form-item>
   * ```
   */
  avalon.component('ms-form-item', {
      template: "\n<div class=\"form-group has-feedback \" :css=\"[@inline && @inlineFormGroupStyle]\" :class=\"[@className,(@hasRules && @dirty ? (@reasons.length ? 'has-error' : 'has-success') : '')] \">\n    <label class=\"control-label \" :if=\"@label.length\">{{@label}}</label>\n    <slot />\n    <i class=\"form-control-feedback \" :if=\"@hasRules\" :class=\"[(@dirty ? 'glyphicon' : ''), (@reasons.length ? 'glyphicon-remove' : 'glyphicon-ok')] \" :visible=\"@dirty\"></i>\n    <small class=\"help-block \" :css=\"[@inline && @inlineMessageStyle]\" :if=\"@hasRules && @reasons.length\">{{@reasons.length ? @reasons[0].message : ''}}</small>\n</div>\n",
      defaults: {
          $formVm: null,
          label: '',
          control: '',
          inline: false,
          dirty: false,
          reasons: [],
          hasRules: false,
          className: '',
          inlineFormGroupStyle: { verticalAlign: 'top' },
          inlineMessageStyle: { marginBottom: 0 },
          onFieldChange: function (descriptor) {
              var _this = this;
              this.$formVm.type !== 'search' && this.$formVm.$form.setFieldsValue((_a = {},
                  _a[descriptor.name] = { value: descriptor.value, denyValidate: descriptor.denyValidate },
                  _a));
              if (!descriptor.rules)
                  return;
              this.hasRules = true;
              this.$formVm.$form.addFields((_b = {},
                  _b[descriptor.name] = { rules: descriptor.rules },
                  _b));
              this.$formVm.$form.on('error' + descriptor.name, function (reasons) {
                  _this.dirty = true;
                  _this.reasons = reasons;
              });
              this.$formVm.$form.on('reset', function (fields) {
                  if (~Object.keys(fields).indexOf(descriptor.name)) {
                      _this.dirty = false;
                      _this.reasons = [];
                  }
              });
              var _a, _b;
          },
          onFormChange: function (meta) {
              if (this.$formVm.$form.autoAsyncChange) {
                  this.dirty = true;
              }
              this.$formVm.onFormChange(meta);
          },
          onInit: function (event) {
              event.target._ctype_ = 'ms-form-item';
              event.target._vm_ = this;
              this.$formVm = ane_util_1.findParentComponent(this, 'ms-form');
              if (this.$formVm === null) {
                  throw 'ms-form-item 必须放在 ms-form 内';
              }
              this.inline = this.$formVm.inline;
          },
          onReady: function (event) {
          }
      },
      soleSlot: 'control'
  });
  //# sourceMappingURL=/ms-bus/static/vendor/ane/components/ms-form/ms-form-item.js.map
  

});
