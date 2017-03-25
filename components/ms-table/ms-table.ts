import * as avalon from 'avalon2';
import { findParentComponent, parseSlotToVModel, getChildTemplateDescriptor } from '../../vendor/avx-component/avx-util';

var checkHeaderListener = avalon.noop;

avalon.component('ms-table', {
    soleSlot: 'header',
    template: __inline('./ms-table.html'),
    defaults: {
        header: '',
        columns: [],
        $parentVmId: '',
        data: [],
        tbody: [],
        checked: [],
        selection: [],
        isAllChecked: false,
        onCheck: avalon.noop,
        selectionChange: avalon.noop,
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
        acc.push({
            title: column.props.title,
            template: column.props.dataIndex ? '{{record.' + column.props.dataIndex + '}}' : column.inlineTemplate
        });
        return acc.concat(getColumnConfig(column.children, level + 1));
    }, []);
}