import * as avalon from 'avalon2';
import { findParentComponent } from '../../vendor/avx-component/avx-util';
import './ms-checkbox';

avalon.component('ms-checkbox-group', {
    template: __inline('./ms-checkbox-group.html'),
    defaults: {
        $formItem: null,
        value: [],
        col: '',
        key: '',
        disabled: false,
        options: [],
        onChange: avalon.noop,
        toggleOption(option) {
            const optionIndex = this.value.indexOf(option.value);
            if (optionIndex === -1 ) {
                this.value.push(option.value);
            } else {
                this.value.remove(option.value);
            }
            this.onChange(this.value.$model);
        },
        onInit(event) {
            this.$formItem = findParentComponent(this, 'ms-form-item');
            this.$watch('value', (v) => {
                this.$formItem.$fire('onFormChnage', {
                    name: this.col, value: v, key: this.key
                });
            });
        },
        onReady(event) {
            //vm.elHiddenInput = $(el).find('input:hidden');
        },
        onDispose(event) {
        }
    }
});