global.jQuery = global.$ = require('jquery');
/**
 * @require ./node_modules/bootstrap/dist/css/bootstrap.css
 */
require('bootstrap');

var avalon = require('avalon2');
require('mmRouter');
var beyond = require('/vendor/beyond');

// root vm
var root = avalon.define({
    $id: 'root',
    currentPath: '/',
    currentPage: 'aaa',
    title: '仪表板',
    breadCrumb: [],
    user: {}
});

require('/services/routerService');
avalon.history.start({
    fireAnchor: false
});

avalon.scan(document.body);