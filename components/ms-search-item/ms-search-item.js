var avalon = require('avalon');

avalon.component('ms:searchItem', {
    $template: __inline('./ms-search-item.html'),
    $replace: 1,
    $init: function (vm) {
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