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

interface AvalonStatic {
    /**
     * 定义ViewModel，需要指定$id
     */
    define(definition): object;
    /**
     * 定义组件
     */
    component: avalonComponent;
    /**
     * 扫描元素，与ViewModel绑定
     */
    scan(node: Element, vm?): any;
    /**
     * ViewModel 列表
     */
    vmodels: any;
    /**
     * 用于合并多个对象或深克隆,类似于jQuery.extend
     */
    mix(target: any, object1?: any, ...objectN: any[]): any;
    mix(deep: boolean, target: any, object1?: any, ...objectN: any[]): any
}

declare module 'avalon2' {
    export = avalon
}

declare var avalon: AvalonStatic