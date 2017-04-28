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
    scan(node: Element|string, vm?, beforeReady?: () => void): any;
    /**
     * 定义指令
     */
    directive(name: string, options): any;
    /**
     * avalon动画
     */
    effect(name: string, opts?: any): any;
    /**
     * 判断一个元素是否包含另一个元素
     */
    contains(root: Element, el: Element): boolean
    root: HTMLElement;
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
    msie: number,
    /**
     * 打印日志
     */
    log(message?: any, ...optionalParams: any[]): void;
    /**
     * 打印错误信息
     */
    error(message?: any, ...optionalParams: any[]): void;
}

declare module 'avalon2' {
    export = avalon
}

declare var avalon: AvalonStatic