import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../vendor/avx-component/avx-util';

/**
 * 多行文本输入组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * @prop key 键值，只有当组件处于循环中需要用到(inherit)
 * @prop rows 文本框行数
 * 
 * @example
 * ``` html
 * <ms-textarea :widget="{value: @bio, col: 'bio', rows: 3}"></ms-textarea>
 * ```
 */
controlComponent.extend({
    displayName: 'ms-textarea',
    template: __inline('./ms-textarea.html'),
    defaults: {
        rows: '',
        onInit(event) {
            emitToFormItem(this);
        }
    }
});