import * as avalon from 'avalon2';
import 'mmRouter';
import beyond from '../vendor/beyond';
import * as menuService from './menuService';

function getPage(component) {
    const html = `<xmp is="${component}" :widget="{id:'${component}',expire:${Date.now()}}"></xmp>`;
    return html
}

function applyRouteConfig(config, parentRoute, accPath = '') {
    config.map(function (route) {
        let components:any = {};
        if (route.component) {
            components.currentPage = route.component;
        }
        if (route.components) {
            components = route.components;
        }
        avalon.router.add(accPath + route.path, function () {
            Object.keys(components).map(viewName => {
                let component = components[viewName];
                if (typeof component == 'function') {
                    component(function (m) {
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