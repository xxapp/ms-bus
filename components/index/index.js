var avalon = require('avalon');
require('mmState');
var beyond = require('/vendor/beyond');
var ajax= require('/services/ajaxService');
var menuService = require('/services/menuService');
var configService = require('/services/configService');

// 加载jquery插件
require('/vendor/bootstrapValidator');
require('/vendor/bootstrapValidator/zh_CN');

// root vm
var root = avalon.define({
    $id: 'root',
    page: '',
    title: '仪表板',
    breadCrumb: [],
    user: {}
});
root.$watch('title', function(v) {
    this.title = v;
});

// 所有的状态都在这里定义
avalon.state('root', {
    url: '/',
    views: {
        'header': {
            template: require('/components/header').view,
            controller: require('/components/header').controller
        },
        'sidebar': {
            template: require('/components/sidebar').view,
            controller: require('/components/sidebar').controller
        },
        'content': {
            template: '<h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1><h1>Welcome</h1>',
            controller: avalon.controller(function ($ctrl) {
                // 视图渲染后，意思是avalon.scan完成
                $ctrl.$onRendered = function() {
                    beyond.init();
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
            templateProvider: require.async('/components/demo', 'view'),
            controllerProvider: require.async('/components/demo', 'controller')
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

// mmState全局配置
avalon.state.config({
    onError: function() {
        console.log('mmState配置出错：', arguments)
    },
    onLoad: function(fromStat, toState) {
        var breadCrumb = [], flagTree;
        menuService.walkMenu(toState.stateName, function (item, level) {
            if (level === 1) {
                breadCrumb = [item];
            } else {
                breadCrumb.push(item);
            }
        });
        if (breadCrumb.length) {
            flagTree = breadCrumb[breadCrumb.length-1]
            root.title = flagTree.title;
            avalon.vmodels.sidebar.actived = flagTree.name;
            avalon.mix(root, { breadCrumb: breadCrumb });
        }
    }
})

avalon.history.start({
    fireAnchor: false
});

avalon.scan();