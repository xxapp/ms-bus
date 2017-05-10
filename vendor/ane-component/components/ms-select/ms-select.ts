import * as avalon from 'avalon2';
import '../ms-trigger';

avalon.component('ms-select', {
    template: __inline('./ms-select.html'),
    defaults: {
        left: -9999,
        top: -9999,
        width: 0,
        height: 0,
        visible: false,
        handleClick(e) {
            const { left, top } = e.target.getBoundingClientRect();
            this.left = left;
            this.top = top;
            this.width = e.target.offsetWidth;
            this.height = e.target.offsetHeight;
            this.visible = true;
        },
        withInBox(el) {
            return avalon.contains(this.$element, el);
        },
        onHide() {
            this.visible = false;
        },
        onInit(event) {
        }
    }
});