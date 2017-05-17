import * as avalon from 'avalon2';
import controlComponent from '../ms-form/ms-control';
import { emitToFormItem } from '../ms-form/utils';
import { findParentComponent } from '../../ane-util';
import './ms-checkbox';

controlComponent.extend({
    displayName: 'ms-checkbox-group',
    template: __inline('./ms-checkbox-group.html'),
    defaults: {
        value: [],
        disabled: false,
        options: [],
        selection: [],
        toggleOption(option) {
            const optionIndex = this.selection.indexOf(option.value);
            if (optionIndex === -1 ) {
                this.selection.push(option.value);
            } else {
                this.selection.remove(option.value);
            }
            this.handleChange({
                target: { value: this.selection.toJSON() },
                type: 'checkbox-group'
            });
        },
        mapValueToSelection(value) {
            this.selection = this.options.filter(o => value.contains(o.value)).map(o => o.value);
        },
        onInit(event) {
            emitToFormItem(this);
            this.$watch('value', v => {
                this.mapValueToSelection(v);
                this.handleChange({
                    target: { value: v.toJSON() },
                    denyValidate: true,
                    type: 'checkbox-group'
                });
            });
            this.mapValueToSelection(this.value);
        },
        onReady(event) {
            //vm.elHiddenInput = $(el).find('input:hidden');
        },
        onDispose(event) {
        }
    }
});