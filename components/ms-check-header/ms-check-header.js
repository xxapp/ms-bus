var avalon = require('avalon');
var componentStore = require('../../stores/componentStore');

avalon.component('ms:checkHeader', {
    $template: '<th><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="isAllChecked" ms-change="toggleCheckd()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm, el) {
        vm.toggleCheckd = function () {
            //avalon.fireDom(el, 'datasetchanged', { data: vm.col, checked: this.checked });
            componentStore.dispatch({
                type: 'checkHeader',
                checked: this.checked,
                key: vm.col
            });
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