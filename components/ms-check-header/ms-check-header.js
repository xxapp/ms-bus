var avalon = require('avalon');
var cEvent = require('../../events/componentEvent');

avalon.component('ms:checkHeader', {
    $template: '<th><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="isAllChecked" ms-change="toggleCheckd()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        avalon.vmodels[$(el).attr('parent-vm-id')].$refs[vm.$id] = vm;
        vm.toggleCheckd = function () {
            if (this.checked) {
                cEvent.emit('checkHeader', {
                    type: 'checked',
                    id: vm.$id,
                    key: vm.col
                });
            } else {
                cEvent.emit('checkHeader', {
                    type: 'unchecked',
                    id: vm.$id,
                    key: vm.col
                });
            }
        }
        vm.checkboxClick = function () {
            this.blur();
            this.focus();
        }
    },
    col: 'id',
    toggleCheckd: avalon.noop,
    checkboxClick: avalon.noop
});