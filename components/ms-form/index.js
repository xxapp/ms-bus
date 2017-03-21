var avalon = require('avalon2');
var avxUtil = require('/vendor/avx-component/avx-util');

/**
 * Form组件
 * @prop $from 表单数据管理类
 * 
 * @example
 * <ms-form>
 *   <ms-form-item :widget="{label: '标题'}">
       <ms-input :widget="{value: @title, col: 'title'}"></ms-input>
     </ms-form-item>
 * </ms-form>
 */
avalon.component('ms-form', {
    template: '<form role="form"><slot /></form>',
    defaults: {
        items: '',
        $form: null,
        onInit: function (event) {
            event.target._ctype_ = 'ms-form';
            event.target._vm_ = this;

            this.$watch('onFormChnage', function (v) {
                if (this.$form) {
                    var tempFields = {};
                    tempFields[v.name] = { value: v.value, key: v.key };
                    this.$form.setFieldsValue(tempFields);
                }
            });
        } 
    },
    soleSlot: 'items'
});