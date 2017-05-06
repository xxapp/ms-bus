import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../vendor/avx-component/avx-util';
import './ms-radio';

controlComponent.extend({
    displayName: 'ms-radio-group',
    template: __inline('./ms-radio-group.html'),
    defaults: {
        value: '',
        disabled: false,
        options: [],
        toggleOption(e, option) {
            this.value = option.value;
            this.handleChange({
                target: { value: this.value.$model || this.value },
                type: 'radio-group'
            });
        },
        helpId: '',
        onInit(event) {
            this.helpId = this.$id;
            emitToFormItem(this);
        },
        onReady(event) {
        },
        onDispose(event) {
        }
    }
});