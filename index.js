import 'es5-shim';
import 'es6-promise/dist/es6-promise.auto';
import jQuery from 'jquery';
global.$ = global.jQuery = jQuery;
require('bootstrap');
import avalon from 'avalon2';
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}
import 'es5-shim/es5-sham';
import './services/routerService';
import { breadcrumb } from './services/storeService';
import 'ane/dist/layout';

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