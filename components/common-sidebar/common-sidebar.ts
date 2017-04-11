import * as avalon from 'avalon2';
import * as beyond from '../../vendor/beyond';

import * as menuService from '../../services/menuService';

avalon.effect('collapse', {
    enter(elem, done) {
        $(elem).slideDown(200, done);
    },
    leave(elem, done) {
        $(elem).slideUp(200, done);
    }
});

export const name = 'common-sidebar';

avalon.component(name, {
    template: __inline('./common-sidebar.html'),
    defaults: {
        menu: [],
        actived: 'dashboard',
        opened: '',
        compact: false,
        menuClick(item, parent) {
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
        search() {
            this.$fire('all!title', 'Demo');
        },
        isChildActived(item) {
            // if (item.name === sidebar.actived) {
            //     return false;
            // }
            // for (var i = 0, bread; bread = avalon.vmodels.root.breadCrumb.$model[i++]; ) {
            //     return bread.name === item.name;
            // }
            if (!item.children) return;
            if (item.children.length === 0) return;
            for (let i = 0, child; child = item.children[i++]; ) {
                if (child.name === this.actived) {
                    //sidebar.opened = item.name;
                    return true;
                }
            }
            return false;
        },
        onInit(event) {
            menuService.menu.then((menu) => {
                this.menu = menu;
            });
        },
        onReady(event) {
            beyond.initSidebar();
        }
    }
});