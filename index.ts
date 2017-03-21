declare var window, require;
if (!window.Promise) {
    require.async('es6-promise', function (m) {
        m.polyfill();
    });
}

import * as jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
/**
 * @require ./node_modules/bootstrap/dist/css/bootstrap.css
 */
import 'bootstrap';

import * as avalon from 'avalon2';
import 'mmRouter';

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
if (avalon.history.hash.replace(window.location.href, '') == '/') {
    avalon.router.navigate('/', 2);
}

avalon.scan(document.body);