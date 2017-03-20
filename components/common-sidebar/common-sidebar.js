var avalon = require('avalon2');
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

avalon.component('common-sidebar', {
    template: __inline('./common-sidebar.html'),
    defaults: {
        menu: [],
        actived: 'dashboard',
        opened: '',
        compact: false,
        menuClick: function (item, parent) {
            if (!item.children || item.children.length === 0) {
                this.actived = item.name;
                if (parent) {
                    this.opened = parent.name;
                }
            } else {
                if (this.opened == item.name) {
                    this.opened = '';
                } else {
                    this.opened = item.name
                }
            }
        },
        search: function() {
            this.$fire('all!title', 'Demo');
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
                if (child.name === this.actived) {
                    //sidebar.opened = item.name;
                    return true;
                }
            }
            return false;
        },
        onInit: function (event) {
            var vm = event.vmodel;
            menuService.menu.then(function (menu) {
                vm.menu = menu;
            });
        },
        onReady: function (event) {
            beyond.initSidebar();
        }
    }
});