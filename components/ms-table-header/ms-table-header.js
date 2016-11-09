var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:tableHeader', {
    $template: '<span>{{text}}</span>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    text: '',
    width: ''
});