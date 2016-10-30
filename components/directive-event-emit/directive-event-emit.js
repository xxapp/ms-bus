var avalon = require('avalon');

avalon.directive('eventemit', {
    init: function (binding) {
        var elem = binding.element;
        console.log(binding.vmodels);
        var vm = binding.vmodels[0];
        var handler = vm[binding.expr];
        handler(233333);
        binding.rollback = function () {
            
        }
    }
});