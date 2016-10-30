var avalon = require('avalon');

avalon.component('ms:tableHeader', {
    $template: '<span>{{text}}</span>',
    $replace: 1,
    $init: function (vm) {
    },
    text: '',
    width: '',
    containerVmId: ''
});