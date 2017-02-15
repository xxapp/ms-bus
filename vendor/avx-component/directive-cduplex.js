var avalon = require('avalon');


/**
 * 指令 ms-cduplex，应用在组件上的双向绑定
 * 要注意的是，这个指令并不能完全模仿原生 ms-duplex，因为最多只能处理二重循环。
 * 而且不能使用临时变量，表达式必须完整，具体见例子。
 * 
 * @example
 *  <ms:control-text 
        label="代表作" 
        col="masterpiece" 
        ms-cduplex="record.masterpiece"
    </ms:control-text>
 * 
 *  <div ms-repeat="record.masterpieces">
        <ms:control-text 
            label="代表作" 
            col="masterpiece" 
            ms-cduplex="record.masterpiece[$index]"
        </ms:control-text>
    </div>
 */
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
                        binding.expr = binding.expr.replace(/\$outer\.\$index/g, vmodel.$outer.$index);
                        binding.expr = binding.expr.replace(/\$index/g, vmodel.$index);
                    }
                }
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