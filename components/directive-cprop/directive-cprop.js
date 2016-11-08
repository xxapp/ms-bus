var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

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
        elem.setAttribute('vm-chain', vmChain.join(','));
        elem.setAttribute('prop-' + binding.param, binding.expr);

        binding.rollback = function () {
        }
    },
    update: function (newV, oldV) {
    }
});