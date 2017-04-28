import * as avalon from 'avalon2';
import './ms-loading.css';

/**
 * loading 指令
 * 
 * @example
 * ``` html
 * <table :loading="true">...</table>
 * ```
 */
avalon.directive('loading', {
    init() {
        this.instance = null;
        this.oldPositionStyle = '';
    },
    update(vdom, value) {
        if (value) {
            if (this.instance === null) {
                const t = setInterval(() => {
                    const dom = vdom.dom;
                    const computedStyle = global.getComputedStyle ? global.getComputedStyle(dom) : dom.currentStyle;
                    const width = dom.offsetWidth, height = dom.offsetHeight, className = dom.className;
                    const {
                        borderLeftWidth,
                        borderTopWidth,
                        display
                    } = computedStyle;
                    this.oldPositionStyle = dom.style.position;

                    // 如果元素是隐藏的，什么都不做
                    if (display === 'none') {
                        clearInterval(t);
                    }

                    // 如果宽度和高度都不为0，则添加loading遮罩
                    if (width !== 0 && height !== 0) {
                        clearInterval(t);
                    } else {
                        return ;
                    }

                    const maskElement = global.document.createElement('div');
                    maskElement.className = 'bus-loading-mask';
                    maskElement.innerText = '加载中...';
                    maskElement.style.left = 0 - (borderLeftWidth === 'medium' ? 0 : parseFloat(borderLeftWidth)) + 'px';
                    maskElement.style.top = 0 - (borderTopWidth === 'medium' ? 0 : parseFloat(borderTopWidth)) + 'px';
                    maskElement.style.width = width + 'px';
                    maskElement.style.height = height + 'px';
                    maskElement.style.lineHeight = height + 'px';

                    dom.style.position = 'relative';
                    if (!~` ${className} `.indexOf(' masked ')) {
                        dom.className += ' masked';
                    }
                    dom.appendChild(maskElement);
                    this.instance = maskElement;
                    console.log('mask初始化完成');
                }, 100);
            } else {
                const dom = vdom.dom;
                const maskElement = this.instance;
                const className = dom.className;
                this.oldPositionStyle = dom.style.position;
                maskElement.style.display = 'block';
                dom.style.position = 'relative';
                if (!~` ${className} `.indexOf(' masked ')) {
                    dom.className = className + ' masked';
                }
            }
        } else {
            setTimeout(() => {
                if (this.instance !== null) {
                    const dom = vdom.dom;
                    const maskElement = this.instance;
                    const className = dom.className;
                    maskElement.style.display = 'none';
                    if (this.oldPositionStyle) {
                        dom.style.position = this.oldPositionStyle;
                    }
                    dom.className = ` ${className} `.replace(/\s*masked\s*/, ' ');
                }
            }, 100);
        }
    },
    beforeDispose() {
        const dom = this.node.dom;
        this.instance !== null && dom.removeChild(this.instance);
    }
});

/**
 * 全局 loading 方法
 * 
 * @example
 * ``` js
 * import { Loading } from './components/ms-loading';
 * Loading.show();
 * setTimeout(() => {
 *   Loading.hide();
 * }, 5000)
 * ```
 */
const loadingDirective = avalon.directives['loading'];
const globalLoadingContext: {
    node: { dom: HTMLElement },
    instance?: HTMLDivElement
} = {
    node: { dom: document.body }
};

export const Loading = {
    show() {
        if (globalLoadingContext.instance === undefined) {
            loadingDirective.init.call(globalLoadingContext);
            avalon.ready(() => {
                loadingDirective.update.call(globalLoadingContext, {
                    dom: globalLoadingContext.node.dom
                }, true);
            });
        } else {
            loadingDirective.update.call(globalLoadingContext, {
                dom: globalLoadingContext.node.dom
            }, true);
        }
    },
    hide() {
        if (globalLoadingContext.instance !== undefined) {
            loadingDirective.update.call(globalLoadingContext, {
                dom: globalLoadingContext.node.dom
            }, false);
        }
    }
};