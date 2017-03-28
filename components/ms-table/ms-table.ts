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
        checked: [],
        selection: [],
        isAllChecked: false,
        onCheck: avalon.noop,
        handleCheckAll(checked) {
            console.log('all', checked, this.checked.toString());
            if (checked) {
                this.data.forEach(record => {
                    this.checked.ensure(String(record[this.key]));
                    this.selection.ensure(record);
                });
            } else {
                this.checked.clear();
                this.selection.clear();
            }
            this.selectionChange(this.selection.$model);
        },
        handleCheck(checked, record) {
            if (checked) {
                this.checked.ensure(String(record[this.key]));
                this.selection.ensure(record);
            } else {
                this.checked.remove(String(record[this.key]));
                this.selection.remove(record);
            }
            this.selectionChange(this.selection.$model);
        },
        selectionChange: avalon.noop,
        action() {},
        handle(type, col, record, $index) {
            let text = record[col.dataIndex].$model || record[col.dataIndex];
            this.action(type, text, record.$model, $index);
        },
        onInit(event) {
            this.columns = getColumnConfig(getChildTemplateDescriptor(this));
            this.$watch('checked.length', (newV) => {
                if (newV == this.data.length) {
                    console.log('watch', this.isAllChecked);
                    this.isAllChecked = true;
                } else {
                    console.log('watch', this.isAllChecked);
                    this.isAllChecked = false;
                }
            });
            this.$watch('data', () => {
                this.checked.clear();
            });
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