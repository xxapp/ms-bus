import 'es5-shim';
// if (getInternetExplorerVersion() === 8) {
//     Object.defineProperty = function (obj, property, meta) {
//         obj[property] = meta.value;
//     }
// }
// import 'es5-shim/es5-sham';
// import 'es6-promise/dist/es6-promise.auto';
import * as avalon from 'avalon2';
import 'ane/components/ms-layout';
import 'ane/components/ms-menu'

avalon.define({
    $id: 'newRoot',
    menu: [{
        key: 'navigator1',
        icon: 'fa fa-send',
        title: '导航一',
        children: [{
            key: 'option1',
            title: '选项一'
        }]
    }, {
        key: 'navigator2',
        icon: 'fa fa-server',
        title: '导航二',
        children: [{
            key: 'submenu',
            title: '子菜单',
            children: [{
                key: 'option2',
                title: '选项二'
            }, {
                key: 'option3',
                title: '选项三'
            }]
        }]
    }, {
        key: 'navigator3',
        icon: 'fa fa-umbrella',
        title: '导航三'
    }, {
        key: 'navigator4',
        icon: 'fa fa-wrench',
        title: '导航四'
    }],
    openKeys: ['navigator2', 'submenu'],
    selectedKeys: ['option2'],
    handleMenuClick(item, key, keyPath) {
        console.log(item, key, keyPath);
    }
});
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