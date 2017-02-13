var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

/**
 * 分页组件
 * @prop {Number} [current-page=1] 当前页
 * @prop {Number} [page-size=10] 每页的数据量
 * @prop {Number} total 数据总量
 * @event {Function} current-change 当页数改变时触发，参数currentPage
 * 
 * @example
 * ```
 * <ms:pagination
 *     total="100"
 *     ms-cprop-current-change="pageChange">
 * </ms:pagination>
 * 
 * <ms:pagination
 *     ms-cprop-current-page="currentPage"
 *     ms-cprop-page-size="pageSize"
 *     ms-cprop-total="total" 
 *     ms-cprop-current-change="pageChange">
 * </ms:pagination>
 * ```
 */
avalon.component('ms:pagination', {
    $template: __inline('./ms-pagination.html'),
    $replace: 1,
    $dynamicProp: {
        total: { type: 'Number' },
        'page-size': { type: 'Number' },
        'current-page': { type: 'Number' },
        'current-change': { type: 'Function' }
    },
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
    total: 0,
    prevPage: avalon.noop,
    nextPage: avalon.noop,
    currentChange: avalon.noop
});