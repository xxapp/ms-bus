declare var global: {
    Promise: Promise<any>,
    $,
    jQuery
}

declare var require: Function | {
    async: Function
}

interface avalonComponentRecycleFn {
    (event: {
        target: Element,
        type: string,
        vmodel
    });
}

interface avalonComponent {
    (name: string, component: {
        template: string,
        defaults: {
            onInit: avalonComponentRecycleFn,
            onReady: avalonComponentRecycleFn,
            onViewChange: avalonComponentRecycleFn,
            onDispose: avalonComponentRecycleFn
        }
    }): any
}

declare var avalon: {
    define: (definition) => object,
    component: avalonComponent,
    history,
    router,
    scan: (node: Element, vm) => any
}

declare module 'avalon2' {
    export default avalon
}