import { findParentComponent } from '../../vendor/avx-component/avx-util';

export function emitToFormItem(vmodel): void {
    vmodel.$formItem = findParentComponent(vmodel, 'ms-form-item');
    vmodel.$formItem.onFieldChange({
        name: vmodel.col, rules: vmodel.$rules
    });
}