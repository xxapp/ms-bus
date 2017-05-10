import * as avalon from 'avalon2';

avalon.component('ms-trigger', {
    template: '&nbsp;',
    defaults: {
        left: -9999,
        top: -9999,
        width: 0,
        height: 0,
        visible: false,
        withInBox() { return true; },
        onHide: avalon.noop,
        onInit(event) {
            const DOC = document, body = DOC.body;
            const medium = DOC.createElement('div');
            const panel = DOC.createElement('div');
            medium.setAttribute('id', this.$id);
            medium.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 100%;');
            panel.setAttribute('style', `position: absolute; left: ${this.left}px; top: ${this.top}px; width: ${this.width}px; height: 400px; background: #f5f5f5;`);
            medium.appendChild(panel);
            body.appendChild(medium);

            avalon.bind(body, 'click', e => {
                if (this.visible && !avalon.contains(event.target, e.target) &&  !this.withInBox(e.target)) {
                    medium.style.display = 'none';
                    this.onHide();
                }
            });
            this.$watch('visible', v => {
                if (v) {
                    medium.style.display = 'block';
                }
            });
        },
        onViewChange(event) {
            const DOC = document;
            const medium = DOC.getElementById(this.$id);
            const panel = medium.children[0];
            (panel as HTMLDivElement).style.left = this.left + 'px';
            (panel as HTMLDivElement).style.top = this.top + this.height + 'px';
            (panel as HTMLDivElement).style.width = this.width + 'px';
        },
        onDispose(event) {
            const DOC = document, body = DOC.body;
            const medium = DOC.getElementById(this.$id);
            body.removeChild(medium);
        }
    }
});