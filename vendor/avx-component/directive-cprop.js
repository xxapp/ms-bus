var avalon = require('avalon');
var cEvent = require('/events/componentEvent');

avalon.directive('cprop', {
    init: function (binding) {
        var elem = binding.element, parent = elem.parentNode;
        var vmodels = binding.vmodels;
        var vmChain = [];
        for (var i in vmodels) {
            if (vmodels.hasOwnProperty(i)) {
                vmChain.push(vmodels[i].$id);
            }
        }
        elem.setAttribute('data-vm-chain', vmChain.join(','));
        if (binding.param) {
            elem.setAttribute('data-prop-' + binding.param, binding.expr);
        }

        binding.rollback = function () {
        }
    },
    update: function (newV, oldV) {
    }
});