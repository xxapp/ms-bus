var avalon = require('avalon');
var beyond = require('/vendor/beyond');

var menuService = require('/services/menuService');

avalon.effect('collapse', {
    enter: function (elem, done) {
        $(elem).slideDown(200, done);
    },
    leave: function (elem, done) {
        $(elem).slideUp(200, done);
    }
});

var sidebar = avalon.define({
    $id: 'sidebar',
    menu: [],
    actived: 'dashboard',
    opened: '',
    compact: false,
    menuClick: function (item, parent) {
        if (!item.children || item.children.length === 0) {
            sidebar.actived = item.name;
            if (parent) {
                sidebar.opened = parent.name;
            }
        } else {
            if (sidebar.opened == item.name) {
                sidebar.opened = '';
            } else {
                sidebar.opened = item.name
            }
        }
    },
    search: function() {
        sidebar.$fire('all!title', 'Demo');
    },
    isChildActived: function (item) {
        // if (item.name === sidebar.actived) {
        //     return false;
        // }
        // for (var i = 0, bread; bread = avalon.vmodels.root.breadCrumb.$model[i++]; ) {
        //     return bread.name === item.name;
        // }
        if (!item.children) return;
        if (item.children.length === 0) return;
        for (var i = 0, child; child = item.children[i++]; ) {
            if (child.name === sidebar.actived) {
                sidebar.opened = item.name;
                return true;
            }
        }
        return false;
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