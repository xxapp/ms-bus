import { findParentComponent } from '../../vendor/avx-component/avx-util';

export function emitToFormItem(vmodel): void {
    vmodel.$formItem = findParentComponent(vmodel, 'ms-form-item');
    vmodel.$formItem.$fire('onFieldChange', {
        name: vmodel.col, rules: vmodel.$rules
    });
    vmodel.$watch('value', (v) => {
        vmodel.$formItem.$fire('onFormChnage', {
            name: vmodel.col, value: v, key: vmodel.key
        });
    });
}