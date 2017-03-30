import * as avalon from 'avalon2';
import 'mmRouter';
import beyond from '../vendor/beyond';
import * as menuService from './menuService';

function getPage(component) {
    var html = `<xmp cached="true" is="${component}" :widget="{id:\'${component}\'}"></xmp>`;
    return html
}

function applyRouteConfig(config) {
    config.map(function (route) {
        avalon.router.add(route.path, function () {
            if (typeof route.component == 'function') {
                route.component(function () {
                    root.currentPage = getPage(route.name);
                });
            } else {
                root.currentPage = getPage(route.name);
            }
        });
        return 
    });
}

var root = avalon.vmodels['root'];

// 默认首页为gf-dashboard
require('/components/common-header');
require('/components/common-sidebar');
require('/components/gf-dashboard');
avalon.router.add('/', () => {
    root.currentPage = getPage('gf-dashboard');
});

root.$routeConfig = [{ 
    path: '/aaa',
    name: 'gf-aaa',
    component(resolve) {
        require.async('/components/gf-aaa', resolve);
    } 
}, {
    path: '/doc-ms-table',
    name: 'doc-ms-table',
    component(resolve) {
        require.async('/components/doc-ms-table', resolve);
    }
}, {
    path: '/doc-ms-form',
    name: 'doc-ms-form',
    component(resolve) {
        require.async('/components/doc-ms-form', resolve);
    }
}];

applyRouteConfig(root.$routeConfig);

// mmState全局配置
// avalon.state.config({
//     onError: function() {
//         console.log('mmState配置出错：', arguments)
//     },
//     onLoad: function(fromStat, toState) {
//         var breadCrumb = [], flagTree;
//         var root = avalon.vmodels.root;
//         menuService.walkMenu(toState.stateName, function (item, level) {
//             breadCrumb.unshift(item);
//         });
//         if (breadCrumb.length) {
//             flagTree = breadCrumb[breadCrumb.length-1]
//             root.title = flagTree.title;
//             avalon.vmodels.sidebar.actived = flagTree.name;
//             avalon.mix(root, { breadCrumb: breadCrumb });
//         }
//     }
// })