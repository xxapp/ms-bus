var avalon = require('avalon');

exports.containChild = function (vm, childVmId) {
    if (!vm.$refs) {
        return false
    }
    else if (vm.$refs.hasOwnProperty(childVmId)) {
        return true;
    } else {
        for (var i in vm.$refs) {
            if (vm.$refs.hasOwnProperty(i)) {
                if (this.containChild(vm.$refs[i], childVmId)) {
                    return true;
                }
            }
        }
    }
    return false;
}