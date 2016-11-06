var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:searchItem', {
    $template: __inline('./ms-search-item.html'),
    $replace: 1,
    $init: function (vm, el) {
        avxUtil.pickToRefs(vm, el);
        vm.$watch('val', function (newV) {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            containerVm.$dirtyQuery[vm.col] = newV;
        });
    },
    label: '',
    val: '',
    col: '',
    $containerVmId: ''
});