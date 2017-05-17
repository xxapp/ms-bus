import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../ane-util';
import './ms-radio';

controlComponent.extend({
    displayName: 'ms-radio-group',
    template: __inline('./ms-radio-group.html'),
    defaults: {
        value: '',
        disabled: false,
        options: [],
        selected: '',
        toggleOption(e, option) {
            this.selected = option.value;
            this.handleChange({
                target: { value: this.selected },
                type: 'radio-group'
            });
        },
        helpId: '',
        mapValueToSelected(value) {
            this.selected = value;
        },
        onInit(event) {
            this.helpId = this.$id;
            emitToFormItem(this);
            this.$watch('value', v => {
                this.mapValueToSelected(v);
                this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'radio-group'
                });
            });
            this.mapValueToSelected(this.value);
        },
        onReady(event) {
        },
        onDispose(event) {
        }
    }
});