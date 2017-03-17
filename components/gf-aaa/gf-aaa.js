var avalon = require('avalon2');

var vm = avalon.define({
    $id: 'gf_aaa',
    text: 'aaa'
});

exports.view = __inline('./gf-aaa.html');
exports.controller = vm;