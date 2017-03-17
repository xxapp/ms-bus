var avalon = require('avalon2');

var vm = avalon.define({
    $id: 'gf_dashboard',
    message: 'welcome'
});

exports.view = __inline('./gf-dashboard.html');
exports.controller = vm;