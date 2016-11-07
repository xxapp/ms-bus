var avalon = require('avalon');

avalon.directive('cprop', {
    init: function (binding) {
        var elem = binding.element;
        var vmodels = binding.vmodels;
        var vmChain = [];
        for (var i in vmodels) {
            if (vmodels.hasOwnProperty(i)) {
                vmChain.push(vmodels[i].$id);
            }
        }
        elem.setAttribute('vm-chain', vmChain.join(','));
        elem.setAttribute('prop-' + binding.param, binding.expr);
        binding.rollback = function () {
        }
    },
    update: function (newV, oldV) {

    }
});