import * as avalon from 'avalon2';
import { parseSlotToVModel } from '../../vendor/avx-component/avx-util';

if (avalon.msie <= 8) {
    const doc = document;
    const head = doc.getElementsByTagName('head')[0];
    const style: any = doc.createElement('style');
    const cssStr = `
        .checkbox-inner-ie input {
            left: 0;
            position: static !important;
            margin-left: 0 !important;
            margin-top: 6px !important;
        }
        .checkbox-inner-ie span {
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

avalon.component('ms-checkbox', {
    soleSlot: 'label',
    template: __inline('./ms-checkbox.html'),
    defaults: {
        wrapper: 'checkbox',
        label: '',
        checked: false,
        group: false,
        disabled: false,
        onChange: avalon.noop,
        flush: avalon.noop,
        helpId: '',
        onInit(event) {
            this.helpId = this.$id;
            // // inline在IE8下显示有问题，待解决
            // if (this.inline != void 0) {
            //     this.wrapper = 'checkbox-inline';
            // }
        },
        onReady(event) {
            parseSlotToVModel(this);
        },
        onDispose(vm, el) {
        }
    }
});