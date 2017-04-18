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
    define(definition): any;
    /**
     * 定义avalon组件
     */
    component(name: string, component): any;
    /**
     * 扫描元素，与ViewModel绑定
     */
    scan(node: Element, vm?): any;
    /**
     * avalon动画
     */
    effect(name: string, opts?: any): any;
    /**
     * ViewModel 列表
     */
    vmodels: any;
    /**
     * 过滤器列表
     */
    filters: any
    /**
     * 用于合并多个对象或深克隆,类似于jQuery.extend
     */
    mix(target: any, object1?: any, ...objectN: any[]): any;
    mix(deep: boolean, target: any, object1?: any, ...objectN: any[]): any,
    /**
     * no operation
     */
    noop(): void,
    /**
     * virtual dom
     */
    vdom(vnode: any, method: string): void
    /**
     * 生成指定长度数组
     */
    range(start: number, end?: number, step?: number): number[]
    /**
     * IE版本
     */
    msie: number
}

declare module 'avalon2' {
    export = avalon
}

declare var avalon: AvalonStatic