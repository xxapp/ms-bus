var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:searchButton', {
    $slot: 'content',
    content: '',
    $template: '<button type="button" ms-click="search">{{content|html}}</button>',
    $replace: 1,
    $init: function (vm, el) {
        avxUtil.pickToRefs(vm, el);
        var $form = $(el).closest('form');
        vm.search = function () {
            var bv = $form.data('bootstrapValidator');
            if (bv) {
                bv.validate();
                if (!bv.isValid()) {
                    return ;
                }
            }
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