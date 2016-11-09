var avalon = require('avalon');
var cEvent = require('../../events/componentEvent');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:checkHeader', {
    $template: '<th ms-if="show"><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="isAllChecked" ms-change="toggleCheckd()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
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
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    col: 'id',
    toggleCheckd: avalon.noop,
    checkboxClick: avalon.noop
});