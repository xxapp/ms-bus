var avalon = require('avalon');

avalon.component('ms:checkHeader', {
    $template: '<th><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="checked" ms-change="toggleCheckd()" ms-click="checkboxClick"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm) {
        var containerVm = avalon.vmodels[vm.containerVmId];
        if (!containerVm) { avalon.log('check-eader找不到父组件') }
        vm.toggleCheckd = function () {
            if (this.checked) {
                avalon.each(containerVm.list, function(i, v){
                    containerVm.checked.ensure(String(v[vm.col]));
                });
            } else {
                containerVm.checked.clear();
            }
        }
        vm.checkboxClick = function () {
            this.blur();
            this.focus();
        }

        containerVm.$watch('checked.length', function (newV) {
            if (newV == containerVm.list.size()) {
                vm.checked = true;
            } else {
                vm.checked = false;
            }
        });
    },
    col: 'id',
    checked: false,
    containerVmId: '',
    $containerVmId: '',
    toggleCheckd: avalon.noop,
    checkboxClick: avalon.noop
});