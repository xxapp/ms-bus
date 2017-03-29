import * as avalon from 'avalon2';
import '../ms-checkbox/ms-checkbox';
import { findParentComponent, parseSlotToVModel, getChildTemplateDescriptor } from '../../vendor/avx-component/avx-util';

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
            if (e.target.checked) {
                this.data.slice(
                        this.pagination.pageSize * (this.pagination.current - 1),
                        this.pagination.pageSize * this.pagination.current
                    )
                    .forEach(record => {
                        this.checked.ensure(record[this.key]);
                        this.selection.ensure(record);
                    });
            } else {
                this.checked.clear();
                this.selection.clear();
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

        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
            onChange: avalon.noop
        },
        handlePageChange(currentPage) {
            this.pagination.onChange(currentPage);
            this.pagination.current = currentPage;

            this.$fire('checked.length', this.checked.length);
            
            this.onChange(this.pagination.$model);
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
                const currentPageKeys = this.data
                    .slice(
                        this.pagination.pageSize * (this.pagination.current - 1),
                        this.pagination.pageSize * this.pagination.current
                    )
                    .map(record => record[this.key]);
                this.isAllChecked = currentPageKeys
                    .filter(key => this.checked.contains(key))
                    .length == currentPageKeys.length;
            });
            this.$watch('data', (v) => {
                this.checked.clear();
                this.pagination.total = v.length;
            });
            this.pagination.total = this.data.length;
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