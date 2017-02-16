var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');
// 加载表单验证插件插件
require('/vendor/bootstrapValidator');
require('/vendor/bootstrapValidator/zh_CN');

/**
 * Form组件
 * @prop {Boolean} novalidate 不进行验证
 * @prop {Object} rules 表单验证规则，配置参考bootstrapValidator
 * @prop {Object} domEvents 由事件名称和事件处理函数组成的map对象
 * @prop {String} model 表单数据对象
 * 
 * @method validate 验证表单，通过返回true，未通过返回false
 * @method resetForm 重置表单，参数resetFormData是否重置数据
 * 
 * @example
 * <ms:form>
 *   <ms:control-text label="分类名称" col="name" ms-cduplex="record.name"></ms:control-text>
 * </ms:form>
 */
avalon.component('ms:form', {
    $slot: 'content',
    content: '',
    $template: '<form role="form">{{content|html}}</form>',
    $replace: 1,
    $init: function (vm, el) {
        // 借元素之力将此组件实例与父组件实例联系起来
        vm.$parentVmId = avxUtil.pickToRefs(vm, el);

        $(el).find('*').each(function (i, n) {
            if (n.tagName.toLowerCase().indexOf('control-') > -1) {
                // 只标记表单类型的组件
                avxUtil.markPick(vm, n);
            }
        });

        vm.power = function () {
            if (!vm.novalidate) {
                vm.$form.bootstrapValidator(
                    avalon.mix(true, {
                        excluded: [':hidden'],
                        feedbackIcons: {
                            valid: 'glyphicon glyphicon-ok',
                            invalid: 'glyphicon glyphicon-remove',
                            validating: 'glyphicon glyphicon-refresh'
                        },
                        submitHandler: function (validator, form, submitButton) {
                            // Do nothing
                        }
                    }, vm.rules)
                ).on('success.field.bv', function(e, data) {
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
                for (var i in vm.domEvents) {
                    if (vm.domEvents.hasOwnProperty(i) && typeof vm.domEvents[i] === 'function') {
                        vm.$form.on(i, vm.domEvents[i])
                    }
                }
            }
        }
        vm.validate = function () {
            if (vm.novalidate) return true;
            vm.$form.data('bootstrapValidator').validate();
            if (!vm.$form.data('bootstrapValidator').isValid()) {
                vm.valid = false;
                return false;
            } else {
                vm.valid = true;
                return true;
            }
        }
        vm.resetForm = function (resetFormData) {
            var bv = vm.$form.data('bootstrapValidator');
            if (!bv) {
                return ;
            }
            bv.resetForm(resetFormData);
        }
    },
    $ready: function (vm, el) {
        vm.$form = $(el);
        vm.power(vm, el);
    },
    $dispose: function (vm, el) {
        avxUtil.removeFromRefs(vm, el);
    },
    $skipArray: ['model', 'rules', 'domEvents'],
    $parentVmId: '',
    $form: '',
    novalidate: false,
    valid: true,
    model: '',
    rules: {},
    power: avalon.noop,
    validate: avalon.noop,
    resetForm: avalon.noop
});