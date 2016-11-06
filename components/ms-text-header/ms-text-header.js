var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:textHeader', {
    $template: '<span>{{text}}</span>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        avxUtil.pickToRefs(vm, el);
    },
    text: '',
    width: '',
    containerVmId: ''
});