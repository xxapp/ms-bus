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

interface avalonInstance {
    /**
     * 用于获取或修改样式,自动修正厂商前缀及加px,与jQuery的css方法一样智能
     */
    css(name: string, value: string | number): number | avalonInstance,
    /**
     * 取得目标的高,不带单位,如果目标为window,则取得窗口的高,为document取得页面的高
     */
    height(value?: string | number) : number,
    /**
     * 取得元素的位置, 如 {top:111, left: 222}
     */
    offset(): { top: number, left: number }
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
     * 指令集合
     */
    directives: any[];
    /**
     * avalon动画
     */
    effect(name: string, opts?: any): any;
    /**
     * 判断一个元素是否包含另一个元素
     */
    contains(root: Element, el: Element): boolean
    /**
     * 给元素绑定事件
     */
    bind(elem: Node, type: string, fn: (e) => boolean | void)
    /**
     * 移除一个元素的事件
     */
    unbind(elem: Node, type?: string, fn?: (e) => boolean | void)
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
    /**
     * 注册文档加载完成事件
     */
    ready(fn): void;
    /**
     * 将字符串安全格式化为正则表达式的源码
     */
    escapeRegExp(target): string;
    /**
     * 构造avalon实例
     */
    (el: Node): avalonInstance
}

declare module 'avalon2' {
    export = avalon
}

declare var avalon: AvalonStatic