import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../ane-util';

/**
 * 多行文本输入组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
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
        text: '',
        mapValueToText(value) {
            this.text = value;
        },
        onInit(event) {
            emitToFormItem(this);
            this.$watch('value', v => {
                this.mapValueToText(v);
                this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'changed'
                });
            });
            this.mapValueToText(this.value);
        }
    }
});