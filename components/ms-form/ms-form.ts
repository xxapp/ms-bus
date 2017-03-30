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
            $(event.target).bootstrapValidator(
                {
                    excluded: [':hidden'],
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'		
                    },
                    submitHandler(validator, form, submitButton) {
                        // Do nothing		
                    },
                    ...this.$rules
                }
            ).on('success.field.bv', (e, data) => {
                if (data.bv.getInvalidFields().length > 0) {
                    this.valid = false;
                } else {
                    this.valid = true;
                }
            }).on('error.field.bv', (e, data) => {
                if (data.bv.getInvalidFields().length > 0) {
                    this.valid = false;
                } else {
                    this.valid = true;
                }
            });
            for (var i in this.domEvents) {
                if (this.domEvents.hasOwnProperty(i) && typeof this.domEvents[i] === 'function') {
                    this.$form.on(i, this.domEvents[i])
                }
            }
        }
    },
    soleSlot: 'items'
});