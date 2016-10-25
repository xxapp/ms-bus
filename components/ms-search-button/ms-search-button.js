var avalon = require('avalon');

avalon.component('ms:searchButton', {
    $slot: 'content',
    content: '',
    $template: '<button type="button" ms-click="search">{{content|html}}</button>',
    $replace: 1,
    $init: function (vm) {
        vm.search = function () {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            containerVm.$dirtyQuery.start = 0;
            containerVm.loadData(function () {
                containerVm.$query = avalon.mix(containerVm.$query, containerVm.$dirtyQuery);
            }, containerVm.$dirtyQuery);
        }
    },
    search: avalon.noop,
    $containerVmId: ''
});