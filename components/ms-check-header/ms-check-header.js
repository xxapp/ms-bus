var avalon = require('avalon');
var cEvent = require('../../events/componentEvent');

avalon.component('ms:checkHeader', {
    $template: '<th><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="isAllChecked" ms-change="toggleCheckd()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm, el) {
        vm.toggleCheckd = function () {
            if (this.checked) {
                cEvent.emit('checkHeader', {
                    type: 'checked',
                    key: vm.col
                });
            } else {
                cEvent.emit('checkHeader', {
                    type: 'unchecked',
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