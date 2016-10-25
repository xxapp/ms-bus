var avalon = require('avalon');

avalon.directive('formvalid', {
    init: function (binding) {
        var elem = binding.element, $form = $(elem);
        var vm = binding.vmodels[0];
        setTimeout(function () {
            $form.bootstrapValidator({
                excluded: [],
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                submitHandler: function (validator, form, submitButton) {
                    // Do nothing
                },
                fields: vm[binding.expr]
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
        }, 10);
        binding.rollback = function () {
            $form.data('bootstrapValidator').destroy();
        }
    },
    update: function (newV, oldV) {

    }
});