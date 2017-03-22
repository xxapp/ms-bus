import * as avalon from 'avalon2';
import { findParentComponent } from '../../vendor/avx-component/avx-util';

/**
 * 文本输入组件
 * @prop value 组件值
 * @prop col 字段路径
 * @prop key 键值，只有当组件处于循环中需要用到
 * 
 * @example
 * ``` html
 * <ms-input :widget="{value: @title1, col: 'title'}"></ms-input>
 * ```
 */
avalon.component('ms-input', {
    template: __inline('./ms-input.html'),
    defaults: {
        $formItem: null,
        value: '',
        col: '',
        key: '',
        onInit: function (event) {
            this.$formItem = findParentComponent(this, 'ms-form-item');
            this.$watch('value', (v) => {
                this.$formItem.$fire('onFormChnage', {
                    name: this.col, value: v, key: this.key
                });
            });
        }
    }
});