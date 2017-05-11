import { findParentComponent } from '../../ane-util';

export function emitToFormItem(vmodel): void {
    vmodel.$formItem = findParentComponent(vmodel, 'ms-form-item');
    if (vmodel.$formItem === null) {
        return;
    }
    vmodel.$formItem.onFieldChange({
        name: vmodel.col, rules: vmodel.$rules, value: vmodel.value, denyValidate: true
    });
}