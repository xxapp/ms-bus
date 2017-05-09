import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../ane-util';

/**
 * 文本输入组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * 
 * @example
 * ``` html
 * <ms-input :widget="{value: @title1, col: 'title'}"></ms-input>
 * ```
 */
controlComponent.extend({
    displayName: 'ms-input',
    template: __inline('./ms-input.html'),
    defaults: {
        onInit: function (event) {
            emitToFormItem(this);
            this.$watch('value', v => {
                this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'changed'
                });
            });
        }
    }
});