var avalon = require('avalon');
var cEvent = require('/events/componentEvent');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:checkbox', {
    $slot: 'label',
    $template: __inline('./ms-checkbox.html'),
    $$template: function (tmpl) {
        var $parent = avalon.vmodels[this.parentVmId];
        this.duplex = this.duplex || ($parent && $parent.duplex) || '';
        tmpl = tmpl.replace(/ms-duplex="duplex"/g, this.duplex ? 'ms-duplex="' + this.duplex + '"' : '');
        tmpl = tmpl.replace(/ms-duplex-checked="duplexChecked"/g, this.duplexChecked ? 'ms-duplex-checked="' + this.duplexChecked + '"' : '');
        tmpl = tmpl.replace(/ms-change="change"/g, this.change ? 'ms-change="' + this.change + '"' : '');
        return tmpl;
    },
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);

        vm.flush = function () {
            this.blur();
            this.focus();
        }
        vm.helpId = vm.$id;
        // // inline在IE8下显示有问题，待解决
        // if (vm.inline != void 0) {
        //     vm.wrapper = 'checkbox-inline';
        // }

        vm.innerChnage = function () {
            if (vm.parentVmId.indexOf('control-checkbox-group') > -1) {
                // 如果在checkbox-group下，则通知当前组件的change
                var $parent = avalon.vmodels[vm.parentVmId];
                if (this.checked) {
                    $parent.value.push(this.value);
                } else {
                    $parent.value.remove(this.value);
                }
            }
        }
    },
    $ready: function (vm, el) {
        if (~window.navigator.userAgent.indexOf('MSIE 8.0')) {
            // 在IE8下降级为原生的checkbox
            var checkbox = el.children[0].children[0], mockCheckbox = el.children[0].children[1];
            checkbox.style.left = 0;
            checkbox.style.position = 'static';
            checkbox.style.marginLeft = '0';
            checkbox.style.marginTop = '6px';

            mockCheckbox.style.display = 'none';
        }
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    $computed: {
        hasLabel: {
            get: function () {
                if (typeof this.label === 'string') {
                    return this.label.trim() !== '';
                } else {
                    return this.label !== null;
                }
            }
        }
    },
    wrapper: 'checkbox',
    label: '',
    duplex: '',
    duplexChecked: '',
    value: '',
    change: '',
    innerChnage: avalon.noop,
    click: '',
    flush: avalon.noop,
    helpId: ''
});