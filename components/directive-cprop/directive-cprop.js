var avalon = require('avalon');
var avxUtil = require('/vendor/avx-component/avx-util');

avalon.directive('cprop', {
    init: function (binding) {
        var elem = binding.element, parent = elem.parentNode, signature, comment;
        var vmodels = binding.vmodels;
        var vmChain = [];
        for (var i in vmodels) {
            if (vmodels.hasOwnProperty(i)) {
                vmChain.push(vmodels[i].$id);
            }
        }
        elem.setAttribute('vm-chain', vmChain.join(','));
        elem.setAttribute('prop-' + binding.param, binding.expr);

        if (elem.previousSibling && (elem.previousSibling.nodeType != 8 || elem.previousSibling.nodeValue.indexOf('cprop') != 0)) {
            signature = avxUtil.generateID('cprop');
            binding.mark = comment = document.createComment(signature)
            parent.insertBefore(comment, elem);
        }
        binding.rollback = function () {
        }
    },
    update: function (newV, oldV) {
    }
});