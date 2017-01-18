var avalon = require('avalon');
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

// 所有的状态都在这里定义
avalon.state('root', {
    url: '/',
    views: {
        'header': {
            template: require('/components/common-header').view,
            controller: require('/components/common-header').controller
        },
        'sidebar': {
            template: require('/components/common-sidebar').view,
            controller: require('/components/common-sidebar').controller
        },
        'content': {
            template: '<h1>Welcome</h1>',
            controller: avalon.controller(function ($ctrl) {
                // 视图渲染后，意思是avalon.scan完成
                $ctrl.$onRendered = function() {
                    //beyond.init();
                    beyond.hideLoading();
                }
                // 进入视图
                $ctrl.$onEnter = function() {
                }
                // 对应的视图销毁前
                $ctrl.$onBeforeUnload = function() {}
                // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
                $ctrl.$vmodels = []
            })
        },
        'layer@': {
            template: ' ',
            controller: avalon.controller(function () {})
        }
    }
});

// demo
avalon.state('root.demo', {
    url: 'demo',
    views: {
        "content@": {
            templateProvider: require.async('/components/gf-demo', 'view'),
            controllerProvider: require.async('/components/gf-demo', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});

avalon.state('root.category', {
    url: 'category',
    views: {
        "content@": {
            templateProvider: require.async('/components/gf-category', 'view'),
            controllerProvider: require.async('/components/gf-category', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});

avalon.state('root.item', {
    url: 'item',
    views: {
        "content@": {
            templateProvider: require.async('/components/gf-item', 'view'),
            controllerProvider: require.async('/components/gf-item', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});
avalon.state('root.channel', {
    url: 'channel',
    views: {
        "content@": {
            templateProvider: require.async('/components/gf-channel', 'view'),
            controllerProvider: require.async('/components/gf-channel', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});
avalon.state('root.supplier', {
    url: 'supplier',
    views: {
        "content@": {
            templateProvider: require.async('/components/gf-supplier', 'view'),
            controllerProvider: require.async('/components/gf-supplier', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});
avalon.state('root.doc-ms-table', {
    url: 'doc-ms-table',
    views: {
        "content@": {
            templateProvider: require.async('/components/doc-ms-table', 'view'),
            controllerProvider: require.async('/components/doc-ms-table', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});
avalon.state('root.doc-ms-form', {
    url: 'doc-ms-form',
    views: {
        "content@": {
            templateProvider: require.async('/components/doc-ms-form', 'view'),
            controllerProvider: require.async('/components/doc-ms-form', 'controller')
        }
    },
    ignoreChange: function (type) {
        return !!type;
    }
});

// mmState全局配置
avalon.state.config({
    onError: function() {
        console.log('mmState配置出错：', arguments)
    },
    onLoad: function(fromStat, toState) {
        var breadCrumb = [], flagTree;
        var root = avalon.vmodels.root;
        menuService.walkMenu(toState.stateName, function (item, level) {
            breadCrumb.unshift(item);
        });
        if (breadCrumb.length) {
            flagTree = breadCrumb[breadCrumb.length-1]
            root.title = flagTree.title;
            avalon.vmodels.sidebar.actived = flagTree.name;
            avalon.mix(root, { breadCrumb: breadCrumb });
        }
    }
})