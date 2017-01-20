var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:controlCheckboxGroup', {
    $slot: 'content',
    content: '',
    $template: __inline('./ms-control-checkbox-group.html'),
    $replace: 1,
    $$template: function (tmpl) {
        var $parent = avalon.vmodels[this.parentVmId];
        this.model = this.model || ($parent && $parent.model) || 'record';
        if (!this.duplex && this.col) {
            this.duplex = this.model + '.' + this.col;
        }
        return tmpl;
    },
    $init: function (vm, el) {
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);

        $(el).find('*').each(function (i, n) {
            if (n.tagName.toLowerCase().indexOf('checkbox') > -1) {
                // 只标记checkbox组件
                avxUtil.markPick(vm, n);
            }
        });
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    label: '',
    col: '',
    duplex: '',
    model: '',
    value: ''
});