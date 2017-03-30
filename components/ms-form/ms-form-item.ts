import * as avalon from 'avalon2';
import { findParentComponent } from '../../vendor/avx-component/avx-util';

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
        onInit(event) {
            event.target._ctype_ = 'ms-form-item';
            event.target._vm_ = this;
            this.$form = findParentComponent(this, 'ms-form');

            this.$watch('onFormChnage', (v) => {
                this.$form.$fire('onFormChnage', v);
            });
        }
    },
    soleSlot: 'control'
});