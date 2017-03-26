import * as avalon from 'avalon2';
import { findParentComponent, parseSlotToVModel, getChildTemplateDescriptor } from '../../vendor/avx-component/avx-util';

var checkHeaderListener = avalon.noop;

avalon.component('ms-table', {
    soleSlot: 'header',
    template: __inline('./ms-table.html'),
    defaults: {
        header: '',
        columns: [],
        data: [],
        checked: [],
        selection: [],
        isAllChecked: false,
        onCheck: avalon.noop,
        selectionChange: avalon.noop,
        action() {},
        handle(type, col, record, $index) {
            let text = record[col.dataIndex].$model || record[col.dataIndex];
            this.action(type, text, record.$model, $index);
        },
        onInit(event) {
            this.columns = getColumnConfig(getChildTemplateDescriptor(this));
            // vm.onCheck = function (row) {
            //     if (this.checked) {
            //         vm.selection.push(row);
            //     } else {
            //         vm.selection.remove(row);
            //     }
            //     vm.selectionChange(vm.selection.$model);
            // }

            // checkHeaderListener = function (data) {
            //     if (!avxUtil.containChild(vm, data.id)) {
            //         return ;
            //     }
            //     if (data.type === 'checked') {
            //         avalon.each(vm.data, function(i, v){
            //             vm.checked.ensure(String(v[data.key]));
            //             vm.selection.ensure(v);
            //         });
            //     } else if (data.type === 'unchecked') {
            //         vm.checked.clear();
            //         vm.selection.clear();
            //     }
            //     vm.selectionChange(vm.selection.$model);
            // }
            // cEvent.on('checkHeader', checkHeaderListener);
            // vm.$watch('checked.length', function (newV) {
            //     if (newV == vm.data.size()) {
            //         vm.isAllChecked = true;
            //     } else {
            //         vm.isAllChecked = false;
            //     }
            // });
            // vm.$watch('*', function (v, oldV, path) {
            //     if (path === 'data') {
            //         vm.checked.clear();
            //     }
            // });
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