var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:controlCheckboxGroup', {
    $slot: 'content',
    content: '',
    $template: __inline('./ms-control-checkbox-group.html'),
    $replace: 1,
    $dynamicProp: {
        duplex: { type: 'Array' }
    },
    $$template: function (tmpl) {
        return tmpl;
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);
        avxUtil.enableDynamicProp(vm, el);

        $(el).find('*').each(function (i, n) {
            if (n.tagName.toLowerCase().indexOf('checkbox') > -1) {
                // 只标记checkbox组件
                avxUtil.markPick(vm, n);
            }
        });
        vm.$watch('*', function (v, oldV, path) {
            if (path === 'duplex') {
                checkChildren(vm.$refs, v.$model);
                vm.$dynamicProp.duplex.setter && vm.$dynamicProp.duplex.setter(v.$model);
            }
        });
        vm.$watch('duplex.length', function () {
            checkChildren(vm.$refs, vm.duplex.$model);
            vm.$dynamicProp.duplex.setter && vm.$dynamicProp.duplex.setter(vm.duplex.$model);
        });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $ready: function (vm, el) {
        vm.elHiddenInput = $(el).find('input:hidden');
        checkChildren(vm.$refs, vm.duplex.$model);
    },
    $computed: {
        strValue: {
            get: function () {
                var me = this;
                avalon.nextTick(function () {
                    me.elHiddenInput && me.elHiddenInput.trigger('input');
                });
                return this.duplex.join();
            }
        }
    },
    $skipArray: ['elHiddenInput'],
    $parentVmId: '',
    label: '',
    col: '',
    duplex: [],
    elHiddenInput: ''
});

function checkChildren(children, value) {
    for (var i in children) {
        if (children.hasOwnProperty(i)) {
            children[i].duplex = value;
        }
    }
}