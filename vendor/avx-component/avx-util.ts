import * as avalon from 'avalon2';

export function findParentComponent(vm, ctype) {
    let parent = vm.$element.parentElement;
    while (parent) {
        if (parent._vm_ && (!ctype || parent._ctype_ === ctype)) {
            return parent._vm_;
        }
        parent = parent.parentElement;
    }
    return null;
}