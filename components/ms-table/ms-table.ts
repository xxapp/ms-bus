import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import '../ms-pagination/ms-pagination';
import {
    findParentComponent,
    parseSlotToVModel,
    getChildTemplateDescriptor
} from '../../vendor/avx-component/avx-util';

const defaultPagination = {
    current: 1, pageSize: 10, onChange: avalon.noop
};

avalon.component('ms-table', {
    soleSlot: 'header',
    template: __inline('./ms-table.html'),
    defaults: {
        header: '',
        columns: [],
        data: [],
        key: 'id',

        needSelection: false,
        checked: [],
        selection: [],
        isAllChecked: false,
        onSelect: avalon.noop,
        onSelectAll: avalon.noop,
        selectionChange: avalon.noop,
        handleCheckAll(e) {
            const data = this.getCurrentPageData();
            if (e.target.checked) {
                data.forEach(record => {
                    this.checked.ensure(record[this.key]);
                    this.selection.ensure(record);
                });
            } else {
                if (!isNaN(this.pagination.total)) {
                    this.checked.clear();
                    this.selection.clear();
                } else {
                    this.checked.removeAll(el => data.map(record => record[this.key]).indexOf(el) !== -1);
                    this.selection.removeAll(el => data.indexOf(el) !== -1);
                }
            }
            this.selectionChange(this.checked, this.selection.$model);
            this.onSelectAll(e.target.checked, this.selection.$model);
        },
        handleCheck(checked, record) {
            if (checked) {
                this.checked.ensure(record[this.key]);
                this.selection.ensure(record);
            } else {
                this.checked.remove(record[this.key]);
                this.selection.remove(record);
            }
            this.selectionChange(this.checked, this.selection.$model);
            this.onSelect(record.$model, checked, this.selection.$model);
        },

        action() {},
        handle(type, col, record, $index) {
            let text = record[col.dataIndex].$model || record[col.dataIndex];
            this.action(type, text, record.$model, $index);
        },

        pagination: { current: 1, pageSize: 10, total: NaN, onChange: avalon.noop },
        handlePageChange(currentPage) {
            this.pagination.onChange(currentPage);
            this.pagination.current = currentPage;

            this.$fire('checked.length', this.checked.length);
            this.onChange(this.pagination.$model);
        },
        getCurrentPageData() {
            return !isNaN(this.pagination.total) ? this.data : this.data.slice(
                this.pagination.pageSize * (this.pagination.current - 1),
                this.pagination.pageSize * this.pagination.current
            );
        },
        $computed: {
            total() {
                return !isNaN(this.pagination.total) ? this.pagination.total : this.data.length;
            }
        },

        onChange: avalon.noop,
        onInit(event) {
            const descriptor = getChildTemplateDescriptor(this);
            descriptor.forEach(column => {
                if (column.props.type == 'selection') {
                    this.key = column.props.dataIndex || this.key;
                    this.needSelection = true;
                    return false;
                }
            });
            this.columns = getColumnConfig(descriptor);
            this.$watch('checked.length', (newV) => {
                const currentPageKeys = this.getCurrentPageData()
                    .map(record => record[this.key]);
                this.isAllChecked = currentPageKeys
                    .filter(key => this.checked.contains(key))
                    .length == currentPageKeys.length;
            });
            this.$watch('data', (v) => {
                this.checked.clear();
                this.selection.clear();
            });
            this.$watch('data.length', v => {
                this.checked.clear();
                this.selection.clear();
            });
            this.$watch('pagination', v => {
                avalon.mix(this.pagination, {...defaultPagination, ...v});
            });
            this.$fire('pagination', this.pagination.$model);
        },
        onReady(event) {
        },
        onDispose(vm, el) {
        }
    }
});

function getColumnConfig(descriptor, level = 1) {
    return descriptor.reduce((acc, column) => {
        if (column.is != 'ms-table-header') return acc;
        if (column.props.type == 'selection') {
            return acc;
        }
        let inlineTemplate = column.inlineTemplate;
        inlineTemplate = inlineTemplate.replace(/(ms-|:)skip="[^"]*"/g, '');
        inlineTemplate = inlineTemplate.replace(/<\s*ms-table-header[^>]*>.*<\/\s*ms-table-header\s*>/g, '');
        inlineTemplate = inlineTemplate.replace(/(ms-|:)click="handle\(([^"]*)\)"/g, '$1click="handle($2, col, record, $index)"');
        acc.push({
            title: column.props.title,
            dataIndex: column.props.dataIndex || '',
            template: /^\s*$/.test(inlineTemplate) ? '{{record.' + column.props.dataIndex + '}}' : inlineTemplate
        });
        return acc.concat(getColumnConfig(column.children, level + 1));
    }, []);
}