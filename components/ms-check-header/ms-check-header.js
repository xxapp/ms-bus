var avalon = require('avalon');
var cEvent = require('/events/componentEvent');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:checkHeader', {
    //$template: '<th><ms:checkbox duplex-checked="isAllChecked" change="toggleChecked"></ms:checkbox></th>',
    $template: '<th ms-if="show"><div class="checkbox" style="margin-top: 0; margin-bottom: 0;"><label><input type="checkbox" ms-duplex-checked="isAllChecked" ms-change="toggleChecked()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        vm.toggleChecked = function () {
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
    $ready: function (vm, el) {
        if (~window.navigator.userAgent.indexOf('MSIE 8.0')) {
            // 在IE8下降级为原生的checkbox
            var checkbox = el.children[0].children[0], mockCheckbox = el.children[0].children[1];
            checkbox.style.left = 0;
            checkbox.style.position = 'static';
            checkbox.style.marginLeft = '0';
            checkbox.style.marginTop = '6px';

            mockCheckbox.style.display = 'none';
        }
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    col: 'id',
    toggleChecked: avalon.noop,
    checkboxClick: avalon.noop
});