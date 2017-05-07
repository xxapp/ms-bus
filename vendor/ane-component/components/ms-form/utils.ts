import { findParentComponent } from '../../ane-util';

export function emitToFormItem(vmodel): void {
    vmodel.$formItem = findParentComponent(vmodel, 'ms-form-item');
    if (this.$formItem === null) {
        throw 'ms-control 类别的组件必须放在 ms-form-item 内';
    }
    vmodel.$formItem.onFieldChange({
        name: vmodel.col, rules: vmodel.$rules, value: vmodel.value, denyValidate: true
    });
}