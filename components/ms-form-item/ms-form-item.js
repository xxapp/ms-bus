var avalon = require('avalon2');
var util = require('/vendor/avx-component/avx-util');

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
    template: __inline('./ms-form-item.html'),
    defaults: {
        $form: null,
        label: '',
        control: '',
        onInit: function (event) {
            event.target._ctype_ = 'ms-form-item';
            event.target._vm_ = this;
            this.$form = util.findParentComponent(this, 'ms-form');

            this.$watch('onFormChnage', function (v) {
                console.log(v);

                this.$form.$fire('onFormChnage', v);
            });
        }
    },
    soleSlot: 'control'
});