var avalon = require('avalon');

avalon.component('ms:textHeader', {
    $template: '<span>{{text}}</span>',
    $replace: 1,
    $init: function (vm) {
    },
    text: '',
    width: '',
    containerVmId: ''
});