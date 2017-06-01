import * as avalon from  'avalon2';
import ajax from './ajaxService';

const menu = [{
    key: 'dashboard',
    title: '主页',
    icon: 'fa fa-home',
    uri: '/'
}, {
    key: 'demo1',
    title: '例子一级',
    icon: 'fa fa-home',
    children: [{
        key: 'demo',
        title: '例子',
        icon: 'fa fa-home',
        uri: '/demo'
    }, {
        key: 'demo-redux',
        title: 'redux例子',
        icon: 'fa fa-home',
        uri: '/demo-redux'
    }, {
        key: 'demo-fast',
        title: '快速CURD例子',
        icon: 'fa fa-home',
        uri: '/demo-fast'
    }]
}, {
    key: 'doc-ms',
    title: '组件文档',
    icon: 'fa fa-book',
    children: [{
        key: 'doc-ms-table',
        title: 'Table',
        uri: '/doc-ms-table'
    }, {
        key: 'doc-ms-form',
        title: 'Form',
        uri: '/doc-ms-form'
    }]
}, {
    key: 'rxjs-demo-page',
    title: 'RxJS Demo Page',
    icon: 'fa fa-page',
    uri: '/pages/rxjs-demo/rxjs-demo.html',
    target: '_blank'
}];

// 根据权限过滤菜单
const menuPromise = new Promise((rs, rj) => {
    ajax({
        url: '/api/loged',
        type: 'get'
    }).then((result) => {
        if (result.code === '0') {
            $('#loadImg').css('display', 'none');
            $('.login-area').removeClass('hidden').addClass('animated flipInX');
            travelMenu(menu, result.data.t.functions, result.data.t.allowedFunctions);
            avalon.mix(avalon.vmodels.root, { user: result.data.t });
            rs(menu.slice(0));
        } else {
            rj(result);
        }
    });
});

function travelMenu(menulet, functions, allowedFunctions) {
    if (!menulet) {
        return ;
    }
    for (let i = 0, item; item = menulet[i++]; ) {
        let hasPermission = false;
        for (let j = 0, func; func = functions[j++]; ) {
            if (func.code === item.name && (allowedFunctions[func.code]) || allowedFunctions['all']) {
                item.uri = func.uri || item.uri || 'javascript:;';
                item.icon = func.icon_url || item.icon;
                item.target = item.target || '_self';
                item.children = item.children || [];
                item.opened = false;
                hasPermission = true;
                break;
            }
        }
        item.show = hasPermission === true;

        travelMenu(item.children, functions, allowedFunctions);
    }
}

function walkMenu(name, process, level = 1, menuLet = menu.slice(0)) {
    let finded = false;
    for (let i = 0, item; item = menuLet[i++]; ) {
        if (item.name === name || item.stateName === name) {
            process && process(item, level);
            finded = true;
            break;
        }
        if (item.childStates && ~item.childStates.indexOf(name)) {
            process && process(item, level);
            finded = true;
            break;
        }
        if (item.children && walkMenu(name, process, level + 1, item.children)) {
            process && process(item, level);
            finded = true;
            break;
        }
    }
    return finded;
}
export {
    walkMenu,
    menuPromise as menu
}