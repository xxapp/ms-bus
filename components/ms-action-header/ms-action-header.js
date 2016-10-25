var avalon = require('avalon');

avalon.component('ms:actionHeader', {
    $template: '<span>{{text}}</span>',
    $replace: 1,
    $init: function (vm) {
    },
    text: '',
    width: '',
    containerVmId: ''
});