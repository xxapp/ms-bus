import avalon from 'avalon2';
import 'mmRouter';
import { menu as menuStore } from './storeService';

function getPage(component) {
    const html = `<xmp is="${component}" :widget="{id:'${component.replace(/\-/g, '_')}',expire:${Date.now()}}"></xmp>`;
    return html
}

function applyRouteConfig(config, parentRoute, accPath = '') {
    config.map(function (route) {
        let components = {};
        if (route.component) {
            components.currentPage = route.component;
        }
        if (route.components) {
            components = route.components;
        }
        avalon.router.add(accPath + route.path, function () {
            Object.keys(components).map(viewName => {
                let component = components[viewName];
                if (typeof component === 'function') {
                    component(function (m) {
                        menuStore.selectedKeys$.onNext([m.name]);
                        avalon.vmodels[parentRoute.name][viewName] = getPage(m.name);
                    });
                } else {
                    avalon.vmodels[parentRoute.name][viewName] = getPage(component.name);
                }
            });
        });
        // TODO 支持嵌套路由
        //route.children && applyRouteConfig(route.children, route, accPath + route.path);
    });
}

require('/components/common-header');
require('/components/common-sidebar');

const routeConfig = [{
    path: '/',
    component(resolve) {
        require.async('/components/gf-dashboard', resolve);
    }
}, { 
    path: '/aaa',
    component(resolve) {
        require.async('/components/gf-aaa', resolve);
    }
}, {
    path: '/demo',
    component(resolve) {
        require.async('/components/gf-demo', resolve);
    }
}, {
    path: '/demo-redux',
    component(resolve) {
        require.async('/components/gf-demo-redux', resolve);
    }
}, {
    path: '/demo-fast',
    component(resolve) {
        require.async('/components/gf-demo-fast', resolve);
    }
}, {
    path: '/doc-ms-table',
    component(resolve) {
        require.async('/components/doc-ms-table', resolve);
    }
}, {
    path: '/doc-ms-form',
    component(resolve) {
        require.async('/components/doc-ms-form', resolve);
    }
}];

applyRouteConfig(routeConfig, {
    name: 'root'
});