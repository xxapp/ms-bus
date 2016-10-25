var avalon = require('avalon');
var beyond = require('/vendor/beyond');

var menuService = require('/services/menuService');

var sidebar = avalon.define({
    $id: 'sidebar',
    menu: [],
    actived: 'dashboard',
    menuClick: function (item, parent) {
        sidebar.actived = item.name;
    },
    search: function() {
        sidebar.$fire('all!title', 'Demo');
    },
    isChildActived: function (item) {
        if (item.name === sidebar.actived) {
            return false;
        }
        for (var i = 0, bread; bread = avalon.vmodels.root.breadCrumb.$model[i++]; ) {
            return bread.name === item.name;
        }
    }
});

exports.view = __inline('./sidebar.html');
exports.controller = avalon.controller(function($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function() {
        beyond.initSidebar();
    }
    // 进入视图
    $ctrl.$onEnter = function() {
        menuService.menu.then(function (menu) {
            sidebar.menu = menu;
        });
    }
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function() {}
    // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
    $ctrl.$vmodels = []
});