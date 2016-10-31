var avalon = require('avalon');

avalon.component('ms:checkHeader', {
    $template: '<th><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="isAllChecked" ms-change="toggleCheckd()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm, el) {
        vm.toggleCheckd = function () {
            avalon.fireDom(el, 'abc', { data: vm.col, checked: this.checked });
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