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
        showSearch: false,
        searchValue: '',
        panelVmId: '',
        panelVisible: false,
        panelClass: 'bus-select-dropdown',
        panelTemplate: __inline('./ms-select-panel.html'),
        handleClick(e) {
            this.searchValue = '';
            this.width = this.$element.offsetWidth;
            this.panelVisible = true;
            this.$element.children[1].focus();
        },
        withInBox(el) {
            return this.$element === el || avalon.contains(this.$element, el);
        },
        getTarget() {
            return this.$element;
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
            const innerVm = avalon.define({
                $id: this.panelVmId,
                selected: '',
                options: this.options.toJSON(),
                searchValue: '',
                getFilteredOptions() {
                    return this.options.filter(this.filterFn);
                },
                filterFn: (el) => {
                    const reg = new RegExp(avalon.escapeRegExp(this.searchValue), 'i');
                    return reg.test(el.label) || reg.test(el.value);
                },
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
            this.$watch('searchValue', v => {
                innerVm.searchValue = v;
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