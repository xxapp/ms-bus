var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:pagination', {
    $template: __inline('./ms-pagination.html'),
    $replace: 1,
    $dynamicProp: [
        { type: 'Number', name: 'total' },
        { type: 'Number', name: 'page-size' },
        { type: 'Number', name: 'current-page' },
        { type: 'Function', name: 'current-change' }
    ],
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);

        vm.prevPage = function () {
            if (vm.currentPage > 1) {
                vm.currentChange(--vm.currentPage);
            }
        }
        vm.nextPage = function () {
            if (vm.currentPage < Math.ceil(vm.total/vm.pageSize)) {
                vm.currentChange(++vm.currentPage);
            }
        }
    },
    $ready: function (vm) {
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    currentPage: 1,
    pageSize: 10,
    prevPage: avalon.noop,
    nextPage: avalon.noop
});