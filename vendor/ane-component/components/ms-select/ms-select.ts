import * as avalon from 'avalon2';
import controlComponent from "../ms-form/ms-control";
import '../ms-trigger';
import './ms-select.css';

import { getChildTemplateDescriptor } from '../../ane-util';
import { emitToFormItem } from '../ms-form/utils';

controlComponent.extend({
    displayName: 'ms-select',
    template: __inline('./ms-select.html'),
    defaults: {
        width: 0,
        value: [],
        options: [],
        displayValue: '',
        panelVmId: '',
        panelVisible: false,
        panelClass: 'bus-select-dropdown',
        panelTemplate: __inline('./ms-select-panel.html'),
        handleClick(e) {
            this.width = e.target.offsetWidth;
            this.panelVisible = true;
        },
        withInBox(el) {
            return avalon.contains(this.$element, el);
        },
        getTarget() {
            return this.$element.children[0];
        },
        handlePanelHide() {
            this.panelVisible = false;
        },
        onInit(event) {
            var self = this;
            const descriptor = getChildTemplateDescriptor(this);
            this.options = getOptions(descriptor);
            
            emitToFormItem(this);
            this.$watch('value', v => {
                let value = v.$model || v || [''];
                this.handleChange({
                    target: { value: value[0] },
                    denyValidate: true,
                    type: 'select'
                });
            });

            this.panelVmId = this.$id + '_panel';
            avalon.define({
                $id: this.panelVmId,
                selected: '',
                options: this.options.$model,
                handleOptionClick(e, option) {
                    if (option.disabled) {
                        return false;
                    }
                    this.selected = option.value;
                    self.value.push(option.value);
                    self.handleChange({
                        target: { value: option.value },
                        type: 'select'
                    });
                    self.displayValue = option.label;
                    self.panelVisible = false;
                }
            });
        },
        onDispose() {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});

function getOptions(descriptor) {
    return descriptor.reduce((acc, option) => {
        if (option.is != 'ms-select-option') return acc;
        let label = option.inlineTemplate;
        acc.push({
            label: option.inlineTemplate || '',
            value: option.props.value || '',
            disabled: option.props.disabled || false
        });
        return acc;
    }, []);
}