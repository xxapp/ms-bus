import 'es5-shim';
// if (getInternetExplorerVersion() === 8) {
//     Object.defineProperty = function (obj, property, meta) {
//         obj[property] = meta.value;
//     }
// }
// import 'es5-shim/es5-sham';
// import 'es6-promise/dist/es6-promise.auto';
import 'ane/components/ms-layout';
import 'ane/components/ms-menu'

avalon.define({
    $id: 'newRoot',
    menu: [{
        name: 'navigator1',
        title: '导航一',
        children: [{
            name: 'option1',
            title: '选项一'
        }]
    }, {
        name: 'navigator2',
        title: '导航二',
        children: [{
            name: 'submenu',
            title: '子菜单',
            children: [{
                name: 'option2',
                title: '选项二'
            }, {
                name: 'option3',
                title: '选项三'
            }]
        }]
    }, {
        name: 'navigator3',
        title: '导航三'
    }, {
        name: 'navigator4',
        title: '导航四'
    }]
});

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