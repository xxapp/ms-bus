var avalon = require('avalon');
var cEvent = require('/events/componentEvent');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:checkbox', {
    $template: __inline('./ms-checkbox.html'),
    $$template: function (tmpl) {
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
                return this.label.trim() !== '';
            }
        }
    },
    label: '',
    duplex: '',
    duplexChecked: '',
    value: '',
    change: '',
    click: '',
    flush: avalon.noop,
    helpId: ''
});