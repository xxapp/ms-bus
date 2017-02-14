var avalon = require('avalon');

avalon.directive('cduplex', {
    init: function (binding) {
        var elem = binding.element, parent = elem.parentNode;
        var vmodels = binding.vmodels;
        var vmChain = [];

        for (var i in vmodels) {
            if (vmodels.hasOwnProperty(i)) {
                var vmodel = vmodels[i];
                vmChain.push(vmodel.$id);
                if (/^\$proxy\$each/.test(vmodel.$id)) {
                    if (/\$index/g.test(binding.expr)) {
                        binding.expr = binding.expr.replace(/\$index/g, vmodel.$index);
                    }
                }
            }
        }
        console.log(binding.expr);
        elem.setAttribute('data-vm-chain', vmChain.join(','));
        elem.setAttribute('data-prop-value', binding.expr);

        binding.rollback = function () {
        }
    },
    update: function (newV, oldV) {
    }
});