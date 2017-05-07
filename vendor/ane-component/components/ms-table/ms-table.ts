import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import '../ms-pagination/ms-pagination';
import {
    findParentComponent,
    parseSlotToVModel,
    getChildTemplateDescriptor
} from '../../ane-util';
import '../ms-loading';

const defaultPagination = function () {
    return {
        current: 1, pageSize: 10, total: NaN, onChange: avalon.noop
    };
};

avalon.component('ms-table', {
    soleSlot: 'header',
    template: __inline('./ms-table.html'),
    defaults: {
        header: '',
        columns: [],
        data: [],
        key: 'id',

        loading: false,
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
                if (!isNaN(this.paginationConfig.total)) {
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

        actions: {},
        handle(type, col, record, $index, ...extra) {
            let text = record[col.dataIndex].$model || record[col.dataIndex];
            this.actions(type, text, record.$model, $index, ...extra);
        },

        pagination: defaultPagination(),
        paginationConfig: defaultPagination(),
        handlePageChange(currentPage) {
            this.paginationConfig.onChange(currentPage);
            this.paginationConfig.current = currentPage;

            this.$fire('checked.length', this.checked.length);
            this.onChange(this.paginationConfig.$model);
        },
        getCurrentPageData() {
            return !isNaN(this.paginationConfig.total) ? this.data : this.data.slice(
                this.paginationConfig.pageSize * (this.paginationConfig.current - 1),
                this.paginationConfig.pageSize * this.paginationConfig.current
            );
        },
        $computed: {
            total() {
                return !isNaN(this.paginationConfig.total) ? this.paginationConfig.total : this.data.length;
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
                this.isAllChecked = false;
                this.checked.clear();
                this.selection.clear();
            });
            this.$watch('data.length', v => {
                this.isAllChecked = false;
                this.checked.clear();
                this.selection.clear();
            });
            this.$watch('pagination', v => {
                avalon.mix(this.paginationConfig, v);
            });
            this.$watch('pagination.current', v => {
                this.paginationConfig.current = v;
            });
            this.$watch('pagination.pageSize', v => {
                this.paginationConfig.pageSize = v;
            });
            this.$watch('pagination.total', v => {
                this.paginationConfig.total = v;
            });
            this.$watch('pagination.onChange', v => {
                this.paginationConfig.onChange = v;
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
        inlineTemplate = inlineTemplate.replace(/(ms-|:)click="handle\(([^"]*)\)"/g, ($0, $1, $2, $3) => {
            return `${$1}click="handle(${$2},)"`.replace(/,/, ', col, record, $index,').replace(/,\)/, ')');
        });
        acc.push({
            title: column.props.title,
            dataIndex: column.props.dataIndex || '',
            template: /^\s*$/.test(inlineTemplate) ? '{{record.' + column.props.dataIndex + '}}' : inlineTemplate
        });
        return acc.concat(getColumnConfig(column.children, level + 1));
    }, []);
}