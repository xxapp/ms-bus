var $ = require('jquery');
var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');
var cEvent = require('/events/componentEvent');

var checkHeaderListener = avalon.noop;

avalon.component('ms:table', {
    $slot: 'header',
    header: '',
    thead: [],
    $template: __inline('./ms-table.html'),
    $replace: 1,
    $dynamicProp: { 
        data: { type: 'Array' }, 
        'selection-change': { type: 'Function' }
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);

        vm.onCheck = function (row) {
            if (this.checked) {
                vm.selection.push(row);
            } else {
                vm.selection.remove(row);
            }
            vm.selectionChange(vm.selection.$model);
        }

        checkHeaderListener = function (data) {
            if (!avxUtil.containChild(vm, data.id)) {
                return ;
            }
            if (data.type === 'checked') {
                avalon.each(vm.data, function(i, v){
                    vm.checked.ensure(String(v[data.key]));
                    vm.selection.ensure(v);
                });
            } else if (data.type === 'unchecked') {
                vm.checked.clear();
                vm.selection.clear();
            }
            vm.selectionChange(vm.selection.$model);
        }
        cEvent.on('checkHeader', checkHeaderListener);
        vm.$watch('checked.length', function (newV) {
            if (newV == vm.data.size()) {
                vm.isAllChecked = true;
            } else {
                vm.isAllChecked = false;
            }
        });
        vm.$watch('*', function (v, oldV, path) {
            if (path === 'data') {
                vm.checked.clear();
            }
        });
    },
    $childReady: function (vm, el) {
    },
    $ready: function (vm, el) {
        // 因为自定义标签内部写tr或th会被忽略，因此改用div表示th并做此处理让ms-repeat正常遍历
        var tmp = [], columnConfig = [];
        $(vm.$model.header).children().each(function (i, n) {
            var $checker = $(n);
            var type = $checker.get(0).tagName.toLowerCase().replace(/^ms:/, '');
            var props = {
                col: $checker.attr('col'),
                inlineTemplate: $checker.attr('inline-template')
            };
            props.inlineTemplate = props.inlineTemplate != void 0;
            var column = {};
            // 由于框架原因，父组件内部动态生成的子组件不能放进$refs,因此将需要传递的值通过属性放入子组件
            avxUtil.markPick(vm, n);
            if (type == 'check-header') {
                column = {
                    type: 'check',
                    content: '<ms:checkbox duplex="checked" change="onCheck(row)" ms-attr-value="row.' + props.col + '"></ms:checkbox>'
                    //content: '<div class="checkbox"><label><input type="checkbox" ms-duplex="checked" ms-click="onCheck(row)" ms-attr-value="row.' + props.col + '"><span class="text"></span></label></div>'
                };
            } else if (type == 'table-header') {
                column = {
                    type: 'normal',
                    content: props.inlineTemplate ? $checker.html() : ('{{row.' + props.col + '}}')
                };
            }
            columnConfig.push(column);
            tmp.push({
                width: $checker.attr('width'),
                content: $(n).prop('outerHTML')
            });
        });
        vm.thead.clear();
        vm.thead.pushArray(tmp);

        // 根据表头配置生成表格内容模板
        vm.tbody = $.map(columnConfig, function (n) {
            if (!n.content) return 'header 配置错误';
            return n.content;
        });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
        cEvent.removeListener('checkHeader', checkHeaderListener);
    },
    $parentVmId: '',
    data: [],
    tbody: [],
    checked: [],
    selection: [],
    isAllChecked: false,
    onCheck: avalon.noop,
    selectionChange: avalon.noop
});