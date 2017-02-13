var avalon = require('avalon');

avalon.directive('cduplex', {
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
        elem.setAttribute('data-prop-value', binding.expr);

        binding.rollback = function () {
        }
    },
    update: function (newV, oldV) {
    }
});