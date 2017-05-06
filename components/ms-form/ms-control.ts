import * as avalon from 'avalon2';
import { findParentComponent } from '../../vendor/avx-component/avx-util';

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
export default avalon.component('ms-control', {
    template: '&nbsp;',
    defaults: {
        $formItem: null,
        $rules: null,
        value: '',
        col: '',
        placeholder: '',
        onChange: avalon.noop,
        emitValue(e) {
            let v = e.target.value;
            this.$formItem.onFormChange({
                name: this.col, value: v
            });
        },
        handleChange(e) {
            this.emitValue(e);
            this.onChange(e);
        }
    }
});