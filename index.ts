/// <reference path="typings/index.d.ts" />

import 'es5-shim';
import 'es6-promise/dist/es6-promise.auto';

import * as jQuery from 'jquery';
global.$ = global.jQuery = jQuery;
/**
 * @require ./node_modules/bootstrap/dist/css/bootstrap.css
 */
import 'bootstrap';

import * as avalon from 'avalon2';
import 'mmRouter';
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}
import 'es5-shim/es5-sham';

// root vm
const root = avalon.define({
    $id: 'root',
    currentPath: '/',
    currentPage: '',
    title: '仪表板',
    breadCrumb: [],
    user: {},
    $routeConfig: []
});

import './services/routerService';
avalon.history.start({
    fireAnchor: false
});
if (avalon.history.hash.replace(global.location.href, '') == '/') {
    avalon.router.navigate('/', 2);
}

avalon.scan(document.body);