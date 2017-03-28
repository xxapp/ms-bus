import * as avalon from 'avalon2';
import { parseSlotToVModel } from '../../vendor/avx-component/avx-util';

avalon.component('ms-checkbox', {
    soleSlot: 'label',
    template: __inline('./ms-checkbox.html'),
    defaults: {
        wrapper: 'checkbox',
        label: '',
        checked: false,
        disabled: false,
        onChange(e) {
            this.onChange(e);
        },
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
            const el = event.target;
            parseSlotToVModel(this);
            if (~window.navigator.userAgent.indexOf('MSIE 8.0')) {
                // 在IE8下降级为原生的checkbox
                var checkbox = el.children[0].children[0], mockCheckbox = el.children[0].children[1];
                checkbox.style.left = 0;
                checkbox.style.position = 'static';
                checkbox.style.marginLeft = '0';
                checkbox.style.marginTop = '6px';

                mockCheckbox.style.display = 'none';
            }
        },
        onDispose(vm, el) {
        }
    }
});