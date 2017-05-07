import * as avalon from 'avalon2';
import { parseSlotToVModel } from '../../ane-util';

if (avalon.msie <= 8) {
    const doc = document;
    const head = doc.getElementsByTagName('head')[0];
    const style: any = doc.createElement('style');
    const cssStr = `
        .radio-inner-ie input {
            left: 0;
            position: static !important;
            margin-left: 0 !important;
            margin-top: 6px !important;
        }
        .radio-inner-ie span {
            display: none !important;
        }
    `;
    style.setAttribute('type', 'text/css');

    if (style.styleSheet) {
        style.styleSheet.cssText = cssStr;
    } else {
        style.appendChild(doc.createTextNode(cssStr));
    }

    head.appendChild(style);
}

avalon.component('ms-radio', {
    soleSlot: 'label',
    template: __inline('./ms-radio.html'),
    defaults: {
        wrapper: 'radio',
        label: '',
        checked: '',
        value: '',
        name: '',
        group: false,
        disabled: false,
        onChange(e) {
            this.onChange(e);
        },
        helpId: '',
        onInit(event) {
            this.helpId = this.$id;
        },
        onReady(event) {
            parseSlotToVModel(this);
        },
        onDispose(vm, el) {
        }
    }
});