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

export function parseSlotToVModel(vmodel, vnodes: any[]): void {
    vnodes.forEach(vnode => {
        if (!vnode) return true;
        let slotName = vnode.dom.getAttribute('slot');
        if (slotName) {
            delete vnode.props[':skip'];
            delete vnode.props['ms-skip'];
            vmodel[slotName] = avalon.vdom(vnode, 'toHTML');
        } else {
            parseSlotToVModel(vmodel, vnode.children);
        }
    });
}

export function getChildTemplateDescriptor(vmodel, render = vmodel.$render): void {
    return render.directives.reduce((acc, action) => {
        if (action.is) {
            acc.push({
                is: action.is,
                props: action.value,
                inlineTemplate: action.fragment,
                children: getChildTemplateDescriptor(vmodel, action.innerRender)
            });
        }
        return acc;
    }, []);
}