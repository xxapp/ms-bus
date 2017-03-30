import * as avalon from 'avalon2';
import { findParentComponent } from '../../vendor/avx-component/avx-util';

/**
 * 多行文本输入组件
 * @prop label 文本框前的label标签内容
 * @prop col 指定name属性值
 * @prop rows 文本框行数
 * 
 * @example
 * ``` html
 * <ms:control-textarea label="标题1" col="name" ms-cduplex="record.name"></ms:control-textarea>
 * ```
 */
avalon.component('ms-textarea', {
    template: __inline('./ms-textarea.html'),
    defaults: {
        $formItem: null,
        value: '',
        col: '',
        key: '',
        rows: '',
        onInit(event) {
            this.$formItem = findParentComponent(this, 'ms-form-item');
            this.$watch('value', (v) => {
                this.$formItem.$fire('onFormChnage', {
                    name: this.col, value: v, key: this.key
                });
            });
        }
    }
});