import avalon from 'avalon2';

import * as menuService from '../../services/menuService';
import { menu as menuStore } from '../../services/storeService';
import 'ane';

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
        selectedKeys: ['dashboard'],
        openKeys: [],
        handleMenuClick(item, key, keyPath) {
            avalon.history.setHash(item.uri);
        },
        handleOpenChange(openKeys) {
            this.openKeys = openKeys.slice(-1);
        },
        onInit(event) {
            menuService.menu.then((menu) => {
                this.menu = menu;
            });
            menuStore.selectedKeys$.subscribe(v => {
                this.selectedKeys = v;
            });
            menuStore.openKeys$.subscribe(v => {
                this.openKeys = v;
            });
        }
    }
});