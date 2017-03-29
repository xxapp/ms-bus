import * as avalon from 'avalon2';

/**
 * 分页组件
 * @prop {Number} [current=1] 当前页
 * @prop {Number} [pageSize=10] 每页的数据量
 * @prop {Number} total 数据总量
 * @event {Function} onChange 当页码改变时触发，参数current
 * 
 * @example
 * ```
 * <ms-pagination :widget="{total:100,onChange:@handlePageChange}"></ms-pagination>
 * 
 * <ms-pagination :widget="{current:@currentPage,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ms-pagination>
 * ```
 */
avalon.component('ms-pagination', {
    template: __inline('./ms-pagination.html'),
    defaults: {
        current: 1,
        pageSize: 10,
        total: 0,
        prevPage() {
            if (this.current > 1) {
                this.onChange(--this.current);
            }
        },
        nextPage() {
            if (this.current < Math.ceil(this.total/this.pageSize)) {
                this.onChange(++this.current);
            }
        },
        onChange: avalon.noop,
        onInit(event) {
        },
        onReady(event) {
        },
        onDispose(event) {
        }
    }
});