var avalon = require('avalon2');

exports.findParentComponent = function (vm, ctype) {
    var parent = vm.$element.parentElement;
    while (parent) {
        if (parent._vm_ && (!ctype || parent._ctype_ === ctype)) {
            return parent._vm_;
        }
        parent = parent.parentElement;
    }
    return null;
}