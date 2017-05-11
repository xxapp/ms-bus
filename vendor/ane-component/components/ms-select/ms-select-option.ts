import * as avalon from 'avalon2';

avalon.component('ms-select-option', {
    template: '&nbsp;',
    soleSlot: 'label',
    defaults: {
        label: '',
        value: '',
        disabled: false
    }
});