/// <reference path="./avalon.d.ts" />

/**
 * avalon.history.start 配置项
 */
interface mmHistoryOptions {
    /**
     * 根路径
     */
    root?: string,
    /**
     * 是否使用HTML 5 history
     */
    html5?: boolean,
    /**
     * hash 前缀
     */
    hashPrefix?: '!',
    /**
     * 滚动
     */
    autoScroll?: boolean,
    fireAnchor: boolean
}

interface AvalonStatic {
    history: {
        hash: string,
        check: () => void,
        start: (options: mmHistoryOptions) => void,
        stop: () => void,
        setHash: (s: string, replace?: boolean) => void,
        writeFrame: (s: string) => void,
        syncHash: () => this,
        getPath: () => string,
        onHashChanged: (hash: string, clickMode: number) => void
    },
    router: {
        getLastHash: () => string,
        setLastHash: (path: string) => void,
        /**
         * 当目标页面不匹配我们所有路由规则时, 就会执行此回调.有点像404
         * @param cb 回调
         */
        error: (cb?: () => void) => void,
        /**
         * 添加 一个路由规则与对象的回调, cb为rule规则中捕捉的参数
         * @param rule 路由规则
         * @param cb 匹配时的回调
         */
        add: (rule: string, cb?: (rule: object, args) => any, opts?) => void,
        /**
         * 手动触发对应的回调
         * @param hash 路径
         * @param mode 0或undefined, 不改变URL, 不产生历史实体, 执行回调; 1, 改变URL, 不产生历史实体, 执行回调; 2, 改变URL, 产生历史实体, 执行回调
         */
        navigate: (hash: string, mode: number) => string
    }
}