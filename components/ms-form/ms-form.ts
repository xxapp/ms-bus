import * as avalon from 'avalon2';
import { findParentComponent } from '../../vendor/avx-component/avx-util';

require('../../vendor/bootstrapValidator');		
require('../../vendor/bootstrapValidator/zh_CN');

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
        $rules: {},
        onInit(event) {
            event.target._ctype_ = 'ms-form';
            event.target._vm_ = this;

            this.$watch('onFormChnage', (v) => {
                if (this.$form) {
                    this.$form.setFieldsValue({
                        [v.name]: { value: v.value, key: v.key }
                    });
                }
            });
        },
        onReady(event) {
        }
    },
    soleSlot: 'items'
});