import * as avalon from 'avalon2';
import '../ms-trigger';
import './ms-select.css';

avalon.component('ms-select', {
    template: __inline('./ms-select.html'),
    defaults: {
        width: 0,
        value: '',
        options: [],
        displayValue: '',
        panelVmId: '',
        panelVisible: false,
        panelClass: 'bus-select-dropdown',
        panelTemplate: `<div style="overflow: auto">
                            <ul class="bus-select-dropdown-menu">
                                <li class="bus-select-dropdown-menu-item"
                                    :class="[(option.value === @selected ? 'bus-select-dropdown-menu-item-selected' : '')]"
                                    :for="option in @options" :click="handleOptionClick($event, option)">{{option.label}}</li>
                            </ul>
                        </div>`,
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
            this.panelVmId = this.$id + '_panel';
            avalon.define({
                $id: this.panelVmId,
                selected: '',
                options: this.options.$model,
                handleOptionClick(e, option) {
                    this.selected = self.value = option.value;
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