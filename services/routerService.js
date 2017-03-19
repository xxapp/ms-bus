var avalon = require('avalon2');
require('mmRouter');
var msView = require('/components/ms-view'), addState = msView.add;
var beyond = require('/vendor/beyond');
var menuService = require('/services/menuService');

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

// 覆写avalon.router.add，自动应用通用配置
var router_add = avalon.router.add;
avalon.router.add = function (path, callback, opts) {
    router_add.call(avalon.router, path, function () {
        var path = this.path;
        root.currentPath = path;
        msView.resolve(this.path.slice(1)).then(function (result) {
            root.currentPage = getPage(path);
            if (callback) {
                return callback.apply(this, arguments);
            }
        });
    }, opts);
}

function getPage(path) {
    path = path.slice(1)
    var html = '<xmp is="ms-view" class="view-container" ms-widget="{path:\'' + path + '\',page: @page}"><xmp>'
    return html
}

var root = avalon.vmodels['root'];

// 默认首页为gf-dashboard
addState('',
    require('/components/gf-dashboard').view,
    require('/components/gf-dashboard').controller);
addState('header',
    require('/components/common-header').view,
    require('/components/common-header').controller);
addState('sidebar',
    require('/components/common-sidebar').view,
    require('/components/common-sidebar').controller);
avalon.router.add('/');

addState('aaa', 
    require.async('/components/gf-aaa', 'view'),
    require.async('/components/gf-aaa', 'controller'));
avalon.router.add('/aaa');

avalon.router.add('/bbb/:id');

// 恢复覆写的require.async和avalon.router.add
require.async = require_async;
avalon.router.add = router_add;

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