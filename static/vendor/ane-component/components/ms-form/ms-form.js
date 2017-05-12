define('vendor/ane-component/components/ms-form/ms-form.ts', function(require, exports, module) {

  "use strict";
  var avalon = require("node_modules/avalon2/dist/avalon");
  /**
   * Form组件
   * @prop $from 表单数据管理类
   * @prop type 如果为 search，则只在表单项的值被用户手动修改时，才会加入到最后要提交的数据对象上，用于搜索表单
   * @prop horizontal 是否添加 form-horizontal 到 class
   * @prop inline 是否添加 form-inline 到 class
   *
   * @example
   * <ms-form>
   *   <ms-form-item :widget="{label: '标题'}">
         <ms-input :widget="{value: @title, col: 'title'}"></ms-input>
       </ms-form-item>
   * </ms-form>
   */
  avalon.component('ms-form', {
      template: "<form role=\"form\" :class=\"[(@horizontal ? 'form-horizontal' : ''), (@inline ? 'form-inline' : '')]\"><slot /></form>",
      defaults: {
          items: '',
          $form: null,
          type: '',
          horizontal: false,
          inline: false,
          onFormChange: function (meta) {
              if (this.$form) {
                  this.$form.setFieldsValue((_a = {},
                      _a[meta.name] = { value: meta.value },
                      _a));
              }
              var _a;
          },
          onInit: function (event) {
              event.target._ctype_ = 'ms-form';
              event.target._vm_ = this;
          },
          onReady: function (event) {
          }
      },
      soleSlot: 'items'
  });
  //# sourceMappingURL=/static/vendor/ane-component/components/ms-form/ms-form.js.map
  

});
