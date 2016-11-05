var avalon = require('avalon');

avalon.component('ms:textHeader', {
    $template: '<span>{{text}}</span>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        avalon.vmodels[$(el).attr('parent-vm-id')].$refs[vm.$id] = vm;
    },
    text: '',
    width: '',
    containerVmId: ''
});