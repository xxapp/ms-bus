import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

type notificationArgs = {
    /**
     * 通知正文
     */
    message: string,
    /**
     * 通知标题
     */
    title?: string,
    /**
     * 是否显示关闭按钮，默认为 false
     */
    closeButton?: boolean,
    /**
     * 自定义关闭按钮
     */
    closeHtml?: string,
    /**
     * 新的通知附加到顶部还是底部，默认为 true（顶部）
     */
    newestOnTop?: boolean,
    /**
     * 是否显示进度条，默认为 false
     */
    progressBar?: boolean,
    /**
     * 显示位置，默认为 toast-top-right
     */
    positionClass?: string,
    /**
     * 是否允许与上一条重复，默认为 false
     */
    preventDuplicates?: boolean,
    /**
     * 显示动画的持续时间（毫秒），默认为 300ms
     */
    showDuration?: number,
    /**
     * 隐藏动画的持续时间（毫秒），默认为 1000ms
     */
    hideDuration?: number,
    /**
     * 没有用户操作的情况下通知保持显示的时间（毫秒），默认为 5000ms
     */
    timeOut?: number,
    /**
     * 鼠标经过通知后，通知保持显示的时间（毫秒），默认为 1000ms
     */
    extendedTimeOut?: number,
    /**
     * 显示缓动效果，默认为 swing
     */
    showEasing?: string,
    /**
     * 隐藏缓动效果，默认为 swing
     */
    hideEasing?: string,
    /**
     * 显示通知的 jQuery 方法，默认为 fadeIn
     */
    showMethod?: string,
    /**
     * 隐藏通知的 jQuery 方法，默认为 fadeOut
     */
    hideMethod?: string
};

export function info({ message, title, ...options }: notificationArgs): void {
    options.closeButton
    toastr.info(message, title, options);
}

export function success({ message, title, ...options }: notificationArgs): void {
    toastr.success(message, title, options);
}

export function error({ message, title, ...options }: notificationArgs): void {
    toastr.error(message, title, options);
}

export function warning({ message, title, ...options }: notificationArgs): void {
    toastr.warn(message, title, options);
}

export const warn = warning;

export function config(options: notificationArgs): void {
    toastr.options = options;
}