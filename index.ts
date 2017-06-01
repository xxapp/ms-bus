import 'es5-shim';
// if (getInternetExplorerVersion() === 8) {
//     Object.defineProperty = function (obj, property, meta) {
//         obj[property] = meta.value;
//     }
// }
// import 'es5-shim/es5-sham';
// import 'es6-promise/dist/es6-promise.auto';
import * as jQuery from 'jquery';
global.$ = global.jQuery = jQuery;
import 'bootstrap';
import * as avalon from 'avalon2';
import './services/routerService';
import 'ane/components/ms-layout';

avalon.define({
    $id: 'root',
    currentPage: ''
});
avalon.history.start({
    fireAnchor: false
});
if (!/#!/.test(global.location.hash)) {
    avalon.router.navigate('/', 2);
}
avalon.scan(document.body);

function getInternetExplorerVersion() {
    let rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
        const ua = navigator.userAgent;
        const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
        }
    }
    return rv;
}