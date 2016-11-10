var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.component('ms:form', {
    $slot: 'content',
    content: '',
    $template: '<form role="form">{{content|html}}</form>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);

        vm.power = function () {
            !vm.novalidate && $(el).bootstrapValidator({
                excluded: [':hidden'],
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                submitHandler: function (validator, form, submitButton) {
                    // Do nothing
                },
                fields: vm.$validateFields
            }).on('success.field.bv', function(e, data) {
                if (data.bv.getInvalidFields().length > 0) {
                    vm.valid = false;
                } else {
                    vm.valid = true;
                }
            }).on('error.field.bv', function (e, data) {
                if (data.bv.getInvalidFields().length > 0) {
                    vm.valid = false;
                } else {
                    vm.valid = true;
                }
            });
        }
        vm.validate = function () {
            if (vm.novalidate) return true;
            $(el).data('bootstrapValidator').validate();
            if (!$(el).data('bootstrapValidator').isValid()) {
                vm.valid = false;
                return false;
            } else {
                vm.valid = true;
                return true;
            }
        }
        vm.resetForm = function (resetFormData) {
            var bv = $(el).data('bootstrapValidator');
            if (!bv) {
                return ;
            }
            bv.resetForm(resetFormData);
        }
    },
    $ready: function (vm, el) {
        vm.power();
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $parentVmId: '',
    novalidate: false,
    valid: true,
    $validateFields: {},
    power: avalon.noop,
    validate: avalon.noop,
    resetForm: avalon.noop
});