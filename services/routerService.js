import * as avalon from 'avalon2';
import 'mmRouter';
import beyond from '/vendor/beyond';
import menuService from '/services/menuService';

// 覆写require.async,改写为promise
var require_async = require.async;
window.require_async = require_async;
require.async = function(n, part, onerror) {
    if (typeof part == 'function') {
        return require_async.call(require, n, part, onerror);
    } else {
        return function () {
            return new Promise(function(rs, rj) {
                require_async(n, function(m) {
                    rs(part ? m[part] : m);
                }, rj);
            });
        }
    }
}

function getPage(component) {
    var html = `<xmp cached="true" is="${component}" :widget="{id:\'${component}\'}"></xmp>`;
    return html
}

function applyRouteConfig(config) {
    config.map(function (route) {
        avalon.router.add(route.path, function () {
            if (typeof route.component == 'function') {
                route.component().then(function () {
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
avalon.router.add('/', function () {
    root.currentPage = getPage('gf-dashboard');
});

root.$routeConfig = [{ 
    path: '/aaa',
    name: 'gf-aaa',
    component: require.async('/components/gf-aaa')
}];

applyRouteConfig(root.$routeConfig);

// 恢复覆写的require.async
require.async = require_async;

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