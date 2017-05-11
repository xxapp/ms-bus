import * as avalon from 'avalon2';
import '../ms-trigger';
import './ms-select.css';

avalon.component('ms-select', {
    template: __inline('./ms-select.html'),
    defaults: {
        width: 0,
        value: '',
        panelVmId: '',
        panelVisible: false,
        panelClass: 'bus-select-dropdown',
        panelTemplate: `<ul class="bus-select-dropdown-menu">
                            <li class="bus-select-dropdown-menu-item"
                                :class="[(option === @selected ? 'bus-select-dropdown-menu-item-selected' : '')]"
                                :for="option in @options" :click="handleOptionClick($event, option)">{{option}}</li>
                        </ul>`,
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
                options: ['1', '2', '3', '4'],
                handleOptionClick(e, option) {
                    this.selected = option;
                    self.value = option;
                    self.panelVisible = false;
                }
            });
        },
        onDispose() {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});