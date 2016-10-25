var avalon = require('avalon');

var limit = 10;
avalon.component('ms:pagination', {
    $template: __inline('./ms-pagination.html'),
    $replace: 1,
    $init: function (vm) {
        vm.prevPage = function () {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            if (vm.currentPage > 1) {
                var page = {
                    start: (--vm.currentPage-1) * limit,
                    limit: limit
                };
                containerVm.loadData(function () {
                    containerVm.$query = avalon.mix(containerVm.$query, page);
                }, page);
            }
        }
        vm.nextPage = function () {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            if (vm.currentPage < Math.ceil(containerVm.total/vm.limit)) {
                var page = {
                    start: (++vm.currentPage-1) * limit,
                    limit: limit
                };
                containerVm.loadData(function () {
                    containerVm.$query = avalon.mix(containerVm.$query, page);
                }, page);
            }
        }
    },
    $ready: function (vm) {
        var containerVm = avalon.vmodels[vm.$containerVmId];
        containerVm.$query.limit = limit;
        containerVm.$watch('total', function (newV, oldV) {
            if (newV == 0) {
                containerVm.total = 1;
            }
        });
    },
    currentPage: 1,
    pageCount: 1,
    limit: limit,
    prevPage: avalon.noop,
    nextPage: avalon.noop,
    $containerVmId: ''
});