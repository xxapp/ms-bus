import * as avalon from 'avalon2';
import '../ms-trigger';

avalon.component('ms-select', {
    template: __inline('./ms-select.html'),
    defaults: {
        left: -9999,
        top: -9999,
        width: 0,
        handleClick(e) {
            const { left, top } = e.target.getBoundingClientRect();
            this.left = left;
            this.top = top;
            this.width = e.target.offsetWidth;
        },
        onInit(event) {
        }
    }
});