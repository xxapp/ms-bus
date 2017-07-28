import 'es5-shim';
import 'es6-promise/dist/es6-promise.auto';
import jQuery from 'jquery';
global.$ = global.jQuery = jQuery;
require('bootstrap');
// 提前禁止avalon对Object.create的实现
if (!Object.create) {
    Object.create = function () {
        function F() {}

        return function (o) {
            F.prototype = o;
            return new F();
        };
    }();
}
var avalon = require('avalon2');
if (avalon.msie < 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}
require('es5-shim/es5-sham');
require('./services/routerService');
let { breadcrumb } = require('./services/storeService');
require('ane/dist/layout');

const root = avalon.define({
    $id: 'root',
    currentPage: '',
    breadcrumb: [],
    user: {}
});
breadcrumb.list$.subscribe(v => {
    root.breadcrumb = v;
});
avalon.history.start({
    fireAnchor: false
});
if (!/#!/.test(global.location.hash)) {
    avalon.router.navigate('/', 2);
}
avalon.scan(document.body);